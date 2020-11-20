"use strict";
class NewGameView extends View {
    constructor() {
        super({
            title: 'new',
            html: `
                <TITLE value='NEW GAME'/>
                <BUTTON value='EASY' {do|start|1}/>
                <BUTTON value='MEDIUM' {do|start|2}/>
                <BUTTON value='HARD' {do|start|3}/>
                <BUTTON value='RETURN' {go|main}/>
            `
        });
    }
    start(difficulty) {
        GameManager.loadLevel(difficulty, 1);
        Painter.flag('active', true);
        UIManager.switchToView('game');
    }
}
