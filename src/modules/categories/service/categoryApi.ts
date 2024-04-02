import Category  from './type';
import { api } from '@src/modules/shared/services/api';

export const CategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<any,  { perPage: number; page: number }>({
      query: ({perPage,page}) => `api/admin/categories?perPage=${perPage}&page=${page}`,
      providesTags:  ['Categories']
      }),

    allCategories : builder.query<any,  void>({
      query: () => `api/admin/categories`,
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
      
      deleteCategories: builder.mutation<any,string[]>({
        query:(ids)=>({
          url : `api/admin/categories`,
          method : 'DELETE',
          body : {"ids" :ids }
        }) ,
        invalidatesTags : ['Categories'],
  
  
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
      query: (subName) => `api/admin/categories?search=name:${subName}`,
      providesTags:  ['Categories']

    })
  })
});

export const {useAllCategoriesQuery,useUpdateCatgoryMutation,useDeleteCategoriesMutation, useCreateCategoryMutation,useSearchCategoriesQuery ,  useCategoryQuery , useCategoriesQuery , useDeleteCategoryMutation} = CategoryApi