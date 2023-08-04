// ==UserScript==
// @name         7k7k
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Play 7k7k Game
// @author       Sifer
// @match        http://*.7k7k.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=firefoxchina.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload=()=>{
        try{
            document.querySelector(".fixedModal.flash_modal2").remove();
        }catch(err){
            console.log("Get a lost DOM");
        }
        document.querySelector(".play_info").style.display="none";
        document.querySelector(".play_game").style.display="block";
        play22.playLoading();
    }
    // Your code here...
})();