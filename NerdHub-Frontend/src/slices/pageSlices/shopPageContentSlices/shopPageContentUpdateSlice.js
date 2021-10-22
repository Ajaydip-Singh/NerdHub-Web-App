import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getShopPageContent } from './shopPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateShopPageContent = createAsyncThunk(
  'shopPageContentUpdate/updateShopPageContent',
  async (shopPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/shop-page-content`,
        shopPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getShopPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const shopPageContentUpdateSlice = createSlice({
  name: 'shopPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateShopPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateShopPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateShopPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update shop page content. Try again later.';
      })
      .addCase(updateShopPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateShopPageContent } =
  shopPageContentUpdateSlice.actions;

export default shopPageContentUpdateSlice.reducer;
