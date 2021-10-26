import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  eventOrder: null,
  error: null
};

export const createEventOrder = createAsyncThunk(
  'eventOrderCreate/createEventOrder',
  async (eventOrderData, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(`/api/event-orders/`, eventOrderData, {
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

export const eventOrderCreateSlice = createSlice({
  name: 'eventOrderCreate',
  initialState,
  reducers: {
    resetCreateEventOrder: (state) => {
      state.status = 'idle';
      state.eventOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventOrder.pending, (state) => {
        state.status = 'loading';
        state.eventOrder = null;
        state.error = null;
      })
      .addCase(createEventOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.eventOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Event Order. Try again later.';
      })
      .addCase(createEventOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.eventOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateEventOrder } = eventOrderCreateSlice.actions;

export default eventOrderCreateSlice.reducer;
