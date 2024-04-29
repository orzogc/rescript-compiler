// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Mt = require("./mt.js");
var Caml = require("../../lib/js/caml.js");
var List = require("../../lib/js/list.js");
var $$Array = require("../../lib/js/array.js");

var list_suites_0 = [
  "length",
  (function (param) {
    return {
      TAG: "Eq",
      _0: 1,
      _1: List.length({
        hd: [
          0,
          1,
          2,
          3,
          4
        ],
        tl: /* [] */0
      })
    };
  })
];

var list_suites_1 = {
  hd: [
    "length2",
    (function (param) {
      return {
        TAG: "Eq",
        _0: 5,
        _1: List.length({
          hd: 0,
          tl: {
            hd: 1,
            tl: {
              hd: 2,
              tl: {
                hd: 3,
                tl: {
                  hd: 4,
                  tl: /* [] */0
                }
              }
            }
          }
        })
      };
    })
  ],
  tl: {
    hd: [
      "long_length",
      (function (param) {
        return {
          TAG: "Eq",
          _0: 30000,
          _1: List.length($$Array.to_list($$Array.init(30000, (function (param) {
            return 0;
          }))))
        };
      })
    ],
    tl: {
      hd: [
        "sort",
        (function (param) {
          return {
            TAG: "Eq",
            _0: List.sort(Caml.int_compare, {
              hd: 4,
              tl: {
                hd: 1,
                tl: {
                  hd: 2,
                  tl: {
                    hd: 3,
                    tl: /* [] */0
                  }
                }
              }
            }),
            _1: {
              hd: 1,
              tl: {
                hd: 2,
                tl: {
                  hd: 3,
                  tl: {
                    hd: 4,
                    tl: /* [] */0
                  }
                }
              }
            }
          };
        })
      ],
      tl: {
        hd: [
          "File \"list_test.res\", line 20, characters 5-12",
          (function (param) {
            return {
              TAG: "Eq",
              _0: true,
              _1: List.mem(3, {
                hd: 1,
                tl: {
                  hd: 2,
                  tl: {
                    hd: 3,
                    tl: /* [] */0
                  }
                }
              })
            };
          })
        ],
        tl: {
          hd: [
            "File \"list_test.res\", line 21, characters 5-12",
            (function (param) {
              return {
                TAG: "Eq",
                _0: false,
                _1: List.mem(4, {
                  hd: 1,
                  tl: {
                    hd: 2,
                    tl: {
                      hd: 3,
                      tl: /* [] */0
                    }
                  }
                })
              };
            })
          ],
          tl: {
            hd: [
              "File \"list_test.res\", line 22, characters 5-12",
              (function (param) {
                return {
                  TAG: "Eq",
                  _0: 9,
                  _1: List.assoc(4, {
                    hd: [
                      1,
                      2
                    ],
                    tl: {
                      hd: [
                        4,
                        9
                      ],
                      tl: /* [] */0
                    }
                  })
                };
              })
            ],
            tl: /* [] */0
          }
        }
      }
    }
  }
};

var list_suites = {
  hd: list_suites_0,
  tl: list_suites_1
};

Mt.from_pair_suites("List_test", list_suites);

exports.list_suites = list_suites;
/*  Not a pure module */
