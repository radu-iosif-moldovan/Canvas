var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var t= document.getElementById('toolbar')
var coord = document.getElementById('coord');
var rect = c.getBoundingClientRect()
var Paint= function(){
    this.shape='line';
    this.x=0;
    this.y=0;
    this.color='#000000';
    this.fill=false;
    this.width=1;
}

Paint.prototype.setShape=function(shape){
    this.shape=shape;
}
Paint.prototype.setX=function(x){
    this.x=x;
}
Paint.prototype.setY=function(y){
    this.y=y;
}
Paint.prototype.setColor=function(color){
    this.color=color;
}
Paint.prototype.setFill=function(){
    if(this.fill){
        this.fill=false;
    }
    else{
        this.fill=true;
    }
}
Paint.prototype.lineWidth=function(w){
    this.width=this.width+w;
}
paint=new Paint();

t.childNodes[1].onclick=function(){
    //ctx.clearRect(0,0,1400,600); //very lame cause it repaints shit after :)
    c.width=c.width;
    c.style.backgroundColor ='#FFFFDD';
    ctx.strokeStyle=paint.color;
    ctx.fillStyle=paint.color;
    ctx.lineWidth=paint.width;
}
t.childNodes[3].onclick=function(){//set shape to line
    paint.setShape('line');
}
t.childNodes[5].onclick=function(){//set shape to rect
    paint.setShape('rect');
}
t.childNodes[7].onclick=function(){//set shape to circle
    paint.setShape('circle');
}
t.childNodes[11].onmouseout=function(){//color chooser, broken needs fixing
paint.setColor(this.style.backgroundColor);
ctx.strokeStyle=paint.color;
ctx.fillStyle=paint.color;
}
t.childNodes[15].onclick=function(){//set fill to be true or false
paint.setFill();
}
t.childNodes[17].onclick=function(){//increase line width
paint.lineWidth(+1);
ctx.lineWidth=paint.width;
t.childNodes[21].innerText=""+paint.width;
}
t.childNodes[19].onclick=function(){//decrease line width
if(paint.width-1){
paint.lineWidth(-1);
ctx.lineWidth=paint.width;
t.childNodes[21].innerText=""+paint.width;
}
}


c.onmousemove = function(evt){    
    var x= evt.clientX - rect.left;
    var y= evt.clientY - rect.top;      
    coord.innerText="x:"+x+"   y:"+y;    
}
c.onmouseout = function(evt){    
    coord.innerText="";
}


c.addEventListener('mousedown', function (evt){    
    var x= evt.clientX- rect.left;;
    var y= evt.clientY- rect.top;
    //ctx.font="12px Arial";
    //ctx.fillText("x:"+x+"   y:"+y,x,y);
    paint.setX(x);
    paint.setY(y);
    ctx.beginPath();
    ctx.moveTo(x,y);
});

c.addEventListener('mouseup',function (evt){
    var x= evt.clientX- rect.left;;
    var y= evt.clientY- rect.top;
    //ctx.font="12px Arial";
    //ctx.fillText("x:"+x+"   y:"+y,x,y);    
    switch (paint.shape){
    case 'line': 
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.closePath();
    break;
    case 'circle':
    ctx.beginPath();
    var r=Math.sqrt( ((paint.x-x)*(paint.x-x))+((paint.y-y)*(paint.y-y)) );
    ctx.arc(paint.x,paint.y,r,0,2*Math.PI);
    if (paint.fill){
    ctx.fill();
    }
    else{    
    ctx.stroke();
    }
    ctx.closePath();
    break;
    case 'rect':
    ctx.beginPath();    
    if (paint.fill){
    ctx.fillRect(paint.x,paint.y,x-paint.x,y-paint.y);
    }
    else{
    ctx.rect(paint.x,paint.y,x-paint.x,y-paint.y);
    ctx.stroke();
    }
    ctx.closePath();
    break;
    }
});
