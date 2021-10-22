import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getOrderPageContent } from './orderPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateOrderPageContent = createAsyncThunk(
  'orderPageContentUpdate/updateOrderPageContent',
  async (orderPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/order-page-content`,
        orderPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getOrderPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const orderPageContentUpdateSlice = createSlice({
  name: 'orderPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateOrderPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateOrderPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update order page content. Try again later.';
      })
      .addCase(updateOrderPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateOrderPageContent } =
  orderPageContentUpdateSlice.actions;

export default orderPageContentUpdateSlice.reducer;
