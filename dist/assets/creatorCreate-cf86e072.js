import{u as d,j as e,B as m}from"./index-98278e05.js";import{d as u}from"./creatorApi-6d4ee242.js";import{F as r,R as h,C}from"./index-2f28a3c1.js";import{I as p}from"./index-f00ae2eb.js";import{m as s}from"./index-f74f6955.js";const N=()=>{const i=d(),[a]=r.useForm(),[c]=u(),l=async()=>{try{const n={...await a.validateFields()},t=await c({name:n.name,icon:"hhhhh",isPublished:n.isPublished==="on"});"data"in t?(s.success("Creator saved successfully!"),a.resetFields(),i("/creators")):"error"in t?(s.error("Failed to save Creator. Please try again."),console.error("Error saving Creator",t.error)):s.error("Unexpected response from server. Please try again later.")}catch(o){console.error("Error saving Creator",o),s.error("Error saving Creator")}};return e.jsxs("div",{className:"add-new-Product",children:[e.jsx("h1",{className:"title",children:"Add New Creator"}),e.jsx("div",{className:"container-add-Product",children:e.jsxs(r,{form:a,children:[e.jsx(h,{gutter:[16,0],className:"name-Product",children:e.jsx(C,{span:22,children:e.jsx(r.Item,{name:"name",style:{marginBottom:0},rules:[{required:!0,message:"Please enter Category name"}],children:e.jsx(p,{size:"large",placeholder:"Name",className:"input-custom"})})})}),e.jsx(r.Item,{children:e.jsx(m,{type:"submit",className:"add-cat",onClick:l,children:"Save Creator"})})]})})]})};export{N as default};
