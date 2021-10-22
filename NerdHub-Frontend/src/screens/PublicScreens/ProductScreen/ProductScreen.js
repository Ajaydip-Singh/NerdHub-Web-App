import parse from 'html-react-parser';
import MediaQuery from 'react-responsive';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import ProductImage from '../../../components/ProductImage/ProductImage';
import Rating from '../../../components/Rating/Rating';
import {
  getProduct,
  resetGetProduct
} from '../../../slices/productSlices/productGetSlice';
import { stripHtml } from '../../../utils';
import { motion } from 'framer-motion';
import styles from './ProductScreen.module.css';
import { pageVariant } from '../../../animate';
import Footer from '../../../components/Footer/Footer';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { addToCart } from '../../../slices/shopSlices/cartSlice';
import { getProductPageContent } from '../../../slices/pageSlices/productPageContentSlices/productPageContentGetSlice';

export default function ProductScreen(props) {
  const productId = props.match.params.id;

  const [quantity, setQuantity] = useState(1);
  const [showDiv, setShowDiv] = useState(false);

  const productPageContentGetSlice = useSelector(
    (state) => state.productPageContentGetSlice
  );
  const { content } = productPageContentGetSlice;

  const productGetSlice = useSelector((state) => state.productGetSlice);
  const { status, product, error } = productGetSlice;

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart({ productId, quantity }));
    setShowDiv(true);
    setTimeout(() => {
      setShowDiv(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      dispatch(resetGetProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductPageContent({}));
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className={styles.screen}>
      <Header shop></Header>
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
            className={styles.main_wrapper}
            style={{
              backgroundImage: `url(${content && content.backgroundImage})`
            }}
          >
            <div>
              <ProductImage
                borderColor={content && content.productImageBorderColor}
                name={product && stripHtml(product.pageName)}
                imageThumbnail={product && product.thumbnailImage}
                images={product && product.images}
              ></ProductImage>
            </div>
            <div className={styles.info}>
              <div className="ql-editor">
                {product && parse(product.pageName)}
              </div>
              {product && product.isPageActiveReviews && (
                <Rating
                  rating={product && product.rating}
                  numReviews={product && product.numReviews}
                  ratingColor={product && product.ratingColor}
                  numReviewsColor={product && product.numReviewsColor}
                ></Rating>
              )}
              <div className="ql-editor">
                {product && parse(product.pageDisplayPrice)}
              </div>
              <div className="ql-editor">
                {product && parse(product.shippingInfo)}
              </div>
              <div className="ql-editor">
                {product && parse(product.description)}
              </div>
            </div>
            <div>
              <div
                style={{
                  border: `2px solid ${content && content.tableBorderColor}`
                }}
                className={styles.checkout}
              >
                <table
                  style={{
                    '--table-color-border': content && content.tableBorderColor,
                    '--table-color-even':
                      content && content.tableEvenRowBackgroundColor,
                    '--table-text-color-even':
                      content && content.tableEvenRowTextColor,
                    '--table-color-odd':
                      content && content.tableOddRowBackgroundColor,
                    '--table-text-color-odd':
                      content && content.tableOddRowTextColor
                  }}
                  className={styles.table}
                >
                  <tbody>
                    <tr>
                      <td>Price:</td>
                      <td>KES {product && product.price}</td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>
                        {product && product.countInStock > 0 ? (
                          <span className="success">Available</span>
                        ) : (
                          <span className="error">Not In Stock</span>
                        )}
                      </td>
                    </tr>
                    {product && product.countInStock > 0 ? (
                      <tr>
                        <td>Quantity:</td>
                        <td>
                          <select
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[
                              ...Array(product && product.countInStock).keys()
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ) : (
                      ''
                    )}
                  </tbody>
                </table>
                <button
                  onClick={addToCartHandler}
                  disabled={product && product.countInStock === 0}
                  style={{
                    '--checkout-button-text-color':
                      content && content.checkoutButtonTextColor,
                    '--checkout-button-background-color':
                      content && content.checkoutButtonBackgroundColor,
                    '--checkout-button-border-color':
                      content && content.checkoutButtonBorderColor
                  }}
                  className={styles.cart_button}
                >
                  Add to Cart
                </button>
              </div>
              <motion.div
                className={`${styles.floating_div} ${
                  showDiv ? styles.show_div : styles.hide_div
                }`}
              >
                <MessageBox variant="success">
                  Product Added to{' '}
                  <Link className={styles.cart_link} to="/shop/cart">
                    Cart.
                  </Link>
                </MessageBox>
              </motion.div>
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
  );
}
