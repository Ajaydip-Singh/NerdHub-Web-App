import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  membershipOrders: [],
  pageNumber: 1,
  pages: 1,
  error: null
};

export const getMembershipOrders = createAsyncThunk(
  'membershipOrdersGet/getMembershipOrders',
  async ({ pageNumber = '' }, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/membership-orders?pageNumber=${pageNumber}`,
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

export const membershipOrdersGetSlice = createSlice({
  name: 'membershipOrdersGet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipOrders.pending, (state) => {
        state.status = 'loading';
        state.membershipOrders = [];
        state.error = null;
      })
      .addCase(getMembershipOrders.rejected, (state, action) => {
        state.status = 'idle';
        state.membershipOrders = [];
        state.error = action.payload
          ? action.payload
          : 'Cannot get Membership Orders. Try again later.';
      })
      .addCase(getMembershipOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.membershipOrders = action.payload.membershipOrders;
        state.pageNumber = action.payload.pageNumber;
        state.pages = action.payload.pages;
        state.error = null;
      });
  }
});

export default membershipOrdersGetSlice.reducer;
