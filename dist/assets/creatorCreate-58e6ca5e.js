import{j as e,B as i}from"./index-ce0732d8.js";import{d as l}from"./creatorApi-f7012340.js";import{F as s,R as m,C as d}from"./index-f4e2f6ff.js";import{I as u}from"./index-64ee1e3e.js";import{m as o}from"./index-71424fc7.js";const g=()=>{const[r]=s.useForm(),[c]=l(),n=async()=>{try{const t={...await r.validateFields()};await c({name:t.name,icon:"hhhhh",isPublished:t.isPublished==="on"}),r.resetFields(),o.success("Creator saved successfully")}catch(a){console.error("Error saving category",a),o.error("Error saving category")}};return e.jsxs("div",{className:"add-new-Product",children:[e.jsx("h1",{className:"title",children:"Add New Creator"}),e.jsx("div",{className:"container-add-Product",children:e.jsxs(s,{form:r,children:[e.jsx(m,{gutter:[16,0],className:"name-Product",children:e.jsx(d,{span:22,children:e.jsx(s.Item,{name:"name",style:{marginBottom:0},rules:[{required:!0,message:"Please enter Category name"}],children:e.jsx(u,{size:"large",placeholder:"Name",className:"input-custom"})})})}),e.jsx(s.Item,{children:e.jsx(i,{type:"submit",className:"add-cat",onClick:n,children:"Save Creator"})})]})})]})};export{g as default};
