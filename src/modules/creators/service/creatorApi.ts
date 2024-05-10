import { api } from "@src/modules/shared/services/api";

export const CreatorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    creators: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) =>
        `api/productCreators?perPage=${perPage}&page=${page}`,
      providesTags: ["creators"],
    }),

    allCreators: builder.query<any, void>({
      query: () => `api/productCreators`,
      providesTags: ["creators"],
    }),
    creator: builder.query<any, any>({
      query: (id) => `api/productCreators/${id}`,
      providesTags: ["creators"],
    }),
    createCreator: builder.mutation<any, any>({
      query: (newStore) => ({
        url: "api/productCreators",
        method: "POST",
        body: newStore,
      }),
      invalidatesTags: ["creators"],
    }),

    deleteCreators: builder.mutation<any, string[]>({
      query: (ids) => ({
        url: `api/productCreators`,
        method: "DELETE",
        body: { ids: ids },
      }),
      invalidatesTags: ["creators"],
    }),
    deleteCreator: builder.mutation<any, Number>({
      query: (id) => ({
        url: `api/productCreators/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["creators"],
    }),
    UpdateCreator: builder.mutation<any, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/productCreators/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["creators", "creator"],
    }),

    searchCreator: builder.query<any, string>({
      query: (subName) => `api/productCreators?search=name:${subName}`,
      providesTags: ["creators"],
    }),
  }),
});

export const {
  useCreatorsQuery,
  useAllCreatorsQuery,
  useSearchCreatorQuery,
  useUpdateCreatorMutation,
  useDeleteCreatorMutation,
  useDeleteCreatorsMutation,
  useCreateCreatorMutation,
  useCreatorQuery,
} = CreatorApi;
