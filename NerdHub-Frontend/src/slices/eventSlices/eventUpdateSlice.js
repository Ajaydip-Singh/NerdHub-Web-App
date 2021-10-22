import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  event: null,
  error: null
};

export const updateEvent = createAsyncThunk(
  'eventUpdate/updateEvent',
  async (event, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(`/api/events/${event._id}`, event, {
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

export const eventUpdateSlice = createSlice({
  name: 'eventUpdate',
  initialState,
  reducers: {
    resetUpdateEvent: (state) => {
      state.status = 'idle';
      state.event = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
        state.event = null;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.event = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update event. Try again later.';
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.event = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateEvent } = eventUpdateSlice.actions;

export default eventUpdateSlice.reducer;
