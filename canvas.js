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
paint=new Paint();

t.childNodes[1].onclick=function(){
    //ctx.clearRect(0,0,1400,600); //very lame cause it repaints shit after :)
    c.width=c.width;
    c.style.backgroundColor ='#FFFFDD';
}
t.childNodes[3].onclick=function(){
    paint.setShape('line');
}
t.childNodes[5].onclick=function(){
    paint.setShape('rect');
}
t.childNodes[7].onclick=function(){
    paint.setShape('circle');
}
t.childNodes[11].onmouseout=function(){
paint.setColor(this.style.backgroundColor);
ctx.strokeStyle=paint.color;
ctx.fillStyle=paint.color;
}
t.childNodes[15].onclick=function(){
paint.setFill();
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
