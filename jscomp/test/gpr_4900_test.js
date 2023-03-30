'use strict';

let Mt = require("./mt.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function showToJs(x) {
  if (typeof x !== "object" && x === "No") {
    return false;
  } else {
    return true;
  }
}

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.ml\", line 15, characters 30-37", true, true);

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.ml\", line 16, characters 30-37", false, false);

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.ml\", line 17, characters 30-37", true, true);

Mt.from_pair_suites("File \"gpr_4900_test.ml\", line 19, characters 20-27", suites.contents);

let from_pair_suites = Mt.from_pair_suites;

let eq_suites = Mt.eq_suites;

exports.from_pair_suites = from_pair_suites;
exports.eq_suites = eq_suites;
exports.suites = suites;
exports.test_id = test_id;
exports.showToJs = showToJs;
/*  Not a pure module */
