import { createAsyncThunk } from "@reduxjs/toolkit";
import { accessToken } from "@src/modules/auth/context/AuthProvider";
import { BASE_URL } from "@src/modules/auth/data/authThunk";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (query: {
    paymentMethod_id: string;
    address_id: string | undefined;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}api/shopping/my-cart/orders`, {
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
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
