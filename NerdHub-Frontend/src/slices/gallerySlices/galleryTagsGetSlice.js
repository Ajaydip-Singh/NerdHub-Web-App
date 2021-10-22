import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  tags: [],
  error: null
};

export const getGalleryTags = createAsyncThunk(
  'galleryTagsGet/getGalleryTags',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/gallery/tags`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryTagsGetSlice = createSlice({
  name: 'galleryTagsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryTags.pending, (state) => {
        state.status = 'loading';
        state.tags = [];
        state.error = null;
      })
      .addCase(getGalleryTags.rejected, (state, action) => {
        state.status = 'idle';
        state.tags = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get gallery tags. Try again later.';
      })
      .addCase(getGalleryTags.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
        state.error = null;
      });
  }
});

export default galleryTagsGetSlice.reducer;
