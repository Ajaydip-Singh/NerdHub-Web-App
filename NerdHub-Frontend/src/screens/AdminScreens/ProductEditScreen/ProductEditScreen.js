import Header from '../../../components/Header/Header';
import styles from './ProductEditScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProduct,
  resetGetProduct
} from '../../../slices/productSlices/productGetSlice';
import {
  resetUpdateProduct,
  updateProduct
} from '../../../slices/productSlices/productUpdateSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;

  const [cardName, setCardName] = useState('');
  const [pageName, setPageName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [taxPrice, setTaxPrice] = useState('');
  const [shippingInfo, setShippingInfo] = useState('');
  const [cardDisplayPrice, setCardDisplayPrice] = useState('');
  const [pageDisplayPrice, setPageDisplayPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [ratingColor, setRatingColor] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [numReviewsColor, setNumReviewsColor] = useState('');
  const [isActive, setIsActive] = useState('');
  const [isCardActiveReviews, setIsCardActiveReviews] = useState('');
  const [isPageActiveReviews, setIsPageActiveReviews] = useState('');
  const [isFeaturedProduct, setIsFeaturedProduct] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderHoverColor, setBorderHoverColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  const productGetSlice = useSelector((state) => state.productGetSlice);
  const { status, product, error } = productGetSlice;

  const productUpdateSlice = useSelector((state) => state.productUpdateSlice);
  const {
    status: statusUpdate,
    product: productUpdate,
    error: errorUpdate
  } = productUpdateSlice;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUpdateProduct());
    dispatch(
      updateProduct({
        _id: productId,
        cardName,
        pageName,
        thumbnailImage,
        images,
        brand,
        category,
        description,
        price,
        taxPrice,
        shippingInfo,
        cardDisplayPrice,
        pageDisplayPrice,
        countInStock,
        rating,
        ratingColor: ratingColor.hex,
        numReviews,
        numReviewsColor: numReviewsColor.hex,
        isCardActiveReviews,
        isPageActiveReviews,
        isActive,
        isFeaturedProduct,
        borderColor: borderColor.hex,
        borderHoverColor: borderHoverColor.hex,
        backgroundColor: backgroundColor.hex
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(getProduct(productId));
    } else {
      setCardName(product.cardName);
      setPageName(product.pageName);
      setThumbnailImage(product.thumbnailImage);
      setImages(product.images);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setTaxPrice(product.taxPrice);
      setShippingInfo(product.shippingInfo);
      setCardDisplayPrice(product.cardDisplayPrice);
      setPageDisplayPrice(product.pageDisplayPrice);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setRatingColor(product.ratingColor);
      setNumReviews(product.numReviews);
      setNumReviewsColor(product.numReviewsColor);
      setIsCardActiveReviews(product.isCardActiveReviews);
      setIsPageActiveReviews(product.isPageActiveReviews);
      setIsActive(product.isActive);
      setIsFeaturedProduct(product.isFeaturedProduct);
      setBorderColor(product.borderColor);
      setBorderHoverColor(product.borderHoverColor);
      setBackgroundColor(product.backgroundColor);
    }
  }, [dispatch, product, productId, props.history]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit product</h1>
      </div>
      <div className={styles.wrapper}>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <form onSubmit={submitHandler}>
            <div className={styles.editor_wrapper}>
              <div className="editor_wrapper">
                <h3>Card Name</h3>
                <TextEditor
                  placeholder="Enter product card name"
                  value={cardName}
                  onChange={setCardName}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Name</h3>
                <TextEditor
                  placeholder="Enter product page names"
                  value={pageName}
                  onChange={setPageName}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Product thumbnailImage</h3>
                <p>
                  Current thumbnailImage:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={thumbnailImage}
                  >
                    {thumbnailImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['product']}
                  name={'imageUploadSliceA'}
                  setImage={setThumbnailImage}
                  multiple={false}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Product Images</h3>
                <p> Current images:</p>
                <ul className={styles.images_list}>
                  {images.map((image) => (
                    <li>
                      <a
                        className="break-all"
                        target="_blank"
                        rel="noreferrer"
                        href={image}
                      >
                        {image}
                      </a>
                    </li>
                  ))}
                </ul>
                <ImageUploader
                  tags={['product']}
                  name={'multipleImagesUploadSlice'}
                  setImage={setImages}
                  multiple={true}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Brand</h3>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Category</h3>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Description</h3>
                <TextEditor
                  placeholder="Enter product description"
                  value={description}
                  onChange={setDescription}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Price</h3>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price in Ksh"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Tax Price</h3>
                <input
                  value={taxPrice}
                  onChange={(e) => setTaxPrice(e.target.value)}
                  placeholder="Enter tax price in Ksh"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Card Display Price</h3>
                <TextEditor
                  placeholder="Enter product card display price"
                  value={cardDisplayPrice}
                  onChange={setCardDisplayPrice}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Display Price</h3>
                <TextEditor
                  placeholder="Enter product page display price"
                  value={pageDisplayPrice}
                  onChange={setPageDisplayPrice}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Shipping Info</h3>
                <TextEditor
                  placeholder="Enter product shipping info"
                  value={shippingInfo}
                  onChange={setShippingInfo}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Count In Stock</h3>
                <input
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  placeholder="Enter count in stock"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Rating</h3>
                <p>Between 1 - 5</p>
                <input
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter rating"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Number of Reviews</h3>
                <input
                  value={numReviews}
                  onChange={(e) => setNumReviews(e.target.value)}
                  placeholder="Enter number of reviews"
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Show Reviews on Product Card</h3>
                <select
                  value={isCardActiveReviews}
                  onChange={(e) => setIsCardActiveReviews(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Show Reviews on Product Page</h3>
                <select
                  value={isPageActiveReviews}
                  onChange={(e) => setIsPageActiveReviews(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Is Active</h3>
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Is Featured product</h3>
                <select
                  value={isFeaturedProduct}
                  onChange={(e) => setIsFeaturedProduct(e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="editor_wrapper">
                <h3>Border Color</h3>
                <BlockPicker
                  color={borderColor}
                  onChangeComplete={setBorderColor}
                />
              </div>
              <h1>Product Card Styles</h1>
              <div className="editor_wrapper">
                <h3>Rating Color</h3>
                <BlockPicker
                  color={ratingColor}
                  onChangeComplete={setRatingColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Reviews Color</h3>
                <BlockPicker
                  color={numReviewsColor}
                  onChangeComplete={setNumReviewsColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Border Hover Color</h3>
                <BlockPicker
                  color={borderHoverColor}
                  onChangeComplete={setBorderHoverColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Background Color</h3>
                <BlockPicker
                  color={backgroundColor}
                  onChangeComplete={setBackgroundColor}
                />
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. product not updated.
                  </MessageBox>
                )}
                {productUpdate && (
                  <MessageBox variant="success">Product Updated</MessageBox>
                )}
                <button className={styles.button} type="submit">
                  {statusUpdate === 'loading' ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    `Update`
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
