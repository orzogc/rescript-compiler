'use strict';

let Mt = require("./mt.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function make(x) {
  return x;
}

function get(x) {
  return x;
}

let x = "foo";

eq("File \"unboxed_attribute_test.ml\", line 18, characters 3-10", x, x);

let x$1 = "foo";

eq("File \"unboxed_attribute_test.ml\", line 26, characters 3-10", x$1, x$1);

let x$2 = "foo";

eq("File \"unboxed_attribute_test.ml\", line 33, characters 3-10", x$2, x$2);

let y = {};

y._0 = y;

Mt.from_pair_suites("unboxed_attribute_test.ml", suites.contents);

let v0 = 3;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.v0 = v0;
exports.make = make;
exports.get = get;
exports.y = y;
/*  Not a pure module */
