import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  createEvent,
  resetCreateEvent
} from '../../../slices/eventSlices/eventCreateSlice';
import {
  deleteEvent,
  resetDeleteEvent
} from '../../../slices/eventSlices/eventDeleteSlice';
import { getEvents } from '../../../slices/eventSlices/eventsGetSlice';
import { formatDate, stripHtml } from '../../../utils';
import styles from './EventsPageScreen.module.css';

export default function EventsPageScreen(props) {
  const { pageNumber = '1' } = useParams();

  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const { status, events, pages, error } = eventsGetSlice;

  const eventDeleteSlice = useSelector((state) => state.eventDeleteSlice);
  const {
    status: statusDelete,
    event: eventDelete,
    error: errorDelete
  } = eventDeleteSlice;

  const eventCreateSlice = useSelector((state) => state.eventCreateSlice);
  const {
    status: statusCreate,
    event: eventCreate,
    error: errorCreate
  } = eventCreateSlice;

  const createHandler = () => {
    dispatch(createEvent({}));
  };
  const dispatch = useDispatch();
  const deleteHandler = (event) => {
    if (window.confirm(`Are you sure you want to delete ${event.name}`)) {
      dispatch(deleteEvent(event._id));
    }
  };

  // Cleanup events page on unmount
  useEffect(() => {
    return () => {
      if (eventDelete) {
        dispatch(resetDeleteEvent());
      }
    };
  }, [dispatch, eventDelete]);

  useEffect(() => {
    return () => {
      if (eventCreate) {
        dispatch(resetCreateEvent());
      }
    };
  }, [dispatch, eventCreate]);

  useEffect(() => {
    dispatch(getEvents({ pageNumber }));
  }, [dispatch, eventDelete, eventCreate, pageNumber]);

  return (
    <div>
      <Header admin events_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Events Page</h1>
      </div>
      <div className="table_wrapper">
        {eventCreate && (
          <MessageBox variant="success">Event Created Succesfully</MessageBox>
        )}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {eventDelete && (
          <MessageBox variant="success">Event Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <button type="button" onClick={createHandler} className={styles.button}>
          {statusCreate === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : (
            'Create Event'
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
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Is Active</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{stripHtml(event.name)}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.category}</td>
                  <td>{event.isActive ? 'True' : 'False'}</td>
                  <td>{event.price}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/events-admin/${event._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteHandler(event)}>
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
        to={'events-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
