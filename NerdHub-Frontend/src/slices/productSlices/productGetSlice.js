import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  product: null,
  error: null
};

export const getProduct = createAsyncThunk(
  'productGet/getProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const productGetSlice = createSlice({
  name: 'productGet',
  initialState,
  reducers: {
    resetGetProduct: (state) => {
      state.status = 'idle';
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
        state.product = null;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.product = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Get Product. Try again later.';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetProduct } = productGetSlice.actions;

export default productGetSlice.reducer;
