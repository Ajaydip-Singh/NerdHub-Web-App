import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  gallery: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getGallery = createAsyncThunk(
  'galleryGet/getGallery',
  async ({ pageNumber = '', tag = '' }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/gallery?pageNumber=${pageNumber}${tag ? `&tag=${tag}` : ``}`
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryGetSlice = createSlice({
  name: 'galleryGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.status = 'loading';
        state.gallery = [];
        state.error = null;
      })
      .addCase(getGallery.rejected, (state, action) => {
        state.status = 'idle';
        state.gallery = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Gallery. Try again later.';
      })
      .addCase(getGallery.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gallery = action.payload.gallery;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default galleryGetSlice.reducer;
