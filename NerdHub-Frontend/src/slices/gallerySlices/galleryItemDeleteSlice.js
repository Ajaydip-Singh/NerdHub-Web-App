import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  galleryItem: null,
  error: null
};

export const deleteGalleryItem = createAsyncThunk(
  'galleryItemDelete/deleteGalleryItem',
  async (galleryItemPublicId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(
        `/api/gallery/${galleryItemPublicId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
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

export const galleryItemDeleteSlice = createSlice({
  name: 'galleryItemDelete',
  initialState,
  reducers: {
    resetDeleteGallery: (state) => {
      state.status = 'idle';
      state.galleryItem = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGalleryItem.pending, (state) => {
        state.status = 'loading';
        state.galleryItem = null;
        state.error = null;
      })
      .addCase(deleteGalleryItem.rejected, (state, action) => {
        state.status = 'idle';
        state.galleryItem = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Gallery Item. Try again later.';
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.galleryItem = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteGallery } = galleryItemDeleteSlice.actions;

export default galleryItemDeleteSlice.reducer;
