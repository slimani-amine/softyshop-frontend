import { createSlice } from '@reduxjs/toolkit';
import { getBrands } from './brandThunk';
const initialState = {
  brands: [],
  error: '',
  status: '',
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.error = null as any;
      state.status = 'loading';
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.brands = action.payload;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.error = action?.payload as string;
      state.status = 'failed';
    });
  },
});

export default brandSlice.reducer;
