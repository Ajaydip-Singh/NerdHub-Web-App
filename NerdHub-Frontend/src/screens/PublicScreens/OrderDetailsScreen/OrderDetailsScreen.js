import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import styles from './OrderDetailsScreen.module.css';
import { pageVariant, sectionVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { getOrderPageContent } from '../../../slices/pageSlices/orderPageContentSlices/orderPageContentGetSlice';
import { getOrder } from '../../../slices/shopSlices/orderGetSlice';

export default function OrderDetailsScreen(props) {
  const orderId = props.match.params.id;

  const orderPageContentGetSlice = useSelector(
    (state) => state.orderPageContentGetSlice
  );
  const { status, content, error } = orderPageContentGetSlice;

  const orderGetSlice = useSelector((state) => state.orderGetSlice);
  const { status: statusOrder, order, error: errorOrder } = orderGetSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderPageContent({}));
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

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
          {statusOrder === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : errorOrder ? (
            <MessageBox variant="danger">{errorOrder}</MessageBox>
          ) : (
            <div className={styles.main_wrapper}>
              <div className={styles.info}>
                {order &&
                  order.orderItems.map((product) => (
                    <div key={product.id}>
                      <motion.div
                        style={{
                          borderColor:
                            content && content.productCardBorderColor,
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
                                  color:
                                    content && content.productNameActiveColor
                                }}
                                style={{
                                  color: content && content.productNameColor
                                }}
                              >
                                {product.name}
                              </motion.div>
                            </Link>
                          </div>
                        </div>
                        <div>Qty: {product.quantity}</div>
                        <div
                          style={{
                            color: content && content.productPriceColor
                          }}
                        >
                          KES{' '}
                          {parseFloat(product.price) *
                            parseFloat(product.quantity)}
                        </div>
                      </motion.div>
                    </div>
                  ))}
              </div>
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
                        {order &&
                          order.orderItems.reduce(
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
                        {order &&
                          order.orderItems.reduce(
                            (a, c) =>
                              a +
                              parseFloat(c.taxPrice) * parseFloat(c.quantity),
                            0
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td>Order Total</td>
                      <td>KES {order && order.totalPrice}</td>
                    </tr>
                    <tr>
                      <td>Delivery</td>
                      <td>
                        {order && order.isDelivered
                          ? 'Delivered'
                          : 'In Progress'}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment</td>
                      <td>{order && order.isPaid ? 'Paid' : 'In Progress'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
