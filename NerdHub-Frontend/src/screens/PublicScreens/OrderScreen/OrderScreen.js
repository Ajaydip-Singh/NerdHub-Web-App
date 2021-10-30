import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import styles from './OrderScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import axios from 'axios';
import { stripHtml } from '../../../utils';
import { getOrderPageContent } from '../../../slices/pageSlices/orderPageContentSlices/orderPageContentGetSlice';

export default function OrderScreen(props) {
  const [total, setTotal] = useState(0);

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const orderPageContentGetSlice = useSelector(
    (state) => state.orderPageContentGetSlice
  );
  const { status, content, error } = orderPageContentGetSlice;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;

  const dispatch = useDispatch();

  const onPesaPalPaymentHandler = async () => {
    const cartItems = cart.map((item) => {
      return {
        UniqueId: item.id,
        Particulars: stripHtml(item.name),
        Quantity: item.quantity,
        Unitcost: item.price,
        Subtotal: parseFloat(item.quantity) * parseFloat(item.price)
      };
    });

    const { data } = await axios.post('/api/pesapal/order/post', {
      Amount: total,
      Type: 'MERCHANT',
      Description: 'Online Shopping at Nerdhub',
      Reference: `${user._id}${Date.now()}`,
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName,
      LineItems: cartItems
    });
    window.location.href = data;
  };

  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce(
          (a, c) =>
            a +
            (parseFloat(c.price) +
              parseFloat(c.shippingPrice) +
              parseFloat(c.taxPrice)) *
              parseFloat(c.quantity),
          0
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    dispatch(getOrderPageContent({}));
  }, [dispatch]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
      {status === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : error ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
        <motion.div
          style={{
            backgroundImage: `url(${content && content.orderBackgroundImage})`
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
                {content && parse(content.orderMainHeading)}
              </div>
            </motion.div>
          </motion.div>
          <div className={styles.main_wrapper}>
            {/* <h1>Shopping cart</h1> */}
            {cart.length === 0 ? (
              <div className={styles.empty_cart}>
                Cart is empty. <Link to="/shop">Go shopping</Link>
              </div>
            ) : (
              <div className={styles.info}>
                {cart.map((product) => (
                  <div key={product.id}>
                    <motion.div
                      style={{
                        borderColor: content && content.productCardBorderColor,
                        backgroundColor:
                          content && content.productCardBackgroundColor
                      }}
                      className={styles.info_row}
                    >
                      <div>
                        <img
                          style={{
                            borderColor:
                              content && content.productImageBorderColor
                          }}
                          src={product.thumbnailImage}
                          alt={product.name}
                          className={styles.image}
                        />
                      </div>
                      <div>
                        <div>
                          <Link
                            className={styles.name}
                            to={`/shop/products/${product.id}`}
                          >
                            <motion.div
                              whileHover={{
                                color: content && content.productNameActiveColor
                              }}
                              style={{
                                color: content && content.productNameColor
                              }}
                            >
                              {product.name}
                            </motion.div>
                          </Link>
                          {product.shippingInfo && (
                            <div
                              style={{
                                color: content && content.shippingInfoColor
                              }}
                            >
                              {stripHtml(product.shippingInfo)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>Qty: {product.quantity}</div>
                      <div
                        style={{ color: content && content.productPriceColor }}
                      >
                        KES{' '}
                        {parseFloat(product.price) *
                          parseFloat(product.quantity)}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                border: `2px solid ${content && content.tableBorderColor}`
              }}
              className={styles.checkout}
            >
              <table
                style={{
                  '--table-color-border': content && content.tableBorderColor,
                  '--table-color-even':
                    content && content.tableEvenRowBackgroundColor,
                  '--table-text-color-even':
                    content && content.tableEvenRowTextColor,
                  '--table-color-odd':
                    content && content.tableOddRowBackgroundColor,
                  '--table-text-color-odd':
                    content && content.tableOddRowTextColor
                }}
                className={styles.table}
              >
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a + parseFloat(c.price) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a + parseFloat(c.taxPrice) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Delivery</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a +
                          parseFloat(c.shippingPrice) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Order Total</td>
                    <td>KES {total}</td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => onPesaPalPaymentHandler()}
                disabled={cart.length === 0}
                style={{
                  '--checkout-button-text-color':
                    content && content.checkoutButtonTextColor,
                  '--checkout-button-background-color':
                    content && content.checkoutButtonBackgroundColor,
                  '--checkout-button-border-color':
                    content && content.checkoutButtonBorderColor
                }}
                className={`mb-2 ${styles.checkout_button}`}
              >
                Pay With PesaPal
              </button>
            </div>
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
