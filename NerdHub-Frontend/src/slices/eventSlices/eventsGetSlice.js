import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  events: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getEvents = createAsyncThunk(
  'eventsGet/getEvents',
  async (
    {
      pageNumber = '',
      name = '',
      category = '',
      venue = '',
      isFeaturedEvent = '',
      isActive = ''
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `/api/events?pageNumber=${pageNumber}&name=${name}&category=${category}&venue=${venue}&isFeaturedEvent=${isFeaturedEvent}&isActive=${isActive}`
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

export const eventsGetSlice = createSlice({
  name: 'eventsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = 'loading';
        state.events = [];
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = 'idle';
        state.events = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Events. Try again later.';
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'idle';
        state.events = action.payload.events;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default eventsGetSlice.reducer;
