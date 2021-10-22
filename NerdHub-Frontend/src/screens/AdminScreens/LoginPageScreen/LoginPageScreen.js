import Header from '../../../components/Header/Header';
import styles from './LoginPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getLoginPageContent,
  resetGetLoginPageContent
} from '../../../slices/pageSlices/loginPageContentSlices/loginPageContentGetSlice';
import {
  resetUpdateLoginPageContent,
  updateLoginPageContent
} from '../../../slices/pageSlices/loginPageContentSlices/loginPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function LoginPageScreen() {
  const [mainHeading, setMainHeading] = useState('');
  const [mainBackgroundImage, setMainBackgroundImage] = useState('');
  const [mainBackgroundColor, setMainBackgroundColor] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState('');
  const [inputBackgroundColor, setInputBackgroundColor] = useState('');
  const [inputTextColor, setInputTextColor] = useState('');
  const [newAccountText, setNewAccountText] = useState('');
  const [loginButtonBorderColor, setLoginButtonBorderColor] = useState('');
  const [loginButtonBackgroundColor, setLoginButtonBackgroundColor] =
    useState('');
  const [loginButtonTextColor, setLoginButtonTextColor] = useState('');
  const [signUpLinkBorderColor, setSignUpLinkBorderColor] = useState('');
  const [signUpLinkBackgroundColor, setSignUpLinkBackgroundColor] =
    useState('');
  const [signUpLinkTextColor, setSignUpLinkTextColor] = useState('');

  const loginPageContentGetSlice = useSelector(
    (state) => state.loginPageContentGetSlice
  );
  const { status, content, error } = loginPageContentGetSlice;

  const loginPageContentUpdateSlice = useSelector(
    (state) => state.loginPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = loginPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateLoginPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetLoginPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLoginPageContent({
        mainHeading,
        mainBackgroundImage,
        mainBackgroundColor,
        inputBorderColor,
        inputBackgroundColor,
        inputTextColor,
        newAccountText,
        loginButtonBorderColor,
        loginButtonBackgroundColor,
        loginButtonTextColor,
        signUpLinkBorderColor,
        signUpLinkBackgroundColor,
        signUpLinkTextColor
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getLoginPageContent({}));
    } else {
      setMainHeading(content.mainHeading);
      setMainBackgroundImage(content.mainBackgroundImage);
      setMainBackgroundColor(content.mainBackgroundColor);
      setInputBorderColor(content.inputBorderColor);
      setInputBackgroundColor(content.inputBackgroundColor);
      setInputTextColor(content.inputTextColor);
      setNewAccountText(content.newAccountText);
      setLoginButtonBorderColor(content.loginButtonBorderColor);
      setLoginButtonBackgroundColor(content.loginButtonBackgroundColor);
      setLoginButtonTextColor(content.loginButtonTextColor);
      setSignUpLinkBorderColor(content.signUpLinkBorderColor);
      setSignUpLinkBackgroundColor(content.signUpLinkBackgroundColor);
      setSignUpLinkTextColor(content.signUpLinkTextColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Login Page</h1>
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
                <h3>Login Button Border Color</h3>
                <BlockPicker
                  color={loginButtonBorderColor}
                  onChangeComplete={(e) => setLoginButtonBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Login Button Background Color</h3>
                <BlockPicker
                  color={loginButtonBackgroundColor}
                  onChangeComplete={(e) => setLoginButtonBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Login Button Text Color</h3>
                <BlockPicker
                  color={loginButtonTextColor}
                  onChangeComplete={(e) => setLoginButtonTextColor(e.hex)}
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
