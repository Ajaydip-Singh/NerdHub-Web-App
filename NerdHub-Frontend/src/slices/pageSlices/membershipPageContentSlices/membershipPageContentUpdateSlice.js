import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMembershipPageContent } from './membershipPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateMembershipPageContent = createAsyncThunk(
  'membershipPageContentUpdate/updateMembershipPageContent',
  async (membershipPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/membership-page-content`,
        membershipPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getMembershipPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const membershipPageContentUpdateSlice = createSlice({
  name: 'membershipPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateMembershipPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMembershipPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateMembershipPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update membership page content. Try again later.';
      })
      .addCase(updateMembershipPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateMembershipPageContent } =
  membershipPageContentUpdateSlice.actions;

export default membershipPageContentUpdateSlice.reducer;
