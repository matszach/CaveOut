"use strict";class GameState{constructor(){this.level=null;this.player=null;}
entities(callback){if(this.player){callback(this.player);}
this.level?.enemies?.forEach(callback);this.level?.projectiles?.forEach(callback);this.level?.particles?.forEach(callback);}}