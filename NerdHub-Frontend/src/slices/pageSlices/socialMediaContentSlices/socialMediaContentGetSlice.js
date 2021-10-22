import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const getSocialMediaContent = createAsyncThunk(
  'socialMediaContentGet/getSocialMediaContent',
  async (options, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/pages/socialMedia-content`);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const socialMediaContentGetSlice = createSlice({
  name: 'socialMediaContentGet',
  initialState,
  reducers: {
    resetGetSocialMediaContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSocialMediaContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(getSocialMediaContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot get socialMedia content. Try again later.';
      })
      .addCase(getSocialMediaContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetSocialMediaContent } = socialMediaContentGetSlice.actions;

export default socialMediaContentGetSlice.reducer;
