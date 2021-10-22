import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Event from '../../../components/Event/Event';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getEventsCategories } from '../../../slices/eventSlices/eventsCategoriesGetSlice';
import { getEvents } from '../../../slices/eventSlices/eventsGetSlice';
import { getEventsVenues } from '../../../slices/eventSlices/eventsVenuesGetSlice';
import { motion } from 'framer-motion';
import styles from './EventsScreen.module.css';
import { pageVariant } from '../../../animate';
import { useParams } from 'react-router';
import Pages from '../../../components/Pages/Pages';
import {
  getEvent,
  resetGetEvent
} from '../../../slices/eventSlices/eventGetSlice';
import { getEventPageContent } from '../../../slices/pageSlices/eventPageContentSlices/eventPageContentGetSlice';
import parse from 'html-react-parser';

export default function EventsScreen(props) {
  const {
    eventId = '',
    name = 'all',
    category = 'all',
    venue = 'all',
    pageNumber = '1'
  } = useParams();

  const [inputEventName, setInputEventName] = useState(
    name === 'all' ? '' : name
  );

  const eventPageContentGetSlice = useSelector(
    (state) => state.eventPageContentGetSlice
  );
  const {
    status: statusContent,
    content,
    error: errorContent
  } = eventPageContentGetSlice;

  const eventGetSlice = useSelector((state) => state.eventGetSlice);
  const { event } = eventGetSlice;

  const eventsGetSlice = useSelector((state) => state.eventsGetSlice);
  const eventsCategoriesGetSlice = useSelector(
    (state) => state.eventsCategoriesGetSlice
  );
  const eventsVenuesGetSlice = useSelector(
    (state) => state.eventsVenuesGetSlice
  );

  const { status, events, pages, error } = eventsGetSlice;
  const { categories } = eventsCategoriesGetSlice;
  const { venues } = eventsVenuesGetSlice;

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ name: inputEventName }));
  };

  const getFilterUrl = (filter) => {
    let filterPageNumber;
    if (
      (filter.name && filter.name !== name) ||
      (filter.category && filter.category !== category) ||
      (filter.venue && filter.venue !== venue)
    ) {
      filterPageNumber = 1;
    } else {
      filterPageNumber = filter.pageNumber || pageNumber;
    }

    const filterName = filter.name
      ? filter.name
      : filter.name === ''
      ? 'all'
      : name;
    const filterCategory = filter.category || category;
    const filterVenue = filter.venue || venue;

    return `/events/${filterName}/${filterCategory}/${filterVenue}/${filterPageNumber}`;
  };

  const dispatch = useDispatch();

  // Cleanup event when unmount
  useEffect(() => {
    return () => {
      dispatch(resetGetEvent());
    };
  }, [dispatch]);

  useEffect(() => {
    if (eventId && !event) {
      dispatch(getEvent(eventId));
    }
  });

  useEffect(() => {
    dispatch(getEventPageContent({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEventsCategories());
    dispatch(getEventsVenues());
    dispatch(
      getEvents({
        pageNumber,
        isActive: true,
        name: name === 'all' ? '' : name,
        category: category === 'all' ? '' : category,
        venue: venue === 'all' ? '' : venue
      })
    );
  }, [dispatch, pageNumber, category, venue, name]);

  return (
    <div className={styles.screen}>
      <Header events></Header>
      {statusContent === 'loading' ? (
        <LoadingBox></LoadingBox>
      ) : errorContent ? (
        <MessageBox variant="danger">{errorContent}</MessageBox>
      ) : (
        <>
          <motion.div
            variants={pageVariant}
            initial="initial"
            animate="final"
            className={styles.main_wrapper}
            style={{
              backgroundImage: `url(${content && content.backgroundImage})`
            }}
          >
            {content && content.comingSoon ? (
              <div className={styles.comingSoon_wrapper}>
                <div className="ql-editor">
                  {parse(content && content.comingSoonText)}
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1 }}
                  className={styles.filterbox}
                >
                  <div className={styles.wrapper}>
                    <form className={styles.search} onSubmit={submitHandler}>
                      <div className="row_f">
                        <input
                          style={{
                            border: `2px solid ${
                              content && content.searchBarBorderColor
                            }`,
                            outline: `1px solid ${
                              content && content.searchBarBorderColor
                            }`,
                            backgroundColor:
                              content && content.searchBarInputBackgroundColor,
                            color: content && content.searchBarInputTextColor,
                            '--placeholder-color':
                              content && content.searchBarInputPlaceholderColor
                          }}
                          className={styles.input}
                          type="text"
                          name="q"
                          value={inputEventName}
                          onChange={(e) => setInputEventName(e.target.value)}
                          placeholder="Search event by name"
                          id="q"
                        />
                        <button
                          type="submit"
                          style={{
                            backgroundColor:
                              content && content.searchBarIconBackgroundColor,
                            color: content && content.searchBarIconColor,
                            border: `2px solid ${
                              content && content.searchBarIconBorderColor
                            }`,
                            outline: `1px solid ${
                              content && content.searchBarBorderColor
                            }`
                          }}
                          className={styles.search_button}
                          onClick={() =>
                            props.history.push(
                              getFilterUrl({ name: inputEventName })
                            )
                          }
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                      <div className={styles.filter_button_wrapper}>
                        <select
                          style={{
                            backgroundColor:
                              content && content.searchBarButtonBackgroundColor,
                            border: `2px solid ${
                              content && content.searchBarButtonBorderColor
                            }`,
                            color: content && content.searchBarButtonColor
                          }}
                          className={`${styles.search_button} ${styles.filter_button}`}
                          value={category}
                          onChange={(e) =>
                            props.history.push(
                              getFilterUrl({ category: e.target.value })
                            )
                          }
                        >
                          <option value="all">All Categories</option>
                          {categories &&
                            categories.map((category) => (
                              <option value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                          style={{
                            backgroundColor:
                              content && content.searchBarButtonBackgroundColor,
                            border: `2px solid ${
                              content && content.searchBarButtonBorderColor
                            }`,
                            color: content && content.searchBarButtonColor
                          }}
                          className={`${styles.search_button} ${styles.filter_button}`}
                          value={venue}
                          onChange={(e) =>
                            props.history.push(
                              getFilterUrl({ venue: e.target.value })
                            )
                          }
                        >
                          <option value="all">All Venues</option>
                          {venues &&
                            venues.map((venue) => (
                              <option value={venue}>{venue}</option>
                            ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </motion.div>
                {status === 'loading' ? (
                  <div className="min_page_height">
                    <LoadingBox></LoadingBox>
                  </div>
                ) : error ? (
                  <div className="min_page_height">
                    <MessageBox variant="danger">
                      Oops. We are temporarily unavailable. Please try again
                      later.
                    </MessageBox>
                  </div>
                ) : (
                  <>
                    <motion.div
                      variants={pageVariant}
                      initial="initial"
                      animate="final"
                      className={styles.events_wrapper}
                    >
                      {eventId && event && (
                        <Event
                          focus
                          screen={'eventScreen'}
                          event={event}
                        ></Event>
                      )}
                      {status === 'loading' ? (
                        <LoadingBox></LoadingBox>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        events.map(
                          (event, index) =>
                            event.isActive &&
                            event._id !== eventId && (
                              <Event
                                screen={'eventScreen'}
                                order={index}
                                event={event}
                              ></Event>
                            )
                        )
                      )}
                    </motion.div>
                    <Pages
                      filterUrl={getFilterUrl}
                      currentPage={parseInt(pageNumber)}
                      pages={parseInt(pages)}
                    ></Pages>
                  </>
                )}
              </>
            )}
          </motion.div>
          <MediaQuery minWidth={800}>
            <Footer></Footer>
          </MediaQuery>
        </>
      )}

      <MediaQuery maxWidth={800}>
        <BottomNav events></BottomNav>
      </MediaQuery>
    </div>
  );
}
