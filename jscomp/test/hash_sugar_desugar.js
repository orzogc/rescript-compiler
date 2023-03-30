'use strict';

let Curry = require("../../lib/js/curry.js");

function h1(u) {
  return u.p;
}

function h3(u) {
  let f = u.hi;
  return Curry._2(f, 1, 2);
}

function g5(u) {
  u.hi = 3;
}

function h5(u) {
  u.hi = 3;
}

function h6(u) {
  return u.p;
}

function h7(u) {
  return u.m(1, 2);
}

function h8(u) {
  let f = u.hi;
  return Curry._2(f, 1, 2);
}

function chain_g(h) {
  return h.x.y.z;
}

exports.h1 = h1;
exports.h3 = h3;
exports.g5 = g5;
exports.h5 = h5;
exports.h6 = h6;
exports.h7 = h7;
exports.h8 = h8;
exports.chain_g = chain_g;
/* No side effect */
