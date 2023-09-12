"use strict";

function SpriteAnimation(frames, frameWidth, frameHeight, frameRate, loop = false) {
    this.frameWidth = frameWidth * $.gfx.SPRITE_SHEET_UNIT;
    this.frameHeight = frameHeight * $.gfx.SPRITE_SHEET_UNIT;
    this.frameRate = frameRate;
    this.loop = loop;

    this.frames = frames.map(frame => {
        return [
            (frame[0] * this.frameWidth) + (($.gfx.SPRITE_SHEET_PADDING * 2) * frame[0]) + $.gfx.SPRITE_SHEET_PADDING,
            (frame[1] * this.frameHeight) + (($.gfx.SPRITE_SHEET_PADDING * 2) * frame[1]) + $.gfx.SPRITE_SHEET_PADDING,
        ];
    });
}

function Sprite(entityId, x, y, w, h, draw = true) {
    this.entityId = entityId;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.currentAnimation = null;

    this.frame = 0;
    this.frameTime = 0;
    this.play = false;
    this.draw = draw;
    this.done = false;
    this.loop = false;
    this.onDone = null;
}

$.gfx = {
    data: new Image(),

    SPRITE_SHEET_PADDING: 1,
    SPRITE_SHEET_UNIT: 8,
    SPRITE_SHEET_SIDE: 11,

    TILES: {
        SKY: 1,
        GRASS: 2,
        FLOOR: 3,
        WALL_SOLID: 4,
        ROOF_END_LEFT: 5,
        ROOF_MIDDLE: 6,
        ROOF_END_RIGHT: 7,
        PILLAR: 8,
        BLOCKING: 9,
        ENEMY_BLOCKING: 10,
        // ...
        WALL_BACKGROUND: 12,
        // ...
        BRIDGE_PURPLE: 23,
        BRIDGE_GREEN: 24,
        BRIDGE_BROWN: 25,

        DOOR_PURPLE: 26,
        DOOR_GREEN: 27,
        DOOR_BROWN: 28,

        LADDER: 29,
        LADDER_PURPLE: 30,
        LADDER_GREEN: 31,
        LADDER_BROWN: 32,
        // ...
        NIC_HEAD_RIGHT: 45,
        NIC_HEAD_LEFT: 46,
        NIC_HEAD_CARRY_RIGHT: 47,
        NIC_HEAD_CARRY_LEFT: 48,
        MAF_HEAD_RIGHT: 49,
        MAF_HEAD_LEFT: 50,
        MAF_HEAD_CARRY_RIGHT: 51,
        MAF_HEAD_CARRY_LEFT: 52,

        PRESSURE_PLATE_PURPLE_OFF: 53,
        PRESSURE_PLATE_GREEN_OFF: 54,
        PRESSURE_PLATE_BROWN_OFF: 55,
        // ...
        NIC_FEET_STAND_RIGHT: 56,
        NIC_FEET_STEP_1_RIGHT: 57,
        NIC_FEET_STEP_2_RIGHT: 58,
        NIC_FEET_STEP_3_RIGHT: 59,
        NIC_FEET_STAND_LEFT: 60,
        NIC_FEET_STEP_1_LEFT: 61,
        NIC_FEET_STEP_2_LEFT: 62,
        NIC_FEET_STEP_3_LEFT: 63,
        // ...
        PRESSURE_PLATE_PURPLE_ON: 64,
        PRESSURE_PLATE_GREEN_ON: 65,
        PRESSURE_PLATE_BROWN_ON: 66,

        MAF_FEET_STAND_RIGHT:  67,
        MAF_FEET_STEP_1_RIGHT: 68,
        MAF_FEET_STEP_2_RIGHT: 69,
        MAF_FEET_STEP_3_RIGHT: 70,
        MAF_FEET_STAND_LEFT: 71,
        MAF_FEET_STEP_1_LEFT: 72,
        MAF_FEET_STEP_2_LEFT: 73,
        MAF_FEET_STEP_3_LEFT: 74,
        SWITCH_PURPLE_LEFT: 75,
        SWITCH_GREEN_LEFT: 76,
        SWITCH_BROWN_LEFT: 77,
        SWITCH_PURPLE_RIGHT: 86,
        SWITCH_GREEN_RIGHT: 87,
        SWITCH_BROWN_RIGHT: 88,

        TABLET: 78,

        FLAG: 79,
        FLAG_FLAP_1: 80,
        FLAG_FLAP_2: 81,
        FLAG_FLAP_3: 82,
        FLAG_POLE: 90,

        ENEMY_TOP_RIGHT_1: 91,
        ENEMY_TOP_RIGHT_2: 92,

        ENEMY_TOP_LEFT_1: 93,
        ENEMY_TOP_LEFT_2: 94,
        
        ENEMY_BOTTOM_RIGHT_1: 102,
        ENEMY_BOTTOM_RIGHT_2: 103,
        ENEMY_BOTTOM_RIGHT_3: 104,
        ENEMY_BOTTOM_RIGHT_4: 105,

        ENEMY_BOTTOM_LEFT_1: 113,
        ENEMY_BOTTOM_LEFT_2: 114,
        ENEMY_BOTTOM_LEFT_3: 115,
        ENEMY_BOTTOM_LEFT_4: 116,
    },

    NO_DRAW: [],

    ANIMATION: {},

    sprites: [null],
    animations: [null],

    init: function (width, height) {
        this.width = width;
        this.height = height;

        this._canvas = document.getElementsByTagName('canvas')[0];
        this._canvas.width = width;
        this._canvas.height = height;
        
        this.NO_DRAW = [this.TILES.BLOCKING, this.TILES.ENEMY_BLOCKING];

        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        this._background_canvas = new OffscreenCanvas(width, height);
        
        this._background_ctx = this._background_canvas.getContext('2d');
        this._background_ctx.imageSmoothingEnabled = false;

        this.data.src = './assets/img/sprite_sheet.png';
        
        this.ANIMATION.NIC_HEAD_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_HEAD_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.NIC_HEAD_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_HEAD_LEFT), 1, 1, 1, false
            );
        this.ANIMATION.NIC_HEAD_CARRY_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_HEAD_CARRY_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.NIC_HEAD_CARRY_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_HEAD_CARRY_LEFT), 1, 1, 1, false
            );

        this.ANIMATION.NIC_FEET_STAND_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_FEET_STAND_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.NIC_FEET_STAND_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_FEET_STAND_LEFT), 1, 1, 1, false
            );
        this.ANIMATION.NIC_FEET_WALK_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_FEET_STAND_RIGHT, this.TILES.NIC_FEET_STEP_3_RIGHT), 1, 1, 10, true
            );
        this.ANIMATION.NIC_FEET_WALK_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.NIC_FEET_STAND_LEFT, this.TILES.NIC_FEET_STEP_3_LEFT), 1, 1, 10, true
            );

        this.ANIMATION.MAF_HEAD_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_HEAD_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.MAF_HEAD_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_HEAD_LEFT), 1, 1, 1, false
            );
        this.ANIMATION.MAF_HEAD_CARRY_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_HEAD_CARRY_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.MAF_HEAD_CARRY_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_HEAD_CARRY_LEFT), 1, 1, 1, false
            );

        this.ANIMATION.MAF_FEET_STAND_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_FEET_STAND_RIGHT), 1, 1, 1, false
            );
        this.ANIMATION.MAF_FEET_STAND_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_FEET_STAND_LEFT), 1, 1, 1, false
            );
        this.ANIMATION.MAF_FEET_WALK_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_FEET_STAND_RIGHT, this.TILES.MAF_FEET_STEP_3_RIGHT), 1, 1, 10, true
            );
        this.ANIMATION.MAF_FEET_WALK_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.MAF_FEET_STAND_LEFT, this.TILES.MAF_FEET_STEP_3_LEFT), 1, 1, 10, true
            );

        this.ANIMATION.TABLET = this.registerAnimation(this._tileRangeFromIndecies(this.TILES.TABLET), 1, 1, 1, false);

        this.ANIMATION.FLAG_FLAP = this.registerAnimation(
            this._tileRangeFromIndecies(
                this.TILES.FLAG,
                this.TILES.FLAG_FLAP_3
            ),
            1, 1, 3, true
        );

        this.ANIMATION.FLAG_POLE = this.registerAnimation(this._tileRangeFromIndecies(this.TILES.FLAG_POLE), 1, 1, 1, false);

        this.ANIMATION.LADDER = [
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.LADDER), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.LADDER_PURPLE), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.LADDER_GREEN), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.LADDER_BROWN), 1, 1, 1, false)
        ];

        this.ANIMATION.BRIDGE = [
            null,
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.BRIDGE_PURPLE), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.BRIDGE_GREEN), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.BRIDGE_BROWN), 1, 1, 1, false)
        ];

        this.ANIMATION.DOOR = [
            null,
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.DOOR_PURPLE), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.DOOR_GREEN), 1, 1, 1, false),
            this.registerAnimation(this._tileRangeFromIndecies(this.TILES.DOOR_BROWN), 1, 1, 1, false)
        ];

        this.ANIMATION.PRESSURE_PLATE = [
            [
                null,
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_PURPLE_OFF), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_GREEN_OFF), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_BROWN_OFF), 1, 1, 1, false)
            ],
            [
                null,
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_PURPLE_ON), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_GREEN_ON), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.PRESSURE_PLATE_BROWN_ON), 1, 1, 1, false)
            ]
        ];
        
        this.ANIMATION.SWITCH = [
            [
                null,
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_PURPLE_LEFT), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_GREEN_LEFT), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_BROWN_LEFT), 1, 1, 1, false)        
            ],
            [
                null,
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_PURPLE_RIGHT), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_GREEN_RIGHT), 1, 1, 1, false),
                this.registerAnimation(this._tileRangeFromIndecies(this.TILES.SWITCH_BROWN_RIGHT), 1, 1, 1, false)
            ]
        ];

        this.ANIMATION.ENEMY_TOP_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.ENEMY_TOP_RIGHT_1, this.TILES.ENEMY_TOP_RIGHT_2),
            1, 1, 5, true
        );

        this.ANIMATION.ENEMY_TOP_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.ENEMY_TOP_LEFT_1, this.TILES.ENEMY_TOP_LEFT_2),
            1, 1, 5, true
        );

        this.ANIMATION.ENEMY_BOTTOM_RIGHT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.ENEMY_BOTTOM_RIGHT_1, this.TILES.ENEMY_BOTTOM_RIGHT_4),
            1, 1, 10, true
        );

        this.ANIMATION.ENEMY_BOTTOM_LEFT = this.registerAnimation(
            this._tileRangeFromIndecies(this.TILES.ENEMY_BOTTOM_LEFT_1, this.TILES.ENEMY_BOTTOM_LEFT_4),
            1, 1, 10, true
        );

        return new Promise(resolve => {
            this.data.onload = resolve
        });
    },

    _tileFromIndex: function(tileIndex) {
        const adjustedIndex = tileIndex - 1;
        
        return [
            adjustedIndex % this.SPRITE_SHEET_SIDE,
            Math.floor(adjustedIndex / this.SPRITE_SHEET_SIDE)
        ];
    },

    _tileRangeFromIndecies: function(first, last = null) {
        const frames = [];
        
        if (!last) {
            last = first;
        }

        for (let current = first; current <= last; current++ ) {
            frames.push(this._tileFromIndex(current));
        }

        return frames;
    },

    _updateSprite: function(sprite, dt) {
        if (!sprite.play || sprite.done) return;
        sprite.frameTime += dt;
        const animation = this.animations[sprite.currentAnimation];
        if (sprite.frameTime >= 1 / animation.frameRate) {
            sprite.frame++;
            sprite.frameTime = 0;
            if (sprite.frame >= animation.frames.length) {
                if (sprite.loop) {
                    sprite.frame = 0;
                } else {
                    if (sprite.onDone) {
                        this._playAnimation(sprite, sprite.onDone);
                    } else {
                        sprite.frame = animation.frames.length -1;
                        sprite.done = true;
                    }
                }
            }
        }
    },

    _playAnimation: function(sprite, animationIndex, onDone = null, restart = false) {
        if (!restart &&
            sprite.currentAnimation === animationIndex &&
            sprite.play === true &&
            sprite.done !== true) {
            return sprite.frame;
        }

        sprite.currentAnimation = animationIndex;
        sprite.frame = 0;
        sprite.frameTime = 0;
        sprite.play = true;
        sprite.done = false;
        sprite.onDone = onDone;
        sprite.loop = this.animations[animationIndex].loop;

        return 0;
    },

    drawTile: function (context, tileIndex, x, y, w, h) {
        if (this.NO_DRAW.includes(tileIndex)) {
            return;
        }

        const coords = this._tileFromIndex(tileIndex);

        context.drawImage(
            this.data,
            (coords[0] * 8) + ((this.SPRITE_SHEET_PADDING * 2) * coords[0]) + this.SPRITE_SHEET_PADDING,
            (coords[1] * 8) + ((this.SPRITE_SHEET_PADDING * 2) * coords[1]) + this.SPRITE_SHEET_PADDING,
            8,8,
            x, y, w, h
        );
    },

    clear: function() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    },
    update: function(dt) {
        if (!$.run) { return; }
        
        this.clear();
        this._ctx.drawImage(this._background_canvas, 0, 0, this.width, this.height);

        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            if (!sprite || !sprite.draw) continue;

            this._updateSprite(sprite, dt);

            const animation = this.animations[sprite.currentAnimation];
            const frame = animation.frames[sprite.frame];

            this._ctx.drawImage(
                this.data,
                frame[0],
                frame[1],
                animation.frameWidth,
                animation.frameHeight,

                sprite.x,
                sprite.y,
                sprite.w,
                sprite.h
            );
        }

        this._ctx.fillStyle = 'black';
        this._ctx.fillRect(0, this._canvas.height - 24, this._canvas.width, this._canvas.height);

        if ($.debug && $.debug.hitboxes) {
            for (let i = 1; i < $.physics.hitboxes.length; i++) {
                const hitbox = $.physics.hitboxes[i];

                if ((hitbox.entityId && $.debug.hitboxes.entities) ||
                    (!hitbox.entityId && $.debug.hitboxes.tiles) && hitbox.active) {
                        this._ctx.strokeStyle = "#FF0000";
                        this._ctx.strokeRect(hitbox.x1, hitbox.y1, hitbox.x2 - hitbox.x1, hitbox.y2 - hitbox.y1)
                    }
            }
        }
    },

    playAnimation: function(spriteIndex, animationIndex, onDone = null, restart = false) {
        return this._playAnimation(this.sprites[spriteIndex], animationIndex, onDone, restart);
    },

    registerSprite: function(x, y, w, h, draw = true, entityId = null) {
        for (let i = 1; i < this.sprites.length; i++) {
            if (!this.sprites[i]) {
                this.sprites[i] = new Sprite(entityId, x, y, w, h, draw);
                return i;
            }
        }

        this.sprites.push(new Sprite(entityId, x, y, w, h, draw));

        return this.sprites.length - 1;
    },

    registerAnimation: function(frames, frameWidth, frameHeight, frameRate, loop = false) {
        const newAnim = new SpriteAnimation(frames, frameWidth, frameHeight, frameRate, loop)
        
        for (let i = 1; i < this.animations.length; i++) {
            if (!this.animations[i]) {
                this.animations[i] = newAnim;
                return i;
            }
        }

        this.animations.push(newAnim);

        return this.animations.length - 1;
    },

    setSpritePos: function(spriteIndex, x, y) {
        const sprite = this.sprites[spriteIndex];
        sprite.x = x;
        sprite.y = y;
    },

    moveSprite: function(spriteIndex, dx, dy) {
        const sprite = this.sprites[spriteIndex];
        sprite.x += dx;
        sprite.y += dy;
    },

    toggleDrawSprite: function(spriteIndex, draw) {
        if (draw === true || draw === false) {
            this.sprites[spriteIndex].draw = draw;
            return;
        }

        this.sprites[spriteIndex].draw = !this.sprites[spriteIndex].draw;
    },

    toggleLoopSprite: function(spriteIndex, loop) {
        this.sprites[spriteIndex].loop = loop;
    },

    freeSprite: function(index) {
        this.sprites[index] = null;
    },

    resetSprites: function() {
        this.sprites = [null];
    },

    freeAnimation: function(index) {
        this.animations[index] = null;
    },

    clearBackground: function() {
        this._background_ctx.clearRect(0, 0, this._background_canvas.width, this._background_canvas.height);
    }
};
