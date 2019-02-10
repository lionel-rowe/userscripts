// ==UserScript==
// @name         Marquee Killer
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  Kill marquees
// @author       lionel.rowe@gmail.com
// @match        http*://*
// @include http://*
// @include https://*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  document.querySelectorAll('marquee').forEach(el => {

  const div = document.createElement('div');

  div.innerHTML = `<del>Marquee</del> ${el.innerHTML}`;

  el.parentNode.replaceChild(div, el);

});
})();