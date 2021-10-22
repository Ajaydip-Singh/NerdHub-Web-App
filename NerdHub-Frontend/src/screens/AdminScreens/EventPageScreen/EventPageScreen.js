import Header from '../../../components/Header/Header';
import styles from './EventPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import {
  getEventPageContent,
  resetGetEventPageContent
} from '../../../slices/pageSlices/eventPageContentSlices/eventPageContentGetSlice';
import {
  resetUpdateEventPageContent,
  updateEventPageContent
} from '../../../slices/pageSlices/eventPageContentSlices/eventPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import { BlockPicker } from 'react-color';

export default function EventPageScreen() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [comingSoon, setComingSoon] = useState('');
  const [comingSoonText, setComingSoonText] = useState('');
  const [searchBarBorderColor, setSearchBarBorderColor] = useState('');
  const [searchBarInputBackgroundColor, setSearchBarInputBackgroundColor] =
    useState('');
  const [searchBarInputPlaceholderColor, setSearchBarInputPlaceholderColor] =
    useState('');
  const [searchBarInputTextColor, setSearchBarInputTextColor] = useState('');
  const [searchBarIconColor, setSearchBarIconColor] = useState('');
  const [searchBarIconBackgroundColor, setSearchBarIconBackgroundColor] =
    useState('');
  const [searchBarIconBorderColor, setSearchBarIconBorderColor] = useState('');
  const [searchBarButtonColor, setSearchBarButtonColor] = useState('');
  const [searchBarButtonBorderColor, setSearchBarButtonBorderColor] =
    useState('');
  const [searchBarButtonBackgroundColor, setSearchBarButtonBackgroundColor] =
    useState('');

  const eventPageContentGetSlice = useSelector(
    (state) => state.eventPageContentGetSlice
  );
  const { status, content, error } = eventPageContentGetSlice;

  const eventPageContentUpdateSlice = useSelector(
    (state) => state.eventPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = eventPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateEventPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetEventPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEventPageContent({
        backgroundImage,
        comingSoon,
        comingSoonText,
        searchBarBorderColor: searchBarBorderColor.hex,
        searchBarInputBackgroundColor: searchBarInputBackgroundColor.hex,
        searchBarInputPlaceholderColor: searchBarInputPlaceholderColor.hex,
        searchBarInputTextColor: searchBarInputTextColor.hex,
        searchBarIconColor: searchBarIconColor.hex,
        searchBarIconBackgroundColor: searchBarIconBackgroundColor.hex,
        searchBarIconBorderColor: searchBarIconBorderColor.hex,
        searchBarButtonColor: searchBarButtonColor.hex,
        searchBarButtonBorderColor: searchBarButtonBorderColor.hex,
        searchBarButtonBackgroundColor: searchBarButtonBackgroundColor.hex
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getEventPageContent({}));
    } else {
      setBackgroundImage(content.backgroundImage);
      setComingSoon(content.comingSoon);
      setComingSoonText(content.comingSoonText);
      setSearchBarBorderColor(content.searchBarBorderColor);
      setSearchBarInputBackgroundColor(content.searchBarInputBackgroundColor);
      setSearchBarInputPlaceholderColor(content.searchBarInputPlaceholderColor);
      setSearchBarInputTextColor(content.searchBarInputTextColor);
      setSearchBarIconColor(content.searchBarIconColor);
      setSearchBarIconBackgroundColor(content.searchBarIconBackgroundColor);
      setSearchBarIconBorderColor(content.searchBarIconBorderColor);
      setSearchBarButtonColor(content.searchBarButtonColor);
      setSearchBarButtonBorderColor(content.searchBarButtonBorderColor);
      setSearchBarButtonBackgroundColor(content.searchBarButtonBackgroundColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Event Page</h1>
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
                  tags={['event-page']}
                  name={'imageUploadSliceA'}
                  setImage={setBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Coming Soon</h3>
                <select
                  value={comingSoon}
                  onChange={(e) => setComingSoon(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Coming Soon Text</h3>
                <TextEditor
                  value={comingSoonText}
                  onChange={setComingSoonText}
                  placeholder="Enter coming soon text"
                ></TextEditor>
              </div>
              <h1>Search Bar Styles</h1>
              <div className="editor_wrapper">
                <h3>Border Color</h3>
                <BlockPicker
                  color={searchBarBorderColor}
                  onChangeComplete={setSearchBarBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Background Color</h3>
                <BlockPicker
                  color={searchBarInputBackgroundColor}
                  onChangeComplete={setSearchBarInputBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Placeholder Color</h3>
                <BlockPicker
                  color={searchBarInputPlaceholderColor}
                  onChangeComplete={setSearchBarInputPlaceholderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Input Text Color</h3>
                <BlockPicker
                  color={searchBarInputTextColor}
                  onChangeComplete={setSearchBarInputTextColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Search Icon Color</h3>
                <BlockPicker
                  color={searchBarIconColor}
                  onChangeComplete={setSearchBarIconColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Search Icon Background Color</h3>
                <BlockPicker
                  color={searchBarIconBackgroundColor}
                  onChangeComplete={setSearchBarIconBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Search Icon Border Color</h3>
                <BlockPicker
                  color={searchBarIconBorderColor}
                  onChangeComplete={setSearchBarIconBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Color</h3>
                <BlockPicker
                  color={searchBarButtonColor}
                  onChangeComplete={setSearchBarButtonColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Border Color</h3>
                <BlockPicker
                  color={searchBarButtonBorderColor}
                  onChangeComplete={setSearchBarButtonBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Background Color</h3>
                <BlockPicker
                  color={searchBarButtonBackgroundColor}
                  onChangeComplete={setSearchBarButtonBackgroundColor}
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
