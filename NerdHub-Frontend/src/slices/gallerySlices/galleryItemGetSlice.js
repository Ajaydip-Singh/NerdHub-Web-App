import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  gallery: null,
  error: null
};

export const getGalleryItem = createAsyncThunk(
  'galleryItemGet/getGalleryItem',
  async (galleryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/gallery/${galleryId}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryItemGetSlice = createSlice({
  name: 'galleryItemGet',
  initialState,
  reducers: {
    resetGetGalleryItem: (state) => {
      state.status = 'idle';
      state.gallery = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryItem.pending, (state) => {
        state.status = 'loading';
        state.gallery = null;
        state.error = null;
      })
      .addCase(getGalleryItem.rejected, (state, action) => {
        state.status = 'idle';
        state.gallery = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get gallery item. Try again later.';
      })
      .addCase(getGalleryItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gallery = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetGalleryItem } = galleryItemGetSlice.actions;

export default galleryItemGetSlice.reducer;
