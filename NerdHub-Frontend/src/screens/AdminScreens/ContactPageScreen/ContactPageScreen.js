import Header from '../../../components/Header/Header';
import styles from './ContactPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getContactPageContent,
  resetGetContactPageContent
} from '../../../slices/pageSlices/contactPageContentSlices/contactPageContentGetSlice';
import {
  resetUpdateContactPageContent,
  updateContactPageContent
} from '../../../slices/pageSlices/contactPageContentSlices/contactPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function ContactPageScreen() {
  const [contactMainHeading, setContactMainHeading] = useState('');
  const [contactHeroBackgroundImage, setContactHeroBackgroundImage] =
    useState('');
  const [contactMainBackgroundImage, setContactMainBackgroundImage] =
    useState('');
  const [sectionOneText, setSectionOneText] = useState('');
  const [sectionOneImage, setSectionOneImage] = useState('');
  const [locationFrame, setLocationFrame] = useState('');
  const [locationFrameBorderColor, setLocationFrameBorderColor] = useState('');
  const [locationText, setLocationText] = useState('');

  const contactPageContentGetSlice = useSelector(
    (state) => state.contactPageContentGetSlice
  );
  const { status, content, error } = contactPageContentGetSlice;

  const contactPageContentUpdateSlice = useSelector(
    (state) => state.contactPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = contactPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateContactPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetContactPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateContactPageContent({
        contactMainHeading,
        contactHeroBackgroundImage,
        contactMainBackgroundImage,
        sectionOneText,
        sectionOneImage,
        locationFrame,
        locationFrameBorderColor,
        locationText
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getContactPageContent({}));
    } else {
      setContactMainHeading(content.contactMainHeading);
      setContactHeroBackgroundImage(content.contactHeroBackgroundImage);
      setContactMainBackgroundImage(content.contactMainBackgroundImage);
      setSectionOneText(content.sectionOneText);
      setSectionOneImage(content.sectionOneImage);
      setLocationFrame(content.locationFrame);
      setLocationFrameBorderColor(content.locationFrameBorderColor);
      setLocationText(content.locationText);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Contact Page</h1>
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
                <h3>Main Heading</h3>
                <TextEditor
                  placeholder="Enter main heading"
                  value={contactMainHeading}
                  onChange={setContactMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Hero Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={contactHeroBackgroundImage}
                  >
                    {contactHeroBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['contact-page']}
                  name={'imageUploadSliceA'}
                  setImage={setContactHeroBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={contactMainBackgroundImage}
                  >
                    {contactMainBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['contact-page']}
                  name={'imageUploadSliceB'}
                  setImage={setContactMainBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Section One Text</h3>
                <TextEditor
                  placeholder="Enter section one text"
                  value={sectionOneText}
                  onChange={setSectionOneText}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Section One Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={sectionOneImage}
                  >
                    {sectionOneImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['contact-page']}
                  name={'imageUploadSliceC'}
                  setImage={setSectionOneImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Google maps iframe link</h3>
                <input
                  value={locationFrame}
                  onChange={(e) => setLocationFrame(e.target.value)}
                  placeholder="Enter google maps iFrame share link"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Location Frame Border Color</h3>
                <BlockPicker
                  color={locationFrameBorderColor}
                  onChangeComplete={(e) => setLocationFrameBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Location Text</h3>
                <TextEditor
                  placeholder="Enter location text"
                  value={locationText}
                  onChange={setLocationText}
                ></TextEditor>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Event not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">Event Updated</MessageBox>
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
