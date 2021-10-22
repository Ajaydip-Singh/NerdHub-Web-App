import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  comic: null,
  error: null
};

export const deleteComic = createAsyncThunk(
  'comicDelete/deleteComic',
  async (comicId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(`/api/comics/${comicId}`, {
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

export const comicDeleteSlice = createSlice({
  name: 'comicDelete',
  initialState,
  reducers: {
    resetDeleteComic: (state) => {
      state.status = 'idle';
      state.comic = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteComic.pending, (state) => {
        state.status = 'loading';
        state.comic = null;
        state.error = null;
      })
      .addCase(deleteComic.rejected, (state, action) => {
        state.status = 'idle';
        state.comic = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Comic. Try again later.';
      })
      .addCase(deleteComic.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comic = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteComic } = comicDeleteSlice.actions;

export default comicDeleteSlice.reducer;
