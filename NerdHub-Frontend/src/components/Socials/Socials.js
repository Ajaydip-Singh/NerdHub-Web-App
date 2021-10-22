import styles from './Socials.module.css';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSocialMediaContent } from '../../slices/pageSlices/socialMediaContentSlices/socialMediaContentGetSlice';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

export default function Socials({ vertical, color, hoverColor, text }) {
  const socialMediaContentGetSlice = useSelector(
    (state) => state.socialMediaContentGetSlice
  );
  const { status, content, error } = socialMediaContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSocialMediaContent({}));
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <ul
          className={`align_center space_between ${styles.social_list} ${
            vertical ? `column_f` : `row_f`
          }`}
        >
          {content && content.facebookEnabled === 'true' && (
            <li className={styles.social_list_item}>
              <motion.a
                whileHover={{
                  scale: 1.3,
                  color: hoverColor ? hoverColor : '#fff'
                }}
                href={content && content.facebookLink}
                className={`row_f align-center ${styles.social_link}`}
                style={{ color: color && color }}
              >
                <i class="fab fa-facebook fa-2x fa-fw"></i>
                {text ? 'Facebook' : ''}
              </motion.a>
            </li>
          )}
          {content && content.instagramEnabled === 'true' && (
            <li className={styles.social_list_item}>
              <motion.a
                whileHover={{
                  scale: 1.3,
                  color: hoverColor ? hoverColor : '#fff'
                }}
                href={content && content.instagramLink}
                className={`row_f align-center ${styles.social_link}`}
                style={{ color: color && color }}
              >
                <i class="fab fa-instagram fa-2x fa-fw"></i>
                {text ? 'Instagram' : ''}
              </motion.a>
            </li>
          )}
          {content && content.twitterEnabled === 'true' && (
            <li className={styles.social_list_item}>
              <motion.a
                whileHover={{
                  scale: 1.3,
                  color: hoverColor ? hoverColor : '#fff'
                }}
                href={content && content.twitterLink}
                className={`row_f align-center ${styles.social_link}`}
                style={{ color: color && color }}
              >
                <i class="fab fa-twitter fa-2x fa-fw"></i>
                {text ? 'Twitter' : ''}
              </motion.a>
            </li>
          )}
          {content && content.youtubeEnabled === 'true' && (
            <li className={styles.social_list_item}>
              <motion.a
                whileHover={{
                  scale: 1.3,
                  color: hoverColor ? hoverColor : '#fff'
                }}
                href={content && content.youtubeLink}
                className={`row_f align-center ${styles.social_link}`}
                style={{ color: color && color }}
              >
                <i class="fab fa-youtube fa-2x fa-fw"></i>
                {text ? 'YouTube' : ''}
              </motion.a>
            </li>
          )}
          {content && content.tiktokEnabled === 'true' && (
            <li className={styles.social_list_item}>
              <motion.a
                whileHover={{
                  scale: 1.3,
                  color: hoverColor ? hoverColor : '#fff'
                }}
                href={content && content.tiktokLink}
                className={`row_f align-center ${styles.social_link}`}
                style={{ color: color && color }}
              >
                <i class="fab fa-tiktok fa-2x fa-fw"></i>
                {text ? 'TikTok' : ''}
              </motion.a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
