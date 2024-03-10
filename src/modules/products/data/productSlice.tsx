


import Product  from './productType';
import { api } from '@src/modules/shared/services/api';

export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) => `api/products?perPage=${perPage}&page=${page}`,
      providesTags:['pro']
    }),
    category: builder.query<Product, number>({
      query: (id) => `api/admin/category/${id}`
    }),
    createCategory: builder.mutation<Product, Partial<Product>>({
        query: (newStore) => ({
          url: 'api/admin/category',
          method: 'POST',
          body: newStore,
        }),
        invalidatesTags:['pro']
      }),
  })
});

export const { useProductsQuery} = ProductsApi