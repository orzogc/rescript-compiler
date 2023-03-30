'use strict';


let sum = ((a,b) => a + b);

let v = sum(1, 2);

function f(a) {
  return a + 3 | 0;
}

let b = f(1);

let c = f(2);

let forIn = ((o,foo)=> {
  for (var i in o){
    foo(o)
  }
  });

function log(x) {
  console.log(x);
}

let N = {
  log2: log
};

forIn({
      x: 3
    }, (function (x) {
        console.log(x);
      }));

forIn({
      x: 3,
      y: 3
    }, (function (x) {
        console.log(x);
      }));

let f3 = (()=>true);

let bbbb = f3();

if (!bbbb) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "gpr_2682_test.ml",
          59,
          2
        ],
        Error: new Error()
      };
}

exports.sum = sum;
exports.v = v;
exports.f = f;
exports.b = b;
exports.c = c;
exports.forIn = forIn;
exports.N = N;
exports.f3 = f3;
exports.bbbb = bbbb;
/* v Not a pure module */
