import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getPostPaymentPageContent } from './postPaymentPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updatePostPaymentPageContent = createAsyncThunk(
  'postPaymentPageContentUpdate/updatePostPaymentPageContent',
  async (postPaymentPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/postPayment-page-content`,
        postPaymentPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getPostPaymentPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const postPaymentPageContentUpdateSlice = createSlice({
  name: 'postPaymentPageContentUpdate',
  initialState,
  reducers: {
    resetUpdatePostPaymentPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePostPaymentPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updatePostPaymentPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update postPayment page content. Try again later.';
      })
      .addCase(updatePostPaymentPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdatePostPaymentPageContent } =
  postPaymentPageContentUpdateSlice.actions;

export default postPaymentPageContentUpdateSlice.reducer;
