import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getCartPageContent } from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import {
  addToCart,
  removeFromCart
} from '../../../slices/shopSlices/cartSlice';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import styles from './CartScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { stripHtml } from '../../../utils';

export default function CartScreen(props) {
  const cartPageContentGetSlice = useSelector(
    (state) => state.cartPageContentGetSlice
  );
  const { status, content, error } = cartPageContentGetSlice;

  const cartSlice = useSelector((state) => state.cartSlice);
  const { cart } = cartSlice;
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const onCheckoutHandler = () => {
    props.history.push('/login?redirect=shop/shipping');
  };

  useEffect(() => {
    dispatch(getCartPageContent({}));
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
            backgroundImage: `url(${content && content.cartBackgroundImage})`
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
                {content && parse(content.cartMainHeading)}
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
                      whileHover={{ scale: 1.05, transformOrigin: 0 }}
                      transition={{ duration: 0.3 }}
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
                        </div>
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
                      <div>
                        <select
                          value={product.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart({
                                productId: product.id,
                                quantity: Number(e.target.value)
                              })
                            )
                          }
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        style={{ color: content && content.productPriceColor }}
                      >
                        KES {product.price}
                      </div>
                      <button
                        type="button"
                        className="button border_bottom"
                        onClick={() => removeFromCartHandler(product.id)}
                      >
                        Remove
                      </button>
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
                    <td>Items:</td>
                    <td>
                      {cart.reduce((a, c) => a + parseFloat(c.quantity), 0)}
                    </td>
                  </tr>
                  <tr>
                    <td>Subtotal:</td>
                    <td>
                      KES{' '}
                      {cart.reduce(
                        (a, c) =>
                          a + parseFloat(c.price) * parseFloat(c.quantity),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={onCheckoutHandler}
                disabled={cart.length === 0}
                className={styles.checkout_button}
                style={{
                  '--checkout-button-text-color':
                    content && content.checkoutButtonTextColor,
                  '--checkout-button-background-color':
                    content && content.checkoutButtonBackgroundColor,
                  '--checkout-button-border-color':
                    content && content.checkoutButtonBorderColor
                }}
              >
                Proceed To Checkout
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
