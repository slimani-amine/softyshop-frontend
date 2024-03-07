import Category  from './type';
import { api } from '@src/modules/shared/services/api';

export const CategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<any,  void>({
      query: () => `api/admin/category`
    }),
    category: builder.query<Category, number>({
      query: (id) => `api/admin/category/${id}`
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
        query: (newStore) => ({
          url: 'api/admin/category',
          method: 'POST',
          body: newStore,
        }),
      }),
  })
});

export const {useCreateCategoryMutation, useCategoryQuery , useCategoriesQuery} = CategoryApi