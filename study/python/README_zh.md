# python
- [English](./README.md)
- 简体中文
## Comboo.py
一个鼠标键盘自动化工具（依赖：pynput）

使用方法：
+ `mover(<int x>,<int y>)`将鼠标移动到坐标x，y
+ `mouser(<string[p|r]+ mod>,<string whi[l|m|r]{0}>,<int num=1>)`鼠标动作执行（mod：p按，r松，可以提供一个组合，例如`prprp`；whi：l鼠标左键，m鼠标中键，r鼠标右键；num是重复次数，默认为1）
+ `keyer(<string[p|r]+ mod>,<string text{0}>,<int spe=0>)`键盘单字符输入动作执行（mod同上，text是键入的字符，spe是特殊字符标记默认为0，如果是Ctrl等特殊字符需要标记为1）
+ `typer(<string text>)`键盘输入执行，输入整个text字符串
+ `scroll(<int x>,<int y>)`鼠标滚轮事件，向下滚动y个像素，向右滚动x个像素

## funs.py
函数绘制GUI

一个输入框输入函数（sin x要写成sin(x)，未知数只能是x）

第二个输入框是缩放比例，1是正常大小
