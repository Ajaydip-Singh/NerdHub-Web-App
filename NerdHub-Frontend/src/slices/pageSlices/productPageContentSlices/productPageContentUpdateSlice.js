import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProductPageContent } from './productPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateProductPageContent = createAsyncThunk(
  'productPageContentUpdate/updateProductPageContent',
  async (productPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/product-page-content`,
        productPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getProductPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const productPageContentUpdateSlice = createSlice({
  name: 'productPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateProductPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateProductPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update product page content. Try again later.';
      })
      .addCase(updateProductPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateProductPageContent } =
  productPageContentUpdateSlice.actions;

export default productPageContentUpdateSlice.reducer;
