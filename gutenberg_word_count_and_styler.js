// ==UserScript==
// @name         Gutenberg Word Count and Styler
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  Add word count to Gutenberg HTML display and improve styling
// @author       Lionel Rowe
// @match        http://www.gutenberg.org/files/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  document.querySelectorAll('pre').forEach(function(el) {
    el.style.fontSize = '1em';
    el.style.fontFamily = 'Georgia, serif';
    el.style.lineHeight = '1.5em';
    el.style.fontStyle = 'normal';
  });

  const body = document.querySelector('body');

  const wordCount = body.textContent.split(/\s+/).length;

  const wcDiv = document.createElement('div');
  wcDiv.style.fontWeight = 'bold';
  wcDiv.textContent = `Approximate word count: ${wordCount}`;

  body.insertBefore(wcDiv, document.querySelector('pre'));

})();
