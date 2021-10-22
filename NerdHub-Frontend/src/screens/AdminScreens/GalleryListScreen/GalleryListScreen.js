import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import { getGallery } from '../../../slices/gallerySlices/galleryGetSlice';
import {
  deleteGalleryItem,
  resetDeleteGallery
} from '../../../slices/gallerySlices/galleryItemDeleteSlice';
import parse from 'html-react-parser';
import styles from './GalleryListScreen.module.css';
import { stripHtml } from '../../../utils';

export default function GalleryListScreen(props) {
  const { pageNumber = '1' } = useParams();

  const [uploadImages, setUploadImages] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const galleryGetSlice = useSelector((state) => state.galleryGetSlice);
  const { status, gallery, pages, error } = galleryGetSlice;

  const galleryItemDeleteSlice = useSelector(
    (state) => state.galleryItemDeleteSlice
  );
  const {
    status: statusDelete,
    galleryItem: galleryItemDelete,
    error: errorDelete
  } = galleryItemDeleteSlice;

  const dispatch = useDispatch();
  const deleteHandler = (galleryItem) => {
    if (
      window.confirm(`Are you sure you want to delete ${galleryItem.publicId}`)
    ) {
      dispatch(deleteGalleryItem(galleryItem.publicId));
    }
  };

  // Cleanup gallery page on unmount
  useEffect(() => {
    return () => {
      if (galleryItemDelete || errorDelete) {
        dispatch(resetDeleteGallery());
      }
    };
  }, [dispatch, errorDelete, galleryItemDelete]);

  useEffect(() => {
    dispatch(getGallery({ pageNumber }));
  }, [dispatch, pageNumber, galleryItemDelete]);

  return (
    <div>
      <Header admin events_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Gallery Images List</h1>
      </div>
      <div className="table_wrapper">
        {statusDelete === 'loading' && (
          <MessageBox>
            <LoadingBox></LoadingBox>
          </MessageBox>
        )}
        {galleryItemDelete && (
          <MessageBox variant="success">
            Gallery Item Deleted Succesfully
          </MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <div className={styles.upload_images}>
          <h5>Upload Images (Max 5 images at once)</h5>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="Enter image tag"
          />
          {uploadImages.length !== 0 && (
            <MessageBox variant="success">Images Uploaded</MessageBox>
          )}
          <ImageUploader
            tags={[tagInput]}
            gallery={true}
            name={'multipleImagesUploadSlice'}
            setImage={setUploadImages}
            multiple={true}
            disabled={tagInput ? false : true}
          ></ImageUploader>
        </div>

        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Url</th>
                <th>Name</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map((galleryItem) => (
                <tr key={galleryItem._id}>
                  <td>
                    <a target="_blank" rel="noreferrer" href={galleryItem.url}>
                      Image Link
                    </a>
                  </td>
                  <td>{galleryItem.name}</td>
                  <td>{stripHtml(galleryItem.description)}</td>
                  <td>{galleryItem.tags}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(
                          `/gallery-admin/${galleryItem._id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="small"
                      type="button"
                      onClick={() => deleteHandler(galleryItem)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pages
        to={'gallery-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
