# Userscripts

## Password Viewer

_View passwords_

<details>
  <summary>View Source</summary>
  <pre><code>

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
    &#39;use strict&#39;;

    window.addEventListener(&#39;keydown&#39;, e =&gt; {
        if (e.target.type === &#39;password&#39; &amp;&amp; e.key === &#39;/&#39; &amp;&amp; e.ctrlKey === true) {
          e.target.type = &#39;text&#39;;
            e.target.addEventListener(&#39;keyup&#39;, keyUpListener);
        }
    });

    function keyUpListener(e) {
        e.target.type = &#39;password&#39;;
        e.target.removeEventListener(&#39;keyup&#39;, keyUpListener);
    }

})();
  </code></pre>
</details>


## Marquee Killer

_Kill marquees_

<details>
  <summary>View Source</summary>
  <pre><code>
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
  &#39;use strict&#39;;

  document.querySelectorAll(&#39;marquee&#39;).forEach(el =&gt; {

  const div = document.createElement(&#39;div&#39;);

  div.innerHTML = `&lt;del&gt;Marquee&lt;/del&gt; ${el.innerHTML}`;

  el.parentNode.replaceChild(div, el);

});
})();
  </code></pre>
</details>


## Global Loop Limiter

_Limit loops_

<details>
  <summary>View Source</summary>
  <pre><code>
// ==UserScript==
// @name         Global Loop Limiter
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  Limit loops
// @author       lionel.rowe@gmail.com
// @match        http*://*
// @include http://*
// @include https://*
// @grant        none
// ==/UserScript==

/* Usage:

while (i &lt; 100 &amp;&amp; limitLoop()) {
  console.log(i);
  // forgot to increment `i` - throws error due to infinite loop
}

*/

(function() {
  &#39;use strict&#39;;

  const globalLoopLimiter = Symbol(&#39;globalLoopLimiter&#39;);

  window[globalLoopLimiter] = 0;

  window.limitLoop = (maxIterations = 1000) =&gt; {
    if (++window[globalLoopLimiter] &gt; maxIterations) {
      window[globalLoopLimiter] = 0;
      throw new RangeError(`Max iteration ${maxIterations} reached — possible infinite loop detected`);
    } else {
      return true;
    }
  }

})();
  </code></pre>
</details>


## Discourse Raw Quoter

_Quote raw (markdown) content on Discourse forum._

<details>
  <summary>View Source</summary>
  <pre><code>
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
  &#39;use strict&#39;;
  function quoteRaw(postNumber) {

    if (!postNumber) {
      postNumber = 1;
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

      if (this.readyState === 4 &amp;&amp; this.status === 200) {
        const post = JSON.parse(xhr.responseText)
        .post_stream
        .posts
        .filter(el =&gt; el.post_number === postNumber)[0];

        const reply = `[quote=&quot;${post.username}, post:${post.post_number}, topic:${post.topic_id}&quot;]
${post.raw}
[/quote]`;

        document.querySelector(`#post_${postNumber} .actions .reply`).click();

        setTimeout(function() {
          const replyBox = document.querySelector(&#39;.d-editor-input&#39;);
          replyBox.value = replyBox.value ? `${reply}\n\n${replyBox.value}` : reply;
        }, 50);
      }
    };

    xhr.open(&#39;GET&#39;, `${window.location.href.replace(/(\d+)(\/\d*)?$/, `$1\/${postNumber}`)}.json?include_raw=true`, true);
    xhr.send(null);

  }

  function addRawQuoteButton(el) {
    const rawQuoteButton = document.createElement(&#39;button&#39;);
    rawQuoteButton.innerHTML = `&lt;i class=&quot;fa fa-code d-icon d-icon-reply&quot; aria-hidden=&quot;true&quot;&gt;&lt;/i&gt;
  &lt;span class=&quot;d-button-label&quot;&gt;Raw Quote&lt;/span&gt;`;

    rawQuoteButton.setAttribute(&#39;aria-label&#39;, &#39;quote raw markdown&#39;);
    rawQuoteButton.setAttribute(&#39;title&#39;, &#39;quote raw markdown&#39;);
    rawQuoteButton.classList.add(&#39;widget-button&#39;, &#39;btn-flat&#39;, &#39;create&#39;, &#39;fade-out&#39;, &#39;btn-icon-text&#39;, &#39;raw-quote-button&#39;);

    rawQuoteButton.onclick = () =&gt; quoteRaw(+el.querySelector(&#39;.share&#39;).getAttribute(&#39;data-post-number&#39;));

    el.appendChild(rawQuoteButton);
  }

  document.querySelectorAll(&#39;.actions&#39;).forEach(el =&gt; addRawQuoteButton(el));

  //observe for new posts being added

  const target = document.querySelector(&#39;.ember-view&#39;);
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(el) {
        if (el.nodeType === 1) {
          const actions = el.querySelectorAll(&#39;.actions&#39;);
          if (actions) {
            actions.forEach(function(el) {
              if (!el.querySelector(&#39;.raw-quote-button&#39;)) {
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

  </code></pre>
</details>


## Gutenberg Word Count and Styler

_Add word count to Gutenberg HTML display and improve styling_

<details>
  <summary>View Source</summary>
  <pre><code>
// ==UserScript==
// @name         Gutenberg Word Count and Styler
// @namespace    https://github.com/lionel-rowe/userscripts
// @version      0.1
// @description  Add word count to Gutenberg HTML display and improve styling
// @author       lionel.rowe@gmail.com
// @match        http://www.gutenberg.org/files/*
// @grant        none
// ==/UserScript==

(function() {
  &#39;use strict&#39;;

  document.querySelectorAll(&#39;pre&#39;).forEach(function(el) {
    el.style.fontSize = &#39;1em&#39;;
    el.style.fontFamily = &#39;Georgia, serif&#39;;
    el.style.lineHeight = &#39;1.5em&#39;;
    el.style.fontStyle = &#39;normal&#39;;
  });

  const body = document.querySelector(&#39;body&#39;);

  const wordCount = body.textContent.split(/\s+/).length;

  const wcDiv = document.createElement(&#39;div&#39;);
  wcDiv.style.fontWeight = &#39;bold&#39;;
  wcDiv.textContent = `Approximate word count: ${wordCount}`;

  body.insertBefore(wcDiv, document.querySelector(&#39;pre&#39;));

})();

  </code></pre>
</details>


