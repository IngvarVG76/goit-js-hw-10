function t(t){return t&&t.__esModule?t.default:t}var e,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,u=/^0o[0-7]+$/i,c=parseInt,f="object"==typeof n&&n&&n.Object===Object&&n,a="object"==typeof self&&self&&self.Object===Object&&self,s=f||a||Function("return this")(),l=Object.prototype.toString,d=Math.max,v=Math.min,m=function(){return s.Date.now()};function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(p(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=p(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(o,"");var n=i.test(t);return n||u.test(t)?c(t.slice(2),n?2:8):r.test(t)?NaN:+t}e=function(t,e,n){var o,r,i,u,c,f,a=0,s=!1,l=!1,h=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var n=o,i=r;return o=r=void 0,a=e,u=t.apply(i,n)}function g(t){return a=t,c=setTimeout(x,e),s?b(t):u}function j(t){var n=t-f;return void 0===f||n>=e||n<0||l&&t-a>=i}function x(){var t=m();if(j(t))return T(t);c=setTimeout(x,function(t){var n=e-(t-f);return l?v(n,i-(t-a)):n}(t))}function T(t){return c=void 0,h&&o?b(t):(o=r=void 0,u)}function w(){var t=m(),n=j(t);if(o=arguments,r=this,f=t,n){if(void 0===c)return g(f);if(l)return c=setTimeout(x,e),b(f)}return void 0===c&&(c=setTimeout(x,e)),u}return e=y(e)||0,p(n)&&(s=!!n.leading,i=(l="maxWait"in n)?d(y(n.maxWait)||0,e):i,h="trailing"in n?!!n.trailing:h),w.cancel=function(){void 0!==c&&clearTimeout(c),a=0,o=f=r=c=void 0},w.flush=function(){return void 0===c?u:T(m())},w};const h={searchBox:document.getElementById("search-box"),countryList:document.querySelector("country-list"),countryInfo:document.querySelector("country-info")};fetch("https://restcountries.com/v2/name/ukr").then((t=>t.json().then(console.log)));h.searchBox.addEventListener("input",t(e)((()=>{const t=h.searchBox.value.trim();console.log(t),(console.log("https://restcountries.com/v3.1/name/${name}"),fetch("https://restcountries.com/v3.1/name/${name}").then((t=>t.json()))).then((t=>{console.log(t)})).catch((t=>console.error(t)))}),300));
//# sourceMappingURL=index.3cf79d1c.js.map
