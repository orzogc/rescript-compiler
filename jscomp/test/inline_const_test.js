'use strict';

let Mt = require("./mt.js");
let Int64 = require("../../lib/js/int64.js");
let Caml_int64 = require("../../lib/js/caml_int64.js");
let Inline_const = require("./inline_const.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let H = {};

let f = "hello";

let f1 = "a";

let f2 = "中文";

let f3 = "中文";

let f4 = "中文";

eq("File \"inline_const_test.res\", line 13, characters 5-12", f, "hello");

eq("File \"inline_const_test.res\", line 14, characters 5-12", f1, "a");

eq("File \"inline_const_test.res\", line 15, characters 5-12", f2, "中文");

eq("File \"inline_const_test.res\", line 16, characters 5-12", f3, "中文");

eq("File \"inline_const_test.res\", line 17, characters 5-12", f4, "中文");

eq("File \"inline_const_test.res\", line 18, characters 5-12", true, true);

eq("File \"inline_const_test.res\", line 19, characters 5-12", 1, 1);

eq("File \"inline_const_test.res\", line 20, characters 5-12", 3e-6, 0.000003);

let h = Caml_int64.add(Caml_int64.add([
          0,
          100
        ], Int64.one), Caml_int64.one);

Mt.from_pair_suites("File \"inline_const_test.res\", line 28, characters 29-36", suites.contents);

let f5 = true;

let f6 = 1;

let f7 = 3e-6;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.H = H;
exports.f = f;
exports.f1 = f1;
exports.f2 = f2;
exports.f3 = f3;
exports.f4 = f4;
exports.f5 = f5;
exports.f6 = f6;
exports.f7 = f7;
exports.h = h;
/*  Not a pure module */
