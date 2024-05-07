import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { accessToken } from '@src/modules/auth/context/AuthProvider';

export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (query: any) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/users/addresses/${query.userId}`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(query.query),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
