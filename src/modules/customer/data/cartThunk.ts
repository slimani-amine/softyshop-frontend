import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '@src/modules/auth/data/authThunk';
import { addToCartPayload } from './cartTypes';

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
    // console.log(response);
    // console.log(token);
    const data = await response.json();
    // console.log(data.data);
    return data.data;
  } catch (error) {}
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (query: addToCartPayload) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}api/shopping/my-cart`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      // console.log(token);
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {}
  }
);
