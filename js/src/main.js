"use strict";
(() => {

    // "singleton-like" components init
    const _CW = new Gmt.CanvasWrapper('canvas-home');
    Gmt.Input.init();
    UIManager.init(_CW);
    Painter.init(_CW);
    GameManager.init();
    
    // main game loop init
    new Gmt.Loop(62, loop => {
        UIManager.executeFrame(loop);
        Painter.paintFrame(loop);
        GameManager.executeFrame(loop);
    }).start();    
    
})();


