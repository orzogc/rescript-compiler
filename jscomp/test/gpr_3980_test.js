'use strict';

let Js_math = require("../../lib/js/js_math.js");

let match = 1;

if (match !== undefined) {
  if (match !== 1) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "gpr_3980_test.ml",
            16,
            10
          ],
          Error: new Error()
        };
  }
  let match$1 = 1;
  if (match$1 !== 1) {
    if (match$1 !== 2) {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "gpr_3980_test.ml",
              14,
              12
            ],
            Error: new Error()
          };
    }
    Js_math.floor(1);
  }
  
} else {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "gpr_3980_test.ml",
          16,
          10
        ],
        Error: new Error()
      };
}

/*  Not a pure module */
