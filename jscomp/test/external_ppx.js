'use strict';

let External_ppxGen = require("./external_ppx.gen");

let u = {
  hi: 2,
  lo: 3,
  lo2: {hi:-3 },
  lo3: -1,
  lo4: -3
};

function f(prim) {
  return External_ppxGen.f(prim);
}

exports.u = u;
exports.f = f;
/* ./external_ppx.gen Not a pure module */
