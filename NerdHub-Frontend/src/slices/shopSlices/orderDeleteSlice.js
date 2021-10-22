import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  order: null,
  error: null
};

export const deleteOrder = createAsyncThunk(
  'orderDelete/deleteOrder',
  async (orderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(`/api/orders/${orderId}`, {
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

export const orderDeleteSlice = createSlice({
  name: 'orderDelete',
  initialState,
  reducers: {
    resetDeleteOrder: (state) => {
      state.status = 'idle';
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
        state.order = null;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.order = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Order. Try again later.';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteOrder } = orderDeleteSlice.actions;

export default orderDeleteSlice.reducer;
