'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let Curry = require("../../lib/js/curry.js");
let Hashtbl = require("../../lib/js/hashtbl.js");

function f(H) {
  let tbl = Curry._1(H.create, 17);
  Curry._3(H.add, tbl, 1, /* '1' */49);
  Curry._3(H.add, tbl, 2, /* '2' */50);
  return List.sort((function (param, param$1) {
                return Caml.int_compare(param[0], param$1[0]);
              }), Curry._3(H.fold, (function (k, v, acc) {
                    return {
                            hd: [
                              k,
                              v
                            ],
                            tl: acc
                          };
                  }), tbl, /* [] */0));
}

function g(H, count) {
  let tbl = Curry._1(H.create, 17);
  for(let i = 0; i <= count; ++i){
    Curry._3(H.replace, tbl, (i << 1), String(i));
  }
  for(let i$1 = 0; i$1 <= count; ++i$1){
    Curry._3(H.replace, tbl, (i$1 << 1), String(i$1));
  }
  let v = Curry._3(H.fold, (function (k, v, acc) {
          return {
                  hd: [
                    k,
                    v
                  ],
                  tl: acc
                };
        }), tbl, /* [] */0);
  return $$Array.of_list(List.sort((function (param, param$1) {
                    return Caml.int_compare(param[0], param$1[0]);
                  }), v));
}

let hash = Hashtbl.hash;

function equal(x, y) {
  return x === y;
}

let Int_hash = Hashtbl.Make({
      equal: equal,
      hash: hash
    });

let suites_0 = [
  "simple",
  (function (param) {
      return {
              TAG: "Eq",
              _0: {
                hd: [
                  1,
                  /* '1' */49
                ],
                tl: {
                  hd: [
                    2,
                    /* '2' */50
                  ],
                  tl: /* [] */0
                }
              },
              _1: f(Int_hash)
            };
    })
];

let suites_1 = {
  hd: [
    "more_iterations",
    (function (param) {
        return {
                TAG: "Eq",
                _0: $$Array.init(1001, (function (i) {
                        return [
                                (i << 1),
                                String(i)
                              ];
                      })),
                _1: g(Int_hash, 1000)
              };
      })
  ],
  tl: /* [] */0
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Int_hashtbl_test", suites);

exports.f = f;
exports.g = g;
exports.Int_hash = Int_hash;
exports.suites = suites;
/* Int_hash Not a pure module */
