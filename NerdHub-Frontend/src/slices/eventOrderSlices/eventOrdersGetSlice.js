import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  eventOrders: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getEventOrders = createAsyncThunk(
  'eventOrdersGet/getEventOrders',
  async ({ pageNumber = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/event-orders?pageNumber=${pageNumber}`,
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

export const eventOrdersGetSlice = createSlice({
  name: 'eventOrdersGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEventOrders.pending, (state) => {
        state.status = 'loading';
        state.eventOrders = [];
        state.error = null;
      })
      .addCase(getEventOrders.rejected, (state, action) => {
        state.status = 'idle';
        state.eventOrders = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Event Orders. Try again later.';
      })
      .addCase(getEventOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventOrders = action.payload.eventOrders;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default eventOrdersGetSlice.reducer;
