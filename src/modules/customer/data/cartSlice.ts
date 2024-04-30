import { createSlice } from '@reduxjs/toolkit';
import { getCart, addToCart, deleteFromCart } from './cartThunk';
import { initialStateCartType } from './dataTypes';

const initialState: initialStateCartType = {
  cartId: 0,
  cart: [],
  cartItems: 0,
  cartAmount: 0,
  cartQuantity: 0,
  error: '',
  status: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(getCart.fulfilled, (state, payload) => {
      state.cartId = payload?.payload[0]?.id;
      state.cart = payload?.payload[1];
      state.cartItems = state.cart.length;
      state.cartAmount = payload?.payload[0].totalAmount;
      state.cartQuantity = payload?.payload[0].totalQuantity;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = 'failed';
      console.log(state.status);
    });
    builder.addCase(addToCart.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = 'failed';
    });
    builder.addCase(deleteFromCart.pending, (state) => {
      state.error = null;
      state.status = 'loading';
      console.log(state.status);
    });
    builder.addCase(deleteFromCart.fulfilled, (state) => {
      state.status = 'succeeded';
      console.log(state.status);
    });
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = 'failed';
      console.log(state.status);
    });
  },
});

export default cartSlice.reducer;
