import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getComicPageContent } from './comicPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateComicPageContent = createAsyncThunk(
  'comicPageContentUpdate/updateComicPageContent',
  async (comicPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/comic-page-content`,
        comicPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getComicPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const comicPageContentUpdateSlice = createSlice({
  name: 'comicPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateComicPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateComicPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateComicPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update comic page content. Try again later.';
      })
      .addCase(updateComicPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateComicPageContent } =
  comicPageContentUpdateSlice.actions;

export default comicPageContentUpdateSlice.reducer;
