"use strict";
class LoadGameView extends View {

    constructor() {
        super({
            title: 'load',
            html: `
                <TITLE value='LOAD GAME'/>
                <BUTTON value='RETURN' {go|main}/>
            `
        });
    }
    
}