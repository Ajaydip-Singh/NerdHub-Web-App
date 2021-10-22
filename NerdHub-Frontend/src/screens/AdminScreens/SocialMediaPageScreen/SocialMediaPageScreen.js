import Header from '../../../components/Header/Header';
import styles from './SocialMediaPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  resetUpdateSocialMediaContent,
  updateSocialMediaContent
} from '../../../slices/pageSlices/socialMediaContentSlices/socialMediaContentUpdateSlice';
import {
  getSocialMediaContent,
  resetGetSocialMediaContent
} from '../../../slices/pageSlices/socialMediaContentSlices/socialMediaContentGetSlice';

export default function SocialMediaPageScreen() {
  const [facebookEnabled, setFacebookEnabled] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramEnabled, setInstagramEnabled] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterEnabled, setTwitterEnabled] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [youtubeEnabled, setYoutubeEnabled] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [tiktokEnabled, setTiktokEnabled] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');

  const socialMediaContentGetSlice = useSelector(
    (state) => state.socialMediaContentGetSlice
  );
  const { status, content, error } = socialMediaContentGetSlice;

  const socialMediaContentUpdateSlice = useSelector(
    (state) => state.socialMediaContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = socialMediaContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateSocialMediaContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetSocialMediaContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSocialMediaContent({
        facebookEnabled,
        facebookLink,
        instagramEnabled,
        instagramLink,
        twitterEnabled,
        twitterLink,
        youtubeEnabled,
        youtubeLink,
        tiktokEnabled,
        tiktokLink
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getSocialMediaContent({}));
    } else {
      setFacebookEnabled(content.facebookEnabled);
      setFacebookLink(content.facebookLink);
      setInstagramEnabled(content.instagramEnabled);
      setInstagramLink(content.instagramLink);
      setTwitterEnabled(content.twitterEnabled);
      setTwitterLink(content.twitterLink);
      setYoutubeEnabled(content.youtubeEnabled);
      setYoutubeLink(content.youtubeLink);
      setTiktokEnabled(content.tiktokEnabled);
      setTiktokLink(content.tiktokLink);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Social Media Icons</h1>
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
                <h3>Facebook Enabled</h3>
                <select
                  value={facebookEnabled}
                  onChange={(e) => setFacebookEnabled(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Facebook Link</h3>
                <input
                  placeholder="Enter facebook link"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Instagram Enabled</h3>
                <select
                  value={instagramEnabled}
                  onChange={(e) => setInstagramEnabled(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Instagram Link</h3>
                <input
                  placeholder="Enter instagram link"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Twitter Enabled</h3>
                <select
                  value={twitterEnabled}
                  onChange={(e) => setTwitterEnabled(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Twitter Link</h3>
                <input
                  placeholder="Enter twitter link"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Youtube Enabled</h3>
                <select
                  value={youtubeEnabled}
                  onChange={(e) => setYoutubeEnabled(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Youtube Link</h3>
                <input
                  placeholder="Enter youtube link"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Tiktok Enabled</h3>
                <select
                  value={tiktokEnabled}
                  onChange={(e) => setTiktokEnabled(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Tiktok Link</h3>
                <input
                  placeholder="Enter tiktok link"
                  value={tiktokLink}
                  onChange={(e) => setTiktokLink(e.target.value)}
                ></input>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Social Media Icons not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">
                    Social Media Icons Updated
                  </MessageBox>
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
