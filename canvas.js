var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var t= document.getElementById('toolbar')
var coord = document.getElementById('coord');
var rect = c.getBoundingClientRect()
var Paint= function(){
    this.shape='free';
    this.x=0;
    this.y=0;
    this.color='#000000';
    this.fill=false;
    this.width=1;
    this.gradient=false;
    this.border=false;
    this.gradientColor='#000000'
    this.text='';
    this.action=[];
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
Paint.prototype.setText=function(text){
    this.text=text;
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
Paint.prototype.setGradient=function(){
    if(this.gradient){
        this.gradient=false;
    }
    else{
        this.gradient=true;
    }
}
Paint.prototype.setGradientColor=function(color){
    this.gradientColor=color;
}
Paint.prototype.setBorder=function(){
    if(this.border){
        this.border=false;
    }
    else{
        this.border=true;
    }
}
Paint.prototype.addAction=function (action){
    this.action.push(action);
}
Paint.prototype.undo=function (){
    var l=this.action.length;
    if(l>1){
        this.action.pop();
        ctx.putImageData(this.action[l-2].state,0,0);
    }
    else{
        this.action.pop();
        c.width=c.width;
        c.style.backgroundColor ='#FFFFDD';
        ctx.strokeStyle=paint.color;
        ctx.fillStyle=paint.color;
        ctx.lineWidth=paint.width;
    }

}


setFillStyle=function(style){
    ctx.fillStyle=style;
}

paint=new Paint();

t.childNodes[1].onclick=function(){
    //ctx.clearRect(0,0,1400,600); //very lame cause it repaints shit after :)
    paint.action=[];
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
setFillStyle(paint.color);
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
t.childNodes[23].onclick=function(){//set shape to free
    paint.setShape('free');
}
t.childNodes[27].onclick=function(){//set gradient to be true or false
paint.setGradient();
}
t.childNodes[31].onclick=function(){//set gradient color
paint.setGradientColor(this.style.backgroundColor);
}
t.childNodes[33].onclick=function(e){//set gradient color
c.width=c.width;
c.style.backgroundColor ='#FFFFDD';
var tile_size = paint.width;
var startX = canvas.width / 2;
var startY = canvas.height / 2;
ctx.fillRect(startX, startY, tile_size, tile_size);  
var cx = startX,
    cy = startY; 
document.addEventListener("keydown", function(e){ 
    switch(e.keyCode)
    {
        //left
        case 37:
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
                cx -= tile_size;
        break;
            
        //up
        case 38:
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
                cy -= tile_size;
        break;
            
        //right
        case 39:
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
                cx += tile_size;
        break;
        
        //down
        case 40:
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
                cy += tile_size;
        break;
    
}
})}
t.childNodes[35].onclick=function(){//set shape to text
    paint.setShape('text');
    var msg="Hello";
    var defaultText="Write some text please :D" ;
    paint.setText(prompt(msg,defaultText));                            
}

t.childNodes[41].onclick=function(){//set border 
    paint.setBorder();
}
t.childNodes[43].onclick=function(){//undo
    paint.undo();
}
t.childNodes[45].onclick=function(){//undo
   paint.setShape('bezier');
}
t.childNodes[55].onclick=function(){//undo
   paint.setShape('quadratic');

}
t.childNodes[57].onclick=function(){//save
var img =c.toDataURL("image/png");
localStorage.setItem(0,JSON.stringify(img));   
}
t.childNodes[59].onclick=function(){//save
var img =JSON.parse(localStorage.getItem(0))
document.write('<img src='+img+'>')
}



c.onmousemove = function(evt){    
    var x= evt.clientX - rect.left;
    var y= evt.clientY - rect.top;      
    coord.innerText="x:"+x+"   y:"+y;
    if(paint.shape=='free'){
    move(evt);
    }  
}
c.onmouseout = function(evt){    
    coord.innerText="";
}


c.addEventListener('mousedown', function (evt){    
    var x= evt.clientX- rect.left;
    var y= evt.clientY- rect.top;    
    //ctx.font="12px Arial";
    //ctx.fillText("x:"+x+"   y:"+y,x,y);    
    if(paint.shape!=='free'){
    paint.setX(x);
    paint.setY(y);
    ctx.beginPath();
    ctx.moveTo(x,y);
    }
    else{
        start(evt);
    }

});

c.addEventListener('mouseup',function (evt){
    var x= evt.clientX- rect.left;
    var y= evt.clientY- rect.top;
    //ctx.font="12px Arial";
    //ctx.fillText("x:"+x+"   y:"+y,x,y);    
    switch (paint.shape){
    case 'line':
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.closePath();
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)})  //used for UNDO functionality, high memory usage!!!!!
    break;
    case 'circle':
    ctx.beginPath();
    var r=Math.sqrt( ((paint.x-x)*(paint.x-x))+((paint.y-y)*(paint.y-y)) );
    ctx.arc(paint.x,paint.y,r,0,2*Math.PI);
    if (paint.fill){
        if(paint.gradient){
            var grad=ctx.createRadialGradient(x,y,r/2,paint.x,paint.y,r*2);
            grad.addColorStop(0,paint.color);
            grad.addColorStop(1,paint.gradientColor);
            setFillStyle(grad);
        }
    ctx.fill();
    if (paint.border){
        ctx.strokeStyle=paint.gradientColor;
        ctx.stroke();
    }   
    }
    else{    
    ctx.stroke();
    }
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)}) //used for UNDO functionality, high memory usage!!!!!
    ctx.closePath();
    break;
    case 'rect':
    ctx.beginPath();    
    if (paint.fill){
        if(paint.gradient){
            var grad=ctx.createLinearGradient(x,y,paint.x,paint.y);
            grad.addColorStop(0,paint.color);
            grad.addColorStop(1,paint.gradientColor);
            setFillStyle(grad);
        }
    ctx.rect(paint.x,paint.y,x-paint.x,y-paint.y);
    ctx.fill()
    if (paint.border){
        ctx.strokeStyle=paint.gradientColor;
        ctx.stroke();
    }   
    }
    else{
    ctx.rect(paint.x,paint.y,x-paint.x,y-paint.y);
    ctx.stroke();
    }
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)}) //used for UNDO functionality, high memory usage!!!!!
    ctx.closePath();   
    break;    
    case 'text':
    {
    ctx.font=document.getElementById('textSize').value+"px Arial";
    ctx.fillText(paint.text,x,y);
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)})  //used for UNDO functionality, high memory usage!!!!!
    break;    
    }
    case 'bezier':
    {
    ctx.bezierCurveTo(paint.x,paint.y+100,x,y-100,x,y);
    ctx.stroke();
    ctx.closePath();
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)})  //used for UNDO functionality, high memory usage!!!!!
    break;    
    }
    case 'quadratic':
    {
    var cpx=0;
    var cpy=0;
    cpx=document.getElementById('cp1x').value;
    cpy=document.getElementById('cp1y').value;
    ctx.quadraticCurveTo(cpx,cpy,x,y);
    ctx.stroke();
    ctx.closePath();
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)})  //used for UNDO functionality, high memory usage!!!!!
    break;    
    }
    }
    stop(evt);
});
var clicked = 0;
var start = function(e) {      
    clicked = 1;
    ctx.beginPath(); 
    var x= e.clientX- rect.left;
    var y= e.clientY- rect.top;
    ctx.moveTo(x,y);
    };
var move = function(e) {
    if(clicked){
    var x= e.clientX- rect.left;
    var y= e.clientY- rect.top;
    ctx.lineTo(x,y);
    ctx.stroke();
        }
    };
var stop = function(e) {
    if (paint.shape=='free'){
    //paint.addAction({'state':ctx.getImageData(0,0,1900,800)}) //used for UNDO functionality, high memory usage!!!!!
    }clicked = 0;
    };
    
