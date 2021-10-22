import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  createOrder,
  resetCreateOrder
} from '../../../slices/shopSlices/orderCreateSlice';
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

  const orderCreateSlice = useSelector((state) => state.orderCreateSlice);
  const {
    status: statusCreate,
    order: orderCreate,
    error: errorCreate
  } = orderCreateSlice;

  const createHandler = () => {
    dispatch(createOrder({}));
  };
  const dispatch = useDispatch();
  const deleteHandler = (order) => {
    if (window.confirm(`Are you sure you want to delete ${order.name}`)) {
      dispatch(deleteOrder(order._id));
    }
  };

  // Cleanup orders page on unmount
  useEffect(() => {
    return () => {
      if (orderDelete) {
        dispatch(resetDeleteOrder());
      }
    };
  }, [dispatch, orderDelete]);

  useEffect(() => {
    return () => {
      if (orderCreate) {
        dispatch(resetCreateOrder());
      }
    };
  }, [dispatch, orderCreate]);

  useEffect(() => {
    dispatch(getOrders({ pageNumber }));
  }, [dispatch, orderDelete, orderCreate, pageNumber]);

  return (
    <div>
      <Header admin orders_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Orders Page</h1>
      </div>
      <div className="table_wrapper">
        {orderCreate && (
          <MessageBox variant="success">Order Created Succesfully</MessageBox>
        )}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {orderDelete && (
          <MessageBox variant="success">Order Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <button type="button" onClick={createHandler} className={styles.button}>
          {statusCreate === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : (
            'Create Order'
          )}
        </button>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>{order.user.email}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{`${order.totalPrice} KES`}</td>
                  <td>{order.isPaid ? 'True' : 'False'}</td>
                  <td>{order.isDelivered ? 'True' : 'False'}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/orders-admin/${order._id}/edit`)
                      }
                    >
                      Edit
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
