"use strict";
class Shader {

    constructor(cw) {
        this.cw = cw;
    }

    draw(ox, oy, frameNum) {
        const {player, level} = GameManager._state;
        this._drawLight(player, ox, oy);
        this._drawShade(player, level, ox, oy);
    }

    _drawLight(player, ox, oy) {
        const center = player.position.copy().move(-ox, -oy);
        for(let i = 0; i < 30; i += 2) {
            const circle = center.toCircle(i);
            this.cw.fillCircle(circle, SHADER.LIGHT_COLOR);
        }
    }

    _drawShade(player, level, ox, oy) {
        const outVertices = [];
        const {x: pX, y: pY} = player.position;
        for(let i = 0; i < SHADER.NOF_VISIBILITY_VERTICES; i++) {
            const dir = (2 * Math.PI) * (i / SHADER.NOF_VISIBILITY_VERTICES);
            const {x: stepX, y: stepY} = Gmt.polarToCartesian(SHADER.CHECK_STEP, dir);
            let currX = pX, currY = pY;
            for(let j = 0; j < player.sightRange; j += SHADER.CHECK_STEP) {
                currX += stepX;
                currY += stepY;
                const rX = Math.round(currX);
                const rY = Math.round(currY);
                level.safePutExplored(rX, rY, true);
                if(level.safeGetField(rX, rY)?.blocksSight) {
                    break;
                }
            }
            outVertices.push(new Gmt.Vertex(currX - ox, currY - oy));
        }
        this._drawShadeMask(outVertices);
    }

    _drawShadeMask(outVerices) {
        const bottomMask = new Gmt.Polygon();
        outVerices.slice(0, outVerices.length/2 + 2).forEach(v => bottomMask.push(v));
        bottomMask.add(0, SCREEN.HEIGHT/2 - 0.5);
        bottomMask.add(0, SCREEN.HEIGHT - 0.5);
        bottomMask.add(SCREEN.WIDTH, SCREEN.HEIGHT);
        bottomMask.add(SCREEN.WIDTH, SCREEN.HEIGHT/2);
        this.cw.fillPolygon(bottomMask, SHADER.SHADE_COLOR);
        const topMask = new Gmt.Polygon();
        outVerices.slice(outVerices.length/2, outVerices.length).forEach(v => topMask.push(v));
        topMask.push(outVerices[0]);
        topMask.push(outVerices[1]);
        topMask.add(SCREEN.WIDTH, SCREEN.HEIGHT/2 + 0.5);
        topMask.add(SCREEN.WIDTH, 0);
        topMask.add(0, 0);
        topMask.add(0, SCREEN.HEIGHT/2 + 0.5)
        this.cw.fillPolygon(topMask, SHADER.SHADE_COLOR);
    }

}