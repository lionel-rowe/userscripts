// ==UserScript==
// @name         Insert Special Characters
// @namespace    http://tampermonkey.net/
// @match        http*://*
// @include http://*
// @include https://*
// ==/UserScript==

(() => {
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === '7') {
      e.preventDefault();
      const entityRaw = prompt('Enter an HTML entity name (case sensitive). Examples:\n• times → ×\n• mu → μ\n• copy → ©\n• Sigma → Σ\n• eth → ð\n\nFull reference: https://www.freeformatter.com/html-entities.html') || '';
      const entityMatch = entityRaw.trim().match(/^&?(#(?:\d+|x[0-9a-f]+)|[a-zA-Z0-9]+);?$/);
      const entity = entityMatch ? entityMatch[1] : '';

      const span = document.createElement('span');
      span.innerHTML = `&${entity};`;

      const char = span.textContent;

      if (!entity || char.length > 1) {
        alert('Not a valid HTML entity name.');
      } else {
        document.execCommand('insertText', false, char);
      }
    }

  });
})();
