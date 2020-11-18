"use strict";const Gmt={random(){return Math.random();},chance(chance){return Math.random()<chance;},randBool(){return Gmt.chance(0.5);},randSign(){return Gmt.randBool()?1:-1;},randFloat(min,max){return min+(max-min)*Math.random();},randInt(min,max){return Math.floor(this.randFloat(min,max+1));},choice(list){return list[this.randInt(0,list.length-1)];},shuffle(list){list=this.copyArray(list);for(let i=0;i<list.length;i++){let swapIndex=this.randInt(0,list.length-1)
let temp=list[i];list[i]=list[swapIndex];list[swapIndex]=temp;}
return list;},Perlin:{_Grad:class{constructor(x,y,z){this.x=x;this.y=y;this.z=z;}
dot2(x,y){return this.x*x+this.y*y;}
dot3(x,y,z){return this.x*x+this.y*y+this.z*z;}},init(){Gmt.Perlin._gradBase=[new Gmt.Perlin._Grad(1,1,0),new Gmt.Perlin._Grad(-1,1,0),new Gmt.Perlin._Grad(1,-1,0),new Gmt.Perlin._Grad(-1,-1,0),new Gmt.Perlin._Grad(1,0,1),new Gmt.Perlin._Grad(-1,0,1),new Gmt.Perlin._Grad(1,0,-1),new Gmt.Perlin._Grad(-1,0,-1),new Gmt.Perlin._Grad(0,1,1),new Gmt.Perlin._Grad(0,-1,1),new Gmt.Perlin._Grad(0,1,-1),new Gmt.Perlin._Grad(0,-1,-1)];Gmt.Perlin._p=Gmt.shuffle(Gmt.range(0,255));Gmt.Perlin._perm=Gmt.constructArray(512,i=>Gmt.Perlin._p[i%256]);Gmt.Perlin._grad=Gmt.constructArray(512,i=>Gmt.Perlin._gradBase[i%12]);return Gmt.Perlin;},_fade(t){return t*t*t*(t*(t*6-15)+10);},_lerp(a,b,t){return(1-t)*a+t*b;},v2d(x,y){let fx=Math.floor(x);let fy=Math.floor(y);x=x-fx;y=y-fy;fx=fx&255;fy=fy&255;var n00=Gmt.Perlin._grad[fx+Gmt.Perlin._perm[fy]].dot2(x,y);var n01=Gmt.Perlin._grad[fx+Gmt.Perlin._perm[fy+1]].dot2(x,y-1);var n10=Gmt.Perlin._grad[fx+1+Gmt.Perlin._perm[fy]].dot2(x-1,y);var n11=Gmt.Perlin._grad[fx+1+Gmt.Perlin._perm[fy+1]].dot2(x-1,y-1);var u=Gmt.Perlin._fade(x);return Gmt.Perlin._lerp(Gmt.Perlin._lerp(n00,n10,u),Gmt.Perlin._lerp(n01,n11,u),Gmt.Perlin._fade(y));},map2d(options){let xSize=options.xSize||100;let ySize=options.ySize||100;let xStep=options.xStep||100;let yStep=options.yStep||100;let xSeed=options.xSeed||0;let ySeed=options.ySeed||0;let normMin=options.normMin||-1;let normMax=options.normMax||1;let t=new Gmt.Typed2DArray(xSize,ySize,Float32Array);t.iter((x,y)=>{let v=Gmt.Perlin.v2d((x+xSeed)/xStep,(y+ySeed)/yStep);t.put(x,y,Gmt.normalize(v,-1,1,normMin,normMax));});return t;}},clamp(num,min,max){return num<=min?min:num>=max?max:num;},normalize(value,baseMin,baseMax,targetMin,targetMax){let level=(value-baseMin)/(baseMax-baseMin);return targetMin+(targetMax-targetMin)*level;},between(num,min,max){return num>=min&&num<=max;},ease(current,target,step){step=step||1;if(Math.abs(current-target)<=step){return target;}else if(current>target){return current-step;}else{return current+step;}},iter1D(xSize,func){for(let x=0;x<xSize;x++){func(x);}},iter2D(xSize,ySize,func){for(let x=0;x<xSize;x++){for(let y=0;y<ySize;y++){func(x,y);}}},iter3D(xSize,ySize,zSize,func){for(let x=0;x<xSize;x++){for(let y=0;y<ySize;y++){for(let z=0;z<zSize;z++){func(x,y,z);}}}},iter4D(xSize,ySize,zSize,wSize,func){for(let x=0;x<xSize;x++){for(let y=0;y<ySize;y++){for(let z=0;z<zSize;z++){for(let w=0;w<wSize;w++){func(x,y,z,w);}}}}},copyArray(arr){let newArr=new Array(arr.length);arr.forEach((e,i)=>newArr[i]=e);return newArr;},range(min,max,step){step=step||1;let arr=[];while(min<=max){arr.push(min);min+=step;}
return arr;},constructArray(len,func){let arr=[];Gmt.iter1D(len,i=>arr.push(func(i)));return arr;},fromArray(array,func){let arr=[];array.forEach(i=>arr.push(func(i)));return arr;},array2D(sizeX,sizeY,defaultValue){let arr=new Array(sizeX);for(let x=0;x<sizeX;x++){let row=new Array(sizeY);if(defaultValue!=undefined){for(let y=0;y<sizeY;y++){row[y]=defaultValue;}}
arr[x]=row;}
return arr;},Counter:class{constructor(baseValue,step){this.value=baseValue||0;this.step=step||0
this.value-=this.step;}
next(){return this.value+=this.step;}
reset(){this.value=-this.step;}},RingArray:class{constructor(baseArray){this.values=baseArray||[];this.i=0;}
add(item){this.values.push(item);return this;}
replace(item){this.values[this.i]=item;return this;}
reset(){this.i=0;return this;}
get(){return this.values[this.i];}
next(step){step=step||1;this.i+=step;this.i=this.i<this.values.length?this.i:(this.i-this.values.length);return this.get();}
prev(step){step=step||1;this.i-=step;this.i=this.i>=0?this.i:(this.values.length+this.i);return this.get();}},RingCounter:class{constructor(min,max,step){this.min=min||0;this.max=max||100;this.step=step||0;this.value=this.min-this.step;}
next(){this.value+=this.step;this.value=this.value<=this.max?this.value:(this.value-this.max+this.min-1);return this.value;}
reset(){this.value=this.min-this.step;return this;}},BackAndForthArray:class{constructor(baseArray){this.values=baseArray||[];this.i=0;this.directionForward=true;}
add(item){this.values.push(item);return this;}
replace(item){this.values[this.i]=item;return this;}
reset(){this.i=0;this.directionForward=true;return this;}
reverse(){this.directionForward=!this.directionForward;return this;}
get(){return this.values[this.i];}
next(step){step=step||1;if(this.directionForward){this.i+=step;if(this.i>=this.values.length){this.i=2*this.values.length-this.i;this.directionForward=false;}}else{this.i-=step;if(this.i<0){this.i*=-1;this.directionForward=true;}}
return this.get();}
prev(step){step=step||1;return this.next(-step);}},Table2D:class{constructor(xSize,ySize,defaultValue){this.xSize=xSize;this.ySize=ySize;this.values=Gmt.array2D(xSize,ySize,defaultValue);}
get(x,y){return this.values[x][y];}
slice(x,y,width,height){let slice=new Gmt.Table2D(width,height);this.iterSlice(x,y,width,height,(xi,yi,e)=>{slice.put(xi-x,yi-y,e);});return slice;}
put(x,y,value){this.values[x][y]=value;return this;}
iter(func){for(let x=0;x<this.xSize;x++){for(let y=0;y<this.ySize;y++){func(x,y,this.get(x,y));}}
return this;}
iterSlice(x,y,width,height,func){let maxX=x+width;let maxY=y+height;for(let xi=x;xi<maxX;xi++){for(let yi=y;yi<maxY;yi++){func(xi,yi,this.get(xi,yi));}}
return this;}
isInRange(x,y){return x>=0&&x<this.xSize&&y>=0&&y<this.ySize;}},Typed2DArray:class{constructor(sizeX,sizeY,type,defaultValue){this._sizeX=sizeX;this._sizeY=sizeY;type=type||Int32Array;this._values=new type(sizeX*sizeY);this._values.fill(defaultValue||0);}
_convertIndex(x,y){return x+y*this._sizeX;};get(x,y){return this._values[this._convertIndex(x,y)];}
put(x,y,value){this._values[this._convertIndex(x,y)]=value;return this;}
iter(funct){for(let x=0;x<this._sizeX;x++){for(let y=0;y<this._sizeY;y++){funct(x,y,this.get(x,y));}}}
isInRange(x,y){let index=this._convertIndex(x,y);return Gmt.between(index,0,this._values.length-1);}},PI:Math.PI,E:Math.E,_RAD_TO_DEG_MOD:180/Math.PI,_DEG_TO_RAD_MOD:Math.PI/180,rad(n){return Gmt.PI*n;},radToDeg(rad){return rad*Gmt._RAD_TO_DEG_MOD;},degToRad(deg){return deg*Gmt._DEG_TO_RAD_MOD;},polarToCartesian(r,phi){return{x:r*Math.cos(phi),y:r*Math.sin(phi)};},cartesianToPolar(x,y){let phi;if(x==0){if(y>0){phi=Gmt.PI/2;}else{phi=Gmt.PI/2*3;}}else{phi=Math.atan(y/x);if(x<0){phi+=Gmt.PI;}}
return{r:Gmt.Distance.plain(0,0,x,y),phi:phi};},Vertex:class{constructor(x,y){this.x=x;this.y=y;}
move(dx,dy){this.x+=dx;this.y+=dy;return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
moveAway(otherVertex,distance){let distanceToOtherVertex=this.distanceTo(otherVertex);if(distanceToOtherVertex==0){return this;}
let d=distance/distanceToOtherVertex;let dx=d*(this.x-otherVertex.x);let dy=d*(this.y-otherVertex.y);return this.move(dx,dy);}
moveTowards(otherVertex,distance){let distanceToOtherVertex=this.distanceTo(otherVertex);if(distanceToOtherVertex==0){return this;}
let d=distance/distanceToOtherVertex;let dx=d*(otherVertex.x-this.x);let dy=d*(otherVertex.y-this.y);return this.move(dx,dy);}
place(x,y){this.x=x;this.y=y;return this;}
rotate(pivot,angle){let r=this.distanceTo(pivot);let pCrd=Gmt.cartesianToPolar(this.x-pivot.x,this.y-pivot.y);let cCrd=Gmt.polarToCartesian(r,angle+pCrd.phi);this.place(cCrd.x+pivot.x,cCrd.y+pivot.y);return this;}
toCircle(radius){return new Gmt.Circle(this.x,this.y,radius);}
toRectangle(width,height){return new Gmt.Rectangle(this.x-width/2,this.y-height/2,width,height);}
toSquare(sideLength){return this.toRectangle(sideLength,sideLength);}
copy(){return new Gmt.Vertex(this.x,this.y);}
equals(otherVertex){return this.x==otherVertex.x&&this.y==otherVertex.y;}
distanceTo(otherVertex){return Gmt.Distance.vertices(this,otherVertex);}},Segment:class{constructor(x1,y1,x2,y2){this.start=new Gmt.Vertex(x1,y1);this.end=new Gmt.Vertex(x2,y2);}
move(dx,dy){this.start.move(dx,dy);this.end.move(dx,dy);return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
rotate(pivot,angle){this.start.rotate(pivot,angle);this.end.rotate(pivot,angle);return this;}
copy(){return new Gmt.Segment(this.start.x,this.start.y,this.end.x,this.end.y);}
length(){return Gmt.Distance.vertices(this.start,this.end);}},segmentFromRay(x,y,radius,direction){let cart=Gmt.polarToCartesian(radius,direction);return new Gmt.Segment(x,y,x+cart.x,y+cart.y);},PolyLine:class{constructor(x,y){this.vertices=[];if(x&&y){this.vertices.push(new Gmt.Vertex(x,y));}}
add(x,y){this.vertices.push(new Gmt.Vertex(x,y));return this;}
push(vertex){this.vertices.push(vertex);return this;}
move(x,y){this.vertices.forEach(e=>e.move(x,y));return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
rotate(pivot,angle){this.vertices.forEach(e=>e.rotate(pivot,angle));return this;}
toSegments(){let segments=[];for(let i=0;i<this.vertices.length-1;i++){let v1=this.vertices[i];let v2=this.vertices[i+1];segments.push(new Gmt.Segment(v1.x,v1.y,v2.x,v2.y));}
return segments;}
toVertices(){return this.vertices;}
toPolygon(){let pg=new Gmt.Polygon();pg.body=this;return pg;}
copy(){let pl=new Gmt.PolyLine();this.vertices.forEach(v=>pl.vertices.push(v.copy()));return pl;}
length(){let len=0;this.toSegments().forEach(s=>len+=s.length());return len;}},Polygon:class{constructor(x,y){this.body=new Gmt.PolyLine(x,y);}
add(x,y){this.body.add(x,y);return this;}
push(vertex){this.body.push(vertex);return this;}
move(x,y){this.body.move(x,y);return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
rotate(pivot,angle){this.body.rotate(pivot,angle);return this;}
toSegments(){let segments=this.body.toSegments();let vs=this.toVertices()[0];let ve=this.toVertices()[this.toVertices().length-1];segments.push(new Gmt.Segment(vs.x,vs.y,ve.x,ve.y));return segments;}
toVertices(){return this.body.toVertices();}
copy(){let pg=new Gmt.Polygon();pg.body=this.body.copy();return pg;}
getCircumference(){let len=0;this.toSegments().forEach(s=>len+=s.length());return len;}},Circle:class{constructor(x,y,radius){this.x=x;this.y=y;this.radius=radius;}
move(dx,dy){this.x+=dx;this.y+=dy;return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
rotate(pivot,angle){let center=this.getCenter();center.rotate(pivot,angle);this.x=center.x;this.y=center.y;return this;}
scale(scale){this.radius*=scale;return this;}
toPolygon(vertices,rotation){return Gmt.polygonInCircle(this,vertices,rotation);}
getCenter(){return new Gmt.Vertex(this.x,this.y);}
getArea(){return Gmt.PI*Gmt.PI*this.radius;}
getCircumference(){return 2*Gmt.PI*this.radius;}
getDiamater(){return 2*this.radius;}
copy(){return new Gmt.Circle(this.x,this.y,this.radius);}},Rectangle:class{constructor(x,y,width,height){this.x=x;this.y=y;this.width=width;this.height=height;}
move(dx,dy){this.x+=dx;this.y+=dy;return this;}
movePolar(distance,direction){let crt=Gmt.polarToCartesian(distance,direction);this.move(crt.x,crt.y);}
rotate(pivot,angle){let root=new Gmt.Vertex(this.x,this.y);root.rotate(pivot,angle);this.x=root.x;this.y=root.y;return this;}
scale(scale){this.width*=scale;this.height*=scale;return this;}
getCenter(){return new Gmt.Vertex(this.x+this.width/2,this.y+this.height/2);}
getArea(){return this.width*this.height;}
toVertices(){return[new Gmt.Vertex(this.x,this.y),new Gmt.Vertex(this.x,this.y+this.height),new Gmt.Vertex(this.x+this.width,this.y),new Gmt.Vertex(this.x+this.width,this.y+this.height)];}
toPolygon(){return new Gmt.Polygon(this.x,this.y).add(this.x,this.y+this.height).add(this.x+this.width,this.y).add(this.x+this.width,this.y+this.height);}
toSegments(){return this.toPolygon().toSegments();}
getCircumference(){return 2*(this.width+this.height);}
getDiagonal(){return 2*this.radius;}
copy(){return new Gmt.Rectangle(this.x,this.y,this.width,this.height);}},polyLineFromList(...coordinates){if(coordinates.length%2!=0){throw"Coordinate list of odd length.";}
let pl=new Gmt.PolyLine();for(let i=0;i<coordinates.length;){pl.add(coordinates[i++],coordinates[i++]);}
return pl;},polygonFromList(...coordinates){if(coordinates.length%2!=0){throw"Coordinate list of odd length.";}
let pg=new Gmt.Polygon();for(let i=0;i<coordinates.length;){pg.add(coordinates[i++],coordinates[i++]);}
return pg;},polygonInCircle(circle,nofVertices,rotation){nofVertices=nofVertices||4;rotation=rotation||0;let angle=2*Gmt.PI/nofVertices;let pg=new Gmt.Polygon();for(let i=0;i<nofVertices;i++){let crd=Gmt.polarToCartesian(circle.radius,rotation+angle*i);pg.add(circle.x+crd.x,circle.y+crd.y);}
return pg;},Distance:{plain(x1,y1,x2,y2){let dx=x1-x2;let dy=y1-y2;return Math.sqrt(dx*dx+dy*dy);},vertices(v1,v2){return Gmt.Distance.plain(v1.x,v1.y,v2.x,v2.y);},vertexVsCircle(v,c){return Gmt.Distance.plain(v.x,v.y,c.x,c.y)-c.radius;},circles(c1,c2){return Gmt.Distance.plain(c1.x,c1.y,c2.x,c2.y)-c1.radius-c2.radius;}},Collision:{vertices(v1,v2){return v1.x==v2.x&&v1.y==v2.y;},vertexVsCircle(v,c){return Gmt.Distance.vertexVsCircle(v,c)<0;},circles(c1,c2){return Gmt.Distance.circles(c1,c2)<0;},segments(s1,s2){return Gmt.Intersection.segments(s1,s2).intersect;}},Intersection:{segments(s1,s2){let tNom=(s1.start.x-s2.start.x)*(s2.start.y-s2.end.y)-(s1.start.y-s2.start.y)*(s2.start.x-s2.end.x);let uNom=-((s1.start.x-s1.end.x)*(s1.start.y-s2.start.y)-(s1.start.y-s1.end.y)*(s1.start.x-s2.start.x));let tDen=(s1.start.x-s1.end.x)*(s2.start.y-s2.end.y)-(s1.start.y-s1.end.y)*(s2.start.x-s2.end.x);if(tDen==0){return{parallel:true,vertex:null,intersect:false};}
let t=tNom/tDen;let u=uNom/tDen;return{parallel:false,vertex:new Gmt.Vertex(s1.start.x+t*(s1.end.x-s1.start.x),s1.start.y+t*(s1.end.y-s1.start.y)),intersect:Gmt.between(t,0,1)&&Gmt.between(u,0,1),t:t,u:u};},sliceRay(ray,edge){let info=Gmt.Intersection.segments(ray,edge);if(info.intersect){ray=ray.copy();ray.end=info.vertex;}
return ray;},castRay(ray,edges){ray=ray.copy();edges.forEach(e=>{ray=Gmt.Intersection.sliceRay(ray,e);});return ray;}},echo(iterations,delay,func){Gmt.times(iterations,(i)=>setTimeout(func,delay*i,i));},now(){return new Date().getTime();},Interval:{start(delay,func,arg){return setInterval(func,delay,arg);},close(interval){clearInterval(interval);return interval;}},Loop:class{constructor(fps,func){this.fps=fps;this.func=func;this.interval=null;this.frameCount=0;this.time=Gmt.now();}
start(){this.interval=Gmt.Interval.start(1000/this.fps,(loop)=>{loop.frameCount++;loop.func(loop);loop.time=Gmt.now();},this);return this;}
stop(){Gmt.Interval.close(this.interval);return this;}
getFrame(){return this.frameCount;}
getDelay(){return Gmt.now()-this.time;}
getFPS(){return 1000/this.getDelay();}},Agent:class{constructor(intervalTimer,act){this.interval=null;this.intervalTimer=intervalTimer;}
act(){}
start(){let agent=this;this.interval=setInterval(()=>agent.act(),this.intervalTimer);return this;}
stop(){clearInterval(this.interval);this.interval=null;return this;}
isActive(){return this.interval!=null;}},Observer:class{constructor(options){if(!options.lookup){throw'No \"lookup\" option given.';}
this.interval=null;this.value=null;this.lookup=options.lookup;this.time=options.time||200;this.onchange=options.onchange||((newValue,oldValue)=>{});}
start(){this.value=this.lookup();this.interval=setInterval(obs=>{var newValue=obs.lookup();if(obs.value!==newValue){obs.onchange(newValue,obs.value);obs.value=newValue;}},this.time,this);}
stop(){clearInterval(this.interval);this.interval=null;}},Tile:class{constructor(imageReference,x,y,width,height){this.img=imageReference;this.boudingRect=new Gmt.Rectangle(x,y,width,height);}},TileSet:class{constructor(fileUrl,tileSizeX,tileSizeY,borderSize){this.img=new Image();this.img.src=fileUrl;this.xSize=tileSizeX;this.ySize=tileSizeY;this.borderSize=borderSize||1}
get(x,y){return new Gmt.Tile(this.img,x*(this.xSize+this.borderSize),y*(this.ySize+this.borderSize),this.xSize,this.ySize);}},ImageWrapper:class{constructor(fileUrl){this.img=new Image();this.img.src=fileUrl;}
slice(x,y,width,height){return new Gmt.Tile(this.img,x,y,width,height);}},CanvasWrapper:class{constructor(parentID){this.canvas=null;this.context=null;this.parent=null;if(parentID){this.initCanvas(parentID);this.refit();}
this.unit=1;this.offsetX=0;this.offsetY=0;this.onrefit=()=>{};}
setOnRefit(callback){this.onrefit=callback;callback();return this;}
getBoundingRect(){return new Gmt.Rectangle(-this.offsetX/this.unit,-this.offsetY/this.unit,this.canvas.width/this.unit,this.canvas.height/this.unit);}
getSubWrapper(){let sw=new Gmt.CanvasWrapper();sw.canvas=this.canvas;sw.context=this.context;sw.parent=this.parent;sw.unit=this.unit;sw.offsetX=this.offsetX;sw.offsetY=this.offsetY;return sw;}
setUnitSize(u){this.unit=u;return this;}
setOffset(offsetX,offsetY){this.offsetX=offsetX;this.offsetY=offsetY;return this;}
setFillStyle(color){this.context.fillStyle=color||'black';return this;}
setStrokeStyle(color,lineWidth){this.context.strokeStyle=color||'black'
this.context.lineWidth=(lineWidth||1)*this.unit;return this;}
initCanvas(parentID){this.canvas=document.createElement('canvas');this.canvas.classList.add(`${parentID}-canvas`);this.context=this.canvas.getContext('2d');this.parent=document.getElementById(parentID);this.parent.appendChild(this.canvas);let cw=this;window.addEventListener('resize',()=>{cw.refit();cw.onrefit();});return this;}
refit(){this.canvas.width=this.parent.clientWidth;this.canvas.height=this.parent.clientHeight;return this;}
clear(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height);return this;}
fill(color){this.context.fillStyle=color;this.context.fillRect(0,0,this.canvas.width,this.canvas.height);return this;}
fillRect(rect,color){this.setFillStyle(color);this.context.fillRect(rect.x*this.unit+this.offsetX,rect.y*this.unit+this.offsetY,rect.width*this.unit,rect.height*this.unit);return this;}
strokeRect(rect,color,lineWidth){this.setStrokeStyle(color,lineWidth);this.context.strokeRect(rect.x*this.unit+this.offsetX,rect.y*this.unit+this.offsetY,rect.width*this.unit,rect.height*this.unit);return this;}
drawRect(rect,colorFill,colorStroke,lineWidth){this.fillRect(rect,colorFill);this.strokeRect(rect,colorStroke||colorFill,lineWidth);return this;}
strokeSegment(seg,color,lineWidth){this.setStrokeStyle(color,lineWidth);this.context.beginPath();this.context.moveTo(seg.start.x*this.unit+this.offsetX,seg.start.y*this.unit+this.offsetY);this.context.lineTo(seg.end.x*this.unit+this.offsetX,seg.end.y*this.unit+this.offsetY);this.context.stroke();return this;}
strokeSegmentsOpen(segments,color,lineWidth){this.setStrokeStyle(color,lineWidth);this.context.beginPath();let sts=segments[0];this.context.moveTo(sts.start.x*this.unit+this.offsetX,sts.start.y*this.unit+this.offsetY);segments.forEach(seg=>{this.context.lineTo(seg.end.x*this.unit+this.offsetX,seg.end.y*this.unit+this.offsetY);});this.context.stroke();return this;}
strokeSegmentsClosed(segments,color,lineWidth){this.setStrokeStyle(color,lineWidth);this.context.beginPath();let sts=segments[0];this.context.moveTo(sts.start.x*this.unit+this.offsetX,sts.start.y*this.unit+this.offsetY);segments.forEach(seg=>{this.context.lineTo(seg.end.x*this.unit+this.offsetX,seg.end.y*this.unit+this.offsetY);});this.context.closePath();this.context.stroke();return this;}
strokePolyLine(pline,color,lineWidth){this.strokeSegmentsOpen(pline.toSegments(),color,lineWidth);return this;}
fillPolygon(polygon,color){this.setFillStyle(color);let vertices=polygon.toVertices();let vs=vertices[0];this.context.beginPath();this.context.moveTo(vs.x*this.unit+this.offsetX,vs.y*this.unit+this.offsetY,);for(let i=1;i<vertices.length;i++){let v=vertices[i];this.context.lineTo(v.x*this.unit+this.offsetX,v.y*this.unit+this.offsetY,);}
this.context.closePath();this.context.fill();return this;}
strokePolygon(polygon,color,lineWidth){this.strokeSegmentsClosed(polygon.toSegments(),color,lineWidth);return this;}
drawPolygon(rect,colorFill,colorStroke,lineWidth){this.fillPolygon(rect,colorFill);this.strokePolygon(rect,colorStroke||colorFill,lineWidth);return this;}
fillCircle(circle,color){this.setFillStyle(color);this.context.beginPath();this.context.arc(circle.x*this.unit+this.offsetX,circle.y*this.unit+this.offsetY,circle.radius*this.unit,0,Gmt.PI*2);this.context.fill();return this;}
strokeCircle(circle,color,lineWidth){this.setStrokeStyle(color,lineWidth);this.context.beginPath();this.context.arc(circle.x*this.unit+this.offsetX,circle.y*this.unit+this.offsetY,circle.radius*this.unit,0,Gmt.PI*2);this.context.stroke();return this;}
drawCircle(circle,colorFill,colorStroke,lineWidth){this.fillCircle(circle,colorFill);this.strokeCircle(circle,colorStroke||colorFill,lineWidth);return this;}
write(content,x,y,color,size,font,rotation,alpha){this.context.save();this.context.globalAlpha=alpha||1
this.context.translate(x*this.unit+this.offsetX,y*this.unit+this.offsetY,);this.context.rotate(rotation||0);this.setFillStyle(color);size=size||12;font=font||'Arial';this.context.font=`${parseInt(size*this.unit)}px ${font}`;this.context.fillText(content,0,0);this.context.restore();return this;}
drawTile(tile,targetRect,rotation,alpha){this.context.save();this.context.globalAlpha=alpha||1
this.context.translate(targetRect.x*this.unit+this.offsetX,targetRect.y*this.unit+this.offsetY,);this.context.rotate(rotation||0);this.context.drawImage(tile.img,tile.boudingRect.x,tile.boudingRect.y,tile.boudingRect.width,tile.boudingRect.height,-targetRect.width/2*this.unit,-targetRect.height/2*this.unit,targetRect.width*this.unit,targetRect.height*this.unit);this.context.restore();return this;}
rgb(r,g,b){return Gmt.rgb(r,g,b);}
rgba(r,g,b,a){return Gmt.rgba(r,g,b,a);}
linearGradient(startVertex,endVertex,...colorInfo){let grd=this.context.createLinearGradient(startVertex.x*this.unit+this.offsetX,startVertex.y*this.unit+this.offsetY,endVertex.x*this.unit+this.offsetX,endVertex.y*this.unit+this.offsetY);for(let i=0;i<colorInfo.length;){grd.addColorStop(colorInfo[i++],colorInfo[i++]);}
return grd;}
radialGradient(startCircle,endCircle,...colorInfo){let grd=this.context.createRadialGradient(startCircle.x*this.unit+this.offsetX,startCircle.y*this.unit+this.offsetY,startCircle.radius*this.unit,endCircle.x*this.unit+this.offsetX,endCircle.y*this.unit+this.offsetY,endCircle.radius*this.unit);for(let i=0;i<colorInfo.length;){grd.addColorStop(colorInfo[i++],colorInfo[i++]);}
return grd;}},rgb(r,g,b){return`rgb(${r},${g},${b})`;},rgba(r,g,b,a){return`rgba(${r},${g},${b},${a})`;},AudioWrapper:class{constructor(fileUrl){this.src=fileUrl;this.audio=new Audio(fileUrl);}
play(){this.audio.play();return this;}
volume(vol){this.audio.volume=Gmt.clamp(vol,0,1);return this;}
volumeEaseTo(vol,duration){let a=this.audio;let dv=(Gmt.clamp(vol,0,1)-a.volume)/10;Gmt.echo(10,duration/10,()=>a.volume+=dv);return this;}
rate(rate){if(rate<0){return this.pause();}
this.audio.playbackRate=rate;return this;}
rateEaseTo(rate,duration){let a=this.audio;let dr=(rate-a.playbackRate)/10;Gmt.echo(10,duration/10,()=>{if(a.playbackRate+dr<=0){return;}
a.playbackRate+=dr;});return this;}
pause(){this.audio.pause();return this;}
time(time){this.audio.currentTime=time;return this;}
rewind(){return this.time(0);}
reset(){return this.volume(1).rate(1).rewind().pause();}
source(src){this.src=src;this.audio=new Audio(src);return this;}
isOn(){return this.audio.paused();}
getDuration(){return this.audio.duration;}},Input:{_keys:{},_mouse:{posX:0,moveX:0,posY:0,moveY:0,left:false,middle:false,right:false,},init(targetId){let target=targetId?document.getElementById(targetId):document;if(!target){throw`Failure locating target element of ID"${targetId}".`;}
target.onmousemove=(e)=>{Gmt.Input._mouse.posX=e.x;Gmt.Input._mouse.moveX=e.movementX;Gmt.Input._mouse.posY=e.y;Gmt.Input._mouse.moveY=e.movementY;};target.onmousedown=(e)=>{switch(e.button){case 0:this._mouse.left=true;break;case 1:this._mouse.middle=true;break;case 2:this._mouse.right=true;break;}};target.onmouseup=(e)=>{switch(e.button){case 0:this._mouse.left=false;break;case 1:this._mouse.middle=false;break;case 2:this._mouse.right=false;break;}};target.onkeydown=(e)=>{Gmt.Input._keys[e.code]=true;};target.onkeyup=(e)=>{Gmt.Input._keys[e.code]=false;};target.oncontextmenu=()=>{return false;};},key(code){if(code in this._keys){return this._keys[code];}
return false;},keys(...codes){for(let i=0;i<codes.length;i++){if(!this.key(codes[i])){return false;}}
return true;},handleKeys(...args){for(let i=0;i<args.length;){if(this.key(args[i++])){args[i++]();}}},mousePos(){return{x:this._mouse.posX,y:this._mouse.posY};},mousePosVertex(){return new Gmt.Vertex(this._mouse.posX,this._mouse.posY);},mousePosCW(cw){return{x:(this._mouse.posX-cw.offsetX)/cw.unit,y:(this._mouse.posY-cw.offsetY)/cw.unit};},mousePosVertexCW(cw){return new Gmt.Vertex((this._mouse.posX-cw.offsetX)/cw.unit,(this._mouse.posY-cw.offsetY)/cw.unit);},mouseMove(){return{x:this._mouse.moveX,y:this._mouse.moveY};},mouseMoveCW(cw){return{x:this._mouse.moveX/cw.unit,y:this._mouse.moveY/cw.unit};},mouseButtons(){return{left:this._mouse.left,middle:this._mouse.middle,right:this._mouse.right};}},Dice:{d4(){return Gmt.randInt(1,4);},d4s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d4()));return rolls;},d6(){return Gmt.randInt(1,6);},d6s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d6()));return rolls;},d8(){return Gmt.randInt(1,8);},d8s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d8()));return rolls;},d10(){return Gmt.randInt(1,10);},d10s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d10()));return rolls;},d12(){return Gmt.randInt(1,12);},d12s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d12()));return rolls;},d20(){return Gmt.randInt(1,20);},d20s(number){let rolls=[];Gmt.iter1D(number,()=>rolls.push(Gmt.Dice.d20()));return rolls;}},Cascade:class{constructor(elementList,onCascade,shouldMark){this.wrappedElements=Gmt.fromArray(elementList,e=>({element:e,marked:false}));this.onCascade=onCascade||(()=>{});this.shouldMark=shouldMark||(e=>true);}
cascade(){while(this.once()){};}
acyncCascade(){setImmediate(this.cascade);}
intervalCascade(time){let tm=setTimeout(cascade=>{if(!cascade.once()){clearInterval(tm);}},time,this);}
once(){this.wrappedElements=this.wrappedElements.filter(e=>!e.marked);if(this.wrappedElements.length==0){return false;}
this.wrappedElements.forEach(e=>{this.onCascade(this,e.element);if(this.shouldMark(e)){e.marked=true;}});return true;}
add(e){this.wrappedElements.push({element:e,marked:false});}}}