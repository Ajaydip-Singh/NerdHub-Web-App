import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Event.module.css';
import { formatDate, stripHtml } from '../../utils';
import { eventVariant } from '../../animate';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Event(props) {
  const { event, order, screen, focus } = props;

  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  const [fullscreen, setFullScreen] = useState(focus ? true : false);

  const registerHandler = async () => {
    const { data } = await axios.post('/api/pesapal/order/post', {
      Amount: event.price,
      Type: 'MERCHANT',
      Description: `Nerdhub Event Registration: ${stripHtml(event.name)}`,
      Reference: '1234',
      Email: user.email,
      FirstName: user.firstName,
      LastName: user.lastName
    });
    window.location.href = data;
  };

  return (
    <>
      <motion.div
        className={
          fullscreen && screen === 'eventScreen' ? styles.fullscreen : ''
        }
        key={event._id}
        onClick={() => {
          fullscreen && screen === 'eventScreen' && setFullScreen(false);
        }}
      ></motion.div>
      <div className={fullscreen && styles.event_wrapper}>
        <motion.div
          variants={!fullscreen ? eventVariant : ''}
          whileHover={!fullscreen ? 'hover' : ''}
          transition={!fullscreen ? 'transition' : ''}
          className={`${styles.event} ${
            fullscreen ? styles.event_full_screen : {}
          } `}
          style={fullscreen ? { maxWidth: '100%' } : {}}
          onClick={() => {
            !fullscreen && screen === 'eventScreen' && setFullScreen(true);
          }}
        >
          <div
            className={`${styles.event_info} ${
              order % 2 !== 0 && !fullscreen ? styles.order_second : ``
            } `}
            style={{
              backgroundColor: event.backgroundColor
                ? event.backgroundColor
                : '#50d450'
            }}
          >
            <div className="ql-editor">{parse(event.name)}</div>
            <h3 className={styles.event_date}>
              <i class="fas fa-calendar-day"></i>
              {` `}
              {formatDate(event.date)}
            </h3>
            <div className={styles.event_logistics}>
              <ul className={`row_f ${styles.event_list}`}>
                {event.capacity ? (
                  <li className={styles.event_list_item}>
                    <i class="fas fa-users fa-fw"></i>
                    {` `}
                    {event.capacity}
                  </li>
                ) : (
                  ``
                )}
                <li className={styles.event_list_item}>
                  <i class="fas fa-clock fa-fw"></i> {` `}
                  {event.time}
                </li>
                <li className={styles.event_list_item}>
                  <i class="fas fa-map-marker-alt fa-fw"></i>
                  {` `}
                  {event.venue}
                </li>
              </ul>
            </div>
            {/* <p className={styles.event_description}>{event.description}</p> */}
            <div
              className={`ql-editor ${
                !fullscreen ? `${styles.event_description}` : ''
              }`}
            >
              {parse(event.description)}
            </div>
            {!fullscreen ? (
              screen === 'eventScreen' ? (
                <button
                  onClick={() => setFullScreen(true)}
                  className={styles.event_button}
                >
                  More Info
                </button>
              ) : (
                <Link
                  to={`/events/${event._id}`}
                  className={styles.event_button}
                >
                  More Info
                </Link>
              )
            ) : (
              <div className="row_f">
                <button
                  onClick={() =>
                    screen === 'eventScreen' && setFullScreen(false)
                  }
                  className={styles.event_button}
                >
                  Show Less
                </button>

                {user ? (
                  <button
                    href="#"
                    className={styles.event_button}
                    onClick={registerHandler}
                  >
                    Register for{' '}
                    {event.price !== 0 ? `KSh ${event.price}` : 'Free'}
                  </button>
                ) : (
                  <Link
                    href="#"
                    className={styles.event_button}
                    to={`/login?redirect=events/${event._id}`}
                  >
                    Register for{' '}
                    {event.price !== 0 ? `KSh ${event.price}` : 'Free'}
                  </Link>
                )}
              </div>
            )}
          </div>
          <div
            className={`${styles.event_image_container} ${
              order % 2 !== 0 && !fullscreen ? styles.order_first : ``
            } `}
            style={{
              border: event.borderColor
                ? `2px solid ${event.borderColor}`
                : '2px solid #50d450'
            }}
          >
            <img
              className={styles.event_image}
              style={{ height: fullscreen ? `60vh` : '' }}
              alt="Event"
              src={event.thumbnailImage}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
