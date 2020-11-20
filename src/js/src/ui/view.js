"use strict";
class View {

    constructor(args) {
        this.title = args.title || '';
        this.html = args.html || '';
        this.state = args.state || {};
    }

    updateState(event) {
        const {value, name} = event.target;
        this.state[name] = value;
        console.log(event, this.state);
    }

    beforeLoad() {
        // abstract
    }

    afterLoad() {
       // abstract
    }

    refit() {
        // abstract;
    }

    executeFrame(frameNumber) {
        // abstract
    }

}