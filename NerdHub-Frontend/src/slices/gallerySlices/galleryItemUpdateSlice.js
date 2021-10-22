import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  gallery: null,
  error: null
};

export const updateGalleryItem = createAsyncThunk(
  'galleryItemUpdate/updateGalleryItem',
  async (gallery, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(`/api/gallery/${gallery._id}`, gallery, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const galleryItemUpdateSlice = createSlice({
  name: 'galleryItemUpdate',
  initialState,
  reducers: {
    resetUpdateGalleryItem: (state) => {
      state.status = 'idle';
      state.gallery = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGalleryItem.pending, (state) => {
        state.status = 'loading';
        state.gallery = null;
        state.error = null;
      })
      .addCase(updateGalleryItem.rejected, (state, action) => {
        state.status = 'idle';
        state.gallery = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update gallery item. Try again later.';
      })
      .addCase(updateGalleryItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gallery = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateGalleryItem } = galleryItemUpdateSlice.actions;

export default galleryItemUpdateSlice.reducer;
