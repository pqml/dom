!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@internet/raf")):"function"==typeof define&&define.amd?define(["@internet/raf"],t):t(e.raf)}(this,function(e){e=e&&e.hasOwnProperty("default")?e.default:e;var t={transform:["-webkit-","-ms-"]};function n(e,n){for(var r in n)if(e.style[r]=n[r],t[r])for(var o=t[r],f=0;f<o.length;f++)e.style[o[f]+r]=n[r];return e}function r(e,t){for(var n in t)e.dataset[n]=t[n];return e}function o(e,t){for(var n in t)e.setAttribute(n,t[n]);return e}function f(e,t){var n;n=t,t=Array.isArray(n)?n:[n];for(var r=0;r<t.length;r++)e.list.add(t[r]);return e}function a(e,t,a){t||(t={});var i=document.createElement(e);for(var s in t)"classes"===s||"classlist"===s?f(i,t[s]):"css"===s?n(i,t[s]):"attributes"===s||"attr"===s?o(i,t[s]):"dataset"===s||"data"===s?r(i,t[s]):"ref"!==s&&(i[s]=t[s]);if(a)for(var u=0;u<a.length;u++){var c=a[u],l=typeof c;i.appendChild("string"!==l&&"number"!==l&&"boolean"!==l&&"number"!==l&&c?c:document.createTextNode(c+""))}return"function"==typeof t.ref&&t.ref(i),i}var i,s=function(e,t){null===t&&(t={});var n,r,o=t.ref;delete t.ref;var f=[].concat.apply([],[].slice.call(arguments,2)),a=[];for(n=0;n<f.length;n++){var i=f[n];if("string"==typeof i||"number"==typeof i)a.push(document.createTextNode(i));else{if(!i)continue;a.push(i)}}if("string"==typeof e){var s=document.createElement(e);for(r in t)u(s,r,t[r]);for(n=0;n<a.length;n++)s.appendChild(a[n]);return o&&o(s),s}if("function"==typeof e){var c;t.children=f;var l=!e.prototype||"function"!=typeof e.prototype.render;if(l)c=e(t),o&&o(c);else{var d=new e(t);c=d.render(t),o&&o(d)}return c}};function u(e,t,n){var r;("class"===t&&(t="className"),"function"==typeof n&&t.substr(0,(r="on").length)===r)?e[t.slice(2).toLowerCase()]=n:"checked"===t||"value"===t||"className"===t?e[t]=n:"style"===t?"object"==typeof n?Object.assign(e.style,n):"string"==typeof n&&(e.style.cssText=n):"object"!=typeof n&&"function"!=typeof n&&e.setAttribute(t,n)}function c(e){return[e.name,s("span",{style:{color:"red"}})]}a("div",{ref:function(e){document.body.appendChild(e)}},["Debug :",a("pre",{ref:function(e){i=e}})]),i.textContent=s("div",{class:"test"},"generated from lib/jsx ",s(function(e){return s("p",null,e.name," ",s(c,{name:"nested"}))},{name:"component"})).outerHTML});
//# sourceMappingURL=dom.umd.js.map
