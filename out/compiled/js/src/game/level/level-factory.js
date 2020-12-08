"use strict";
class LevelFactory {
    constructor() {
        this.blockFactory = new BlockFactory();
        this.perlin = Gmt.Perlin.init();
    }
    _calculateLevelSize(difficulty, levelNumber) {
        return {
            sizeX: Gmt.randInt(220, 290) + difficulty * 10 + levelNumber * 5,
            sizeY: Gmt.randInt(420, 520) + difficulty * 50 + levelNumber * 25 * difficulty
        };
    }
    translate(level, template, nodes) {
        const blockFactory = this.blockFactory;
        template.iter((x, y, v) => {
            var _a;
            level.fields.put(x, y, (_a = blockFactory.create(v)) === null || _a === void 0 ? void 0 : _a.place(x, y));
        });
    }
    generateBackground(level) {
        while (level.background.totalWidth < level.fields.xSize) {
            level.background.addLayer(Gmt.choice(['#101010', '#131313', '#161616', '#191919']), Gmt.randFloat(1.5, 5));
        }
    }
    placeEntities(player, nodes, level) {
        player.position.place(0, 0);
        const f = this;
        nodes.forEach(n => {
            const { x, y, type } = n;
            switch (type) {
                case LEVEL_TEMPLATE_NODE_TYPE.PLAYER:
                    player.position.place(x, y);
                    break;
                case LEVEL_TEMPLATE_NODE_TYPE.END_PORTAL:
                    f.spawnNpc(level, EndPortal, x, y);
                    break;
            }
        });
    }
    spawnNpc(level, className, x, y) {
        const e = new className();
        e.position.place(x, y);
        level.npcs.push(e);
    }
    create(player, difficulty, levelNumber, callback) {
        setTimeout(factory => {
            const { sizeX, sizeY } = factory._calculateLevelSize(difficulty, levelNumber);
            const templateBuilder = new LevelTemplateBuilder(sizeX, sizeY);
            const { template, nodes } = templateBuilder.build();
            const level = new Level(difficulty, levelNumber, sizeX, sizeY);
            factory.translate(level, template, nodes);
            factory.generateBackground(level);
            factory.placeEntities(player, nodes, level);
            callback(level);
        }, 0, this);
    }
}
