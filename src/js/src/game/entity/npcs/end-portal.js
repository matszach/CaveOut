"use strict";
const END_PORTAL_TEMPLATE = {
    drawSize: 5,
    shape: 5,
    bodyColor: Gmt.rgba(200, 0, 100, 0.3),
    borderColor: Gmt.rgba(150, 0, 75, 0.4),
    stationary: true
};

class EndPortal extends SubjectEntity {

    constructor() {
        super(END_PORTAL_TEMPLATE);
    }

    act(loop) {
        const frame = loop.getFrame();
        this.direction = frame % 400 / 400 * (2 * Math.PI);
        if(frame % 3 == 0) {
            this.collidePlayer(p => GameManager.nextlevel());
        }
    }

    drawMe(cw, cameraX, cameraY, frameNumber) {
        const {x, y} = this.position;
        const root = new Gmt.Vertex(x - cameraX, y - cameraY);
        const body = root.toCircle(this.drawSize).toPolygon(this.shape, this.direction);
        cw.drawPolygon(body, this.bodyColor, this.borderColor, this.borderWidth);
        const p = this;
        body.toVertices().forEach(v => {
            const decorBody = v.toCircle(p.drawSize/5).toPolygon(3, -p.direction);
            cw.drawPolygon(decorBody, p.bodyColor, p.borderColor, p.borderWidth);
        });
    }



}