'use strict';


let v = 0;

v = v + 1 | 0;

console.log(String(v));

function unuse_v(param) {
  return 35;
}

let h = unuse_v;

exports.h = h;
/*  Not a pure module */
