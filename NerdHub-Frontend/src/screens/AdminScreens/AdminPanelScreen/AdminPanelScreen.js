import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import styles from './AdminPanelScreen.module.css';

export default function AdminPanelScreen() {
  return (
    <div>
      <Header admin></Header>
      <div className={styles.main_wrapper}>
        <Link to="/home-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Home Page</div>
        </Link>
        <Link to="/membership-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Membership Page</div>
        </Link>
        <Link to="/about-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>About Page</div>
        </Link>
        <Link to="/contact-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Contact Page</div>
        </Link>
        <Link to="/shop-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Shop Page</div>
        </Link>
        <Link to="/comic-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Comics Page</div>
        </Link>
        <Link to="/event-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Events Page</div>
        </Link>
        <Link to="/product-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Product Page</div>
        </Link>
        <Link to="/gallery-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Gallery Page</div>
        </Link>
        <Link to="/cart-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Cart Page</div>
        </Link>
        <Link to="/order-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Order Page</div>
        </Link>
        <Link to="/login-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Login Page</div>
        </Link>
        <Link
          to="/orderHistory-page-content-admin"
          className={styles.card_link}
        >
          <div className={styles.card}>Order History Page</div>
        </Link>
        <Link to="/register-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Register Page</div>
        </Link>
        <Link to="/landing-page-content-admin" className={styles.card_link}>
          <div className={styles.card}>Landing Page</div>
        </Link>
        <Link to="/events-admin" className={styles.card_link}>
          <div className={styles.card}>Events</div>
        </Link>
        <Link to="/orders-admin" className={styles.card_link}>
          <div className={styles.card}>Orders</div>
        </Link>
        <Link to="/event-orders-admin" className={styles.card_link}>
          <div className={styles.card}>Event Orders</div>
        </Link>
        <Link to="/membership-orders-admin" className={styles.card_link}>
          <div className={styles.card}>Membership Orders</div>
        </Link>
        <Link to="/comics-admin" className={styles.card_link}>
          <div className={styles.card}>Comics</div>
        </Link>
        <Link to="/products-admin" className={styles.card_link}>
          <div className={styles.card}>Products</div>
        </Link>
        <Link to="/gallery-admin" className={styles.card_link}>
          <div className={styles.card}>Gallery Items</div>
        </Link>
        <Link to="/footer-admin" className={styles.card_link}>
          <div className={styles.card}>Footer</div>
        </Link>
        <Link to="/socialMedia-admin" className={styles.card_link}>
          <div className={styles.card}>Social Media</div>
        </Link>
      </div>
    </div>
  );
}
