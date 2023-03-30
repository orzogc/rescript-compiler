'use strict';

let Curry = require("../../lib/js/curry.js");
let Caml_array = require("../../lib/js/caml_array.js");

function f(_n, _acc) {
  while(true) {
    let acc = _acc;
    let n = _n;
    if (n === 0) {
      return Curry._1(acc, undefined);
    }
    _acc = (function(n,acc){
    return function (param) {
      console.log(String(n));
      return Curry._1(acc, undefined);
    }
    }(n,acc));
    _n = n - 1 | 0;
    continue ;
  };
}

function test_closure(param) {
  let arr = Caml_array.make(6, (function (x) {
          return x;
        }));
  for(let i = 0; i <= 6; ++i){
    Caml_array.set(arr, i, (function(i){
        return function (param) {
          return i;
        }
        }(i)));
  }
  return arr;
}

f(10, (function (param) {
        
      }));

exports.f = f;
exports.test_closure = test_closure;
/*  Not a pure module */
