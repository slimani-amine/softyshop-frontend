import { url } from 'inspector';
import Category  from './type';
import { api } from '@src/modules/shared/services/api';

export const CategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<any,  { perPage: number; page: number }>({
      query: ({perPage,page}) => `api/admin/categories?perPage=${perPage}&page=${page}`,
      providesTags:  ['Categories']
   

  }),
   
    category: builder.query<any, any>({
      query: (id) => `api/admin/categories?search=id:${id}`,
      providesTags : ['category']
    }),
    createCategory: builder.mutation<Category, any>({
        query: (newStore) => ({
          url: 'api/admin/categories',
          method: 'POST',
          body: newStore,
          
        }),
        invalidatesTags: ['Categories'],
      
    
    
        
      }),
    deleteCategory: builder.mutation<any,Number>({
      query:(id)=>({
        url : `api/admin/categories/${id}`,
        method : 'DELETE'
      }) ,
      invalidatesTags : ['Categories'],


    })
  ,
    UpdateCatgory : builder.mutation<Category ,{ id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/admin/categories/${id}`,
        method: 'PATCH',
        body: data
        
      }),
      invalidatesTags: ['Categories' , 'category']}),
    
    searchCategories: builder.query<any,string>({
      query: (subName) => `api/admin/categories?perPage=4&page:1&search=name:${subName}`,
      providesTags:  ['Categories']

    })
  })
});

export const {useUpdateCatgoryMutation, useCreateCategoryMutation,useSearchCategoriesQuery ,  useCategoryQuery , useCategoriesQuery , useDeleteCategoryMutation} = CategoryApi