import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getContactPageContent } from './contactPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateContactPageContent = createAsyncThunk(
  'contactPageContentUpdate/updateContactPageContent',
  async (aboutPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/contact-page-content`,
        aboutPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getContactPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const contactPageContentUpdateSlice = createSlice({
  name: 'contactPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateContactPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateContactPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateContactPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update contact page content. Try again later.';
      })
      .addCase(updateContactPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateContactPageContent } =
  contactPageContentUpdateSlice.actions;

export default contactPageContentUpdateSlice.reducer;
