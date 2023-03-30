'use strict';

let Mt = require("./mt.js");
let Pervasives = require("../../lib/js/pervasives.js");

let v = (Number.EPSILON?Number.EPSILON:2.220446049250313e-16);

let suites_0 = [
  "epsilon",
  (function (param) {
      return {
              TAG: "Eq",
              _0: Pervasives.epsilon_float,
              _1: v
            };
    })
];

let suites_1 = {
  hd: [
    "raw_epsilon",
    (function (param) {
        return {
                TAG: "Eq",
                _0: 2.220446049250313e-16,
                _1: v
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Epsilon_test", suites);

exports.v = v;
exports.suites = suites;
/* v Not a pure module */
