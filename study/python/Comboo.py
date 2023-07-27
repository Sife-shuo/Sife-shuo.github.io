from sys import argv
from pynput.mouse import Controller,Button
from pynput import keyboard
#mouser x数字y数字Bp Br 左(l)中(m)右(r)n次数
def mover(x,y):
    mouse = Controller()
    mouse.position=(x,y)
def mouser(mod,whi,ho=1):#mod:prprp
    evalstr=""
    mouse = Controller()
    if whi=='l':evalstr='Button.left'
    elif whi=='m':evalstr='Button.middle'
    elif whi=='r':evalstr='Button.right'
    for hidfg in range(int(ho)):
        for i in mod:
            if i=='p':eval("mouse.press("+evalstr+')')
            elif i=='r':eval('mouse.release('+evalstr+')')
    return True
#p/r +text
def keyer(mod,text,spe=0):#spe=0/1
    keys =keyboard.Controller()
    for i in mod:
        if i =='p':keys.press(text if spe==0 else eval('keyboard.Key.'+text))
        elif i == 'r':keys.release(text if spe==0 else eval('keyboard.Key.'+text))
        return True
def typer(text):
    keys =keyboard.Controller()
    keys.type(text)
    return True
def scroll(x,y):
    mouse = Controller()
    mouse.scroll(eval(x),eval(y))

if __name__ == '__main__':
    for i in argv[1:]:
        hjk=i.split(',')
        if hjk[0]=='mouser' or hjk[0]=='-mouser':
            if len(hjk)>3:
                mouser(hjk[1],hjk[2],hjk[3])
            else:mouser(hjk[1],hjk[2])
        elif hjk[0]=='keyer' or hjk[0]=='-keyer':
            if len(hjk)>3:
                keyer(hjk[1],hjk[2],hjk[3])
            else:keyer(hjk[1],hjk[2])
        elif hjk[0]=='typer' or hjk[0]=='-typer':
            typer(hjk[1])
        elif hjk[0]=='gmouse' or hjk[0]=='-gmouse':
            print(Controller().position)
        elif hjk[0]=='mover' or hjk[0]=='-mover':
            mover(hjk[1],hjk[2])
        elif hjk[0]=='scroll' or hjk[0]=='-scroll':
            scroll(hjk[1],hjk[2])
