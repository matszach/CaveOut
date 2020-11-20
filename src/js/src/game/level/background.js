"use strict";
class Background {

    constructor() {
        this.layers = [];
        this.totalWidth = 0;
    }

    addLayer(color, width) {
        this.layers.push({
            color: color,
            width: width
        });
        this.totalWidth += width;
    }

    drawMe(cw, cameraX, cameraY, frameNumber) {
        let currX = - (cameraX * 0.7);
        let currLayerIndex = 0;
        while(currX < 64) {
            if(currLayerIndex < this.layers.length) {
                const layer = this.layers[currLayerIndex];
                const rect = new Gmt.Rectangle(currX, 0, layer.width, 38);
                cw.drawRect(rect, layer.color);
                currLayerIndex++;
                currX += layer.width;
            } else {
                break;
            }
        }
        
    }

}