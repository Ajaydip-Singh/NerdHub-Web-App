import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadImageCreator } from '../../slices/assetSlices/imageUploadSlice';
import { uploadMultipleImages } from '../../slices/assetSlices/multipleImageUploadSlice';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

export default function ImageUploader(props) {
  const { name, setImage, multiple, tags, gallery, disabled } = props;

  const imageUploadSlice = useSelector((state) => state[name]);
  const { status, file, error } = imageUploadSlice;

  const dispatch = useDispatch();

  const uploadHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (multiple) {
      const files = e.target.files;
      for (let file of files) {
        formData.append('images', file);
      }
      dispatch(uploadMultipleImages({ formData, tags, gallery }));
    } else {
      const file = e.target.files[0];
      console.log(file);
      formData.append('image', file);
      const uploadImage = uploadImageCreator(`${name}/uploadImage`);
      dispatch(uploadImage({ formData, tags }));
    }
  };

  useEffect(() => {
    if (file && !Array.isArray(file)) {
      setImage(file.image.url);
    } else if (file && Array.isArray(file)) {
      const images = [];
      file.map((image) => images.push(image.url));
      setImage(images);
    }
  }, [file, setImage]);

  return (
    <div>
      {status === 'loading' && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <input
        type="file"
        onChange={uploadHandler}
        multiple={multiple}
        disabled={disabled}
        accept="image/png, image/jpeg"
      ></input>
    </div>
  );
}
