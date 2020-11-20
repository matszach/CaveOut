"use strict";
const BEDROCK_BLOCK_TEMPLATE = {
    blocksMovement: true,
    blocksSight: true,
    resistance: 999,
    minStructure: 1000,
    maxStructure: 1000,
    colors: ['#202030', '#232333', '#262636', '#292939']
};
class BedrockBlock extends Block {
    constructor() {
        super(BEDROCK_BLOCK_TEMPLATE);
    }
}
