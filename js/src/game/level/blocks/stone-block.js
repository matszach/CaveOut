"use strict";
const STONE_BLOCK_TEMPLATE = {
    blocksMovement: true,
    blocksSight: true,
    resistance: 3,
    minStructure: 90,
    maxStructure: 110,
    colors: ['#505050', '#535353', '#565656', '#595959']
};

class StoneBlock extends Block {

    constructor() {
        super(STONE_BLOCK_TEMPLATE);
    }

}