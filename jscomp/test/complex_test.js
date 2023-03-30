'use strict';

let Mt = require("./mt.js");
let Complex = require("../../lib/js/complex.js");

let suites_0 = [
  "basic_add",
  (function (param) {
      return {
              TAG: "Eq",
              _0: {
                re: 2,
                im: 2
              },
              _1: Complex.add(Complex.add(Complex.add(Complex.one, Complex.one), Complex.i), Complex.i)
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Complex_test", suites);

exports.suites = suites;
/*  Not a pure module */
