import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  brands: [],
  error: null
};

export const getProductsBrands = createAsyncThunk(
  'productsBrandsGet/getProductBrands',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/brands`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const productsBrandsGetSlice = createSlice({
  name: 'productsBrandsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsBrands.pending, (state) => {
        state.status = 'loading';
        state.brands = [];
        state.error = null;
      })
      .addCase(getProductsBrands.rejected, (state, action) => {
        state.status = 'idle';
        state.brands = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get product brands. Try again later.';
      })
      .addCase(getProductsBrands.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
        state.error = null;
      });
  }
});

export default productsBrandsGetSlice.reducer;
