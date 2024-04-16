import{t as e}from"./index-ce0732d8.js";const n=e.injectEndpoints({endpoints:s=>({brands:s.query({query:({perPage:a,page:r})=>`api/brands?perPage=${a}&page=${r}`,providesTags:["brands"]}),allBrands:s.query({query:()=>"api/brands",providesTags:["brands"]}),brand:s.query({query:a=>`api/brands?search=id:${a}`,providesTags:["category"]}),createBrand:s.mutation({query:a=>({url:"api/brands",method:"POST",body:a}),invalidatesTags:["brands"]}),deleteBrands:s.mutation({query:a=>({url:"api/brands",method:"DELETE",body:{ids:a}}),invalidatesTags:["brands"]}),UpdateBrand:s.mutation({query:({id:a,data:r})=>({url:`api/brands/${a}`,method:"PATCH",body:r}),invalidatesTags:["brands","brand"]}),searchBrands:s.query({query:a=>`api/brands?search=name:${a}`,providesTags:["brands"]})})}),{useAllBrandsQuery:t,useBrandQuery:u,useBrandsQuery:i,useCreateBrandMutation:o,useDeleteBrandsMutation:p,useSearchBrandsQuery:y,useUpdateBrandMutation:b}=n;export{o as a,i as b,p as c,y as d,b as e,u as f,t as u};
