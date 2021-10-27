import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  deleteEventOrder,
  resetDeleteEventOrder
} from '../../../slices/eventOrderSlices/eventOrderDeleteSlice';
import { getEventOrders } from '../../../slices/eventOrderSlices/eventOrdersGetSlice';
import styles from './EventOrdersListScreen.module.css';

export default function EventOrdersListScreen(props) {
  const { pageNumber = '1' } = useParams();

  const eventOrdersGetSlice = useSelector((state) => state.eventOrdersGetSlice);
  const { status, eventOrders, pages, error } = eventOrdersGetSlice;

  const eventOrderDeleteSlice = useSelector(
    (state) => state.eventOrderDeleteSlice
  );
  const {
    status: statusDelete,
    eventOrder: eventOrderDelete,
    error: errorDelete
  } = eventOrderDeleteSlice;

  const dispatch = useDispatch();
  const deleteHandler = (eventOrder) => {
    if (window.confirm(`Are you sure you want to delete ${eventOrder.name}`)) {
      dispatch(deleteEventOrder(eventOrder._id));
    }
  };

  // Cleanup eventOrders page on unmount
  useEffect(() => {
    return () => {
      if (eventOrderDelete) {
        dispatch(resetDeleteEventOrder());
      }
    };
  }, [dispatch, eventOrderDelete]);

  useEffect(() => {
    dispatch(getEventOrders({ pageNumber }));
  }, [dispatch, eventOrderDelete, pageNumber]);

  return (
    <div>
      <Header admin eventOrders_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Event Orders Page</h1>
      </div>
      <div className="table_wrapper">
        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {eventOrderDelete && (
          <MessageBox variant="success">
            EventOrder Deleted Succesfully
          </MessageBox>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventOrders.map((eventOrder) => (
                <tr key={eventOrder._id}>
                  <td>{eventOrder._id}</td>
                  <td>{eventOrder.paymentResult.transaction_id}</td>
                  <td>{eventOrder.user.email}</td>
                  <td>{eventOrder.createdAt.substring(0, 10)}</td>
                  <td>{`${eventOrder.totalPrice} KES`}</td>
                  <td>{eventOrder.isPaid ? 'True' : 'False'}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteHandler(eventOrder)}
                    >
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
        to={'eventOrders-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
