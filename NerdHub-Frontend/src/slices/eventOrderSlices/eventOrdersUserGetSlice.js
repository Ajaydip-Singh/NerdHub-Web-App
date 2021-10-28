import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  orders: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getEventOrdersUser = createAsyncThunk(
  'eventOrdersUserGet/getEventOrdersUser',
  async ({ pageNumber = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/event-orders?pageNumber=${pageNumber}&userId=${user._id}`,
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

export const eventOrdersUserGetSlice = createSlice({
  name: 'eventOrdersUserGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEventOrdersUser.pending, (state) => {
        state.status = 'loading';
        state.orders = [];
        state.error = null;
      })
      .addCase(getEventOrdersUser.rejected, (state, action) => {
        state.status = 'idle';
        state.orders = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get event Orders. Try again later.';
      })
      .addCase(getEventOrdersUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.eventOrders;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default eventOrdersUserGetSlice.reducer;
