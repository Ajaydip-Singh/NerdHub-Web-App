import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAboutPageContent } from './aboutPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateAboutPageContent = createAsyncThunk(
  'aboutPageContentUpdate/updateAboutPageContent',
  async (aboutPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/about-page-content`,
        aboutPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getAboutPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const aboutPageContentUpdateSlice = createSlice({
  name: 'aboutPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateAboutPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAboutPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateAboutPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update about page content. Try again later.';
      })
      .addCase(updateAboutPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateAboutPageContent } =
  aboutPageContentUpdateSlice.actions;

export default aboutPageContentUpdateSlice.reducer;
