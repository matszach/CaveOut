"use strict";
class BootView extends View {
    constructor() {
        super({
            title: 'boot',
            html: `
                <TITLE value='CAVE OUT'/>
                <BUTTON value='CONTINUE' {go|main}/>
            `
        });
    }
}
