"use strict";

$.entities = {
    handleSolidCollisions: function (entity, solidCollisions) {
        if (!solidCollisions.length) {
            return { doFall: true, hitWall: false };
        }

        let foundYCollision;
        let foundXCollision;
        for (let i = 0; i < solidCollisions.length; i++) {
            const collision = solidCollisions[i];

            $.entities.moveEntity(entity, foundXCollision ? 0 : collision.x, foundYCollision ? 0 : collision.y);

            foundYCollision = foundYCollision || collision.y < 0;
            foundXCollision = foundXCollision || !!collision.x;

            if (foundXCollision && foundYCollision) {
                break;
            }
        }

        return { doFall: !foundYCollision, hitWall: foundXCollision };
    },

    moveEntity: function (entity, dx, dy) {
        for (let i = 0; i < entity.sprites.length; i++) {
            $.gfx.moveSprite(entity.sprites[i], dx, dy);
        }

        for (let i = 0; i < entity.hitboxes.length; i++) {
            $.physics.moveHitbox(entity.hitboxes[i], dx, dy);
        }
    },

    setEntityPos: function (entity, x, y) {
        for (let i = 0; i < entity.sprites.length; i++) {
            $.gfx.setSpritePos(entity.sprites[i], x, y);
        }

        for (let i = 0; i < entity.hitboxes.length; i++) {
            $.physics.setHitboxPos(entity.hitboxes[i], x, y);
        }
    },

    _newEntity: function (type, data, update = null, message = null, afterInit = null) {
        const entityIndex = $.logic.registerEntity(type, update, message);

        const entity = $.logic.entities[entityIndex];
        entity.index = entityIndex;

        let dataKeys = Object.keys(data);
        for (let i = 0; i < dataKeys.length; i++) {
            entity[dataKeys[i]] = data[dataKeys[i]];
        }

        if (entity.hitboxes) {
            for (let i = 0; i < entity.hitboxes.length; i++) {
                entity.hitboxes[i].splice(5, 0, entityIndex);
                entity.hitboxes[i] = $.physics.registerHitbox(...entity.hitboxes[i]);
            }
        }

        if (entity.sprites) {
            for (let i = 0; i < entity.sprites.length; i++) {
                entity.sprites[i].push(entityIndex);
                entity.sprites[i] = $.gfx.registerSprite(...entity.sprites[i]);
            }
        }

        if (afterInit) {
            afterInit(entity);
        }

        return entity;
    },
    newPlayer: function (type, x, y) {
        const w = 32;
        const h = 64;
        return this._newEntity(
            type,
            {
                x: x,
                y: y,
                dx: 0,
                dy: 1,
                w: 32,
                h: 64,
                hitbox_offset_x: 4,
                hitbox_offset_y: 5,
                falling: false,
                jumpTime: 0,
                maxJumpTime: 0.2,
                facing: 1,
                tabletIndex: null,
                sprites: [
                    [x, y + 1, w, h / 2, true],
                    [x, y + (h / 2), w, h / 2, true]
                ],
                hitboxes: [
                    [
                        x + 4,
                        y,
                        x + w - 8,
                        y + h,
                        false,
                        true
                    ],
                    [
                        x,
                        y - 32,
                        x + w,
                        y + h,
                        false,
                        false
                    ]
                ],

                roomForTablet: function () {
                    const collisions = $.physics.checkCollisions(this.hitboxes[1]).solidCollisions;

                    return !collisions.some(c => Math.abs(c.u) > 1);
                },

                headRight: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_HEAD_RIGHT : $.gfx.ANIMATION.MAF_HEAD_RIGHT,
                headLeft: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_HEAD_LEFT : $.gfx.ANIMATION.MAF_HEAD_LEFT,
                carryRight: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_HEAD_CARRY_RIGHT : $.gfx.ANIMATION.MAF_HEAD_CARRY_RIGHT,
                carryLeft: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_HEAD_CARRY_LEFT : $.gfx.ANIMATION.MAF_HEAD_CARRY_LEFT,

                standRight: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_FEET_STAND_RIGHT : $.gfx.ANIMATION.MAF_FEET_STAND_RIGHT,
                standLeft: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_FEET_STAND_LEFT : $.gfx.ANIMATION.MAF_FEET_STAND_LEFT,
                walkRight: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_FEET_WALK_RIGHT : $.gfx.ANIMATION.MAF_FEET_WALK_RIGHT,
                walkLeft: type === $.logic.ENTITY.NIC ? $.gfx.ANIMATION.NIC_FEET_WALK_LEFT : $.gfx.ANIMATION.MAF_FEET_WALK_LEFT,
            },
            function (dt) {
                this.dx = 0;
                let dy = 1;

                let actionPressed;
                if ($.logic.ACTIVE === this.type) {
                    if ($.input.pressed($.input.KEY.LEFT)) {
                        this.dx = -100;
                    }

                    if ($.input.pressed($.input.KEY.RIGHT)) {
                        this.dx = 100;
                    }

                    if ($.input.pressed($.input.KEY.UP)) {
                        dy = -100;
                    }

                    if ($.input.pressed($.input.KEY.DOWN)) {
                        dy = 100;
                    }

                    if (this.dx) {
                        this.facing = Math.sign(this.dx);
                    }

                    if (this.falling) {
                        if ($.input.pressed($.input.KEY.JUMP) && this.jumpTime > 0) {
                            if (this.jumpTime < this.maxJumpTime) {
                                this.jumpTime += dt;
                                this.dy += -20;
                            }
                        } else if ($.input.justReleased($.input.KEY.JUMP)) {
                            this.jumpTime = 0;
                        }
                    } else {
                        if ($.input.justPressed($.input.KEY.JUMP)) {
                            this.dy += -128;
                            this.jumpTime += dt;
                            $.sfx.action.play();
                        }
                    }

                    if ($.input.justReleased($.input.KEY.ACTION)) {
                        actionPressed = true;
                    }
                }

                if (actionPressed && this.tabletIndex) {
                    $.logic.sendEntityMessage(this.tabletIndex, this.type, { throw: true, dx: this.dx + (this.facing * 150), dy: this.dy - 150 });
                    this.tabletIndex = null;
                    $.gfx.playAnimation(
                        this.sprites[0],
                        this.facing < 0 ? this.headLeft : this.headRight
                    );
                    $.gfx.playAnimation(
                        this.sprites[1],
                        this.facing < 0 ? this.standLeft : this.standRight
                    );
                    $.physics.toggleHitboxActive(this.hitboxes[1], false);
                    actionPressed = false;
                }

                if (this.dx && !this.falling) {
                    $.gfx.playAnimation(
                        this.sprites[0],
                        this.dx > 0 ? (this.tabletIndex ? this.carryRight : this.headRight) : (this.tabletIndex ? this.carryLeft : this.headLeft),
                    );
                    if ($.gfx.playAnimation(
                        this.sprites[1],
                        this.dx > 0 ? this.walkRight : this.walkLeft,
                        this.dx > 0 ? this.standRight : this.standLeft
                    ) === 0) {
                        $.sfx.walk.play();
                    };
                } else {
                    $.gfx.toggleLoopSprite(this.sprites[1], false);
                }

                const stepX = this.dx * dt;
                const stepY = this.dy * dt;

                this.x += stepX;
                this.y += stepY;

                $.entities.moveEntity(this, stepX, stepY);

                const { entities, solidCollisions } = $.physics.checkCollisions(this.tabletIndex ? this.hitboxes[1] : this.hitboxes[0]);

                let onLadder = false;
                
                for (let i = entities.length - 1; i > -1; i--) {
                    const type = $.logic.getEntityType(entities[i]);

                    switch (type) {
                        case $.logic.ENTITY.TABLET:
                            if (actionPressed) {
                                if (!this.roomForTablet()) {
                                    $.logic.sendEntityMessage(entities[i], this.type, { kick: true, dx: this.dx + (this.facing * 150), dy: this.dy - 30 });
                                    $.sfx.chunk.play()
                                } else {
                                    this.tabletIndex = entities[i];
                                    $.gfx.playAnimation(
                                        this.sprites[0],
                                        this.dx > 0 ? this.carryRight : this.carryLeft
                                    );
                                    $.sfx.action.play();
                                    $.physics.toggleHitboxActive(this.hitboxes[1], true);
                                    $.logic.sendEntityMessage(this.tabletIndex, this.type, { carry: true, index: this.index, hitbox: this.hitboxes[1] });
                                }

                                actionPressed = false;
                            }
                            break;
                        case $.logic.ENTITY.LADDER:
                            onLadder = true;
                            if (dy === 1) dy = 0;
                            break;
                        case $.logic.ENTITY.SWITCH_PURPLE:
                        case $.logic.ENTITY.SWITCH_GREEN:
                        case $.logic.ENTITY.SWITCH_BROWN:
                            if (actionPressed && !this.tabletIndex) {
                                $.logic.sendEntityMessage(entities[i], this.type);
                            }
                            break;
                    }
                }

                const { doFall } = $.entities.handleSolidCollisions(this, solidCollisions);

                this.falling = !onLadder && doFall;

                if (this.falling) {
                    if (!doFall) {
                        $.sfx.walk.play();
                    }

                    if (!onLadder) {
                        this.dy += 500 * dt;
                    }
                } else {
                    this.jumpTime = 0;
                    if (onLadder) {
                        this.dy = dy;
                    } else {
                        this.dy = 1;
                    }
                }
            },
            function (sender, data = null) {
                switch (sender) {
                    case $.logic.ENTITY.TABLET:
                        if (!this.roomForTablet()) {
                            break;
                        }
                        this.tabletIndex = data.index;
                        $.logic.sendEntityMessage(data.index, this.type, { carry: true, index: this.index, hitbox: this.hitboxes[1] });
                        $.gfx.playAnimation(this.sprites[0], this.facing < 0 ? this.carryLeft : this.carryRight);
                        $.gfx.playAnimation(this.sprites[1], this.facing < 0 ? this.standLeft : this.standRight);
                        break;
                    case $.logic.ENTITY.ENEMY_LEFT:
                    case $.logic.ENTITY.ENEMY_RIGHT:
                        return !!this.tabletIndex;
                }
            },
            (player) => {
                $.gfx.playAnimation(player.sprites[0], player.headRight);
                $.gfx.playAnimation(player.sprites[1], player.standRight);
            }
        ).index;
    },
    newTablet: function (x, y) {
        return this._newEntity(
            $.logic.ENTITY.TABLET,
            {
                STATE: {
                    ON_GROUND: 1,
                    CARRIED: 2,
                    THROWN: 3,
                    KICKED: 4
                },

                state: 1,
                attachedTo: null,

                x: x,
                y: y,
                dx: 0,
                dy: 500,

                hitboxes: [[x, y, x + 32, y + 32, false]],
                sprites: [[x, y, 32, 32, true]],

                handleMovement: function (dt) {
                    const stepX = this.dx * dt;
                    const stepY = this.dy * dt;

                    this.x += stepX;
                    this.y += stepY;

                    $.entities.moveEntity(this, stepX, stepY);

                    const collisionData = $.physics.checkCollisions(this.hitboxes[0]);

                    const { doFall } = $.entities.handleSolidCollisions(this, collisionData.solidCollisions);

                    if (!doFall) {
                        if (this.state === this.STATE.THROWN) {
                            $.sfx.chunk.play();
                        }
                        this.dx = 0;
                        this.dy = 1;
                        this.state = this.STATE.ON_GROUND;
                        this.attachedTo = null;
                    } else {
                        this.dy += 500 * dt;
                    }

                    return collisionData;
                }
            },
            function (dt) {
                switch (this.state) {
                    case this.STATE.ON_GROUND:
                        this.handleMovement(dt);
                        break;
                    case this.STATE.CARRIED: {
                        const info = $.physics.getHitboxInfo(this.attachedTo.hitbox);
                        $.entities.setEntityPos(this, info.x1, info.y1);
                    }
                        break;
                    case this.STATE.THROWN: {
                        const { entities, solidCollisions } = this.handleMovement(dt);

                        for (let i = 0; i < entities.length; i++) {
                            let entity = entities[i];

                            if (this.attachedTo && entity === this.attachedTo.index) {
                                continue;
                            }

                            switch ($.logic.getEntityType(entity)) {
                                case $.logic.ENTITY.NIC:
                                case $.logic.ENTITY.MAF:
                                    $.logic.sendEntityMessage(entity, this.type, { index: this.index })
                            }
                        }
                        
                        for (let i = 0; i < solidCollisions.length; i++) {
                            if (!!solidCollisions[i].y && this.dy < 0)
                                this.dy = 0;
                            if (!!solidCollisions[i].x) {
                                this.dx = 0;
                            }

                            if (this.dx === 0 && this.dy === 0)
                                break;
                        }

                        if (solidCollisions.find(c => !!c.y) && this.dy < 0) {
                            this.dy = 0;
                        }
                    }
                        break;
                    case this.STATE.KICKED: {
                        this.handleMovement(dt);
                    }
                        break;
                }
            },
            function (sender, data = null) {
                if (sender !== $.logic.ENTITY.NIC && sender !== $.logic.ENTITY.MAF) return;

                if (data.throw) {
                    this.state = this.STATE.THROWN;
                    this.dx = data.dx;
                    this.dy = data.dy;
                } else if (data.carry) {
                    this.attachedTo = data;
                    this.state = this.STATE.CARRIED;
                } else if (data.kick) {
                    this.state = this.STATE.KICKED;
                    this.dx = data.dx;
                    this.dy = data.dy;
                }
            },
            (tablet) => $.gfx.playAnimation(tablet.sprites[0], $.gfx.ANIMATION.TABLET)
        ).index;
    },
    newLadder: function (x, y, h, color = 0, on = null) {
        const sprites = [];
        for (let i = 0; i < h; i++) {
            sprites.push([x, y + (i * $.logic.TILE_SIZE), $.logic.TILE_SIZE, $.logic.TILE_SIZE, color ? on : true])
        }

        return this._newEntity(
            $.logic.ENTITY.LADDER,
            {
                on: on,
                color: color || 0,

                hitboxes: [[x, y, x + $.logic.TILE_SIZE, y + (h * $.logic.TILE_SIZE), false, color ? on : true]],
                sprites: sprites
            },
            null,
            function (sender, data = null) {
                if (data.switch_color !== this.color) {
                    return;
                }

                this.on = !this.on;

                $.physics.toggleHitboxActive(this.hitboxes[0], this.on);
                this.sprites.forEach(s => $.gfx.toggleDrawSprite(s, this.on));
            },
            (ladder) => ladder.sprites.forEach(sprite => $.gfx.playAnimation(
                sprite,
                $.gfx.ANIMATION.LADDER[color || 0]
            ))
        ).index;
    },
    newBlock: function (x, y, w, h, type, isDoor, color = null, on = null) {
        const sprites = [];
        for (let wi = 0; wi < w; wi++) {
            for (let hi = 0; hi < h; hi++) {
                sprites.push([x + (wi * $.logic.TILE_SIZE), y + (hi * $.logic.TILE_SIZE), $.logic.TILE_SIZE, $.logic.TILE_SIZE, on]);
            }
        }

        return this._newEntity(
            type,
            {
                on: on,
                color: color,
                sprites: sprites,
                hitboxes: [[x, y, x + (w * 32), y + (h * 32), true, on]],
                animations: isDoor ? [$.gfx.ANIMATION.DOOR[color]] : [$.gfx.ANIMATION.BRIDGE[color]]
            },
            null,
            function (sender, data = null) {
                if (data.switch_color !== this.color) {
                    return;
                }

                this.on = !this.on;

                $.physics.toggleHitboxActive(this.hitboxes[0], this.on);
                this.sprites.forEach(s => $.gfx.toggleDrawSprite(s, this.on));
            },
            (block) => {
                block.sprites.forEach(s => $.gfx.playAnimation(s, block.animations[0]));
            }
        ).index;
    },
    newPressurePlate: function (x, y, type, color) {
        return this._newEntity(
            type,
            {
                on: false,
                color: color,
                hitboxes: [[x, y + 16, x + 32, y + 32, false, true]],
                sprites: [[x, y, 32, 32, true]],
                animations: [$.gfx.ANIMATION.PRESSURE_PLATE[0][color], $.gfx.ANIMATION.PRESSURE_PLATE[1][color]]

            },
            function (dt) {
                const { entities } = $.physics.checkCollisions(this.tabletIndex ? this.hitboxes[1] : this.hitboxes[0]);

                if (entities.length) {
                    if (this.on) {
                        return;
                    }

                    this.on = true;

                    $.gfx.playAnimation(this.sprites[0], this.animations[1]);
                    $.sfx.chunk.play();
                    $.logic.sendEntityMessage(-1, this.index, { switch_color: this.color });
                } else {
                    if (!this.on) {
                        return;
                    }

                    this.on = false;

                    $.gfx.playAnimation(this.sprites[0], this.animations[0]);
                    $.sfx.chunk.play();
                    $.logic.sendEntityMessage(-1, this.index, { switch_color: this.color });
                }
            },
            null,
            (plate) => {
                $.gfx.playAnimation(plate.sprites[0], plate.animations[0]);
            }
        ).index;
    },
    newSwitch: function (x, y, type, color) {
        return this._newEntity(
            type,
            {
                state: 0,
                color: color,
                hitboxes: [[x, y, x + 32, y + 32, false, true]],
                sprites: [[x, y, 32, 32, true]],
                animations: [$.gfx.ANIMATION.SWITCH[0][color], $.gfx.ANIMATION.SWITCH[1][color]]
            },
            null,
            function (sender, data = null) {
                if (sender !== $.logic.ENTITY.NIC && sender !== $.logic.ENTITY.MAF) return;

                this.state = this.state === 0 ? 1 : 0;

                $.gfx.playAnimation(this.sprites[0], this.animations[this.state]);
                $.sfx.chunk.play();
                $.logic.sendEntityMessage(-1, this.index, { switch_color: this.color });
            },
            (switchEntity) => {
                $.gfx.playAnimation(switchEntity.sprites[0], switchEntity.animations[0]);
            }
        ).index;
    },
    newFlag: function (x, y) {
        return this._newEntity(
            $.logic.ENTITY.FLAG,
            {
                sprites: [
                    [x, y, 32, 32, true],
                    [x, y + 32, 32, 32, true]
                ],
                hitboxes: [
                    [
                        x,
                        y - 32,
                        x + 32,
                        y + 64,
                        false,
                        true
                    ]
                ],
            },
            function (dt) {
                const { entities } = $.physics.checkCollisions(this.hitboxes[0]);

                if (entities.length < 3) return;

                if (entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.NIC) &&
                    entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.MAF) &&
                    entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.TABLET)) {
                    $.logic.loadMap();
                }
            },
            null,
            (flag) => {
                $.gfx.playAnimation(flag.sprites[0], $.gfx.ANIMATION.FLAG_FLAP);
                $.gfx.playAnimation(flag.sprites[1], $.gfx.ANIMATION.FLAG_POLE);
            }
        ).index
    },
    newEnemy: function (x, y, type) {
        return this._newEntity(
            type,
            {
                dx: type === $.logic.ENTITY.ENEMY_LEFT ? -110 : 110,
                oldDx: 0,
                dy: 0,
                sprites: [
                    [x, y, 32, 32, true],
                    [x, y + 32, 32, 32, true]
                ],
                hitboxes: [
                    [
                        x + 8,
                        y + 4,
                        x + 32 - 8,
                        y + 64,
                        false,
                        true
                    ]
                ],
                lastHit: null,
            },
            function (dt) {
                $.entities.moveEntity(this, this.dx * dt, this.dy * dt);

                const { entities, solidCollisions } = $.physics.checkCollisions(this.hitboxes[0]);

                const { hitWall } = $.entities.handleSolidCollisions(this, solidCollisions);

                const nic = entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.NIC);
                if (nic && !$.logic.sendEntityMessage(nic, this.type)) {
                    $.sfx.hurt.play();
                    $.promptLevelRestart();
                    return;
                }

                const maf = entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.MAF);
                if (maf && !$.logic.sendEntityMessage(maf, this.type)) {
                    $.sfx.hurt.play();
                    $.promptLevelRestart();
                    return;
                }

                const stop = entities.find(x => $.logic.getEntityType(x) === $.logic.ENTITY.ENEMY_STOP);

                const hit = nic || maf || stop;

                if (this.dx) {
                    this.oldDx = this.dx;
                }

                if ((nic || maf) && stop) {
                    this.dx = 0;
                    return;
                }

                this.dx = this.dx || this.oldDx;

                if (hit && hit !== this.lastHit) {
                    this.lastHit = hit;
                    this.dx = -this.dx;
                    $.gfx.playAnimation(this.sprites[0], this.dx < 0 ? $.gfx.ANIMATION.ENEMY_TOP_LEFT : $.gfx.ANIMATION.ENEMY_TOP_RIGHT);
                    $.gfx.playAnimation(this.sprites[1], this.dx < 0 ? $.gfx.ANIMATION.ENEMY_BOTTOM_LEFT : $.gfx.ANIMATION.ENEMY_BOTTOM_RIGHT);
                }
            },
            null,
            (enemy) => {
                $.gfx.playAnimation(enemy.sprites[0], enemy.dx < 0 ? $.gfx.ANIMATION.ENEMY_TOP_LEFT : $.gfx.ANIMATION.ENEMY_TOP_RIGHT);
                $.gfx.playAnimation(enemy.sprites[1], enemy.dx < 0 ? $.gfx.ANIMATION.ENEMY_BOTTOM_LEFT : $.gfx.ANIMATION.ENEMY_BOTTOM_RIGHT);
            }
        ).index;
    },
    newEnemyStop: function (x, y) {
        return this._newEntity(
            $.logic.ENTITY.ENEMY_STOP,
            {
                hitboxes: [
                    [
                        x,
                        y,
                        x + 32,
                        y + 32,
                        false,
                        true
                    ]
                ],
            }
        ).index
    },
};
