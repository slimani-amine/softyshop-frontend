import { api } from "@src/modules/shared/services/api";

export const OrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query<
      any,
      { perPage: number; page: number; role: string | undefined }
    >({
      query: ({ perPage, page, role }) => {
        let url;
        if (role === "VENDOR") {
          url = `/api/admin/vendorOrders?perPage=${perPage}&page=${page}`;
        } else {
          url = `/api/admin/orders?perPage=${perPage}&page=${page}`;
        }
        return url;
      },
      providesTags: ["orders"],
    }),

    allPayments: builder.query<any, void>({
      query: () => `api/admin/payment-methods`,
      providesTags: ["creators"],
    }),

    payment: builder.query<any, any>({
      query: (id: string) => `api/admin/payment-methods/${id}`,
      providesTags: ["creators"],
    }),
    createOrder: builder.mutation<any, any>({
      query: (payload) => ({
        url: "api/shopping/createOrderForAdmin",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),

    deleteOrders: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: `api/admin/orders`,
        method: "DELETE",
        body: { ids: ids },
      }),
      invalidatesTags: ["orders"],
    }),

    UpdatePayment: builder.mutation<any, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/admin/payment-methods/${id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["creators", "creator"],
    }),

    searchOrders: builder.query<any,{ subName: string; role: string | undefined }>({
      query: ({ subName, role }) => {
        let url = `/api/admin/vendorOrders`;  
        if (role === "ADMIN") {
          url = `/api/admin/orders?phoneNumber=${subName}`;
        }
        return url;
      },
      providesTags: ["creators"],
    }),
    paiedOrder: builder.mutation<any, { id: any }>({
      query: (id) => ({
        url: `api/shopping/my-cart/orders/${id.id.toString()}/payment`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),
    UpdateOrder: builder.mutation<any, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/shopping/my-cart/orders/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useOrdersQuery,
  useDeleteOrdersMutation,
  useSearchOrdersQuery,
  usePaiedOrderMutation,
} = OrderApi;
