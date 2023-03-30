'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let Belt_Id = require("../../lib/js/belt_Id.js");
let Belt_Map = require("../../lib/js/belt_Map.js");
let Belt_Set = require("../../lib/js/belt_Set.js");
let Belt_Array = require("../../lib/js/belt_Array.js");
let Caml_option = require("../../lib/js/caml_option.js");
let Belt_MapDict = require("../../lib/js/belt_MapDict.js");
let Array_data_util = require("./array_data_util.js");

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

function mapOfArray(x) {
  return Belt_Map.fromArray(x, Icmp);
}

function setOfArray(x) {
  return Belt_Set.fromArray(x, Icmp);
}

function emptyMap(param) {
  return {
          cmp: Icmp.cmp,
          data: undefined
        };
}

function mergeInter(s1, s2) {
  let m = Belt_Map.merge(s1, s2, (function (k, v1, v2) {
          if (v1 !== undefined && v2 !== undefined) {
            return Caml_option.some(undefined);
          }
          
        }));
  return Belt_Set.fromArray(Belt_MapDict.keysToArray(m.data), Icmp);
}

function mergeUnion(s1, s2) {
  let m = Belt_Map.merge(s1, s2, (function (k, v1, v2) {
          if (v1 !== undefined || v2 !== undefined) {
            return Caml_option.some(undefined);
          }
          
        }));
  return Belt_Set.fromArray(Belt_MapDict.keysToArray(m.data), Icmp);
}

function mergeDiff(s1, s2) {
  let m = Belt_Map.merge(s1, s2, (function (k, v1, v2) {
          if (v1 !== undefined && v2 === undefined) {
            return Caml_option.some(undefined);
          }
          
        }));
  return Belt_Set.fromArray(Belt_MapDict.keysToArray(m.data), Icmp);
}

function randomRange(i, j) {
  return Belt_Array.map(Array_data_util.randomRange(i, j), (function (x) {
                return [
                        x,
                        x
                      ];
              }));
}

let u0 = Belt_Map.fromArray(randomRange(0, 100), Icmp);

let u1 = Belt_Map.fromArray(randomRange(30, 120), Icmp);

b("File \"bs_poly_map_test.ml\", line 48, characters 4-11", Belt_Set.eq(mergeInter(u0, u1), Belt_Set.fromArray(Array_data_util.range(30, 100), Icmp)));

b("File \"bs_poly_map_test.ml\", line 49, characters 4-11", Belt_Set.eq(mergeUnion(u0, u1), Belt_Set.fromArray(Array_data_util.range(0, 120), Icmp)));

b("File \"bs_poly_map_test.ml\", line 50, characters 4-11", Belt_Set.eq(mergeDiff(u0, u1), Belt_Set.fromArray(Array_data_util.range(0, 29), Icmp)));

b("File \"bs_poly_map_test.ml\", line 51, characters 4-11", Belt_Set.eq(mergeDiff(u1, u0), Belt_Set.fromArray(Array_data_util.range(101, 120), Icmp)));

let a0 = Belt_Map.fromArray(randomRange(0, 10), Icmp);

let a1 = Belt_Map.set(a0, 3, 33);

let a2 = Belt_Map.remove(a1, 3);

let a3 = Belt_Map.update(a2, 3, (function (k) {
        if (k !== undefined) {
          return k + 1 | 0;
        } else {
          return 11;
        }
      }));

let a4 = Belt_Map.update(a2, 3, (function (k) {
        if (k !== undefined) {
          return k + 1 | 0;
        }
        
      }));

let a5 = Belt_Map.remove(a0, 3);

let a6 = Belt_Map.remove(a5, 3);

b("File \"bs_poly_map_test.ml\", line 70, characters 4-11", a5 === a6);

b("File \"bs_poly_map_test.ml\", line 71, characters 4-11", Belt_Map.has(a0, 3));

b("File \"bs_poly_map_test.ml\", line 72, characters 4-11", !Belt_Map.has(a5, 3));

b("File \"bs_poly_map_test.ml\", line 73, characters 4-11", 3 === Belt_Map.getUndefined(a0, 3));

b("File \"bs_poly_map_test.ml\", line 74, characters 4-11", 33 === Belt_Map.getUndefined(a1, 3));

b("File \"bs_poly_map_test.ml\", line 75, characters 4-11", Belt_Map.getUndefined(a2, 3) === undefined);

b("File \"bs_poly_map_test.ml\", line 77, characters 4-11", 11 === Belt_Map.getUndefined(a3, 3));

b("File \"bs_poly_map_test.ml\", line 78, characters 4-11", Belt_Map.getUndefined(a4, 3) === undefined);

