import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  order: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'orderCreate/createOrder',
  async (orderData, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(`/api/orders/`, orderData, {
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

export const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState,
  reducers: {
    resetCreateOrder: (state) => {
      state.status = 'idle';
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.order = null;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.order = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Order. Try again later.';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateOrder } = orderCreateSlice.actions;

export default orderCreateSlice.reducer;
