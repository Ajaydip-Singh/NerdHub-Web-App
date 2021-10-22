import Header from '../../../components/Header/Header';
import styles from './HomePageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getHomePageContent,
  resetGetHomePageContent
} from '../../../slices/pageSlices/homePageContentSlices/homePageContentGetSlice';
import {
  resetUpdateHomePageContent,
  updateHomePageContent
} from '../../../slices/pageSlices/homePageContentSlices/homePageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function HomePageScreen() {
  const [sliderPageOneBackgroundImage, setSliderPageOneBackgroundImage] =
    useState('');
  const [sliderPageTwoBackgroundImage, setSliderPageTwoBackgroundImage] =
    useState('');
  const [sliderPageThreeBackgroundImage, setSliderPageThreeBackgroundImage] =
    useState('');
  const [sliderPageOneContent, setSliderPageOneContent] = useState('');
  const [sliderPageTwoContent, setSliderPageTwoContent] = useState('');
  const [sliderPageThreeContent, setSliderPageThreeContent] = useState('');
  const [videoHeading, setVideoHeading] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [videoBackgroundImage, setVideoBackgroundImage] = useState('');
  const [videoBorderColor, setVideoBorderColor] = useState('');
  const [videoBoxShadowColor, setVideoBoxShadowColor] = useState('');
  const [eventBackgroundImage, setEventBackgroundImage] = useState('');
  const [contactBackgroundColor, setContactBackgroundColor] = useState('');
  const [contactText, setContactText] = useState('');
  const [locationFrameBorderColor, setLocationFrameBorderColor] = useState('');
  const [locationFrame, setLocationFrame] = useState('');

  const homePageContentGetSlice = useSelector(
    (state) => state.homePageContentGetSlice
  );
  const { status, content, error } = homePageContentGetSlice;

  const homePageContentUpdateSlice = useSelector(
    (state) => state.homePageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = homePageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateHomePageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetHomePageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateHomePageContent({
        sliderPageOneBackgroundImage,
        sliderPageOneContent,
        sliderPageTwoBackgroundImage,
        sliderPageTwoContent,
        sliderPageThreeBackgroundImage,
        sliderPageThreeContent,
        videoHeading,
        videoUrl,
        videoThumbnail,
        videoBackgroundImage,
        videoBorderColor,
        videoBoxShadowColor,
        eventBackgroundImage,
        contactBackgroundColor,
        contactText,
        locationFrameBorderColor,
        locationFrame
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getHomePageContent({}));
    } else {
      setSliderPageOneBackgroundImage(content.sliderPageOneBackgroundImage);
      setSliderPageOneContent(content.sliderPageOneContent);
      setSliderPageTwoBackgroundImage(content.sliderPageTwoBackgroundImage);
      setSliderPageTwoContent(content.sliderPageTwoContent);
      setSliderPageThreeBackgroundImage(content.sliderPageThreeBackgroundImage);
      setSliderPageThreeContent(content.sliderPageThreeContent);
      setVideoHeading(content.videoHeading);
      setVideoUrl(content.videoUrl);
      setVideoThumbnail(content.videoThumbnail);
      setVideoBackgroundImage(content.videoBackgroundImage);
      setVideoBorderColor(content.videoBorderColor);
      setVideoBoxShadowColor(content.videoBoxShadowColor);
      setEventBackgroundImage(content.eventBackgroundImage);
      setContactBackgroundColor(content.contactBackgroundColor);
      setContactText(content.contactText);
      setLocationFrameBorderColor(content.locationFrameBorderColor);
      setLocationFrame(content.locationFrame);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Home Page</h1>
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
                <h3>Slider Page One Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={sliderPageOneBackgroundImage}
                  >
                    {sliderPageOneBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['slider']}
                  name={'imageUploadSliceA'}
                  setImage={setSliderPageOneBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Slider Page One Content</h3>
                <TextEditor
                  placeholder="Enter slider page one content"
                  value={sliderPageOneContent}
                  onChange={setSliderPageOneContent}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Slider Page Two Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={sliderPageTwoBackgroundImage}
                  >
                    {sliderPageTwoBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['slider']}
                  name={'imageUploadSliceB'}
                  setImage={setSliderPageTwoBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Slider Page Two Content</h3>
                <TextEditor
                  placeholder="Enter slider page two content"
                  value={sliderPageTwoContent}
                  onChange={setSliderPageTwoContent}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Slider Page Three Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={sliderPageThreeBackgroundImage}
                  >
                    {sliderPageThreeBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['slider']}
                  name={'imageUploadSliceC'}
                  setImage={setSliderPageThreeBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Slider Page Three Content</h3>
                <TextEditor
                  placeholder="Enter slider page three content"
                  value={sliderPageThreeContent}
                  onChange={setSliderPageThreeContent}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Video Heading</h3>
                <TextEditor
                  placeholder="Enter video heading"
                  value={videoHeading}
                  onChange={setVideoHeading}
                ></TextEditor>
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
                <h3>Video Thumbnail Image</h3>
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
                  name={'imageUploadSliceD'}
                  setImage={setVideoThumbnail}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Video Section Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={videoBackgroundImage}
                  >
                    {videoBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['video']}
                  name={'imageUploadSliceE'}
                  setImage={setVideoBackgroundImage}
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
                <h3>Event Section Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={eventBackgroundImage}
                  >
                    {eventBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['home-page']}
                  name={'imageUploadSliceF'}
                  setImage={setEventBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Contact Background Color</h3>
                <BlockPicker
                  color={contactBackgroundColor}
                  onChangeComplete={(e) => setContactBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Contact Text</h3>
                <TextEditor
                  placeholder="Enter contact text"
                  value={contactText}
                  onChange={setContactText}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Location Frame Border Color</h3>
                <BlockPicker
                  color={locationFrameBorderColor}
                  onChangeComplete={(e) => setLocationFrameBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Location Frame </h3>
                <input
                  value={locationFrame}
                  onChange={(e) => setLocationFrame(e.target.value)}
                />
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
