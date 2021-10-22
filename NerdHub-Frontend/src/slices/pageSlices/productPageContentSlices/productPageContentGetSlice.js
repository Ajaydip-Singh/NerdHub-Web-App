import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getProductPageContent = createAsyncThunk(
  'productPageContentGet/getProductPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/product-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const productPageContentGetSlice = createSlice({
  name: 'productPageContentGet',
  initialState,
  reducers: {
    resetGetProductPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getProductPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get product page content. Try again later.';
      })
      .addCase(getProductPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetProductPageContent } =
  productPageContentGetSlice.actions;

export default productPageContentGetSlice.reducer;
