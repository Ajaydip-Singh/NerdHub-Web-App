import { Link } from 'react-router-dom';
import styles from './BottomNav.module.css';

export default function BottomNav(props) {
  const addLinkStyling = (props) => {
    return props ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };

  return (
    <nav className={`row_f align-center ${styles.nav}`}>
      <ul className={`row_f space-evenly align-center ${styles.nav_list}`}>
        <li className={styles.nav_list_item}>
          <Link className={addLinkStyling(props.events)} to="/events">
            <i class="fas fa-user-friends fa-lg"></i>
            <span className={styles.small}>events</span>
          </Link>
        </li>
        <li className={styles.nav_list_item}>
          <Link className={addLinkStyling(props.home)} to="/home">
            <i class="fas fa-home fa-lg"></i>
            <span className={styles.small}>home</span>
          </Link>
        </li>
        <li className={styles.nav_list_item}>
          <Link className={addLinkStyling(props.membership)} to="/membership">
            <i class="fas fa-address-book fa-lg"></i>
            <span className={styles.small}>Membership</span>
          </Link>
        </li>
        <li className={styles.nav_list_item}>
          <Link className={addLinkStyling(props.gallery)} to="/gallery">
            <i class="far fa-image fa-lg"></i>
            <span className={styles.small}>gallery</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
