import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getEventPageContent } from './eventPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateEventPageContent = createAsyncThunk(
  'eventPageContentUpdate/updateEventPageContent',
  async (eventPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/event-page-content`,
        eventPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getEventPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const eventPageContentUpdateSlice = createSlice({
  name: 'eventPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateEventPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEventPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateEventPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update event page content. Try again later.';
      })
      .addCase(updateEventPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateEventPageContent } =
  eventPageContentUpdateSlice.actions;

export default eventPageContentUpdateSlice.reducer;
