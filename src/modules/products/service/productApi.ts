import { api } from '@src/modules/shared/services/api';
export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<any, { perPage: number; page: number }>({
      query: ({ perPage, page }) => `api/products?perPage=${perPage}&page=${page}`,
      providesTags:['products']
    }),
    myProducts: builder.query<any,{id:any , perPage: number; page: number}>({
      query: ({id,perPage,page}) => ({
        url: `/api/stores/${id}/products?perPage=${perPage}&page=${page}`,
      
      }),
      providesTags : ["products"]
    }),
    createProduct: builder.mutation<any,{id:number,newProduct:any}>({
      query: ({id,newProduct}) => ({
        url: `/api/stores/${id}/products`,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags : ["products"]
    }),
    deleteProducts: builder.mutation<any,string[]>({
      query:(ids)=>({
        url : `api/stores/products`,
        method : 'DELETE',
        body : {"ids" :ids }
      }) ,
      invalidatesTags : ['vendors'],


    })
    
   
 

  })
});

export const { useProductsQuery , useCreateProductMutation , useDeleteProductsMutation , useMyProductsQuery} = ProductsApi