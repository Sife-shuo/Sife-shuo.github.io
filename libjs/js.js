
/*斐波那切数列生成，n指获得的数列长度*/
(n)=>(n>2?Object({"a":[1,1].concat(Array(n-2).fill()),"p":function(){return (this.a.map((i,q)=>{this.a[q]=i!=1?(this.a[q-1]+this.a[q-2]):1}),this.a)}}).p():[1,1].slice(-n));