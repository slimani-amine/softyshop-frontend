


import Product  from './productType';
import { api } from '@src/modules/shared/services/api';

export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) => `api/products?perPage=${perPage}&page=${page}`,
      providesTags:['pro']
    }),
 

  })
});

export const { useProductsQuery} = ProductsApi