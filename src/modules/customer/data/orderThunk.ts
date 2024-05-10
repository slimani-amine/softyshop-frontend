import { createAsyncThunk } from "@reduxjs/toolkit";
import { accessToken } from "@src/modules/auth/context/AuthProvider";
import { BASE_URL } from "@src/modules/auth/data/authThunk";

export const addOrder = createAsyncThunk("order/addOrder", async () => {
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
    });
    const data = await response.json();
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
});
