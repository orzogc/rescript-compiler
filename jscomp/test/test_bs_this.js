'use strict';

let Curry = require("../../lib/js/curry.js");

function uux_this(x, y) {
  let o = this ;
  return (o.length + x | 0) + y | 0;
}

function even(x) {
  let o = this ;
  return x + o | 0;
}

function bark(param) {
  return function (x, y) {
    let o = this ;
    console.log([
          o.length,
          o.x,
          o.y,
          x,
          y
        ]);
    return x + y | 0;
  };
}

let js_obj = {
  bark: (function (x, y) {
      let o = this ;
      console.log(o);
      return x + y | 0;
    })
};

function f(x) {
  x.onload = (function () {
      let o = this ;
      console.log(o);
    });
  return Curry._2(x.addEventListener, "onload", (function () {
                let o = this ;
                console.log(o.response);
              }));
}

function u(x) {
  return x;
}

exports.uux_this = uux_this;
exports.even = even;
exports.bark = bark;
exports.js_obj = js_obj;
exports.f = f;
exports.u = u;
/* uux_this Not a pure module */
