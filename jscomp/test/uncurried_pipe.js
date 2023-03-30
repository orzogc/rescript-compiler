'use strict';


function add(x, y) {
  return x + y | 0;
}

function addC(x, y) {
  return x + y | 0;
}

let v7 = 7;

let v17 = 17;

let v27 = 27;

let v37 = 37;

function unary(x) {
  return x + 1 | 0;
}

let StandardNotation = {
  add: add,
  addC: addC,
  v7: v7,
  v17: v17,
  v27: v27,
  v37: v37,
  unary: unary
};

let v7$1 = 7;

let v17$1 = 17;

let v27$1 = 27;

let v37$1 = 37;

let v100 = 100;

exports.StandardNotation = StandardNotation;
exports.v7 = v7$1;
exports.v17 = v17$1;
exports.v27 = v27$1;
exports.v37 = v37$1;
exports.v100 = v100;
/* No side effect */
