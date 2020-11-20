"use strict";
class Minimapper {

    constructor(cw) {
        this.cw = cw;
        this.mapUnitNumber = 200;
        this.COLORS = {
            BG: Gmt.rgba(255, 255, 255, 0.1),
            BORDER: Gmt.rgba(255, 255, 255, 0.4),
        };
    }

    draw(frameNum) {
        const uNum = this.mapUnitNumber;
        let {x: px, y: py} = GameManager._state.player.position;
        px = Math.round(px);
        py = Math.round(py);
        const level = GameManager._state.level;
        const imgData = this.cw.context.createImageData(uNum, uNum);    
        const dataRowWidth = this.mapUnitNumber * 4;
        for(let i = 0; i < imgData.data.length; i += 4) {
            const x =  Math.round((i % dataRowWidth) / 4 + px - uNum/2); 
            const y = Math.floor(i / dataRowWidth) + py - uNum/2;
            const block = level.safeGetField(x, y);
            const explored = level.safeGetExplored(x, y);
            const color = this.colorByField(explored, block);
            imgData.data[i] = color[0];
            imgData.data[i + 1] = color[1];
            imgData.data[i + 2] = color[2];
            imgData.data[i + 3] = color[3];
        }
        const imgRootX = this.cw.canvas.width - this.cw.unit - uNum;
        const imgRootY = this.cw.unit;
        this.cw.context.putImageData(imgData, imgRootX, imgRootY);
        Painter.defaultOffset();
        const bRect = this.cw.getBoundingRect();
        const pointerX = bRect.width - 1 - uNum/this.cw.unit/2;
        const pointerY = 1 + uNum/this.cw.unit/2;
        const pointer = new Gmt.Vertex(pointerX, pointerY).toCircle(0.12);
        this.cw.fillCircle(pointer, 'rgba(255, 0, 0, 0.8)');
        Painter.restoreOffset();
    }

    colorByField(explored, block) {
        if(!explored) {
            return [10, 10, 10, 255];
        } else if (!block) {
            return [100, 100, 150, 255];
        } else if (block.blocksMovement) {
            return [50, 50, 0, 255];
        }
        return [255, 0, 0, 255];
    }


}