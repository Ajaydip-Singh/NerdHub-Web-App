import Header from '../../../components/Header/Header';
import styles from './ProductPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import {
  getProductPageContent,
  resetGetProductPageContent
} from '../../../slices/pageSlices/productPageContentSlices/productPageContentGetSlice';
import {
  resetUpdateProductPageContent,
  updateProductPageContent
} from '../../../slices/pageSlices/productPageContentSlices/productPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import { BlockPicker } from 'react-color';

export default function ProductPageScreen() {
  const [backgroundImage, setBackgroundImage] = useState('');

  const [productImageBorderColor, setProductImageBorderColor] = useState('');
  const [tableBorderColor, setTableBorderColor] = useState('');
  const [tableEvenRowBackgroundColor, setTableEvenRowBackgroundColor] =
    useState('');
  const [tableEvenRowTextColor, setTableEvenRowTextColor] = useState('');
  const [tableOddRowBackgroundColor, setTableOddRowBackgroundColor] =
    useState('');
  const [tableOddRowTextColor, setTableOddRowTextColor] = useState('');
  const [checkoutButtonTextColor, setCheckoutButtonTextColor] = useState('');
  const [checkoutButtonBackgroundColor, setCheckoutButtonBackgroundColor] =
    useState('');
  const [checkoutButtonBorderColor, setCheckoutButtonBorderColor] =
    useState('');

  const productPageContentGetSlice = useSelector(
    (state) => state.productPageContentGetSlice
  );
  const { status, content, error } = productPageContentGetSlice;

  const productPageContentUpdateSlice = useSelector(
    (state) => state.productPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = productPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateProductPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetProductPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductPageContent({
        backgroundImage,
        productImageBorderColor: productImageBorderColor.hex,
        tableBorderColor: tableBorderColor.hex,
        tableEvenRowBackgroundColor: tableEvenRowBackgroundColor.hex,
        tableEvenRowTextColor: tableEvenRowTextColor.hex,
        tableOddRowBackgroundColor: tableOddRowBackgroundColor.hex,
        tableOddRowTextColor: tableOddRowTextColor.hex,
        checkoutButtonTextColor: checkoutButtonTextColor.hex,
        checkoutButtonBackgroundColor: checkoutButtonBackgroundColor.hex,
        checkoutButtonBorderColor: checkoutButtonBorderColor.hex
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getProductPageContent({}));
    } else {
      setBackgroundImage(content.backgroundImage);
      setProductImageBorderColor(content.productImageBorderColor);
      setTableBorderColor(content.tableBorderColor);
      setTableEvenRowBackgroundColor(content.tableEvenRowBackgroundColor);
      setTableEvenRowTextColor(content.tableEvenRowTextColor);
      setTableOddRowBackgroundColor(content.tableOddRowBackgroundColor);
      setTableOddRowTextColor(content.tableOddRowTextColor);
      setCheckoutButtonTextColor(content.checkoutButtonTextColor);
      setCheckoutButtonBackgroundColor(content.checkoutButtonBackgroundColor);
      setCheckoutButtonBorderColor(content.checkoutButtonBorderColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Product Page</h1>
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
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={backgroundImage}
                  >
                    {backgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['product-page']}
                  name={'imageUploadSliceA'}
                  setImage={setBackgroundImage}
                ></ImageUploader>
              </div>

              <div className="editor_wrapper">
                <h3>Product Images Border Color</h3>
                <BlockPicker
                  color={productImageBorderColor}
                  onChangeComplete={setProductImageBorderColor}
                />
              </div>
              <h1>Table Styles</h1>
              <div className="editor_wrapper">
                <h3>Table Border Color</h3>
                <BlockPicker
                  color={tableBorderColor}
                  onChangeComplete={setTableBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Even Row Background Color</h3>
                <BlockPicker
                  color={tableEvenRowBackgroundColor}
                  onChangeComplete={setTableEvenRowBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Even Row Text Color</h3>
                <BlockPicker
                  color={tableEvenRowTextColor}
                  onChangeComplete={setTableEvenRowTextColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Odd Row Background Color</h3>
                <BlockPicker
                  color={tableOddRowBackgroundColor}
                  onChangeComplete={setTableOddRowBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Odd Row Text Color</h3>
                <BlockPicker
                  color={tableOddRowTextColor}
                  onChangeComplete={setTableOddRowTextColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Text Color</h3>
                <BlockPicker
                  color={checkoutButtonTextColor}
                  onChangeComplete={setCheckoutButtonTextColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Background Color</h3>
                <BlockPicker
                  color={checkoutButtonBackgroundColor}
                  onChangeComplete={setCheckoutButtonBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Button Border Color</h3>
                <BlockPicker
                  color={checkoutButtonBorderColor}
                  onChangeComplete={setCheckoutButtonBorderColor}
                />
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Event not updated.
                  </MessageBox>
                )}
                {contentUpdate && (
                  <MessageBox variant="success">Event Updated</MessageBox>
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
