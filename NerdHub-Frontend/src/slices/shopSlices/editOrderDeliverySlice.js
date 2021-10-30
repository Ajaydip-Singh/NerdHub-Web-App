import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  order: null,
  error: null
};

export const editOrderDelivery = createAsyncThunk(
  'orderEditDelivery/editOrderDelivery',
  async (orderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/orders/${encodeURIComponent(orderId)}/deliver`,
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

export const orderEditDeliverySlice = createSlice({
  name: 'orderEditDelivery',
  initialState,
  reducers: {
    resetEditOrderDelivery: (state) => {
      state.status = 'idle';
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(editOrderDelivery.pending, (state) => {
        state.status = 'loading';
        state.order = null;
        state.error = null;
      })
      .addCase(editOrderDelivery.rejected, (state, action) => {
        state.status = 'idle';
        state.order = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot edit order delivery. Try again later.';
      })
      .addCase(editOrderDelivery.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
        state.error = null;
      });
  }
});

export const { resetEditOrderDelivery } = orderEditDeliverySlice.actions;

export default orderEditDeliverySlice.reducer;
