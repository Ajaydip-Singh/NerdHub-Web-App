import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  orderStatus: null,
  error: null
};

export const getOrderStatus = createAsyncThunk(
  'orderStatusGet/getOrderStatus',
  async ({ transactionId, merchantRef }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/pesapal/order/status?pesapal_notification_type=CHANGE&pesapal_transaction_tracking_id=${encodeURIComponent(
          transactionId
        )}&pesapal_merchant_reference=${encodeURIComponent(
          merchantRef
        )}&admin=true`,
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

export const orderStatusGetSlice = createSlice({
  name: 'orderStatusGet',
  initialState,
  reducers: {
    resetGetOrderStatus: (state) => {
      state.status = 'idle';
      state.orderStatus = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderStatus.pending, (state) => {
        state.status = 'loading';
        state.orderStatus = null;
        state.error = null;
      })
      .addCase(getOrderStatus.rejected, (state, action) => {
        state.status = 'idle';
        state.orderStatus = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get order status. Try again later.';
      })
      .addCase(getOrderStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orderStatus = action.payload.status;
        state.error = null;
      });
  }
});

export const { resetGetOrderStatus } = orderStatusGetSlice.actions;

export default orderStatusGetSlice.reducer;
