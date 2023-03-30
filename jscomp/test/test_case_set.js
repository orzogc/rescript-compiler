'use strict';

let Curry = require("../../lib/js/curry.js");

function f(x) {
  x.case = 3;
}

function g(x) {
  return Curry._1(x.item, 3);
}

exports.f = f;
exports.g = g;
/* No side effect */
