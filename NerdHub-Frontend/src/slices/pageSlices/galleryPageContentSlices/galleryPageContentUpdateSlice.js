import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getGalleryPageContent } from './galleryPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateGalleryPageContent = createAsyncThunk(
  'galleryPageContentUpdate/updateGalleryPageContent',
  async (galleryPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/gallery-page-content`,
        galleryPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getGalleryPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryPageContentUpdateSlice = createSlice({
  name: 'galleryPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateGalleryPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGalleryPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateGalleryPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update gallery page content. Try again later.';
      })
      .addCase(updateGalleryPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateGalleryPageContent } =
  galleryPageContentUpdateSlice.actions;

export default galleryPageContentUpdateSlice.reducer;
