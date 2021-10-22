import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Comic from '../../../components/Comic/Comic';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getComicsCategories } from '../../../slices/comicSlices/comicsCategoriesGetSlice';
import { getComics } from '../../../slices/comicSlices/comicsGetSlice';
import { motion } from 'framer-motion';
import styles from './ComicsScreen.module.css';
import { pageVariant } from '../../../animate';
import { useParams } from 'react-router';
import Pages from '../../../components/Pages/Pages';
import {
  getComic,
  resetGetComic
} from '../../../slices/comicSlices/comicGetSlice';
import { getComicPageContent } from '../../../slices/pageSlices/comicPageContentSlices/comicPageContentGetSlice';
import parse from 'html-react-parser';

export default function ComicsScreen(props) {
  const {
    comicId = '',
    name = 'all',
    category = 'all',
    pageNumber = '1'
  } = useParams();

  const [inputComicName, setInputComicName] = useState(
    name === 'all' ? '' : name
  );

  const comicPageContentGetSlice = useSelector(
    (state) => state.comicPageContentGetSlice
  );
  const {
    status: statusContent,
    content,
    error: errorContent
  } = comicPageContentGetSlice;

  const comicGetSlice = useSelector((state) => state.comicGetSlice);
  const { comic } = comicGetSlice;

  const comicsGetSlice = useSelector((state) => state.comicsGetSlice);
  const comicsCategoriesGetSlice = useSelector(
    (state) => state.comicsCategoriesGetSlice
  );

  const { status, comics, pages, error } = comicsGetSlice;
  const { categories } = comicsCategoriesGetSlice;

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ name: inputComicName }));
  };

  const getFilterUrl = (filter) => {
    let filterPageNumber;
    if (
      (filter.name && filter.name !== name) ||
      (filter.category && filter.category !== category)
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

    return `/comics/${filterName}/${filterCategory}/${filterPageNumber}`;
  };

  const dispatch = useDispatch();

  // Cleanup comic when unmount
  useEffect(() => {
    return () => {
      dispatch(resetGetComic());
    };
  }, [dispatch]);

  useEffect(() => {
    if (comicId && !comic) {
      dispatch(getComic(comicId));
    }
  });

  useEffect(() => {
    if (!content) {
      dispatch(getComicPageContent({}));
    }
  }, [dispatch, content]);

  useEffect(() => {
    dispatch(getComicsCategories());
    dispatch(
      getComics({
        pageNumber,
        isActive: true,
        name: name === 'all' ? '' : name,
        category: category === 'all' ? '' : category
      })
    );
  }, [dispatch, pageNumber, category, name]);

  return (
    <div className={styles.screen}>
      <Header comics></Header>
      {statusContent === 'loading' ? (
        <div className="min_page_height">
          <LoadingBox></LoadingBox>
        </div>
      ) : errorContent ? (
        <div className="min_page_height">
          <MessageBox variant="danger">
            Oops. We are temporarily unavailable. Please try again later.
          </MessageBox>
        </div>
      ) : (
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
                        value={inputComicName}
                        onChange={(e) => setInputComicName(e.target.value)}
                        placeholder="Search comic by name"
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
                            getFilterUrl({ name: inputComicName })
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
                    </div>
                  </form>
                </div>
              </motion.div>
              <motion.div
                variants={pageVariant}
                initial="initial"
                animate="final"
                className={styles.comics_wrapper}
              >
                {comicId && comic && (
                  <Comic focus screen={'comicScreen'} comic={comic}></Comic>
                )}
                {status === 'loading' ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  comics.map(
                    (comic, index) =>
                      comic.isActive &&
                      comic._id !== comicId && <Comic comic={comic}></Comic>
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
        </motion.div>
      )}

      <MediaQuery minWidth={800}>
        <Footer></Footer>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <BottomNav comics></BottomNav>
      </MediaQuery>
    </div>
  );
}
