"use strict";
class BlockFactory {
    create(blockType) {
        switch (blockType) {
            case BLOCK_TYPES.NONE: return null;
            case BLOCK_TYPES.STONE: return new StoneBlock();
            case BLOCK_TYPES.BEDROCK: return new BedrockBlock();
            default: return null;
        }
    }
}
