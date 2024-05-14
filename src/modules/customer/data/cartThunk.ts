import { createAsyncThunk } from "@reduxjs/toolkit";

import { AUTH_URL, BASE_URL } from "@src/modules/auth/data/authThunk";
import { addToCartPayload } from "./dataTypes";
import { accessToken } from "@src/modules/auth/context/AuthProvider";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (query: string) => {
    try {
      const response = await fetch(`${BASE_URL}api/shopping/my-cart`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${query}`,
        },
      });
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (query: addToCartPayload) => {
    try {
      const response = await fetch(`${AUTH_URL}api/shopping/my-cart`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(query),
      });
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (query: number) => {
    try {
      const response = await fetch(`${AUTH_URL}api/shopping/my-cart/${query}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
