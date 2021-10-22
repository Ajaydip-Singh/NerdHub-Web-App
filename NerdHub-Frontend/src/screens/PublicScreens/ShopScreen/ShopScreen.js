import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import styles from './ShopScreen.module.css';
import Footer from '../../../components/Footer/Footer';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Product from '../../../components/Product/Product';
import MediaQuery from 'react-responsive';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../slices/productSlices/productsGetSlice';
import { pageVariant } from '../../../animate';
import { motion } from 'framer-motion';
import { getProductsCategories } from '../../../slices/productSlices/productsCategoriesGetSlice';
import { getProductsBrands } from '../../../slices/productSlices/productsBrandsGetSlice';
import { useParams } from 'react-router';
import Pages from '../../../components/Pages/Pages';
import { getShopPageContent } from '../../../slices/pageSlices/shopPageContentSlices/shopPageContentGetSlice';
import parse from 'html-react-parser';

export default function ShopScreen(props) {
  const {
    name = 'all',
    category = 'all',
    brand = 'all',
    pageNumber = '1'
  } = useParams();

  const [inputProductName, setInputProductName] = useState(
    name === 'all' ? '' : name
  );

  const productsGetSlice = useSelector((state) => state.productsGetSlice);
  const productsCategoriesGetSlice = useSelector(
    (state) => state.productsCategoriesGetSlice
  );
  const productsBrandsGetSlice = useSelector(
    (state) => state.productsBrandsGetSlice
  );

  const shopPageContentGetSlice = useSelector(
    (state) => state.shopPageContentGetSlice
  );
  const {
    status: statusContent,
    content,
    error: errorContent
  } = shopPageContentGetSlice;

  const { status, products, pages, error } = productsGetSlice;
  const { categories } = productsCategoriesGetSlice;
  const { brands } = productsBrandsGetSlice;

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(getFilterUrl({ name: inputProductName }));
  };

  const getFilterUrl = (filter) => {
    let filterPageNumber;
    if (
      (filter.name && filter.name !== name) ||
      (filter.category && filter.category !== category) ||
      (filter.brand && filter.brand !== brand)
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
    const filterBrand = filter.brand || brand;

    return `/shop/${filterName}/${filterCategory}/${filterBrand}/${filterPageNumber}`;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopPageContent({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsCategories());
    dispatch(getProductsBrands());
    dispatch(
      getProducts({
        pageNumber,
        isActive: true,
        name: name === 'all' ? '' : name,
        category: category === 'all' ? '' : category,
        brand: brand === 'all' ? '' : brand
      })
    );
  }, [dispatch, category, brand, name, pageNumber]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
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
                          value={inputProductName}
                          onChange={(e) => setInputProductName(e.target.value)}
                          placeholder="Search product by name"
                          id="q"
                        />
                        <button
                          type="submit"
                          className={styles.search_button}
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
                          onClick={() =>
                            props.history.push(
                              getFilterUrl({ name: inputProductName })
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
                          value={brand}
                          onChange={(e) =>
                            props.history.push(
                              getFilterUrl({ brand: e.target.value })
                            )
                          }
                        >
                          <option value="all">All Brands</option>
                          {brands &&
                            brands.map((brand) => (
                              <option value={brand}>{brand}</option>
                            ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </motion.div>
                <div className="min_page_height search_box">
                  {status === 'loading' ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <motion.div
                      variants={pageVariant}
                      initial="initial"
                      animate="final"
                      className={styles.products_wrapper}
                    >
                      {products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </motion.div>
                  )}
                </div>
                <Pages
                  currentPage={parseInt(pageNumber)}
                  pages={parseInt(pages)}
                  filterUrl={getFilterUrl}
                ></Pages>
              </>
            )}
          </motion.div>
          <MediaQuery minWidth={800}>
            <Footer></Footer>
          </MediaQuery>
        </>
      )}
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
