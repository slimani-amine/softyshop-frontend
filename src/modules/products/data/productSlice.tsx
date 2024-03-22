import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Product from './productType';
export const ProductsApi = createApi({
  reducerPath: 'ProductsSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.3.27:3000/v1/' }),
  endpoints: (builder) => ({
    products: builder.query<Product[], void>({
      query: () => 'api/products',
    }),
    product: builder.query<Product, void>({
      query: (id) => `/products/${id}`,
    }),
  }),
});
export const { useProductsQuery, useProductQuery } = ProductsApi;
