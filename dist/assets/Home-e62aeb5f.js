import{j as s,L as j,r as o,v as i}from"./index-043bdbd9.js";function p({id:e,name:n,logo:c}){return s.jsx("div",{className:"card",children:s.jsxs(j,{to:`${e}`,children:[s.jsx("div",{className:"image-wrapper",children:s.jsx("img",{width:336.75,height:336.75,src:c,className:"image"})}),s.jsx("div",{className:"product-info-and-buttons",children:s.jsxs("div",{className:"store-info",children:[s.jsxs("p",{className:"name",children:[" ",n]}),s.jsx("div",{className:"contacts"})]})})]})})}function u(){const[e,n]=o.useState([]);return o.useEffect(()=>{(async()=>{var r;try{const t=await(await fetch(`${i}api/stores`)).json();n((r=t==null?void 0:t.data)==null?void 0:r.docs)}catch(a){return console.log(a),a}})()},[i]),s.jsx("div",{className:"home",children:e==null?void 0:e.map(({name:c,logo:r,phoneNumber:a,address:t,id:d,isPublished:l,location:m,socialMediaLinks:h},x)=>s.jsx(p,{id:d,name:c,address:t,phoneNumber:a,logo:r,isPublished:l,location:m,socialMediaLinks:h},x))})}export{u as default};
