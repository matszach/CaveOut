"use strict";
class GameState {
    constructor() {
        this.level = null;
        this.player = null;
    }
    entities(callback) {
        var _a, _b, _c, _d, _e, _f;
        if (this.player) {
            callback(this.player);
        }
        (_b = (_a = this.level) === null || _a === void 0 ? void 0 : _a.npcs) === null || _b === void 0 ? void 0 : _b.forEach(callback);
        (_d = (_c = this.level) === null || _c === void 0 ? void 0 : _c.projectiles) === null || _d === void 0 ? void 0 : _d.forEach(callback);
        (_f = (_e = this.level) === null || _e === void 0 ? void 0 : _e.particles) === null || _f === void 0 ? void 0 : _f.forEach(callback);
    }
}
