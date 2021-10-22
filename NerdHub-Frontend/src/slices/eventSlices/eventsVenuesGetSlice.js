import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  venues: [],
  error: null
};

export const getEventsVenues = createAsyncThunk(
  'eventsVenuesGet/getEventVenues',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events/venues`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventsVenuesGetSlice = createSlice({
  name: 'eventsVenuesGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEventsVenues.pending, (state) => {
        state.status = 'loading';
        state.venues = [];
        state.error = null;
      })
      .addCase(getEventsVenues.rejected, (state, action) => {
        state.status = 'idle';
        state.venues = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get event categories. Try again later.';
      })
      .addCase(getEventsVenues.fulfilled, (state, action) => {
        state.status = 'idle';
        state.venues = action.payload;
        state.error = null;
      });
  }
});

export default eventsVenuesGetSlice.reducer;
