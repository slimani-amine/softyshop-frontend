import { api } from "@src/modules/shared/services/api";

export const PaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    payments: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) =>
        `api/admin/payment-methods?perPage=${perPage}&page=${page}`,
      providesTags: ["creators"],
    }),
    allPayments: builder.query<any, void>({
      query: () => `api/admin/payment-methods`,
      providesTags: ["creators"],
    }),

    payment: builder.query<any, any>({
      query: (id) => `api/admin/payment-methods/${id}`,
      providesTags: ["creators"],
    }),
    createPayment: builder.mutation<any, any>({
      query: (newStore) => ({
        url: "api/admin/payment-methods",
        method: "POST",
        body: newStore,
      }),
      invalidatesTags: ["creators"],
    }),

    deletePayments: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: `api/admin/payment-methods`,
        method: "DELETE",
        body: { ids: ids },
      }),
      invalidatesTags: ["creators"],
    }),

    UpdatePayment: builder.mutation<any, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/admin/payment-methods/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["creators", "creator"],
    }),

    searchPayment: builder.query<any, string>({
      query: (subName) => `api/admin/payment-methods/?search=name:${subName}`,
      providesTags: ["creators"],
    }),
  }),
});

export const {
  useAllPaymentsQuery,
  useCreatePaymentMutation,
  useDeletePaymentsMutation,
  usePaymentQuery,
  usePaymentsQuery,
  useSearchPaymentQuery,
} = PaymentApi;
