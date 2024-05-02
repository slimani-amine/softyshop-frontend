import { api } from '@src/modules/shared/services/api';
export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allProducts :  builder.query<any,void>({
      query: () => `api/products`,
      providesTags:['products']
    }),

    pr:builder.query<any , {perPage : number , page:number ,name:string , role : string, storeId?:string , vendorId?:string }>({
      query: ({ perPage, page, name, role, storeId, vendorId }) => {
        let url = "api/";
        if (role === "VENDOR" || storeId) {
            url += "stores/";
            if (role === "VENDOR") {
                url += `${vendorId}/`;
            }
        }
        if (storeId) {
            url += `${storeId}/`;
        }
        url += `products?perPage=${perPage}&page=${page}`;
        if (name) {
            url += `&name=${name}`;
        }
       return url;
    }   , 
     providesTags:['products']

    }),
    product: builder.query<any, any>({
      query: (id) => `api/products/${id}`,
      providesTags : ['product']
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


    }),
    publishProduct : builder.mutation<any ,{ id: any;}>({
      query: ({ id}) => ({
        url: `api/products/${id}/publish`,
        method: 'PATCH',
        
      }),
      invalidatesTags: ['products']}),
      UpdateProduct : builder.mutation<any ,{ id: any, body:any}>({
        query: ({ id,body}) => ({
          url: `api/products/${id}`,
          method: 'PATCH',
          body:body
          
        }),
        invalidatesTags: ['products' , 'product']}),
    

    
   
 

  })
});

export const {useUpdateProductMutation,useProductQuery,useAllProductsQuery,usePrQuery , useCreateProductMutation , useDeleteProductsMutation , usePublishProductMutation } = ProductsApi