import Header from '../../../components/Header/Header';
import styles from './postPaymentPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  getPostPaymentPageContent,
  resetGetPostPaymentPageContent
} from '../../../slices/pageSlices/postPaymentPageContentSlices/postPaymentPageContentGetSlice';
import {
  resetUpdatePostPaymentPageContent,
  updatePostPaymentPageContent
} from '../../../slices/pageSlices/postPaymentPageContentSlices/postPaymentPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import TextEditor from '../../../components/TextEditor/TextEditor';

export default function PostPaymentPageScreen() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [mainText, setMainText] = useState('');
  const [infoText, setInfoText] = useState('');

  const postPaymentPageContentGetSlice = useSelector(
    (state) => state.postPaymentPageContentGetSlice
  );
  const { status, content, error } = postPaymentPageContentGetSlice;

  const postPaymentPageContentUpdateSlice = useSelector(
    (state) => state.postPaymentPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = postPaymentPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdatePostPaymentPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetPostPaymentPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePostPaymentPageContent({
        backgroundImage,
        mainText,
        infoText
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getPostPaymentPageContent({}));
    } else {
      setBackgroundImage(content.backgroundImage);
      setMainText(content.mainText);
      setInfoText(content.infoText);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit PostPayment Page</h1>
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
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={backgroundImage}
                  >
                    {backgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['postPayment-page']}
                  name={'imageUploadSliceA'}
                  setImage={setBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Main Heading</h3>
                <TextEditor
                  placeholder="Enter page main heading"
                  value={mainText}
                  onChange={setMainText}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Info Text</h3>
                <TextEditor
                  placeholder="Enter info text"
                  value={infoText}
                  onChange={setInfoText}
                ></TextEditor>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">Failed. Not updated.</MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">Updated</MessageBox>
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
