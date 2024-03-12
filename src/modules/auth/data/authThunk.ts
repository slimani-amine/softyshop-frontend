/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';
import {
  LoginPayload,
  RegisterPayload,
  enterNewPasswordPayload,
  resetPasswordPayload,
} from './authTypes';
import { clearTokens } from '../utils/token';
// const BASE_URL = 'http://192.168.3.27:3000/v1/';
export const AUTH_URL = 'https://55b8-41-227-28-226.ngrok-free.app/v1/';
export const BASE_URL = 'http://192.168.3.27:3000/v1/';
export const login = createAsyncThunk(
  'auth/login',
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post(`/api/auth/login`, query);
      const response = await axiosInstance.post(`${AUTH_URL}auth/login`, query);

      if (response.status === 200) {
        // const accessToken = response.data.data.accessToken;
        // setTokens(accessToken);
        return response.data;
      }
      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (query: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/register`,
        query
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
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${AUTH_URL}auth/logout`);

      if (response.status === 200) {
        clearTokens();
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset',
  async (query: resetPasswordPayload, { rejectWithValue }) => {
    try {
      // console.log(query);
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/password-reset/request`,
        query
      );

      console.log(response);
      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const enterNewPassword = createAsyncThunk(
  'auth/enterNewPassword',
  async (query: enterNewPasswordPayload, { rejectWithValue }) => {
    try {
      console.log(query);
      const response = await axiosInstance.post(
        `${AUTH_URL}auth/password-reset`,
        query
      );

      console.log(`response: ${response}`);

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
