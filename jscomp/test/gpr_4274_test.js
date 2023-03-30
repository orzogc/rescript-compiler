'use strict';

let Belt_List = require("../../lib/js/belt_List.js");
let Belt_Array = require("../../lib/js/belt_Array.js");

let N = {};

function f(X, xs) {
  X.forEach(xs, {
        i: (function (x) {
            console.log(x.x);
          })
      });
}

Belt_List.forEachU({
      hd: {
        x: 3
      },
      tl: /* [] */0
    }, (function (x) {
        console.log(x.x);
      }));

let Foo = {};

let bar = [{
    foo: "bar"
  }];

Belt_Array.mapU(bar, (function (b) {
        return b.foo;
      }));

exports.N = N;
exports.f = f;
exports.Foo = Foo;
exports.bar = bar;
/*  Not a pure module */
