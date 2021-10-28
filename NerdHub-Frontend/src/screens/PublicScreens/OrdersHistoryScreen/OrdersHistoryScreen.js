import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getEventOrdersUser } from '../../../slices/eventOrderSlices/eventOrdersUserGetSlice';
import { getOrdersUsers } from '../../../slices/shopSlices/ordersUserGetSlice';
import styles from './OrdersHistoryScreen.module.css';
import { motion } from 'framer-motion';
import { pageVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { getOrderHistoryPageContent } from '../../../slices/pageSlices/orderHistoryPageContentSlices/orderHistoryPageContentGetSlice';
import parse from 'html-react-parser';

export default function OrdersHistoryScreen(props) {
  const { pageNumber = '1' } = useParams();

  const orderHistoryPageContentGetSlice = useSelector(
    (state) => state.orderHistoryPageContentGetSlice
  );
  const { status, content, error } = orderHistoryPageContentGetSlice;

  const ordersUsersGetSlice = useSelector((state) => state.ordersUsersGetSlice);
  const { orders } = ordersUsersGetSlice;

  const eventOrdersUserGetSlice = useSelector(
    (state) => state.eventOrdersUserGetSlice
  );
  const { orders: eventOrders } = eventOrdersUserGetSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderHistoryPageContent({}));
    dispatch(getOrdersUsers({ pageNumber }));
    dispatch(getEventOrdersUser({ pageNumber }));
  }, [dispatch, pageNumber]);

  return (
    <div className={styles.screen}>
      <Header my_orders></Header>
      <div className="table_wrapper">
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <motion.div
              variants={pageVariant}
              initial="initial"
              animate="final"
              style={{
                backgroundImage: `url(${
                  content && content.orderHistoryBackgroundImage
                })`
              }}
            >
              <div className={styles.hero_section}>
                <div className="ql-editory">
                  {content && parse(content.orderHistoryMainHeading)}
                </div>
              </div>
              <div className={styles.main_wrapper}>
                {orders &&
                orders.length !== 0 &&
                eventOrders &&
                eventOrders.length !== 0 ? (
                  <>
                    <div className="ql-editor">
                      {content && parse(content.ordersMainHeading)}
                    </div>
                    <div className={styles.table_wrapper}>
                      <table
                        className={styles.table}
                        style={{
                          '--table-color-border':
                            content && content.tableBorderColor,
                          '--table-color-even':
                            content && content.tableEvenRowBackgroundColor,
                          '--table-text-color-even':
                            content && content.tableEvenRowTextColor,
                          '--table-color-odd':
                            content && content.tableOddRowBackgroundColor,
                          '--table-text-color-odd':
                            content && content.tableOddRowTextColor
                        }}
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.map((order) => (
                              <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{`${order.totalPrice} KES`}</td>
                                <td>{order.isPaid ? 'True' : 'False'}</td>
                                <td>{order.isDelivered ? 'True' : 'False'}</td>
                                <td>
                                  <button
                                    className="small"
                                    type="button"
                                    onClick={() =>
                                      props.history.push(
                                        `/shop/orders/${order._id}`
                                      )
                                    }
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <br />
                    <div className="ql-editory">
                      {content && parse(content.eventsMainHeading)}
                    </div>

                    <div className={styles.table_wrapper}>
                      <table
                        className={styles.table}
                        style={{
                          '--table-color-border':
                            content && content.tableBorderColor,
                          '--table-color-even':
                            content && content.tableEvenRowBackgroundColor,
                          '--table-text-color-even':
                            content && content.tableEvenRowTextColor,
                          '--table-color-odd':
                            content && content.tableOddRowBackgroundColor,
                          '--table-text-color-odd':
                            content && content.tableOddRowTextColor
                        }}
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventOrders &&
                            eventOrders.map((order) => (
                              <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{`${order.totalPrice} KES`}</td>
                                <td>{order.isPaid ? 'True' : 'False'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className={styles.min_height}>
                    <div className="ql-editor">
                      {content && parse(content.noOrdersAvailable)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            <MediaQuery minWidth={800}>
              <Footer></Footer>
            </MediaQuery>
            <MediaQuery maxWidth={800}>
              <BottomNav></BottomNav>
            </MediaQuery>
          </>
        )}
      </div>
    </div>
  );
}