let a7 = Belt_Map.removeMany(a0, [
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

eq("File \"bs_poly_map_test.ml\", line 81, characters 5-12", Belt_MapDict.keysToArray(a7.data), [
      9,
      10
    ]);

let a8 = Belt_Map.removeMany(a7, Array_data_util.randomRange(0, 100));

b("File \"bs_poly_map_test.ml\", line 83, characters 4-11", Belt_MapDict.isEmpty(a8.data));

let u0$1 = Belt_Map.fromArray(randomRange(0, 100), Icmp);

let u1$1 = Belt_Map.set(u0$1, 3, 32);

eq("File \"bs_poly_map_test.ml\", line 90, characters 5-12", Belt_Map.get(u1$1, 3), 32);

eq("File \"bs_poly_map_test.ml\", line 91, characters 5-12", Belt_Map.get(u0$1, 3), 3);

function acc(m, is) {
  return Belt_Array.reduce(is, m, (function (a, i) {
                return Belt_Map.update(a, i, (function (n) {
                              if (n !== undefined) {
                                return n + 1 | 0;
                              } else {
                                return 1;
                              }
                            }));
              }));
}

let m_cmp = Icmp.cmp;

let m = {
  cmp: m_cmp,
  data: undefined
};

let m1 = acc(m, Belt_Array.concat(Array_data_util.randomRange(0, 20), Array_data_util.randomRange(10, 30)));

b("File \"bs_poly_map_test.ml\", line 103, characters 4-11", Belt_Map.eq(m1, Belt_Map.fromArray(Belt_Array.makeBy(31, (function (i) {
                    return [
                            i,
                            i >= 10 && i <= 20 ? 2 : 1
                          ];
                  })), Icmp), (function (x, y) {
            return x === y;
          })));

let v0_cmp = Icmp.cmp;

let v0 = {
  cmp: v0_cmp,
  data: undefined
};

let v1 = Belt_Map.mergeMany(v0, Belt_Array.map(Array_data_util.randomRange(0, 10000), (function (x) {
            return [
                    x,
                    x
                  ];
          })));

let v2 = Belt_Map.fromArray(Belt_Array.map(Array_data_util.randomRange(0, 10000), (function (x) {
            return [
                    x,
                    x
                  ];
          })), Icmp);

b("File \"bs_poly_map_test.ml\", line 117, characters 4-11", Belt_Map.eq(v1, v2, (function (x, y) {
            return x === y;
          })));

function inc(x) {
  if (x !== undefined) {
    return x + 1 | 0;
  } else {
    return 0;
  }
}

let v3 = Belt_Map.update(v1, 10, inc);

let v4 = Belt_Map.update(v3, -10, inc);

let match = Belt_Map.split(v3, 5000);

let pres = match[1];

let match$1 = match[0];

let match$2 = Belt_Map.get(v3, 10);

b("File \"bs_poly_map_test.ml\", line 126, characters 4-11", match$2 !== undefined ? match$2 === 11 : false);

let match$3 = Belt_Map.get(v3, -10);

b("File \"bs_poly_map_test.ml\", line 127, characters 4-11", match$3 === undefined);

let match$4 = Belt_Map.get(v4, -10);

b("File \"bs_poly_map_test.ml\", line 128, characters 4-11", match$4 !== undefined ? match$4 === 0 : false);

let map = Belt_Map.remove({
      cmp: Icmp.cmp,
      data: undefined
    }, 0);

b("File \"bs_poly_map_test.ml\", line 129, characters 4-11", Belt_MapDict.isEmpty(map.data));

let map$1 = Belt_Map.removeMany({
      cmp: Icmp.cmp,
      data: undefined
    }, [0]);

b("File \"bs_poly_map_test.ml\", line 130, characters 4-11", Belt_MapDict.isEmpty(map$1.data));

b("File \"bs_poly_map_test.ml\", line 131, characters 4-11", pres !== undefined ? pres === 5000 : false);

b("File \"bs_poly_map_test.ml\", line 132, characters 4-11", Belt_Array.eq(Belt_MapDict.keysToArray(match$1[0].data), Belt_Array.makeBy(5000, (function (i) {
                return i;
              })), (function (prim0, prim1) {
            return prim0 === prim1;
          })));

b("File \"bs_poly_map_test.ml\", line 133, characters 4-11", Belt_Array.eq(Belt_MapDict.keysToArray(match$1[1].data), Belt_Array.makeBy(5000, (function (i) {
                return 5001 + i | 0;
              })), (function (prim0, prim1) {
            return prim0 === prim1;
          })));

let v7 = Belt_Map.remove(v3, 5000);

let match$5 = Belt_Map.split(v7, 5000);

let match$6 = match$5[0];

b("File \"bs_poly_map_test.ml\", line 137, characters 4-11", match$5[1] === undefined);

b("File \"bs_poly_map_test.ml\", line 138, characters 4-11", Belt_Array.eq(Belt_MapDict.keysToArray(match$6[0].data), Belt_Array.makeBy(5000, (function (i) {
                return i;
              })), (function (prim0, prim1) {
            return prim0 === prim1;
          })));

b("File \"bs_poly_map_test.ml\", line 139, characters 4-11", Belt_Array.eq(Belt_MapDict.keysToArray(match$6[1].data), Belt_Array.makeBy(5000, (function (i) {
                return 5001 + i | 0;
              })), (function (prim0, prim1) {
            return prim0 === prim1;
          })));

Mt.from_pair_suites("Bs_poly_map_test", suites.contents);

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
exports.mapOfArray = mapOfArray;
exports.setOfArray = setOfArray;
exports.emptyMap = emptyMap;
exports.mergeInter = mergeInter;
exports.mergeUnion = mergeUnion;
exports.mergeDiff = mergeDiff;
exports.randomRange = randomRange;
exports.acc = acc;
/* Icmp Not a pure module */
