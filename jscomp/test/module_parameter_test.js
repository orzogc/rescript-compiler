'use strict';

let Mt = require("./mt.js");
let $$String = require("../../lib/js/string.js");

function u(v) {
  return v;
}

let s = $$String;

let N = {
  s: s
};

function v(x) {
  return x.length;
}

let suites_0 = [
  "const",
  (function (param) {
      return {
              TAG: "Eq",
              _0: 1,
              _1: 1
            };
    })
];

let suites_1 = {
  hd: [
    "other",
    (function (param) {
        return {
                TAG: "Eq",
                _0: 3,
                _1: 3
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Module_parameter_test", suites);

let v0 = 1;

exports.u = u;
exports.N = N;
exports.v0 = v0;
exports.v = v;
exports.suites = suites;
/*  Not a pure module */
