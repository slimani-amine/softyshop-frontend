import Store from './storeType';
import { api } from '@src/modules/shared/services/api';

export const StoreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    stores: builder.query<any,  { page: Number, perPage: Number }>({
      query: ({ page, perPage }) => `api/stores?page=${page}&perPage=${perPage}`
    }),
    my_stores: builder.query<any, void>({
      query: () => `api/stores/my-stores`
    }),
    store: builder.query<Store, number>({
      query: (id) => `api/store/${id}`
    }),
    createStore: builder.mutation<Store, Partial<Store>>({
        query: (newStore) => ({
          url: 'api/stores',
          method: 'POST',
          body: newStore,
        }),
      }),
  })
});

export const {useCreateStoreMutation, useStoreQuery , useStoresQuery , useMy_storesQuery} = StoreApi

