import { url } from 'inspector';
import Category  from './type';
import { api } from '@src/modules/shared/services/api';

export const CategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<any,  { perPage: number; page: number }>({
      query: ({perPage,page}) => `api/admin/category?perPage=${perPage}&page=${page}`,
      providesTags:  ['Categories']
   

  }),
   
    category: builder.query<Category, number>({
      query: (id:any) => `api/admin/category/${id}`
    }),
    createCategory: builder.mutation<Category, any>({
        query: (newStore) => ({
          url: 'api/admin/category',
          method: 'POST',
          body: newStore,
          
        }),
        invalidatesTags : ['Categories'],
      
    
    
        
      }),
    deleteCategory: builder.mutation<any,Number>({
      query:(id)=>({
        url : `api/admin/category/${id}`,
        method : 'DELETE'
      }) ,
      invalidatesTags : ['Categories'],


    })
  ,
    UpdateCatgory : builder.mutation<Category ,{ id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `api/admin/category/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Categories']}),
    
    searchCategories: builder.query<any,string>({
      query: (subName) => `api/admin/category?perPage=4&page:1&search=name:${subName}`,
      providesTags:  ['Categories']

    })
  })
});

export const {useUpdateCatgoryMutation, useCreateCategoryMutation,useSearchCategoriesQuery ,  useCategoryQuery , useCategoriesQuery , useDeleteCategoryMutation} = CategoryApi