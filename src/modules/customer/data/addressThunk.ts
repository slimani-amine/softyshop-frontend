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
      console.log('🚀 ~ data:', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAddresses = createAsyncThunk(
  'address/getAddresses',
  async (query: string | undefined) => {
    try {
      console.log('🚀 ~ query:', query);
      console.log('🚀 ~ accessToken:', accessToken);
      const response = await fetch(`${BASE_URL}api/users/addresses/${query}`, {
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
      console.log('🚀 ~ data:', data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (query: number | undefined) => {
    try {
      console.log('🚀 ~ query:', query);
      console.log('🚀 ~ accessToken:', accessToken);
      const response = await fetch(`${BASE_URL}api/users/addresses/${query}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(
        '🚀 ~ data:',
        data.data.sort(() => -4)
      );
      return data.data.sort(() => -4);
    } catch (error) {
      console.log(error);
    }
  }
);
