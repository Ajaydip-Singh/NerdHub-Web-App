import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
  status: 'idle',
  file: [],
  error: null
};

export const uploadMultipleImages = createAsyncThunk(
  'imagesMultipleUpload/uploadMultipleImages',
  async ({ formData, tags, gallery = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await Axios.post(
        `/api/upload/image/multiple?${tags
          .map((tag) => `tags=${tag}`)
          .join('&')}${gallery ? `&gallery=true` : ``}`,
        formData,
        {
          headers: {
            'Content-Type': 'multimedia/form-data',
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data.message : err.message
      );
    }
  }
);

export const multipleImagesUploadSlice = createSlice({
  name: 'imagesMultipleUpload',
  initialState,
  reducers: {
    resetUploadMultipleImages: (state) => {
      state.status = 'idle';
      state.file = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMultipleImages.pending, (state) => {
        state.status = 'loading';
        state.file = [];
        state.error = null;
      })
      .addCase(uploadMultipleImages.rejected, (state, action) => {
        state.status = 'idle';
        state.file = [];
        state.error = action.payload ? action.payload : 'file Upload Failed';
      })
      .addCase(uploadMultipleImages.fulfilled, (state, action) => {
        state.status = 'idle';
        state.file = action.payload;
        state.error = null;
      });
  }
});

export const { resetUploadMultipleImages } = multipleImagesUploadSlice.actions;

export default multipleImagesUploadSlice.reducer;
