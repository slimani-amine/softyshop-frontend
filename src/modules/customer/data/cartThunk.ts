import { createAsyncThunk } from '@reduxjs/toolkit';

import { AUTH_URL, BASE_URL } from '@src/modules/auth/data/authThunk';
import { addToCartPayload } from './dataTypes';

export const getCart = createAsyncThunk('cart/getCart', async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}api/shopping/my-cart`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (query: addToCartPayload) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${AUTH_URL}api/shopping/my-cart`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      });
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
