'use strict';

let Curry = require("../../lib/js/curry.js");

let v = {
  contents: 0
};

function gen(param) {
  v.contents = v.contents + 1 | 0;
  return v.contents;
}

let h = {
  contents: 0
};

let a = 0;

let c = {
  contents: 0
};

let not_real_escape = a;

function real_escape(f, v) {
  return Curry._1(f, c);
}

let u = h;

exports.u = u;
exports.gen = gen;
exports.not_real_escape = not_real_escape;
exports.real_escape = real_escape;
/* No side effect */
