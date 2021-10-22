import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  comic: null,
  error: null
};

export const getComic = createAsyncThunk(
  'comicGet/getComic',
  async (comicId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/comics/${comicId}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const comicGetSlice = createSlice({
  name: 'comicGet',
  initialState,
  reducers: {
    resetGetComic: (state) => {
      state.status = 'idle';
      state.comic = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComic.pending, (state) => {
        state.status = 'loading';
        state.comic = null;
        state.error = null;
      })
      .addCase(getComic.rejected, (state, action) => {
        state.status = 'idle';
        state.comic = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get comic. Try again later.';
      })
      .addCase(getComic.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comic = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetComic } = comicGetSlice.actions;

export default comicGetSlice.reducer;
