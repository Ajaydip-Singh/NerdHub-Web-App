import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getHomePageContent } from './homePageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateHomePageContent = createAsyncThunk(
  'homePageContentUpdate/updateHomePageContent',
  async (homePageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/home-page-content`,
        homePageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getHomePageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const homePageContentUpdateSlice = createSlice({
  name: 'homePageContentUpdate',
  initialState,
  reducers: {
    resetUpdateHomePageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateHomePageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateHomePageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update home page content. Try again later.';
      })
      .addCase(updateHomePageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateHomePageContent } =
  homePageContentUpdateSlice.actions;

export default homePageContentUpdateSlice.reducer;
