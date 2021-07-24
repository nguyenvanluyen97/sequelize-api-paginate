var sequelizeApiPaginate=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";r.default={query:t(1),middle:t(2)}},function(e,r,t){"use strict";e.exports=async function(e,r){return(e=await e.findAndCountAll({limit:r.pageSize,offset:(r.currentPage-1)*r.pageSize||0,order:null!=r.sortField?[[r.sortField,r.sortOrder]]:[],where:r.filters,raw:!0})).totalPages=Math.ceil(e.count/r.pageSize),e.currentPage=r.currentPage,e}},function(e,r,t){"use strict";const n=t(3);e.exports=function(e,r,t){const o={pageSize:e.query.pageSize||null,sortField:e.query.sortField||null,sortOrder:e.query.sortOrder||null,currentPage:e.query.currentPage||null,filters:e.query.filters||null};if(null!=o.filters){const e={};(null!=o.filters?o.filters.split(","):[]).forEach(r=>{let t=n.generateCondition(r);Object.keys(t).forEach(r=>{e[r]=t[r]})}),o.filters=e}else o.filters={};o.pageSize=Number(o.pageSize),(!o.currentPage||o.currentPage<=0)&&(o.currentPage=1),(!o.pageSize||o.pageSize<=0)&&(o.pageSize=10),o.sortField||(o.sortField=null),o.sortOrder||(o.sortOrder=null),e.payload=o,t()}},function(e,r){e.exports.generateCondition=function(e){try{let r="";listOperators.forEach(t=>{e.includes(t.operator)&&(r=t.operator)});let t=e.split(r);t[0]=t[0].trim(),t[1]=t[1].trim();let n={};switch(r){case"==":n[t[0]]=t[1];break;case"!=":n[t[0]]={[Op.not]:t[1]};break;case">":n[t[0]]={[Op.gt]:t[1]};break;case"<":n[t[0]]={[Op.lt]:t[1]};break;case">=":n[t[0]]={[Op.gte]:t[1]};break;case"<=":n[t[0]]={[Op.lte]:t[1]};break;case"@=":n[t[0]]={[Op.like]:t[1]};break;case"_=":n[t[0]]={[Op.startsWith]:t[1]};break;case"!@=":n[t[0]]={[Op.notLike]:t[1]};break;case"!_=":n[t[0]]={[Op.notILike]:"%"+t[1]};break;case"@=*":case"_=*":case"==*":case"!=*":case"!@=*":case"!_=*":n[t[0]]={[Op.like]:t[1]}}return n}catch(e){return console.log("error",e),{}}}}]);