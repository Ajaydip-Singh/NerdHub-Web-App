import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import styles from './MembershipScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { AnimatePresence, motion } from 'framer-motion';
import { pageVariant, sectionVariant } from '../../../animate';
import { getMembershipPageContent } from '../../../slices/pageSlices/membershipPageContentSlices/membershipPageContentGetSlice';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MembershipScreen(props) {
  const [formVisible, setFormVisible] = useState(false);

  const membershipPageContentGetSlice = useSelector(
    (state) => state.membershipPageContentGetSlice
  );
  const { status, content, error } = membershipPageContentGetSlice;

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const membershipHandler = () => {
    if (!user) {
      props.history.push('/login?redirect=membership');
    } else {
      setFormVisible(!formVisible);
    }
  };

  const membershipRegisterHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/pesapal/order/post', {
      Amount: content && content.membershipFee,
      Type: 'MERCHANT',
      Description: `Nerdhub Membership Registration`,
      Reference: '1234503sg',
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName
    });
    window.location.href = data;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMembershipPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header membership></Header>
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
            backgroundImage: `url(${
              content && content.membershipBackgroundImage
            })`
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
                  {parse(content.membershipMainHeading)}
                </div>
              )}
            </motion.div>
          </motion.section>
          <div>
            <section>
              <div className={styles.wrapper}>
                <div className="ql-editor">
                  {content && parse(content.membershipMainContent)}
                </div>
              </div>
            </section>
          </div>
          {!user.isMember && (
            <>
              <div className={styles.join_section}>
                <button
                  onClick={membershipHandler}
                  className="button border_bottom"
                >
                  Become a Member
                </button>
              </div>
              <AnimatePresence>
                {formVisible && (
                  <motion.form
                    onSubmit={membershipRegisterHandler}
                    initial={{ opacity: 0, x: '-100vw' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    exit={{ opacity: 0, x: '100vw' }}
                    className={styles.form}
                  >
                    <div>
                      <label htmlFor="first_name">First Name</label>
                      <input
                        className={styles.input}
                        placeholder="Enter first name"
                        type="text"
                        id="first_name"
                        name="first_name"
                        disabled
                        value={user && user.firstName}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        className={styles.input}
                        placeholder="Enter last name"
                        type="text"
                        id="last_name"
                        name="last_name"
                        disabled
                        value={user && user.lastName}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        className={styles.input}
                        placeholder="Enter email"
                        type="text"
                        id="email"
                        name="email"
                        disabled
                        value={user && user.email}
                      ></input>
                    </div>

                    <div>
                      <button className={styles.submit_button} type="submit">
                        Pay Membership Fee (KES{' '}
                        {content && content.membershipFee})
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      )}

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav membership></BottomNav>
      </MediaQuery>
    </div>
  );
}
