import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  user: null,
  error: null
};

export const detailsUser = createAsyncThunk(
  'userDetails/detailsUser',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    resetDetailsUser: (state) => {
      state.status = 'idle';
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(detailsUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = null;
      })
      .addCase(detailsUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to get user Profile. Please Try again later.';
        }
      })
      .addCase(detailsUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      });
  }
});

export const { resetDetailsUser, resetDetailsSuccess } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
