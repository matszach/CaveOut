"use strict";
class MainMenuView extends View {
    constructor() {
        super({
            title: 'main',
            html: `
                <TITLE value='MAIN MENU'/>
                <BUTTON value='NEW' {go|new}/>
                <BUTTON value='LOAD' {go|load}/>
                <BUTTON value='OPTIONS' {go|options}/>
                <BUTTON value='CONTROLS' {go|controls}/>
                <BUTTON value='ABOUT' {go|about}/>
            `
        });
    }
}
