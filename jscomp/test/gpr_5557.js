'use strict';


function isA(c) {
  if (c === 97) {
    return true;
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "gpr_5557.res",
          5,
          2
        ],
        Error: new Error()
      };
}

let h = /* 'a' */97;

exports.isA = isA;
exports.h = h;
/* No side effect */
