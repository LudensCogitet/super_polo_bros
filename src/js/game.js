"use strict";

$.lastFrameTimestamp = 0;
$.run = false;
$.levelRestart = false;

$.init = function() {
    $.gfx.init(800, 600)
    .then(() => $.input.init())
    .then(() => $.physics.init(100))
    .then(() => $.logic.init())
    .then(() => $.loop());
};

$.loop = function() {
    const dt = $.dt(Date.now());

    $.input.update(dt);

    if ($.run) {
        if ($.levelRestart) {
            $.levelRestart = false;
            $.logic.loadMap(-1);
            $.showText();
        }

        $.logic.update(dt);
        $.gfx.update(dt);
    } else if ($.input.anyKeyPressed) {
        $.run = true;
    }

    window.requestAnimFrame($.loop);
};

$.promptLevelRestart = function() {
    $.run = false;
    $.levelRestart = true;
    $.showText('restart-prompt', true);
};

$.showText = function(toDisplay, clear = false) {
    if (clear) {
        $.gfx.clear();
    }

    document.getElementById('start-prompt').style.display = toDisplay === 'start-prompt' ? 'block' : 'none';
    document.getElementById('restart-prompt').style.display = toDisplay === 'restart-prompt' ? 'block' : 'none'

    if (toDisplay === 'end-game-text') {
        document.getElementById('end-game-text-1').style.display = 'block';
        document.getElementById('end-game-text-2').style.display = 'block';
    } else {
        document.getElementById('end-game-text-1').style.display = 'none';
        document.getElementById('end-game-text-2').style.display = 'none';
    }
};


$.dt = function(timestamp) {
    const delta = timestamp - $.lastFrameTimestamp;
    $.lastFrameTimestamp = timestamp;
    
    if (delta === timestamp || delta > 500) {
        return 0;
    }

    return delta / 1000;
};

window.addEventListener('load', $.init, false);
window.addEventListener('click', () => {
    if (!$.run) {
        $.run = true;
    }
});
