import { createSlice } from '@reduxjs/toolkit';
import { addAddress, getAddresses } from './addressThunk';

const initialState = {
  address: {
    address: '',
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
  },
  status: '',
  error: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAddress.pending, (state) => {
      state.error = null as any;
      state.status = 'loading';
    });
    builder.addCase(addAddress.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = 'failed';
    });
    builder.addCase(getAddresses.pending, (state) => {
      state.error = null as any;
      state.status = 'loading';
    });
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.address = action.payload;
    });
    builder.addCase(getAddresses.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = 'failed';
    });
  },
});

export default addressSlice.reducer;
