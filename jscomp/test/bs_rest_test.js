'use strict';


function x(v){return [v]}
;

x("3");

let v = x(3);

function xxx(prim) {
  return x(prim);
}

let u = x(3);

let xx = x("3");

exports.v = v;
exports.xxx = xxx;
exports.u = u;
exports.xx = xx;
/*  Not a pure module */
