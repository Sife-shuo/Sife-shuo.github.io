((type)=>{
    var $=(x)=>document.querySelector(x);
    var t=Array.from(document.querySelectorAll("pre.prettyprint code"));
    if(document.cookie.split("; ").filter(p=>p.split("=")[0]=="UserName").length==0){
        if(type&&document.cookie.split("; ").filter(p=>p.split("=")[0]=="UserName").length==0){
            document.cookie="UserName=admin; ";
        }else{
            t.map(p=>p.onclick=(event)=>{mdcp.copyCode(event)})
        }/*复制处理*/
    }
    t.map(p=>p.style.userSelect="text");
    var o=$("#article_content").style;
    o.height="fit-content";
    o.overflow="auto";
    $("#mainBox > main > div.hide-article-box.hide-article-pos.text-center").style.display="none";/*关注博主处理*/
    csdn.copyright.textData="";
    isCurrentUserVip=true;
    var i=$(".hasAvatar > img:nth-child(1)");
    try{if(i.src){i.src="https://g.csdnimg.cn/static/logo/favicon64.ico"}}catch(err){}
})(0)