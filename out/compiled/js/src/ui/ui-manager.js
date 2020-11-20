"use strict";
const UIManager = {
    _view: null,
    _transpiler: null,
    _canvasWrapper: null,
    _widthToHeightRatio: 16 / 9,
    _widthToUnitRatio: 64,
    _refitWrapper() {
        const $win = $(window);
        const globalWidth = $win.width();
        const globalHeight = $win.height();
        let homeWidth, homeHeight, offsetWidth, offsetHeight;
        if (globalHeight * this._widthToHeightRatio > globalWidth) {
            homeWidth = globalHeight * this._widthToHeightRatio;
            homeHeight = globalHeight;
            offsetWidth = (globalWidth - homeWidth) / 2;
            offsetHeight = 0;
        }
        else {
            homeWidth = globalWidth;
            homeHeight = globalWidth / this._widthToHeightRatio;
            offsetWidth = 0;
            offsetHeight = (globalHeight - homeHeight) / 2;
        }
        const unitSize = homeWidth / this._widthToUnitRatio;
        this._canvasWrapper.setUnitSize(unitSize).setOffset(offsetWidth, offsetHeight);
    },
    _refit() {
        var _a;
        this._refitWrapper();
        (_a = this._view) === null || _a === void 0 ? void 0 : _a.refit();
    },
    init(canvasWrapper) {
        this._transpiler = new ViewTranspiler();
        this._canvasWrapper = canvasWrapper;
        UIManager._refit();
        $(window).on('resize', () => UIManager._refit());
        UIManager.switchToView('boot');
    },
    switchToView(viewKey) {
        const view = this._getViewByKey(viewKey);
        this._loadView(view);
    },
    _getViewByKey(viewKey) {
        switch (viewKey) {
            case 'boot': return new BootView();
            case 'main': return new MainMenuView();
            case 'new': return new NewGameView();
            case 'load': return new LoadGameView();
            case 'about': return new AboutView();
            case 'controls': return new ControlsView();
            case 'options': return new OptionsView();
            case 'game': return new GameUIView();
            default: return new BootView();
        }
    },
    _loadView(view) {
        view.beforeLoad();
        this._view = view;
        const html = this._transpiler.transpile(view.html);
        $('#ui-home').html(html);
        for (const [key, value] of Object.entries(view.state)) {
            $('#bound-input-' + key).val(value);
        }
        view.afterLoad();
    },
    executeFrame(frameNumber) {
        var _a;
        (_a = this._view) === null || _a === void 0 ? void 0 : _a.executeFrame(frameNumber);
    }
};
