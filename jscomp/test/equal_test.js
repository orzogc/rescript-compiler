'use strict';


function str_equal(x, y) {
  return x === y;
}

let str_b = true;

function int_equal(x, y) {
  return x === y;
}

function float_equal(x, y) {
  return x === y;
}

let v = false;

exports.str_equal = str_equal;
exports.str_b = str_b;
exports.int_equal = int_equal;
exports.v = v;
exports.float_equal = float_equal;
/* str_b Not a pure module */
