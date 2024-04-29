// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Mt = require("./mt.js");
var Belt_Float = require("../../lib/js/belt_Float.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function b(loc, x) {
  Mt.bool_suites(test_id, suites, loc, x);
}

function $$throw(loc, x) {
  Mt.throw_suites(test_id, suites, loc, x);
}

function neq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
        return {
          TAG: "Neq",
          _0: x,
          _1: y
        };
      })
    ],
    tl: suites.contents
  };
}

eq("File \"bs_float_test.res\", line 18, characters 5-12", 1, 1.0);

eq("File \"bs_float_test.res\", line 19, characters 5-12", -1, -1.0);

eq("File \"bs_float_test.res\", line 23, characters 5-12", 1, 1);

eq("File \"bs_float_test.res\", line 24, characters 5-12", 1, 1);

eq("File \"bs_float_test.res\", line 25, characters 5-12", 1, 1);

eq("File \"bs_float_test.res\", line 26, characters 5-12", -1, -1);

eq("File \"bs_float_test.res\", line 27, characters 5-12", -1, -1);

eq("File \"bs_float_test.res\", line 28, characters 5-12", -1, -1);

eq("File \"bs_float_test.res\", line 32, characters 5-12", Belt_Float.fromString("1"), 1.0);

eq("File \"bs_float_test.res\", line 33, characters 5-12", Belt_Float.fromString("-1"), -1.0);

eq("File \"bs_float_test.res\", line 34, characters 5-12", Belt_Float.fromString("1.7"), 1.7);

eq("File \"bs_float_test.res\", line 35, characters 5-12", Belt_Float.fromString("-1.0"), -1.0);

eq("File \"bs_float_test.res\", line 36, characters 5-12", Belt_Float.fromString("-1.5"), -1.5);

eq("File \"bs_float_test.res\", line 37, characters 5-12", Belt_Float.fromString("-1.7"), -1.7);

eq("File \"bs_float_test.res\", line 38, characters 5-12", Belt_Float.fromString("not a float"), undefined);

eq("File \"bs_float_test.res\", line 42, characters 5-12", String(1.0), "1");

eq("File \"bs_float_test.res\", line 43, characters 5-12", String(-1.0), "-1");

eq("File \"bs_float_test.res\", line 44, characters 5-12", String(-1.5), "-1.5");

eq("File \"bs_float_test.res\", line 49, characters 5-12", 2.0 + 3.0, 5.0);

eq("File \"bs_float_test.res\", line 50, characters 5-12", 2.0 - 3.0, -1.0);

eq("File \"bs_float_test.res\", line 51, characters 5-12", 2.0 * 3.0, 6.0);

eq("File \"bs_float_test.res\", line 52, characters 5-12", 3.0 / 2.0, 1.5);

Mt.from_pair_suites("File \"bs_float_test.res\", line 55, characters 20-27", suites.contents);

var F;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.b = b;
exports.$$throw = $$throw;
exports.neq = neq;
exports.F = F;
/*  Not a pure module */
