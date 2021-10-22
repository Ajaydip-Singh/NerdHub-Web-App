import Header from '../../../components/Header/Header';
import styles from './AboutPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getAboutPageContent,
  resetGetAboutPageContent
} from '../../../slices/pageSlices/aboutPageContentSlices/aboutPageContentGetSlice';
import {
  resetUpdateAboutPageContent,
  updateAboutPageContent
} from '../../../slices/pageSlices/aboutPageContentSlices/aboutPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function AboutPageScreen() {
  const [aboutMainHeading, setAboutMainHeading] = useState('');
  const [aboutBackgroundImage, setAboutBackgroundImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [videoBorderColor, setVideoBorderColor] = useState('');
  const [videoBoxShadowColor, setVideoBoxShadowColor] = useState('');
  const [sectionOneHeading, setSectionOneHeading] = useState('');
  const [sectionOneText, setSectionOneText] = useState('');
  const [sectionOneImage, setSectionOneImage] = useState('');
  const [sectionTwoHeading, setSectionTwoHeading] = useState('');
  const [sectionTwoText, setSectionTwoText] = useState('');
  const [sectionTwoImage, setSectionTwoImage] = useState('');

  const aboutPageContentGetSlice = useSelector(
    (state) => state.aboutPageContentGetSlice
  );
  const { status, content, error } = aboutPageContentGetSlice;

  const aboutPageContentUpdateSlice = useSelector(
    (state) => state.aboutPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = aboutPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateAboutPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetAboutPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAboutPageContent({
        aboutMainHeading,
        aboutBackgroundImage,
        videoUrl,
        videoThumbnail,
        videoBorderColor,
        videoBoxShadowColor,
        sectionOneHeading,
        sectionOneText,
        sectionOneImage,
        sectionTwoHeading,
        sectionTwoText,
        sectionTwoImage
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getAboutPageContent({}));
    } else {
      setAboutMainHeading(content.aboutMainHeading);
      setAboutBackgroundImage(content.aboutBackgroundImage);
      setVideoUrl(content.videoUrl);
      setVideoThumbnail(content.videoThumbnail);
      setVideoBorderColor(content.videoBorderColor);
      setVideoBoxShadowColor(content.videoBoxShadowColor);
      setSectionOneHeading(content.sectionOneHeading);
      setSectionOneText(content.sectionOneText);
      setSectionOneImage(content.sectionOneImage);
      setSectionTwoHeading(content.sectionTwoHeading);
      setSectionTwoText(content.sectionTwoText);
      setSectionTwoImage(content.sectionTwoImage);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit About Page</h1>
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
                  placeholder="Enter video heading"
                  value={aboutMainHeading}
                  onChange={setAboutMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={aboutBackgroundImage}
                  >
                    {aboutBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['about-page']}
                  name={'imageUploadSliceA'}
                  setImage={setAboutBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Video Url</h3>
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video url"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Video Thumbnail</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={videoThumbnail}
                  >
                    {videoThumbnail}
                  </a>
                </p>
                <ImageUploader
                  tags={['video']}
                  name={'imageUploadSliceB'}
                  setImage={setVideoThumbnail}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Video Border Color</h3>
                <BlockPicker
                  color={videoBorderColor}
                  onChangeComplete={(e) => setVideoBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Video Box Shadow Color</h3>
                <BlockPicker
                  color={videoBoxShadowColor}
                  onChangeComplete={(e) => setVideoBoxShadowColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Section One Heading</h3>
                <TextEditor
                  placeholder="Enter section one heading"
                  value={sectionOneHeading}
                  onChange={setSectionOneHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Section One Text</h3>
                <TextEditor
                  placeholder="Enter section one heading"
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
                  tags={['about-page']}
                  name={'imageUploadSliceC'}
                  setImage={setSectionOneImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Section Two Heading</h3>
                <TextEditor
                  placeholder="Enter section two heading"
                  value={sectionTwoHeading}
                  onChange={setSectionTwoHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Section Two Text</h3>
                <TextEditor
                  placeholder="Enter section two text"
                  value={sectionTwoText}
                  onChange={setSectionTwoText}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Section Two Image</h3>
                <p>
                  Current Image:{' '}
                  <a target="_blank" rel="noreferrer" href={sectionTwoImage}>
                    {sectionTwoImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['about-page']}
                  name={'imageUploadSliceD'}
                  setImage={setSectionTwoImage}
                ></ImageUploader>
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
