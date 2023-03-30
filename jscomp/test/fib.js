'use strict';


function fib(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return fib(n - 1 | 0) + fib(n - 2 | 0) | 0;
  }
}

function fib2(n) {
  let _a = 1;
  let _b = 1;
  let _i = 0;
  while(true) {
    let i = _i;
    let b = _b;
    let a = _a;
    if (n === i) {
      return a;
    }
    _i = i + 1 | 0;
    _b = a + b | 0;
    _a = b;
    continue ;
  };
}

function fib3(n) {
  let a = 1;
  let b = 1;
  for(let i = 1; i <= n; ++i){
    let tmp = a;
    a = b;
    b = b + tmp | 0;
  }
  return a;
}

exports.fib = fib;
exports.fib2 = fib2;
exports.fib3 = fib3;
/* No side effect */
