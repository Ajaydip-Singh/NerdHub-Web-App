import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import { getCartPageContent } from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import { motion } from 'framer-motion';
import styles from './PostPaymentScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { Link } from 'react-router-dom';
import { createEventOrder } from '../../../slices/eventOrderSlices/eventOrderCreateSlice';
import { createOrder } from '../../../slices/shopSlices/orderCreateSlice';

export default function PostPaymentScreen(props) {
  const pesapal_transaction_tracking_id = props.location.search
    ? props.location.search.split('=')[1].split('&')[0]
    : '';

  const pesapal_merchant_reference = props.location.search
    ? props.location.search.split('=')[2]
    : '';

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart, shippingAddress } = cartSlice;

  const dispatch = useDispatch();
  // dispatch(emptyCart());

  useEffect(() => {
    dispatch(getCartPageContent({}));
  }, [dispatch]);

  useEffect(() => {
    if (pesapal_merchant_reference && pesapal_transaction_tracking_id) {
      if (pesapal_merchant_reference.includes('/')) {
        const eventId = pesapal_merchant_reference.split('/')[1];
        const price = pesapal_merchant_reference.split('/')[2];
        dispatch(
          createEventOrder({
            _id: pesapal_merchant_reference,
            event: eventId,
            paymentResult: {
              reference: pesapal_merchant_reference,
              transaction_id: pesapal_transaction_tracking_id,
              status: 'Pending'
            },
            totalPrice: price,
            user: user._id
          })
        );
      } else {
        dispatch(createEventOrder());
        dispatch(
          createOrder({
            _id: pesapal_merchant_reference,
            orderItems: cart,
            shippingAddress: shippingAddress,
            paymentResult: {
              reference: pesapal_merchant_reference,
              transaction_id: pesapal_transaction_tracking_id,
              status: 'Pending'
            },
            totalPrice: cart.reduce(
              (a, c) =>
                a +
                (parseFloat(c.price) + parseFloat(c.taxPrice)) *
                  parseFloat(c.quantity),
              0
            ),
            user: user._id
          })
        );
      }
    }
  }, [
    dispatch,
    cart,
    user,
    shippingAddress,
    pesapal_transaction_tracking_id,
    pesapal_merchant_reference
  ]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      <motion.div
        style={{
          backgroundImage: `url(/images/destruction_long.jpeg)`
        }}
        variants={pageVariant}
        initial="initial"
        animate="final"
      >
        <motion.div
          className={styles.hero_section}
          initial={{ opacity: 0, x: '-100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          variants={sectionVariant}
          whileHover="hover"
        >
          <motion.div
            drag
            dragConstraints={{ top: 10, left: 10, right: 10, bottom: 10 }}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
            whileHover={{ x: 1.5, scale: 1.2 }}
            transition={{ yoyo: 5 }}
            whileDrag={{ scale: 1.2 }}
          >
            <h1>Thank you for your purchase</h1>
          </motion.div>
        </motion.div>
        <div className={styles.main_body}>
          <p
            style={{
              margin: '0 auto',
              maxWidth: 'max-content',
              padding: '2rem'
            }}
          >
            Your payment is being processed. We will notify you once it has
            completed.
            <br />
            <Link to="/shop">Continue Shopping</Link> or{' '}
            <Link to="/events">Explore upcoming events</Link>
          </p>
        </div>
      </motion.div>
      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
