'use strict';


function f(x) {
  return x;
}

function ff(x) {
  return x;
}

function fff(x) {
  let x$1 = {
    TAG: "A",
    _0: x
  };
  switch (x$1.TAG) {
    case "A" :
        return x;
    case "B" :
        return 1;
    case "C" :
        return 2;
    
  }
}

function h(x) {
  if (x === "B") {
    return 1;
  } else if (x === "C") {
    return 2;
  } else {
    return 0;
  }
}

function hh(param) {
  return 3;
}

let g = h("A");

exports.f = f;
exports.ff = ff;
exports.fff = fff;
exports.h = h;
exports.hh = hh;
exports.g = g;
/* g Not a pure module */
