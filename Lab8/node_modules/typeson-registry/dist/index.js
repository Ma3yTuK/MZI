function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n);}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));}));}return e}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n);}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,r){return (t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _slicedToArray(e,t){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArrayLimit(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,c=[],s=!0,u=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1;}else for(;!(s=(n=i.call(r)).done)&&(c.push(n.value),c.length!==t);s=!0);}catch(e){u=!0,o=e;}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,t)||_unsupportedIterableToArray(e,t)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _toConsumableArray(e){return function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||_unsupportedIterableToArray(e)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return "Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return ("string"===t?String:Number)(e)}(e,"string");return "symbol"==typeof t?t:String(t)}var e=_createClass((function TypesonPromise(e){_classCallCheck(this,TypesonPromise),this.p=new Promise(e);}));e.__typeson__type__="TypesonPromise","undefined"!=typeof Symbol&&Object.defineProperty(e.prototype,Symbol.toStringTag,{get:function get(){return "TypesonPromise"}}),e.prototype.then=function(t,r){var n=this;return new e((function(e,o){n.p.then((function(r){e(t?t(r):r);})).catch((function(e){return r?r(e):Promise.reject(e)})).then(e,o);}))},e.prototype.catch=function(e){return this.then((function(){}),e)},e.resolve=function(t){return new e((function(e){e(t);}))},e.reject=function(t){return new e((function(e,r){r(t);}))},e.all=function(t){return new e((function(e,r){Promise.all(t.map((function(e){return null!=e&&e.constructor&&"__typeson__type__"in e.constructor&&"TypesonPromise"===e.constructor.__typeson__type__?e.p:e}))).then(e,r);}))},e.race=function(t){return new e((function(e,r){Promise.race(t.map((function(e){return null!=e&&e.constructor&&"__typeson__type__"in e.constructor&&"TypesonPromise"===e.constructor.__typeson__type__?e.p:e}))).then(e,r);}))},e.allSettled=function(t){return new e((function(e,r){Promise.allSettled(t.map((function(e){return null!=e&&e.constructor&&"__typeson__type__"in e.constructor&&"TypesonPromise"===e.constructor.__typeson__type__?e.p:e}))).then(e,r);}))};var t=Object.hasOwn,r=Object.getPrototypeOf;function isThenable(e,t){return isObject(e)&&"function"==typeof e.then&&(!t||"function"==typeof e.catch)}function toStringTag(e){return Object.prototype.toString.call(e).slice(8,-1)}function hasConstructorOf(e,n){if(!e||"object"!==_typeof(e))return !1;var o=r(e);if(!o)return null===n;var i=t(o,"constructor")&&o.constructor;return "function"!=typeof i?null===n:n===i||(null!==n&&Function.prototype.toString.call(i)===Function.prototype.toString.call(n)||"function"==typeof n&&"string"==typeof i.__typeson__type__&&i.__typeson__type__===n.__typeson__type__)}function isPlainObject(e){return !(!e||"Object"!==toStringTag(e))&&(!r(e)||hasConstructorOf(e,Object))}function isUserObject(e){if(!e||"Object"!==toStringTag(e))return !1;var t=r(e);return !t||(hasConstructorOf(e,Object)||isUserObject(t))}function isObject(e){return null!==e&&"object"===_typeof(e)}function escapeKeyPathComponent(e){return e.replaceAll("''","''''").replace(/^$/,"''").replaceAll("~","~0").replaceAll(".","~1")}function unescapeKeyPathComponent(e){return e.replaceAll("~1",".").replaceAll("~0","~").replace(/^''$/,"").replaceAll("''''","''")}function getByKeyPath(e,t){if(""===t)return e;if(null===e||"object"!==_typeof(e))throw new TypeError("Unexpected non-object type");var r=t.indexOf(".");if(r>-1){var n=e[unescapeKeyPathComponent(t.slice(0,r))];return void 0===n?void 0:getByKeyPath(n,t.slice(r+1))}return e[unescapeKeyPathComponent(t)]}function setAtKeyPath(e,t,r){if(""===t)return r;if(!e||"object"!==_typeof(e))throw new TypeError("Unexpected non-object type");var n=t.indexOf(".");return n>-1?setAtKeyPath(e[unescapeKeyPathComponent(t.slice(0,n))],t.slice(n+1),r):(e[unescapeKeyPathComponent(t)]=r,e)}function getJSONType(e){return null===e?"null":Array.isArray(e)?"array":_typeof(e)}function _await(e,t,r){return (e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}var n=Object.keys,o=Object.hasOwn,i$1=Array.isArray,a=["type","replaced","iterateIn","iterateUnsetNumeric","addLength"];function _async(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function nestedPathsFirst(e,t){var r,n;if(""===e.keypath)return -1;var o=null!==(r=e.keypath.match(/\./g))&&void 0!==r?r:0,i=null!==(n=t.keypath.match(/\./g))&&void 0!==n?n:0;return o&&(o=o.length),i&&(i=i.length),o>i?-1:o<i?1:e.keypath<t.keypath?-1:e.keypath>t.keypath?1:0}var c=function(){function Typeson(e){_classCallCheck(this,Typeson),this.options=e,this.plainObjectReplacers=[],this.nonplainObjectReplacers=[],this.revivers={},this.types={};}return _createClass(Typeson,[{key:"stringify",value:function stringify(e,t,r,n){n=_objectSpread2(_objectSpread2(_objectSpread2({},this.options),n),{},{stringification:!0});var o=this.encapsulate(e,null,n);return i$1(o)?JSON.stringify(o[0],t,r):o.then((function(e){return JSON.stringify(e,t,r)}))}},{key:"stringifySync",value:function stringifySync(e,t,r,n){return this.stringify(e,t,r,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},n),{},{sync:!0}))}},{key:"stringifyAsync",value:function stringifyAsync(e,t,r,n){return this.stringify(e,t,r,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},n),{},{sync:!1}))}},{key:"parse",value:function parse(e,t,r){return r=_objectSpread2(_objectSpread2(_objectSpread2({},this.options),r),{},{parse:!0}),this.revive(JSON.parse(e,t),r)}},{key:"parseSync",value:function parseSync(e,t,r){return this.parse(e,t,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},r),{},{sync:!0}))}},{key:"parseAsync",value:function parseAsync(e,t,r){return this.parse(e,t,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},r),{},{sync:!1}))}},{key:"specialTypeNames",value:function specialTypeNames(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.returnTypeNames=!0,this.encapsulate(e,t,r)}},{key:"rootTypeName",value:function rootTypeName(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.iterateNone=!0,this.encapsulate(e,t,r)}},{key:"encapsulate",value:function encapsulate(t,r,c){var s=this,u=_objectSpread2(_objectSpread2({sync:!0},this.options),c),l=u.sync,y={},p=[],f=[],v=[],h=!("cyclic"in u)||u.cyclic,d=u.encapsulateObserver,b=function finish(e){var t=Object.values(y);if(u.iterateNone)return t.length?t[0]:getJSONType(e);if(t.length){if(u.returnTypeNames)return _toConsumableArray(new Set(t));e&&isPlainObject(e)&&!o(e,"$types")?e.$types=y:e={$:e,$types:{$:y}};}else isObject(e)&&o(e,"$types")&&(e={$:e,$types:!0});return !u.returnTypeNames&&e},_=_async((function(t,r){return _await(Promise.all(r.map((function(e){return e[1].p}))),(function(n){return _await(Promise.all(n.map(_async((function(n){var o=!1,i=[],a=_slicedToArray(r.splice(0,1),1),c=_slicedToArray(a[0],7),s=c[0],u=c[2],l=c[3],y=c[4],p=c[5],f=c[6],v=m(s,n,u,l,i,!0,f),h=hasConstructorOf(v,e);return function _invoke(e,t){var r=e();return r&&r.then?r.then(t):t(r)}((function(){if(s&&h)return _await(v.p,(function(e){y[p]=e;var r=_(t,i);return o=!0,r}))}),(function(e){return o?e:(s?y[p]=v:t=h?v.p:v,_(t,i))}))})))),(function(){return t}))}))})),O=function _adaptBuiltinStateObjectProperties(e,t,r){Object.assign(e,t);var n=a.map((function(t){var r=e[t];return delete e[t],r}));r(),a.forEach((function(t,r){e[t]=n[r];}));},m=function _encapsulate(t,r,a,c,l,v,h){var b,_={},m=_typeof(r),g=d?function(n){var o,i=null!==(o=null!=h?h:c.type)&&void 0!==o?o:getJSONType(r);d(Object.assign(null!=n?n:_,{keypath:t,value:r,cyclic:a,stateObj:c,promisesData:l,resolvingTypesonPromise:v,awaitingTypesonPromise:hasConstructorOf(r,e)},{type:i}));}:null;if(["string","boolean","number","undefined"].includes(m))return void 0===r||Number.isNaN(r)||r===Number.NEGATIVE_INFINITY||r===Number.POSITIVE_INFINITY||0===r?(b=c.replaced?r:j(t,r,c,l,!1,v,g))!==r&&(_={replaced:b}):b=r,g&&g(),b;if(null===r)return g&&g(),r;if(a&&!c.iterateIn&&!c.iterateUnsetNumeric&&r&&"object"===_typeof(r)){var S=p.indexOf(r);if(!(S<0))return y[t]="#",g&&g({cyclicKeypath:f[S]}),"#"+f[S];!0===a&&(p.push(r),f.push(t));}var P,T,w=isPlainObject(r),A=i$1(r),C=(w||A)&&(!s.plainObjectReplacers.length||c.replaced)||c.iterateIn?r:j(t,r,c,l,w||A,null,g);if(C!==r?(b=C,_={replaced:C}):""===t&&hasConstructorOf(r,e)?(l.push([t,r,a,c,void 0,void 0,c.type]),b=r):A&&"object"!==c.iterateIn||"array"===c.iterateIn?(P=new Array(r.length),_={clone:P}):(["function","symbol"].includes(_typeof(r))||"toJSON"in r||hasConstructorOf(r,e)||hasConstructorOf(r,Promise)||hasConstructorOf(r,ArrayBuffer))&&!w&&"object"!==c.iterateIn?b=r:(P={},c.addLength&&(P.length=r.length),_={clone:P}),g&&g(),u.iterateNone)return null!==(T=P)&&void 0!==T?T:b;if(!P)return b;if(c.iterateIn){var k=function _loop(n){var i={ownKeys:o(r,n)};O(c,i,(function(){var o=t+(t?".":"")+escapeKeyPathComponent(n),i=_encapsulate(o,r[n],Boolean(a),c,l,v);hasConstructorOf(i,e)?l.push([o,i,Boolean(a),c,P,n,c.type]):void 0!==i&&(P[n]=i);}));};for(var N in r)k(N);g&&g({endIterateIn:!0,end:!0});}else n(r).forEach((function(n){var o=t+(t?".":"")+escapeKeyPathComponent(n);O(c,{ownKeys:!0},(function(){var t=_encapsulate(o,r[n],Boolean(a),c,l,v);hasConstructorOf(t,e)?l.push([o,t,Boolean(a),c,P,n,c.type]):void 0!==t&&(P[n]=t);}));})),g&&g({endIterateOwn:!0,end:!0});if(c.iterateUnsetNumeric){for(var I=r.length,E=function _loop2(n){if(!(n in r)){var o="".concat(t).concat(t?".":"").concat(n);O(c,{ownKeys:!1},(function(){var t=_encapsulate(o,void 0,Boolean(a),c,l,v);hasConstructorOf(t,e)?l.push([o,t,Boolean(a),c,P,n,c.type]):void 0!==t&&(P[n]=t);}));}},K=0;K<I;K++)E(K);g&&g({endIterateUnsetNumeric:!0,end:!0});}return P},j=function replace(e,t,r,n,o,i,a){for(var c=o?s.plainObjectReplacers:s.nonplainObjectReplacers,u=c.length;u--;){var p=c[u];if(p.test(t,r)){var f=p.type;if(s.revivers[f]){var v=y[e];y[e]=v?[f].concat(v):f;}if(Object.assign(r,{type:f,replaced:!0}),(l||!p.replaceAsync)&&!p.replace)return a&&a({typeDetected:!0}),m(e,t,h&&"readonly",r,n,i,f);a&&a({replacing:!0});var d=void 0;if(l||!p.replaceAsync){if(void 0===p.replace)throw new TypeError("Missing replacer");d=p.replace(t,r);}else d=p.replaceAsync(t,r);return m(e,d,h&&"readonly",r,n,i,f)}}return t},g=m("",t,h,null!=r?r:{},v);if(v.length)return l&&u.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():Promise.resolve(_(g,v)).then(b);if(!l&&u.throwOnBadSyncType)throw new TypeError("Async method requested but sync result obtained");return u.stringification&&l?[b(g)]:l?b(g):Promise.resolve(b(g))}},{key:"encapsulateSync",value:function encapsulateSync(e,t,r){return this.encapsulate(e,t,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},r),{},{sync:!0}))}},{key:"encapsulateAsync",value:function encapsulateAsync(e,t,r){return this.encapsulate(e,t,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},r),{},{sync:!1}))}},{key:"revive",value:function revive(t,r){var o=this,a=_objectSpread2(_objectSpread2({sync:!0},this.options),r),c=a.sync;function finishRevival(e){if(c)return e;if(a.throwOnBadSyncType)throw new TypeError("Async method requested but sync result obtained");return Promise.resolve(e)}if(!t||"object"!==_typeof(t)||Array.isArray(t))return finishRevival(t);var u=t.$types;if(!0===u)return finishRevival(t.$);if(!u||"object"!==_typeof(u)||Array.isArray(u))return finishRevival(t);var l=[],y={},p=!0;u.$&&isPlainObject(u.$)&&(t=t.$,u=u.$,p=!1);var f=function executeReviver(e,t){var r,n=_slicedToArray(null!==(r=o.revivers[e])&&void 0!==r?r:[],1)[0];if(!n)throw new Error("Unregistered type: "+e);if(c&&!("revive"in n))return t;if(!c&&n.reviveAsync)return n.reviveAsync(t,y);if(n.revive)return n.revive(t,y);throw new Error("Missing reviver")},v=[];function checkUndefined(e){return hasConstructorOf(e,s)?void 0:e}var h,d=function revivePlainObjects(){var r=[];if(!u)throw new Error("Found bad `types`");if(Object.entries(u).forEach((function(e){var t=_slicedToArray(e,2),n=t[0],i=t[1];"#"!==i&&[].concat(i).forEach((function(e){var t;_slicedToArray(null!==(t=o.revivers[e])&&void 0!==t?t:[null,{}],2)[1].plain&&(r.push({keypath:n,type:e}),delete u[n]);}));})),r.length)return r.sort(nestedPathsFirst).reduce((function reducer(r,n){var o=n.keypath,i=n.type;if(isThenable(r))return r.then((function(e){return reducer(e,{keypath:o,type:i})}));var a=getByKeyPath(t,o);if(hasConstructorOf(a=f(i,a),e))return a.then((function(e){var r=setAtKeyPath(t,o,e);r===e&&(t=r);}));var c=setAtKeyPath(t,o,a);c===a&&(t=c);}),void 0)}();return hasConstructorOf(d,e)?h=d.then((function(){return t})):(h=function _revive(t,r,o,a,c){if(!p||"$types"!==t){var y=u[t],h=i$1(r);if(h||isPlainObject(r)){var d=h?new Array(r.length):{};for(n(r).forEach((function(n){var i=_revive(t+(t?".":"")+escapeKeyPathComponent(n),r[n],null!=o?o:d,d,n),a=function set(e){return hasConstructorOf(e,s)?d[n]=void 0:void 0!==e&&(d[n]=e),e};hasConstructorOf(i,e)?v.push(i.then((function(e){return a(e)}))):a(i);})),r=d;l.length;){var b=_slicedToArray(l[0],4),_=b[0],O=b[1],m=b[2],j=b[3],g=getByKeyPath(_,O);if(void 0===g)break;m[j]=g,l.splice(0,1);}}if(!y)return r;if("#"===y){var S=getByKeyPath(o,r.slice(1));return void 0===S&&l.push([o,r.slice(1),a,c]),S}return [].concat(y).reduce((function reducer(t,r){if(hasConstructorOf(t,e))return t.then((function(e){return reducer(e,r)}));if("string"!=typeof r)throw new TypeError("Bad type JSON");return f(r,t)}),r)}}("",t,null),v.length&&(h=e.resolve(h).then((function(t){return e.all([t].concat(v))})).then((function(e){return _slicedToArray(e,1)[0]})))),isThenable(h)?c&&a.throwOnBadSyncType?function(){throw new TypeError("Sync method requested but async result obtained")}():hasConstructorOf(h,e)?h.p.then(checkUndefined):h:!c&&a.throwOnBadSyncType?function(){throw new TypeError("Async method requested but sync result obtained")}():c?checkUndefined(h):Promise.resolve(checkUndefined(h))}},{key:"reviveSync",value:function reviveSync(e,t){return this.revive(e,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},t),{},{sync:!0}))}},{key:"reviveAsync",value:function reviveAsync(e,t){return this.revive(e,_objectSpread2(_objectSpread2({throwOnBadSyncType:!0},t),{},{sync:!1}))}},{key:"register",value:function register(e,t){var r=this,o=null!=t?t:{},a=function R(e){i$1(e)?e.forEach((function(e){return R(e)})):n(e).forEach((function(t){var n;if("#"===t)throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");if(u.includes(t))throw new TypeError("Plain JSON object types are reserved as type names");var a=e[t],c=a&&"function"!=typeof a&&!Array.isArray(a)&&a.testPlainObjects?r.plainObjectReplacers:r.nonplainObjectReplacers,s=c.filter((function(e){return e.type===t}));if(s.length&&(c.splice(c.indexOf(s[0]),1),delete r.revivers[t],delete r.types[t]),"function"==typeof a){var l=a;a={test:function test(e){return e&&e.constructor===l},replace:function replace(e){return _objectSpread2({},e)},revive:function revive(e){return Object.assign(Object.create(l.prototype),e)}};}else if(i$1(a)){var y=_slicedToArray(a,3);a={test:y[0],replace:y[1],revive:y[2]};}if(null!==(n=a)&&void 0!==n&&n.test){var p={type:t,test:a.test.bind(a)};a.replace&&(p.replace=a.replace.bind(a)),a.replaceAsync&&(p.replaceAsync=a.replaceAsync.bind(a));var f="number"==typeof o.fallback?o.fallback:o.fallback?0:Number.POSITIVE_INFINITY;if(a.testPlainObjects?r.plainObjectReplacers.splice(f,0,p):r.nonplainObjectReplacers.splice(f,0,p),a.revive||a.reviveAsync){var v={};a.revive&&(v.revive=a.revive.bind(a)),a.reviveAsync&&(v.reviveAsync=a.reviveAsync.bind(a)),r.revivers[t]=[v,{plain:a.testPlainObjects}];}r.types[t]=a;}}));};return [].concat(e).forEach((function(e){return a(e)})),this}}]),Typeson}(),s=_createClass((function Undefined(){_classCallCheck(this,Undefined);}));s.__typeson__type__="TypesonUndefined";var u=["null","boolean","number","string","array","object"];

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2017-2023 Brett Zamir, 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

/**
 * @typedef {number} Integer
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
  lookup[/** @type {number} */chars.codePointAt(i)] = i;
}

