import Header from '../../../components/Header/Header';
import styles from './RegisterPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getRegisterPageContent,
  resetGetRegisterPageContent
} from '../../../slices/pageSlices/registerPageContentSlices/registerPageContentGetSlice';
import {
  resetUpdateRegisterPageContent,
  updateRegisterPageContent
} from '../../../slices/pageSlices/registerPageContentSlices/registerPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function RegisterPageScreen() {
  const [mainHeading, setMainHeading] = useState('');
  const [mainBackgroundImage, setMainBackgroundImage] = useState('');
  const [mainBackgroundColor, setMainBackgroundColor] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState('');
  const [inputBackgroundColor, setInputBackgroundColor] = useState('');
  const [inputTextColor, setInputTextColor] = useState('');
  const [newAccountText, setNewAccountText] = useState('');
  const [registerButtonBorderColor, setRegisterButtonBorderColor] = useState('');
  const [registerButtonBackgroundColor, setRegisterButtonBackgroundColor] =
    useState('');
  const [registerButtonTextColor, setRegisterButtonTextColor] = useState('');
  const [signUpLinkBorderColor, setSignUpLinkBorderColor] = useState('');
  const [signUpLinkBackgroundColor, setSignUpLinkBackgroundColor] =
    useState('');
  const [signUpLinkTextColor, setSignUpLinkTextColor] = useState('');

  const registerPageContentGetSlice = useSelector(
    (state) => state.registerPageContentGetSlice
  );
  const { status, content, error } = registerPageContentGetSlice;

  const registerPageContentUpdateSlice = useSelector(
    (state) => state.registerPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = registerPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateRegisterPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetRegisterPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateRegisterPageContent({
        mainHeading,
        mainBackgroundImage,
        mainBackgroundColor,
        inputBorderColor,
        inputBackgroundColor,
        inputTextColor,
        newAccountText,
        registerButtonBorderColor,
        registerButtonBackgroundColor,
        registerButtonTextColor,
        signUpLinkBorderColor,
        signUpLinkBackgroundColor,
        signUpLinkTextColor
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getRegisterPageContent({}));
    } else {
      setMainHeading(content.mainHeading);
      setMainBackgroundImage(content.mainBackgroundImage);
      setMainBackgroundColor(content.mainBackgroundColor);
      setInputBorderColor(content.inputBorderColor);
      setInputBackgroundColor(content.inputBackgroundColor);
      setInputTextColor(content.inputTextColor);
      setNewAccountText(content.newAccountText);
      setRegisterButtonBorderColor(content.registerButtonBorderColor);
      setRegisterButtonBackgroundColor(content.registerButtonBackgroundColor);
      setRegisterButtonTextColor(content.registerButtonTextColor);
      setSignUpLinkBorderColor(content.signUpLinkBorderColor);
      setSignUpLinkBackgroundColor(content.signUpLinkBackgroundColor);
      setSignUpLinkTextColor(content.signUpLinkTextColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Register Page</h1>
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
                  value={mainHeading}
                  onChange={setMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Main Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={mainBackgroundImage}
                  >
                    {mainBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['slider']}
                  name={'imageUploadSliceA'}
                  setImage={setMainBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Main Background Color</h3>
                <BlockPicker
                  color={mainBackgroundColor}
                  onChangeComplete={(e) => setMainBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Border Color</h3>
                <BlockPicker
                  color={inputBorderColor}
                  onChangeComplete={(e) => setInputBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Background Color</h3>
                <BlockPicker
                  color={inputBackgroundColor}
                  onChangeComplete={(e) => setInputBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Text Color</h3>
                <BlockPicker
                  color={inputTextColor}
                  onChangeComplete={(e) => setInputTextColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>New Account Text</h3>
                <TextEditor
                  placeholder="Enter new account text"
                  value={newAccountText}
                  onChange={setNewAccountText}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Register Button Border Color</h3>
                <BlockPicker
                  color={registerButtonBorderColor}
                  onChangeComplete={(e) => setRegisterButtonBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Register Button Background Color</h3>
                <BlockPicker
                  color={registerButtonBackgroundColor}
                  onChangeComplete={(e) => setRegisterButtonBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Register Button Text Color</h3>
                <BlockPicker
                  color={registerButtonTextColor}
                  onChangeComplete={(e) => setRegisterButtonTextColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>SignUp Link Border Color</h3>
                <BlockPicker
                  color={signUpLinkBorderColor}
                  onChangeComplete={(e) => setSignUpLinkBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>SignUp Link Background Color</h3>
                <BlockPicker
                  color={signUpLinkBackgroundColor}
                  onChangeComplete={(e) => setSignUpLinkBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>SignUp Link Text Color</h3>
                <BlockPicker
                  color={signUpLinkTextColor}
                  onChangeComplete={(e) => setSignUpLinkTextColor(e.hex)}
                />
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
