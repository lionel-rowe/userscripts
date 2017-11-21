// ==UserScript==
// @name         Google W3Schools Deprecator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds "deprecated" styling to W3Schools results in Google searches
// @author       Lionel Rowe
// @match        https://www.google.com.tw/*
// @include      https://www.google.*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

    const faScript = document.createElement('script');
    faScript.type = 'text/javascript';
    faScript.src = 'https://use.fontawesome.com/77eb59ff2a.js';
    document.querySelector('body').appendChild(faScript);

    document.querySelectorAll('.g').forEach(function(g) {
    if (g.querySelector('cite').textContent.indexOf('w3schools.com') > -1) {
    const siteLink = g.querySelector('h3 a');
    const href = siteLink.href;
    siteLink.href = '#';
    siteLink.style.color = 'black';
    siteLink.style.cursor = 'text';
    siteLink.style.textDecoration = 'none';
    siteLink.parentNode.innerHTML += ` <a href="${href}"><i class="fa fa-thumbs-o-down" style="color: black;" aria-hidden="true" title="This deprecated website should no longer be used, but will probably still work."></i></a>`;

    g.style.opacity = '0.5';
      }
    });

})();
