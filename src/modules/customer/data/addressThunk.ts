import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { accessToken } from "@src/modules/auth/context/AuthProvider";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (query: any) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/users/addresses/${query.userId}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(query.query),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (query: {
    page?: number;
    perPage?: number;
    userId: string | undefined;
  }) => {

    const { page = 1, perPage = 10, userId } = query;


    try {
      const response = await fetch(
        `${BASE_URL}api/users/addresses/${userId}?page=${page}&perPage=${perPage}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (query: number | undefined) => {
    try {
      const response = await fetch(`${BASE_URL}api/users/addresses/${query}`, {
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
