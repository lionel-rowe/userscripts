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

while (i < 100 && limitLoop()) {
  console.log(i);
  // forgot to increment `i` - throws error due to infinite loop
}

*/

(function() {
  'use strict';

  const globalLoopLimiter = Symbol('globalLoopLimiter');

  window[globalLoopLimiter] = 0;

  window.limitLoop = (maxIterations = 1000) => {
    if (++window[globalLoopLimiter] > maxIterations) {
      window[globalLoopLimiter] = 0;
      throw new RangeError(`Max iteration ${maxIterations} reached — possible infinite loop detected`);
    } else {
      return true;
    }
  }

})();