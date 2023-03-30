'use strict';


function ff(x) {
  let a;
  switch (x) {
    case "0" :
    case "1" :
    case "2" :
        a = 3;
        break;
    case "3" :
        a = 4;
        break;
    case "4" :
        a = 6;
        break;
    case "7" :
        a = 7;
        break;
    default:
      a = 8;
  }
  return a + 3 | 0;
}

function f(x) {
  let y;
  y = x.TAG === "A" ? 3 : 4;
  return y + 32 | 0;
}

function f2(x) {
  let v = 0;
  let y;
  v = 1;
  if (x.TAG === "A") {
    let z = 33;
    y = z + 3 | 0;
  } else {
    let z$1 = 33;
    y = z$1 + 4 | 0;
  }
  return y + 32 | 0;
}

function f3(x) {
  let v = 0;
  let y;
  v = 1;
  y = x.TAG === "A" ? 3 : 4;
  return y + 32 | 0;
}

exports.ff = ff;
exports.f = f;
exports.f2 = f2;
exports.f3 = f3;
/* No side effect */
