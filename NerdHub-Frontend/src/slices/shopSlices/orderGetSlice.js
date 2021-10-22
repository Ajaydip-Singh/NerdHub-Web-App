import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  order: null,
  error: null
};

export const getOrder = createAsyncThunk(
  'orderGet/getOrder',
  async (orderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
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

export const orderGetSlice = createSlice({
  name: 'orderGet',
  initialState,
  reducers: {
    resetGetOrder: (state) => {
      state.status = 'idle';
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.status = 'loading';
        state.order = null;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.order = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Get Order. Try again later.';
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetOrder } = orderGetSlice.actions;

export default orderGetSlice.reducer;
