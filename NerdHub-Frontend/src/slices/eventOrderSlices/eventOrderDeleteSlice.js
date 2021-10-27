import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  eventOrder: null,
  error: null
};

export const deleteEventOrder = createAsyncThunk(
  'eventOrderDelete/deleteEventOrder',
  async (eventOrderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(`/api/event-orders/${eventOrderId}`, {
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

export const eventOrderDeleteSlice = createSlice({
  name: 'eventOrderDelete',
  initialState,
  reducers: {
    resetDeleteEventOrder: (state) => {
      state.status = 'idle';
      state.eventOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEventOrder.pending, (state) => {
        state.status = 'loading';
        state.eventOrder = null;
        state.error = null;
      })
      .addCase(deleteEventOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.eventOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Event Order. Try again later.';
      })
      .addCase(deleteEventOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteEventOrder } = eventOrderDeleteSlice.actions;

export default eventOrderDeleteSlice.reducer;
