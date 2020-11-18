"use strict";
const GameManager = {

    _state: null,
    levelFactory: null,
    flags: {
        paused: false
    },

    init() {
        this.levelFactory = new LevelFactory();
        this._state = new GameState();
    },

    flag(name, value) {
        this.flags[name] = value;
    },
    
    executeFrame(loop) {
        if(!this.flags.paused) {
            this._state.entities(e => e.doFrame(loop));
        }
    },

    createPlayerIfAbsent() {
        if(!this._state.player) {
            this._state.player = new Player({}); // TODO real entity
        }
    },

    loadLevel(difficulty, levelNumber) {
        this.createPlayerIfAbsent();  
        this.levelFactory.create(GameManager._state.player, difficulty, levelNumber, level => {
            GameManager._state.level = level;
        });
        this._state.player.position.place(40, 40); // FIXME put in level factory
    }
    
};