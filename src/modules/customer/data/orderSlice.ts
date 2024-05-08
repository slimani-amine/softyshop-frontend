import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: {
    address_id: '',
    paymentMethod_id: '1',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export default orderSlice.reducer;
