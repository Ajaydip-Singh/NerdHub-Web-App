import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  categories: [],
  error: null
};

export const getProductsCategories = createAsyncThunk(
  'productsCategoriesGet/getProductCategories',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const productsCategoriesGetSlice = createSlice({
  name: 'productsCategoriesGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsCategories.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
        state.error = null;
      })
      .addCase(getProductsCategories.rejected, (state, action) => {
        state.status = 'idle';
        state.categories = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get product categories. Try again later.';
      })
      .addCase(getProductsCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        state.error = null;
      });
  }
});

export default productsCategoriesGetSlice.reducer;
