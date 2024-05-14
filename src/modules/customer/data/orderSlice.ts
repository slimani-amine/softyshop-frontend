import { createSlice } from '@reduxjs/toolkit';
import { addOrder } from './orderThunk';

const initialState = {
  order: {
    address_id: "",
    paymentMethod_id: "1",
  },
  error: '',
  status: '',
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.error = null as any;
      state.status = 'loading';
    });
    builder.addCase(addOrder.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = 'failed';
    });
  },
});

export default orderSlice.reducer;
