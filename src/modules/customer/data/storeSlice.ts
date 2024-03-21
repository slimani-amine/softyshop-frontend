import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async function () {
    // console.log('hello');
    const response = await fetch(`${BASE_URL}api/stores`);
    // console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const initialState = { data: [] };

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
});

export default storeSlice.reducer;
export const {} = storeSlice.actions;
