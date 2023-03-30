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

function nextFor(x) {
  if (x !== undefined) {
    if (x === "Required") {
      return "Optional";
    } else {
      return ;
    }
  } else {
    return "Required";
  }
}

eq("File \"gpr_4519_test.ml\", line 17, characters 6-13", nextFor("Required"), "Optional");

Mt.from_pair_suites("Gpr_4519_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.nextFor = nextFor;
/*  Not a pure module */
