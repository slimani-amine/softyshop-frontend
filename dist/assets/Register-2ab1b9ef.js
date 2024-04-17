import{u as h,a as b,b as w,r as y,c as f,_ as o,j as e,B as g,L as q,P as N}from"./index-043bdbd9.js";import{u as x,c as v,a as r,b as j,g as P,I as t}from"./getChangedValuesFormik-c9db298f.js";const l={firstName:"",lastName:"",email:"",password:"",verifyPassword:"",phoneNumber:null,role:""},A=()=>{const d=h(),m=b(),{role:u}=w(s=>s.role),[c,n]=y.useState(!1),a=x({initialValues:l,validationSchema:v().shape({firstName:r().required("First name is required"),lastName:r().required("Last name is required"),phoneNumber:r().required("Phone number is required").matches(/^([9527]\d{7})$/g,"Invalid phone number"),email:r().email("Invalid email address").matches(/^([a-zA-Z0-9._%+-]+)@((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,"Invalid email address").test("no-special-chars","Email contains disallowed characters",s=>!s||/^[^<>()\\/[\]{}\s]+@[^\s]+$/.test(s)).required("Email is required"),password:r().required("Password is required").matches(/^(?=.*\S).{8,}$/,"Password must be 8 characters long at least."),verifyPassword:r().required("Confirm password is required").oneOf([j("password")],"Passwords must match")}),onSubmit:s=>{n(!0),s.role=u;const p=P(s,l);m(f(p)).unwrap().then(()=>{o.success("Account created successfully"),d("/home")}).catch(i=>{o.error((i==null?void 0:i.message)||"something-went-wrong")}).finally(()=>{n(!1)})}});return e.jsx("div",{className:"register-module",children:e.jsxs("form",{className:"register-card-container",onSubmit:a.handleSubmit,children:[e.jsx("h1",{className:"title",children:"Sign Up"}),e.jsx(t,{name:"firstName",formik:a,variant:"secondary",placeholder:"Enter your firstname",label:"First Name",required:!0}),e.jsx(t,{name:"lastName",formik:a,variant:"secondary",placeholder:"Enter your lastname",label:"Last Name",required:!0}),e.jsx(t,{name:"phoneNumber",formik:a,variant:"secondary",placeholder:"Enter phone number",label:"Phone Number",required:!0}),e.jsx(t,{name:"email",formik:a,variant:"secondary",placeholder:"Enter your email",label:"Email",type:"email",required:!0}),e.jsx(t,{name:"password",formik:a,variant:"secondary",placeholder:"Enter your password",label:"Password",type:"password",required:!0}),e.jsx(t,{name:"verifyPassword",formik:a,variant:"secondary",placeholder:"Enter your confirm password",label:"Confirm Password",type:"password",required:!0}),e.jsx(g,{label:"Sign Up",type:"submit",loading:c}),e.jsx(q,{to:N.LOGIN,className:"link",children:"Already a member?"})]})})};export{A as default};
