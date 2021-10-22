import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './AboutScreen.module.css';
import { Player } from 'video-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAboutPageContent } from '../../../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { pageVariant, sectionVariant, videoVariant } from '../../../animate';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function AboutScreen() {
  const aboutPageContentGetSlice = useSelector(
    (state) => state.aboutPageContentGetSlice
  );
  const { status, content, error } = aboutPageContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAboutPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header about></Header>

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
        <motion.div
          variants={pageVariant}
          initial="initial"
          animate="final"
          className={styles.main_wrapper}
          style={{
            backgroundImage: `url(${content && content.aboutBackgroundImage})`
          }}
        >
          <motion.section
            className={styles.hero_section}
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            variants={sectionVariant}
            whileHover="hover"
          >
            <motion.div
              drag
              dragConstraints={{ top: 10, left: 10, right: 10, bottom: 10 }}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
              whileHover={{ x: 1.5, scale: 1.2 }}
              transition={{ yoyo: 5 }}
              whileDrag={{ scale: 1.2 }}
            >
              {content && (
                <div className="ql-editor">
                  {parse(content.aboutMainHeading)}
                </div>
              )}
            </motion.div>
          </motion.section>
          <motion.div transition={{ duration: 1.2 }}>
            <section className={styles.video_section}>
              <div className={styles.video_container}>
                <motion.div
                  className={styles.video}
                  variants={videoVariant}
                  whileHover="hover"
                  transition="transition"
                  style={{
                    border: content && `2px solid ${content.videoBorderColor}`,
                    boxShadow:
                      content && `6px 6px 6px ${content.videoBoxShadowColor}`
                  }}
                >
                  <Player
                    poster={content && content.videoThumbnail}
                    src={content && content.videoUrl}
                  ></Player>
                </motion.div>
              </div>
            </section>
            <section>
              <div
                className={`row container align-center space-evenly ${styles.wrapper}`}
              >
                <div className={styles.info_wrapper}>
                  <motion.div whileHover={{ scale: 0.9 }}>
                    <div>
                      {content && (
                        <div className="ql-editor">
                          {parse(content.sectionOneHeading)}
                        </div>
                      )}
                      {content && (
                        <div className="ql-editor">
                          {parse(content.sectionOneText)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                  <div className={styles.image_container}>
                    <motion.img
                      whileHover={{ scale: 0.8 }}
                      drag
                      dragConstraints={{
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 10
                      }}
                      dragElastic={1}
                      src={content && content.sectionOneImage}
                      className={styles.logo}
                      alt="Section One"
                    />
                  </div>
                </div>
                <div className={styles.info_wrapper}>
                  <div className={styles.image_container}>
                    <img
                      src={content && content.sectionTwoImage}
                      className={styles.image}
                      alt="Section Two"
                    />
                  </div>
                  <div>
                    {content && (
                      <div className="ql-editor">
                        {parse(content.sectionTwoHeading)}
                      </div>
                    )}
                    {content && (
                      <div className="ql-editor">
                        {parse(content.sectionTwoText)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
