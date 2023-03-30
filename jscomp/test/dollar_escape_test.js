'use strict';

let Mt = require("./mt.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

function $$(x, y) {
  return x + y | 0;
}

function $$$plus(x, y) {
  return Math.imul(x, y);
}

eq("File \"dollar_escape_test.ml\", line 20, characters 6-13", 3, 3);

eq("File \"dollar_escape_test.ml\", line 21, characters 6-13", 3, 3);

Mt.from_pair_suites("Dollar_escape_test", suites.contents);

let v = 3;

let u = 3;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.$$ = $$;
exports.v = v;
exports.$$$plus = $$$plus;
exports.u = u;
/*  Not a pure module */
