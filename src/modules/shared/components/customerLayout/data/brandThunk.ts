import { createAsyncThunk } from '@reduxjs/toolkit';
import { accessToken } from '@src/modules/auth/context/AuthProvider';
import { BASE_URL } from '@src/modules/auth/data/authThunk';

export const getBrands = createAsyncThunk('brand/getBrands', async () => {
  try {
    const response = await fetch(`${BASE_URL}api/brands`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.data.docs;
  } catch (error) {
    console.log(error);
    return error;
  }
});
