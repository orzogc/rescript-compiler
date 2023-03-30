'use strict';

let Curry = require("../../lib/js/curry.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Caml_option = require("../../lib/js/caml_option.js");

function f($$window, a, b) {
  return $$window.location(a, b);
}

let v0 = {
  x: 3,
  z: 2
};

let newrecord = Caml_obj.obj_dup(v0);

newrecord.x = 3;

function testMatch(v) {
  let y = v.y;
  if (y !== undefined) {
    return y;
  } else {
    return 42;
  }
}

function optionMap(x, f) {
  if (x !== undefined) {
    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(x)));
  }
  
}

let ok_name = optionMap(undefined, (function (x) {
        return x;
      }));

let ok = {
  name: ok_name
};

let bad_name = optionMap(undefined, (function (x) {
        return x;
      }));

let bad = {
  name: bad_name
};

function identity(x) {
  return x;
}

let name1 = "ReScript";

let ok1 = {
  name: name1
};

let bad1 = {
  name: name1
};

let v2 = newrecord;

let v1 = {
  x: 3,
  z: 3
};

let h = /* '😊' */128522;

let hey = "hello, 世界";

let name;

exports.f = f;
exports.v0 = v0;
exports.v2 = v2;
exports.v1 = v1;
exports.testMatch = testMatch;
exports.h = h;
exports.hey = hey;
exports.optionMap = optionMap;
exports.name = name;
exports.ok = ok;
exports.bad = bad;
exports.identity = identity;
exports.name1 = name1;
exports.ok1 = ok1;
exports.bad1 = bad1;
/*  Not a pure module */
