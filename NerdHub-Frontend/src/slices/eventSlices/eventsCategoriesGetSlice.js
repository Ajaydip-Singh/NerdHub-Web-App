import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  categories: [],
  error: null
};

export const getEventsCategories = createAsyncThunk(
  'eventsCategoriesGet/getEventCategories',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/events/categories`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventsCategoriesGetSlice = createSlice({
  name: 'eventsCategoriesGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEventsCategories.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
        state.error = null;
      })
      .addCase(getEventsCategories.rejected, (state, action) => {
        state.status = 'idle';
        state.categories = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get event categories. Try again later.';
      })
      .addCase(getEventsCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        state.error = null;
      });
  }
});

export default eventsCategoriesGetSlice.reducer;
