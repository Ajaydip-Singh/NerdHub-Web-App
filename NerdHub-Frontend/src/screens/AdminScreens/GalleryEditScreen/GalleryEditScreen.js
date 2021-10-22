import Header from '../../../components/Header/Header';
import styles from './GalleryEditScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGalleryItem,
  resetGetGalleryItem
} from '../../../slices/gallerySlices/galleryItemGetSlice';
import {
  resetUpdateGalleryItem,
  updateGalleryItem
} from '../../../slices/gallerySlices/galleryItemUpdateSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';

export default function GalleryEditScreen(props) {
  const galleryId = props.match.params.id;

  const [name, setName] = useState('');
  const [imageBorderColor, setImageBorderColor] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionBackgroundColor, setDescriptionBackgroundColor] =
    useState('');

  const galleryItemGetSlice = useSelector((state) => state.galleryItemGetSlice);
  const { status, gallery, error } = galleryItemGetSlice;

  const galleryItemUpdateSlice = useSelector(
    (state) => state.galleryItemUpdateSlice
  );
  const {
    status: statusUpdate,
    gallery: galleryUpdate,
    error: errorUpdate
  } = galleryItemUpdateSlice;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUpdateGalleryItem());
    dispatch(
      updateGalleryItem({
        _id: galleryId,
        name,
        imageBorderColor: imageBorderColor.hex,
        description,
        descriptionBackgroundColor: descriptionBackgroundColor.hex
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateGalleryItem());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetGalleryItem());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!gallery || gallery._id !== galleryId) {
      dispatch(getGalleryItem(galleryId));
    } else {
      setName(gallery.name);
      setImageBorderColor(gallery.imageBorderColor);
      setDescription(gallery.description);
      setDescriptionBackgroundColor(gallery.descriptionBackgroundColor);
    }
  }, [dispatch, gallery, galleryId, props.history]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Gallery Item</h1>
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
                <h3>Name</h3>
                <input
                  placeholder="Enter gallery name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="editor_wrapper">
                <h3>Image Border Color</h3>
                <BlockPicker
                  color={imageBorderColor}
                  onChangeComplete={setImageBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Description</h3>
                <TextEditor
                  placeholder="Enter gallery description"
                  value={description}
                  onChange={setDescription}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Description Background Color</h3>
                <BlockPicker
                  color={descriptionBackgroundColor}
                  onChangeComplete={setDescriptionBackgroundColor}
                />
              </div>

              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Gallery not updated.
                  </MessageBox>
                )}
                {galleryUpdate && (
                  <MessageBox variant="success">Gallery Updated</MessageBox>
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
