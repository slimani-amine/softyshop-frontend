import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (true) console.log(state, action);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
