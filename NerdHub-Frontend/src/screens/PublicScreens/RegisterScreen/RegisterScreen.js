import { useDispatch, useSelector } from 'react-redux';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import validator from 'validator';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Header from '../../../components/Header/Header';
import styles from './RegisterScreen.module.css';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { registerUser } from '../../../slices/userSlices/userRegisterSlice';
import { useEffect, useState } from 'react';
import { getRegisterPageContent } from '../../../slices/pageSlices/registerPageContentSlices/registerPageContentGetSlice';
import parse from 'html-react-parser';
import { pageVariant } from '../../../animate';
import { motion } from 'framer-motion';

export default function RegisterScreen(props) {
  const isSmallerScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFirstName = (name) => {
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setFirstName(name);
      setFirstNameError('');
    } else {
      setFirstName('');
      setFirstNameError('Enter Valid First Name');
    }
  };

  const validateLastName = (name) => {
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setLastName(name);
      setLastNameError('');
    } else {
      setLastName('');
      setLastNameError('Enter Valid Last Name');
    }
  };

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

  const validateConfirmPassword = (confirmPassword) => {
    if (password === confirmPassword) {
      setPassword(password);
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Passwords must match');
    }
  };

  const registerPageContentGetSlice = useSelector(
    (state) => state.registerPageContentGetSlice
  );
  const {
    status: statusContent,
    content,
    error: errorContent
  } = registerPageContentGetSlice;

  const userRegister = useSelector((state) => state.userRegister);
  const { status, createdUser, error } = userRegister;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisterPageContent({}));
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ firstName, lastName, email, password }));
  };

  return (
    <div>
      <Header register></Header>
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
          variants={pageVariant}
          initial="initial"
          animate="final"
          className={`row ${styles.main_wrapper}`}
        >
          <div
            className={`col-md-6 ${styles.info_box}`}
            style={{
              backgroundImage: `url(${content && content.mainBackgroundImage})`
            }}
          ></div>
          <div
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
            <div className={styles.register_wrapper}>
              <div className="ql-editor">
                <div className={styles.title}>
                  {content && parse(content.mainHeading)}
                </div>
              </div>
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {createdUser && (
                <MessageBox variant="success">
                  Success. Verify Email In Inbox.
                </MessageBox>
              )}
              <form onSubmit={onSubmitHandler} className={styles.form}>
                <div>
                  {firstNameError && (
                    <MessageBox validation>{firstNameError}</MessageBox>
                  )}
                  <input
                    style={{
                      backgroundColor: content && content.inputBackgroundColor,
                      color: content && content.inputTextColor,
                      outline: `1px solid ${
                        content && content.inputBorderColor
                      }`,
                      border: `2px solid ${content && content.inputBorderColor}`
                    }}
                    className={`${styles.input} ${
                      firstNameError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter first name"
                    type="text"
                    name="first_name"
                    onChange={(e) => validateFirstName(e.target.value)}
                  ></input>
                </div>
                <div>
                  {lastNameError && (
                    <MessageBox validation>{lastNameError}</MessageBox>
                  )}
                  <input
                    style={{
                      backgroundColor: content && content.inputBackgroundColor,
                      color: content && content.inputTextColor,
                      outline: `1px solid ${
                        content && content.inputBorderColor
                      }`,
                      border: `2px solid ${content && content.inputBorderColor}`
                    }}
                    className={`${styles.input} ${
                      lastNameError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter last name"
                    type="text"
                    name="last_name"
                    onChange={(e) => validateLastName(e.target.value)}
                  ></input>
                </div>
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
                <div>
                  {passwordError && (
                    <MessageBox validation>{passwordError}</MessageBox>
                  )}
                  <input
                    style={{
                      backgroundColor: content && content.inputBackgroundColor,
                      color: content && content.inputTextColor,
                      outline: `1px solid ${
                        content && content.inputBorderColor
                      }`,
                      border: `2px solid ${content && content.inputBorderColor}`
                    }}
                    className={`${styles.input} ${
                      passwordError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    onChange={(e) => validatePassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  {confirmPasswordError && (
                    <MessageBox validation>{confirmPasswordError}</MessageBox>
                  )}
                  <input
                    style={{
                      backgroundColor: content && content.inputBackgroundColor,
                      color: content && content.inputTextColor,
                      outline: `1px solid ${
                        content && content.inputBorderColor
                      }`,
                      border: `2px solid ${content && content.inputBorderColor}`
                    }}
                    className={`${styles.input} ${
                      confirmPasswordError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Confirm password"
                    type="password"
                    name="confirm_password"
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    style={{
                      '--button-text-color':
                        content && content.registerButtonTextColor,
                      '--button-background-color':
                        content && content.registerButtonBackgroundColor,
                      '--button-border-color':
                        content && content.registerButtonTextColor
                    }}
                    className={styles.submit_button}
                    type="submit"
                  >
                    {status === 'loading' ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      `Register`
                    )}
                  </button>
                </div>
                <p className="mt-1">
                  <div className="ql-editor mb-2">
                    {content && parse(content.newAccountText)}
                  </div>
                  <Link
                    style={{
                      '--link-text-color':
                        content && content.signUpLinkTextColor,
                      '--link-background-color':
                        content && content.signUpLinkBackgroundColor,
                      '--link-border-color':
                        content && content.signUpLinkBorderColor
                    }}
                    className={`border_bottom ${styles.link}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.section>
      )}

      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
