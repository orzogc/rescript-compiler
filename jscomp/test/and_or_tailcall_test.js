'use strict';

let Mt = require("./mt.js");

function f(b, x, _n) {
  while(true) {
    let n = _n;
    if (n > 100000) {
      return false;
    }
    if (!b) {
      return false;
    }
    _n = n + 1 | 0;
    continue ;
  };
}

function or_f(b, x, _n) {
  while(true) {
    let n = _n;
    if (n > 100000) {
      return false;
    }
    if (b) {
      return true;
    }
    _n = n + 1 | 0;
    continue ;
  };
}

let suites_0 = [
  "and_tail",
  (function (param) {
      return {
              TAG: "Eq",
              _0: false,
              _1: f(true, 1, 0)
            };
    })
];

let suites_1 = {
  hd: [
    "or_tail",
    (function (param) {
        return {
                TAG: "Eq",
                _0: false,
                _1: or_f(false, 1, 0)
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("And_or_tailcall_test", suites);

exports.f = f;
exports.or_f = or_f;
exports.suites = suites;
/*  Not a pure module */
