import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  product: null,
  error: null
};

export const deleteProduct = createAsyncThunk(
  'productDelete/deleteProduct',
  async (productId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
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

export const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState,
  reducers: {
    resetDeleteProduct: (state) => {
      state.status = 'idle';
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.product = null;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.product = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Product. Try again later.';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteProduct } = productDeleteSlice.actions;

export default productDeleteSlice.reducer;
