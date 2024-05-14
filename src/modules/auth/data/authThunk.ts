/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import {
  LoginPayload,
  RegisterPayload,
  enterNewPasswordPayload,
  resetPasswordPayload,
} from "./authTypes";
import { clearTokens } from "../utils/token";

export const AUTH_URL = import.meta.env.VITE_APP_AUTH_URL;
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}auth/login`, query);

      if (response.status === 200) {
        return response.data;
      }
      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (query: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/register`,
        query,
      );

      if (response.status === 201) {
        // const accessToken = response.data.data.accessToken;
        // setTokens(accessToken);
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${AUTH_URL}auth/logout`);

      if (response.status === 200) {
        clearTokens();
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (query: resetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/password-reset/request`,
        query,
      );

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

export const enterNewPassword = createAsyncThunk(
  "auth/enterNewPassword",
  async (query: enterNewPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/password-reset`,
        query,
      );


      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);
