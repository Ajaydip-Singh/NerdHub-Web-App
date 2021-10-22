import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  confirmedUser: null,
  error: null
};

export const confirmUser = createAsyncThunk(
  'userConfirmation/confirmUser',
  async (userData, { rejectWithValue }) => {
    const { userId, confirmationCode } = userData;
    try {
      const { data } = await axios.post(
        `/api/users/${userId}/confirm/${confirmationCode}`
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

export const userConfirmationSlice = createSlice({
  name: 'userConfirmation',
  initialState,
  reducers: {
    resetConfirmUser: (state) => {
      state.status = 'idle';
      state.confirmedUser = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmUser.pending, (state) => {
        state.status = 'loading';
        state.confirmedUser = null;
        state.error = null;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        state.status = 'idle';
        state.confirmedUser = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Email Verification Failed.';
        }
      })
      .addCase(confirmUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.confirmedUser = action.payload;
        state.error = null;
      });
  }
});

export const { resetConfirmUser } = userConfirmationSlice.actions;

export default userConfirmationSlice.reducer;
