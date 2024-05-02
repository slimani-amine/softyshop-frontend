import Brand  from './type';
import { api } from '@src/modules/shared/services/api';

export const BrandApi = api.injectEndpoints({
  endpoints: (builder) => ({
    brands: builder.query<any,  { perPage: number; page: number }>({
      query: ({perPage,page}) => `api/brands?perPage=${perPage}&page=${page}`,
      providesTags:  ['brands']
      }),

    allBrands : builder.query<any,  void>({
      query: () => `api/brands`,
      providesTags:  ['brands']
      }),


   
    brand: builder.query<any, any>({
      query: (id) => `api/brands?search=id:${id}`,
      providesTags : ['brand']
    }),
    createBrand: builder.mutation<Brand, any>({
        query: (newBrand) => ({
          url: 'api/brands',
          method: 'POST',
          body: newBrand,
          
        }),
        invalidatesTags: ['brands'],
      
    
    
        
      }),
      
      deleteBrands: builder.mutation<any,string[]>({
        query:(ids)=>({
          url : `api/brands`,
          method : 'DELETE',
          body : {"ids" :ids }
        }) ,
        invalidatesTags : ['brands'],
  
  
      }),

  
    UpdateBrand : builder.mutation<Brand ,{ id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `api/brands/${id}`,
        method: 'PATCH',
        body: data
        
      }),
      invalidatesTags: ['brands' , 'brand']}),
    
    searchBrands: builder.query<any,string>({
      query: (subName) => `api/brands${subName? `?search=name:${subName}`: ""}`,
      providesTags:  ['brands'] }) })
});
export const {useAllBrandsQuery,useBrandQuery,useBrandsQuery,useCreateBrandMutation,useDeleteBrandsMutation,useSearchBrandsQuery,useUpdateBrandMutation} = BrandApi