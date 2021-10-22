import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getLoginPageContent = createAsyncThunk(
  'loginPageContentGet/getLoginPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/login-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginPageContentGetSlice = createSlice({
  name: 'loginPageContentGet',
  initialState,
  reducers: {
    resetGetLoginPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getLoginPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get login page content. Try again later.';
      })
      .addCase(getLoginPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetLoginPageContent } = loginPageContentGetSlice.actions;

export default loginPageContentGetSlice.reducer;
