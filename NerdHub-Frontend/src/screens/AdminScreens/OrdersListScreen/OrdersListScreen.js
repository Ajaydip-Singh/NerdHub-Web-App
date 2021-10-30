import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  editOrderDelivery,
  resetEditOrderDelivery
} from '../../../slices/shopSlices/editOrderDeliverySlice';
import {
  deleteOrder,
  resetDeleteOrder
} from '../../../slices/shopSlices/orderDeleteSlice';
import { getOrders } from '../../../slices/shopSlices/ordersGetSlice';
import styles from './OrdersListScreen.module.css';

export default function OrdersListScreen(props) {
  const { pageNumber = '1' } = useParams();

  const ordersGetSlice = useSelector((state) => state.ordersGetSlice);
  const { status, orders, pages, error } = ordersGetSlice;

  const orderDeleteSlice = useSelector((state) => state.orderDeleteSlice);
  const {
    status: statusDelete,
    order: orderDelete,
    error: errorDelete
  } = orderDeleteSlice;

  const orderEditDeliverySlice = useSelector(
    (state) => state.orderEditDeliverySlice
  );
  const {
    status: statusDelivery,
    order: orderDelivery,
    error: errorDelivery
  } = orderEditDeliverySlice;

  const dispatch = useDispatch();
  const deleteHandler = (order) => {
    if (window.confirm(`Are you sure you want to delete ${order.name}`)) {
      dispatch(deleteOrder(order._id));
    }
  };

  // Cleanup orders page on unmount
  useEffect(() => {
    return () => {
      dispatch(resetEditOrderDelivery());
      if (orderDelete) {
        dispatch(resetDeleteOrder());
      }
    };
  }, [dispatch, orderDelete]);

  useEffect(() => {
    dispatch(getOrders({ pageNumber }));
  }, [dispatch, orderDelete, orderDelivery, pageNumber]);

  return (
    <div>
      <Header admin orders_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Orders Page</h1>
      </div>
      <div className="table_wrapper">
        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {statusDelivery === 'loading' && <LoadingBox></LoadingBox>}
        {orderDelete && (
          <MessageBox variant="success">Order Deleted Succesfully</MessageBox>
        )}
        {orderDelivery && (
          <MessageBox variant="success">Order Delivery Updated</MessageBox>
        )}
        {errorDelivery && (
          <MessageBox variant="danger">{errorDelivery}</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.paymentResult.transaction_id}</td>
                  <td>{order.user.email}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{`${order.totalPrice} KES`}</td>
                  <td>
                    {!order.isPaid ? (
                      <button
                        className="small"
                        type="button"
                        onClick={() =>
                          props.history.push(
                            `/orders-status-admin/${encodeURIComponent(
                              order._id
                            )}/${encodeURIComponent(
                              order.paymentResult.transaction_id
                            )}`
                          )
                        }
                      >
                        Check status
                      </button>
                    ) : (
                      'True'
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      'True'
                    ) : (
                      <button
                        className="small"
                        type="button"
                        onClick={() => {
                          dispatch(editOrderDelivery(order._id));
                        }}
                      >
                        Mark as Delivered (Irreversible)
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/shop/orders/${order._id}`)
                      }
                    >
                      View
                    </button>
                    <button type="button" onClick={() => deleteHandler(order)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pages
        to={'orders-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
