import Header from '../../../components/Header/Header';
import styles from './OrderStatusScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  getOrderStatus,
  resetGetOrderStatus
} from '../../../slices/shopSlices/orderStatusGetSlice';
import { useParams } from 'react-router';

export default function OrderStatusScreen() {
  const { order = '', transaction = '' } = useParams();

  const [orderId, setOrderId] = useState(order);
  const [transactionId, setTransationId] = useState(transaction);

  const orderStatusGetSlice = useSelector((state) => state.orderStatusGetSlice);
  const { status, orderStatus, error } = orderStatusGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetGetOrderStatus());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      getOrderStatus({ transactionId: transactionId, merchantRef: orderId })
    );
  };

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Check Order Status</h1>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={submitHandler}>
          <div className={styles.editor_wrapper}>
            <div className="editor_wrapper">
              <h3>Order Id</h3>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              ></input>
            </div>
            <div className="editor_wrapper">
              <h3>Transaction Id</h3>
              <input
                value={transactionId}
                onChange={(e) => setTransationId(e.target.value)}
              ></input>
            </div>
            <div className="editor_wrapper">
              {error && (
                <MessageBox variant="danger">
                  Failed. Cannot check status.
                </MessageBox>
              )}
              <button className={styles.button} type="submit">
                {status === 'loading' ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  `Check Status`
                )}
              </button>
              <br />
              <br />
              {orderStatus && <div>Order status: {orderStatus}</div>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
