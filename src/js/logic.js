"use strict";

const maps = [
// level 1
[[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,5],[5,6],[1,6],[1,6],[1,6],[1,6],[1,6],[1,6],[1,6],[1,6]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12,78],[12],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,5],[1,6],[6],[6],[6],[1,6],[1,6],[1,6],[1,6],[1,6],[17,37,30],[1,6]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[12,8],[12,30],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[12,8],[12,30],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[12,8],[12,30],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,75],[1,14,8],[12],[12],[12],[12,8],[12],[12],[12],[12,8],[12,30],[4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,5],[6],[6],[1,14,8,6],[12,6],[6],[17,26,41],[12,8,6],[12,6],[12,6],[12,6],[12,8,6],[12,6],[4,6]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,26],[1,14,8],[12],[12],[12],[12,8],[12,41],[12],[12],[12,8],[12],[12],[12],[1,4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,26],[1,14,8],[12],[12],[12],[12,8],[12,41],[12],[12],[12,8],[12],[12],[12],[1,4]],[[1,9],[1,79],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,26],[1,14,8],[12],[12],[12],[12,8],[12,41],[12],[12],[12,8],[12,45],[12,49],[12],[1,4]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,26],[1,14,8],[12],[12,53],[12],[12,8],[12,41],[12],[12],[12,8],[12],[12],[12],[1,4]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3]]],
// level 2
[[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1,79],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1,75],[1,77],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[1,2],[1,9,2],[1,2],[2],[2],[2],[2],[2],[2],[15,41,23],[2],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[15,41,23],[2],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,41],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,41],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,53],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,34],[1,34],[1,34],[1,34],[1,34],[1,34],[2],[15,43,25],[1,2],[2],[1,2],[1,2],[1,2],[1,2],[1,9,2]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2],[15,43,25],[1,2],[2],[2],[2],[2],[2],[2]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,43],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1,91],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,43],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9,10],[1],[1],[1],[1],[1],[1],[1,55],[1],[1],[1],[1],[1,10],[1],[1],[1],[1],[1,43],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[1],[1],[1],[1],[1],[1,43],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[1],[1,49],[1],[1,45],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[1],[1,78],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2]]],
// level 3
[[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,4],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,4],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1,79],[1],[1],[1,5],[6],[6],[6],[6],[1,7],[1,4],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1,14,8],[12],[12],[1,13,8],[1],[4],[1,77],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[1],[1],[1,14,8,26],[12],[12],[1,13,8],[1],[4],[3],[3],[1],[1,35],[1,35],[1,24],[1,24],[1,24],[1,24],[1,35],[1,35],[1],[1],[1,9]],[[2],[2],[2],[2],[1,34],[26,34],[17,26,41],[6],[6],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[1,2],[2],[1],[1,14,8],[12,41],[1,12],[1,13,8],[1],[1,28],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2],[2]],[[2],[2],[1,2],[1],[1],[1,14,8,37],[12,41],[1,12],[1,13,8,37],[1],[1,28],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2],[2]],[[2],[2],[1,2],[1],[1],[14,8,37,23],[12,41,23],[12,23],[13,8,37,23],[1],[1,28],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,2],[1,2],[1,2],[1,2],[2]],[[2],[2],[1,2],[1,91],[1],[1,14,8],[12,41],[12],[1,13,8],[1],[1,28],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,2],[1,2],[1,2],[1,2],[2]],[[2],[2],[2,10],[1,75],[1],[1,14,8],[12,41],[12],[1,13,8],[1],[1,28,10],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[3],[3],[3],[1,3],[1,3],[1,3],[3],[1,36,28],[1,36],[1,36],[1,36],[1,36],[1,36],[2],[1,2],[1],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[1],[1],[1],[2],[2],[1],[1],[1],[1],[1],[1,2],[1,2],[1,2],[1],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[1],[1],[1],[2],[2],[1],[1],[1],[1],[1],[1,2],[1,2],[1,2],[1,2],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[1],[1],[1],[2],[2],[1],[1],[1],[1],[1],[1],[1,2],[1,2],[1,2],[1],[1],[1],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[1],[1],[1],[2],[2],[1],[1],[1],[1],[1,93],[1],[1],[1,2],[1,2],[2],[1,45],[1],[1,49],[1,9]],[[2],[2],[2],[2],[2],[2],[1],[1],[1],[1,2],[1,2,10],[1],[1],[1],[1,54],[1],[1],[1],[1,2,10],[1,2],[2],[1],[1,78],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[1,2],[1,2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2]]],
// level 4
[[[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[6],[1,7],[1],[1],[1],[1],[1],[1],[1,9]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[4],[12],[12],[12],[12],[1,28],[1],[1],[1],[1],[1,45],[1],[1,49],[1,9]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12,27],[12],[12],[12],[12],[1,28],[1],[1],[1],[1],[1],[1,78],[1],[1,9]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12,27],[12],[12],[12],[12],[4],[1],[1],[1],[1],[2],[2],[2],[2]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12,27],[12],[12],[12],[12],[4],[1],[1],[1],[1],[1],[1],[1],[1,9,2]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[3],[3],[3],[3],[3],[4],[1],[1],[1],[1],[1],[1],[1],[2]],[[4],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12,93],[4],[12],[12],[1,28],[1],[1],[1],[1,91],[1],[1],[1],[2]],[[4],[12],[12],[12],[12],[12],[12],[12,10],[12],[12],[12],[12],[12],[4,10],[12],[12],[1,28,10],[1],[1],[1],[1],[1],[1],[1,55],[2,10]],[[4],[12],[12],[12],[12],[12],[12],[12],[4],[3],[3],[3],[3],[3],[12],[12],[3],[3],[3],[3],[3],[3],[3],[3],[3]],[[4],[12,91],[12],[12],[12],[12],[12],[12],[4],[12],[12],[12],[12],[12],[12,91],[12],[12],[12],[12],[12],[12],[12],[12],[12],[4]],[[4,10],[12],[12],[12],[12],[12],[12],[12],[4,10],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[4,10]],[[1,9,3],[1,3],[1,3],[1,3],[3],[16,29],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[16,29],[1,9,4]],[[12,9],[12],[12],[12],[12],[12,29],[12],[12],[12,8],[12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[12,8],[12,29],[1,9,4]],[[12,9],[12],[12],[12],[12],[12,29],[12],[12],[12,8],[12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[12,8],[12,29],[1,9,4]],[[12,9],[12],[12],[12],[12],[12,29],[12],[12],[12,8],[12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[12,8],[12,29],[1,9,4]],[[12,9],[12,79],[12],[12,54],[12],[12,29],[12],[12],[12,8],[12],[1,12,91],[1,12],[12,8],[1,12],[1,12],[1,12,91],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[12,8],[12,29,93],[1,9,4]],[[12,9],[12],[12],[3],[12,10],[12,29],[12],[12],[12,8],[12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[1,12],[1,12],[12,8],[1,12],[1,12],[1,12],[12,8],[12,29],[1,9,4,10]],[[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3],[3]]],
// final stage
[[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1,106],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1],[1,117],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[1],[1],[1],[1,84],[1,107],[1,85],[1],[1],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[1,9]],[[1,9],[1],[1,117],[1],[1,95],[83],[1,96],[1],[1,117],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[1,9]],[[1,9],[1],[107],[107],[107],[1,107],[1,107],[1,107],[1,107],[1],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[1,9]],[[1,9],[1,117],[107],[107],[107],[1,107],[1,107],[1,107],[1,107],[1,117],[1],[],[],[],[],[],[],[],[],[],[],[],[],[],[1,9]],[[1,9],[107],[107],[107,118],[107],[1,118],[1,107],[1,118],[1,107],[1,107],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[107],[107],[107],[107],[1,107],[1,107],[1,107],[1,107],[1,107],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,9]],[[1,9],[107],[107],[107,108],[107,109],[1,107],[1,108],[1,109],[1,107],[1,107],[1,100],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,45],[1],[1,49],[1,9]],[[1,9],[107],[107],[107,119],[107,119,120],[1,107],[1,120],[1,120],[1,107],[1,107],[1,111],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1,78],[1],[1,9]],[[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2],[2]]],
];

