import Header from '../../../components/Header/Header';
import styles from './LandingPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  getLandingPageContent,
  resetGetLandingPageContent
} from '../../../slices/pageSlices/landingPageContentSlices/landingPageContentGetSlice';
import {
  resetUpdateLandingPageContent,
  updateLandingPageContent
} from '../../../slices/pageSlices/landingPageContentSlices/landingPageContentUpdateSlice';

export default function LandingPageScreen() {
  const [showVideo, setShowVideo] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [mobileVideoUrl, setMobileVideoUrl] = useState('');

  const landingPageContentGetSlice = useSelector(
    (state) => state.landingPageContentGetSlice
  );
  const { status, content, error } = landingPageContentGetSlice;

  const landingPageContentUpdateSlice = useSelector(
    (state) => state.landingPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = landingPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateLandingPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetLandingPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLandingPageContent({
        showVideo,
        videoUrl,
        mobileVideoUrl
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getLandingPageContent({}));
    } else {
      setShowVideo(content.showVideo);
      setVideoUrl(content.videoUrl);
      setMobileVideoUrl(content.mobileVideoUrl);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Landing Page</h1>
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
                <h3>Show Video</h3>
                <select
                  value={showVideo}
                  onChange={(e) => setShowVideo(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Video Url</h3>
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Mobile Video Url</h3>
                <input
                  value={mobileVideoUrl}
                  onChange={(e) => setMobileVideoUrl(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Not updated.
                  </MessageBox>
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
