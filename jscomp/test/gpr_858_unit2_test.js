// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Curry = require("../../lib/js/curry.js");

let delayed = {
  contents: (function (param) {
    
  })
};

for(let i = 1; i <= 2; ++i){
  let f = function (n, x) {
    if (x !== 0) {
      let prev = delayed.contents;
      delayed.contents = (function (param) {
        Curry._1(prev, undefined);
        f(((n + 1 | 0) + i | 0) - i | 0, x - 1 | 0);
      });
      return;
    }
    if (i === n) {
      return;
    }
    throw new Error("Assert_failure", {
          cause: {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "gpr_858_unit2_test.res",
              6,
              13
            ]
          }
        });
  };
  f(0, i);
}

Curry._1(delayed.contents, undefined);

/*  Not a pure module */
