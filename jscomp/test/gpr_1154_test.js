'use strict';

let Mt = require("./mt.js");
let Int64 = require("../../lib/js/int64.js");
let Caml_int64 = require("../../lib/js/caml_int64.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
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
  console.log("f");
  return x;
}

function g(x) {
  return Caml_int64.or_(x, (console.log("f"), x));
}

let v = {
  contents: 0
};

function f2(x) {
  v.contents = v.contents + 1 | 0;
  return x;
}

function g2(x) {
  return Caml_int64.or_(x, (v.contents = v.contents + 1 | 0, x));
}

let a = Caml_int64.or_(Int64.one, (v.contents = v.contents + 1 | 0, Int64.one));

eq("File \"gpr_1154_test.ml\", line 27, characters 12-19", v.contents, 1);

Mt.from_pair_suites("Gpr_1154_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.f = f;
exports.g = g;
exports.v = v;
exports.f2 = f2;
exports.g2 = g2;
exports.a = a;
/* a Not a pure module */
