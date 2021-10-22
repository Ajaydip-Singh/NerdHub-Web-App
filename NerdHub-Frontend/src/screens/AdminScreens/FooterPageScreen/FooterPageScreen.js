import Header from '../../../components/Header/Header';
import styles from './FooterPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  resetUpdateFooterContent,
  updateFooterContent
} from '../../../slices/pageSlices/footerContentSlices/footerContentUpdateSlice';
import {
  getFooterContent,
  resetGetFooterContent
} from '../../../slices/pageSlices/footerContentSlices/footerContentGetSlice';

export default function FooterPageScreen() {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [address, setAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [footerHeaderColor, setFooterHeaderColor] = useState('');
  const [footerLinkColor, setFooterLinkColor] = useState('');

  const footerContentGetSlice = useSelector(
    (state) => state.footerContentGetSlice
  );
  const { status, content, error } = footerContentGetSlice;

  const footerContentUpdateSlice = useSelector(
    (state) => state.footerContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = footerContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateFooterContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetFooterContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateFooterContent({
        backgroundColor,
        address,
        emailAddress,
        phone,
        footerHeaderColor,
        footerLinkColor
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getFooterContent({}));
    } else {
      setBackgroundColor(content.backgroundColor);
      setAddress(content.address);
      setEmailAddress(content.emailAddress);
      setPhone(content.phone);
      setFooterHeaderColor(content.footerHeaderColor);
      setFooterLinkColor(content.footerLinkColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Footer Page</h1>
      </div>
      <div className={styles.wrapper}>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <form onSubmit={submitHandler}>
            <div className={styles.editor_wrapper}>
              <div className="editor_wrapper">
                <h3>Footer Background Color</h3>
                <BlockPicker
                  color={backgroundColor}
                  onChangeComplete={(e) => setBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Address</h3>
                <TextEditor
                  placeholder="Enter event description"
                  value={address}
                  onChange={setAddress}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Email Address</h3>
                <input
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Phone</h3>
                <input
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Footer Headers Color</h3>
                <BlockPicker
                  color={footerHeaderColor}
                  onChangeComplete={(e) => setFooterHeaderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Footer Link Color</h3>
                <BlockPicker
                  color={footerLinkColor}
                  onChangeComplete={(e) => setFooterLinkColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Footer page not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">Footer page Updated</MessageBox>
                )}
                <button className={styles.button} type="submit">
                  {statusUpdate === 'loading' ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    `Update`
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
