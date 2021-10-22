import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  product: null,
  error: null
};

export const updateProduct = createAsyncThunk(
  'productUpdate/updateProduct',
  async (product, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
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

export const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState,
  reducers: {
    resetUpdateProduct: (state) => {
      state.status = 'idle';
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
        state.product = null;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.product = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update Product. Try again later.';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateProduct } = productUpdateSlice.actions;

export default productUpdateSlice.reducer;
