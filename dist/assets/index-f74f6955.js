import{r,a2 as L,K as M,H as _,I as k,J as ae,M as re,a6 as j,a9 as T,a4 as se,b9 as ie,F as ce,O as le,Q as ue,ae as B,R as fe,V,Z as de,ap as me,an as ge,aq as W}from"./index-98278e05.js";import{a as ve,C as pe}from"./index-f00ae2eb.js";var Ce={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};const ye=Ce;var xe=function(n,o){return r.createElement(L,M({},n,{ref:o,icon:ye}))};const he=r.forwardRef(xe);var be={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};const Ee=be;var $e=function(n,o){return r.createElement(L,M({},n,{ref:o,icon:Ee}))};const Oe=r.forwardRef($e);var Se={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};const Pe=Se;var Ne=function(n,o){return r.createElement(L,M({},n,{ref:o,icon:Pe}))};const Ie=r.forwardRef(Ne);var Re=r.forwardRef(function(e,n){var o=e.prefixCls,t=e.style,a=e.className,i=e.duration,f=i===void 0?4.5:i,x=e.eventKey,l=e.content,u=e.closable,g=e.closeIcon,m=g===void 0?"x":g,d=e.props,p=e.onClick,y=e.onNoticeClose,h=e.times,P=r.useState(!1),$=_(P,2),b=$[0],N=$[1],O=function(){y(x)},E=function(C){(C.key==="Enter"||C.code==="Enter"||C.keyCode===re.ENTER)&&O()};r.useEffect(function(){if(!b&&f>0){var s=setTimeout(function(){O()},f*1e3);return function(){clearTimeout(s)}}},[f,b,h]);var c="".concat(o,"-notice");return r.createElement("div",M({},d,{ref:n,className:k(c,a,ae({},"".concat(c,"-closable"),u)),style:t,onMouseEnter:function(){N(!0)},onMouseLeave:function(){N(!1)},onClick:p}),r.createElement("div",{className:"".concat(c,"-content")},l),u&&r.createElement("a",{tabIndex:0,className:"".concat(c,"-close"),onKeyDown:E,onClick:function(C){C.preventDefault(),C.stopPropagation(),O()}},m))});const X=Re;var we=r.forwardRef(function(e,n){var o=e.prefixCls,t=o===void 0?"rc-notification":o,a=e.container,i=e.motion,f=e.maxCount,x=e.className,l=e.style,u=e.onAllRemoved,g=r.useState([]),m=_(g,2),d=m[0],p=m[1],y=function(s){var C,v=d.find(function(S){return S.key===s});v==null||(C=v.onClose)===null||C===void 0||C.call(v),p(function(S){return S.filter(function(w){return w.key!==s})})};r.useImperativeHandle(n,function(){return{open:function(s){p(function(C){var v=j(C),S=v.findIndex(function(H){return H.key===s.key}),w=T({},s);if(S>=0){var R;w.times=(((R=C[S])===null||R===void 0?void 0:R.times)||0)+1,v[S]=w}else w.times=0,v.push(w);return f>0&&v.length>f&&(v=v.slice(-f)),v})},close:function(s){y(s)},destroy:function(){p([])}}});var h=r.useState({}),P=_(h,2),$=P[0],b=P[1];r.useEffect(function(){var c={};d.forEach(function(s){var C=s.placement,v=C===void 0?"topRight":C;v&&(c[v]=c[v]||[],c[v].push(s))}),Object.keys($).forEach(function(s){c[s]=c[s]||[]}),b(c)},[d]);var N=function(s){b(function(C){var v=T({},C),S=v[s]||[];return S.length||delete v[s],v})},O=r.useRef(!1);if(r.useEffect(function(){Object.keys($).length>0?O.current=!0:O.current&&(u==null||u(),O.current=!1)},[$]),!a)return null;var E=Object.keys($);return se.createPortal(r.createElement(r.Fragment,null,E.map(function(c){var s=$[c],C=s.map(function(S){return{config:S,key:S.key}}),v=typeof i=="function"?i(c):i;return r.createElement(ie,M({key:c,className:k(t,"".concat(t,"-").concat(c),x==null?void 0:x(c)),style:l==null?void 0:l(c),keys:C,motionAppear:!0},v,{onAllRemoved:function(){N(c)}}),function(S,w){var R=S.config,H=S.className,ee=S.style,G=R.key,ne=R.times,te=R.className,oe=R.style;return r.createElement(X,M({},R,{ref:w,prefixCls:t,className:k(H,te),style:T(T({},ee),oe),times:ne,key:G,eventKey:G,onNoticeClose:y}))})})),a)}),Fe=["getContainer","motion","prefixCls","maxCount","className","style","onAllRemoved"],ke=function(){return document.body},Q=0;function Me(){for(var e={},n=arguments.length,o=new Array(n),t=0;t<n;t++)o[t]=arguments[t];return o.forEach(function(a){a&&Object.keys(a).forEach(function(i){var f=a[i];f!==void 0&&(e[i]=f)})}),e}function je(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.getContainer,o=n===void 0?ke:n,t=e.motion,a=e.prefixCls,i=e.maxCount,f=e.className,x=e.style,l=e.onAllRemoved,u=ce(e,Fe),g=r.useState(),m=_(g,2),d=m[0],p=m[1],y=r.useRef(),h=r.createElement(we,{container:d,ref:y,prefixCls:a,motion:t,maxCount:i,className:f,style:x,onAllRemoved:l}),P=r.useState([]),$=_(P,2),b=$[0],N=$[1],O=r.useMemo(function(){return{open:function(c){var s=Me(u,c);(s.key===null||s.key===void 0)&&(s.key="rc-notification-".concat(Q),Q+=1),N(function(C){return[].concat(j(C),[{type:"open",config:s}])})},close:function(c){N(function(s){return[].concat(j(s),[{type:"close",key:c}])})},destroy:function(){N(function(c){return[].concat(j(c),[{type:"destroy"}])})}}},[]);return r.useEffect(function(){p(o())}),r.useEffect(function(){y.current&&b.length&&(b.forEach(function(E){switch(E.type){case"open":y.current.open(E.config);break;case"close":y.current.close(E.key);break;case"destroy":y.current.destroy();break}}),N([]))},[b]),[O,h]}const _e=e=>{const{componentCls:n,iconCls:o,boxShadow:t,colorText:a,colorSuccess:i,colorError:f,colorWarning:x,colorInfo:l,fontSizeLG:u,motionEaseInOutCirc:g,motionDurationSlow:m,marginXS:d,paddingXS:p,borderRadiusLG:y,zIndexPopup:h,contentPadding:P,contentBg:$}=e,b=`${n}-notice`,N=new B("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:p,transform:"translateY(0)",opacity:1}}),O=new B("MessageMoveOut",{"0%":{maxHeight:e.height,padding:p,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),E={padding:p,textAlign:"center",[`${n}-custom-content > ${o}`]:{verticalAlign:"text-bottom",marginInlineEnd:d,fontSize:u},[`${b}-content`]:{display:"inline-block",padding:P,background:$,borderRadius:y,boxShadow:t,pointerEvents:"all"},[`${n}-success > ${o}`]:{color:i},[`${n}-error > ${o}`]:{color:f},[`${n}-warning > ${o}`]:{color:x},[`${n}-info > ${o},
      ${n}-loading > ${o}`]:{color:l}};return[{[n]:Object.assign(Object.assign({},fe(e)),{color:a,position:"fixed",top:d,width:"100%",pointerEvents:"none",zIndex:h,[`${n}-move-up`]:{animationFillMode:"forwards"},[`
        ${n}-move-up-appear,
        ${n}-move-up-enter
      `]:{animationName:N,animationDuration:m,animationPlayState:"paused",animationTimingFunction:g},[`
        ${n}-move-up-appear${n}-move-up-appear-active,
        ${n}-move-up-enter${n}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${n}-move-up-leave`]:{animationName:O,animationDuration:m,animationPlayState:"paused",animationTimingFunction:g},[`${n}-move-up-leave${n}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}})},{[n]:{[b]:Object.assign({},E)}},{[`${n}-notice-pure-panel`]:Object.assign(Object.assign({},E),{padding:0,textAlign:"start"})}]},Y=le("Message",e=>{const n=ue(e,{height:150});return[_e(n)]},e=>({zIndexPopup:e.zIndexPopupBase+10,contentBg:e.colorBgElevated,contentPadding:`${(e.controlHeightLG-e.fontSize*e.lineHeight)/2}px ${e.paddingSM}px`}));function Ae(e,n){return{motionName:n??`${e}-move-up`}}function K(e){let n;const o=new Promise(a=>{n=e(()=>{a(!0)})}),t=()=>{n==null||n()};return t.then=(a,i)=>o.then(a,i),t.promise=o,t}var Te=globalThis&&globalThis.__rest||function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)n.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(o[t[a]]=e[t[a]]);return o};const ze={info:r.createElement(Ie,null),success:r.createElement(he,null),error:r.createElement(ve,null),warning:r.createElement(Oe,null),loading:r.createElement(de,null)};function q(e){let{prefixCls:n,type:o,icon:t,children:a}=e;return r.createElement("div",{className:k(`${n}-custom-content`,`${n}-${o}`)},t||ze[o],r.createElement("span",null,a))}function De(e){const{prefixCls:n,className:o,type:t,icon:a,content:i}=e,f=Te(e,["prefixCls","className","type","icon","content"]),{getPrefixCls:x}=r.useContext(V),l=n||x("message"),[,u]=Y(l);return r.createElement(X,Object.assign({},f,{prefixCls:l,className:k(o,u,`${l}-notice-pure-panel`),eventKey:"pure",duration:null,content:r.createElement(q,{prefixCls:l,type:t,icon:a},i)}))}var He=globalThis&&globalThis.__rest||function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)n.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(o[t[a]]=e[t[a]]);return o};const Le=8,Ke=3,Ge=r.forwardRef((e,n)=>{const{top:o,prefixCls:t,getContainer:a,maxCount:i,duration:f=Ke,rtl:x,transitionName:l,onAllRemoved:u}=e,{getPrefixCls:g,getPopupContainer:m}=r.useContext(V),d=t||g("message"),[,p]=Y(d),y=()=>({left:"50%",transform:"translateX(-50%)",top:o??Le}),h=()=>k(p,x?`${d}-rtl`:""),P=()=>Ae(d,l),$=r.createElement("span",{className:`${d}-close-x`},r.createElement(pe,{className:`${d}-close-icon`})),[b,N]=je({prefixCls:d,style:y,className:h,motion:P,closable:!1,closeIcon:$,duration:f,getContainer:()=>(a==null?void 0:a())||(m==null?void 0:m())||document.body,maxCount:i,onAllRemoved:u});return r.useImperativeHandle(n,()=>Object.assign(Object.assign({},b),{prefixCls:d,hashId:p})),N});let U=0;function J(e){const n=r.useRef(null);return[r.useMemo(()=>{const t=l=>{var u;(u=n.current)===null||u===void 0||u.close(l)},a=l=>{if(!n.current){const E=()=>{};return E.then=()=>{},E}const{open:u,prefixCls:g,hashId:m}=n.current,d=`${g}-notice`,{content:p,icon:y,type:h,key:P,className:$,onClose:b}=l,N=He(l,["content","icon","type","key","className","onClose"]);let O=P;return O==null&&(U+=1,O=`antd-message-${U}`),K(E=>(u(Object.assign(Object.assign({},N),{key:O,content:r.createElement(q,{prefixCls:g,type:h,icon:y},p),placement:"top",className:k(h&&`${d}-${h}`,m,$),onClose:()=>{b==null||b(),E()}})),()=>{t(O)}))},f={open:a,destroy:l=>{var u;l!==void 0?t(l):(u=n.current)===null||u===void 0||u.destroy()}};return["info","success","warning","error","loading"].forEach(l=>{const u=(g,m,d)=>{let p;g&&typeof g=="object"&&"content"in g?p=g:p={content:g};let y,h;typeof m=="function"?h=m:(y=m,h=d);const P=Object.assign(Object.assign({onClose:h,duration:y},p),{type:l});return a(P)};f[l]=u}),f},[]),r.createElement(Ge,Object.assign({key:"message-holder"},e,{ref:n}))]}function Be(e){return J(e)}let I=null,F=e=>e(),A=[],z={};function Qe(){const{prefixCls:e,getContainer:n,duration:o,rtl:t,maxCount:a,top:i}=z,f=e??W().getPrefixCls("message"),x=(n==null?void 0:n())||document.body;return{prefixCls:f,container:x,duration:o,rtl:t,maxCount:a,top:i}}const Ue=r.forwardRef((e,n)=>{const o=()=>{const{prefixCls:m,container:d,maxCount:p,duration:y,rtl:h,top:P}=Qe();return{prefixCls:m,getContainer:()=>d,maxCount:p,duration:y,rtl:h,top:P}},[t,a]=r.useState(o),[i,f]=J(t),x=W(),l=x.getRootPrefixCls(),u=x.getIconPrefixCls(),g=()=>{a(o)};return r.useEffect(g,[]),r.useImperativeHandle(n,()=>{const m=Object.assign({},i);return Object.keys(m).forEach(d=>{m[d]=function(){return g(),i[d].apply(i,arguments)}}),{instance:m,sync:g}}),r.createElement(ge,{prefixCls:l,iconPrefixCls:u},f)});function D(){if(!I){const e=document.createDocumentFragment(),n={fragment:e};I=n,F(()=>{me(r.createElement(Ue,{ref:o=>{const{instance:t,sync:a}=o||{};Promise.resolve().then(()=>{!n.instance&&t&&(n.instance=t,n.sync=a,D())})}}),e)});return}I.instance&&(A.forEach(e=>{const{type:n,skipped:o}=e;if(!o)switch(n){case"open":{F(()=>{const t=I.instance.open(Object.assign(Object.assign({},z),e.config));t==null||t.then(e.resolve),e.setCloseFn(t)});break}case"destroy":F(()=>{I==null||I.instance.destroy(e.key)});break;default:F(()=>{var t;const a=(t=I.instance)[n].apply(t,j(e.args));a==null||a.then(e.resolve),e.setCloseFn(a)})}}),A=[])}function Ve(e){z=Object.assign(Object.assign({},z),e),F(()=>{var n;(n=I==null?void 0:I.sync)===null||n===void 0||n.call(I)})}function We(e){const n=K(o=>{let t;const a={type:"open",config:e,resolve:o,setCloseFn:i=>{t=i}};return A.push(a),()=>{t?F(()=>{t()}):a.skipped=!0}});return D(),n}function Xe(e,n){const o=K(t=>{let a;const i={type:e,args:n,resolve:t,setCloseFn:f=>{a=f}};return A.push(i),()=>{a?F(()=>{a()}):i.skipped=!0}});return D(),o}function Ye(e){A.push({type:"destroy",key:e}),D()}const qe=["success","info","warning","error","loading"],Je={open:We,destroy:Ye,config:Ve,useMessage:Be,_InternalPanelDoNotUseOrYouWillBeFired:De},Z=Je;qe.forEach(e=>{Z[e]=function(){for(var n=arguments.length,o=new Array(n),t=0;t<n;t++)o[t]=arguments[t];return Xe(e,o)}});const nn=Z;export{he as C,Oe as E,Ie as I,nn as m};
