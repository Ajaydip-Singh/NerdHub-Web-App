import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import Socials from '../../../components/Socials/Socials';
import { getContactPageContent } from '../../../slices/pageSlices/contactPageContentSlices/contactPageContentGetSlice';
import styles from './ContactScreen.module.css';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant, sectionVariant } from '../../../animate';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function ContactScreen() {
  const contactPageContentGetSlice = useSelector(
    (state) => state.contactPageContentGetSlice
  );
  const { status, content, error } = contactPageContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactPageContent({}));
  }, [dispatch]);

  return (
    <div>
      <Header contact></Header>
      {status === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : error ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
        <motion.div variants={pageVariant} initial="initial" animate="final">
          <motion.section
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            variants={sectionVariant}
            whileHover="hover"
            className={styles.hero_section}
            style={{
              backgroundImage: `url(${
                content && content.contactHeroBackgroundImage
              })`
            }}
          >
            {content && (
              <div className="ql-editor">
                {parse(content.contactMainHeading)}
              </div>
            )}
          </motion.section>
          <div
            className={styles.main_section}
            style={{
              backgroundImage: `url(${
                content && content.contactMainBackgroundImage
              })`
            }}
          >
            <div className={`row align-center container ${styles.wrapper}`}>
              <div className="col-md">
                {content && (
                  <div className="ql-editor">
                    {parse(content.sectionOneText)}
                  </div>
                )}
                <Link className="link border_bottom" to="/about">
                  Learn more about us
                </Link>
                <div className={styles.socials}>
                  <Socials></Socials>
                </div>
              </div>
              <div className="col-md align-center">
                <div className={styles.image_container}>
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    drag
                    dragConstraints={{
                      top: 10,
                      left: 10,
                      right: 10,
                      bottom: 10
                    }}
                    dragElastic={1}
                    src={content && content.sectionOneImage}
                    className={styles.image}
                    alt="Section One"
                  />
                </div>
              </div>
            </div>
            <div className={`row align-center container ${styles.wrapper}`}>
              <motion.div
                className="col-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7 }}
              >
                <iframe
                  title="location"
                  className={styles.map}
                  style={{
                    border:
                      content && `2px solid ${content.locationFrameBorderColor}`
                  }}
                  src={content && content.locationFrame}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </motion.div>

              <div className="col-md">
                {content && (
                  <div className="ql-editor">{parse(content.locationText)}</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <section></section>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
