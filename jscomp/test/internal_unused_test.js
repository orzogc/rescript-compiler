'use strict';

let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

console.log(3);

let A = /* @__PURE__ */Caml_exceptions.create("Internal_unused_test.P1.A");

function f(param) {
  throw {
        RE_EXN_ID: A,
        Error: new Error()
      };
}

let c = 5;

let h1 = 2;

let h2 = h1 + 1 | 0;

let h4 = 2;

let h5 = h4 + 1 | 0;

let b = 5;

let N = {
  b: b
};

console.log(h5);

console.log(h2);

console.log(c);

console.log(3);

function H($star) {
  return {};
}

exports.f = f;
exports.N = N;
exports.H = H;
/*  Not a pure module */
