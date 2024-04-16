import{r as o,j as e,B as c,C as p}from"./index-ce0732d8.js";import{e as j}from"./categoryApi-75cddf9d.js";import{U as C,h as y,D as i}from"./upload-6e73f607.js";import{F as s,R as N,C as f}from"./index-f4e2f6ff.js";import{I as v}from"./index-64ee1e3e.js";import{m as n}from"./index-71424fc7.js";import"./CheckOutlined-41626604.js";const D=()=>{const[d,m]=o.useState(null);console.log(d);const[t,u]=o.useState(),[r]=s.useForm(),[g]=j(),h=async()=>{try{console.log(t);const l={...await r.validateFields()},x=await g({name:l.name,icon:t,isPublished:l.isPublished==="on"});console.log(x),r.resetFields(),n.success("Category saved successfully")}catch(a){console.error("Error saving category",a),n.error("Error saving category")}};return e.jsxs("div",{className:"add-new-Product",children:[e.jsx("h1",{className:"title",children:"Add New Category"}),e.jsx("div",{className:"container-add-Product",children:e.jsxs(s,{form:r,children:[e.jsx(N,{gutter:[16,0],className:"name-Product",children:e.jsx(f,{span:22,children:e.jsx(s.Item,{name:"name",style:{marginBottom:0},rules:[{required:!0,message:"Please enter Category name"}],children:e.jsx(v,{size:"large",placeholder:"Name",className:"input-custom"})})})}),e.jsx(s.Item,{className:"upload-images",name:"images",rules:[{required:!0,message:"Picture of Category!"}],children:e.jsxs(C.Dragger,{className:"drag-images",listType:"picture",accept:"image/*",maxCount:1,onChange:a=>y(a,m,u),beforeUpload:()=>!1,children:[e.jsx("p",{className:"ant-upload-text",children:"Drag & drop Category image here"}),e.jsxs("div",{className:"icon-drag",children:[e.jsx(i,{className:"divider"}),e.jsx("p",{className:"or",children:"OR"}),e.jsx(i,{className:"divider"})]}),e.jsx(c,{className:"btn-select",children:"Select Files"}),e.jsx("p",{className:"size-img",children:"Upload 280*280 image"})]})}),e.jsx(s.Item,{name:"isPublished",children:e.jsxs("div",{className:"feutured",children:[e.jsx(p,{})," ",e.jsx("span",{children:"Publish category"})]})}),e.jsx(s.Item,{children:e.jsx(c,{type:"submit",className:"add-cat",onClick:h,children:"Save Category"})})]})})]})};export{D as default};
