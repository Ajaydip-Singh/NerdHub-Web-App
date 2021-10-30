import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getPostPaymentPageContent = createAsyncThunk(
  'postPaymentPageContentGet/getPostPaymentPageContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/postPayment-page-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const postPaymentPageContentGetSlice = createSlice({
  name: 'postPaymentPageContentGet',
  initialState,
  reducers: {
    resetGetPostPaymentPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostPaymentPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getPostPaymentPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get postPayment page content. Try again later.';
      })
      .addCase(getPostPaymentPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetPostPaymentPageContent } = postPaymentPageContentGetSlice.actions;

export default postPaymentPageContentGetSlice.reducer;
