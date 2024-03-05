/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';
import { LoginPayload, RegisterPayload } from './authTypes';
import { clearTokens, setTokens } from '../utils/token';
// const BASE_URL = 'http://192.168.3.27:3000/v1/';
const BASE_URL = 'https://2975-196-203-25-82.ngrok-free.app/v1/';
export const login = createAsyncThunk(
  'auth/login',
  async (query: LoginPayload, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post(`/api/auth/login`, query);
      const response = await axiosInstance.post(`${BASE_URL}auth/login`, query);
      if (response.status === 200) {
        // console.log(response.data);
        const accessToken = response.data.data.accessToken;
        setTokens(accessToken);
        return response.data;
      }
      // console.log(response);

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (query: RegisterPayload, { rejectWithValue }) => {
    // console.log(query);

    try {
      // const response = await axiosInstance.post(`/api/auth/register`, query);
      const response = await axiosInstance.post(
        `${BASE_URL}auth/register`,
        query
      );

      if (response.status === 201) {
        const accessToken = response.data.data.accessToken;
        setTokens(accessToken);
        // console.log(response.data);
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
      const response = await axiosInstance.get(`${BASE_URL}auth/logout`);

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        clearTokens();
        return response.data;
      }

      throw new Error(response.statusText);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
