"use strict";

$.input = {
    KEY: {
        UP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3,
        JUMP: 4,
        ACTION: 5,
        SWITCH: 6,
        RESET: 7
    },
    map: [
        ['w', 'ArrowUp'],
        ['s', 'ArrowDown'],
        ['a', 'ArrowLeft'],
        ['d', 'ArrowRight'],
        [' '],
        ['e', 'Control'],
        ['q', 'Shift'],
        ['r']
    ],
    state: [
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0},
        {pressed: false, justChanged: false, heldTime: 0}
    ],
    keyBuffer: [],

    anyKeyPressed: false,

    init: function() {
        this._clearBuffer();
        window.addEventListener('keyup', (event) => {
            if (event.repeat) return;

            this.anyKeyPresed = false;

            for (let i = 0; i < this.map.length; i++) {
                if (this.map[i].includes(event.key)) {
                    this.keyBuffer[i] = -1;
                }
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return;

            this.anyKeyPresed = true;

            for (let i = 0; i < this.map.length; i++) {
                if (this.map[i].includes(event.key)) {
                    this.keyBuffer[i] = 1;
                }
            }
        });

        return Promise.resolve();
    },

    _clearBuffer: function() {
        this.keyBuffer = this.map.map(() => 0);
    },

    clearState: function() {
        this._clearBuffer();
        for (let i = 0; i < this.state; i++) {
            this.state[i].pressed = false;
            this.state[i].justChanged = false;
            this.state[i].heldTime = 0;
        }
    },

    update: function(dt) {
        for (let i = 0; i < this.state.length; i++) {
            const bufferValue = this.keyBuffer[i];
            if (bufferValue) {
                this.state[i].justChanged = true;
                if (bufferValue < 0) {
                    this.state[i].pressed = false;
                    this.state[i].heldTime = 0;
                } else if (this.keyBuffer[i] > 0) {
                    this.state[i].pressed = true;
                }
            } else {
                this.state[i].justChanged = false;
                if (this.state[i].pressed) {
                    this.state[i].heldTime += dt;
                }
            }
        }

        this._clearBuffer();
    },

    pressed: function(key) {
        return this.state[key].pressed;
    },
    justPressed: function(key) {
        return this.state[key].pressed && this.state[key].justChanged;
    },
    released: function(key) {
        return !this.state[key].pressed;
    },
    justReleased: function(key) {
        return !this.state[key].pressed && this.state[key].justChanged;
    },
    held: function(key) {
        return this.state[key].pressed && !this.state[key].justChanged;
    }
}