$.logic = {
    currentMap: -1,
    entities: [null],
    TILE_SIZE: 32,

    SOLID_TILE: [2, 3, 4, 6, 9],

    ENTITY: {
        NIC: 45,
        MAF: 49,
        TABLET: 78,
        FLAG: 79,
        ENEMY_STOP: 10,
        BRIDGE_PURPLE_ON: 23,
        BRIDGE_GREEN_ON: 24,
        BRIDGE_BROWN_ON: 25,
        DOOR_PURPLE_ON: 26,
        DOOR_GREEN_ON: 27,
        DOOR_BROWN_ON: 28,
        LADDER: 29,
        LADDER_PURPLE_ON: 30,
        LADDER_GREEN_ON: 31,
        LADDER_BROWN_ON: 32,
        BRIDGE_PURPLE_OFF: 34,
        BRIDGE_GREEN_OFF: 35,
        BRIDGE_BROWN_OFF: 36,
        DOOR_PURPLE_OFF: 37,
        DOOR_GREEN_OFF: 38,
        DOOR_BROWN_OFF: 39,
        LADDER_PURPLE_OFF: 41,
        LADDER_GREEN_OFF: 42,
        LADDER_BROWN_OFF: 43,
        PRESSURE_PLATE_PURPLE: 53,
        PRESSURE_PLATE_GREEN: 54,
        PRESSURE_PLATE_BROWN: 55,
        SWITCH_PURPLE: 75,
        SWITCH_GREEN: 76,
        SWITCH_BROWN: 77,
        ENEMY_RIGHT: 91,
        ENEMY_LEFT: 93,
    },
    VARIABLE_SIZE_ENTITY_LOW: 23,
    VARIABLE_SIZE_ENTITIY_HIGH: 43,
    IS_DOOR: [26,27,28,37,38,39],
    IS_BRIDGE: [23,24,25,34,35,36],
    IS_PRESSURE_PLATE: [53,54,55],
    IS_SWITCH: [75,76,77],
    IS_PURPLE: [23,26,30,34,37,41,53,75],
    IS_GREEN: [24,27,31,35,38,42,54,76],
    IS_BROWN: [25,28,32,36,39,43,55,77],
    IS_LADDER: [41,42,43,32,31,30,29],
    IS_OFF: [34,35,36,37,38,39,41,42,43],

    NO_DRAW: [9, 10],

    ENTITY_COLORS: {
        PURPLE: 1,
        GREEN: 2,
        BROWN: 3
    },

    uniqeEntities: {},

    ACTIVE: null,

    init: function() {
        this.ACTIVE = this.ENTITY.NIC;
        this.loadMap(0);

        return Promise.resolve();
    },

    update: function(dt) {
        if (!$.run) { return; }

        if ($.input.justReleased($.input.KEY.SWITCH)) {
            this.ACTIVE = this.ACTIVE === this.ENTITY.NIC ? this.ENTITY.MAF : this.ENTITY.NIC;
        }

        if ($.input.justReleased($.input.KEY.RESET)) {
            this.loadMap(-1);
            return;
        }

        for (let i = 1; i < this.entities.length; i++) {
            if (this.entities[i].update) {
                this.entities[i].update(dt);
            }
        }
    },

    getEntityType: function(entityIndex) {
        return this.entities[entityIndex].type;
    },

    // -1 === broadcast
    sendEntityMessage: function(entityIndex, sender, data = null) {
        if (entityIndex === -1) {
            for (let i = 1; i < this.entities.length; i++) {
                if (this.entities[i].message) {
                    this.entities[i].message(sender, data);
                }
            }

            return;
        }

        const entity = this.entities[entityIndex];
        return entity && entity.message && entity.message(sender, data);
    },

    registerEntity: function(type, update = null, message = null) {
        const entity = {
            type,
            update,
            message
        };
        for (let i = 1; i < this.entities.length; i++) {
            if (!this.entities[i]) {
                entity.index = i;
                this.entities[i] = entity;
                return i;
            }
        }

        this.entities.push(entity);

        const index = this.entities.length - 1;
        
        this.entities[index].index = index;
        
        return index;
    },

    freeEntity: function(entityIndex) {
        this.entities[entityIndex] = null;
    },

    resetEntities: function() {
        this.entities = [null];
    },

    loadMap: function(mapIndex) {
        this.resetEntities();
        $.input.clearState();
        $.gfx.resetSprites();
        $.gfx.clearBackground();
        $.physics.resetHitboxes();

        if (!mapIndex) {
            this.currentMap++;
        } else if (mapIndex > -1) {
            this.currentMap = mapIndex;
        }

        if (this.currentMap === maps.length -1) {
            $.showText('end-game-text');
        }

        const mapData = maps[this.currentMap];
        const entities = [];

        let hitboxDrawn = [];
        let entityRegistered = [];
        for (let y = 0; y < mapData.length; y++) {
            for (let x = 0; x < mapData[y].length; x++) {
                const val = mapData[y][x];
                const screenX = x * this.TILE_SIZE;
                const screenY = y * this.TILE_SIZE;

                if (Array.isArray(val)) {
                    for (let i = 0; i < val.length; i++) {
                        if (Object.values(this.ENTITY).includes(val[i])) {
                            let runEndX = x;
                            let runEndY = y;
                            if (val[i] >= this.VARIABLE_SIZE_ENTITY_LOW && val[i] <= this.VARIABLE_SIZE_ENTITIY_HIGH) {
                                if (entityRegistered.includes(`${val[i]},${x},${y}`)) {
                                    continue;
                                }
                                for (let rx = x; rx < mapData[y].length; rx++) {
                                    if (mapData[y][rx].includes(val[i])) {
                                        entityRegistered.push(`${val[i]},${rx},${y}`);
                                        runEndX = rx;
    
                                        for (let ry = y + 1; ry < mapData.length; ry++) {
                                            if (mapData[ry][rx].includes(val[i])) {
                                                entityRegistered.push(`${val[i]},${rx},${ry}`);
                                                runEndY = ry;
                                            } else {
                                                break;
                                            }
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            }

                            entities.push({x: x, y: y, w: runEndX - x + 1, h: runEndY - y + 1, entity: val[i]});
                        } else if (this.SOLID_TILE.includes(val[i])) {
                            $.gfx.drawTile($.gfx._background_ctx, val[i], screenX, screenY, this.TILE_SIZE, this.TILE_SIZE);
                            if (hitboxDrawn.includes(`${x},${y}`)) {
                                continue;
                            }

                            let runEndX;
                            let runEndY;

                            for (runEndX = x + 1; runEndX < mapData[y].length; runEndX++) {
                                if (hitboxDrawn.includes(`${runEndX},${y}`) || !mapData[y][runEndX].find(md => this.SOLID_TILE.includes(md))) {
                                    break;
                                }
                            }

                            for (runEndY = y + 1; runEndY < mapData.length; runEndY++) {
                                if (hitboxDrawn.includes(`${x},${runEndY}`) || !mapData[runEndY][x].find(md => this.SOLID_TILE.includes(md))) {
                                    break;
                                }
                            }

                            // check if this is a rectangle, or just two perpendicular runs
                            if (runEndX > x + 1 && runEndY > y + 1) {
                                let x2;
                                let y2;

                                for (let ry = y + 1; ry < runEndY; ry++) {
                                    let rx;
                                    for (rx = x + 1; rx < runEndX; rx++) {
                                        if (hitboxDrawn.includes(`${rx},${ry}`) || !mapData[ry][rx].find(md => this.SOLID_TILE.includes(md))) {
                                            break;
                                        }
                                        
                                        if (ry === y + 1) {
                                            x2 = rx
                                        } else if (rx < x2) {
                                            x2 = rx;
                                        }    
                                    }

                                    if (!x2 || rx === x + 1) {
                                        break;
                                    }

                                    y2 = ry;
                                }
                                
                                if (x2 && y2) {
                                    for (let rx = x; rx <= x2; rx++) {
                                        for (let ry = y; ry <= y2; ry++) {
                                            hitboxDrawn.push(`${rx},${ry}`);
                                        }
                                    }

                                    $.physics.registerHitbox(screenX, screenY, (x2 * this.TILE_SIZE) + this.TILE_SIZE, (y2 * this.TILE_SIZE) + this.TILE_SIZE, true);
                                } else {
                                    for (let rx = x; rx < runEndX; rx++) {
                                        hitboxDrawn.push(`${rx},${y}`);
                                    }

                                    for (let ry = y; ry < runEndY; ry++) {
                                        hitboxDrawn.push(`${x},${ry}`);
                                    }

                                    $.physics.registerHitbox(screenX + this.TILE_SIZE, screenY, (runEndX * this.TILE_SIZE), screenY + this.TILE_SIZE, true);
                                    $.physics.registerHitbox(screenX, screenY, screenX + this.TILE_SIZE, (runEndY * this.TILE_SIZE), true);
                                }
                            } else {
                                if (runEndX > x + 1)
                                    for (let rx = x; rx < runEndX; rx++) 
                                        hitboxDrawn.push(`${rx},${y}`);
                                else if (runEndY > y + 1)
                                    for (let ry = y; ry < runEndY; ry++) 
                                        hitboxDrawn.push(`${x},${ry}`);
                                else
                                    hitboxDrawn.push(`${x},${y}`);
                                
                                $.physics.registerHitbox(screenX, screenY, (runEndX * this.TILE_SIZE), (runEndY * this.TILE_SIZE), true);
                            }
                        } else {
                            $.gfx.drawTile($.gfx._background_ctx, val[i], screenX, screenY, this.TILE_SIZE, this.TILE_SIZE);
                        }
                    }
                } else {
                    $.gfx.drawTile($.gfx._background_ctx, val, screenX, screenY, this.TILE_SIZE, this.TILE_SIZE);
                }
            }
        }


        const enemyIndecies = [];
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].entity === this.ENTITY.ENEMY_LEFT || entities[i].entity === this.ENTITY.ENEMY_RIGHT) {
                enemyIndecies.push(i);
            }
        }

        for (let i = 0; i < enemyIndecies.length; i++) {
            const enemy = entities[enemyIndecies[i]];
            entities.splice(enemyIndecies[i], 1);
            entities.push(enemy);
        }

        const tabletIndex = entities.findIndex(x => x.entity === this.ENTITY.TABLET);
        const tablet = entities[tabletIndex];
        entities.splice(tabletIndex, 1);
        entities.push(tablet);

        const mafIndex = entities.findIndex(x => x.entity === this.ENTITY.MAF);
        const maf = entities[mafIndex];
        entities.splice(mafIndex, 1);
        entities.push(maf);

        const nicIndex = entities.findIndex(x => x.entity === this.ENTITY.NIC);
        const nic = entities[nicIndex];
        entities.splice(nicIndex, 1);
        entities.push(nic);

        for (let i = 0; i < entities.length; i++) {
            const val = entities[i].entity;
            const x = entities[i].x;
            const y = entities[i].y;

            let color = this.IS_PURPLE.includes(val) ? this.ENTITY_COLORS.PURPLE :
                        this.IS_GREEN.includes(val) ? this.ENTITY_COLORS.GREEN :
                        this.IS_BROWN.includes(val) ? this.ENTITY_COLORS.BROWN : null;

            let on = !this.IS_OFF.includes(val);

            if (val === this.ENTITY.NIC || val === this.ENTITY.MAF) {
                $.entities.newPlayer(val, x * this.TILE_SIZE, y * this.TILE_SIZE);
            } else if (val === this.ENTITY.TABLET) {
                $.entities.newTablet(x * this.TILE_SIZE, y * this.TILE_SIZE);
            } else if (this.IS_LADDER.includes(val)) {
                $.entities.newLadder(x * this.TILE_SIZE, y * this.TILE_SIZE, entities[i].h, color, on);
            } else if (this.IS_BRIDGE.includes(val)) {
                $.entities.newBlock(x * this.TILE_SIZE, y * this.TILE_SIZE, entities[i].w, entities[i].h, val, false, color, on);
            } else if (this.IS_DOOR.includes(val)) {
                $.entities.newBlock(x * this.TILE_SIZE, y * this.TILE_SIZE, entities[i].w, entities[i].h, val, true, color, on);
            } else if (this.IS_PRESSURE_PLATE.includes(val)) {
                $.entities.newPressurePlate(x * this.TILE_SIZE, y * this.TILE_SIZE, val, color);
            } else if (this.IS_SWITCH.includes(val)) {
                $.entities.newSwitch(x * this.TILE_SIZE, y * this.TILE_SIZE, val, color);
            } else if (val === this.ENTITY.FLAG) {
                $.entities.newFlag(x * this.TILE_SIZE, y * this.TILE_SIZE);
            } else if (val === this.ENTITY.ENEMY_LEFT || val === this.ENTITY.ENEMY_RIGHT) {
                $.entities.newEnemy(x * this.TILE_SIZE, y * this.TILE_SIZE, val);
            } else if (val === this.ENTITY.ENEMY_STOP) {
                $.entities.newEnemyStop(x * this.TILE_SIZE, y * this.TILE_SIZE);
            }
        }
    }
};