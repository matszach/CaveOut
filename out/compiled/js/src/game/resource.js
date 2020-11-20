"use strict";
class Resource {
    constructor(max) {
        this.max = max;
        this.curr = max;
    }
    give(n) {
        this.curr += n;
        if (this.curr > this.max) {
            this.curr = this.max;
        }
    }
    take(n) {
        this.curr -= n;
        if (this.curr < 0) {
            this.curr = 0;
        }
    }
    has(n) {
        return n <= this.curr;
    }
    fill() {
        this.curr = this.max;
    }
    deplete() {
        this.curr = 0;
    }
    isDepleted() {
        return this.curr == 0;
    }
}
