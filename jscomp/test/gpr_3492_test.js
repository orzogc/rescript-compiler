// Generated by ReScript, PLEASE EDIT WITH CARE
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

function foo(a){return a()}
;

function fn() {
  console.log("hi");
  return 1;
}

eq("File \"gpr_3492_test.res\", line 13, characters 12-19", foo(fn), 1);

Mt.from_pair_suites("gpr_3492_test.res", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.fn = fn;
/*  Not a pure module */
