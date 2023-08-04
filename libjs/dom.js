$=(p)=>document.querySelector(p);
$$=(p)=>document.querySelectorAll(p)||[];
if(!Element.prototype.remove){Element.prototype.remove=function(){this.parentNode.removeChild(this);}}
Element.prototype.text=function(){return arguments[0]?this.textContent=arguments[0]:this.textContent}
Element.prototype.html=function(){return arguments[0]?this.innerHTML=arguments[0]:this.innerHTML}
Element.prototype.prev=function(){return this.previousElementSibling}
Element.prototype.next=function(){return this.nextElementSibling}
Element.prototype.val=function(){return arguments[0]?this.value=arguments[0]:this.value}
Element.prototype.animate=function(params,speed){
    this.style.transition = 'all ' + speed;
    Object.keys(params).forEach((key)=>{el.style[key]=params[key]});
}


var $h_obj = (x) => Object.prototype.toString.call(x).slice(8, 14) === "Object";

function $h() {
    var main = document.createElement(arguments[0]);
    child = [];
    if (arguments[1]) {
        if ($h_obj(arguments[1])) {
            for (var i in arguments[1]) {
                if (i in HTMLElement.prototype) {
                    if ($h_obj(arguments[1][i])) {
                        for (var k in arguments[1][i]) {
                            main[i][k] = arguments[1][i][k]
                        }
                    } else {
                        main[i] = arguments[1][i]
                    }
                } else {
                    main.setAttribute(i, arguments[1][i])
                }
            }
        } else {
            child.push(arguments[1])
        }
        if (arguments[2]) {
            child.push(arguments[2])
        }
    }
    if (child.length) {
        child = $h_flat(child);
        for (var i in child) {
            if (Object.prototype.toString.call(child[i].__proto__.__proto__.__proto__).slice(8, 15) === "Element") {
                main.append(child[i])
            } else {
                main.innerText = child[i]
            }
        }
    }
    return main;
}

function $h_flat(arr) {
    var t = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            t = t.concat($h_flat(arr[i]))
        } else {
            t.push(arr[i])
        }
    }
    return t
}