'use strict';

let Mt = require("./mt.js");
let Curry = require("../../lib/js/curry.js");

let v = {
  contents: 3
};

function f(h) {
  v.contents = v.contents + 1 | 0;
  let partial_arg = 3;
  return function (param) {
    return Curry._2(h, partial_arg, param);
  };
}

f(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

f(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

let a = v.contents;

let v$1 = {
  contents: 3
};

function f$1(h) {
  v$1.contents = v$1.contents + 1 | 0;
  let partial_arg = 3;
  return function (param) {
    return Curry._2(h, partial_arg, param);
  };
}

f$1(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

f$1(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

let b = v$1.contents;

let v$2 = {
  contents: 3
};

function f$2(h) {
  return Curry._2(h, 2, (v$2.contents = v$2.contents + 1 | 0, 3));
}

f$2(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

f$2(function (prim0, prim1) {
      return prim0 + prim1 | 0;
    });

let c = v$2.contents;

let v$3 = {
  contents: 3
};

function f$3(h, g) {
  v$3.contents = v$3.contents + 1 | 0;
  let partial_arg = 9;
  return function (param) {
    return Curry._2(h, partial_arg, param);
  };
}

f$3((function (prim0, prim1) {
        return prim0 + prim1 | 0;
      }), 3);

f$3((function (prim0, prim1) {
        return prim0 + prim1 | 0;
      }), 3);

let d = v$3.contents;

Mt.from_pair_suites("Pr_regression_test", {
      hd: [
        "partial",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: [
                      5,
                      5,
                      5,
                      5
                    ],
                    _1: [
                      a,
                      b,
                      c,
                      d
                    ]
                  };
          })
      ],
      tl: /* [] */0
    });

exports.a = a;
exports.b = b;
exports.c = c;
exports.d = d;
/*  Not a pure module */
