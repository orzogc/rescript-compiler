'use strict';

let Mt = require("./mt.js");
let $$Array = require("../../lib/js/array.js");
let Curry = require("../../lib/js/curry.js");
let Caml_array = require("../../lib/js/caml_array.js");

function test(param) {
  let v = {
    contents: 0
  };
  let f = function (_n, _acc) {
    while(true) {
      let acc = _acc;
      let n = _n;
      if (n === 0) {
        return Curry._1(acc, undefined);
      }
      _acc = (function(n,acc){
      return function (param) {
        v.contents = v.contents + n | 0;
        return Curry._1(acc, undefined);
      }
      }(n,acc));
      _n = n - 1 | 0;
      continue ;
    };
  };
  f(10, (function (param) {
          
        }));
  return v.contents;
}

function test_closure(param) {
  let v = {
    contents: 0
  };
  let arr = Caml_array.make(6, (function (x) {
          return x;
        }));
  for(let i = 0; i <= 5; ++i){
    Caml_array.set(arr, i, (function(i){
        return function (param) {
          return i;
        }
        }(i)));
  }
  $$Array.iter((function (i) {
          v.contents = v.contents + Curry._1(i, 0) | 0;
        }), arr);
  return v.contents;
}

function test_closure2(param) {
  let v = {
    contents: 0
  };
  let arr = Caml_array.make(6, (function (x) {
          return x;
        }));
  for(let i = 0; i <= 5; ++i){
    let j = i + i | 0;
    Caml_array.set(arr, i, (function(j){
        return function (param) {
          return j;
        }
        }(j)));
  }
  $$Array.iter((function (i) {
          v.contents = v.contents + Curry._1(i, 0) | 0;
        }), arr);
  return v.contents;
}

Mt.from_pair_suites("Cps_test", {
      hd: [
        "cps_test_sum",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: 55,
                    _1: test(undefined)
                  };
          })
      ],
      tl: {
        hd: [
          "cps_test_closure",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: 15,
                      _1: test_closure(undefined)
                    };
            })
        ],
        tl: {
          hd: [
            "cps_test_closure2",
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: 30,
                        _1: test_closure2(undefined)
                      };
              })
          ],
          tl: /* [] */0
        }
      }
    });

exports.test = test;
exports.test_closure = test_closure;
exports.test_closure2 = test_closure2;
/*  Not a pure module */
