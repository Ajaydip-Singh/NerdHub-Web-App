import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  createdUser: null,
  error: null
};

export const registerUser = createAsyncThunk(
  'userRegister/registerUser',
  async (userData, { rejectWithValue }) => {
    const { firstName, lastName, email, password } = userData;
    try {
      const { data } = await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        password
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

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    resetRegisterUser: (state) => {
      state.status = 'idle';
      state.createdUser = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.createdUser = null;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'idle';
        state.createdUser = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Register failed. Please try again later.';
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.createdUser = action.payload;
        state.error = null;
      });
  }
});

export const { resetRegisterUser } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
