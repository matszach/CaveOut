"use strict";
const PLAYER_TEMPLATE = {};
class Player extends SubjectEntity {
    constructor() {
        super(PLAYER_TEMPLATE);
    }
    act(loop) {
        const { movement, acceleration } = this;
        Gmt.Input.handleKeys('KeyA', () => movement.move(-acceleration, 0), 'KeyD', () => movement.move(+acceleration, 0), 'KeyW', () => movement.move(0, -acceleration), 'KeyS', () => movement.move(0, +acceleration));
    }
}
