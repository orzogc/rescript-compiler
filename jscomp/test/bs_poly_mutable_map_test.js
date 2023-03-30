'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let Belt_Id = require("../../lib/js/belt_Id.js");
let Belt_Set = require("../../lib/js/belt_Set.js");
let Belt_Array = require("../../lib/js/belt_Array.js");
let Array_data_util = require("./array_data_util.js");
let Belt_MutableMap = require("../../lib/js/belt_MutableMap.js");
let Belt_internalAVLtree = require("../../lib/js/belt_internalAVLtree.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

function b(loc, v) {
  Mt.bool_suites(test_id, suites, loc, v);
}

let Icmp = Belt_Id.comparable(Caml.int_compare);

function f(x) {
  return Belt_MutableMap.fromArray(x, Icmp);
}

function ff(x) {
  return Belt_Set.fromArray(x, Icmp);
}

function randomRange(i, j) {
  return Belt_Array.map(Array_data_util.randomRange(i, j), (function (x) {
                return [
                        x,
                        x
                      ];
              }));
}

let a0 = Belt_MutableMap.fromArray(randomRange(0, 10), Icmp);

Belt_MutableMap.set(a0, 3, 33);

eq("File \"bs_poly_mutable_map_test.ml\", line 29, characters 5-12", Belt_MutableMap.getExn(a0, 3), 33);

Belt_MutableMap.removeMany(a0, [
      7,
      8,
      0,
      1,
      3,
      2,
      4,
      922,
      4,
      5,
      6
    ]);

eq("File \"bs_poly_mutable_map_test.ml\", line 31, characters 5-12", Belt_internalAVLtree.keysToArray(a0.data), [
      9,
      10
    ]);

Belt_MutableMap.removeMany(a0, Array_data_util.randomRange(0, 100));

b("File \"bs_poly_mutable_map_test.ml\", line 33, characters 4-11", Belt_MutableMap.isEmpty(a0));

let a0$1 = Belt_MutableMap.fromArray(randomRange(0, 10000), Icmp);

Belt_MutableMap.set(a0$1, 2000, 33);

Belt_MutableMap.removeMany(a0$1, Belt_Array.map(randomRange(0, 1998), (function (prim) {
            return prim[0];
          })));

Belt_MutableMap.removeMany(a0$1, Belt_Array.map(randomRange(2002, 11000), (function (prim) {
            return prim[0];
          })));

eq("File \"bs_poly_mutable_map_test.ml\", line 41, characters 6-13", Belt_internalAVLtree.toArray(a0$1.data), [
      [
        1999,
        1999
      ],
      [
        2000,
        33
      ],
      [
        2001,
        2001
      ]
    ]);

Mt.from_pair_suites("Bs_poly_mutable_map_test", suites.contents);

let M;

let N;

let A;

let I;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.b = b;
exports.Icmp = Icmp;
exports.M = M;
exports.N = N;
exports.A = A;
exports.I = I;
exports.f = f;
exports.ff = ff;
exports.randomRange = randomRange;
/* Icmp Not a pure module */
