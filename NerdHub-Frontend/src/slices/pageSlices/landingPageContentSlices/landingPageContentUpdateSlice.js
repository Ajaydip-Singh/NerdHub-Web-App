import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLandingPageContent } from './landingPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateLandingPageContent = createAsyncThunk(
  'landingPageContentUpdate/updateLandingPageContent',
  async (landingPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/landing-page-content`,
        landingPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getLandingPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const landingPageContentUpdateSlice = createSlice({
  name: 'landingPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateLandingPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLandingPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateLandingPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update landing page content. Try again later.';
      })
      .addCase(updateLandingPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateLandingPageContent } =
  landingPageContentUpdateSlice.actions;

export default landingPageContentUpdateSlice.reducer;
