import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  orders: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getOrdersUsers = createAsyncThunk(
  'ordersUsersGet/getOrdersUsers',
  async ({ pageNumber = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/orders/mine?pageNumber=${pageNumber}&userId=${user._id}`,
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

export const ordersUsersGetSlice = createSlice({
  name: 'ordersUsersGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersUsers.pending, (state) => {
        state.status = 'loading';
        state.orders = [];
        state.error = null;
      })
      .addCase(getOrdersUsers.rejected, (state, action) => {
        state.status = 'idle';
        state.orders = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get user orders. Try again later.';
      })
      .addCase(getOrdersUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default ordersUsersGetSlice.reducer;
