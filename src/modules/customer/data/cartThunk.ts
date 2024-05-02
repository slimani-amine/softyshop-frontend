import { createAsyncThunk } from '@reduxjs/toolkit';

import { AUTH_URL, BASE_URL } from '@src/modules/auth/data/authThunk';
import { addToCartPayload } from './dataTypes';
import { accessToken as token } from '@src/modules/auth/context/AuthProvider';

export const getCart = createAsyncThunk('cart/getCart', async () => {
  try {
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

export const deleteFromCart = createAsyncThunk(
  'cart/deleteFromCart',
  async (query: number) => {
    try {
      // console.log(query);
      const response = await fetch(`${AUTH_URL}api/shopping/my-cart/${query}`, {
        method: 'DELETE',
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
  }
);
