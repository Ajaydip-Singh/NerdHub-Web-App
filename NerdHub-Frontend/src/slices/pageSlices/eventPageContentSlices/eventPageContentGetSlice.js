import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getEventPageContent = createAsyncThunk(
  'eventPageContentGet/getEventPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/event-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventPageContentGetSlice = createSlice({
  name: 'eventPageContentGet',
  initialState,
  reducers: {
    resetGetEventPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getEventPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get event page content. Try again later.';
      })
      .addCase(getEventPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetEventPageContent } = eventPageContentGetSlice.actions;

export default eventPageContentGetSlice.reducer;
