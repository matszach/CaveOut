const BLOCK_TYPES = {
    NONE: 0,
    STONE: 1,
    BEDROCK: 2
};
const MOVEMENT = {
    AIR_RESIST: 0.01,
    DOWN_ACC: 0.01,
    DOWN_MAX: 0.5,
    MIN_POST_BOUNCE: 0.05,
};
const SCREEN = {
    WIDTH: 64,
    HEIGHT: 36
};
const SHADER = {
    LIGHT_COLOR: Gmt.rgba(255, 255, 0, 0.002),
    NOF_VISIBILITY_VERTICES: 250,
    CHECK_STEP: 1,
    SHADE_COLOR: Gmt.rgba(0, 0, 0, 1),
};
