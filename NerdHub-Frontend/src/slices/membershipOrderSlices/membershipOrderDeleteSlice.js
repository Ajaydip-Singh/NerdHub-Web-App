import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  membershipOrder: null,
  error: null
};

export const deleteMembershipOrder = createAsyncThunk(
  'membershipOrderDelete/deleteMembershipOrder',
  async (membershipOrderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.delete(
        `/api/membership-orders/${encodeURIComponent(membershipOrderId)}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const membershipOrderDeleteSlice = createSlice({
  name: 'membershipOrderDelete',
  initialState,
  reducers: {
    resetDeleteMembershipOrder: (state) => {
      state.status = 'idle';
      state.membershipOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMembershipOrder.pending, (state) => {
        state.status = 'loading';
        state.membershipOrder = null;
        state.error = null;
      })
      .addCase(deleteMembershipOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Delete Membership Order. Try again later.';
      })
      .addCase(deleteMembershipOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetDeleteMembershipOrder } = membershipOrderDeleteSlice.actions;

export default membershipOrderDeleteSlice.reducer;
