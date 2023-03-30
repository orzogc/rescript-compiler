'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let Caml_float = require("../../lib/js/caml_float.js");
let Caml_int64 = require("../../lib/js/caml_int64.js");
let Pervasives = require("../../lib/js/pervasives.js");

let one_float = [
  1072693248,
  0
];

let int32_pairs = [
  [
    32,
    4.48415508583941463e-44
  ],
  [
    3,
    4.20389539297445121e-45
  ]
];

function from_pairs(pair) {
  return List.concat($$Array.to_list($$Array.mapi((function (i, param) {
                        let f = param[1];
                        let i32 = param[0];
                        return {
                                hd: [
                                  "int32_float_of_bits " + i,
                                  (function (param) {
                                      return {
                                              TAG: "Eq",
                                              _0: Caml_float.int_float_of_bits(i32),
                                              _1: f
                                            };
                                    })
                                ],
                                tl: {
                                  hd: [
                                    "int32_bits_of_float " + i,
                                    (function (param) {
                                        return {
                                                TAG: "Eq",
                                                _0: Caml_float.int_bits_of_float(f),
                                                _1: i32
                                              };
                                      })
                                  ],
                                  tl: /* [] */0
                                }
                              };
                      }), int32_pairs)));
}

let suites = Pervasives.$at({
      hd: [
        "one",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: Caml_int64.bits_of_float(1.0),
                    _1: one_float
                  };
          })
      ],
      tl: {
        hd: [
          "two",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: Caml_int64.float_of_bits(one_float),
                      _1: 1.0
                    };
            })
        ],
        tl: /* [] */0
      }
    }, from_pairs(int32_pairs));

Mt.from_pair_suites("Float_of_bits_test", suites);

exports.one_float = one_float;
exports.int32_pairs = int32_pairs;
exports.from_pairs = from_pairs;
exports.suites = suites;
/* suites Not a pure module */
