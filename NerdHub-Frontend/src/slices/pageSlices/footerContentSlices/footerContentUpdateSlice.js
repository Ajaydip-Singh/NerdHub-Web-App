import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFooterContent } from './footerContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateFooterContent = createAsyncThunk(
  'footerContentUpdate/updateFooterContent',
  async (footerContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/footer-content`,
        footerContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getFooterContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const footerContentUpdateSlice = createSlice({
  name: 'footerContentUpdate',
  initialState,
  reducers: {
    resetUpdateFooterContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateFooterContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateFooterContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update footer content. Try again later.';
      })
      .addCase(updateFooterContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateFooterContent } = footerContentUpdateSlice.actions;

export default footerContentUpdateSlice.reducer;
