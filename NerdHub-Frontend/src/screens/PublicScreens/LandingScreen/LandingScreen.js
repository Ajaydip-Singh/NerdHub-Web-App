import React, { useEffect } from 'react';
import styles from './LandingScreen.module.css';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';
import Header from '../../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getLandingPageContent } from '../../../slices/pageSlices/landingPageContentSlices/landingPageContentGetSlice';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';

export default function LandingScreen(props) {
  const landingPageContentGetSlice = useSelector(
    (state) => state.landingPageContentGetSlice
  );
  const { status, content, error } = landingPageContentGetSlice;

  const isSmallerScreen = useMediaQuery({ query: '(max-width: 474px)' });
  const onEnded = () => {
    props.history.push('/home');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Header home></Header>
      {status === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : error ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
        <div className={styles.video}>
          {content && content.showVideo ? (
            <ReactPlayer
              url={
                !isSmallerScreen
                  ? content && content.videoUrl
                  : content && content.mobileVideoUrl
              }
              height="100vh"
              width="100vw"
              playing={true}
              onEnded={() => onEnded()}
            />
          ) : (
            props.history.push('/home')
          )}
        </div>
      )}
    </div>
  );
}
