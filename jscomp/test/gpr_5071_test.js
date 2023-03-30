'use strict';


let Test = {};

let u = {
  s: "hello"
};

function f(s, y) {
  let tmp = {};
  if (s !== undefined) {
    tmp.s = s;
  }
  console.log(tmp);
  console.log(y);
}

function make(s) {
  if (s !== undefined) {
    return s;
  } else {
    return null;
  }
}

let H = {
  make: make
};

exports.Test = Test;
exports.u = u;
exports.f = f;
exports.H = H;
/* No side effect */
