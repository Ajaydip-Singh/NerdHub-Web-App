import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Socials from '../Socials/Socials';
import styles from './Footer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFooterContent } from '../../slices/pageSlices/footerContentSlices/footerContentGetSlice';
import parse from 'html-react-parser';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

export default function Footer() {
  const footerContentGetSlice = useSelector(
    (state) => state.footerContentGetSlice
  );
  const { status, content, error } = footerContentGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFooterContent({}));
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div
          style={{ backgroundColor: content && content.backgroundColor }}
          className={styles.footer}
        >
          <div className="row_f space-around container">
            <div>
              <h4
                style={{ color: content && content.footerHeaderColor }}
                className={styles.footer_heading}
              >
                Address
              </h4>
              <div className="ql-editor">
                {content && parse(content.address)}
              </div>
            </div>
            <div>
              <h4
                style={{ color: content && content.footerHeaderColor }}
                className={styles.footer_heading}
              >
                Explore
              </h4>
              <ul>
                <motion.li
                  whileHover={{
                    scale: 1.3
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    className={styles.footer_link}
                    to="/home"
                  >
                    Home
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/events"
                  >
                    Events
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/gallery"
                  >
                    Gallery
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/membership"
                  >
                    Membership
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/about"
                  >
                    About
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3,
                    color: content && content.footerLinkHoverColor
                  }}
                >
                  <Link
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    color={{ color: content && content.footerLinkColor }}
                    className={styles.footer_link}
                    to="/shop"
                  >
                    Shop
                  </Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h4
                style={{ color: content && content.footerHeaderColor }}
                className={styles.footer_heading}
              >
                Contact
              </h4>
              <ul className="column_f">
                <motion.li
                  whileHover={{
                    scale: 1.3
                  }}
                  className={styles.footer_list_item}
                >
                  <a
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    className={`row_f align-center ${styles.footer_link}`}
                    href="mailto:nerdhub@gmail.com"
                  >
                    <i class="fas fa-envelope fa-2x fa-fw"></i>
                    Email
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{
                    scale: 1.3
                  }}
                >
                  <a
                    style={{
                      color: content && content.footerLinkColor
                    }}
                    className={`row_f align-center ${styles.footer_link}`}
                    href="tel:"
                  >
                    <i class="fas fa-phone-alt fa-2x fa-fw"></i>
                    Phone
                  </a>
                </motion.li>
              </ul>
            </div>
            <div>
              <h4
                style={{ color: content && content.footerHeaderColor }}
                className={styles.footer_heading}
              >
                Socials
              </h4>
              <Socials
                vertical
                text
                color={content && content.footerLinkColor}
                hoverColor={content && content.footerLinkColor}
              ></Socials>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
