import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  comic: null,
  error: null
};

export const createComic = createAsyncThunk(
  'comicCreate/createComic',
  async (options, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(
        `/api/comics/`,
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

export const comicCreateSlice = createSlice({
  name: 'comicCreate',
  initialState,
  reducers: {
    resetCreateComic: (state) => {
      state.status = 'idle';
      state.comic = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComic.pending, (state) => {
        state.status = 'loading';
        state.comic = null;
        state.error = null;
      })
      .addCase(createComic.rejected, (state, action) => {
        state.status = 'idle';
        state.comic = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Comic. Try again later.';
      })
      .addCase(createComic.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comic = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateComic } = comicCreateSlice.actions;

export default comicCreateSlice.reducer;
