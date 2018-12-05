!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){function t(t,e){return function(n){t[e]=n}}function e(t,e){var n={};return n.type=t,n.props=e||{},n.children=[].concat.apply([],[].slice.call(arguments,2)),n.isComponent="function"==typeof t&&t.prototype&&"function"==typeof t.prototype.render,n.isStateless="function"==typeof t&&!n.isComponent,n.isDom="string"==typeof t,n}function n(t,e){for(var n in e)t[n]=e[n];return t}var o=["nodes","components","refs"];function r(){this.data={};for(var t=0;t<o.length;t++)this.data[o[t]]=[]}r.prototype.append=function(t){for(var e in t)this.data[e]=this.data[e].concat(t[e])},r.prototype.set=function(t){for(var e in t)this.data[e]=t[e]},r.prototype.get=function(){return this.data};var i,l=["xlink","xmlns","xml"],s=["autoplay","muted","webkit-playsinline","playsinline"];function c(t,e){return t.substr(0,e.length)===e}function p(t,e,o,r){"className"===e&&(e="class");for(var p=0;p<l.length;p++)if(c(e,l[p])){var a=l[p].length;e[a]&&":"!==e[a]&&(e=l[p]+":"+e[a].toLowerCase()+e.substr(a+1,e.length));break}if("ref"===e);else if("function"==typeof o&&c(e,"on")){t[e.toLowerCase()]=o}else if("class"!==e||r){if("style"===e)"object"==typeof o?n(t.style,o):"string"==typeof o&&(t.style.cssText=o);else if("list"!==e&&"type"!==e&&!r&&e in t)try{t[e]=i=null==o?"":o,~s.indexOf(e)&&t.setAttribute(e,!0===i?"":i)}catch(t){}else if("object"!=typeof o&&"function"!=typeof o){r&&e!==(e=e.replace(/^xlink:?/,""))?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),o):(t.setAttribute(e,!0===(i=null==o?"":o)?"":i),~s.indexOf(e)&&(t[e]=i))}}else t.className=o||""}function a(t,e){if(Array.isArray(t))return function(t,e){n=t,t=Array.isArray(n)?n:[n];var n;for(var o=new r,i=0;i<t.length;i++)o.append(a(t[i],e));return o.get()}(t,e);if(t instanceof window.Element)return function(t){var e=new r;return e.append({nodes:t}),e.get()}(t);if("object"!=typeof t)return function(t){var e=new r;"string"!=typeof t&&"number"!=typeof t||e.append({nodes:document.createTextNode(t+"")});return e.get()}(t);var o=n(n({},t.props),{children:[].concat.apply([],t.children||[])});return t.isDom?function(t,e,n){var o=new r,i=[];"svg"===t.type&&(n=!0);for(var l=0;l<e.children.length;l++){var s=a(e.children[l],n);s.nodes&&(i=i.concat(s.nodes),o.append({components:s.components,refs:s.refs}))}var c=n?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type);for(var u in t.props)p(c,u,t.props[u],n);for(l=0;l<i.length;l++)c.appendChild(i[l]);e.ref&&o.append({refs:{ref:c,fn:e.ref}});return o.append({nodes:c}),o.get()}(t,o,e):t.isStateless?function(t,e,n){var o=new r,i=t.type(e);return o.append(a(i,n)),o.get()}(t,o,e):t.isComponent?function(t,e,n){var o=new r,i=new t.type(e);i.componentWillMount(e);var l=i.template(e);e.ref&&o.append({refs:{ref:i,fn:e.ref}});o.append(a(l,n));var s=o.data.nodes;i.base=s.length>1?s:s[0],i._collector.components=i._collector.components.concat(o.data.components),i._collector.refs=i._collector.refs.concat(o.data.refs),o.set({components:[i],refs:[]});for(var c=0;c<i._collector.components.length;c++)i._collector.components[c]._parent=i;return o.get()}(t,o,e):void 0}function u(t,e,n){var o=t._collector&&t._collector.components;if(n&&e(t),o)for(var r=0;r<o.length;r++)u(o[r],e);n||e(t)}function f(t){for(var e=0;e<t._collector.refs.length;e++)t._collector.refs[e].fn(t._collector.refs[e].ref),t._collector.refs[e].ref=null}function d(t,e,n){var o=0,r=a(t);if("function"==typeof e)e(r.nodes.length<2?r.nodes[0]:r.nodes);else if(e)for(o=0;o<r.nodes.length;o++)e.appendChild(r.nodes[o]);var i={_collector:r};if(u(i,f),u(i,function(t){t.mounted=!0,t.componentDidMount&&t.componentDidMount(t.props)}),n&&n._collector){var l=n._collector;for(o=0;o<r.components.length;o++)r.components[o]._parent=n;l.refs&&(l.refs=l.refs.concat(r.refs)),l.components&&(l.components=l.components.concat(r.components))}return i=void 0,r}function h(t){this._parent=null,this._collector={refs:[],components:[]},this.props=t||{},this.base=null,this.mounted=!1}function m(t){return e("button",{className:"btn",ref:t.ref},"Remove: ",t.children)}h.prototype.template=function(){},h.prototype.componentWillMount=function(){},h.prototype.componentDidMount=function(){},h.prototype.componentWillUnmount=function(){},h.prototype.render=function(t,e){d(t,e,this)},h.prototype.destroy=function(){var t=0;for(this.componentWillUnmount(this.props),t=this._collector.components.length-1;t>=0;t--)this._collector.components[t].destroy();if(this.mounted=!1,this._parent){var e=this._parent._collector.components.indexOf(this);~e&&this._parent._collector.components.splice(e,1),this._parent=null}for(t=this._collector.refs.length-1;t>=0;t--)this._collector.refs[t].fn(null),this._collector.refs.splice(t,1);var n=Array.isArray(this.base)?this.base:[this.base];for(t=0;t<n.length;t++)n[t]&&n[t].parentNode&&n[t].parentNode.removeChild(n[t]);this.base=n=null,this.props={}};var _,y=function(t){function n(){t.apply(this,arguments)}return t&&(n.__proto__=t),(n.prototype=Object.create(t&&t.prototype)).constructor=n,n.prototype.template=function(){return e("span",null)},n.prototype.increment=function(){this.base.textContent=" Alive since "+this.count+++"sec",console.log("increment")},n.prototype.componentDidMount=function(){this.count=0,this.increment=this.increment.bind(this),this.increment(),this.timer=window.setInterval(this.increment,1e3)},n.prototype.componentWillUnmount=function(){clearInterval(this.timer)},n}(h),v=function(n){function o(){n.apply(this,arguments)}return n&&(o.__proto__=n),(o.prototype=Object.create(n&&n.prototype)).constructor=o,o.prototype.template=function(n){var o=n.count;return e("li",null,e("button",{className:"btn primary",ref:t(this,"addButton")},"Add list"),e(m,{ref:t(this,"removeButton")},"item ",o),e(y,null))},o.prototype.addList=function(){this.render(e(b,null),this.base)},o.prototype.componentDidMount=function(){this.destroy=this.destroy.bind(this),this.addList=this.addList.bind(this),this.removeButton.addEventListener("click",this.destroy),this.addButton.addEventListener("click",this.addList)},o.prototype.componentWillUnmount=function(){console.log("remove",this.props.count),this.removeButton.removeEventListener("click",this.destroy),this.addButton.removeEventListener("click",this.addList)},o}(h),b=function(n){function o(){n.apply(this,arguments)}return n&&(o.__proto__=n),(o.prototype=Object.create(n&&n.prototype)).constructor=o,o.prototype.template=function(){return e("div",{style:"border-left: 2px solid black; padding-left: 10px"},e("ul",{ref:t(this,"ul")}),e("button",{className:"btn primary",ref:t(this,"button")},"Add item"))},o.prototype.componentDidMount=function(){this.count=0,this.addItem=this.addItem.bind(this),this.button.addEventListener("click",this.addItem)},o.prototype.addItem=function(){this.render(e(v,{count:++this.count}),this.ul)},o.prototype.componentWillUnmount=function(){this.button.removeEventListener("click",this.addItem)},o}(h),g=function(t){function n(){t.apply(this,arguments)}return t&&(n.__proto__=t),(n.prototype=Object.create(t&&t.prototype)).constructor=n,n.prototype.template=function(){var t=this.props.base;return delete this.props.base,t},n.prototype.componentDidMount=function(){var t=this;this.base.style.paddingTop="20px",this.render(e("h4",null,"List component:"),this.base),this.render(e(b,null),this.base),this.base.addEventListener("click",function(){console.log(t)})},n}(h);d(e(g,{base:document.querySelector("main")})),d(e(function(){return e("div",null,e("br",null),e("h4",null,"SVG support:"),e("svg",{version:"1.1",id:"Calque_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"150px",x:"0px",y:"0px",viewBox:"0 0 192 205",xmlSpace:"preserve","enable-background":"new 0 0 192 205"},e("g",null,e("defs",null,e("path",{id:"SVGID_1_",d:"M53,1h86c29.3,0,53,23.7,53,53v98c0,29.3-23.7,53-53,53H53c-29.3,0-53-23.7-53-53V54C0,24.7,23.7,1,53,1z"})),e("clipPath",{id:"SVGID_2_"},e("use",{xlinkHref:"#SVGID_1_",overflow:"visible"})),e("rect",{x:"-5",y:"-4",width:"202",height:"214","clip-path":"url(#SVGID_2_)",fill:"#f4f4f4"})),e("g",null,e("defs",null,e("rect",{id:"SVGID_3_",x:"31.9",y:"30.8",width:"52.5",height:"52.3"})),e("clipPath",{id:"SVGID_4_"},e("use",{xlinkHref:"#SVGID_3_",overflow:"visible"})),e("rect",{x:"26.9",y:"25.8",width:"62.5",height:"62.3","clip-path":"url(#SVGID_4_)",fill:"#fdaa02"})),e("g",null,e("defs",null,e("polygon",{id:"SVGID_5_",points:"137.5,31 164,84 111,84"})),e("clipPath",{id:"SVGID_6_"},e("use",{xlinkHref:"#SVGID_5_",overflow:"visible"})),e("g",{"clip-path":"url(#SVGID_6_)","enable-background":"new"},e("g",null,e("defs",null,e("rect",{id:"SVGID_7_",x:"84",y:"4",width:"107",height:"107"})),e("clipPath",{id:"SVGID_8_"},e("use",{xlinkHref:"#SVGID_7_",overflow:"visible"})),e("g",{"clip-path":"url(#SVGID_8_)"},e("defs",null,e("rect",{id:"SVGID_9_",x:"111",y:"31",width:"54",height:"54"})),e("clipPath",{id:"SVGID_10_"},e("use",{xlinkHref:"#SVGID_9_",overflow:"visible"})),e("rect",{x:"106",y:"26",width:"63",height:"63","clip-path":"url(#SVGID_10_)",fill:"#fff"})),e("g",{"clip-path":"url(#SVGID_8_)"},e("defs",null,e("rect",{id:"SVGID_11_",x:"95.2",y:"15.2",transform:"matrix(0.9511 -0.309 0.309 0.9511 -10.9749 45.2164)",width:"84",height:"84"})),e("clipPath",{id:"SVGID_12_"},e("use",{xlinkHref:"#SVGID_11_",overflow:"visible"})),e("g",{"clip-path":"url(#SVGID_12_)"},e("defs",null,e("rect",{id:"SVGID_13_",x:"111",y:"31",width:"54",height:"54"})),e("clipPath",{id:"SVGID_14_"},e("use",{xlinkHref:"#SVGID_13_",overflow:"visible"})),e("rect",{x:"84.2",y:"21.2",transform:"matrix(0.9511 -0.309 0.309 0.9511 -14.6678 43.9006)",width:"94",height:"94","clip-path":"url(#SVGID_14_)"})))))),e("path",{fill:"none",stroke:"#000","stroke-miterlimit":"10",d:"M70.6 160.2c-1.1-2.1-1.5-4.4-1.4-6.9l-8.4 4.1 9.8 2.8zm32.1-43.7C92.2 120 84 127.2 75.8 138.2c-1 1.3-1.9 2.7-2.6 3.9-1.8.1-3.7-.2-5.6-1-15.9-6.8 21.6-18.3 10.8-24.7-1.6-1-3.2-1.7-4.7-2.2L55 140.7l15.6 6.7c.6-1.7 1.5-3.5 2.6-5.3 12.7-.8 20.7-22 23.2-14.6.8 2.4 1.9 5.9 3 9.9 11.3-9 19.7-16.8 25.2-23.2 1.3.1 2.7.2 4.1.4 5.2.6 9.2 1.1 12.2 1.6 2.6 4.5 5.4 10.7 8.4 18.6-1 4.4-3.2 9.7-6.7 14.9l-32.4 14.8-6.9-3c0 2.7-.1 5.3-.5 7.7l5.7 1.6c10-1.2 18.1-5.2 24.5-10.3l-2.2-26-28.1-18zm-.1 52.7l-32-8.9c3.6 6.8 13.9 10.9 31.6 10.9.1-.3.2-.5.2-.8.1-.5.2-.9.2-1.2zm-3.2-31.7c-1.3 1.1-2.7 2.2-4.2 3.3l-26 12.6c.1-1.9.6-3.8 1.4-5.9l32.6 14.1c-.1-8.1-2-17-3.8-24.1zm3.3-21c6.3-2.1 13.4-2.8 21.9-2.2 1.4-1.7 2.6-3.3 3.7-4.8 3.2-4.7 7.4-2.5 12.6 6.8 11.3 1.9 9 4.3 9 13.9 0 1.4-.2 2.9-.6 4.6 1.2 3.1 2.5 6.5 3.8 10.2l-10.5 4.8c-2.5 3.8-5.8 7.5-9.7 10.7l1.5 17.6-25.9-7.2c-2 .2-4 .4-6.1.4-4.4 12.2-44.6 5.7-57.1-.8-12.8-6.7-6.5-28.4-6.5-31.6 0-3.1 3.7-19.9 13.1-22.3 8-2 13.9-5.2 22.1-2.2l7.9-11.2 20.8 13.3z"})))},null),document.body),d([e("h4",null,"Inline video support:"),e("video",{width:"300",src:"https://antoine.cool/content/2-projects/1-copilote/preview.mobile.mp4",autoplay:!0,muted:!0,playsinline:!0})],document.body),d([e("h4",null,"Data attributes support:"),e("div",{class:"datatest",ref:function(t){_=t},"data-a":"data is","data-b":"working"})],document.body),_.textContent=_.dataset.a});
//# sourceMappingURL=dom.umd.js.map
