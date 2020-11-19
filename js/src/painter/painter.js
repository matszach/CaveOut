"use strict";
const Painter = {

    _canvasWrapper: null,
    _prevOffsetX: 0,
    _prevOffsetY: 0,

    flags: {
        active: false,
        resolution: false,
        stats: true,
        collisions: true,
    },

    init(canvasWrapper) {
        this._canvasWrapper = canvasWrapper;
        this.shader = new Shader(canvasWrapper);
    },

    defaultOffset() {
        this._prevOffsetX = this._canvasWrapper.offsetX;
        this._prevOffsetY = this._canvasWrapper.offsetY;
        this._canvasWrapper.setOffset(0, 0);
    },

    restoreOffset() {
        this._canvasWrapper.setOffset(this._prevOffsetX, this._prevOffsetY);
    },

    flag(name, value) {
        this.flags[name] = value;
    },

    _TEST_resolution() {
        const center = this._canvasWrapper.getBoundingRect().getCenter();
        this._canvasWrapper.strokeRect(center.toRectangle(SCREEN.WIDTH, SCREEN.HEIGHT), 'gray', 0.2);
        this._canvasWrapper.fillRect(center.toSquare(1), 'blue');
        this._canvasWrapper.fillRect(new Gmt.Rectangle(0, 0, 1, 1), 'red');
        this._canvasWrapper.fillRect(new Gmt.Rectangle(SCREEN.WIDTH - 1, 0, 1, 1), 'red');
        this._canvasWrapper.fillRect(new Gmt.Rectangle(0, SCREEN.HEIGHT - 1, 1, 1), 'red');
        this._canvasWrapper.fillRect(new Gmt.Rectangle(SCREEN.WIDTH - 1, SCREEN.HEIGHT - 1, 1, 1), 'red');
    },
    
    displayStats(loop, ox, oy) {
        const cw = this._canvasWrapper;
        this.defaultOffset();
        cw.fillRect(new Gmt.Rectangle(1.5, 1.5, 7, 3.2), cw.rgba(255, 255, 255, 0.1));
        cw.write('FPS: ' + loop.getFPS().toFixed(2), 1.8, 2.5, 'black', 1);
        cw.write('OFFX: ' + ox.toFixed(2), 1.8, 3.5, 'black', 1);
        cw.write('OFFY: ' + oy.toFixed(2), 1.8, 4.5, 'black', 1);
        this.restoreOffset();
    },

    paintFrame(loop) {

        if(!this.flags.active) { 
            return;
        }

        const cw = this._canvasWrapper;
        const pos =  GameManager._state.player.position;
        const ox = pos.x - (SCREEN.WIDTH / 2);
        const oy = pos.y - (SCREEN.HEIGHT / 2);
        const frameNum = loop.getFrame();

        cw.fill('black');

        GameManager._state.level.background?.drawMe(cw, ox, oy, frameNum)
        GameManager._state.level.sliceFields(Math.floor(ox), Math.floor(oy), SCREEN.WIDTH + 2, SCREEN.HEIGHT + 1, (x, y, block) => {
            block?.drawMe(cw, ox, oy, frameNum); 
        });
        GameManager._state.entities(e => e.drawMe(cw, ox, oy, frameNum));  
        this.shader.draw(ox, oy, frameNum);
        
        if(this.flags.collisions) {
            GameManager._state.entities(e => e._drawCollision(cw, ox, oy, frameNum));  // todo a check if entity in range
        }

        if(this.flags.stats) {
            this.displayStats(loop, ox, oy);
        }

        if(this.flags.resolution) {
            this._TEST_resolution();
        }

    }

};
