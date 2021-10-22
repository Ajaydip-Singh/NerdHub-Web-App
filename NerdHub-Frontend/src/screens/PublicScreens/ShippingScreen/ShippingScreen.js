import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive/';
import validator from 'validator';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { saveShippingAddress } from '../../../slices/shopSlices/cartSlice';
import {} from '../../../slices/userSlices/userUpdateSlice';
import styles from './ShippingScreen.module.css';

export default function ShippingScreen(props) {
  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;

  const [addressName, setAddressName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [addressNameError, setAddressNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const [validForm, setValidForm] = useState(false);

  const validateTextInput = (input, field, setField, setFieldError) => {
    setField(input);
    if (
      validator.isLength(input, { min: 3 }) &&
      validator.isAlpha(input, ['en-US'], { ignore: '/[, ]+/g' })
    ) {
      setFieldError('');
    } else {
      setFieldError(`Enter Valid ${field}`);
    }
    setValidForm(isFormValid());
  };

  const validatePostalCode = (input) => {
    setPostalCode(input);
    if (validator.isLength(input, { min: 3 })) {
      setPostalCodeError('');
    } else {
      setPostalCodeError('Enter Valid Postal Code');
    }
    setValidForm(isFormValid());
  };

  const isFormValid = () => {
    const value = [
      addressNameError,
      addressError,
      cityError,
      countryError,
      postalCodeError
    ].every((err) => err === '');
    const notEmpty = [addressName, address, city, country, postalCode].every(
      (input) => input.length !== 0
    );
    return value && notEmpty;
  };

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // If no validation errors then save shipping address
    if (isFormValid()) {
      dispatch(
        saveShippingAddress({
          name: addressName,
          address,
          city,
          country,
          postalCode
        })
      );
      props.history.push('/shop/order');
    }
  };

  useEffect(() => {
    if (cart.length === 0 || !user) {
      props.history.push('/shop');
    }

    // if (shippingAddress) {
    //   setAddressName(shippingAddress.name);
    //   setAddress(shippingAddress.address);
    //   setCity(shippingAddress.city);
    //   setCountry(shippingAddress.country);
    //   setPostalCode(shippingAddress.postalCode);
    //   setValidForm(true);
    // }
  }, [dispatch, user, cart, props.history]);

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
        <section className={styles.wrapper}>
          <h3 className={styles.main_heading}>Shipping Address</h3>
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <div>
              <label htmlFor="address_name">Address Name</label>
              {addressNameError && (
                <MessageBox validation>{addressNameError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  addressNameError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter address name"
                type="text"
                id="address_name"
                name="address_name"
                value={addressName}
                onChange={(e) =>
                  validateTextInput(
                    e.target.value,
                    'Address Name',
                    setAddressName,
                    setAddressNameError
                  )
                }
              ></input>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              {addressError && (
                <MessageBox validation>{addressError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  addressError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter address"
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) =>
                  validateTextInput(
                    e.target.value,
                    'Address',
                    setAddress,
                    setAddressError
                  )
                }
              ></input>
            </div>
            <div>
              <label htmlFor="city">City</label>
              {cityError && <MessageBox validation>{cityError}</MessageBox>}
              <input
                className={`${styles.input} ${
                  cityError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter City"
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) =>
                  validateTextInput(
                    e.target.value,
                    'City',
                    setCity,
                    setCityError
                  )
                }
              ></input>
            </div>
            <div>
              <label htmlFor="country">Country</label>
              {countryError && (
                <MessageBox validation>{countryError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  countryError ? `${styles.val_danger}` : ``
                }`}
                placeholder="Enter country"
                id="country"
                type="country"
                name="country"
                value={country}
                onChange={(e) =>
                  validateTextInput(
                    e.target.value,
                    'Country',
                    setCountry,
                    setCountryError
                  )
                }
              ></input>
            </div>
            <div>
              <label htmlFor="postal_code">Postal Code</label>
              {postalCodeError && (
                <MessageBox validation>{postalCodeError}</MessageBox>
              )}
              <input
                className={`${styles.input} ${
                  postalCodeError ? `${styles.val_danger}` : ``
                }`}
                value={postalCode}
                placeholder="Enter Postal Coder"
                name="postal_code"
                onChange={(e) => validatePostalCode(e.target.value)}
              ></input>
            </div>
            <div>
              <button
                className={styles.submit_button}
                type="submit"
                disabled={!validForm}
              >
                Confirm Shipping Address
              </button>
            </div>
          </form>
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
