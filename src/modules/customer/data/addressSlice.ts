import { createSlice } from '@reduxjs/toolkit';
import { addAddress } from './addressThunk';

const initialState = {
  address: '',
  phoneNumber: '',
  city: '',
  state: '',
  zipCode: '',
  userId: 0,
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
  },
});

export default addressSlice.reducer;
