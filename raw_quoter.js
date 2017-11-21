// ==UserScript==
// @name         Discourse Raw Quoter
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  Quote raw (markdown) content on Discourse forum.
// @author       Lionel Rowe
// @match        https://forum.freecodecamp.org/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  function quoteRaw(postNumber) {

    if (!postNumber) {
      postNumber = 1;
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

      if (this.readyState === 4 && this.status === 200) {
        const post = JSON.parse(xhr.responseText)
        .post_stream
        .posts
        .filter(el => el.post_number === postNumber)[0];

        const reply = `[quote="${post.username}, post:${post.post_number}, topic:${post.topic_id}"]
${post.raw}
[/quote]`;

        document.querySelector(`#post_${postNumber} .actions .reply`).click();

        setTimeout(function() {
          const replyBox = document.querySelector('.d-editor-input');
          replyBox.value = replyBox.value ? `${reply}\n\n${replyBox.value}` : reply;
        }, 50);
      }
    };

    xhr.open('GET', `${window.location.href.replace(/(\d+)(\/\d*)?$/, `$1\/${postNumber}`)}.json?include_raw=true`, true);
    xhr.send(null);

  }

  function addRawQuoteButton(el) {
    const rawQuoteButton = document.createElement('button');
    rawQuoteButton.innerHTML = `<i class="fa fa-code d-icon d-icon-reply" aria-hidden="true"></i>
  <span class="d-button-label">Raw Quote</span>`;

    rawQuoteButton.setAttribute('aria-label', 'quote raw markdown');
    rawQuoteButton.setAttribute('title', 'quote raw markdown');
    rawQuoteButton.classList.add('widget-button', 'btn-flat', 'create', 'fade-out', 'btn-icon-text', 'raw-quote-button');

    rawQuoteButton.onclick = () => quoteRaw(+el.querySelector('.share').getAttribute('data-post-number'));

    el.appendChild(rawQuoteButton);
  }

  document.querySelectorAll('.actions').forEach(el => addRawQuoteButton(el));

  //observe for new posts being added

  const target = document.querySelector('.ember-view');
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(el) {
        if (el.nodeType === 1) {
          const actions = el.querySelectorAll('.actions');
          if (actions) {
            actions.forEach(function(el) {
              if (!el.querySelector('.raw-quote-button')) {
                addRawQuoteButton(el);
              }
            });
          }
        }
      });
    });
  });

  const config = {childList: true, subtree: true, attributes: false, characterData: true};

  observer.observe(target, config);

})();
