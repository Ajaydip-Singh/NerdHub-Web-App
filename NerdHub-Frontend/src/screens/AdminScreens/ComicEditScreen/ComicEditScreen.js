import Header from '../../../components/Header/Header';
import styles from './ComicEditScreen.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getComic,
  resetGetComic
} from '../../../slices/comicSlices/comicGetSlice';
import {
  resetUpdateComic,
  updateComic
} from '../../../slices/comicSlices/comicUpdateSlice';
import MessageBox from '../../../components/MessageBox/MessageBox';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { BlockPicker } from 'react-color';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

export default function ComicEditScreen(props) {
  const comicId = props.match.params.id;

  const [name, setName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [borderColor, setBorderColor] = useState('');

  const comicGetSlice = useSelector((state) => state.comicGetSlice);
  const { status, comic, error } = comicGetSlice;

  const comicUpdateSlice = useSelector((state) => state.comicUpdateSlice);
  const {
    status: statusUpdate,
    comic: comicUpdate,
    error: errorUpdate
  } = comicUpdateSlice;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUpdateComic());
    dispatch(
      updateComic({
        _id: comicId,
        name,
        thumbnailImage,
        description,
        category,
        isActive,
        backgroundColor: backgroundColor.hex,
        borderColor: borderColor.hex
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateComic());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGetComic());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!comic || comic._id !== comicId) {
      dispatch(getComic(comicId));
    } else {
      setName(comic.name);
      setDescription(comic.description);
      setThumbnailImage(comic.thumbnailImage);
      setCategory(comic.category);
      setIsActive(comic.isActive);
      setBackgroundColor(comic.backgroundColor);
    }
  }, [dispatch, comic, comicId, props.history]);

  return (
    <div className={styles.main_wrapper}>
      <Header admin></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Edit Comic</h1>
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
                <TextEditor
                  placeholder="Enter comic name"
                  value={name}
                  onChange={setName}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Description</h3>
                <TextEditor
                  placeholder="Enter comic description"
                  value={description}
                  onChange={setDescription}
                ></TextEditor>
              </div>
              <div className="editor_wrapper">
                <h3>Thumbnail Image</h3>
                <p>
                  Current Image:{' '}
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
                  tags={['comic']}
                  name={'imageUploadSliceA'}
                  setImage={setThumbnailImage}
                ></ImageUploader>
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
                <h3>Background Color</h3>
                <BlockPicker
                  color={backgroundColor}
                  onChangeComplete={setBackgroundColor}
                />
              </div>
              <div className="editor_wrapper">
                <h3>Border Color</h3>
                <BlockPicker
                  color={borderColor}
                  onChangeComplete={setBorderColor}
                />
              </div>
              <div className="editor_wrapper">
                {errorUpdate && (
                  <MessageBox variant="danger">
                    Failed. Comic not updated.
                  </MessageBox>
                )}
                {comicUpdate && (
                  <MessageBox variant="success">Comic Updated</MessageBox>
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
