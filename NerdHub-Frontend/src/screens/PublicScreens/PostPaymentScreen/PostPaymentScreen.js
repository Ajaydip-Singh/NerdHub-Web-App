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
import { createEventOrder } from '../../../slices/eventOrderSlices/eventOrderCreateSlice';
import { createOrder } from '../../../slices/shopSlices/orderCreateSlice';
import { createMembershipOrder } from '../../../slices/membershipOrderSlices/membershipOrderCreateSlice';
import { getPostPaymentPageContent } from '../../../slices/pageSlices/postPaymentPageContentSlices/postPaymentPageContentGetSlice';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import parse from 'html-react-parser';

export default function PostPaymentScreen(props) {
  const pesapal_transaction_tracking_id = props.location.search
    ? props.location.search.split('=')[1].split('&')[0]
    : '';

  const pesapal_merchant_reference = props.location.search
    ? props.location.search.split('=')[2]
    : '';

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const postPaymentPageContentGetSlice = useSelector(
    (state) => state.postPaymentPageContentGetSlice
  );
  const { status, content, error } = postPaymentPageContentGetSlice;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart, shippingAddress } = cartSlice;

  const dispatch = useDispatch();
  // dispatch(emptyCart());

  useEffect(() => {
    dispatch(getCartPageContent({}));
    dispatch(getPostPaymentPageContent({}));
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
      } else if (pesapal_merchant_reference.includes('-')) {
        const price = pesapal_merchant_reference.split('-')[0];
        dispatch(
          createMembershipOrder({
            _id: pesapal_merchant_reference,
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
      {status === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <motion.div
          style={{
            backgroundImage: `url(${content && content.backgroundImage})`
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
              <div className="ql-editor">
                {content && parse(content.mainText)}
              </div>
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
              <div className="ql-editor">
                {content && parse(content.infoText)}
              </div>
            </p>
          </div>
        </motion.div>
      )}

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
