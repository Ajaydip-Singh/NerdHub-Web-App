import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  comics: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getComics = createAsyncThunk(
  'comicsGet/getComics',
  async (
    { pageNumber = '', name = '', category = '', isActive = '' },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        `/api/comics?pageNumber=${pageNumber}&name=${name}&category=${category}&isActive=${isActive}`
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

export const comicsGetSlice = createSlice({
  name: 'comicsGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComics.pending, (state) => {
        state.status = 'loading';
        state.comics = [];
        state.error = null;
      })
      .addCase(getComics.rejected, (state, action) => {
        state.status = 'idle';
        state.comics = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Comics. Try again later.';
      })
      .addCase(getComics.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comics = action.payload.comics;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default comicsGetSlice.reducer;
