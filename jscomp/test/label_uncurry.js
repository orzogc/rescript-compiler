'use strict';

let Caml_format = require("../../lib/js/caml_format.js");

function f(x) {
  return x;
}

function u(x, y) {
  return x + Caml_format.int_of_string(y) | 0;
}

function u1(f) {
  console.log(f(2, "x"));
  console.log(f(2, "x"));
}

function h(x) {
  return 3;
}

let a = u1(u);

exports.f = f;
exports.u = u;
exports.u1 = u1;
exports.h = h;
exports.a = a;
/* a Not a pure module */
