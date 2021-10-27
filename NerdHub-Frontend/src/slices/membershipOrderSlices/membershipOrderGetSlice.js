import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  membershipOrder: null,
  error: null
};

export const getMembershipOrder = createAsyncThunk(
  'membershipOrderGet/getMembershipOrder',
  async (membershipOrderId, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();
    try {
      const { data } = await axios.get(
        `/api/membership-orders/${membershipOrderId}`,
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

export const membershipOrderGetSlice = createSlice({
  name: 'membershipOrderGet',
  initialState,
  reducers: {
    resetGetMembershipOrder: (state) => {
      state.status = 'idle';
      state.membershipOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipOrder.pending, (state) => {
        state.status = 'loading';
        state.membershipOrder = null;
        state.error = null;
      })
      .addCase(getMembershipOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Get Membership Order. Try again later.';
      })
      .addCase(getMembershipOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetGetMembershipOrder } = membershipOrderGetSlice.actions;

export default membershipOrderGetSlice.reducer;
