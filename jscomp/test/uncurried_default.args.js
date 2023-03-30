'use strict';

let Curry = require("../../lib/js/curry.js");

function withOpt(xOpt, y) {
  let x = xOpt !== undefined ? xOpt : 1;
  return function (zOpt, w) {
    let z = zOpt !== undefined ? zOpt : 1;
    return ((x + y | 0) + z | 0) + w | 0;
  };
}

let testWithOpt = withOpt(undefined, 3)(undefined, 4);

let partial_arg = 10;

let partial = Curry._1((function (param) {
            return withOpt(partial_arg, param);
          })(3), 4)(11);

let total = withOpt(10, 3)(4, 11);

function foo1(xOpt, y) {
  let x = xOpt !== undefined ? xOpt : 3;
  return x + y | 0;
}

let x = 3;

let r1 = x + 11 | 0;

function foo2(y, xOpt, zOpt) {
  let x = xOpt !== undefined ? xOpt : 3;
  let z = zOpt !== undefined ? zOpt : 4;
  return (x + y | 0) + z | 0;
}

let r2 = foo2(11, undefined, undefined);

function foo3(xOpt, yOpt) {
  let x = xOpt !== undefined ? xOpt : 3;
  let y = yOpt !== undefined ? yOpt : 4;
  return x + y | 0;
}

let r3 = foo3(undefined, undefined);

let StandardNotation = {
  withOpt: withOpt,
  testWithOpt: testWithOpt,
  partial: partial,
  total: total,
  foo1: foo1,
  r1: r1,
  foo2: foo2,
  r2: r2,
  foo3: foo3,
  r3: r3
};

function withOpt$1(xOpt, y) {
  let x = xOpt !== undefined ? xOpt : 1;
  return function (zOpt, w) {
    let z = zOpt !== undefined ? zOpt : 1;
    return ((x + y | 0) + z | 0) + w | 0;
  };
}

let testWithOpt$1 = withOpt$1(undefined, 3)(undefined, 4);

let partial_arg$1 = 10;

let partial$1 = Curry._1((function (param) {
            return withOpt$1(partial_arg$1, param);
          })(3), 4)(11);

let total$1 = withOpt$1(10, 3)(4, 11);

function foo1$1(xOpt, y) {
  let x = xOpt !== undefined ? xOpt : 3;
  return x + y | 0;
}

let x$1 = 3;

let r1$1 = x$1 + 11 | 0;

function foo2$1(y, xOpt, zOpt) {
  let x = xOpt !== undefined ? xOpt : 3;
  let z = zOpt !== undefined ? zOpt : 4;
  return (x + y | 0) + z | 0;
}

let r2$1 = foo2$1(11, undefined, undefined);

function foo3$1(xOpt, yOpt) {
  let x = xOpt !== undefined ? xOpt : 3;
  let y = yOpt !== undefined ? yOpt : 4;
  return x + y | 0;
}

let r3$1 = foo3$1(undefined, undefined);

function foo(func) {
  return func(undefined) + 1 | 0;
}

let M = {
  foo: foo
};

exports.StandardNotation = StandardNotation;
exports.withOpt = withOpt$1;
exports.testWithOpt = testWithOpt$1;
exports.partial = partial$1;
exports.total = total$1;
exports.foo1 = foo1$1;
exports.r1 = r1$1;
exports.foo2 = foo2$1;
exports.r2 = r2$1;
exports.foo3 = foo3$1;
exports.r3 = r3$1;
exports.M = M;
/* testWithOpt Not a pure module */
