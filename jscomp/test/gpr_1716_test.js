'use strict';

let Mt = require("./mt.js");
let Caml_obj = require("../../lib/js/caml_obj.js");

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

let a = {};

let b = {};

Caml_obj.update_dummy(a, {
      b: b
    });

Caml_obj.update_dummy(b, {
      a: a
    });

function is_inifite(x) {
  return x.b.a === x;
}

eq("File \"gpr_1716_test.ml\", line 26, characters 6-13", true, is_inifite(a));

Mt.from_pair_suites("Gpr_1716_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.a = a;
exports.b = b;
exports.is_inifite = is_inifite;
/*  Not a pure module */
