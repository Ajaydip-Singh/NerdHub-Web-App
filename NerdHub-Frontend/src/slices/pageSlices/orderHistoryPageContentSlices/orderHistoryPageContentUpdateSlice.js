import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getOrderHistoryPageContent } from './orderHistoryPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateOrderHistoryPageContent = createAsyncThunk(
  'orderHistoryPageContentUpdate/updateOrderHistoryPageContent',
  async (orderHistoryPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/orderHistory-page-content`,
        orderHistoryPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getOrderHistoryPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const orderHistoryPageContentUpdateSlice = createSlice({
  name: 'orderHistoryPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateOrderHistoryPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderHistoryPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateOrderHistoryPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update order history page content. Try again later.';
      })
      .addCase(updateOrderHistoryPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateOrderHistoryPageContent } =
  orderHistoryPageContentUpdateSlice.actions;

export default orderHistoryPageContentUpdateSlice.reducer;
