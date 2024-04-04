import { createSlice } from '@reduxjs/toolkit';

interface ItemType {
  availability: boolean;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  creator: { id: number; name: string };
  id: number;
  isPublished: boolean;
  name: string;
  price: number;
  publishedAt: string;
  reviews: string[];
  stockNumber: number;
  store: { id: number; name: string };
}

interface StateType {
  cart: ItemType[];
  cartItems: number;
}

const initialState: StateType = {
  cart: [],
  cartItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(
        state.cart.find((cartItem) => cartItem.id == action.payload.id)
      );
      if (true) {
        // console.log(action.payload);
        state.cart.push(action.payload);
        state.cartItems++;
        // console.log({ ...state.cart });
        state.cart.forEach((item: ItemType) => console.log({ ...item }));
        console.log('--------------------------------');
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
