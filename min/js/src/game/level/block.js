"use strict";class Block{constructor(args){this.blocksMovement=args.blocksMovement;this.blocksSight=args.blocksSight;this.resistance=args.resistance;this.structure=new Resource(Gmt.randInt(args.minStructure,args.maxStructure));this.color=Gmt.choice(args.colors);this.position=null;this.destroyed=false}
place(x,y){this.position=new Gmt.Vertex(x,y);return this;}
damage(power,n){if(power>this.resistance){this.structure.take(n);if(this.structure.isDepleted()){this.destory();}}}
destory(){this.destroyed=true;this.onDestroyed();}
drawMe(cw,cameraX,cameraY,frameNumber){const{x,y}=this.position;const rect=new Gmt.Vertex(x-cameraX,y-cameraY).toSquare(1.05);cw.fillRect(rect,this.color);}
onDestroyed(){}
onRemoved(){}}