import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getFooterContent = createAsyncThunk(
  'footerContentGet/getFooterContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/footer-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const footerContentGetSlice = createSlice({
  name: 'footerContentGet',
  initialState,
  reducers: {
    resetGetFooterContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFooterContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getFooterContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get footer content. Try again later.';
      })
      .addCase(getFooterContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetFooterContent } = footerContentGetSlice.actions;

export default footerContentGetSlice.reducer;
