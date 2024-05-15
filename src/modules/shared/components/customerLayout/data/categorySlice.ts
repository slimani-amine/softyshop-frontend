import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoryThunk';

const initialState = {
  categories: [],
  error: '',
  status: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.status = 'loading';
      state.error = null as any;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer;
