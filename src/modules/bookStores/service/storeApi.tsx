import Store from './storeType';
import { api } from '@src/modules/shared/services/api';

export const StoreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    stores: builder.query<Store[],  { page: Number, perPage: Number }>({
      query: ({ page, perPage }) => `api/store?page=${page}&perPage=${perPage}`
    }),
    store: builder.query<Store, number>({
      query: (id) => `api/store/${id}`
    }),
    createStore: builder.mutation<Store, Partial<Store>>({
        query: (newStore) => ({
          url: 'api/store',
          method: 'POST',
          body: newStore,
        }),
      }),
  })
});

export const {useCreateStoreMutation, useStoreQuery , useStoresQuery} = StoreApi

