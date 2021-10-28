import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getOrderHistoryPageContent = createAsyncThunk(
  'orderHistoryPageContentGet/getOrderHistoryPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/orderHistory-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const orderHistoryPageContentGetSlice = createSlice({
  name: 'orderHistoryPageContentGet',
  initialState,
  reducers: {
    resetGetOrderHistoryPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistoryPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getOrderHistoryPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get order history page content. Try again later.';
      })
      .addCase(getOrderHistoryPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetOrderHistoryPageContent } =
  orderHistoryPageContentGetSlice.actions;

export default orderHistoryPageContentGetSlice.reducer;
