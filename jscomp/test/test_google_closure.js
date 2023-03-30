'use strict';

let $$Array = require("../../lib/js/array.js");
let Caml_array = require("../../lib/js/caml_array.js");

function f(a, b, param) {
  return a + b | 0;
}

function f2(a) {
  return function (param) {
    return a + 1 | 0;
  };
}

let a = String(3);

let b = 101;

let arr = $$Array.init(2, (function (param) {
        return 0;
      }));

for(let i = 0; i <= 1; ++i){
  Caml_array.set(arr, i, i + 1 | 0);
}

console.log([
      a,
      b,
      arr
    ]);

let c = arr;

exports.f = f;
exports.f2 = f2;
exports.a = a;
exports.b = b;
exports.c = c;
/* a Not a pure module */
