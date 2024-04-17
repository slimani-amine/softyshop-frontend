import{r as n,u as P,j as a,B as u,q as I,C as R,S as z}from"./index-043bdbd9.js";import{S as E,T as _}from"./SearchFilter-57a7ec44.js";import{a as B,b as M,c as D}from"./vendorApi-0bac3c3e.js";import{l as G}from"./lodash-2c2e27e5.js";import"./CheckOutlined-95f96f6c.js";import"./index-08eb27d4.js";import"./index-10f1215d.js";console.log(I);function K(){const[c,p]=n.useState(1),[d,j]=n.useState(5),[r,C]=n.useState([]),[i,S]=n.useState(""),[h,m]=n.useState([]),{data:o}=B(i),[N]=M(),{data:t}=D({perPage:d,page:c});console.log(t),console.log(h);const k=(e,s)=>{p(e),j(s||5)};n.useEffect(()=>{var e,s;i&&o?m((e=o==null?void 0:o.data)==null?void 0:e.docs):t&&m((s=t==null?void 0:t.data)==null?void 0:s.docs)},[i,t,o]);const y=G.debounce(e=>{console.log("Search text for category list:",e),S(e)},500),g=P(),v=e=>{g(`/vendors/edit/${e}`)},b=async()=>{await N(r)},f=()=>{g("/vendors/create")},V=(e,s)=>{const l=e.target.checked;console.log(r),C(x=>l?[...x,s]:x.filter(L=>L!==s))},w={dataSource:h,columns:[{title:"Select",dataIndex:"id",render:(e,s)=>a.jsx(R,{checked:r.includes(s.id),onChange:l=>V(l,s.id)})},{title:"picture",dataIndex:"picture",render:e=>a.jsx("img",{className:"img-cteagory",src:e,alt:""}),key:"picture"},{title:"fist name",className:"name",dataIndex:"firstName",render:e=>a.jsx("span",{className:"Category-name",children:e}),key:"name"},{title:"last name",className:"name",dataIndex:"lastName",render:e=>a.jsx("span",{className:"Category-name",children:e}),key:"name"},{title:"Email",dataIndex:"email",sorter:(e,s)=>e.email.localeCompare(s.email),render:e=>a.jsxs("p",{children:[" ",e]}),key:"email"},{title:"Phone",dataIndex:"phoneNumber",sorter:(e,s)=>e.phoneNumber.localeCompare(s.phoneNumber),render:e=>a.jsxs("p",{children:[" ",e]}),key:"email"},{title:"Action",key:"action",className:"action-category",render:e=>a.jsx(z,{children:a.jsx("div",{className:"icon-action",onClick:()=>v(e==null?void 0:e.id),children:a.jsxs("svg",{fill:"#7D879C",width:"16px",height:"16px",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",stroke:"",children:[a.jsx("g",{id:"SVGRepo_bgCarrier","stroke-width":"0"}),a.jsx("g",{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round"}),a.jsxs("g",{id:"SVGRepo_iconCarrier",children:[" ",a.jsxs("g",{children:[" ",a.jsxs("g",{children:[" ",a.jsx("path",{d:"M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"})," "]})," "]})," ",a.jsxs("g",{children:[" ",a.jsxs("g",{children:[" ",a.jsx("path",{d:"M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"})," "]})," "]})," "]})]})})})}],headerStyle:{backgroundColor:"lightblue"},header:{style:{borderRadius:"px"}},pagination:{total:10,current:c,pageSize:d,onChange:k}};return a.jsxs("div",{className:"Product-List",children:[a.jsx("h1",{children:"Vendor List"}),a.jsxs("div",{className:"header-Product-list",children:[a.jsx(E,{placeholder:"Search Vendor..",onSearchChange:y}),a.jsxs(u,{className:"add-cat",onClick:f,children:[" ",a.jsx("span",{children:"+"})," Add Vendor"]})]}),a.jsxs("div",{className:"container-Product-List",children:[a.jsx("div",{className:"container-btn",children:a.jsx(u,{size:"sm",disabled:r.length===0,variant:r.length===0?"dark":"primary",onClick:b,children:"deleted"})}),a.jsx(_,{...w})]})]})}export{K as default};