/**
 * @param {ArrayBuffer} arraybuffer
 * @param {Integer} [byteOffset]
 * @param {Integer} [lngth]
 * @returns {string}
 */
var encode = function encode(arraybuffer, byteOffset, lngth) {
  if (lngth === null || lngth === undefined) {
    lngth = arraybuffer.byteLength; // Needed for Safari
  }

  var bytes = new Uint8Array(arraybuffer, 0,
  // Default needed for Safari
  lngth);
  var len = bytes.length;
  var base64 = '';
  for (var _i = 0; _i < len; _i += 3) {
    base64 += chars[bytes[_i] >> 2];
    base64 += chars[(bytes[_i] & 3) << 4 | bytes[_i + 1] >> 4];
    base64 += chars[(bytes[_i + 1] & 15) << 2 | bytes[_i + 2] >> 6];
    base64 += chars[bytes[_i + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.slice(0, -1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.slice(0, -2) + '==';
  }
  return base64;
};

/**
 * @param {string} base64
 * @param {{
 *   maxByteLength: number
 * }} [options]
 * @returns {ArrayBuffer}
 */
var decode = function decode(base64, options) {
  var len = base64.length;
  if (len % 4) {
    throw new Error('Bad base64 length: not divisible by four');
  }
  var bufferLength = base64.length * 0.75;
  var p = 0;
  var encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === '=') {
    bufferLength--;
    if (base64[base64.length - 2] === '=') {
      bufferLength--;
    }
  }

  // @ts-expect-error Second argument is not yet standard
  var arraybuffer = new ArrayBuffer(bufferLength, options),
    bytes = new Uint8Array(arraybuffer);
  for (var _i2 = 0; _i2 < len; _i2 += 4) {
    // We know the result will not be undefined, as we have a text
    //   length divisible by four
    encoded1 = lookup[/** @type {number} */base64.codePointAt(_i2)];
    encoded2 = lookup[/** @type {number} */base64.codePointAt(_i2 + 1)];
    encoded3 = lookup[/** @type {number} */base64.codePointAt(_i2 + 2)];
    encoded4 = lookup[/** @type {number} */base64.codePointAt(_i2 + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const arraybuffer = {
    arraybuffer: {
        test (x) { return toStringTag(x) === 'ArrayBuffer'; },
        replace (
            b,
            /**
             * @type {import('typeson').StateObject &
             *   {buffers?: ArrayBuffer[]}}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            const index = stateObj.buffers.indexOf(b);
            if (index > -1) {
                return {index};
            }
            stateObj.buffers.push(b);
            return {
                s: encode(b),
                maxByteLength: b.maxByteLength,
                resizable: b.resizable
            };
        },
        revive (
            b64,
            /**
             * @type {import('typeson').StateObject &
             *   {buffers?: ArrayBuffer[]}}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            if (Object.hasOwn(b64, 'index')) {
                return stateObj.buffers[
                    /**
                     * @type {{index: import('typeson').Integer}}
                     */
                    (b64).index
                ];
            }
            const buffer = decode(
                /** @type {string} */ (b64.s),
                b64.resizable
                    // todo[engine:node@>20]: Remove comment
                    /* c8 ignore next -- Node >= 20 */
                    ? {maxByteLength: b64.maxByteLength}
                    : undefined
            );
            stateObj.buffers.push(buffer);
            return buffer;
        }
    }
};

// See also typed-arrays!

/**
 * @type {import('typeson').TypeSpecSet}
 */
const bigintObject = {
    bigintObject: {
        test (x) {
            return typeof x === 'object' && hasConstructorOf(x, BigInt);
        },
        replace: String,
        revive (s) {
            return new Object(BigInt(/** @type {string} */ (s)));
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const bigint = {
    bigint: {
        test (x) {
            return typeof x === 'bigint';
        },
        replace: String,
        // eslint-disable-next-line @stylistic/max-len -- Long
        // eslint-disable-next-line unicorn/prefer-native-coercion-functions -- Clearer
        revive (s) {
            return BigInt(/** @type {string} */ (s));
        }
    }
};

/**
 * Not currently in use internally, but provided for parity.
 * @param {ArrayBuffer} buf
 * @returns {string}
 */
function arraybuffer2string (buf) {
    return new Uint8Array(buf).reduce(
        (s, byte) => s + String.fromCodePoint(byte), ''
    );
}

/**
 *
 * @param {string} str
 * @returns {ArrayBuffer}
 */
function string2arraybuffer (str) {
    /*
    // UTF-8 approaches
    const utf8 = unescape(encodeURIComponent(str));
    const arr = new Uint8Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) {
        arr[i] = utf8.charCodeAt(i);
    }
    return arr.buffer;

    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        // surrogate pair
        } else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff) << 10) |
                (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
    */
    /*
    // Working UTF-16 options (equivalents)
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
    */

    const array = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line @stylistic/max-len -- Long
        // eslint-disable-next-line unicorn/prefer-code-point -- Iterating char. codes
        array[i] = str.charCodeAt(i); // & 0xff;
    }
    return array.buffer;
}

/* globals XMLHttpRequest, FileReader -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const blob = {
    blob: {
        test (x) { return toStringTag(x) === 'Blob'; },
        replace (b) { // Sync
            const req = new XMLHttpRequest();
            req.overrideMimeType('text/plain; charset=x-user-defined');
            req.open('GET', URL.createObjectURL(b), false); // Sync
            req.send();

            // Seems not feasible to accurately simulate
            /* c8 ignore next 3 */
            if (req.status !== 200 && req.status !== 0) {
                throw new Error('Bad Blob access: ' + req.status);
            }
            return {
                type: b.type,
                stringContents: req.responseText
            };
        },
        revive (obj) {
            const {
                type, stringContents
            } = /** @type {{type: string, stringContents: string}} */ (obj);
            return new Blob([string2arraybuffer(stringContents)], {type});
        },
        replaceAsync (b) {
            return new e((resolve, reject) => {
                /*
                if (b.isClosed) { // On MDN, but not in https://w3c.github.io/FileAPI/#dfn-Blob
                    reject(new Error('The Blob is closed'));
                    return;
                }
                */
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    resolve({
                        type: b.type,
                        stringContents: arraybuffer2string(
                            /** @type {ArrayBuffer} */ (reader.result)
                        )
                    });
                });
                // Seems not feasible to accurately simulate
                /* c8 ignore next 3 */
                reader.addEventListener('error', () => {
                    reject(reader.error);
                });
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line unicorn/prefer-blob-reading-methods -- Too new?
                reader.readAsArrayBuffer(b);
            });
        }
    }
};

/**
 * @todo We could use `import generateUUID from 'uuid/v4';` (but it needs
 *   crypto library, etc.; `rollup-plugin-node-builtins` doesn't recommend
 *   using its own version and though there is <https://www.npmjs.com/package/crypto-browserify>,
 *   it may be troublesome to bundle and not strongly needed)
 * @returns {string}
 */
function generateUUID () { //  Adapted from original: public domain/MIT: http://stackoverflow.com/a/8809472/271577
    /* c8 ignore next */
    let d = Date.now();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replaceAll(/[xy]/gu, function (c) {
        /* eslint-disable no-bitwise, sonarjs/pseudo-random -- Convenient */
        const r = Math.trunc((d + (Math.random() * 16)) % 16);
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
        /* eslint-enable no-bitwise, sonarjs/pseudo-random -- Convenient */
    });
}

/**
 * @type {{[key: (symbol|string)]: any}}
 */
const cloneableObjectsByUUID = {};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const cloneable = {
    cloneable: {
        test (x) {
            return x && typeof x === 'object' &&
                typeof x[Symbol.for('cloneEncapsulate')] === 'function';
        },
        replace (clonable) {
            const encapsulated = clonable[Symbol.for('cloneEncapsulate')]();
            const uuid = generateUUID();
            cloneableObjectsByUUID[uuid] = clonable;
            return {uuid, encapsulated};
        },
        revive (obj) {
            const {
                uuid, encapsulated
            } = /** @type {{uuid: string, encapsulated: any}} */ (obj);

            return cloneableObjectsByUUID[uuid][Symbol.for('cloneRevive')](
                encapsulated
            );
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const cryptokey = {
    cryptokey: {
        test (x) {
            return toStringTag(x) === 'CryptoKey' && x.extractable;
        },
        replaceAsync (
            /** @type {CryptoKey} */
            key
        ) {
            return new e(async (resolve, reject) => {
                /** @type {JsonWebKey} */
                let jwk;
                try {
                    jwk = await crypto.subtle.exportKey('jwk', key);
                // Our format should be valid and our key extractable
                /* c8 ignore next 4 */
                } catch (err) {
                    reject(err);
                    return;
                }
                resolve({
                    jwk,
                    algorithm: key.algorithm,
                    usages: key.usages
                });
            });
        },
        revive (obj) {
            const {
                jwk, algorithm, usages
            } = /**
              * @type {{
              *   jwk: JsonWebKey,
              *   algorithm: KeyAlgorithm,
              *   usages: KeyUsage[]
              * }}
              */ (obj);

            return crypto.subtle.importKey(
                'jwk', jwk, algorithm, true, usages
            );
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const dataview = {
    dataview: {
        test (x) { return toStringTag(x) === 'DataView'; },
        replace (
            {buffer, byteOffset, byteLength},
            /**
             * @type {import('typeson').StateObject & {
             *  buffers?: ArrayBuffer[]
             * }}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            const index = stateObj.buffers.indexOf(buffer);
            if (index > -1) {
                return {index, byteOffset, byteLength};
            }
            stateObj.buffers.push(buffer);
            return {
                encoded: encode(buffer),
                maxByteLength: buffer.maxByteLength,
                resizable: buffer.resizable,
                byteOffset,
                byteLength
            };
        },
        revive (
            b64Obj,
            /**
             * @type {import('typeson').StateObject & {
             *  buffers?: ArrayBuffer[]
             * }}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            const {
                byteOffset, byteLength, encoded, index, maxByteLength,
                resizable
            } = b64Obj;
            let buffer;
            if ('index' in b64Obj) {
                buffer = stateObj.buffers[index];
            } else {
                buffer = decode(
                    encoded,
                    // todo[engine:node@>20]: Remove comment
                    /* c8 ignore next 3 -- Depends on Node version */
                    resizable
                        ? {maxByteLength}
                        : maxByteLength
                );
                stateObj.buffers.push(buffer);
            }
            return new DataView(buffer, byteOffset, byteLength);
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const date = {
    date: {
        test (x) { return toStringTag(x) === 'Date'; },
        replace (dt) {
            const time = dt.getTime();
            if (Number.isNaN(time)) {
                return 'NaN';
            }
            return time;
        },
        revive (time) {
            if (time === 'NaN') {
                return new Date(Number.NaN);
            }
            return new Date(time);
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const domexception = {
    domexception: {
        test (x) { return toStringTag(x) === 'DOMException'; },
        replace (de) {
            // `code` is based on `name` and readonly, so no
            //   need to keep here
            return {
                name: de.name,
                message: de.message
            };
        },
        revive ({message, name}) {
            return new DOMException(message, name);
        }
    }
};

/* globals DOMMatrix, DOMMatrixReadOnly -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const dommatrix = {};

/* c8 ignore next */
if (typeof DOMMatrix !== 'undefined') {
    create$5(DOMMatrix);
}
/* c8 ignore next */
if (typeof DOMMatrixReadOnly !== 'undefined') {
    create$5(DOMMatrixReadOnly);
}

/**
 * @param {typeof DOMMatrix|typeof DOMMatrixReadOnly} Ctor
 * @returns {void}
 */
function create$5 (Ctor) {
    dommatrix[Ctor.name.toLowerCase()] = {
        test (x) { return toStringTag(x) === Ctor.name; },
        replace (dm) {
            if (dm.is2D) {
                return {
                    a: dm.a,
                    b: dm.b,
                    c: dm.c,
                    d: dm.d,
                    e: dm.e,
                    f: dm.f
                };
            }
            return {
                m11: dm.m11,
                m12: dm.m12,
                m13: dm.m13,
                m14: dm.m14,
                m21: dm.m21,
                m22: dm.m22,
                m23: dm.m23,
                m24: dm.m24,
                m31: dm.m31,
                m32: dm.m32,
                m33: dm.m33,
                m34: dm.m34,
                m41: dm.m41,
                m42: dm.m42,
                m43: dm.m43,
                m44: dm.m44
            };
        },
        revive (o) {
            if (Object.hasOwn(o, 'a')) {
                return new Ctor([o.a, o.b, o.c, o.d, o.e, o.f]);
            }
            return new Ctor([
                o.m11, o.m12, o.m13, o.m14,
                o.m21, o.m22, o.m23, o.m24,
                o.m31, o.m32, o.m33, o.m34,
                o.m41, o.m42, o.m43, o.m44
            ]);
        }
    };
}

/* globals DOMPoint, DOMPointReadOnly -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const dompoint = {};

/* c8 ignore next */
if (typeof DOMPoint !== 'undefined') {
    create$4(DOMPoint);
}
/* c8 ignore next */
if (typeof DOMPointReadOnly !== 'undefined') {
    create$4(DOMPointReadOnly);
}

/**
 * @param {typeof DOMPoint|typeof DOMPointReadOnly} Ctor
 * @returns {void}
 */
function create$4 (Ctor) {
    dompoint[Ctor.name.toLowerCase()] = {
        test (x) { return toStringTag(x) === Ctor.name; },
        replace (dp) {
            return {
                x: dp.x,
                y: dp.y,
                z: dp.z,
                w: dp.w
            };
        },
        revive ({x, y, z, w}) {
            return new Ctor(x, y, z, w);
        }
    };
}

/* globals DOMQuad -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const domquad = {
    domquad: {
        test (x) { return toStringTag(x) === 'DOMQuad'; },
        replace (dp) {
            return {
                p1: dp.p1,
                p2: dp.p2,
                p3: dp.p3,
                p4: dp.p4
            };
        },
        revive ({p1, p2, p3, p4}) {
            return new DOMQuad(p1, p2, p3, p4);
        }
    }
};

/* globals DOMRect, DOMRectReadOnly -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const domrect = {};

/* c8 ignore next */
if (typeof DOMRect !== 'undefined') {
    create$3(DOMRect);
}
/* c8 ignore next */
if (typeof DOMRectReadOnly !== 'undefined') {
    create$3(DOMRectReadOnly);
}

/**
 * @param {typeof DOMRect|typeof DOMRectReadOnly} Ctor
 * @returns {void}
 */
function create$3 (Ctor) {
    domrect[Ctor.name.toLowerCase()] = {
        test (x) { return toStringTag(x) === Ctor.name; },
        replace (dr) {
            return {
                x: dr.x,
                y: dr.y,
                width: dr.width,
                height: dr.height
            };
        },
        revive ({x, y, width, height}) {
            return new Ctor(x, y, width, height);
        }
    };
}

/**
 * @type {import('typeson').TypeSpecSet}
 */
const error = {
    error: {
        test (x) { return toStringTag(x) === 'Error'; },
        replace ({
            name, message, cause, stack, fileName, lineNumber, columnNumber
        }) {
            return {
                name, message, cause, stack, fileName, lineNumber, columnNumber
            };
        },
        revive (obj) {
            const e = /**
             * @type {{
             *   name: string,
             *   cause: Error,
             *   stack: string,
             *   fileName?: string,
             *   lineNumber?: import('typeson').Integer,
             *   columnNumber?: import('typeson').Integer
             * }}
             */ (new Error(obj.message));
            e.name = obj.name;
            e.cause = obj.cause;
            e.stack = obj.stack;
            e.fileName = obj.fileName;
            e.lineNumber = obj.lineNumber;
            e.columnNumber = obj.columnNumber;

            return e;
        }
    }
};

/* globals InternalError -- Optional */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const errors = {};

// JS standard
[
    TypeError, RangeError, SyntaxError, ReferenceError,
    EvalError, URIError
].forEach((error) => create$2(error));

/* c8 ignore next 3 */
if (typeof AggregateError !== 'undefined') {
    create$2(AggregateError);
}

/* c8 ignore next 5 */
// @ts-expect-error Non-standard
if (typeof InternalError === 'function') {
    // @ts-expect-error Non-standard
    create$2(InternalError);
}

/* eslint-disable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/131 */
/**
 * Non-standard.
 * @typedef {{
 *     new (message?: string, options?: ErrorOptions): EvalError;
 * (message?: string, options?: ErrorOptions): EvalError;
 * }} InternalErrorConstructor
 */
/* eslint-enable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/131 */

/**
 * Comprises all built-in errors.
 * @param {TypeErrorConstructor|RangeErrorConstructor|
 *   SyntaxErrorConstructor|ReferenceErrorConstructor|
 *   EvalErrorConstructor|URIErrorConstructor|
 *   AggregateErrorConstructor|InternalErrorConstructor
 * } Ctor
 * @returns {void}
 */
function create$2 (Ctor) {
    errors[Ctor.name.toLowerCase()] = {
        test (x) { return hasConstructorOf(x, Ctor); },
        replace ({
            name, message, cause, stack, fileName,
            lineNumber, columnNumber, errors: errs
        }) {
            return {
                name, message, cause, stack, fileName,
                lineNumber, columnNumber, errors: errs
            };
        },
        revive (obj) {
            const isAggregateError = typeof AggregateError !== 'undefined' &&
                Ctor === AggregateError;
            const e = /**
                * @type {{
                *   name: string,
                *   cause: Error,
                *   stack: string,
                *   fileName?: string,
                *   lineNumber?: import('typeson').Integer,
                *   columnNumber?: import('typeson').Integer
                * }}
                */ (isAggregateError
                    ? new /** @type {AggregateErrorConstructor} */ (
                        Ctor
                    )(obj.errors, obj.message)
                    : new /**
                    * @type {TypeErrorConstructor|RangeErrorConstructor|
                    *   SyntaxErrorConstructor|ReferenceErrorConstructor|
                    *   EvalErrorConstructor|URIErrorConstructor|
                    *   InternalErrorConstructor}
                    */ (Ctor)(obj.message));

            e.name = obj.name;
            e.cause = obj.cause;
            e.stack = obj.stack;
            e.fileName = obj.fileName;
            e.lineNumber = obj.lineNumber;
            e.columnNumber = obj.columnNumber;

            return e;
        }
    };
}

/* globals XMLHttpRequest, FileReader -- Polyfills */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const file = {
    file: {
        test (x) { return toStringTag(x) === 'File'; },
        replace (f) { // Sync
            const req = new XMLHttpRequest();
            req.overrideMimeType('text/plain; charset=x-user-defined');
            req.open('GET', URL.createObjectURL(f), false); // Sync
            req.send();

            // Seems not feasible to accurately simulate
            /* c8 ignore next 3 */
            if (req.status !== 200 && req.status !== 0) {
                throw new Error('Bad File access: ' + req.status);
            }
            return {
                type: f.type,
                stringContents: req.responseText,
                name: f.name,
                lastModified: f.lastModified
            };
        },
        revive ({name, type, stringContents, lastModified}) {
            return new File([string2arraybuffer(stringContents)], name, {
                type,
                lastModified
            });
        },
        replaceAsync (f) {
            return new e(function (resolve, reject) {
                /*
                if (f.isClosed) { // On MDN, but not in https://w3c.github.io/FileAPI/#dfn-Blob
                    reject(new Error('The File is closed'));
                    return;
                }
                */
                const reader = new FileReader();
                reader.addEventListener('load', function () {
                    resolve({
                        type: f.type,
                        stringContents: arraybuffer2string(
                            /** @type {ArrayBuffer} */ (reader.result)
                        ),
                        name: f.name,
                        lastModified: f.lastModified
                    });
                });
                // Seems not feasible to accurately simulate
                /* c8 ignore next 3 */
                reader.addEventListener('error', function () {
                    reject(reader.error);
                });
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line unicorn/prefer-blob-reading-methods -- Too new?
                reader.readAsArrayBuffer(f);
            });
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const filelist = {
    file: file.file,
    filelist: {
        test (x) { return toStringTag(x) === 'FileList'; },
        replace (fl) {
            const arr = [];
            for (let i = 0; i < fl.length; i++) {
                arr[i] = fl.item(i);
            }
            return arr;
        },
        revive (o) {
            /**
             * `FileList` polyfill.
             */
            class FileList {
                /**
                 * Set private properties and length.
                 */
                constructor () {
                    // eslint-disable-next-line prefer-rest-params -- API
                    this._files = arguments[0];
                    this.length = this._files.length;
                }
                /**
                 * @param {import('typeson').Integer} index
                 * @returns {File}
                 */
                item (index) {
                    return this._files[index];
                }
                /* eslint-disable class-methods-use-this -- Not needed */
                /**
                 * @returns {"FileList"}
                 */
                get [Symbol.toStringTag] () {
                    /* eslint-enable class-methods-use-this -- Not needed */
                    return 'FileList';
                }
            }
            return new FileList(o);
        }
    }
};

/* globals document, OffscreenCanvas, createImageBitmap -- Polyfills */
// `ImageBitmap` is browser / DOM specific. It also can only work
//  same-domain (or CORS)


/**
 * @type {import('typeson').TypeSpecSet}
 */
const imagebitmap = {
    imagebitmap: {
        test (x) {
            return toStringTag(x) === 'ImageBitmap' ||
                // In Node, our polyfill sets the dataset on a canvas
                //  element as JSDom no longer allows overriding toStringTag
                (x && x.dataset && x.dataset.toStringTag === 'ImageBitmap');
        },
        replace (bm) {
            const canvas = document.createElement('canvas');
            const ctx = /** @type {CanvasRenderingContext2D} */ (
                canvas.getContext('2d')
            );
            ctx.drawImage(bm, 0, 0);
            return {
                width: bm.width, height: bm.height, dataURL: canvas.toDataURL()
            };
        },
        revive (o) {
            const canvas = typeof OffscreenCanvas === 'undefined'
                ? document.createElement('canvas')
                /* c8 ignore next -- Browser only */
                : new OffscreenCanvas(o.width, o.height);
            /*
            var req = new XMLHttpRequest();
            req.open('GET', o, false); // Sync
            if (req.status !== 200 && req.status !== 0) {
              throw new Error('Bad ImageBitmap access: ' + req.status);
            }
            req.send();
            return req.responseText;
            */
            const ctx = /** @type {CanvasRenderingContext2D} */ (
                canvas.getContext('2d')
            );
            const img = document.createElement('img');
            // The onload is needed by some browsers per http://stackoverflow.com/a/4776378/271577
            img.addEventListener('load', function () {
                ctx.drawImage(img, 0, 0);
            });
            img.src = o.dataURL;
            // Works in contexts allowing an `ImageBitmap` (We might use
            //   `OffscreenCanvas.transferToBitmap` when supported)
            return typeof OffscreenCanvas === 'undefined'
                ? canvas
                /* c8 ignore next 3 -- Browser only */
                : /** @type {OffscreenCanvas} */ (
                    canvas
                ).transferToImageBitmap();
        },
        reviveAsync (o) {
            const canvas = document.createElement('canvas');
            const ctx = /** @type {CanvasRenderingContext2D} */ (
                canvas.getContext('2d')
            );
            const img = document.createElement('img');
            // The onload is needed by some browsers per http://stackoverflow.com/a/4776378/271577
            img.addEventListener('load', function () {
                ctx.drawImage(img, 0, 0);
            });
            img.src = o.dataURL;

            return new e(async (resolve, reject) => {
                try {
                    const resp = await createImageBitmap(canvas);
                    resolve(resp);
                /* c8 ignore next 3 */
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
};

/* globals ImageData -- Polyfills */
// `ImageData` is browser / DOM specific (though `node-canvas` has it
//   available on `Canvas`).


/**
 * @type {import('typeson').TypeSpecSet}
 */
const imagedata = {
    imagedata: {
        test (x) { return toStringTag(x) === 'ImageData'; },
        replace (d) {
            return {
                // Ensure `length` gets preserved for revival
                array: [...d.data],
                width: d.width,
                height: d.height
            };
        },
        revive (o) {
            return new ImageData(
                new Uint8ClampedArray(o.array), o.width, o.height
            );
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const infinity = {
    infinity: {
        test (x) { return x === Number.POSITIVE_INFINITY; },
        replace (/* n */) { return 'Infinity'; },
        revive (/* s */) { return Number.POSITIVE_INFINITY; }
    }
};

/**
 * @type {import('typeson').Spec}
 */
const IntlCollator = {
    test (x) { return hasConstructorOf(x, Intl.Collator); },
    replace (c) { return c.resolvedOptions(); },
    revive (options) { return new Intl.Collator(options.locale, options); }
};

/**
 * @type {import('typeson').Spec}
 */
const IntlDateTimeFormat = {
    test (x) { return hasConstructorOf(x, Intl.DateTimeFormat); },
    replace (dtf) { return dtf.resolvedOptions(); },
    revive (options) {
        return new Intl.DateTimeFormat(options.locale, options);
    }
};

/**
 * @type {import('typeson').Spec}
 */
const IntlNumberFormat = {
    test (x) { return hasConstructorOf(x, Intl.NumberFormat); },
    replace (nf) { return nf.resolvedOptions(); },
    revive (options) { return new Intl.NumberFormat(options.locale, options); }
};

const intlTypes = {
    IntlCollator,
    IntlDateTimeFormat,
    IntlNumberFormat
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const map = {
    map: {
        test (x) { return toStringTag(x) === 'Map'; },
        replace (mp) { return [...mp.entries()]; },
        revive (entries) { return new Map(entries); }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const nan = {
    nan: {
        test (x) { return Number.isNaN(x); },
        replace (/* n */) { return 'NaN'; },
        revive (/* s */) { return Number.NaN; }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const negativeInfinity = {
    negativeInfinity: {
        test (x) { return x === Number.NEGATIVE_INFINITY; },
        replace (/* n */) { return '-Infinity'; },
        revive (/* s */) { return Number.NEGATIVE_INFINITY; }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const negativeZero = {
    negativeZero: {
        test (x) {
            return Object.is(x, -0);
        },
        replace (/* n */) {
            // Just adding 0 here for minimized space; will still revive as -0
            return 0;
        },
        revive (/* s */) {
            return -0;
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const nonbuiltinIgnore = {
    nonbuiltinIgnore: {
        test (x) {
            return x && typeof x === 'object' && !Array.isArray(x) && ![
                'Object',
                // `Proxy` and `Reflect`, two other built-in objects, will also
                //   have a `toStringTag` of `Object`; we don't want built-in
                //   function objects, however
                'Boolean', 'Number', 'String',
                'Error', 'RegExp', 'Math', 'Date',
                'Map', 'Set',
                'JSON',
                'ArrayBuffer', 'SharedArrayBuffer', 'DataView',
                'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array',
                'Uint16Array', 'Int32Array', 'Uint32Array',
                'Float32Array', 'Float64Array',
                'Promise',
                'String Iterator', 'Array Iterator',
                'Map Iterator', 'Set Iterator',
                'WeakMap', 'WeakSet',
                'Atomics', 'Module'
            ].includes(toStringTag(x));
        },
        replace (/* rexp */) {
            // Not in use
        }
    }
};

// This module is for objectified primitives (such as `new Number(3)` or
//      `new String("foo")`)
/* eslint-disable no-new-wrappers, unicorn/new-for-builtins -- Deliberate */

/**
 * @type {import('typeson').TypeSpecSet}
 */
const primitiveObjects = {
    // String Object (not primitive string which need no type spec)
    StringObject: {
        test (x) {
            return toStringTag(x) === 'String' && typeof x === 'object';
        },
        replace: String, // convert to primitive string
        revive (s) { return new String(s); } // Revive to an objectified string
    },
    // Boolean Object (not primitive boolean which need no type spec)
    BooleanObject: {
        test (x) {
            return toStringTag(x) === 'Boolean' &&
                typeof x === 'object';
        },
        replace (o) {
            // convert to primitive boolean
            return o.valueOf();
        },
        revive (b) {
            // Revive to an objectified Boolean
            return new Boolean(b);
        }
    },
    // Number Object (not primitive number which need no type spec)
    NumberObject: {
        test (x) {
            return toStringTag(x) === 'Number' && typeof x === 'object';
        },
        replace: Number, // convert to primitive number
        revive (n) { return new Number(n); } // Revive to an objectified number
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const promise = {
    promise: {
        test (x) {
            return toStringTag(x) === 'Promise';
        },
        replaceAsync (prom) {
            return new e(async (resolve) => {
                try {
                    resolve({
                        value: await prom
                    });
                } catch (error) {
                    resolve({
                        error
                    });
                }
            });
        },
        revive (o) {
            return o.error
                ? Promise.reject(o.error)
                : Promise.resolve(o.value);
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const regexp = {
    regexp: {
        test (x) { return toStringTag(x) === 'RegExp'; },
        replace (rexp) {
            return {
                source: rexp.source,
                flags: (rexp.global ? 'g' : '') +
                    (rexp.ignoreCase ? 'i' : '') +
                    (rexp.multiline ? 'm' : '') +
                    (rexp.sticky ? 'y' : '') +
                    (rexp.unicode ? 'u' : '')
            };
        },
        revive ({source, flags}) { return new RegExp(source, flags); }
    }
};

// Here we allow the exact same non-plain object, function, and symbol
//  instances to be resurrected (assuming the same session/environment);
//  plain objects are ignored by Typeson so not presently available and
//  we consciously exclude arrays


/**
 * @type {{[key: string]: any}}
 */
const resurrectableObjectsByUUID = {};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const resurrectable = {
    resurrectable: {
        test (x) {
            return x &&
                !Array.isArray(x) &&
                ['object', 'function', 'symbol'].includes(typeof x);
        },
        replace (rsrrctble) {
            const uuid = generateUUID();
            resurrectableObjectsByUUID[uuid] = rsrrctble;
            return uuid;
        },
        revive (serializedResurrectable) {
            return resurrectableObjectsByUUID[serializedResurrectable];
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const set = {
    set: {
        test (x) { return toStringTag(x) === 'Set'; },
        replace (st) {
            return [...st.values()];
        },
        revive (values) {
            return new Set(values);
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const symbol = {
    symbol: {
        test (x) {
            return typeof x === 'symbol';
        },
        replace (sym) {
            return {
                global: Symbol.keyFor(sym) !== undefined,
                sym: String(sym).slice(7, -1)
            };
        },
        revive (o) {
            return o.global ? Symbol.for(o.sym) : Symbol(o.sym);
        }
    }
};

// Support all kinds of typed arrays (views of ArrayBuffers)

/**
 * @type {import('typeson').TypeSpecSet}
 */
const typedArraysSocketIO = {};

/**
 * @param {Int8ArrayConstructor|Uint8ArrayConstructor|
 *   Uint8ClampedArrayConstructor|Int16ArrayConstructor|
 *   Uint16ArrayConstructor|Int32ArrayConstructor|
 *   Uint32ArrayConstructor|Float32ArrayConstructor|
 *   Float64ArrayConstructor|
 *   BigInt64ArrayConstructor|BigUint64ArrayConstructor
 * } TypedArray
 * @returns {void}
 */
function create$1 (TypedArray) {
    const typeName = TypedArray.name;
    typedArraysSocketIO[typeName.toLowerCase()] = {
        test (x) { return toStringTag(x) === typeName; },
        replace (a) {
            return (a.byteOffset === 0 &&
                a.byteLength === a.buffer.byteLength
                ? a
                // socket.io supports streaming ArrayBuffers.
                // If we have a typed array representing a portion
                //   of the buffer, we need to clone
                //   the buffer before leaving it to socket.io.
                : a.slice(0)).buffer;
        },
        revive (buf) {
            // One may configure socket.io to revive binary data as
            //    Buffer or Blob.
            // We should therefore not rely on that the instance we
            //   get here is an ArrayBuffer
            // If not, let's assume user wants to receive it as
            //   configured with socket.io.
            return toStringTag(buf) === 'ArrayBuffer'
                ? new TypedArray(buf)
                : buf;
        }
    };
}

if (typeof Int8Array === 'function') {
    // Those constructors are added in ES6 as a group.
    // If we have Int8Array, we can assume the rest also exists.

    [
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        ...(typeof BigInt64Array === 'function'
            ? [BigInt64Array, BigUint64Array]
            /* c8 ignore next */
            : [])
    ].forEach((TypedArray) => create$1(TypedArray));
}

/**
 * @type {import('typeson').TypeSpecSet}
 */
const typedArrays = {};

/**
 * @typedef {Int8ArrayConstructor|Uint8ArrayConstructor|
 *   Uint8ClampedArrayConstructor|
 *   Int16ArrayConstructor|Uint16ArrayConstructor|
 *   Int32ArrayConstructor|Uint32ArrayConstructor|
 *   Float32ArrayConstructor|
 *   Float64ArrayConstructor|
 *   BigInt64ArrayConstructor|BigUint64ArrayConstructor} TypedArrayConstructor
 */

/**
 * @param {TypedArrayConstructor} TypedArray
 * @returns {void}
 */
function create (TypedArray) {
    const typeName = TypedArray.name;

    typedArrays[typeName.toLowerCase()] = {
        test (x) { return toStringTag(x) === typeName; },
        replace (
            {buffer, byteOffset, length: l},
            /**
             * @type {import('typeson').StateObject & {
             *   buffers?: ArrayBuffer[]
             * }}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            const index = stateObj.buffers.indexOf(buffer);
            if (index > -1) {
                return {index, byteOffset, length: l};
            }
            stateObj.buffers.push(buffer);
            return {
                maxByteLength: buffer.maxByteLength,
                resizable: buffer.resizable,
                encoded: encode(buffer),
                byteOffset,
                length: l
            };
        },
        revive (
            b64Obj,
            /**
             * @type {import('typeson').StateObject & {
             *   buffers?: ArrayBuffer[]
             * }}
             */
            stateObj
        ) {
            if (!stateObj.buffers) {
                stateObj.buffers = [];
            }
            const {
                byteOffset, length: len, encoded, index, maxByteLength,
                resizable
            } = b64Obj;
            let buffer;
            if ('index' in b64Obj) {
                buffer = stateObj.buffers[index];
            } else {
                buffer = decode(
                    encoded,
                    // todo[engine:node@>20]: Remove comment
                    /* c8 ignore next 3 -- Depends on Node version */
                    resizable
                        ? {maxByteLength}
                        : undefined
                );
                stateObj.buffers.push(buffer);
            }
            return new TypedArray(buffer, byteOffset, len);
        }
    };
}

if (typeof Int8Array === 'function') {
    // Those constructors are added in ES6 as a group.
    // If we have Int8Array, we can assume the rest also exists.
    [
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        ...(typeof BigInt64Array === 'function'
            ? [BigInt64Array, BigUint64Array]
            /* c8 ignore next */
            : [])
    ].forEach((TypedArray) => create(TypedArray));
}

// This does not preserve `undefined` in sparse arrays; see the `undef`
//  or `sparse-undefined` preset

/**
 * @type {import('typeson').TypeSpecSet}
 */
const undef$1 = {
    undef: {
        test (x, stateObj) {
            return typeof x === 'undefined' &&
                (stateObj.ownKeys || !('ownKeys' in stateObj));
        },
        replace (/* n */) { return 0; },
        revive (/* s */) {
            // Will add `undefined` (returning `undefined` would instead
            //   avoid explicitly setting)
            return new s();
        }
    }
};

/**
 * @type {import('typeson').TypeSpecSet}
 */
const userObject = {
    userObject: {
        test (x /* , stateObj */) { return isUserObject(x); },
        replace (n) { return {...n}; },
        revive (s) { return s; }
    }
};

/**
 * @type {import('typeson').Preset}
 */
const arrayNonindexKeys = [
    {
        arrayNonindexKeys: {
            testPlainObjects: true,
            test (x, stateObj) {
                if (Array.isArray(x)) {
                    if (
                        // By avoiding serializing arrays into objects which
                        //  have only positive-integer keys, we reduce
                        //  size and improve revival performance; arrays with
                        //  non-index keys will be larger however
                        Object.keys(x).some((k) => {
                            //  No need to check for `isNaN` or
                            //   `isNaN(Number.parseInt())` as `NaN` will be
                            //   treated as a string.
                            //  No need to do check as
                            //   `Number.parseInt(Number())` since scientific
                            //   notation will be pre-resolved if a number
                            //   was given, and it will otherwise be a string
                            return String(Number.parseInt(k)) !== k;
                        })
                    ) {
                        stateObj.iterateIn = 'object';
                        stateObj.addLength = true;
                    }
                    return true;
                }
                return false;
            },
            replace (a, stateObj) {
                // Catch sparse undefined
                stateObj.iterateUnsetNumeric = true;
                return a;
            },
            revive (o) {
                if (Array.isArray(o)) {
                    return o;
                }

                /**
                 * @type {{[key: string]: any}}
                 */
                const arr = [];
                // No map here as may be a sparse array (including
                //   with `length` set)
                Object.entries(o).forEach(([key, val]) => {
                    arr[key] = val;
                });
                return arr;
            }
        }
    },
    {
        sparseUndefined: {
            test (x, stateObj) {
                return typeof x === 'undefined' && stateObj.ownKeys === false;
            },
            replace (/* n */) { return 0; },
            revive (/* s */) { return undefined; } // Will avoid adding anything
        }
    }
];

/**
 * @type {import('typeson').Preset}
 */
const specialNumbers = [
    nan,
    infinity,
    negativeInfinity,
    negativeZero
];

/* This preset includes types that are built-in into the JavaScript
    language itself, this should work universally.

  Types that were added in ES6 or beyond will be checked before inclusion
   so that this module can be consumed by both ES5 and ES6 environments.

  Some types cannot be encapsulated because their inner state is private:
    `WeakMap`, `WeakSet`.

  The Function type is not included because their closures would not be
    serialized, so a revived Function that uses closures would not behave
    as expected.

  Symbols are similarly not included.
*/


/**
 * @type {import('typeson').Preset}
 */
const expObj$1 = [
    undef$1,
    // ES5
    arrayNonindexKeys, primitiveObjects, specialNumbers,
    date, error, errors, regexp
].concat(
    // ES2015 (ES6)
    /* c8 ignore next */
    typeof Map === 'function' ? map : [],
    /* c8 ignore next */
    typeof Set === 'function' ? set : [],
    /* c8 ignore next */
    typeof ArrayBuffer === 'function' ? arraybuffer : [],
    /* c8 ignore next */
    typeof Uint8Array === 'function' ? typedArrays : [],
    /* c8 ignore next */
    typeof DataView === 'function' ? dataview : [],
    /* c8 ignore next */
    typeof Intl !== 'undefined' ? intlTypes : [],

    /* c8 ignore next */
    typeof BigInt !== 'undefined' ? [bigint, bigintObject] : []
);

/*
When communicating via `postMessage()` (`Worker.postMessage()` or
`window.postMessage()`), the browser will use a similar algorithm as Typeson
does to encapsulate and revive all items in the structure (aka the structured
clone algorithm). This algorithm supports all built-in types as well as many
DOM types. Therefore, only types that are not included in the structured clone
algorithm need to be registered, which is:

* Error
* Specific Errors like SyntaxError, TypeError, etc.
* Any custom type you want to send across window- or worker boundraries

This preset will only include the Error types and you can register your
custom types after having registered these.
*/


/**
 * @type {import('typeson').Preset}
 */
const postmessage = [
    error,
    errors
];

/**
 * @type {import('typeson').Preset}
 */
const socketio = [
    expObj$1,
    // Leave ArrayBuffer as is, and let socket.io stream it instead.
    {arraybuffer: null},
    // Encapsulate TypedArrays in ArrayBuffers instead of base64 strings.
    typedArraysSocketIO
];

/**
 * @type {import('typeson').Preset}
 */
const sparseUndefined = [
    {
        sparseArrays: {
            testPlainObjects: true,
            test (x) { return Array.isArray(x); },
            replace (a, stateObj) {
                stateObj.iterateUnsetNumeric = true;
                return a;
            }
        }
    },
    {
        sparseUndefined: {
            test (x, stateObj) {
                return typeof x === 'undefined' && stateObj.ownKeys === false;
            },
            replace (/* n */) { return 0; },
            revive (/* s */) { return undefined; } // Will avoid adding anything
        }
    }
];

/* This preset includes types for the Structured Cloning Algorithm. */


/**
 * @type {import('typeson').Preset}
 */
const expObj = [
    // ES5
    userObject, // Processed last (non-builtin)

    undef$1,
    arrayNonindexKeys, primitiveObjects, specialNumbers,
    date, regexp,

    // Non-built-ins
    imagedata,
    imagebitmap, // Async return
    file,
    filelist,
    blob,
    error,
    errors
].concat(
    // ES2015 (ES6)
    /* c8 ignore next */
    typeof Map === 'function' ? map : [],
    /* c8 ignore next */
    typeof Set === 'function' ? set : [],
    /* c8 ignore next */
    typeof ArrayBuffer === 'function' ? arraybuffer : [],
    /* c8 ignore next */
    typeof Uint8Array === 'function' ? typedArrays : [],
    /* c8 ignore next */
    typeof DataView === 'function' ? dataview : [],
    /* c8 ignore next */
    typeof crypto !== 'undefined' ? cryptokey : [],
    /* c8 ignore next */
    typeof BigInt !== 'undefined' ? [bigint, bigintObject] : [],
    /* c8 ignore next */
    typeof DOMException !== 'undefined' ? domexception : [],
    /* c8 ignore next */
    typeof DOMRect !== 'undefined' ? domrect : [],
    /* c8 ignore next */
    typeof DOMPoint !== 'undefined' ? dompoint : [],
    /* c8 ignore next */
    typeof DOMQuad !== 'undefined' ? domquad : [],
    /* c8 ignore next */
    typeof DOMMatrix !== 'undefined' ? dommatrix : []
);

/**
 * @type {import('typeson').Preset}
 */
const structuredCloningThrowing = expObj.concat({
    checkDataCloneException: {
        test (val) {
            // Should also throw with:
            // 1. `IsDetachedBuffer` (a process not called within the
            //      ECMAScript spec)
            // 2. `IsCallable` (covered by `typeof === 'function'` or a
            //       function's `toStringTag`)
            // 3. internal slots besides [[Prototype]] or [[Extensible]] (e.g.,
            //        [[PromiseState]] or [[WeakMapData]])
            // 4. exotic object (e.g., `Proxy`) (unless an `%ObjectPrototype%`
            //      intrinsic object) (which does not have default
            //      behavior for one or more of the essential internal methods
            //      that are limited to the following for non-function objects
            //      (we auto-exclude functions):
            //      [[GetPrototypeOf]],[[SetPrototypeOf]],[[IsExtensible]],
            //      [[PreventExtensions]],[[GetOwnProperty]],
            //      [[DefineOwnProperty]],[[HasProperty]],
            //      [[Get]],[[Set]],[[Delete]],[[OwnPropertyKeys]]);
            //      except for the standard, built-in exotic objects, we'd need
            //      to know whether these methods had distinct behaviors
            // Note: There is no apparent way for us to detect a `Proxy` and
            //      reject (Chrome at least is not rejecting anyways)
            const stringTag = ({}.toString.call(val).slice(8, -1));
            if (
                [
                    // Symbol's `toStringTag` is only "Symbol" for its initial
                    //   value, so we check `typeof`
                    'symbol',
                    // All functions including bound function exotic objects
                    'function'
                ].includes(typeof val) ||
                [
                    // A non-array exotic object
                    'Arguments',
                    // A non-array exotic object
                    'Module',
                    // Promise instances have an extra slot ([[PromiseState]])
                    //    but not throwing in Chrome `postMessage`
                    'Promise',
                    // WeakMap instances have an extra slot ([[WeakMapData]])
                    //    but not throwing in Chrome `postMessage`
                    'WeakMap',
                    // WeakSet instances have an extra slot ([[WeakSetData]])
                    //    but not throwing in Chrome `postMessage`
                    'WeakSet',

                    // HTML-SPECIFIC
                    'Event',
                    // Also in Node `worker_threads` (currently experimental)
                    'MessageChannel'
                ].includes(stringTag) ||
                /*
                // isClosed is no longer documented
                ((stringTag === 'Blob' || stringTag === 'File') &&
                    val.isClosed) ||
                */
                (val && typeof val === 'object' &&
                    // Duck-type DOM node objects (non-array exotic?
                    //    objects which cannot be cloned by the SCA)
                    typeof val.nodeType === 'number' &&
                    typeof val.insertBefore === 'function')
            ) {
                throw new DOMException(
                    'The object cannot be cloned.', 'DataCloneError'
                );
            }
            return false;
        }
    }
});

/**
 * @type {import('typeson').Preset}
 */
const undef = [
    sparseUndefined,
    undef$1
];

/**
 * @type {import('typeson').Preset}
 */
const universal = [
    expObj$1
    // TODO: Add types that are de-facto universal even though not
    //   built-in into ecmasript standard.
];

export { u as JSON_TYPES, c as Typeson, e as TypesonPromise, s as Undefined, arrayNonindexKeys, arraybuffer, bigint, bigintObject, blob, expObj$1 as builtin, cloneable, cryptokey, dataview, date, domexception, dommatrix, dompoint, domquad, domrect, error, errors, escapeKeyPathComponent, file, filelist, getByKeyPath, getJSONType, hasConstructorOf, imagebitmap, imagedata, infinity, intlTypes, isObject, isPlainObject, isThenable, isUserObject, map, nan, negativeInfinity, negativeZero, nonbuiltinIgnore, postmessage, primitiveObjects, promise, regexp, resurrectable, set, setAtKeyPath, socketio, sparseUndefined, specialNumbers, expObj as structuredCloning, structuredCloningThrowing, symbol, toStringTag, typedArrays, typedArraysSocketIO as typedArraysSocketio, undef$1 as undef, undef as undefPreset, unescapeKeyPathComponent, universal, userObject };
//# sourceMappingURL=index.js.map
