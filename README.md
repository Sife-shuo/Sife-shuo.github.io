# Sife-shuo.github.io
- ### **Taber**
## Taber
> 在线demo地址 : https://sife-shuo.github.io/Taber/

自由度超高的标签页，允许您自定义动态内容（称为插件）.

使用瀑布流布局，可以自适应设备.

每个Taber会包含一个config对象，会有一个本地的config存储
config和插件（plugin）的格式如下（注释中的为可选内容）.

``` javascript
config:{
  "border-re":plug border-radius,
  "backimg":background,
  "plugtitle":plug name color,
  "plug":pluglist[JSON.stringify(plugin),JSON.stringify(plugin),...],
  "op":oplist[]
}

plugin:{
  "name":,
  "author":,
  "version":,
  "size":{"w1h1":<html>,.....},
  //"all":<html>,
  //"src":,
  //"space":true
}
```
```plugin.size```  ：插件大小，每个1代表90px（注：计算后是插件所在父元素的大小，并不是插件内容的大小，真实可用的内容大小为 ```(w*90-30)``` px 和 ```(h*90-30)``` px）,你可以指定无限的大小，例如：当用户想以w=5,h=4加载插件内容时，你可以在plugin.size中加入键'w5h4'，并将值设为一段html代码，加载时会加载对应代码.

```plugin.all```  ：指定默认html，即当```plugin.size```中找不到用户要显示的大小时，就会加载all中的html,你也可以在插件中加入如下代码得到用户想要的w和h.
```html
<script>
  const w=Number(window.frameElement.getAttribute('w'));
  const h=Number(window.frameElement.getAttribute('h'));
</script>
```
```plugin.src```  ：直接指定要加载的&lt;iframe&gt;框架的src.

```plugin.space```  ：如果插件有space键且值的布尔值为真，则会忽视所有html，该插件会变为**结构空位**，只占位置，没有内容.

插件示例
```javascript
{
  "name": "Clock",
  "author": "Sife",
  "version": "1.0.0",
  "size": {
    "w2h2": "<body style=\"margin: 0;overflow:hidden;\"><canvas width=\"407\"height=\"407\"id=\"canvasOne\" style=\"transform: scale(calc(150 / 407));;position: relative;left: -129px;top: -129px;\"></canvas></body><script type=\"text/javascript\">var myCanvas=document.getElementById(\"canvasOne\");var cxt=myCanvas.getContext(\"2d\");cxt.translate(-96.5,-96.5);function clock(){var date=new Date();var hours=date.getHours();var min=date.getMinutes();var seconds=date.getSeconds();hours=hours>12?hours-12:hours;cxt.clearRect(0,0,myCanvas.height,myCanvas.width);cxt.beginPath();cxt.lineWidth=\"7\";cxt.arc(300,300,200,0,Math.PI*2,true);cxt.fillStyle=\"black\";cxt.fill();cxt.strokeStyle=\"black\";cxt.stroke();cxt.closePath();for(var i=0;i<12;i++){for(var j=0;j<60;j++){cxt.save();cxt.translate(300,300);cxt.rotate(6*j*Math.PI/180);cxt.beginPath();cxt.moveTo(0,-180);cxt.lineTo(0,-190);cxt.lineWidth=\"6\";cxt.strokeStyle=\"white\";cxt.stroke();cxt.closePath();cxt.restore()}cxt.save();cxt.translate(300,300);cxt.rotate(30*i*Math.PI/180);cxt.beginPath();cxt.moveTo(0,-170);cxt.lineTo(0,-195);cxt.lineWidth=\"7\";cxt.strokeStyle=\"white\";cxt.stroke();cxt.closePath();cxt.restore()}cxt.save();cxt.translate(300,300);cxt.beginPath();cxt.rotate((hours*30+min/2+seconds/120)*Math.PI/180);cxt.lineWidth=\"9\";cxt.strokeStyle=\"grey\";cxt.lineCap=\"round\";cxt.moveTo(0,0);cxt.lineTo(0,-100);cxt.stroke();cxt.closePath();cxt.restore();cxt.save();cxt.translate(300,300);cxt.beginPath();cxt.moveTo(0,0);cxt.rotate((min*6+seconds/10)*Math.PI/180);cxt.lineTo(0,-140);cxt.lineWidth=\"6\";cxt.strokeStyle=\"grey\";cxt.lineCap=\"round\";cxt.stroke();cxt.closePath();cxt.restore();cxt.save();cxt.translate(300,300);cxt.beginPath();cxt.rotate(seconds*6*Math.PI/180);cxt.moveTo(0,0);cxt.lineTo(0,-160);cxt.lineWidth=\"3\";cxt.strokeStyle=\"red\";cxt.lineCap=\"round\";cxt.stroke();cxt.closePath();cxt.restore();cxt.save();cxt.translate(300,300);cxt.beginPath();cxt.arc(0,0,6,0,Math.PI*2,true);cxt.fillStyle=\"white\";cxt.fill();cxt.closePath();cxt.restore()}window.setInterval(clock,1000);</script>"
  }
}
```
该插件效果：

![效果示例](https://sife-shuo.github.io/pictures/1.00.012.png)


Taber效果示例：

![效果示例](https://sife-shuo.github.io/pictures/1.00.010.png)