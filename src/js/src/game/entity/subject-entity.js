"use strict";
class SubjectEntity extends Entity {

    constructor(args) {
        super(args);
        this.sightRange = args.sightRange || 25;
    }

}