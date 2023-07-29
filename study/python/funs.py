from tkinter import *
from math import *
from tkinter import ttk
def pan():
    canvas.create_line((200, 0, 200,400),fill="black",width="1")
    canvas.create_line((0, 200, 400,200),fill="black",width="1")
    canvas.create_line((7, 195, 2,200,7,205),fill="black",width="1")
    canvas.create_line((195, 7, 200,2,205,7),fill="black",width="1")
    canvas.create_line((393, 195, 398,200,393,205),fill="black",width="1")
    canvas.create_line((195, 395, 200,400,205,395),fill="black",width="1")
x=0
y=0
def f(a,b,c):
    if c==0:
        for x in range(-200,201):
            y1=eval(a)
            y2=eval(b)
            canvas.create_line(((x-1)+200, (200-y1), x+200, (200-y2)), fill="red", width="2")
    else:
        try:
            for x in range(-200, 201,c):
                y1 = c*eval(a)
                y2 = c*eval(b)
                canvas.create_line(((x - c) + 200, (200 - y1), x + 200, (200 - y2)), fill="red", width="2")
        except TypeError:
            c=int(c)
            for x in range(-200, 201,c):
                y1 = c*eval(a)
                y2 = c*eval(b)
                canvas.create_line(((x - c) + 200, (200 - y1), x + 200, (200 - y2)), fill="red", width="2")
def hui():
    try:
        if len(hanshu_h.get()) is not 0:
            hh=hanshu_h.get()
            hk=hanshu_u.get()
            aa = hh.replace("x","(x-"+hk+")")#hh[:(hh.find('x'))] + '(x-' + hk + ')' + hh[hh.find('x') + 1:]
            if hk == '1':
                hk = 0
            else:
                hk = int(hk)
            
            canvas.delete("all")
            pan()
            f(aa, hh, hk)
        else:
            canvas.delete("all")
            pan()
    except KeyError or IndexError:
        pass
hanshu = Tk()
hanshu.title('函数绘制')
#hanshu.iconbitmap('hanshu.ico')
hanshu.columnconfigure(0)
hanshu.rowconfigure(0)
hanshuo=ttk.Frame(hanshu, padding="10")
hanshuo.grid(column=0, row=0, sticky=(N, W, E, S))
hanshu_1_1 = ttk.LabelFrame(hanshuo,text="函数",padding="10")
hanshu_1_1.grid(column=0, row=0, sticky=(N, W, E, S))
hanshu_1_2=ttk.Frame(hanshu_1_1, padding="10")
hanshu_1_2.grid(column=0, row=0, sticky=(N, W, E, S))
hanshu_h = StringVar()
hanshu_2_1 = ttk.Entry(hanshu_1_2, textvariable=hanshu_h,width=32)
hanshu_2_1.grid(column=0, row=0, sticky=(N, W, E, S))
hanshu_2_2 = ttk.Button(hanshu_1_2, text='绘制', command=hui)
hanshu_2_2.grid(column=2, row=0, sticky=(N, W, E, S))
hanshu_u = StringVar()
hanshu_2_3 = ttk.Entry(hanshu_1_2, textvariable=hanshu_u,width=8)
hanshu_2_3.grid(column=1, row=0, sticky=(N, W, E, S))

canvas = Canvas(hanshu_1_1,width=400,height=400)
canvas.grid(column=0, row=2, sticky=(N, W, E, S))
pan()
hanshu.mainloop()
