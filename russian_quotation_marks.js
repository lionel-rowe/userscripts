// ==UserScript==
// @name         Russian Quotation Marks
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  try to take over the world! with Russian quotation marks
// @author       lionel.rowe@gmail.com
// @match        http*://*
// @include http://*
// @include https://*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
      if (e.key === ',') {
      // if (e.key === 'б') {
        e.preventDefault();
        document.execCommand('insertText', false, '«');
      } else if (e.key === '.') {
      // } else if (e.key === 'ю') {
        e.preventDefault();
        document.execCommand('insertText', false, '»');
      }
    }
  });
})();
