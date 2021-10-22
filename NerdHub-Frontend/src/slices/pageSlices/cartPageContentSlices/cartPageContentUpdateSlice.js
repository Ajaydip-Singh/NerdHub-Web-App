import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCartPageContent } from './cartPageContentGetSlice';

const initialState = {
  status: 'idle',
  content: null,
  error: null
};

export const updateCartPageContent = createAsyncThunk(
  'cartPageContentUpdate/updateCartPageContent',
  async (cartPageContent, { rejectWithValue, getState, dispatch }) => {
    const {
      userAuthentication: { user }
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/pages/cart-page-content`,
        cartPageContent,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      dispatch(getCartPageContent.fulfilled(data));
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const cartPageContentUpdateSlice = createSlice({
  name: 'cartPageContentUpdate',
  initialState,
  reducers: {
    resetUpdateCartPageContent: (state) => {
      state.status = 'idle';
      state.content = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartPageContent.pending, (state) => {
        state.status = 'loading';
        state.content = null;
        state.error = null;
      })
      .addCase(updateCartPageContent.rejected, (state, action) => {
        state.status = 'idle';
        state.content = null;
        state.error = action.payload
          ? action.payload
          : 'Cannot update cart page content. Try again later.';
      })
      .addCase(updateCartPageContent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.content = action.payload;
        state.error = null;
      });
  }
});

export const { resetUpdateCartPageContent } =
  cartPageContentUpdateSlice.actions;

export default cartPageContentUpdateSlice.reducer;
