import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRegisterPageContent } from './registerPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateRegisterPageContent = createAsyncThunk(
  'registerPageContentUpdate/updateRegisterPageContent',
  async (registerPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/register-page-content`,
        registerPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getRegisterPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerPageContentUpdateSlice = createSlice({
  name: 'registerPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateRegisterPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRegisterPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateRegisterPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update register page content. Try again later.';
      })
      .addCase(updateRegisterPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateRegisterPageContent } =
  registerPageContentUpdateSlice.actions;

export default registerPageContentUpdateSlice.reducer;
