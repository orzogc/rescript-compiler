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

let x = ({
    x: 3,
    y: 4
  }).x;

let zz = ({
    "5": 3
  })[5];

let h = {
  "0123": 2,
  "123_456": 3
};

function f(id) {
  while(false) {
    
  };
  return id;
}

eq("File \"gpr_1946_test.ml\", line 29, characters 6-13", ({
        "5": 3
      })[5], 3);

eq("File \"gpr_1946_test.ml\", line 30, characters 6-13", [
      2,
      3
    ], [
      f(h)["0123"],
      f(h)["123_456"]
    ]);

console.log(({
          "5": 3
        }).TAG);

Mt.from_pair_suites("File \"gpr_1946_test.ml\", line 33, characters 23-30", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.x = x;
exports.zz = zz;
exports.h = h;
exports.f = f;
/* x Not a pure module */
