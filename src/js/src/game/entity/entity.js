"use strict";
class Entity {

    constructor(args) {

        // properties
        this.position = new Gmt.Vertex(0, 0);
        this.movement = new Gmt.Vertex(0, 0);
        this.direction = args.initDirection || 0;
        this.drawSize = args.drawSize || 0.7;
        this.collisionSize = args.collisionSize || this.drawSize * 0.8;
        this.shape = args.shape || 0;
        this.acceleration = args.acceleration || 0.05;
        this.maxSpeed = args.maxSpeed || 0.3;
        this.bodyColor = args.bodyColor || Gmt.rgba(0, 0, 150, 0.5);
        this.borderColor = args.borderColor || Gmt.rgba(0, 0, 150, 0.8);
        this.borderWidth = args.borderWidth || 0.1;
        this.bounceBackRactio = args.bounceBackRactio || 0.6;
        this.floorFriction = args.floorFriction || 0.003;
        this.airFriction = args.airFriction || 0.001;
        
        // temp fields 
        this.nextPosition = this.position;
        this.overlapRange = {};
        this.touchingSurface = {};
    }

    // overridable
    drawMe(cw, cameraX, cameraY, frameNumber) {
        const {x, y} = this.position;
        const root = new Gmt.Vertex(x - cameraX, y - cameraY);
        if(this.shape === 0) {
            const body = root.toCircle(this.drawSize);
            cw.drawCircle(body, this.bodyColor, this.borderColor, this.borderWidth);
        } else {
            const body = root.toCircle(this.drawSize).toPolygon(this.shape, this.direction);
            cw.drawPolygon(body, this.bodyColor, this.borderColor, this.borderWidth);
        }
    }

    _drawCollision(cw, cameraX, cameraY, frameNumber) {
        const {minX, minY, maxX, maxY} = this.overlapRange;
        const rect = new Gmt.Rectangle(minX - cameraX - 0.5, minY - cameraY - 0.5, maxX - minX + 1, maxY - minY + 1);
        cw.strokeRect(rect, 'rgba(255, 255, 255, 0.5)', 0.05);
        const circle = this.nextPosition.copy().move(-cameraX, -cameraY).toCircle(this.collisionSize);
        cw.strokeCircle(circle, 'rgba(255, 0, 0, 0.7)', 0.05);
    }

    doFrame(loop) {
        this.move();
        this.act(loop);
    }

    gravityMovement() {
        this.movement.y += MOVEMENT.DOWN_ACC;
    }

    // TODO post clip movement after the collision detection
    clipMovement() {
        const {minX, minY, maxX, maxY} = this.overlapRange;
        let clipUp = 0, clipDown = 0, clipLeft = 0, clipRight = 0
        const fields = GameManager._state.level?.fields;
        if(fields) {
            for(let x = minX; x < maxX + 1; x++) {
                if(fields.get(x, maxY)?.blocksMovement) clipDown++;
            }
            for(let x = minX; x < maxX + 1; x++) {
                if(fields.get(x, minY)?.blocksMovement) clipUp++;
            }
            for(let y = minY; y < maxY + 1; y++) {
                if(fields.get(maxX, y)?.blocksMovement) clipRight++;
            }
            for(let y = minY; y < maxY + 1; y++) {
                if(fields.get(minX, y)?.blocksMovement) clipLeft++;                        
            }
        }
        this._saveSurfaceTouch(clipUp, clipDown, clipLeft, clipRight);
    }

    _saveSurfaceTouch(up, down, left, right) {
        this.touchingSurface = {
            up: up,
            down: down,
            left: left,
            right: right
        };
    }

    _bounceAfterClip() {
        const {up, down, left, right} = this.touchingSurface;
        if(down > up) {
            this.movement.y = - this.movement.y * this.bounceBackRactio;
            if(this.movement.y > - MOVEMENT.MIN_POST_BOUNCE) this.movement.y = 0;
        }
        if(up > down) {
            this.movement.y = - this.movement.y * this.bounceBackRactio;
            if(this.movement.y < MOVEMENT.MIN_POST_BOUNCE) this.movement.y = 0;
        }
        if(right > left) {
            this.movement.x = - this.movement.x * this.bounceBackRactio;
            if(this.movement.x > - MOVEMENT.MIN_POST_BOUNCE) this.movement.x = 0;
        }
        if(left > right) {
            this.movement.x = - this.movement.x * this.bounceBackRactio;
            if(this.movement.x < MOVEMENT.MIN_POST_BOUNCE) this.movement.x = 0;
        }
    }

    _forceBackAfterClip() {
        const {up, down, left, right} = this.touchingSurface;
        const {minX, minY, maxX, maxY} = this.overlapRange;
        if(up > down) {
            this.nextPosition.y = minY + this.collisionSize + 0.5;   
        } else if(down > up) {
            this.nextPosition.y = maxY - this.collisionSize - 0.5;   
        }
        if(left > right) {
            this.nextPosition.x = minX + this.collisionSize + 0.5;   
        } else if(right > left) {
            this.nextPosition.x = maxX - this.collisionSize - 0.5;   
        }
    }

    limitMovement() {
        this.movement.x = Gmt.clamp(this.movement.x, -this.maxSpeed, +this.maxSpeed);
        this.movement.y = Gmt.clamp(this.movement.y, -this.maxSpeed, MOVEMENT.DOWN_MAX);
    }

    _calcNextPosition() {
        const next = this.position.copy();
        const {x, y} = this.movement;
        next.move(x, y);
        this.nextPosition = next;
    }

    _calcOverlappedFieldRange() {
        const {x, y} = this.nextPosition;
        const range =  {
            minX: Math.round(x - this.collisionSize),
            minY: Math.round(y - this.collisionSize),
            maxX: Math.round(x + this.collisionSize),
            maxY: Math.round(y + this.collisionSize)
        };
        this.overlapRange = range;
    }

    frictionMovement() {
        const speedReduction = this.touchingSurface.down > 0 ? this.floorFriction : this.airFriction;
        if(this.movement.x > speedReduction) {
            this.movement.x -= speedReduction;
        } else if(this.movement.x < -speedReduction) {
            this.movement.x += speedReduction;
        } else {
            this.movement.x = 0;
        }
    }

    doMovement() {
        this.position = this.nextPosition;
    }

    move() {
        this._calcNextPosition();
        this._calcOverlappedFieldRange();
        this.gravityMovement();
        this.clipMovement();
        this._bounceAfterClip();
        this._forceBackAfterClip();
        this.frictionMovement();
        this.limitMovement();
        this.doMovement();
    }

    act(loop) {
        // abstract
    }

}