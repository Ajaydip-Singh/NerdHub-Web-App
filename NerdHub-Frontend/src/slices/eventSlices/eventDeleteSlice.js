import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  event: null,
  error: null
};

export const deleteEvent = createAsyncThunk(
  'eventDelete/deleteEvent',
  async (eventId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(`/api/events/${eventId}`, {
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

export const eventDeleteSlice = createSlice({
  name: 'eventDelete',
  initialState,
  reducers: {
    resetDeleteEvent: (state) => {
      state.status = 'idle';
      state.event = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.status = 'loading';
        state.event = null;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.event = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Event. Try again later.';
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.event = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteEvent } = eventDeleteSlice.actions;

export default eventDeleteSlice.reducer;
