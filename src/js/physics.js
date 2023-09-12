"use strict";

function Hitbox(entityId, x1, y1, x2, y2, solid, active, oneway = false) {
    this.entityId = entityId;
    
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    
    this.solid = solid;
    this.active = active;
    this.oneway = oneway;
}

$.physics = {
    hitboxes: [null],

    SIDE: {
        LEFT:   1,
        RIGHT:  2,
        UP:     3,
        DOWN:   4
    },

    init: function() {
        return Promise.resolve();
    },

    checkCollisions: function(hitboxIndex) {
        const collider = this.hitboxes[hitboxIndex];
        const entities = [];
        const solidCollisions = [];

        for (let i = 1; i < this.hitboxes.length; i++) {
            if (i === hitboxIndex) {
                continue;
            }

            const collidee = this.hitboxes[i];

            if (collider.entityId && collider.entityId === this.hitboxes[i].entityId) {
                continue;
            }

            if (!collidee ||
                !collidee.active ||
                collider.x2 <= collidee.x1 ||
                collider.x1 >= collidee.x2 ||
                collider.y2 <= collidee.y1 ||
                collider.y1 >= collidee.y2) {
                    continue;
                }

            if (collidee.entityId) {
                if (!entities.includes(collidee.entityId)) {
                    entities.push(collidee.entityId);
                }
            }

            if (!collidee.solid) {
                continue;
            }

            const corrections = [
                collidee.x1 - collider.x2, // x
                collidee.x2 - collider.x1, // x
                collidee.y1 - collider.y2, // y
                collidee.y2 - collider.y1  // y
            ];

            let correction = corrections[0];
            let index = 0;
            for (let j = 1; j < corrections.length; j++) {
                if (Math.abs(corrections[j]) < Math.abs(correction)) {
                    correction = corrections[j];
                    index = j;
                }
            }

            const collisionInfo = {
                collidee,
                x: 0,
                y: 0,
                l: corrections[0],
                r: corrections[1],
                u: corrections[2],
                d: corrections[3]
            };

            if (index < 2) {
                collisionInfo.x = correction;
            } else {
                collisionInfo.y = correction;
            }

            if (!collidee.oneway || collisionInfo.y < 0) {
                solidCollisions.push(collisionInfo);
            }
        }

        return {
            entities,
            solidCollisions
        };
    },

    registerHitbox(x1, y1, x2, y2, solid, entityId = null, active = true) {
        for (let i = 1; i < this.hitboxes.length; i++) {
            if (!this.hitboxes[i]) {
                this.hitboxes[i] = new Hitbox(entityId, x1, y1, x2, y2, solid, active);
                return i;
            }
        }

        this.hitboxes.push(new Hitbox(entityId, x1, y1, x2, y2, solid, active));

        return this.hitboxes.length - 1;
    },

    freeHitbox: function(hitboxIndex) {
        this.hitboxes[hitboxIndex] = null;
    },

    resetHitboxes: function() {
        this.hitboxes = [null];
    },

    setHitboxPos: function(hitboxIndex, x, y) {
        const hitbox = this.hitboxes[hitboxIndex];
        const width = hitbox.x2 - hitbox.x1;
        const height = hitbox.y2 - hitbox.y1;

        hitbox.x1 = x;
        hitbox.y1 = y;
        hitbox.x2 = hitbox.x1 + width;
        hitbox.y2 = hitbox.y1 + height;
    },

    moveHitbox: function(hitboxIndex, dx, dy) {
        const hitbox = this.hitboxes[hitboxIndex];
        hitbox.x1 += dx;
        hitbox.y1 += dy;
        hitbox.x2 += dx;
        hitbox.y2 += dy;
    },

    getHitboxInfo: function(hitboxIndex) {
        return {...this.hitboxes[hitboxIndex]};
    },

    toggleHitboxActive: function(hitboxIndex, active) {
        if (active === true || active === false) {
            this.hitboxes[hitboxIndex].active = active;
            return;
        }

        this.hitboxes[hitboxIndex].active = !this.hitboxes[hitboxIndex].active;
    },
}