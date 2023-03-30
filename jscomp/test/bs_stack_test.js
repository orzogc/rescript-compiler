'use strict';

let Mt = require("./mt.js");
let Caml_option = require("../../lib/js/caml_option.js");
let Js_undefined = require("../../lib/js/js_undefined.js");
let Belt_MutableQueue = require("../../lib/js/belt_MutableQueue.js");
let Belt_MutableStack = require("../../lib/js/belt_MutableStack.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function inOrder(v) {
  let current = v;
  let s = {
    root: undefined
  };
  let q = {
    length: 0,
    first: undefined,
    last: undefined
  };
  while(current !== undefined) {
    let v$1 = current;
    Belt_MutableStack.push(s, v$1);
    current = v$1.left;
  };
  while(s.root !== undefined) {
    current = Belt_MutableStack.popUndefined(s);
    let v$2 = current;
    Belt_MutableQueue.add(q, v$2.value);
    current = v$2.right;
    while(current !== undefined) {
      let v$3 = current;
      Belt_MutableStack.push(s, v$3);
      current = v$3.left;
    };
  };
  return Belt_MutableQueue.toArray(q);
}

function inOrder3(v) {
  let current = v;
  let s = {
    root: undefined
  };
  let q = {
    length: 0,
    first: undefined,
    last: undefined
  };
  while(current !== undefined) {
    let v$1 = current;
    Belt_MutableStack.push(s, v$1);
    current = v$1.left;
  };
  Belt_MutableStack.dynamicPopIter(s, (function (popped) {
          Belt_MutableQueue.add(q, popped.value);
          let current = popped.right;
          while(current !== undefined) {
            let v = current;
            Belt_MutableStack.push(s, v);
            current = v.left;
          };
        }));
  return Belt_MutableQueue.toArray(q);
}

function inOrder2(v) {
  let todo = true;
  let cursor = v;
  let s = {
    root: undefined
  };
  let q = {
    length: 0,
    first: undefined,
    last: undefined
  };
  while(todo) {
    if (cursor !== undefined) {
      let v$1 = cursor;
      Belt_MutableStack.push(s, v$1);
      cursor = v$1.left;
    } else if (s.root !== undefined) {
      cursor = Belt_MutableStack.popUndefined(s);
      let current = cursor;
      Belt_MutableQueue.add(q, current.value);
      cursor = current.right;
    } else {
      todo = false;
    }
  };
}

function n(l, r, a) {
  return {
          value: a,
          left: Js_undefined.fromOption(l),
          right: Js_undefined.fromOption(r)
        };
}

let test1 = n(Caml_option.some(n(Caml_option.some(n(undefined, undefined, 4)), Caml_option.some(n(undefined, undefined, 5)), 2)), Caml_option.some(n(undefined, undefined, 3)), 1);

function pushAllLeft(st1, s1) {
  let current = st1;
  while(current !== undefined) {
    let v = current;
    Belt_MutableStack.push(s1, v);
    current = v.left;
  };
}

let test2 = n(Caml_option.some(n(Caml_option.some(n(Caml_option.some(n(Caml_option.some(n(undefined, undefined, 4)), undefined, 2)), undefined, 5)), undefined, 1)), undefined, 3);

let test3 = n(Caml_option.some(n(Caml_option.some(n(Caml_option.some(n(undefined, undefined, 4)), undefined, 2)), undefined, 5)), Caml_option.some(n(undefined, undefined, 3)), 1);

eq("File \"bs_stack_test.ml\", line 137, characters 6-13", inOrder(test1), [
      4,
      2,
      5,
      1,
      3
    ]);

eq("File \"bs_stack_test.ml\", line 140, characters 6-13", inOrder3(test1), [
      4,
      2,
      5,
      1,
      3
    ]);

Mt.from_pair_suites("bs_stack_test.ml", suites.contents);

let S;

let Q;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.S = S;
exports.Q = Q;
exports.inOrder = inOrder;
exports.inOrder3 = inOrder3;
exports.inOrder2 = inOrder2;
exports.n = n;
exports.test1 = test1;
exports.pushAllLeft = pushAllLeft;
exports.test2 = test2;
exports.test3 = test3;
/* test1 Not a pure module */
