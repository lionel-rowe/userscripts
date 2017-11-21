// ==UserScript==
// @name         Password Viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  View passwords
// @author       You
// @match        http*://*
// @include http://*
// @include https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keydown', e => {
        if (e.target.type === 'password' && e.code === 'Slash' && e.ctrlKey === true) {
          e.target.type = 'text';
            e.target.addEventListener('keyup', keyUpListener);
        }
    });

    function keyUpListener(e) {
        e.target.type = 'password';
        e.target.removeEventListener('keyup', keyUpListener);
    }

})();
