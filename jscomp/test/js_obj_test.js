'use strict';

let Mt = require("./mt.js");

let suites_0 = [
  "empty",
  (function (param) {
      return {
              TAG: "Eq",
              _0: 0,
              _1: Object.keys({}).length
            };
    })
];

let suites_1 = {
  hd: [
    "assign",
    (function (param) {
        return {
                TAG: "Eq",
                _0: {
                  a: 1
                },
                _1: Object.assign({}, {
                      a: 1
                    })
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Js_obj_test", suites);

exports.suites = suites;
/*  Not a pure module */
