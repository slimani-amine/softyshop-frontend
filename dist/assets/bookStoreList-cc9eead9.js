import{r as a,b as C,z as V,A as B,D as G,o as Q,u as T,E as U,j as s,B as f,C as O,S as F}from"./index-98278e05.js";import{S as J,T as $}from"./SearchFilter-75d7f821.js";import{l as q}from"./lodash-90dc89f9.js";import{M as H}from"./index-77557c4c.js";import{m as g}from"./index-f74f6955.js";import{S as K}from"./index-888f1c5a.js";import"./CheckOutlined-17eda048.js";import"./index-9d1b7eeb.js";import"./index-f00ae2eb.js";function ie(){const[c,y]=a.useState(1),[d,v]=a.useState(20),[o,N]=a.useState([]),[h,P]=a.useState(""),[m,x]=a.useState([]),p=C(e=>{var t;return(t=e.auth.user)==null?void 0:t.role.toLocaleUpperCase()}),S=C(e=>{var t;return(t=e.auth.user)==null?void 0:t.id});console.log(S);const{data:u}=V({subName:h,role:p||"ADMIN",id:S||""}),j=(e,t)=>{y(e),v(t||5),console.log(m)};let r;const[w]=B(),n=p==="ADMIN";if(console.log(n,"verification role "),n){console.log("oke");const{data:e,isLoading:t}=G({page:c,perPage:d});r=e}else{console.log("object");const{data:e,isLoading:t}=Q();r=e}a.useEffect(()=>{var e,t;x(h&&u?(e=u.data)==null?void 0:e.docs:((t=r==null?void 0:r.data)==null?void 0:t.docs)||[])},[h,u,c,d]);const L=q.debounce(e=>{console.log("Search text for category mlist:",e),P(e)},500),b=T(),M=e=>{b(`/stores/edit/${e}`)},D=()=>{b("/stores/create")},[_]=U(),[z,I]=a.useState(!1),k=async()=>{try{const e=await _(o).unwrap();"data"in e?(g.success("Store deleted successfully!"),console.log(e.data)):"error"in e?(g.error("Failed to Delete Store. Please try again."),console.error("Error saving product",e.error)):g.error("Unexpected response from server. Please try again later.")}catch{}},A=(e,t)=>{const i=e.target.checked;console.log(o),N(l=>i?[...l,t]:l.filter(E=>E!==t))},R={dataSource:m,columns:[{title:"Select",dataIndex:"id",render:(e,t)=>s.jsx(O,{checked:o.includes(t.id),onChange:i=>A(i,t.id)})},{title:"Name",dataIndex:"name",key:"name",render:(e,t)=>s.jsxs("div",{className:"name-column",children:[s.jsx("div",{className:"picture-Product",children:s.jsx("img",{height:"30px",width:"30px",src:t.logo,alt:""})}),s.jsxs("div",{className:"data-name",children:[s.jsx("h3",{children:t.name}),s.jsx("span",{children:t.id})]})]}),sorter:(e,t)=>e.name.localeCompare(t.name)},{title:"Links",dataIndex:"socialMediaLinks",key:"links",render:e=>{const t=JSON.parse(e.replace(/'/g,'"'));return s.jsx("div",{className:"links-column",children:t.map((i,l)=>s.jsx("p",{children:i},l))})}},{title:"Position",dataIndex:"address",key:"position",render:e=>s.jsx("div",{className:"position-column",children:e})},{title:"Published",dataIndex:"published",key:"published",sorter:(e,t)=>(e.isPublished?1:0)-(t.isPublished?1:0),render:(e,t)=>s.jsx(K,{checked:t.isPublished,onClick:()=>{n&&w({id:t.id,isPublished:!t.isPublished})},disabled:!n})},{title:"Action",key:"action",className:"action-category",render:e=>s.jsx(F,{children:s.jsx("div",{className:"icon-action",onClick:()=>M(e==null?void 0:e.id),children:s.jsxs("svg",{fill:"#7D879C",width:"16px",height:"16px",version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",stroke:"",children:[s.jsx("g",{id:"SVGRepo_bgCarrier","stroke-width":"0"}),s.jsx("g",{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round"}),s.jsxs("g",{id:"SVGRepo_iconCarrier",children:[" ",s.jsxs("g",{children:[" ",s.jsxs("g",{children:[" ",s.jsx("path",{d:"M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"})," "]})," "]})," ",s.jsxs("g",{children:[" ",s.jsxs("g",{children:[" ",s.jsx("path",{d:"M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"})," "]})," "]})," "]})]})})})}],headerStyle:{backgroundColor:"lightblue"},pagination:{total:7,current:c,pageSize:d,onChange:j,onShowSizeChange:j},header:{style:{borderRadius:"px"}}};return s.jsxs("div",{className:"Product-List",children:[s.jsx("h1",{children:"Stores List"}),s.jsxs("div",{className:"header-Product-list",children:[s.jsx(J,{placeholder:"Search Store ...",onSearchChange:L}),s.jsxs(f,{className:"add-cat",onClick:D,children:[s.jsx("span",{children:"+"})," Add Store"]})]}),s.jsxs("div",{className:"container-Product-List",children:[s.jsx("div",{className:"container-btn",children:s.jsx(f,{size:"sm",disabled:o.length===0,variant:o.length===0?"dark":"primary",onClick:k,children:"deleted"})}),s.jsx($,{...R})]}),s.jsx(H,{title:"Confirm Deletion",visible:z,onOk:()=>k(),onCancel:()=>I(!1),okText:"Delete",cancelText:"Cancel",children:s.jsx("p",{children:"Are you sure you want to delete this category?"})})]})}export{ie as default};
