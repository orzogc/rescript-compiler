'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let Hashtbl = require("../../lib/js/hashtbl.js");
let MoreLabels = require("../../lib/js/moreLabels.js");

function to_list(tbl) {
  return Hashtbl.fold((function (k, v, acc) {
                return {
                        hd: [
                          k,
                          v
                        ],
                        tl: acc
                      };
              }), tbl, /* [] */0);
}

function f(param) {
  let tbl = Hashtbl.create(undefined, 17);
  Hashtbl.add(tbl, 1, /* '1' */49);
  Hashtbl.add(tbl, 2, /* '2' */50);
  return List.sort((function (param, param$1) {
                return Caml.int_compare(param[0], param$1[0]);
              }), to_list(tbl));
}

function g(count) {
  let tbl = Hashtbl.create(undefined, 17);
  for(let i = 0; i <= count; ++i){
    Hashtbl.replace(tbl, (i << 1), String(i));
  }
  for(let i$1 = 0; i$1 <= count; ++i$1){
    Hashtbl.replace(tbl, (i$1 << 1), String(i$1));
  }
  let v = to_list(tbl);
  return $$Array.of_list(List.sort((function (param, param$1) {
                    return Caml.int_compare(param[0], param$1[0]);
                  }), v));
}

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
              _1: f(undefined)
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
                _1: g(1000)
              };
      })
  ],
  tl: {
    hd: [
      "More_labels_regressionfix_374",
      (function (param) {
          let tbl = MoreLabels.Hashtbl.create(undefined, 30);
          Hashtbl.add(tbl, 3, 3);
          return {
                  TAG: "Eq",
                  _0: tbl.size,
                  _1: 1
                };
        })
    ],
    tl: /* [] */0
  }
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Hashtbl_test", suites);

exports.to_list = to_list;
exports.f = f;
exports.g = g;
exports.suites = suites;
/*  Not a pure module */
