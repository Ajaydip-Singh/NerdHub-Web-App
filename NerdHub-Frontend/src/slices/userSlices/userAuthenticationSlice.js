import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const googleLoginUser = createAsyncThunk(
  'userGoogleAuthentication/googleLoginUser',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post('/api/users/login/google', {
        token
      });
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'userAuthentication/loginUser',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const { data } = await Axios.post('/api/users/login', {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userAuthenticationSlice = createSlice({
  name: 'userAuthentication',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    resetLoginErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Login failed. Please try again later.';
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Login failed. Please try again later.';
        }
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      });
  }
});

export const { logoutUser, resetLoginErrors } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
