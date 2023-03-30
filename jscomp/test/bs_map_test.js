'use strict';

let Mt = require("./mt.js");
let Belt_Array = require("../../lib/js/belt_Array.js");
let Belt_MapInt = require("../../lib/js/belt_MapInt.js");
let Belt_SetInt = require("../../lib/js/belt_SetInt.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

function b(loc, v) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Ok",
                  _0: v
                };
        })
    ],
    tl: suites.contents
  };
}

let mapOfArray = Belt_MapInt.fromArray;

let setOfArray = Belt_SetInt.fromArray;

function emptyMap(param) {
  
}

let v = Belt_Array.makeByAndShuffle(1000000, (function (i) {
        return [
                i,
                i
              ];
      }));

let u = Belt_MapInt.fromArray(v);

Belt_MapInt.checkInvariantInternal(u);

let firstHalf = Belt_Array.slice(v, 0, 2000);

let xx = Belt_Array.reduce(firstHalf, u, (function (acc, param) {
        return Belt_MapInt.remove(acc, param[0]);
      }));

Belt_MapInt.checkInvariantInternal(u);

Belt_MapInt.checkInvariantInternal(xx);

Mt.from_pair_suites("Bs_map_test", suites.contents);

let M;

let N;

let A;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.b = b;
exports.M = M;
exports.N = N;
exports.A = A;
exports.mapOfArray = mapOfArray;
exports.setOfArray = setOfArray;
exports.emptyMap = emptyMap;
/* v Not a pure module */
