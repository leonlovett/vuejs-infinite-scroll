(function(e){function t(t){for(var n,l,r=t[0],s=t[1],c=t[2],p=0,h=[];p<r.length;p++)l=r[p],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&h.push(o[l][0]),o[l]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);u&&u(t);while(h.length)h.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,r=1;r<a.length;r++){var s=a[r];0!==o[s]&&(n=!1)}n&&(i.splice(t--,1),e=l(l.s=a[0]))}return e}var n={},o={app:0},i=[];function l(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=n,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(a,n,function(t){return e[t]}.bind(null,n));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],s=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=s;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("64a9"),o=a.n(n);o.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"floater"},[a("div",{staticClass:"row"},[a("div",[a("span",[e._v("Page Size: ")]),a("el-input-number",{on:{change:e.changePageSize},model:{value:e.pageLength,callback:function(t){e.pageLength=t},expression:"pageLength"}})],1),a("div",[a("span",[e._v("Table Size: ")]),e._v("\n        "+e._s(e.tableData.length)+"\n      ")])])]),a("div",{staticClass:"table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{prop:"firstName",label:"First Name"}}),a("el-table-column",{attrs:{prop:"lastName",label:"Last Name"}}),a("el-table-column",{attrs:{prop:"phoneNumber",label:"Phone Number"}}),a("el-table-column",{attrs:{prop:"street",label:"Address"}}),a("el-table-column",{attrs:{prop:"city",label:"City"}}),a("el-table-column",{attrs:{prop:"state",label:"State",width:"70"}}),a("el-table-column",{attrs:{prop:"zipCode",label:"Zip Code",width:"100"}})],1)],1)])},i=[],l=(a("96cf"),a("1da1")),r=a("2909"),s={name:"app",data:function(){return{tableData:[],pageNumber:1,body:null,isScrolling:null,scrollToRow:null,rowsInView:0,maxPages:3,startPage:1,endPage:1,pageSize:50,dataSource:"https://api.lovett.media/fakeData/",scrollStopDelay:200,offsetDistance:200,scrollIntoViewOptions:{behavior:"auto",block:"end",inline:"start"},pageLength:50}},mounted:function(){this.loadData("initial"),this.scrollStop()},methods:{loadData:function(e){var t=this;return fetch(this.dataSource+this.pageLength).then((function(e){return e.json()})).then((function(a){var n,o,i;(0===a.length&&t.$notify({message:"There is no more data",duration:2e3}),"initial"===e)&&(t.tableData.length=0,(n=t.tableData).push.apply(n,Object(r["a"])(a)));"previous"===e&&(t.startPage>1&&(t.removeData(e),(o=t.tableData).unshift.apply(o,Object(r["a"])(a)),t.rowsInView=document.getElementsByClassName("el-table__row"),t.scrollToRow=t.getScrollToRow(e)));"next"===e&&((i=t.tableData).push.apply(i,Object(r["a"])(a)),t.endPage++,t.rowsInView=document.getElementsByClassName("el-table__row"),window.clearTimeout(t.isScrolling))})).then((function(a){t.scrollToRow=t.getScrollToRow(e),t.scrollToRow&&t.scrollToRow.scrollIntoView(t.scrollIntoViewOptions),t.checkDataSize().then((function(a){!0===a&&t.removeData(e)}))}))},loadNextData:function(){this.pageNumber++,this.loadData("next"),window.clearTimeout(this.isScrolling)},loadPreviousData:function(){1===this.startPage?this.$notify({title:"Calm down",message:"You've reached the beginning."}):this.loadData("previous")},checkDataSize:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.endPage-this.startPage+1>this.maxPages);case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),removeData:function(e){"next"===e&&(this.tableData.splice(0,this.pageSize),this.endPage-this.startPage>=2&&this.startPage++),"previous"===e&&(this.tableData.splice(this.tableData.length-this.pageSize,this.pageSize),this.startPage--,this.endPage--),this.scrollToRow=this.getScrollToRow(),this.scrollToRow&&this.scrollToRow.scrollIntoView(this.scrollIntoViewOptions)},getScrollToRow:function(e){var t;return"previous"===e?this.rowsInView[0]:("next"===e&&(t=this.rowsInView.length<=this.pageSize*this.maxPages?this.pageSize:this.pageSize*this.maxPages-this.pageSize),50===this.rowsInView.length&&(t=-1),this.rowsInView[this.rowsInView.length-t])},scrollStop:function(){var e=this;window.addEventListener("scroll",(function(t){window.clearTimeout(e.isScrolling),e.isScrolling=setTimeout((function(){var t=Math.ceil(document.documentElement.scrollTop+window.innerHeight)+e.offsetDistance,a=document.documentElement.offsetHeight,n=t>=a;!0===n&&(e.loadNextData(),window.clearTimeout(e.isScrolling)),40===document.documentElement.scrollTop&&(console.log(document.documentElement.scrollTop),e.loadPreviousData())}),e.scrollStopDelay)}))},changePageSize:function(e){this.pageLength=e,this.loadData("initial")}}},c=s,u=(a("034f"),a("2877")),p=Object(u["a"])(c,o,i,!1,null,null,null),h=p.exports,d=a("5c96"),g=a.n(d),f=(a("0fae"),a("b2d6")),m=a.n(f);n["default"].use(g.a,{locale:m.a}),n["default"].config.productionTip=!1,new n["default"]({render:function(e){return e(h)}}).$mount("#app")},"64a9":function(e,t,a){}});
//# sourceMappingURL=app.166694ac.js.map