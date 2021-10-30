/*global google*/
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import { motion } from 'framer-motion';
import { pageVariant, sectionVariant } from '../../../animate';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Header from '../../../components/Header/Header';
import styles from './LoginScreen.module.css';
import {
  googleLoginUser,
  loginUser,
  resetLoginErrors
} from '../../../slices/userSlices/userAuthenticationSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import { confirmUser } from '../../../slices/userSlices/userConfirmationSlice';
import { getLoginPageContent } from '../../../slices/pageSlices/loginPageContentSlices/loginPageContentGetSlice';
import parse from 'html-react-parser';

export default function LoginScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmail(email);
      setEmailError('');
    } else {
      setEmail('');
      setEmailError('Enter Valid Email');
    }
  };

  const validatePassword = (password) => {
    if (validator.isStrongPassword(password, { min: 10 })) {
      setPassword(password);
      setPasswordError('');
    } else {
      setPassword('');
      setPasswordError('Enter Strong Password');
    }
  };

  const loginPageContentGetSlice = useSelector(
    (state) => state.loginPageContentGetSlice
  );
  const {
    status: statusContent,
    content,
    error: errorContent
  } = loginPageContentGetSlice;

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user, status, error } = userAuthentication;

  const userConfirmation = useSelector((state) => state.userConfirmation);
  const {
    confirmedUser: successConfirmation,
    status: statusConfirmation,
    error: errorConfirmation
  } = userConfirmation;

  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetLoginErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoginPageContent({}));
  }, [dispatch]);

  useEffect(() => {
    const userId = props.match.params.userId;
    const confirmationCode = props.match.params.confirmationCode;

    if (userId && confirmationCode) {
      dispatch(confirmUser({ userId, confirmationCode }));
    }
  }, [
    dispatch,
    props.match.params.userId,
    props.match.params.confirmationCode
  ]);

  useEffect(() => {
    if (!user) {
      const handleGoogleCredentialResponse = (response) => {
        dispatch(googleLoginUser(response));
      };

      const setupGoogleOneTapSignIn = async () => {
        const { data } = await axios.get('/api/config/google');

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;

        script.onload = () => {
          google.accounts.id.initialize({
            client_id: data,
            callback: handleGoogleCredentialResponse
          });
          google.accounts.id.prompt();
        };

        document.body.appendChild(script);
      };

      setupGoogleOneTapSignIn();
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
  }, [user, redirect, props]);

  return (
    <div>
      <Header login></Header>
      {statusContent === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : errorContent ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
        <motion.section
          className={`row ${styles.main_wrapper}`}
          variants={pageVariant}
          initial="initial"
          animate="final"
        >
          <div
            className={`col-md-6 ${styles.info_box}`}
            style={{
              backgroundImage: `url(${content && content.mainBackgroundImage})`
            }}
          ></div>
          <motion.div
            variants={sectionVariant}
            whileHover="hover"
            transition="transition"
            className={`col-md-6 ${styles.login_box}`}
            style={
              isSmallerScreen
                ? {
                    backgroundImage: `url(${
                      content && content.mainBackgroundImage
                    })`
                  }
                : { backgroundColor: content && content.mainBackgroundColor }
            }
          >
            <div className="ql-editor">
              <div className={styles.title}>
                {content && parse(content.mainHeading)}
              </div>
            </div>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {successConfirmation && (
              <MessageBox variant="success">
                {successConfirmation.message}
              </MessageBox>
            )}
            {statusConfirmation === 'loading' && <LoadingBox></LoadingBox>}
            {errorConfirmation && (
              <MessageBox variant="danger">{errorConfirmation}</MessageBox>
            )}

            <form onSubmit={onSubmitHandler} className={styles.form}>
              <div>
                {emailError && <MessageBox validation>{emailError}</MessageBox>}
                <input
                  style={{
                    backgroundColor: content && content.inputBackgroundColor,
                    color: content && content.inputTextColor,
                    outline: `1px solid ${content && content.inputBorderColor}`,
                    border: `2px solid ${content && content.inputBorderColor}`
                  }}
                  className={`${styles.input} ${
                    emailError ? `${styles.val_danger}` : ``
                  }`}
                  placeholder="Enter email"
                  type="text"
                  name="email"
                  onChange={(e) => validateEmail(e.target.value)}
                ></input>
              </div>
              <div>
                {passwordError && (
                  <MessageBox validation>{passwordError}</MessageBox>
                )}
                <motion.input
                  style={{
                    backgroundColor: content && content.inputBackgroundColor,
                    color: content && content.inputTextColor,
                    outline: `1px solid ${content && content.inputBorderColor}`,
                    border: `2px solid ${content && content.inputBorderColor}`
                  }}
                  className={`${styles.input} ${
                    passwordError ? `${styles.val_danger}` : ``
                  }`}
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  onChange={(e) => validatePassword(e.target.value)}
                ></motion.input>
              </div>
              <div>
                <button
                  style={{
                    '--button-text-color':
                      content && content.loginButtonTextColor,
                    '--button-background-color':
                      content && content.loginButtonBackgroundColor,
                    '--button-border-color':
                      content && content.loginButtonTextColor
                  }}
                  className={styles.submit_button}
                  type="submit"
                >
                  {status === 'loading' ? <LoadingBox></LoadingBox> : `Login`}
                </button>
              </div>
              <p className="mt-1">
                <div className="ql-editor mb-2">
                  {content && parse(content.newAccountText)}
                </div>
                <Link
                  style={{
                    '--link-text-color': content && content.signUpLinkTextColor,
                    '--link-background-color':
                      content && content.signUpLinkBackgroundColor,
                    '--link-border-color':
                      content && content.signUpLinkBorderColor
                  }}
                  className={`border_bottom ${styles.link}`}
                  to="/register"
                >
                  Create one
                </Link>
              </p>
            </form>
          </motion.div>
        </motion.section>
      )}
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
