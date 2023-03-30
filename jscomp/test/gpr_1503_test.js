'use strict';

let Mt = require("./mt.js");
let Int64 = require("../../lib/js/int64.js");
let Caml_int64 = require("../../lib/js/caml_int64.js");
let Caml_format = require("../../lib/js/caml_format.js");

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

function id(x) {
  return Caml_format.int64_of_string(Caml_int64.to_string(x));
}

let i = [
  2074848171,
  2880154539
];

let s = Caml_int64.to_string(i);

let i$p = Caml_format.int64_of_string(s);

eq("File \"gpr_1503_test.ml\", line 18, characters 5-12", i, i$p);

eq("File \"gpr_1503_test.ml\", line 21, characters 7-14", Int64.max_int, Caml_format.int64_of_string(Caml_int64.to_string(Int64.max_int)));

eq("File \"gpr_1503_test.ml\", line 22, characters 7-14", Int64.min_int, Caml_format.int64_of_string(Caml_int64.to_string(Int64.min_int)));

Mt.from_pair_suites("Gpr_1503_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.id = id;
/* s Not a pure module */
