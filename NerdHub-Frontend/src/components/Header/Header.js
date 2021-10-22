import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './Header.module.css';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';

export default function Header(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const isSmallerScreen = useMediaQuery({ query: '(max-width: 800px)' });

  return (
    <>
      <header
        className={`row_f ${styles.header} ${
          isSmallerScreen ? `space-between` : ``
        }`}
      >
        <Link to="/">
          <img src="/logo192.png" alt="Nerdhub Logo" className={styles.logo} />
        </Link>

        <nav
          className={`row_f ${styles.nav} ${
            isSmallerScreen ? `flex-end` : `space-between`
          }`}
        >
          {!isSmallerScreen && (
            <ul className={`row_f align-center ${styles.nav_list}`}>
              {props.admin && (
                <>
                  <li className={styles.nav_list_item}>
                    <Link
                      className={addLinkStyling(props.admin)}
                      to="/adminpanel"
                    >
                      Admin Panel
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link className={addLinkStyling(props.home)} to="/home">
                      home
                    </Link>
                  </li>
                </>
              )}
              {!props.admin && (
                <>
                  <li className={styles.nav_list_item}>
                    <Link className={addLinkStyling(props.home)} to="/home">
                      Home
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link className={addLinkStyling(props.events)} to="/events">
                      Events
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link
                      className={addLinkStyling(props.gallery)}
                      to="/gallery"
                    >
                      gallery
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link
                      className={addLinkStyling(props.membership)}
                      to="/membership"
                    >
                      Membership
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link className={addLinkStyling(props.about)} to="/about">
                      About
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link
                      className={addLinkStyling(props.contact)}
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className={styles.nav_list_item}>
                    <Link className={addLinkStyling(props.shop)} to="/shop">
                      Shop
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
          <button
            className={`button ${styles.hamburger_button}`}
            onClick={() => setSideBarIsOpen(true)}
          >
            <div className={styles.hamburger_menu_wrapper}>
              <div className={styles.hamburger_menu}></div>
            </div>
          </button>
        </nav>
      </header>
      <SideBar
        {...props}
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
      ></SideBar>
    </>
  );
}
