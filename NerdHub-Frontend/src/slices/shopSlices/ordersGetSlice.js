import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  orders: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getOrders = createAsyncThunk(
  'ordersGet/getOrders',
  async ({ pageNumber = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(`/api/orders?pageNumber=${pageNumber}`, {
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

export const ordersGetSlice = createSlice({
  name: 'ordersGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
        state.orders = [];
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'idle';
        state.orders = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Orders. Try again later.';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default ordersGetSlice.reducer;
