'use strict';


function f(param) {
  console.log("no inline");
  return [
          1,
          2,
          3
        ];
}

let match = f(undefined);

let a = match[0];

let b = match[1];

let c = match[2];

exports.f = f;
exports.a = a;
exports.b = b;
exports.c = c;
/* match Not a pure module */
