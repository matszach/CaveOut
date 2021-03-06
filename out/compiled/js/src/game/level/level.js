"use strict";
class Level {
    constructor(difficulty, levelNumber, sizeX, sizeY) {
        this.difficulty = difficulty;
        this.levelNumber = levelNumber;
        this.fields = new Gmt.Table2D(sizeX, sizeY, null);
        this.explored = new Gmt.Table2D(sizeX, sizeY, false);
        this.background = new Background();
        this.npcs = [];
        this.projectiles = [];
        this.particles = [];
    }
    sliceFields(x, y, width, height, callback) {
        const xMax = this.fields.xSize;
        const yMax = this.fields.ySize;
        x = Gmt.clamp(x, 0, xMax);
        y = Gmt.clamp(y, 0, yMax);
        const xDiff = xMax - (x + width);
        if (xDiff <= 0)
            width += xDiff;
        const yDiff = yMax - (y + height);
        if (yDiff <= 0)
            height += yDiff;
        this.fields.iterSlice(x, y, width, height, callback);
    }
    safeGetField(x, y) {
        return this.fields.isInRange(x, y) ? this.fields.get(x, y) : null;
    }
    safePutExplored(x, y, value) {
        if (this.explored.isInRange(x, y)) {
            this.explored.put(x, y, value);
        }
    }
    safeGetExplored(x, y) {
        return this.explored.isInRange(x, y) ? this.explored.get(x, y) : false;
    }
}
