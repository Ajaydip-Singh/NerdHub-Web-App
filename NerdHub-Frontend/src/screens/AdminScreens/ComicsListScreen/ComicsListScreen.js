import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  createComic,
  resetCreateComic
} from '../../../slices/comicSlices/comicCreateSlice';
import {
  deleteComic,
  resetDeleteComic
} from '../../../slices/comicSlices/comicDeleteSlice';
import { getComics } from '../../../slices/comicSlices/comicsGetSlice';
import { stripHtml } from '../../../utils';
import styles from './ComicsListScreen.module.css';

export default function ComicsListScreen(props) {
  const { pageNumber = '1' } = useParams();

  const comicsGetSlice = useSelector((state) => state.comicsGetSlice);
  const { status, comics, pages, error } = comicsGetSlice;

  const comicDeleteSlice = useSelector((state) => state.comicDeleteSlice);
  const {
    status: statusDelete,
    comic: comicDelete,
    error: errorDelete
  } = comicDeleteSlice;

  const comicCreateSlice = useSelector((state) => state.comicCreateSlice);
  const {
    status: statusCreate,
    comic: comicCreate,
    error: errorCreate
  } = comicCreateSlice;

  const createHandler = () => {
    dispatch(createComic({}));
  };
  const dispatch = useDispatch();
  const deleteHandler = (comic) => {
    if (window.confirm(`Are you sure you want to delete ${comic.name}`)) {
      dispatch(deleteComic(comic._id));
    }
  };

  // Cleanup comics page on unmount
  useEffect(() => {
    return () => {
      if (comicDelete) {
        dispatch(resetDeleteComic());
      }
    };
  }, [dispatch, comicDelete]);

  useEffect(() => {
    return () => {
      if (comicCreate) {
        dispatch(resetCreateComic());
      }
    };
  }, [dispatch, comicCreate]);

  useEffect(() => {
    dispatch(getComics({ pageNumber }));
  }, [dispatch, comicDelete, comicCreate, pageNumber]);

  return (
    <div>
      <Header admin comics_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Comics Page</h1>
      </div>
      <div className="table_wrapper">
        {comicCreate && (
          <MessageBox variant="success">Comic Created Succesfully</MessageBox>
        )}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {comicDelete && (
          <MessageBox variant="success">Comic Deleted Succesfully</MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        <button type="button" onClick={createHandler} className={styles.button}>
          {statusCreate === 'loading' ? (
            <LoadingBox></LoadingBox>
          ) : (
            'Create Comic'
          )}
        </button>
        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Is Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comics.map((comic) => (
                <tr key={comic._id}>
                  <td>{comic._id}</td>
                  <td>{stripHtml(comic.name)}</td>
                  <td>{comic.category}</td>
                  <td>{comic.isActive ? 'True' : 'False'}</td>
                  <td>
                    <button
                      className="small"
                      type="button"
                      onClick={() =>
                        props.history.push(`/comics-admin/${comic._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteHandler(comic)}>
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
        to={'comics-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
