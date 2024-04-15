import { createSlice } from '@reduxjs/toolkit';
import { getCart, addToCart } from './cartThunk';
import { StateType } from './cartTypes';

const initialState: StateType = {
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
  reducers: {
    // addToCart(state, action) {
    //   if (true) {
    //     if (!isNaN(action.payload)) {
    //       console.log(state);
    //     }
    //     // state.cart.push(action.payload);
    //     // state.cartItems++;
    //     // // console.log({ ...state.cart });
    //     // state.cart.forEach((item: ItemType) => console.log({ ...item }));
    //     // console.log('--------------------------------');
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.error = null;
      state.status = 'loading';
      // console.log(state.status);
    });
    builder.addCase(getCart.fulfilled, (state, payload) => {
      state.status = 'succeeded';

      state.cartId = payload.payload[0].id;
      state.cart = payload.payload[1];
      state.cartItems = state.cart.length;
      state.cartAmount = payload.payload[0].totalAmount;
      state.cartQuantity = payload.payload[0].totalQuantity;

      console.log(state.status);
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = 'failed';
      // console.log(state.status);
    });
    builder.addCase(addToCart.pending, (state) => {
      state.error = null;
      state.status = 'loading';
      // console.log(state.status);
    });
    builder.addCase(addToCart.fulfilled, (state, payload) => {
      state.status = 'succeeded';
      // console.log(`payload: ${payload.payload}`);
      // console.log(state.status);
      // state.cartId = payload.payload[0].id;
      // state.cart = payload.payload[1];
      // state.cartItems = state.cart.length;
      // state.cartAmount = payload.payload[0].totalAmount;
      // state.cartQuantity = payload.payload[0].totalQuantity;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = 'failed';
      // console.log(state.status);
    });
  },
});

export default cartSlice.reducer;
// export const { addToCart } = cartSlice.actions;
