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
            level.fields.put(x, y, blockFactory.create(v)?.place(x, y));
        });
    }

    generateBackground(level) {
        while(level.background.totalWidth < level.fields.xSize) {
            level.background.addLayer(
                Gmt.choice(['#101010', '#131313', '#161616', '#191919']),
                Gmt.randFloat(1.5, 5)
            );
        }
    }

    create(player, difficulty, levelNumber, callback) {
        setTimeout(factory => {
            const {sizeX, sizeY} = factory._calculateLevelSize(difficulty, levelNumber);
            const templateBuilder = new LevelTemplateBuilder(sizeX, sizeY);
            const {template, nodes} = templateBuilder.build();
            const level = new Level(difficulty, levelNumber, sizeX, sizeY);
            factory.translate(level, template, nodes);
            factory.generateBackground(level);
            callback(level);
        }, 0, this);
    }

}