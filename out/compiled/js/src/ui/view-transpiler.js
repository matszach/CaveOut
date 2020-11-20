"use strict";
class ViewTranspiler {
    transpile(html) {
        return html
            // .replace(/{v}/g, 'UIManager._view')
            // .replace(/{U}/g, 'UIManager')
            // .replace(/{P}/g, 'Painter')
            // .replace(/{G}/g, 'GameManager')
            .replace(/{go\|([^'\|}]+)}/g, 'onclick="UIManager.switchToView(\'$1\')"')
            .replace(/{bind\|([^'\|}]+)}/g, 'name="$1" class="view-input" id="bound-input-$1" onchange="UIManager._view?.updateState(event)"')
            .replace(/{do\|([^'\|}]+)}/g, 'onclick="UIManager._view.$1()"')
            .replace(/{do\|([^'\|}]+)\|([^'\|}]+)}/g, 'onclick="UIManager._view.$1($2)"')
            .replace(/<INPUT/g, '<input')
            .replace(/<TITLE value='([^'\|}]+)'\/>/g, '<div class="view-title">$1</div>')
            .replace(/<BUTTON/g, '<input type="button" class="view-center-button" ');
    }
}
