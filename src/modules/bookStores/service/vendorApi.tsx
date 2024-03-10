import { api } from '@src/modules/shared/services/api';

export const VendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    vendors: builder.query<any,  void>({
      query: () => `api/users/?role=vendor`
    }),
   
  })
});

export const {useVendorsQuery} = VendorApi

