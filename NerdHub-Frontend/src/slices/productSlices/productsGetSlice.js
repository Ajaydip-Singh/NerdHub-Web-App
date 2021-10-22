import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  products: [],
  pageNumber: '',
  pages: '',
  error: null
};

export const getProducts = createAsyncThunk(
  'productsGet/getProducts',
  async (
    {
      pageNumber = '',
      name = '',
      category = '',
      brand = '',
      min = 0,
      max = 0,
      rating = 0,
      order = '',
      isActive = ''
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&brand=${brand}&min=${min}&max=${max}&rating=${rating}&order=${order}&isActive=${isActive}`
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

export const productsGetSlice = createSlice({
  name: 'productsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
        state.products = [];
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'idle';
        state.products = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Products. Try again later.';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.pageNumber = action.payload.pageNumber;
        state.error = null;
      });
  }
});

export default productsGetSlice.reducer;
