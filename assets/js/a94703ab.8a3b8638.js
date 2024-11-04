"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9048],{6030:(e,t,a)=>{a.r(t),a.d(t,{default:()=>be});var n=a(6540),s=a(4164),i=a(1003),o=a(7559),l=a(4718),d=a(609),r=a(1312),c=a(3104),u=a(5062);const m={backToTopButton:"backToTopButton_sjWU",backToTopButtonShow:"backToTopButtonShow_xfvO"};var b=a(4848);function h(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[a,s]=(0,n.useState)(!1),i=(0,n.useRef)(!1),{startScroll:o,cancelScroll:l}=(0,c.useSmoothScrollTo)();return(0,c.useScrollPosition)(((e,a)=>{let{scrollY:n}=e;const o=a?.scrollY;o&&(i.current?i.current=!1:n>=o?(l(),s(!1)):n<t?s(!1):n+window.innerHeight<document.documentElement.scrollHeight&&s(!0))})),(0,u.useLocationChange)((e=>{e.location.hash&&(i.current=!0,s(!1))})),{shown:a,scrollToTop:()=>o(0)}}({threshold:300});return(0,b.jsx)("button",{"aria-label":(0,r.translate)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,s.default)("clean-btn",o.ThemeClassNames.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var p=a(3109),f=a(6347),x=a(4581),j=a(6342),C=a(3465);function v(e){return(0,b.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,b.jsxs)("g",{fill:"#7a7a7a",children:[(0,b.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,b.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const S="collapseSidebarButton_PEFL",_="collapseSidebarButtonIcon_kv0_";function g(e){let{onClick:t}=e;return(0,b.jsx)("button",{type:"button",title:(0,r.translate)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,r.translate)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,s.default)("button button--secondary button--outline",S),onClick:t,children:(0,b.jsx)(v,{className:_})})}var N=a(5041),k=a(3082),T=a(9532),I=a(1422),A=a(9169),B=a(8774),y=a(2303);function L(e){let{collapsed:t,categoryLabel:a,onClick:n}=e;return(0,b.jsx)("button",{"aria-label":t?(0,r.translate)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:a}):(0,r.translate)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:a}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:n})}function w(e){let{item:t,onItemClick:a,activePath:i,level:d,index:r,...c}=e;const{items:u,label:m,collapsible:h,className:p,href:f}=t,{docs:{sidebar:{autoCollapseCategories:x}}}=(0,j.useThemeConfig)(),C=function(e){const t=(0,y.default)();return(0,n.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,l.findFirstSidebarItemLink)(e):void 0),[e,t])}(t),v=(0,l.isActiveSidebarItem)(t,i),S=(0,A.isSamePath)(f,i),{collapsed:_,setCollapsed:g}=(0,I.useCollapsible)({initialState:()=>!!h&&(!v&&t.collapsed)}),{expandedItem:N,setExpandedItem:w}=(0,k.useDocSidebarItemsExpandedState)(),E=function(e){void 0===e&&(e=!_),w(e?null:r),g(e)};return function(e){let{isActive:t,collapsed:a,updateCollapsed:s}=e;const i=(0,T.usePrevious)(t);(0,n.useEffect)((()=>{t&&!i&&a&&s(!1)}),[t,i,a,s])}({isActive:v,collapsed:_,updateCollapsed:E}),(0,n.useEffect)((()=>{h&&null!=N&&N!==r&&x&&g(!0)}),[h,N,r,g,x]),(0,b.jsxs)("li",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarItemCategory,o.ThemeClassNames.docs.docSidebarItemCategoryLevel(d),"menu__list-item",{"menu__list-item--collapsed":_},p),children:[(0,b.jsxs)("div",{className:(0,s.default)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":S}),children:[(0,b.jsx)(B.default,{className:(0,s.default)("menu__link",{"menu__link--sublist":h,"menu__link--sublist-caret":!f&&h,"menu__link--active":v}),onClick:h?e=>{a?.(t),f?E(!1):(e.preventDefault(),E())}:()=>{a?.(t)},"aria-current":S?"page":void 0,role:h&&!f?"button":void 0,"aria-expanded":h&&!f?!_:void 0,href:h?C??"#":C,...c,children:m}),f&&h&&(0,b.jsx)(L,{collapsed:_,categoryLabel:m,onClick:e=>{e.preventDefault(),E()}})]}),(0,b.jsx)(I.Collapsible,{lazy:!0,as:"ul",className:"menu__list",collapsed:_,children:(0,b.jsx)(U,{items:u,tabIndex:_?-1:0,onItemClick:a,activePath:i,level:d+1})})]})}var E=a(6654),M=a(9599);const H="menuExternalLink_NmtK";function P(e){let{item:t,onItemClick:a,activePath:n,level:i,index:d,...r}=e;const{href:c,label:u,className:m,autoAddBaseUrl:h}=t,p=(0,l.isActiveSidebarItem)(t,n),f=(0,E.default)(c);return(0,b.jsx)("li",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarItemLink,o.ThemeClassNames.docs.docSidebarItemLinkLevel(i),"menu__list-item",m),children:(0,b.jsxs)(B.default,{className:(0,s.default)("menu__link",!f&&H,{"menu__link--active":p}),autoAddBaseUrl:h,"aria-current":p?"page":void 0,to:c,...f&&{onClick:a?()=>a(t):void 0},...r,children:[u,!f&&(0,b.jsx)(M.default,{})]})},u)}const D="menuHtmlItem_M9Kj";function R(e){let{item:t,level:a,index:n}=e;const{value:i,defaultStyle:l,className:d}=t;return(0,b.jsx)("li",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarItemLink,o.ThemeClassNames.docs.docSidebarItemLinkLevel(a),l&&[D,"menu__list-item"],d),dangerouslySetInnerHTML:{__html:i}},n)}function W(e){let{item:t,...a}=e;switch(t.type){case"category":return(0,b.jsx)(w,{item:t,...a});case"html":return(0,b.jsx)(R,{item:t,...a});default:return(0,b.jsx)(P,{item:t,...a})}}function F(e){let{items:t,...a}=e;const n=(0,l.useVisibleSidebarItems)(t,a.activePath);return(0,b.jsx)(k.DocSidebarItemsExpandedStateProvider,{children:n.map(((e,t)=>(0,b.jsx)(W,{item:e,index:t,...a},t)))})}const U=(0,n.memo)(F),V="menu_SIkG",K="menuWithAnnouncementBar_GW3s";function Y(e){let{path:t,sidebar:a,className:i}=e;const l=function(){const{isActive:e}=(0,N.useAnnouncementBar)(),[t,a]=(0,n.useState)(e);return(0,c.useScrollPosition)((t=>{let{scrollY:n}=t;e&&a(0===n)}),[e]),e&&t}();return(0,b.jsx)("nav",{"aria-label":(0,r.translate)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,s.default)("menu thin-scrollbar",V,l&&K,i),children:(0,b.jsx)("ul",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(U,{items:a,activePath:t,level:1})})})}const z="sidebar_njMd",G="sidebarWithHideableNavbar_wUlq",O="sidebarHidden_VK0M",q="sidebarLogo_isFc";function J(e){let{path:t,sidebar:a,onCollapse:n,isHidden:i}=e;const{navbar:{hideOnScroll:o},docs:{sidebar:{hideable:l}}}=(0,j.useThemeConfig)();return(0,b.jsxs)("div",{className:(0,s.default)(z,o&&G,i&&O),children:[o&&(0,b.jsx)(C.default,{tabIndex:-1,className:q}),(0,b.jsx)(Y,{path:t,sidebar:a}),l&&(0,b.jsx)(g,{onClick:n})]})}const Q=n.memo(J);var X=a(5600),Z=a(9876);const $=e=>{let{sidebar:t,path:a}=e;const n=(0,Z.useNavbarMobileSidebar)();return(0,b.jsx)("ul",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(U,{items:t,activePath:a,onItemClick:e=>{"category"===e.type&&e.href&&n.toggle(),"link"===e.type&&n.toggle()},level:1})})};function ee(e){return(0,b.jsx)(X.NavbarSecondaryMenuFiller,{component:$,props:e})}const te=n.memo(ee);function ae(e){const t=(0,x.useWindowSize)(),a="desktop"===t||"ssr"===t,n="mobile"===t;return(0,b.jsxs)(b.Fragment,{children:[a&&(0,b.jsx)(Q,{...e}),n&&(0,b.jsx)(te,{...e})]})}const ne={expandButton:"expandButton_TmdG",expandButtonIcon:"expandButtonIcon_i1dp"};function se(e){let{toggleSidebar:t}=e;return(0,b.jsx)("div",{className:ne.expandButton,title:(0,r.translate)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,r.translate)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,b.jsx)(v,{className:ne.expandButtonIcon})})}const ie={docSidebarContainer:"docSidebarContainer_YfHR",docSidebarContainerHidden:"docSidebarContainerHidden_DPk8",sidebarViewport:"sidebarViewport_aRkj"};function oe(e){let{children:t}=e;const a=(0,d.useDocsSidebar)();return(0,b.jsx)(n.Fragment,{children:t},a?.name??"noSidebar")}function le(e){let{sidebar:t,hiddenSidebarContainer:a,setHiddenSidebarContainer:i}=e;const{pathname:l}=(0,f.useLocation)(),[d,r]=(0,n.useState)(!1),c=(0,n.useCallback)((()=>{d&&r(!1),!d&&(0,p.prefersReducedMotion)()&&r(!0),i((e=>!e))}),[i,d]);return(0,b.jsx)("aside",{className:(0,s.default)(o.ThemeClassNames.docs.docSidebarContainer,ie.docSidebarContainer,a&&ie.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ie.docSidebarContainer)&&a&&r(!0)},children:(0,b.jsx)(oe,{children:(0,b.jsxs)("div",{className:(0,s.default)(ie.sidebarViewport,d&&ie.sidebarViewportHidden),children:[(0,b.jsx)(ae,{sidebar:t,path:l,onCollapse:c,isHidden:d}),d&&(0,b.jsx)(se,{toggleSidebar:c})]})})})}const de={docMainContainer:"docMainContainer_TBSr",docMainContainerEnhanced:"docMainContainerEnhanced_lQrH",docItemWrapperEnhanced:"docItemWrapperEnhanced_JWYK"};function re(e){let{hiddenSidebarContainer:t,children:a}=e;const n=(0,d.useDocsSidebar)();return(0,b.jsx)("main",{className:(0,s.default)(de.docMainContainer,(t||!n)&&de.docMainContainerEnhanced),children:(0,b.jsx)("div",{className:(0,s.default)("container padding-top--md padding-bottom--lg",de.docItemWrapper,t&&de.docItemWrapperEnhanced),children:a})})}const ce={docRoot:"docRoot_UBD9",docsWrapper:"docsWrapper_hBAB"};function ue(e){let{children:t}=e;const a=(0,d.useDocsSidebar)(),[s,i]=(0,n.useState)(!1);return(0,b.jsxs)("div",{className:ce.docsWrapper,children:[(0,b.jsx)(h,{}),(0,b.jsxs)("div",{className:ce.docRoot,children:[a&&(0,b.jsx)(le,{sidebar:a.items,hiddenSidebarContainer:s,setHiddenSidebarContainer:i}),(0,b.jsx)(re,{hiddenSidebarContainer:s,children:t})]})]})}var me=a(3363);function be(e){const t=(0,l.useDocRootMetadata)(e);if(!t)return(0,b.jsx)(me.default,{});const{docElement:a,sidebarName:n,sidebarItems:r}=t;return(0,b.jsx)(i.HtmlClassNameProvider,{className:(0,s.default)(o.ThemeClassNames.page.docsDocPage),children:(0,b.jsx)(d.DocsSidebarProvider,{name:n,items:r,children:(0,b.jsx)(ue,{children:a})})})}},3363:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});a(6540);var n=a(4164),s=a(1312),i=a(8141),o=a(4848);function l(e){let{className:t}=e;return(0,o.jsx)("main",{className:(0,n.default)("container margin-vert--xl",t),children:(0,o.jsx)("div",{className:"row",children:(0,o.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,o.jsx)(i.default,{as:"h1",className:"hero__title",children:(0,o.jsx)(s.default,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,o.jsx)("p",{children:(0,o.jsx)(s.default,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,o.jsx)("p",{children:(0,o.jsx)(s.default,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}}}]);