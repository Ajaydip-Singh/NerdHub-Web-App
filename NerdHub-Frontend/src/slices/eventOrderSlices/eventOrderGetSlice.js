import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  eventOrder: null,
  error: null
};

export const getEventOrder = createAsyncThunk(
  'eventOrderGet/getEventOrder',
  async (eventOrderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();
    try {
      const { data } = await axios.get(`/api/event-orders/${eventOrderId}`, {
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

export const eventOrderGetSlice = createSlice({
  name: 'eventOrderGet',
  initialState,
  reducers: {
    resetGetEventOrder: (state) => {
      state.status = 'idle';
      state.eventOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventOrder.pending, (state) => {
        state.status = 'loading';
        state.eventOrder = null;
        state.error = null;
      })
      .addCase(getEventOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.eventOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Get Event Order. Try again later.';
      })
      .addCase(getEventOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetEventOrder } = eventOrderGetSlice.actions;

export default eventOrderGetSlice.reducer;
