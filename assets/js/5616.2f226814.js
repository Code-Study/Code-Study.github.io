/*! For license information please see 5616.2f226814.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5616],{5616:()=>{const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),r=Symbol("Comlink.finalizer"),o=Symbol("Comlink.thrown"),i=e=>"object"==typeof e&&null!==e||"function"==typeof e,s={canHandle:t=>i(t)&&t[e],serialize(e){const{port1:t,port2:n}=new MessageChannel;return c(e,t),[n,[n]]},deserialize:e=>(e.start(),function(e,t){const n=new Map;return e.addEventListener("message",(function(e){const{data:t}=e;if(!t||!t.id)return;const r=n.get(t.id);if(r)try{r(t)}finally{n.delete(t.id)}})),y(e,n,[],t)}(e))},a=new Map([["proxy",s],["throw",{canHandle:e=>i(e)&&o in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function c(t,n=globalThis,i=["*"]){n.addEventListener("message",(function s(a){if(!a||!a.data)return;if(!function(e,t){for(const n of e){if(t===n||"*"===n)return!0;if(n instanceof RegExp&&n.test(t))return!0}return!1}(i,a.origin))return void console.warn(`Invalid origin '${a.origin}' for comlink proxy`);const{id:u,type:p,path:d}=Object.assign({path:[]},a.data),f=(a.data.argumentList||[]).map(g);let y;try{const n=d.slice(0,-1).reduce(((e,t)=>e[t]),t),r=d.reduce(((e,t)=>e[t]),t);switch(p){case"GET":y=r;break;case"SET":n[d.slice(-1)[0]]=g(a.data.value),y=!0;break;case"APPLY":y=r.apply(n,f);break;case"CONSTRUCT":y=function(t){return Object.assign(t,{[e]:!0})}(new r(...f));break;case"ENDPOINT":{const{port1:e,port2:n}=new MessageChannel;c(t,n),y=function(e,t){return m.set(e,t),e}(e,[e])}break;case"RELEASE":y=void 0;break;default:return}}catch(h){y={value:h,[o]:0}}Promise.resolve(y).catch((e=>({value:e,[o]:0}))).then((e=>{const[o,i]=b(e);n.postMessage(Object.assign(Object.assign({},o),{id:u}),i),"RELEASE"===p&&(n.removeEventListener("message",s),l(n),r in t&&"function"==typeof t[r]&&t[r]())})).catch((e=>{const[t,r]=b({value:new TypeError("Unserializable return value"),[o]:0});n.postMessage(Object.assign(Object.assign({},t),{id:u}),r)}))})),n.start&&n.start()}function l(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function u(e){if(e)throw new Error("Proxy has been released and is not useable")}function p(e){return v(e,new Map,{type:"RELEASE"}).then((()=>{l(e)}))}const d=new WeakMap,f="FinalizationRegistry"in globalThis&&new FinalizationRegistry((e=>{const t=(d.get(e)||0)-1;d.set(e,t),0===t&&p(e)}));function y(e,r,o=[],i=function(){}){let s=!1;const a=new Proxy(i,{get(t,i){if(u(s),i===n)return()=>{!function(e){f&&f.unregister(e)}(a),p(e),r.clear(),s=!0};if("then"===i){if(0===o.length)return{then:()=>a};const t=v(e,r,{type:"GET",path:o.map((e=>e.toString()))}).then(g);return t.then.bind(t)}return y(e,r,[...o,i])},set(t,n,i){u(s);const[a,c]=b(i);return v(e,r,{type:"SET",path:[...o,n].map((e=>e.toString())),value:a},c).then(g)},apply(n,i,a){u(s);const c=o[o.length-1];if(c===t)return v(e,r,{type:"ENDPOINT"}).then(g);if("bind"===c)return y(e,r,o.slice(0,-1));const[l,p]=h(a);return v(e,r,{type:"APPLY",path:o.map((e=>e.toString())),argumentList:l},p).then(g)},construct(t,n){u(s);const[i,a]=h(n);return v(e,r,{type:"CONSTRUCT",path:o.map((e=>e.toString())),argumentList:i},a).then(g)}});return function(e,t){const n=(d.get(t)||0)+1;d.set(t,n),f&&f.register(e,t,e)}(a,e),a}function h(e){const t=e.map(b);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const m=new WeakMap;function b(e){for(const[t,n]of a)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},o]}return[{type:"RAW",value:e},m.get(e)||[]]}function g(e){switch(e.type){case"HANDLER":return a.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,n,r){return new Promise((o=>{const i=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");t.set(i,o),e.start&&e.start(),e.postMessage(Object.assign({id:i},n),r)}))}var _,w=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(t){i(t)}}function a(e){try{c(r.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},E=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(c){a=[6,c],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},k=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},S=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s};importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"),"localhost"!==self.location.hostname&&(console.log=function(){},console.error=function(){});var P={getInput:function(e,t){var n=new XMLHttpRequest;return n.open("GET","/react-py-get-input/?id=".concat(e,"&prompt=").concat(encodeURIComponent(t)),!1),n.send(null),n.responseText}},A=function(e){return'\nimport sys, builtins\nimport react_py\n__prompt_str__ = ""\ndef get_input(prompt=""):\n    global __prompt_str__\n    __prompt_str__ = prompt\n    print(prompt, end="")\n    s = react_py.getInput("'.concat(e,'", prompt)\n    print()\n    return s\nbuiltins.input = get_input\nsys.stdin.readline = lambda: react_py.getInput("').concat(e,'", __prompt_str__)\n')};c({init:function(e,t,n,r){return w(this,void 0,void 0,(function(){var o,i,s,a,c,l,u,p,d;return E(this,(function(f){switch(f.label){case 0:return o=self,[4,self.loadPyodide({stdout:e})];case 1:return o.pyodide=f.sent(),[4,self.pyodide.loadPackage(["pyodide-http"])];case 2:return f.sent(),r&&r[0].length>0?[4,self.pyodide.loadPackage(r[0])]:[3,4];case 3:f.sent(),f.label=4;case 4:return r&&r[1].length>0?[4,self.pyodide.loadPackage(["micropip"])]:[3,7];case 5:return f.sent(),[4,self.pyodide.pyimport("micropip").install(r[1])];case 6:f.sent(),f.label=7;case 7:return i=self.crypto.randomUUID(),s=self.pyodide.version,self.pyodide.registerJsModule("react_py",P),[4,self.pyodide.runPythonAsync("\nimport sys\nimport pyodide_http\n\nsys.tracebacklimit = 0\n\npyodide_http.patch_all()\n")];case 8:return f.sent(),"console"!==n?[3,11]:(a=self.pyodide.globals.get("dict")(),[4,self.pyodide.runPythonAsync('\nimport sys\nfrom pyodide.ffi import to_js\nfrom pyodide.console import PyodideConsole, repr_shorten, BANNER\nimport __main__\nBANNER = "Welcome to the Pyodide terminal emulator \ud83d\udc0d\\n" + BANNER\npyconsole = PyodideConsole(__main__.__dict__)\nimport builtins\nasync def await_fut(fut):\n  res = await fut\n  if res is not None:\n    builtins._ = res\n  return to_js([res], depth=1)\ndef clear_console():\n  pyconsole.buffer = []\n',{globals:a})]);case 9:return f.sent(),c=a.get("repr_shorten"),l=a.get("BANNER"),u=a.get("await_fut"),p=a.get("pyconsole"),d=a.get("clear_console"),p.stdout_callback=e,_={reprShorten:c,awaitFut:u,pyconsole:p,clearConsole:d},[4,self.pyodide.runPythonAsync(A(i),{globals:a})];case 10:return f.sent(),t({id:i,version:s,banner:l}),[3,13];case 11:return[4,self.pyodide.runPythonAsync(A(i))];case 12:f.sent(),t({id:i,version:s}),f.label=13;case 13:return[2]}}))}))},run:function(e,t){return w(this,void 0,void 0,(function(){var n,r,o,i,s,a,c,l,u,p,d,f,y;return E(this,(function(h){switch(h.label){case 0:return t?[4,self.pyodide.loadPackagesFromImports(e)]:[3,2];case 1:h.sent(),h.label=2;case 2:if(!_)return[3,14];if(!_)throw new Error("Console has not been initialised");if(void 0===e)throw new Error("No code to push");n=void 0,h.label=3;case 3:h.trys.push([3,11,12,13]),r=k(e.split("\n")),o=r.next(),h.label=4;case 4:if(o.done)return[3,10];i=o.value,s=_.pyconsole.push(i),n=s.syntax_check,a=_.awaitFut(s),h.label=5;case 5:return h.trys.push([5,7,8,9]),[4,a];case 6:return c=S.apply(void 0,[h.sent(),1]),(l=c[0])instanceof self.pyodide.ffi.PyProxy&&l.destroy(),[3,9];case 7:if("PythonError"===(u=h.sent()).constructor.name)return p=s.formatted_error||u.message,[2,{state:n,error:p.trimEnd()}];throw u;case 8:return s.destroy(),a.destroy(),[7];case 9:return o=r.next(),[3,4];case 10:return[3,13];case 11:return d=h.sent(),f={error:d},[3,13];case 12:try{o&&!o.done&&(y=r.return)&&y.call(r)}finally{if(f)throw f.error}return[7];case 13:return[2,{state:n}];case 14:return[4,self.pyodide.runPythonAsync(e)];case 15:h.sent(),h.label=16;case 16:return[2]}}))}))},readFile:function(e){return self.pyodide.FS.readFile(e,{encoding:"utf8"})},writeFile:function(e,t){return self.pyodide.FS.writeFile(e,t,{encoding:"utf8"})},mkdir:function(e){self.pyodide.FS.mkdir(e)},rmdir:function(e){self.pyodide.FS.rmdir(e)}})}}]);