import Header from '../../../components/Header/Header';
import styles from './OrderHistoryPageScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import {
  getOrderHistoryPageContent,
  resetGetOrderHistoryPageContent
} from '../../../slices/pageSlices/orderHistoryPageContentSlices/orderHistoryPageContentGetSlice';
import {
  resetUpdateOrderHistoryPageContent,
  updateOrderHistoryPageContent
} from '../../../slices/pageSlices/orderHistoryPageContentSlices/orderHistoryPageContentUpdateSlice';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function OrderHistoryPageScreen() {
  const [orderHistoryMainHeading, setOrderHistoryMainHeading] = useState('');
  const [orderHistoryBackgroundImage, setOrderHistoryBackgroundImage] =
    useState('');
  const [noOrdersAvailable, setNoOrdersAvailable] = useState('');
  const [ordersMainHeading, setOrdersMainHeading] = useState('');
  const [eventsMainHeading, setEventsMainHeading] = useState('');
  const [tableBorderColor, setTableBorderColor] = useState('');
  const [tableEvenRowBackgroundColor, setTableEvenRowBackgroundColor] =
    useState('');
  const [tableEvenRowTextColor, setTableEvenRowTextColor] = useState('');
  const [tableOddRowBackgroundColor, setTableOddRowBackgroundColor] =
    useState('');
  const [tableOddRowTextColor, setTableOddRowTextColor] = useState('');

  const orderHistoryPageContentGetSlice = useSelector(
    (state) => state.orderHistoryPageContentGetSlice
  );
  const { status, content, error } = orderHistoryPageContentGetSlice;

  const orderHistoryPageContentUpdateSlice = useSelector(
    (state) => state.orderHistoryPageContentUpdateSlice
  );
  const {
    status: statusUpdate,
    content: contentUpdate,
    error: errorUpdate
  } = orderHistoryPageContentUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetUpdateOrderHistoryPageContent());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetOrderHistoryPageContent());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateOrderHistoryPageContent({
        orderHistoryMainHeading,
        orderHistoryBackgroundImage,
        noOrdersAvailable,
        ordersMainHeading,
        eventsMainHeading,
        tableBorderColor: tableBorderColor.hex,
        tableEvenRowBackgroundColor: tableEvenRowBackgroundColor.hex,
        tableEvenRowTextColor: tableEvenRowTextColor.hex,
        tableOddRowBackgroundColor: tableOddRowBackgroundColor.hex,
        tableOddRowTextColor: tableOddRowTextColor.hex
      })
    );
  };

  useEffect(() => {
    if (!content) {
      dispatch(getOrderHistoryPageContent({}));
    } else {
      setOrderHistoryMainHeading(content.orderHistoryMainHeading);
      setOrderHistoryBackgroundImage(content.orderHistoryBackgroundImage);
      setNoOrdersAvailable(content.noOrdersAvailable);
      setOrdersMainHeading(content.ordersMainHeading);
      setEventsMainHeading(content.eventsMainHeading);
      setTableBorderColor(content.tableBorderColor);
      setTableEvenRowBackgroundColor(content.tableEvenRowBackgroundColor);
      setTableEvenRowTextColor(content.tableEvenRowTextColor);
      setTableOddRowBackgroundColor(content.tableOddRowBackgroundColor);
      setTableOddRowTextColor(content.tableOddRowTextColor);
    }
  }, [dispatch, content, contentUpdate]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit OrderHistory Page</h1>
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
                  placeholder="Enter orderHistory heading"
                  value={orderHistoryMainHeading}
                  onChange={setOrderHistoryMainHeading}
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
                    href={orderHistoryBackgroundImage}
                  >
                    {orderHistoryBackgroundImage}
                  </a>
                </p>
                <ImageUploader
                  tags={['orderHistory-page']}
                  name={'imageUploadSliceA'}
                  setImage={setOrderHistoryBackgroundImage}
                ></ImageUploader>
              </div>
              <div className="editor_wrapper">
                <h3>No Orders Available Text</h3>
                <TextEditor
                  placeholder="Enter no order available text"
                  value={noOrdersAvailable}
                  onChange={setNoOrdersAvailable}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Orders Table Heading</h3>
                <TextEditor
                  placeholder="Enter orders table heading"
                  value={ordersMainHeading}
                  onChange={setOrdersMainHeading}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Events Table Heading</h3>
                <TextEditor
                  placeholder="Enter events order table heading"
                  value={eventsMainHeading}
                  onChange={setEventsMainHeading}
                ></TextEditor>
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
