// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Mt from "./mt.mjs";

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let others = [
  0,
  0,
  1,
  1,
  2e3
];

eq("File \"gpr_3549_test.res\", line 13, characters 5-12", 7.0, 7);

eq("File \"gpr_3549_test.res\", line 14, characters 5-12", 2e3, 2000);

eq("File \"gpr_3549_test.res\", line 15, characters 5-12", 0.2, 0.2);

eq("File \"gpr_3549_test.res\", line 16, characters 5-12", 32, 32);

eq("File \"gpr_3549_test.res\", line 17, characters 5-12", others, [
  0.0,
  0.0,
  1.0,
  1.0,
  2e3
]);

Mt.from_pair_suites("Gpr_3549_test", suites.contents);

let u = 32;

let x = 7.0;

let y = 2e3;

let z = 0.2;

export {
  suites,
  test_id,
  eq,
  u,
  x,
  y,
  z,
  others,
}
/*  Not a pure module */
