'use strict';

let Mt = require("./mt.js");
let $$Array = require("../../lib/js/array.js");
let Caml_array = require("../../lib/js/caml_array.js");

function f(param) {
  let f$1 = function (_acc, _n) {
    while(true) {
      let n = _n;
      let acc = _acc;
      if (n <= 0) {
        return acc;
      }
      _n = n - 1 | 0;
      _acc = acc + n | 0;
      continue ;
    };
  };
  let v = Caml_array.make(10, 0);
  for(let i = 0; i <= 9; ++i){
    Caml_array.set(v, i, f$1(0, i));
  }
  return v;
}

let suites_0 = [
  "acc",
  (function (param) {
      return {
              TAG: "Eq",
              _0: f(undefined),
              _1: [
                0,
                1,
                3,
                6,
                10,
                15,
                21,
                28,
                36,
                45
              ]
            };
    })
];

let suites_1 = {
  hd: [
    "array_to_list",
    (function (param) {
        return {
                TAG: "Eq",
                _0: {
                  hd: 1,
                  tl: {
                    hd: 2,
                    tl: {
                      hd: 3,
                      tl: /* [] */0
                    }
                  }
                },
                _1: $$Array.to_list([
                      1,
                      2,
                      3
                    ])
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Tailcall_inline_test", suites);

exports.f = f;
exports.suites = suites;
/*  Not a pure module */
