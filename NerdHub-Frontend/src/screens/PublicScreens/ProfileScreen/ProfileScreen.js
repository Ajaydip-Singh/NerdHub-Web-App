import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive/';
import validator from 'validator';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { detailsUser } from '../../../slices/userSlices/userDetailsSlice';
import {
  resetUpdateUser,
  updateUser
} from '../../../slices/userSlices/userUpdateSlice';
import styles from './ProfileScreen.module.css';

export default function ProfileScreen() {
  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const userDetails = useSelector((state) => state.userDetails);
  const { status, user: userInfo, error } = userDetails;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const {
    status: statusUpdate,
    user: userUpdate,
    error: errorUpdate
  } = userUpdateSlice;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [validForm, setValidForm] = useState(true);

  const validateFirstName = (name) => {
    setFirstName(name);
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setFirstNameError('');
    } else {
      setFirstNameError('Enter Valid First Name');
    }
    setValidForm(isFormValid());
  };

  const validateLastName = (name) => {
    setLastName(name);
    if (validator.isLength(name, { min: 3 }) && validator.isAlpha(name)) {
      setLastNameError('');
    } else {
      setLastNameError('Enter Valid Last Name');
    }
    setValidForm(isFormValid());
  };

  const validatePhone = (phone) => {
    setPhone(phone);
    if (validator.isMobilePhone(phone)) {
      setPhoneError('');
    } else {
      setPhoneError('Enter Valid Phone Number. Begin with country code.');
    }
    setValidForm(isFormValid());
  };

  const validatePassword = (password) => {
    setPassword(password);
    if (password) {
      if (validator.isStrongPassword(password, { min: 10 })) {
        setPasswordError('');
      } else {
        setPasswordError('Enter Strong Password');
      }
    } else {
      setPasswordError('');
    }
    setValidForm(isFormValid());
  };

  const validateConfirmPassword = (confirmPassword) => {
    setPassword(password);
    setConfirmPassword(confirmPassword);
    if (password || confirmPassword) {
      if (password === confirmPassword) {
        setConfirmPasswordError('');
      } else {
        setConfirmPasswordError('Passwords must match');
      }
    } else {
      setConfirmPasswordError('');
    }
    setValidForm(isFormValid());
  };

  const isFormValid = () => {
    const value = [
      firstNameError,
      lastNameError,
      passwordError,
      confirmPasswordError
    ].every((err) => err === '');
    console.log(`Form is valid: ${value}`);
    return value;
  };

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(resetUpdateUser());

    // If no validation errors then update Profile
    if (isFormValid()) {
      // Update user details
      dispatch(
        updateUser({
          firstName,
          lastName,
          phone,
          password
        })
      );
    }
  };

  // Cleanup update user on unmount
  useEffect(() => {
    return () => {
      dispatch(resetUpdateUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(detailsUser({ userId: user._id }));
    } else {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setPhone(userInfo.phone);
    }
  }, [dispatch, user, userInfo]);

  return (
    <div>
      <Header profile></Header>
      <div
        className={styles.main_wrapper}
        style={{
          backgroundImage: 'url(images/call_of_duty_ghosts.jpeg)',
          backgroundPosition: 'top'
        }}
      >
        <section className={styles.hero_section}>
          <h1 className={styles.heading}>Hi {user.firstName}</h1>
          <p className={styles.subheading}>{user.email}</p>
        </section>
        <section className={styles.wrapper}>
          <h3>Profile</h3>
          {status === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {userUpdate && (
                <MessageBox variant="success">Updated Profile</MessageBox>
              )}
              <form onSubmit={onSubmitHandler} className={styles.form}>
                <div>
                  <label htmlFor="first_name">First Name</label>
                  {firstNameError && (
                    <MessageBox validation>{firstNameError}</MessageBox>
                  )}
                  <input
                    className={`${styles.input} ${
                      firstNameError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter first name"
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => validateFirstName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="last_name">Last Name</label>
                  {lastNameError && (
                    <MessageBox validation>{lastNameError}</MessageBox>
                  )}
                  <input
                    className={`${styles.input} ${
                      lastNameError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter last name"
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => validateLastName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  {phoneError && (
                    <MessageBox validation>{phoneError}</MessageBox>
                  )}
                  <input
                    className={`${styles.input} ${
                      phoneError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter Phone"
                    type="text"
                    id="phone"
                    name="phone"
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => validatePhone(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="password">New Password</label>
                  {passwordError && (
                    <MessageBox validation>{passwordError}</MessageBox>
                  )}
                  <input
                    className={`${styles.input} ${
                      passwordError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Enter new password"
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  {confirmPasswordError && (
                    <MessageBox validation>{confirmPasswordError}</MessageBox>
                  )}
                  <input
                    className={`${styles.input} ${
                      confirmPasswordError ? `${styles.val_danger}` : ``
                    }`}
                    placeholder="Confirm new password"
                    type="password"
                    name="confirm_password"
                    autoComplete="new-password"
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    className={styles.submit_button}
                    type="submit"
                    disabled={!validForm}
                  >
                    {statusUpdate === 'loading' ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      `Update Profile`
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
