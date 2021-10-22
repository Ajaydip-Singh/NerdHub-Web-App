import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getGalleryPageContent = createAsyncThunk(
  'galleryPageContentGet/getGalleryPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/gallery-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryPageContentGetSlice = createSlice({
  name: 'galleryPageContentGet',
  initialState,
  reducers: {
    resetGetGalleryPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getGalleryPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get gallery page content. Try again later.';
      })
      .addCase(getGalleryPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetGalleryPageContent } =
  galleryPageContentGetSlice.actions;

export default galleryPageContentGetSlice.reducer;
