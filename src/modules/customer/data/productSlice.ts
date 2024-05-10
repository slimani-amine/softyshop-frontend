import { createSlice } from "@reduxjs/toolkit";
import { initialStateProductType } from "./dataTypes";

const initialState: initialStateProductType = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    settProducts(state, action) {
      state.products = action.payload;
    },
    updateQuantity(state, action) {
      state.products[0].quantity = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { updateQuantity, settProducts } = productSlice.actions;
