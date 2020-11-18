"use strict";
class OptionsView extends View {

    constructor() {
        super({
            title: 'options',
            html: `
                <TITLE value='OPTIONS'/>
                <BUTTON value='RETURN' {go|main}/>
            `
        });
    }
    
}