import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  comic: null,
  error: null
};

export const updateComic = createAsyncThunk(
  'comicUpdate/updateComic',
  async (comic, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(`/api/comics/${comic._id}`, comic, {
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

export const comicUpdateSlice = createSlice({
  name: 'comicUpdate',
  initialState,
  reducers: {
    resetUpdateComic: (state) => {
      state.status = 'idle';
      state.comic = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateComic.pending, (state) => {
        state.status = 'loading';
        state.comic = null;
        state.error = null;
      })
      .addCase(updateComic.rejected, (state, action) => {
        state.status = 'idle';
        state.comic = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update comic. Try again later.';
      })
      .addCase(updateComic.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comic = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateComic } = comicUpdateSlice.actions;

export default comicUpdateSlice.reducer;
