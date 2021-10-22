import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSocialMediaContent } from './socialMediaContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateSocialMediaContent = createAsyncThunk(
  'socialMediaContentUpdate/updateSocialMediaContent',
  async (socialMediaContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/socialMedia-content`,
        socialMediaContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getSocialMediaContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const socialMediaContentUpdateSlice = createSlice({
  name: 'socialMediaContentUpdate',
  initialState,
  reducers: {
    resetUpdateSocialMediaContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSocialMediaContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateSocialMediaContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update socialMedia content. Try again later.';
      })
      .addCase(updateSocialMediaContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateSocialMediaContent } =
  socialMediaContentUpdateSlice.actions;

export default socialMediaContentUpdateSlice.reducer;
