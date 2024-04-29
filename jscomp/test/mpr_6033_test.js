// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Mt = require("./mt.js");
var CamlinternalLazy = require("../../lib/js/camlinternalLazy.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
        return {
          TAG: "Eq",
          _0: x,
          _1: y
        };
      })
    ],
    tl: suites.contents
  };
}

function f(x) {
  return CamlinternalLazy.force(x) + "abc";
}

var x = CamlinternalLazy.from_fun(function () {
  return "def";
});

CamlinternalLazy.force(x);

var u = CamlinternalLazy.force(x) + "abc";

eq("File \"mpr_6033_test.res\", line 20, characters 3-10", u, "defabc");

Mt.from_pair_suites("Mpr_6033_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.f = f;
exports.u = u;
/*  Not a pure module */
