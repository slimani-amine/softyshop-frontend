import Store from './storeType';
import { api } from '@src/modules/shared/services/api';

export const StoreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    storess: builder.query<any, { page: number, perPage: number, id: any, role: string, subName?: string }>({
      query: ({ page, perPage, role, id, subName }) => {
        if (role === "VENDOR") {
          // If role is VENDOR, search by vendor_id and optional subName
          return `api/stores?page=${page}&perPage=${perPage}&vendor_id=${id}&${subName ? `name=${subName}` : ""}`;
        } else {
          // If role is not VENDOR, search by name only
          return `api/stores?page=${page}&perPage=${perPage}&${subName ? `name=${subName}` : ""}`;
        }
      },
      providesTags: ['stores']
    }),
    stores: builder.query<any,  { page: Number, perPage: Number,id : any,role:string }>({
      query: ({ page, perPage , role , id }) => `api/stores?page=${page}&perPage=${perPage}&${role==="VENDOR" ? `?vendor_id=${id} ;`:""}`,
      providesTags : ['stores']
    }),
    allStores : builder.query<any,void>({
      query : ()=>`api/stores`,
      providesTags:["stores"]

    })
    ,

    myStores: builder.query<any, void>({
      query: () => `api/stores/my-stores`,
      providesTags:["stores"]
    }),

    store: builder.query<any, any>({
      query: (id) => `api/stores/${id}`,
      providesTags : ['stores']
    }),

    createStore: builder.mutation<Store, Partial<Store>>({
        query: (newStore) => ({
          url: 'api/stores',
          method: 'POST',
          body: newStore,
        }),
        invalidatesTags : ["stores"]
      }),
    UpdateStore : builder.mutation<Store,{ id: any; data: any }>({
        query: ({ id, data }) => ({
          url: `api/stores/${id}`,
          method: 'PATCH',
          body: data
          
        }),
        invalidatesTags: ['stores' , 'store']}),
    

    deleteStore: builder.mutation<any,Number>({
        query:(id)=>({
           url : `api/stores/${id}`,
          method : 'DELETE'
          }) ,
          invalidatesTags : ['stores'], 
        }) ,
    deleteStores: builder.mutation<any,string[]>({
          query:(ids)=>({
            url : `api/stores`,
            method : 'DELETE',
            body : {"ids" :ids }
          }) ,
          invalidatesTags : ['stores'],
    
    
        }),
    publishStore: builder.mutation<any, { id: any; isPublished: boolean }>({
        query: ({ id, isPublished }) => ({
          url: `api/stores/${id}/publish`,
          method: 'PATCH',
          body: { isPublished }
        }),
          invalidatesTags: ['stores'] // Invalidates the store tag after publishing/unpublishing
        }),
    searchStores: builder.query<any,{subName : string , role:string  , id : string}>({
          query: ({subName,role,id}) => `api/stores?search=name:${subName}${role==="VENDOR" ? `;vendor_id:${id};`:""}`,
          providesTags:  ['Categories']
    
        })
    
  
  })
});

export const {useStoressQuery,useMyStoresQuery,useAllStoresQuery,useCreateStoreMutation,useDeleteStoresMutation, useStoreQuery ,useSearchStoresQuery, useStoresQuery , useUpdateStoreMutation ,usePublishStoreMutation ,  useDeleteStoreMutation} = StoreApi

