'use strict';


function f(param) {
  let n = 0;
  while((function () {
          let fib = function (n) {
            if (n === 0 || n === 1) {
              return 1;
            } else {
              return fib(n - 1 | 0) + fib(n - 2 | 0) | 0;
            }
          };
          return fib(n) > 10;
        })()) {
    console.log(String(n));
    n = n + 1 | 0;
  };
}

function ff(param) {
  while((function () {
          let b = 9;
          return (3 + b | 0) > 10;
        })()) {
    
  };
}

exports.f = f;
exports.ff = ff;
/* No side effect */
