import Header from '../../../components/Header/Header';
import styles from './CartPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getCartPageContent,
  resetGetCartPageContent
} from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentGetSlice';
import {
  resetUpdateCartPageContent,
  updateCartPageContent
} from '../../../slices/pageSlices/cartPageContentSlices/cartPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function CartPageScreen() {
  const [cartMainHeading, setCartMainHeading] = useState('');
  const [cartBackgroundImage, setCartBackgroundImage] = useState('');
  const [shippingInfoColor, setShippingInfoColor] = useState('');
  const [productCardBorderColor, setProductCardBorderColor] = useState('');
  const [productCardBackgroundColor, setProductCardBackgroundColor] =
    useState('');
  const [productImageBorderColor, setProductImageBorderColor] = useState('');
  const [productNameColor, setProductNameColor] = useState('');
  const [productNameActiveColor, setProductNameActiveColor] = useState('');
  const [productPriceColor, setProductPriceColor] = useState('');
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

  const cartPageContentGetSlice = useSelector(
    (state) => state.cartPageContentGetSlice
  );
  const { status, content, error } = cartPageContentGetSlice;

  const cartPageContentUpdateSlice = useSelector(
    (state) => state.cartPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = cartPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateCartPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetCartPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCartPageContent({
        cartMainHeading,
        cartBackgroundImage,
        shippingInfoColor,
        productCardBorderColor,
        productCardBackgroundColor,
        productImageBorderColor,
        productNameColor,
        productNameActiveColor,
        productPriceColor,
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
      dispatch(getCartPageContent({}));
    } else {
      setCartMainHeading(content.cartMainHeading);
      setCartBackgroundImage(content.cartBackgroundImage);
      setShippingInfoColor(content.shippingInfoColor);
      setProductCardBorderColor(content.productCardBorderColor);
      setProductCardBackgroundColor(content.productCardBackgroundColor);
      setProductImageBorderColor(content.productImageBorderColor);
      setProductNameColor(content.productNameColor);
      setProductNameActiveColor(content.productNameActiveColor);
      setProductPriceColor(content.productPriceColor);
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
        <h1 className={styles.heading}>Edit Cart Page</h1>
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
                <h3>Main Heading</h3>
                <TextEditor
                  placeholder="Enter cart heading"
                  value={cartMainHeading}
                  onChange={setCartMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Page Background Image</h3>
                <p>
                  Current Image:{' '}
                  <a
                    className="break-all"
                    target="_blank"
                    rel="noreferrer"
                    href={cartBackgroundImage}
                  >
                    {cartBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['cart-page']}
                  name={'imageUploadSliceA'}
                  setImage={setCartBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>Shipping Info Color</h3>
                <BlockPicker
                  color={shippingInfoColor}
                  onChangeComplete={(e) => setShippingInfoColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Card Border Color</h3>
                <BlockPicker
                  color={productCardBorderColor}
                  onChangeComplete={(e) => setProductCardBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Card Background Color</h3>
                <BlockPicker
                  color={productCardBackgroundColor}
                  onChangeComplete={(e) => setProductCardBackgroundColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Image Background Color</h3>
                <BlockPicker
                  color={productImageBorderColor}
                  onChangeComplete={(e) => setProductImageBorderColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Name Color</h3>
                <BlockPicker
                  color={productNameColor}
                  onChangeComplete={(e) => setProductNameColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Name Active Color</h3>
                <BlockPicker
                  color={productNameActiveColor}
                  onChangeComplete={(e) => setProductNameActiveColor(e.hex)}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Product Price Color</h3>
                <BlockPicker
                  color={productPriceColor}
                  onChangeComplete={(e) => setProductPriceColor(e.hex)}
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
