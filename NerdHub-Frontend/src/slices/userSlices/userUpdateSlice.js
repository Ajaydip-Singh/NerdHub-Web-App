import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser } from './userAuthenticationSlice';
import { detailsUser } from './userDetailsSlice';

const initialState = {
  status: 'idle',
  user: null,
  error: null
};

export const updateUser = createAsyncThunk(
  'userUpdate/updateUser',
  async (userData, { rejectWithValue, dispatch, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();
    try {
      const { data } = await axios.put(`/api/users/${user._id}`, userData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      dispatch(loginUser.fulfilled(data));
      dispatch(
        detailsUser.fulfilled({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone
        })
      );
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

export const userDetailsSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    resetUpdateUser: (state) => {
      state.status = 'idle';
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Unable to update profile. Please try later.';
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateUser } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
