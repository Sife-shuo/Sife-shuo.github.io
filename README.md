# Sife-shuo.github.io
[Chinese version](https://github.com/Sife-shuo/Sife-shuo.github.io/blob/main/README-CN.md)
- ### **Taber**
## Taber
> Online demo address : https://sife-shuo.github.io/Taber/

The tab with super high degree of freedom allows you to customize dynamic content (called plug-in).

With waterfall flow layout, the equipment can be adaptive.

Each Taber will contain a config object and a local config store.

The format of config and plugin is as follows (optional in comments)

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
```plugin.size```  ：Plug in size, each 1 represents represents a plug-in bit, i.e. 90px(Note: After calculation, it is the size of the parent element of the plug-in, not the size of the plug-in content. The actual available content size is ```(w*90-30)``` px and ```(h*90-30)``` px),You can specify an unlimited size. For example, when the user wants to load the plug-in content with w=5 and h=4, you can add the key 'w5h4' to plugin.size and set the value as an html code. The corresponding code will be loaded when loading.(You can also specify w0h0 so that the plug-in does not occupy any place, which is suitable for script plug-in).

```plugin.all```  ：Specify the default html. That is, when the ```plugin.size``` cannot find the size to be displayed, the html in all will be loaded. You can also add the following code in the plug-in to get the w and h you want.
```html
<script>
  const w=Number(window.frameElement.getAttribute('w'));
  const h=Number(window.frameElement.getAttribute('h'));
</script>
```
```plugin.src```  ：Directly specify the&lt;iframe&gt;the src of the framework.

```plugin.space```  :If the plug-in has the space key and the boolean value is true, all html will be ignored, and the plug-in will become **empty in structure**, occupying only the position and no content.

Plug in Example:
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
The plug-in effect:

![Effect example](https://sife-shuo.github.io/pictures/1.00.012.png)


Example of Taber's effect：

![Effect example](https://sife-shuo.github.io/pictures/1.00.010.png)