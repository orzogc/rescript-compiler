'use strict';

let Mt = require("./mt.js");
let Caml_array = require("../../lib/js/caml_array.js");
let Caml_splice_call = require("../../lib/js/caml_splice_call.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let Caml_splice_call$1 = {};

Math.max(1);

function f00(a, b) {
  return a.send(b);
}

let a = [];

a.push(1, 2, 3, 4);

eq("File \"splice_test.ml\", line 29, characters 5-12", a, [
      1,
      2,
      3,
      4
    ]);

function dynamic(arr) {
  let a = [];
  Caml_splice_call.spliceObjApply(a, "push", [
        1,
        arr
      ]);
  eq("File \"splice_test.ml\", line 34, characters 5-12", a, Caml_array.concat({
            hd: [1],
            tl: {
              hd: arr,
              tl: /* [] */0
            }
          }));
}

dynamic([
      2,
      3,
      4
    ]);

dynamic([]);

dynamic([
      1,
      1,
      3
    ]);

let a$1 = new Array(1, 2, 3, 4);

eq("File \"splice_test.ml\", line 49, characters 5-12", a$1, [
      1,
      2,
      3,
      4
    ]);

function dynamicNew(arr) {
  let a = Caml_splice_call.spliceNewApply(Array, [
        1,
        2,
        arr
      ]);
  eq("File \"splice_test.ml\", line 53, characters 5-12", a, Caml_array.concat({
            hd: [
              1,
              2
            ],
            tl: {
              hd: arr,
              tl: /* [] */0
            }
          }));
}

dynamicNew([
      3,
      4
    ]);

dynamicNew([]);

dynamicNew([
      1,
      3
    ]);

class Foo {
  constructor(...names) {
    this.names = names;
  }
}
;

let f = new Foo("a", "b", "c");

eq("File \"splice_test.ml\", line 74, characters 5-12", f.names, [
      "a",
      "b",
      "c"
    ]);

function dynamicFoo(arr) {
  let f = Caml_splice_call.spliceNewApply(Foo, [arr]);
  eq("File \"splice_test.ml\", line 78, characters 5-12", f.names, arr);
}

dynamicFoo([]);

dynamicFoo(["a"]);

dynamicFoo([
      "a",
      "b",
      "c"
    ]);

let a$2 = [];

a$2.push(1, 2, 3, 4);

eq("File \"splice_test.ml\", line 95, characters 7-14", a$2, [
      1,
      2,
      3,
      4
    ]);

function dynamic$1(arr) {
  let a = [];
  Caml_splice_call.spliceObjApply(a, "push", [
        1,
        arr
      ]);
  eq("File \"splice_test.ml\", line 100, characters 7-14", a, Caml_array.concat({
            hd: [1],
            tl: {
              hd: arr,
              tl: /* [] */0
            }
          }));
}

dynamic$1([
      2,
      3,
      4
    ]);

dynamic$1([]);

dynamic$1([
      1,
      1,
      3
    ]);

let Pipe = {
  dynamic: dynamic$1
};

function f1(c) {
  return Caml_splice_call.spliceApply(Math.max, [
              1,
              c
            ]);
}

eq("File \"splice_test.ml\", line 111, characters 6-13", Math.max(1, 2, 3), 3);

eq("File \"splice_test.ml\", line 112, characters 6-13", Math.max(1), 1);

eq("File \"splice_test.ml\", line 113, characters 6-13", Math.max(1, 1, 2, 3, 4, 5, 2, 3), 5);

Mt.from_pair_suites("splice_test.ml", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.Caml_splice_call = Caml_splice_call$1;
exports.f00 = f00;
exports.dynamic = dynamic;
exports.dynamicNew = dynamicNew;
exports.dynamicFoo = dynamicFoo;
exports.Pipe = Pipe;
exports.f1 = f1;
/*  Not a pure module */
