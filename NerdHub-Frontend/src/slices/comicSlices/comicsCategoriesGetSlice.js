import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  categories: [],
  error: null
};

export const getComicsCategories = createAsyncThunk(
  'comicsCategoriesGet/getComicCategories',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/comics/categories`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const comicsCategoriesGetSlice = createSlice({
  name: 'comicsCategoriesGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComicsCategories.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
        state.error = null;
      })
      .addCase(getComicsCategories.rejected, (state, action) => {
        state.status = 'idle';
        state.categories = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get comic categories. Try again later.';
      })
      .addCase(getComicsCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        state.error = null;
      });
  }
});

export default comicsCategoriesGetSlice.reducer;
