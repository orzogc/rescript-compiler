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

let x = 1;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.x = x;
/* Mt Not a pure module */
