import { createSlice } from "@reduxjs/toolkit";
import { addAddress, getAddresses } from "./addressThunk";

const initialState = {
  addresses: { addresses: [], totalRecords: 1 },
  selectedAddress: null,
  status: "",
  error: "",
  isPopUpShown: false,
  agreedToPayAllDeliveryFees: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateSelectedId(state, action) {
      state.selectedAddress = action.payload;
    },
    popItUp(state) {
      state.isPopUpShown = true;
    },
    hideIt(state) {
      state.isPopUpShown = false;
    },
    agreeToAllFees(state) {
      state.agreedToPayAllDeliveryFees = true;
    },
    refuseAllFees(state) {
      state.agreedToPayAllDeliveryFees = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAddress.pending, (state) => {
      state.error = null as any;
      state.status = "loading";
    });
    builder.addCase(addAddress.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = "failed";
    });
    builder.addCase(getAddresses.pending, (state) => {
      state.error = null as any;
      state.status = "loading";
    });
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.addresses = {
        addresses: action.payload.docs,
        totalRecords: action.payload.meta.totalRecords,
      };
    });
    builder.addCase(getAddresses.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = "failed";
    });
  },
});

export default addressSlice.reducer;
export const {
  updateSelectedId,
  popItUp,
  hideIt,
  agreeToAllFees,
  refuseAllFees,
} = addressSlice.actions;
