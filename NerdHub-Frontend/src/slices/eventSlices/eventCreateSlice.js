import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  event: null,
  error: null
};

export const createEvent = createAsyncThunk(
  'eventCreate/createEvent',
  async (options, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(
        `/api/events/`,
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

export const eventCreateSlice = createSlice({
  name: 'eventCreate',
  initialState,
  reducers: {
    resetCreateEvent: (state) => {
      state.status = 'idle';
      state.event = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.event = null;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.event = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Event. Try again later.';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.event = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateEvent } = eventCreateSlice.actions;

export default eventCreateSlice.reducer;
