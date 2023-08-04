// ==UserScript==
// @name         NOOBOOK
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to change nobook!
// @author       Sifer
// @match        https://*.nobook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var v=fetch;
    window.fetch=function(a,b){
        console.log(arguments);
        if(a=="libs/chem/allEquipmentMessage.json?subjectId=2"){
            return v("https://hx.nobook.com/libs/chem/allEquipmentMessage.json?subjectId=2").then(a=>a.json())
                .then(y=>y.map(e=>{var ti=e;ti.equipments=e.equipments.map(o=>{var t=o;t.isFreeEq=true;if(t.onlyHighSchoolEq){t.onlyHighSchoolEq=false};return t});return ti}))
                .then(w=>(console.log(w),new Response(new Blob([JSON.stringify(w,null,2)],{type:'application/json'}),{"status":200})))
        }
        if(a=="assets/get_scene_tool.json?subjectId=1"){
            return v("https://wl.nobook.com/assets/get_scene_tool.json?subjectId=1").then(a=>a.json())
            .then(o=>({modules:o.modules.map(a=>{var b=a;/*b.grade=1;*/b.list=b.list.map(c=>{var g=c;g.isLock=false;/*g.grade=1*/;g.visible=true;return g});return b;})}))
            .then(w=>(console.log(w),new Response(new Blob([JSON.stringify(w,null,2)],{type:'application/json'}),{"status":200})))
        }
        return v.apply(null,Object.values(arguments));
    }
})();