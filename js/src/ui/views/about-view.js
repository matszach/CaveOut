"use strict";
class AboutView extends View {

    constructor() {
        super({
            title: 'about',
            html: `
                <TITLE value='ABOUT'/>
                <BUTTON value='RETURN' {go|main}/>
            `
        });
    }
    
}