import Header from '../../../components/Header/Header';
import styles from './MembershipPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import {
  getMembershipPageContent,
  resetGetMembershipPageContent
} from '../../../slices/pageSlices/membershipPageContentSlices/membershipPageContentGetSlice';
import {
  resetUpdateMembershipPageContent,
  updateMembershipPageContent
} from '../../../slices/pageSlices/membershipPageContentSlices/membershipPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function MembershipPageScreen() {
  const [membershipMainHeading, setMembershipMainHeading] = useState('');
  const [membershipBackgroundImage, setMembershipBackgroundImage] =
    useState('');
  const [membershipMainContent, setMembershipMainContent] = useState('');
  const [membershipFee, setMembershipFee] = useState('');

  const membershipPageContentGetSlice = useSelector(
    (state) => state.membershipPageContentGetSlice
  );
  const { status, content, error } = membershipPageContentGetSlice;

  const membershipPageContentUpdateSlice = useSelector(
    (state) => state.membershipPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = membershipPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateMembershipPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetMembershipPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateMembershipPageContent({
        membershipMainHeading,
        membershipBackgroundImage,
        membershipMainContent,
        membershipFee
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getMembershipPageContent({}));
    } else {
      setMembershipMainHeading(content.membershipMainHeading);
      setMembershipBackgroundImage(content.membershipBackgroundImage);
      setMembershipMainContent(content.membershipMainContent);
      setMembershipFee(content.membershipFee);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Membership Page</h1>
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
                  placeholder="Enter membership heading"
                  value={membershipMainHeading}
                  onChange={setMembershipMainHeading}
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
                    href={membershipBackgroundImage}
                  >
                    {membershipBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['membership-page']}
                  name={'imageUploadSliceA'}
                  setImage={setMembershipBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Membership Main Content</h3>
                <TextEditor
                  placeholder="Enter video heading"
                  value={membershipMainContent}
                  onChange={setMembershipMainContent}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Membership Fee</h3>
                <input
                  placeholder="Enter membership free amount"
                  value={membershipFee}
                  onChange={(e) => setMembershipFee(e.target.value)}
                ></input>
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Membership page not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">
                    Membership page Updated
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
