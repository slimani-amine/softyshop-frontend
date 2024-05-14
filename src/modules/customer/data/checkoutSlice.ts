import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenAddress: null,
  deliveryDate: null,
  deliveryTime: null,
  agreedToPayCash: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkIt(state) {
      state.agreedToPayCash = !state.agreedToPayCash;
    },
    setDate(state, payload: any) {
      state.deliveryDate = payload;
    },
    setTime(state, payload: any) {
      state.deliveryTime = payload;
    },
    setCheckedToFalse(state) {
      state.agreedToPayCash = false;
    },
  },
});

export default checkoutSlice.reducer;
export const { checkIt, setDate, setTime,setCheckedToFalse } = checkoutSlice.actions;
