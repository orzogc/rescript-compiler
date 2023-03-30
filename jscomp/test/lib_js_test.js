'use strict';

let Mt = require("./mt.js");

console.log(JSON.stringify({
          hd: 1,
          tl: {
            hd: 2,
            tl: {
              hd: 3,
              tl: /* [] */0
            }
          }
        }));

console.log("hey");

let suites_0 = [
  "anything_to_string",
  (function (param) {
      return {
              TAG: "Eq",
              _0: "3",
              _1: String(3)
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Lib_js_test", suites);

exports.suites = suites;
/*  Not a pure module */
