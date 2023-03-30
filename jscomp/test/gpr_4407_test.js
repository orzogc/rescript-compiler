'use strict';

let Mt = require("./mt.js");
let Debug_mode_value = require("./debug_mode_value.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let non_debug_u = {
  TAG: "A",
  _0: 1,
  _1: 2
};

eq("File \"gpr_4407_test.ml\", line 10, characters 6-13", Debug_mode_value.u, non_debug_u);

Mt.from_pair_suites("File \"gpr_4407_test.ml\", line 11, characters 23-30", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.non_debug_u = non_debug_u;
/*  Not a pure module */
