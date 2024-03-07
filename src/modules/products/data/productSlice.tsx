


import Product  from './productType';
import { api } from '@src/modules/shared/services/api';

export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<Product[], void>({
      query: () => `api/products?page=2&perPage=1`
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
      }),
  })
});

export const { useProductsQuery} = ProductsApi