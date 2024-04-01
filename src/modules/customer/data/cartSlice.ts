import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: ['Rolex', 'Cheap Watch'],
  cartItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (true) console.log(action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
