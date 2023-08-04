// ==UserScript==
// @name         4399
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Game Play
// @author       Sifer
// @match        https://www.4399.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=firefoxchina.cn
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

(function() {
    'use strict';
    var $=x=> document.querySelector(x);
    window.onload = function(){
        $("#Anti_open").remove();
        $("#Anti_mask").remove();
        $("#pusher").remove();
    }
})();