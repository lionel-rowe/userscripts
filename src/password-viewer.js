
// ==UserScript==
// @name         Password Viewer
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  View passwords
// @author       lionel.rowe@gmail.com
// @match        http*://*
// @include http://*
// @include https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('keydown', e => {
        if (e.target.type === 'password' && e.key === '/' && e.ctrlKey === true) {
          e.target.type = 'text';
            e.target.addEventListener('keyup', keyUpListener);
        }
    });

    function keyUpListener(e) {
        e.target.type = 'password';
        e.target.removeEventListener('keyup', keyUpListener);
    }

})();