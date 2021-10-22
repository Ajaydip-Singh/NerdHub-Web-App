import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  product: null,
  error: null
};

export const createProduct = createAsyncThunk(
  'productCreate/createProduct',
  async (options, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(
        `/api/products/`,
        {},
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

export const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState,
  reducers: {
    resetCreateProduct: (state) => {
      state.status = 'idle';
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
        state.product = null;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'idle';
        state.product = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Product. Try again later.';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateProduct } = productCreateSlice.actions;

export default productCreateSlice.reducer;
