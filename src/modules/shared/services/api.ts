import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react';
import axiosInstance from '@src/modules/auth/utils/axios';
import { setTokens } from '@src/modules/auth/utils/token';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  // Add headers here
  prepareHeaders: (headers) => {
    // You can add any headers you need here
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    console.log({ result });
    if (result.error) {
      if (result.error.status === 401) {
        try {
          const response = await axiosInstance.get('/auth/refresh');
          const { accessToken } = response.data.payload;
          setTokens(accessToken);

          const retryResult = await baseQuery(args, api, extraOptions);
          return retryResult;
        } catch (err) {
          window.location.replace('/');
          return result;
        }
      }
      retry.fail(result.error?.data);
    }

    return result;
  }
);

const baseQueryWithRetry = staggeredBaseQueryWithBailOut;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'Categories',
    'brands',
    'brand',
    'products',
    'creators',
    'creator',
    'category',
    'stores',
    'store',
    'vendors',
    'vendor',
    'address'
    
    
  ],
  endpoints: () => ({}),
});
