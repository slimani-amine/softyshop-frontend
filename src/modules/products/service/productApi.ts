import { api } from '@src/modules/shared/services/api';
export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    pr:builder.query<any , {perPage : number , page:number ,name:string , role : string, storeId?:string }>({
      query: ({ perPage, page , name,role,storeId  }) => `api/${storeId ? `stores/${storeId}/` : ''}products?perPage=${perPage}&page=${page}${name ? `&name=${name}`:"" }`,
      providesTags:['products']

    }),
    allProducts :  builder.query<any,void>({
      query: () => `api/products`,
      providesTags:['products']
    }),
    products: builder.query<any, { perPage: number; page: number , name :string  }>({
      query: ({ perPage, page , name  }) => `api/products?perPage=${perPage}&page=${page}${name ? `&name=${name}`:"" }`,
      providesTags:['products']
    }),
    myProducts: builder.query<any,{id:any , perPage: number; page: number , name :string}>({
      query: ({id,perPage,page,name}) => ({
        url: `/api/stores/${id}/products?perPage=${perPage}&page=${page}${name ? `&name=${name}`:"" }`,
      
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
        url : `api/products`,
        method : 'DELETE',
        body : {"ids" :ids }
      }) ,
      invalidatesTags : ['products'],


    })
    
   
 

  })
});

export const {usePrQuery,useAllProductsQuery, useProductsQuery , useCreateProductMutation , useDeleteProductsMutation , useMyProductsQuery} = ProductsApi