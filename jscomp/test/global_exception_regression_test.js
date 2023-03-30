'use strict';

let Mt = require("./mt.js");

let v = {
  RE_EXN_ID: "Not_found"
};

let u = {
  RE_EXN_ID: "Not_found"
};

let s = {
  RE_EXN_ID: "End_of_file"
};

let suites_0 = [
  "not_found_equal",
  (function (param) {
      return {
              TAG: "Eq",
              _0: u,
              _1: v
            };
    })
];

let suites_1 = {
  hd: [
    "not_found_not_equal_end_of_file",
    (function (param) {
        return {
                TAG: "Neq",
                _0: u,
                _1: s
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Global_exception_regression_test", suites);

exports.v = v;
exports.u = u;
exports.s = s;
exports.suites = suites;
/*  Not a pure module */
