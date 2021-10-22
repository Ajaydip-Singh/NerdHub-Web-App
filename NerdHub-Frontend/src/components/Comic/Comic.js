import React from 'react';
import parse from 'html-react-parser';
import { stripHtml } from '../../utils';
import styles from './Comic.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Comic(props) {
  const { comic } = props;

  const [fullscreen, setFullScreen] = useState(false);
  return (
    <>
      <motion.div
        className={fullscreen ? styles.fullscreen : styles.hidden}
        key={comic._id}
        onClick={() => {
          fullscreen && setFullScreen(false);
        }}
      ></motion.div>
      <div
        className={fullscreen ? styles.comic_full_screen : styles.comic}
        style={{
          backgroundColor: comic.backgroundColor,
          cursor: 'pointer',
          border: `2px solid ${comic.borderColor}`,
          maxWidth: fullscreen ? '100%' : 'auto'
        }}
        onClick={() => {
          !fullscreen && setFullScreen(true);
        }}
      >
        <div className={styles.content}>
          <img
            className={styles.image}
            src={comic.thumbnailImage}
            alt={stripHtml(comic.name)}
          />
          <div className={`ql-editor ${styles.description}`}>
            {parse(comic.description)}
          </div>
        </div>
      </div>
    </>
  );
}
