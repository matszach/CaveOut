"use strict";
class LevelTemplateBuilder {
    constructor(sizeX, sizeY) {
        this.template = new Gmt.Table2D(sizeX, sizeY, BLOCK_TYPES.STONE);
        this.nodes = [];
    }
    addNode(x, y, type) {
        this.nodes.push({
            x: x,
            y: y,
            type: type
        });
    }
    safePut(x, y, value) {
        if (this.template.isInRange(x, y)) {
            this.template.put(x, y, value);
            return true;
        }
        return false;
    }
    putRect(initX, initY, width, height, value) {
        for (let x = initX; x < initX + width; x++) {
            for (let y = initY; y < initY + height; y++) {
                this.safePut(x, y, value);
            }
        }
    }
    generateCaveLevel(yLevel) {
        const y = new Variator(yLevel - 6, yLevel + 6);
        const offsetTop = new Variator(3, 10);
        const offsetBottom = new Variator(3, 10);
        const levelCore = [];
        for (let x = 0; x < this.template.xSize; x++) {
            levelCore.push(y.get());
            const initX = x;
            const initY = y.get() - offsetTop.get();
            const width = 1;
            const height = offsetBottom.get() + offsetTop.get();
            this.putRect(initX, initY, width, height, BLOCK_TYPES.NONE);
            y.change(0.5);
            offsetTop.change(0.35);
            offsetBottom.change(0.2);
        }
        return levelCore;
    }
    generateShafts(upperCore, lowerCore) {
        do {
            const x = Gmt.randInt(6, upperCore.length - 7);
            this.generateShaft(upperCore[x], lowerCore[x], x);
        } while (Gmt.chance(0.4));
    }
    generateShaft(yStart, yEnd, xStart) {
        const x = new Variator(xStart - 8, xStart + 8);
        const offsetLeft = new Variator(2, 5);
        const offsetRight = new Variator(2, 5);
        for (let y = yStart; y < yEnd; y++) {
            const initX = x.get() - offsetLeft.get();
            const initY = y;
            const width = offsetLeft.get() + offsetRight.get();
            const height = 1;
            this.putRect(initX, initY, width, height, BLOCK_TYPES.NONE);
            x.change(0.3);
            offsetLeft.change(0.2);
            offsetRight.change(0.2);
        }
    }
    outline() {
        this.putRect(0, 0, this.template.xSize, 2, BLOCK_TYPES.BEDROCK);
        this.putRect(0, 0, 2, this.template.ySize, BLOCK_TYPES.BEDROCK);
        this.putRect(0, this.template.ySize - 2, this.template.xSize, 2, BLOCK_TYPES.BEDROCK);
        this.putRect(this.template.xSize - 2, 0, 2, this.template.ySize, BLOCK_TYPES.BEDROCK);
    }
    build() {
        let depth = 0;
        let lastCore;
        while (depth < (this.template.ySize - 50)) {
            depth += Gmt.randInt(20, 30);
            let core = this.generateCaveLevel(depth);
            if (!!lastCore) {
                this.generateShafts(lastCore, core);
            }
            lastCore = core;
        }
        this.outline();
        return {
            template: this.template,
            nodes: this.nodes,
        };
    }
}
