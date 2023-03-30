'use strict';

let Curry = require("../../lib/js/curry.js");
let Belt_List = require("../../lib/js/belt_List.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

function raise(e) {
  throw e;
}

let map = Belt_List.mapU;

let List = {
  map: map
};

let Uncurried = {
  raise: raise,
  List: List
};

let E = /* @__PURE__ */Caml_exceptions.create("Uncurried_cast.E");

function testRaise(param) {
  throw {
        RE_EXN_ID: E,
        Error: new Error()
      };
}

let l = Belt_List.mapU({
      hd: 1,
      tl: {
        hd: 2,
        tl: /* [] */0
      }
    }, (function (x) {
        return x + 1 | 0;
      }));

let partial_arg = {
  hd: 1,
  tl: {
    hd: 2,
    tl: /* [] */0
  }
};

function partial(param) {
  return map(partial_arg, param);
}

let ll = partial(function (x) {
      return x + 1 | 0;
    });

function withOpts(xOpt, y, zOpt, w) {
  let x = xOpt !== undefined ? xOpt : 3;
  let z = zOpt !== undefined ? zOpt : 4;
  return ((x + y | 0) + z | 0) + w | 0;
}

function still2Args(param, param$1) {
  return withOpts(undefined, 4, param, param$1);
}

let anInt = Curry._1(still2Args, 3)(5);

let StandardNotation = {
  testRaise: testRaise,
  l: l,
  partial: partial,
  ll: ll,
  withOpts: withOpts,
  still2Args: still2Args,
  anInt: anInt
};

function testRaise$1(param) {
  throw {
        RE_EXN_ID: E,
        Error: new Error()
      };
}

let l$1 = Belt_List.mapU({
      hd: 1,
      tl: {
        hd: 2,
        tl: /* [] */0
      }
    }, (function (x) {
        return x + 1 | 0;
      }));

let partial_arg$1 = {
  hd: 1,
  tl: {
    hd: 2,
    tl: /* [] */0
  }
};

function partial$1(param) {
  return map(partial_arg$1, param);
}

let ll$1 = partial$1(function (x) {
      return x + 1 | 0;
    });

function withOpts$1(xOpt, y, zOpt, w) {
  let x = xOpt !== undefined ? xOpt : 3;
  let z = zOpt !== undefined ? zOpt : 4;
  return ((x + y | 0) + z | 0) + w | 0;
}

function still2Args$1(param, param$1) {
  return withOpts$1(undefined, 4, param, param$1);
}

let partial_arg$2 = 3;

let anInt$1 = (function (param) {
      return still2Args$1(partial_arg$2, param);
    })(5);

exports.Uncurried = Uncurried;
exports.E = E;
exports.StandardNotation = StandardNotation;
exports.testRaise = testRaise$1;
exports.l = l$1;
exports.partial = partial$1;
exports.ll = ll$1;
exports.withOpts = withOpts$1;
exports.still2Args = still2Args$1;
exports.anInt = anInt$1;
/* l Not a pure module */
