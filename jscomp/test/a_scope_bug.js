'use strict';


function odd(_z) {
  while(true) {
    let z = _z;
    let even = Math.imul(z, z);
    let a = (even + 4 | 0) + even | 0;
    console.log(String(a));
    _z = 32;
    continue ;
  };
}

let even = odd;

exports.odd = odd;
exports.even = even;
/* No side effect */
