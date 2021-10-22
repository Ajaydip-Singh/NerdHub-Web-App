import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
  status: 'idle',
  file: null,
  error: null
};

export const uploadImageCreator = (name) => {
  return createAsyncThunk(
    name,
    async ({ formData, tags }, { rejectWithValue, getState }) => {
      const {
        userAuthentication: { user }
      } = getState();

      try {
        const { data } = await Axios.post(
          `/api/upload/image?${tags.map((tag) => `tags=${tag}`).join('&')}`,
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
};

export const imageUploadeSliceCreater = (name) => {
  return createSlice({
    name: name,
    initialState,
    reducers: {
      resetUploadImage: (state) => {
        state.status = 'idle';
        state.content = null;
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadImageCreator(`${name}/uploadImage`).pending, (state) => {
          state.status = 'loading';
          state.file = null;
          state.error = null;
        })
        .addCase(
          uploadImageCreator(`${name}/uploadImage`).rejected,
          (state, action) => {
            state.status = 'idle';
            state.file = null;
            state.error = action.payload
              ? action.payload
              : 'File Upload Failed';
          }
        )
        .addCase(
          uploadImageCreator(`${name}/uploadImage`).fulfilled,
          (state, action) => {
            state.status = 'idle';
            state.file = action.payload;
            state.error = null;
          }
        );
    }
  }).reducer;
};

// export const { resetUploadImage } = imageUploadeSliceCreater.actions;

export default imageUploadeSliceCreater;
