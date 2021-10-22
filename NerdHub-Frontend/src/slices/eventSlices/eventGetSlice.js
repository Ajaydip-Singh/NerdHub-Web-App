import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  event: null,
  error: null
};

export const getEvent = createAsyncThunk(
  'eventGet/getEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events/${eventId}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventGetSlice = createSlice({
  name: 'eventGet',
  initialState,
  reducers: {
    resetGetEvent: (state) => {
      state.status = 'idle';
      state.event = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.status = 'loading';
        state.event = null;
        state.error = null;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.event = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get event. Try again later.';
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.event = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetEvent } = eventGetSlice.actions;

export default eventGetSlice.reducer;
