import{r as l,M as ge,O as Re,U as re,H as Y,bu as Xe,bv as Ke,bw as se,aY as Ye,bx as _e,Q as Te,by as he,aZ as we,a5 as K,a9 as Je,b8 as Qe,bz as Ue,V as Ze,W as ke,bA as et,bB as tt,bC as nt,bD as Le,bE as Z,bF as rt,av as be,ar as Se,au as ot,a1 as lt,J as it,b2 as st,aq as at,aV as ct,aM as ut,aF as dt,bG as We,Y as mt,aE as ft,bH as pt,bI as gt,a6 as ht,bJ as bt,aJ as yt,aO as $t,aK as xt,bK as Ct,bL as vt}from"./index-ce0732d8.js";import{C as wt,E as St}from"./index-71424fc7.js";import{u as Ot,a as Et}from"./index-64ee1e3e.js";const Oe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Ee=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",me=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return Ee(r.overflowY,t)||Ee(r.overflowX,t)||(n=>{const o=(i=>{if(!i.ownerDocument||!i.ownerDocument.defaultView)return null;try{return i.ownerDocument.defaultView.frameElement}catch{return null}})(n);return!!o&&(o.clientHeight<n.scrollHeight||o.clientWidth<n.scrollWidth)})(e)}return!1},ie=(e,t,r,n,o,i,c,a)=>i<e&&c>t||i>e&&c<t?0:i<=e&&a<=r||c>=t&&a>=r?i-e-n:c>t&&a<r||i<e&&a>r?c-t+o:0,It=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Ie=(e,t)=>{var r,n,o,i;if(typeof document>"u")return[];const{scrollMode:c,block:a,inline:u,boundary:p,skipOverflowHiddenElements:y}=t,M=typeof p=="function"?p:I=>I!==p;if(!Oe(e))throw new TypeError("Invalid target");const P=document.scrollingElement||document.documentElement,O=[];let h=e;for(;Oe(h)&&M(h);){if(h=It(h),h===P){O.push(h);break}h!=null&&h===document.body&&me(h)&&!me(document.documentElement)||h!=null&&me(h,y)&&O.push(h)}const S=(n=(r=window.visualViewport)==null?void 0:r.width)!=null?n:innerWidth,E=(i=(o=window.visualViewport)==null?void 0:o.height)!=null?i:innerHeight,{scrollX:$,scrollY:s}=window,{height:x,width:C,top:b,right:v,bottom:g,left:m}=e.getBoundingClientRect();let d=a==="start"||a==="nearest"?b:a==="end"?g:b+x/2,f=u==="center"?m+C/2:u==="end"?v:m;const A=[];for(let I=0;I<O.length;I++){const w=O[I],{height:j,width:q,top:V,right:W,bottom:R,left:H}=w.getBoundingClientRect();if(c==="if-needed"&&b>=0&&m>=0&&g<=E&&v<=S&&b>=V&&g<=R&&m>=H&&v<=W)return A;const _=getComputedStyle(w),z=parseInt(_.borderLeftWidth,10),G=parseInt(_.borderTopWidth,10),D=parseInt(_.borderRightWidth,10),F=parseInt(_.borderBottomWidth,10);let T=0,N=0;const B="offsetWidth"in w?w.offsetWidth-w.clientWidth-z-D:0,X="offsetHeight"in w?w.offsetHeight-w.clientHeight-G-F:0,Q="offsetWidth"in w?w.offsetWidth===0?0:q/w.offsetWidth:0,k="offsetHeight"in w?w.offsetHeight===0?0:j/w.offsetHeight:0;if(P===w)T=a==="start"?d:a==="end"?d-E:a==="nearest"?ie(s,s+E,E,G,F,s+d,s+d+x,x):d-E/2,N=u==="start"?f:u==="center"?f-S/2:u==="end"?f-S:ie($,$+S,S,z,D,$+f,$+f+C,C),T=Math.max(0,T+s),N=Math.max(0,N+$);else{T=a==="start"?d-V-G:a==="end"?d-R+F+X:a==="nearest"?ie(V,R,j,G,F+X,d,d+x,x):d-(V+j/2)+X/2,N=u==="start"?f-H-z:u==="center"?f-(H+q/2)+B/2:u==="end"?f-W+D+B:ie(H,W,q,z,D+B,f,f+C,C);const{scrollLeft:U,scrollTop:L}=w;T=Math.max(0,Math.min(L+T/k,w.scrollHeight-j/k+X)),N=Math.max(0,Math.min(U+N/Q,w.scrollWidth-q/Q+B)),d+=L-T,f+=U-N}A.push({el:w,top:T,left:N})}return A},jt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function Ft(e,t){if(!e.isConnected||!(n=>{let o=n;for(;o&&o.parentNode;){if(o.parentNode===document)return!0;o=o.parentNode instanceof ShadowRoot?o.parentNode.host:o.parentNode}return!1})(e))return;if((n=>typeof n=="object"&&typeof n.behavior=="function")(t))return t.behavior(Ie(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:n,top:o,left:i}of Ie(e,jt(t)))n.scroll({top:o,left:i,behavior:r})}const Nt=l.createContext({}),Ve=Nt,Mt=e=>{const{componentCls:t}=e;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},Pt=e=>{const{componentCls:t}=e;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},Rt=(e,t)=>{const{componentCls:r,gridColumns:n}=e,o={};for(let i=n;i>=0;i--)i===0?(o[`${r}${t}-${i}`]={display:"none"},o[`${r}-push-${i}`]={insetInlineStart:"auto"},o[`${r}-pull-${i}`]={insetInlineEnd:"auto"},o[`${r}${t}-push-${i}`]={insetInlineStart:"auto"},o[`${r}${t}-pull-${i}`]={insetInlineEnd:"auto"},o[`${r}${t}-offset-${i}`]={marginInlineStart:0},o[`${r}${t}-order-${i}`]={order:0}):(o[`${r}${t}-${i}`]={display:"block",flex:`0 0 ${i/n*100}%`,maxWidth:`${i/n*100}%`},o[`${r}${t}-push-${i}`]={insetInlineStart:`${i/n*100}%`},o[`${r}${t}-pull-${i}`]={insetInlineEnd:`${i/n*100}%`},o[`${r}${t}-offset-${i}`]={marginInlineStart:`${i/n*100}%`},o[`${r}${t}-order-${i}`]={order:i});return o},pe=(e,t)=>Rt(e,t),_t=(e,t,r)=>({[`@media (min-width: ${t}px)`]:Object.assign({},pe(e,r))}),Tt=ge("Grid",e=>[Mt(e)]),Lt=ge("Grid",e=>{const t=Re(e,{gridColumns:24}),r={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[Pt(t),pe(t,""),pe(t,"-xs"),Object.keys(r).map(n=>_t(t,r[n],n)).reduce((n,o)=>Object.assign(Object.assign({},n),o),{})]});var Wt=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function Vt(e){return typeof e=="number"?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}const Ht=["xs","sm","md","lg","xl","xxl"],At=l.forwardRef((e,t)=>{const{getPrefixCls:r,direction:n}=l.useContext(re),{gutter:o,wrap:i,supportFlexGap:c}=l.useContext(Ve),{prefixCls:a,span:u,order:p,offset:y,push:M,pull:P,className:O,children:h,flex:S,style:E}=e,$=Wt(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),s=r("col",a),[x,C]=Lt(s);let b={};Ht.forEach(m=>{let d={};const f=e[m];typeof f=="number"?d.span=f:typeof f=="object"&&(d=f||{}),delete $[m],b=Object.assign(Object.assign({},b),{[`${s}-${m}-${d.span}`]:d.span!==void 0,[`${s}-${m}-order-${d.order}`]:d.order||d.order===0,[`${s}-${m}-offset-${d.offset}`]:d.offset||d.offset===0,[`${s}-${m}-push-${d.push}`]:d.push||d.push===0,[`${s}-${m}-pull-${d.pull}`]:d.pull||d.pull===0,[`${s}-${m}-flex-${d.flex}`]:d.flex||d.flex==="auto",[`${s}-rtl`]:n==="rtl"})});const v=Y(s,{[`${s}-${u}`]:u!==void 0,[`${s}-order-${p}`]:p,[`${s}-offset-${y}`]:y,[`${s}-push-${M}`]:M,[`${s}-pull-${P}`]:P},O,b,C),g={};if(o&&o[0]>0){const m=o[0]/2;g.paddingLeft=m,g.paddingRight=m}if(o&&o[1]>0&&!c){const m=o[1]/2;g.paddingTop=m,g.paddingBottom=m}return S&&(g.flex=Vt(S),i===!1&&!g.minWidth&&(g.minWidth=0)),x(l.createElement("div",Object.assign({},$,{style:Object.assign(Object.assign({},g),E),className:v,ref:t}),h))}),He=At;var qt=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function je(e,t){const[r,n]=l.useState(typeof e=="string"?e:""),o=()=>{if(typeof e=="string"&&n(e),typeof e=="object")for(let i=0;i<se.length;i++){const c=se[i];if(!t[c])continue;const a=e[c];if(a!==void 0){n(a);return}}};return l.useEffect(()=>{o()},[JSON.stringify(e),t]),r}const zt=l.forwardRef((e,t)=>{const{prefixCls:r,justify:n,align:o,className:i,style:c,children:a,gutter:u=0,wrap:p}=e,y=qt(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:M,direction:P}=l.useContext(re),[O,h]=l.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[S,E]=l.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),$=je(o,S),s=je(n,S),x=Xe(),C=l.useRef(u),b=Ke();l.useEffect(()=>{const R=b.subscribe(H=>{E(H);const _=C.current||0;(!Array.isArray(_)&&typeof _=="object"||Array.isArray(_)&&(typeof _[0]=="object"||typeof _[1]=="object"))&&h(H)});return()=>b.unsubscribe(R)},[]);const v=()=>{const R=[void 0,void 0];return(Array.isArray(u)?u:[u,void 0]).forEach((_,z)=>{if(typeof _=="object")for(let G=0;G<se.length;G++){const D=se[G];if(O[D]&&_[D]!==void 0){R[z]=_[D];break}}else R[z]=_}),R},g=M("row",r),[m,d]=Tt(g),f=v(),A=Y(g,{[`${g}-no-wrap`]:p===!1,[`${g}-${s}`]:s,[`${g}-${$}`]:$,[`${g}-rtl`]:P==="rtl"},i,d),I={},w=f[0]!=null&&f[0]>0?f[0]/-2:void 0,j=f[1]!=null&&f[1]>0?f[1]/-2:void 0;w&&(I.marginLeft=w,I.marginRight=w),x?[,I.rowGap]=f:j&&(I.marginTop=j,I.marginBottom=j);const[q,V]=f,W=l.useMemo(()=>({gutter:[q,V],wrap:p,supportFlexGap:x}),[q,V,p,x]);return m(l.createElement(Ve.Provider,{value:W},l.createElement("div",Object.assign({},y,{className:A,style:Object.assign(Object.assign({},I),c),ref:t}),a)))}),Dt=zt;function ae(e){const[t,r]=l.useState(e);return l.useEffect(()=>{const n=setTimeout(()=>{r(e)},e.length?0:10);return()=>{clearTimeout(n)}},[e]),t}const Gt=e=>{const{componentCls:t}=e,r=`${t}-show-help`,n=`${t}-show-help-item`;return{[r]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[n]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${n}-appear, &${n}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${n}-leave-active`]:{transform:"translateY(-5px)"}}}}},Bt=Gt,Xt=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},label:{fontSize:e.fontSize},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Fe=(e,t)=>{const{formItemCls:r}=e;return{[r]:{[`${r}-label > label`]:{height:t},[`${r}-control-input`]:{minHeight:t}}}},Kt=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},Te(e)),Xt(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},Fe(e,e.controlHeightSM)),"&-large":Object.assign({},Fe(e,e.controlHeightLG))})}},Yt=e=>{const{formItemCls:t,iconCls:r,componentCls:n,rootPrefixCls:o}=e;return{[t]:Object.assign(Object.assign({},Te(e)),{marginBottom:e.marginLG,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${o}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{display:"inline-block",flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:`${e.lineHeight} - 0.25em`,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:e.controlHeight,color:e.colorTextHeading,fontSize:e.fontSize,[`> ${r}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:e.colorError,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${n}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:e.marginXXS/2,marginInlineEnd:e.marginXS},[`&${t}-no-colon::after`]:{content:'" "'}}},[`${t}-control`]:{display:"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:_e,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},Jt=e=>{const{componentCls:t,formItemCls:r,rootPrefixCls:n}=e;return{[`${t}-horizontal`]:{[`${r}-label`]:{flexGrow:0},[`${r}-control`]:{flex:"1 1 0",minWidth:0},[`${r}-label.${n}-col-24 + ${r}-control`]:{minWidth:"unset"}}}},Qt=e=>{const{componentCls:t,formItemCls:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[r]:{flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},"&-with-help":{marginBottom:e.marginLG},[`> ${r}-label,
        > ${r}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${r}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${r}-has-feedback`]:{display:"inline-block"}}}}},te=e=>({margin:0,padding:`0 0 ${e.paddingXS}px`,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{display:"none"}}}),Ut=e=>{const{componentCls:t,formItemCls:r}=e;return{[`${r} ${r}-label`]:te(e),[t]:{[r]:{flexWrap:"wrap",[`${r}-label,
          ${r}-control`]:{flex:"0 0 100%",maxWidth:"100%"}}}}},Zt=e=>{const{componentCls:t,formItemCls:r,rootPrefixCls:n}=e;return{[`${t}-vertical`]:{[r]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${r}-label,
      .${n}-col-24${r}-label,
      .${n}-col-xl-24${r}-label`]:te(e),[`@media (max-width: ${e.screenXSMax}px)`]:[Ut(e),{[t]:{[`.${n}-col-xs-24${r}-label`]:te(e)}}],[`@media (max-width: ${e.screenSMMax}px)`]:{[t]:{[`.${n}-col-sm-24${r}-label`]:te(e)}},[`@media (max-width: ${e.screenMDMax}px)`]:{[t]:{[`.${n}-col-md-24${r}-label`]:te(e)}},[`@media (max-width: ${e.screenLGMax}px)`]:{[t]:{[`.${n}-col-lg-24${r}-label`]:te(e)}}}},ye=ge("Form",(e,t)=>{let{rootPrefixCls:r}=t;const n=Re(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:r});return[Kt(n),Yt(n),Bt(n),Jt(n),Qt(n),Zt(n),Ye(n),_e]}),Ne=[];function fe(e,t,r){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${n}`,error:e,errorStatus:r}}function Ae(e){let{help:t,helpStatus:r,errors:n=Ne,warnings:o=Ne,className:i,fieldId:c,onVisibleChanged:a}=e;const{prefixCls:u}=l.useContext(he),p=`${u}-item-explain`,[,y]=ye(u),M=l.useMemo(()=>we(u),[u]),P=ae(n),O=ae(o),h=l.useMemo(()=>t!=null?[fe(t,"help",r)]:[].concat(K(P.map((E,$)=>fe(E,"error","error",$))),K(O.map((E,$)=>fe(E,"warning","warning",$)))),[t,r,P,O]),S={};return c&&(S.id=`${c}_help`),l.createElement(Je,{motionDeadline:M.motionDeadline,motionName:`${u}-show-help`,visible:!!h.length,onVisibleChanged:a},E=>{const{className:$,style:s}=E;return l.createElement("div",Object.assign({},S,{className:Y(p,$,i,y),style:s,role:"alert"}),l.createElement(Qe,Object.assign({keys:h},we(u),{motionName:`${u}-show-help-item`,component:!1}),x=>{const{key:C,error:b,errorStatus:v,className:g,style:m}=x;return l.createElement("div",{key:C,className:Y(g,{[`${p}-${v}`]:v}),style:m},b)}))})}const kt=["parentNode"],en="form_item";function ne(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function qe(e,t){if(!e.length)return;const r=e.join("_");return t?`${t}_${r}`:kt.includes(r)?`${en}_${r}`:r}function Me(e){return ne(e).join("_")}function ze(e){const[t]=Ue(),r=l.useRef({}),n=l.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>i=>{const c=Me(o);i?r.current[c]=i:delete r.current[c]}},scrollToField:function(o){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const c=ne(o),a=qe(c,n.__INTERNAL__.name),u=a?document.getElementById(a):null;u&&Ft(u,Object.assign({scrollMode:"if-needed",block:"nearest"},i))},getFieldInstance:o=>{const i=Me(o);return r.current[i]}}),[e,t]);return[n]}var tn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const nn=(e,t)=>{const r=l.useContext(Ze),{getPrefixCls:n,direction:o,form:i}=l.useContext(re),{prefixCls:c,className:a,rootClassName:u,size:p,disabled:y=r,form:M,colon:P,labelAlign:O,labelWrap:h,labelCol:S,wrapperCol:E,hideRequiredMark:$,layout:s="horizontal",scrollToFirstError:x,requiredMark:C,onFinishFailed:b,name:v}=e,g=tn(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name"]),m=ke(p),d=l.useContext(et),f=l.useMemo(()=>C!==void 0?C:i&&i.requiredMark!==void 0?i.requiredMark:!$,[$,C,i]),A=P??(i==null?void 0:i.colon),I=n("form",c),[w,j]=ye(I),q=Y(I,{[`${I}-${s}`]:!0,[`${I}-hide-required-mark`]:f===!1,[`${I}-rtl`]:o==="rtl",[`${I}-${m}`]:m},j,a,u),[V]=ze(M),{__INTERNAL__:W}=V;W.name=v;const R=l.useMemo(()=>({name:v,labelAlign:O,labelCol:S,labelWrap:h,wrapperCol:E,vertical:s==="vertical",colon:A,requiredMark:f,itemRef:W.itemRef,form:V}),[v,O,S,E,s,A,f,V]);l.useImperativeHandle(t,()=>V);const H=(z,G)=>{if(z){let D={block:"nearest"};typeof z=="object"&&(D=z),V.scrollToField(G,D)}},_=z=>{if(b==null||b(z),z.errorFields.length){const G=z.errorFields[0].name;if(x!==void 0){H(x,G);return}i&&i.scrollToFirstError!==void 0&&H(i.scrollToFirstError,G)}};return w(l.createElement(tt,{disabled:y},l.createElement(nt,{size:m},l.createElement(Le,Object.assign({},{validateMessages:d}),l.createElement(Z.Provider,{value:R},l.createElement(rt,Object.assign({id:v},g,{name:v,onFinishFailed:_,form:V,className:q})))))))},rn=l.forwardRef(nn),on=rn,De=()=>{const{status:e,errors:t=[],warnings:r=[]}=l.useContext(be);return{status:e,errors:t,warnings:r}};De.Context=be;const ln=De;function sn(e){const[t,r]=l.useState(e),n=l.useRef(null),o=l.useRef([]),i=l.useRef(!1);l.useEffect(()=>(i.current=!1,()=>{i.current=!0,Se.cancel(n.current),n.current=null}),[]);function c(a){i.current||(n.current===null&&(o.current=[],n.current=Se(()=>{n.current=null,r(u=>{let p=u;return o.current.forEach(y=>{p=y(p)}),p})})),o.current.push(a))}return[t,c]}function an(){const{itemRef:e}=l.useContext(Z),t=l.useRef({});function r(n,o){const i=o&&typeof o=="object"&&o.ref,c=n.join("_");return(t.current.name!==c||t.current.originRef!==i)&&(t.current.name=c,t.current.originRef=i,t.current.ref=ot(e(n),i)),t.current.ref}return r}const cn=e=>{const{prefixCls:t,status:r,wrapperCol:n,children:o,errors:i,warnings:c,_internalItemRender:a,extra:u,help:p,fieldId:y,marginBottom:M,onErrorVisibleChanged:P}=e,O=`${t}-item`,h=l.useContext(Z),S=n||h.wrapperCol||{},E=Y(`${O}-control`,S.className),$=l.useMemo(()=>Object.assign({},h),[h]);delete $.labelCol,delete $.wrapperCol;const s=l.createElement("div",{className:`${O}-control-input`},l.createElement("div",{className:`${O}-control-input-content`},o)),x=l.useMemo(()=>({prefixCls:t,status:r}),[t,r]),C=M!==null||i.length||c.length?l.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},l.createElement(he.Provider,{value:x},l.createElement(Ae,{fieldId:y,errors:i,warnings:c,help:p,helpStatus:r,className:`${O}-explain-connected`,onVisibleChanged:P})),!!M&&l.createElement("div",{style:{width:0,height:M}})):null,b={};y&&(b.id=`${y}_extra`);const v=u?l.createElement("div",Object.assign({},b,{className:`${O}-extra`}),u):null,g=a&&a.mark==="pro_table_render"&&a.render?a.render(e,{input:s,errorList:C,extra:v}):l.createElement(l.Fragment,null,s,C,v);return l.createElement(Z.Provider,{value:$},l.createElement(He,Object.assign({},S,{className:E}),g))},un=cn;var dn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};const mn=dn;var fn=function(t,r){return l.createElement(lt,it({},t,{ref:r,icon:mn}))};const pn=l.forwardRef(fn);var gn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};function hn(e){return e?typeof e=="object"&&!l.isValidElement(e)?e:{title:e}:null}const bn=e=>{let{prefixCls:t,label:r,htmlFor:n,labelCol:o,labelAlign:i,colon:c,required:a,requiredMark:u,tooltip:p}=e;var y;const[M]=Ot("Form"),{vertical:P,labelAlign:O,labelCol:h,labelWrap:S,colon:E}=l.useContext(Z);if(!r)return null;const $=o||h||{},s=i||O,x=`${t}-item-label`,C=Y(x,s==="left"&&`${x}-left`,$.className,{[`${x}-wrap`]:!!S});let b=r;const v=c===!0||E!==!1&&c!==!1;v&&!P&&typeof r=="string"&&r.trim()!==""&&(b=r.replace(/[:|：]\s*$/,""));const m=hn(p);if(m){const{icon:f=l.createElement(pn,null)}=m,A=gn(m,["icon"]),I=l.createElement(st,Object.assign({},A),l.cloneElement(f,{className:`${t}-item-tooltip`,title:""}));b=l.createElement(l.Fragment,null,b,I)}u==="optional"&&!a&&(b=l.createElement(l.Fragment,null,b,l.createElement("span",{className:`${t}-item-optional`,title:""},(M==null?void 0:M.optional)||((y=at.Form)===null||y===void 0?void 0:y.optional))));const d=Y({[`${t}-item-required`]:a,[`${t}-item-required-mark-optional`]:u==="optional",[`${t}-item-no-colon`]:!v});return l.createElement(He,Object.assign({},$,{className:C}),l.createElement("label",{htmlFor:n,className:d,title:typeof r=="string"?r:""},b))},yn=bn;var $n=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const xn={success:wt,warning:St,error:Et,validating:mt};function Cn(e){const{prefixCls:t,className:r,rootClassName:n,style:o,help:i,errors:c,warnings:a,validateStatus:u,meta:p,hasFeedback:y,hidden:M,children:P,fieldId:O,required:h,isRequired:S,onSubItemMetaChange:E}=e,$=$n(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),s=`${t}-item`,{requiredMark:x}=l.useContext(Z),C=l.useRef(null),b=ae(c),v=ae(a),g=i!=null,m=!!(g||c.length||a.length),d=!!C.current&&ct(C.current),[f,A]=l.useState(null);ut(()=>{if(m&&C.current){const W=getComputedStyle(C.current);A(parseInt(W.marginBottom,10))}},[m,d]);const I=W=>{W||A(null)},j=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,R="";const H=W?b:p.errors,_=W?v:p.warnings;return u!==void 0?R=u:p.validating?R="validating":H.length?R="error":_.length?R="warning":(p.touched||y&&p.validated)&&(R="success"),R}(),q=l.useMemo(()=>{let W;if(y){const R=j&&xn[j];W=R?l.createElement("span",{className:Y(`${s}-feedback-icon`,`${s}-feedback-icon-${j}`)},l.createElement(R,null)):null}return{status:j,errors:c,warnings:a,hasFeedback:y,feedbackIcon:W,isFormItemInput:!0}},[j,y]),V=Y(s,r,n,{[`${s}-with-help`]:g||b.length||v.length,[`${s}-has-feedback`]:j&&y,[`${s}-has-success`]:j==="success",[`${s}-has-warning`]:j==="warning",[`${s}-has-error`]:j==="error",[`${s}-is-validating`]:j==="validating",[`${s}-hidden`]:M});return l.createElement("div",{className:V,style:o,ref:C},l.createElement(Dt,Object.assign({className:`${s}-row`},dt($,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol"])),l.createElement(yn,Object.assign({htmlFor:O},e,{requiredMark:x,required:h??S,prefixCls:t})),l.createElement(un,Object.assign({},e,p,{errors:b,warnings:v,prefixCls:t,status:j,help:i,marginBottom:f,onErrorVisibleChanged:I}),l.createElement(We.Provider,{value:E},l.createElement(be.Provider,{value:q},P)))),!!f&&l.createElement("div",{className:`${s}-margin-offset`,style:{marginBottom:-f}}))}function vn(e){if(typeof e=="function")return e;const t=ft(e);return t.length<=1?t[0]:t}const wn="__SPLIT__",Sn=l.memo(e=>{let{children:t}=e;return t},(e,t)=>e.value===t.value&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((r,n)=>r===t.childProps[n]));function On(e){return e!=null}function Pe(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function En(e){const{name:t,noStyle:r,className:n,dependencies:o,prefixCls:i,shouldUpdate:c,rules:a,children:u,required:p,label:y,messageVariables:M,trigger:P="onChange",validateTrigger:O,hidden:h,help:S}=e,{getPrefixCls:E}=l.useContext(re),{name:$}=l.useContext(Z),s=vn(u),x=typeof s=="function",C=l.useContext(We),{validateTrigger:b}=l.useContext(pt),v=O!==void 0?O:b,g=On(t),m=E("form",i),[d,f]=ye(m),A=l.useContext(gt),I=l.useRef(),[w,j]=sn({}),[q,V]=ht(()=>Pe()),W=F=>{const T=A==null?void 0:A.getKey(F.name);if(V(F.destroy?Pe():F,!0),r&&S!==!1&&C){let N=F.name;if(F.destroy)N=I.current||N;else if(T!==void 0){const[B,X]=T;N=[B].concat(K(X)),I.current=N}C(F,N)}},R=(F,T)=>{j(N=>{const B=Object.assign({},N),Q=[].concat(K(F.name.slice(0,-1)),K(T)).join(wn);return F.destroy?delete B[Q]:B[Q]=F,B})},[H,_]=l.useMemo(()=>{const F=K(q.errors),T=K(q.warnings);return Object.values(w).forEach(N=>{F.push.apply(F,K(N.errors||[])),T.push.apply(T,K(N.warnings||[]))}),[F,T]},[w,q.errors,q.warnings]),z=an();function G(F,T,N){return r&&!h?F:l.createElement(Cn,Object.assign({key:"row"},e,{className:Y(n,f),prefixCls:m,fieldId:T,isRequired:N,errors:H,warnings:_,meta:q,onSubItemMetaChange:R}),F)}if(!g&&!x&&!o)return d(G(s));let D={};return typeof y=="string"?D.label=y:t&&(D.label=String(t)),M&&(D=Object.assign(Object.assign({},D),M)),d(l.createElement(bt,Object.assign({},e,{messageVariables:D,trigger:P,validateTrigger:v,onMetaChange:W}),(F,T,N)=>{const B=ne(t).length&&T?T.name:[],X=qe(B,$),Q=p!==void 0?p:!!(a&&a.some(L=>{if(L&&typeof L=="object"&&L.required&&!L.warningOnly)return!0;if(typeof L=="function"){const oe=L(N);return oe&&oe.required&&!oe.warningOnly}return!1})),k=Object.assign({},F);let U=null;if(Array.isArray(s)&&g)U=s;else if(!(x&&(!(c||o)||g))){if(!(o&&!x&&!g))if(yt(s)){const L=Object.assign(Object.assign({},s.props),k);if(L.id||(L.id=X),S||H.length>0||_.length>0||e.extra){const ee=[];(S||H.length>0)&&ee.push(`${X}_help`),e.extra&&ee.push(`${X}_extra`),L["aria-describedby"]=ee.join(" ")}H.length>0&&(L["aria-invalid"]="true"),Q&&(L["aria-required"]="true"),$t(s)&&(L.ref=z(B,s)),new Set([].concat(K(ne(P)),K(ne(v)))).forEach(ee=>{L[ee]=function(){for(var $e,xe,ce,Ce,ue,ve=arguments.length,de=new Array(ve),le=0;le<ve;le++)de[le]=arguments[le];(ce=k[ee])===null||ce===void 0||($e=ce).call.apply($e,[k].concat(de)),(ue=(Ce=s.props)[ee])===null||ue===void 0||(xe=ue).call.apply(xe,[Ce].concat(de))}});const Be=[L["aria-required"],L["aria-invalid"],L["aria-describedby"]];U=l.createElement(Sn,{value:k[e.valuePropName||"value"],update:s,childProps:Be},xt(s,L))}else x&&(c||o)&&!g?U=s(N):U=s}return G(U,X,Q)}))}const Ge=En;Ge.useStatus=ln;const In=Ge;var jn=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const Fn=e=>{var{prefixCls:t,children:r}=e,n=jn(e,["prefixCls","children"]);const{getPrefixCls:o}=l.useContext(re),i=o("form",t),c=l.useMemo(()=>({prefixCls:i,status:"error"}),[i]);return l.createElement(Ct,Object.assign({},n),(a,u,p)=>l.createElement(he.Provider,{value:c},r(a.map(y=>Object.assign(Object.assign({},y),{fieldKey:y.key})),u,{errors:p.errors,warnings:p.warnings})))},Nn=Fn;function Mn(){const{form:e}=l.useContext(Z);return e}const J=on;J.Item=In;J.List=Nn;J.ErrorList=Ae;J.useForm=ze;J.useFormInstance=Mn;J.useWatch=vt;J.Provider=Le;J.create=()=>{};const Tn=J;export{He as C,Tn as F,Dt as R,In as a};
