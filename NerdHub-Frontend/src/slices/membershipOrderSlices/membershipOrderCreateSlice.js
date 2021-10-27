import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  membershipOrder: null,
  error: null
};

export const createMembershipOrder = createAsyncThunk(
  'membershipOrderCreate/createMembershipOrder',
  async (membershipOrderData, { rejectWithValue, getState }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.post(
        `/api/membership-orders/`,
        membershipOrderData,
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

export const membershipOrderCreateSlice = createSlice({
  name: 'membershipOrderCreate',
  initialState,
  reducers: {
    resetCreateMembershipOrder: (state) => {
      state.status = 'idle';
      state.membershipOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMembershipOrder.pending, (state) => {
        state.status = 'loading';
        state.membershipOrder = null;
        state.error = null;
      })
      .addCase(createMembershipOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot Create Membership Order. Try again later.';
      })
      .addCase(createMembershipOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.membershipOrder = action.payload;
        state.error = null;
      });
  }
});

export const { resetCreateMembershipOrder } =
  membershipOrderCreateSlice.actions;

export default membershipOrderCreateSlice.reducer;
