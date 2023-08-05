const animate=(id,sty,tod,tim)=>{
    var w=document.getElementById(id);
    var oop=getComputedStyle(w,null)[sty];
    const add=(Number(tod.match(/[0-9.]{1,}/g)[0])-Number(oop.match(/[0-9.]{1,}/g)[0]))/(tim*100);
    var gh=0;
    var sd=setInterval(()=>{if(gh==tim*100-1){clearInterval(sd)};gh++;w['style'][sty]=oop.replace(oop.match(/[0-9]{1,}/g)[0],String(Number(oop.match(/[0-9.]{1,}/g)[0])+gh*add))},10);
};
const animateAll=(iid,obj,tt)=>{
    for(var i=0;i<Object.keys(obj).length;i++){
        animate(iid,Object.keys(obj)[i],obj[Object.keys(obj)[i]],tt);
    };
};