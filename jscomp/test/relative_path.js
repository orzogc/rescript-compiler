'use strict';

let FileJs = require("./File.js");

let foo = FileJs.foo;

function foo2(prim) {
  return FileJs.foo2(prim);
}

let bar = foo;

exports.foo = foo;
exports.foo2 = foo2;
exports.bar = bar;
/* foo Not a pure module */
