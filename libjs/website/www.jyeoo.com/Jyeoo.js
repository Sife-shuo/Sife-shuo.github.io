// ==UserScript==
// @name         JyeooTool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sifer
// @match        *://*.jyeoo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=firefoxchina.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(document.querySelector("#isAnswer")){
        document.querySelector("#isAnswer").remove();
    }
    document.body.oncopy=()=>1;
    document.body.oncontextmenu=()=>true;
    const adCallback=()=>0;
    // Your code here...
})();