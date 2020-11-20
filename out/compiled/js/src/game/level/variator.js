"use strict";
class Variator {
    constructor(min, max, maxStep) {
        this.min = min;
        this.max = max;
        this.step = maxStep || 1;
        this.current = Gmt.randInt(min, max);
    }
    change(chance) {
        if (Gmt.chance(chance || 1)) {
            this.current += Gmt.randInt(-this.step, +this.step);
            this.current = Gmt.clamp(this.current, this.min, this.max);
        }
        return this;
    }
    get() {
        return this.current;
    }
}
