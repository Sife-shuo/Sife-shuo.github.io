# python
## Comboo.py
A mouse and keyboard automation tool(be dependent on pynput)

Usage：
+ `mover(<int x>,<int y>)` Move the mouse to the coordinates x, y
+ `mouser(<string[p|r]+ mod>,<string whi[l|m|r]{0}>,<int num=1>)`Mouse action execution (mod:p=press,r=release,you can provide a combination, such as` prprp`;whi:l=,ouse left,m=mouse middle,r=mouse right;Num is the number of repetitions, defaults to 1)
+ `keyer(<string[p|r]+ mod>,<string text{0}>,<int spe=0>)` Keyboard single character input action execution(mod ditto，Text is the character you will type，Spe is a special character marked with a default value of 0. If it is a special character such as Ctrl, it needs to be marked with a value of 1)
+ `typer(<string text>)` Keyboard input execution, input the entire text string
+ `scroll(<int x>,<int y>)` Mouse wheel event execution, scroll down y pixels, scroll right x pixels

## funs.py
Function drawing GUI

An input box input function (sin x should be written as sin (x), and the unknown number can only be x).

The second input box is the scaling ratio, with 1 being the normal size.
