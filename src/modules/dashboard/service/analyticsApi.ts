import { api } from "@src/modules/shared/services/api";

export const AnalyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    analytics: builder.query<any, { StartDate: any; EndDate: any }>({
      query: ({ StartDate, EndDate }) =>
        `api/stores/stats?startDate=${StartDate}&endDate=${EndDate}`,
    }),


})});

export const {
  useAnalyticsQuery,

} = AnalyticsApi;
