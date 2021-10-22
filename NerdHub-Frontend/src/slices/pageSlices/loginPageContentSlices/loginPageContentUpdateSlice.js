import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLoginPageContent } from './loginPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateLoginPageContent = createAsyncThunk(
  'loginPageContentUpdate/updateLoginPageContent',
  async (loginPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/login-page-content`,
        loginPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getLoginPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginPageContentUpdateSlice = createSlice({
  name: 'loginPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateLoginPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLoginPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateLoginPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update login page content. Try again later.';
      })
      .addCase(updateLoginPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateLoginPageContent } =
  loginPageContentUpdateSlice.actions;

export default loginPageContentUpdateSlice.reducer;
