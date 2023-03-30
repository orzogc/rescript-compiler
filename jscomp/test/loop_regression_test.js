'use strict';

let Mt = require("./mt.js");

function f(param) {
  let v = {
    contents: 0
  };
  let acc = {
    contents: 0
  };
  let n = 10;
  while(true) {
    if (v.contents > n) {
      return acc.contents;
    }
    acc.contents = acc.contents + v.contents | 0;
    v.contents = v.contents + 1 | 0;
    continue ;
  };
}

let suites_0 = [
  "sum",
  (function (param) {
      return {
              TAG: "Eq",
              _0: 55,
              _1: f(undefined)
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Loop_regression_test", suites);

exports.f = f;
exports.suites = suites;
/*  Not a pure module */
