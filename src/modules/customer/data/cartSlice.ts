import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, deleteFromCart } from "./cartThunk";
import { initialStateCartType } from "./dataTypes";

const initialState: initialStateCartType = {
  cartId: 0,
  cart: [],
  cartItems: 0,
  cartAmount: 0,
  cartQuantity: 0,
  error: "",
  status: "",
  token: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveToken(state, action) {
      if (!action.payload) return;
      state.token = action.payload;
      // console.log('🚀 ~ saveToken ~ action.payload:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cartId = action?.payload[0]?.id;
      state.cart = action?.payload[1];
      state.cartItems = state?.cart?.length;
      state.cartAmount = action?.payload[0].totalAmount;
      state.cartQuantity = action?.payload[0].totalQuantity;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = "failed";
    });
    builder.addCase(addToCart.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = "failed";
    });
    builder.addCase(deleteFromCart.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(deleteFromCart.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.error = action?.payload;
      state.status = "failed";
    });
  },
});

export default cartSlice.reducer;
export const { saveToken } = cartSlice.actions;
