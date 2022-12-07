function create_link(name,image,to,iframe,bcolor,width,height){
    width=arguments[5]||60;
    height=arguments[6]||60;
    bcolor=arguments[4]||'white';
    return JSON.stringify({
    "name": name,
    "author": "Sife",
    "version": "1.0.0",
    "size": iframe?{
        "w1h1": "<body style=\"margin:0;width:60px;height:60px;background-color:"+bcolor+";overflow:hidden\" onclick=\"window.open('"+to+"')\"><img src='"+image+"' style=\"width:"+(width-50>0?'50':width)+"px;height:"+(height-50>0?'50':height)+"px;margin:"+(height-50>0?'5':(60-height)/2)+"px "+(width-50>0?'5':(60-width)/2)+"px\"></body>",
        "w7h7": "<body style=\"margin:0;width:600px;height:600px;overflow:hidden\"><iframe src='"+to+"' style=\"width:600px;height:600px;\"></iframe></body>"
    }:{
      "w1h1": "<body style=\"margin:0;width:60px;height:60px;background-color:"+bcolor+";overflow:hidden\" onclick=\"window.open('"+to+"')\"><img src='"+image+"' style=\"width:"+(width-50>0?'50':width)+"px;height:"+(height-50>0?'50':height)+"px;margin:"+(height-50>0?'5':(60-height)/2)+"px "+(width-50>0?'5':(60-width)/2)+"px\"></body>"
    },
    "all":"<body style=\"margin:0;background-color:"+bcolor+";overflow:hidden\" onclick=\"window.open('"+to+"')\"><img src='"+image+"' style=\"width:"+width+"px;height:"+height+"px;\"></body><script>w=Number(window.frameElement.getAttribute('w'));h=Number(window.frameElement.getAttribute('h'));document.body.style.width=(w*90-30)+\"px\";document.body.style.height=(h*90-30)+\"px\";document.querySelector('body > img:nth-child(1)').style.margin=((h*90-30-"+height+")/2)+\"px \"+((w*90-30-"+width+")/2)+\"px\"</script>"
    })
};
function create_iframe(name,image,to,w,h){
    var a={
    "name": name,
    "author": "Sife",
    "version": "1.0.0",
    "size":{
        "w1h1": "<body style=\"margin:0;width:60px;height:60px;background-color:white;overflow:hidden\" onclick=\"window.open('"+to+"')\"><img src='"+image+"' style=\"width:50px;height:50px;margin:5px 5px\"></body>",
    },
    "all":"<body style=\"margin:0;background-color:white;overflow:hidden\" onclick=\"window.open('"+to+"')\"><img src='"+image+"' style=\"width:60px;height:60px;\"></body><script>w=Number(window.frameElement.getAttribute('w'));h=Number(window.frameElement.getAttribute('h'));document.body.style.width=(w*90-30)+\"px\";document.body.style.height=(h*90-30)+\"px\";document.querySelector('body > img:nth-child(1)').style.margin=((h*90-30-60)/2)+\"px \"+((w*90-30-60)/2)+\"px\"</script>"
    };
    a['size'][`w${w}h${h}`]="<body style=\"margin:0;width:"+(w*90-30)+"px;height:"+(h*90-30)+"px;overflow:hidden\"><iframe src='"+to+"' style=\"width:"+(w*90-30)+"px;height:"+(h*90-30)+"px;\"></iframe></body>";
    return JSON.stringify(a);
}