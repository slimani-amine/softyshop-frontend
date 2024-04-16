import { api } from '@src/modules/shared/services/api';
import Vendor from './type';
export const VendorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) => `api/users?perPage=${perPage}&page=${page}`,
    }),

    vendors: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) =>
        `api/users?perPage=${perPage}&page=${page}&search=role:vendor`,
      providesTags: ['vendors'],
    }),
    vendor: builder.query<any, any>({
      query: (id) => `api/users?search=id:${id}`,
      providesTags: ['vendor'],
    }),
    SearchVendors: builder.query<any, string>({
      query: (name) => `api/users?search=firstName:${name};role:vendor`,
      providesTags: ['vendor'],
    }),
    createVendor: builder.mutation<any, any>({
      query: (newStore) => ({
        url: 'auth/register',
        method: 'POST',
        body: newStore,
      }),
      invalidatesTags: ['vendors'],
    }),
    deleteVendor: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: `api/users`,
        method: 'DELETE',
        body: { ids: ids },
      }),
      invalidatesTags: ['vendors'],
    }),
    UpdateVendor: builder.mutation<Vendor, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/users/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['vendors', 'vendor'],
    }),
    allvendors: builder.query<any, void>({
      query: () => `api/users?search=role:vendor`,
      providesTags: ['vendors'],
    }),
  }),
});

export const {
  useUsersQuery,
  useAllvendorsQuery,
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useVendorQuery,
  useVendorsQuery,
  useSearchVendorsQuery,
  useUpdateVendorMutation,
} = VendorsApi;
