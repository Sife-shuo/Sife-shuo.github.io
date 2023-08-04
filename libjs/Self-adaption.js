function sdu(dom,op){
    if(op.w){
        var f=Object.keys(op.w);
        var h= document.body.offsetWidth;
        for(var i=1;i<f.length;i++){
            if(Number(f[i-1])<h&&h<Number(f[i])){
                f=f[i];
                break;
            }
        }
        if(f.push){
            f=f[f.length-1];
        }
        [...document.querySelectorAll(dom)].map(e=>{
            for(var i in op.w[f]){
                e.style[i]=op.w[f][i];
            }
        })
    }
    if(op.h){
        var f=Object.keys(op.h);
        var h= document.body.offsetHeight;
        for(var i=1;i<f.length;i++){
            if(Number(f[i-1])<h&&h<Number(f[i])){
                f=f[i];
                break;
            }
        }
        if(f.push){
            f=f[f.length-1];
        }
        [...document.querySelectorAll(dom)].map(e=>{
            for(var i in op.h[f]){
                e.style[i]=op.h[f][i];
            }
        })
    }
    window.addEventListener("resize",()=>sdu(dom,op))
}