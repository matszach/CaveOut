"use strict";
class ControlsView extends View {

    constructor() {
        super({
            title: 'controls',
            html: `
                <TITLE value='CONTROLS'/>
                <BUTTON value='RETURN' {go|main}/>
            `
        });
    }
    
}