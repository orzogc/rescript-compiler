'use strict';

let Mt = require("./mt.js");
let Js_types = require("../../lib/js/js_types.js");

function string_or_number(x) {
  let ty = Js_types.classify(x);
  if (typeof ty !== "object") {
    switch (ty) {
      case "JSFalse" :
      case "JSTrue" :
          return false;
      default:
        return false;
    }
  } else {
    switch (ty.TAG) {
      case "JSNumber" :
          console.log(ty._0 + 3);
          return true;
      case "JSString" :
          console.log(ty._0 + "hei");
          return true;
      case "JSFunction" :
          console.log("Function");
          return false;
      default:
        return false;
    }
  }
}

let suites_0 = [
  "int_type",
  (function (param) {
      return {
              TAG: "Eq",
              _0: "number",
              _1: "number"
            };
    })
];

let suites_1 = {
  hd: [
    "string_type",
    (function (param) {
        return {
                TAG: "Eq",
                _0: "string",
                _1: "string"
              };
      })
  ],
  tl: {
    hd: [
      "number_gadt_test",
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: Js_types.test(3, "Number"),
                  _1: true
                };
        })
    ],
    tl: {
      hd: [
        "boolean_gadt_test",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: Js_types.test(true, "Boolean"),
                    _1: true
                  };
          })
      ],
      tl: {
        hd: [
          "undefined_gadt_test",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: Js_types.test(undefined, "Undefined"),
                      _1: true
                    };
            })
        ],
        tl: {
          hd: [
            "string_on_number1",
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: string_or_number("xx"),
                        _1: true
                      };
              })
          ],
          tl: {
            hd: [
              "string_on_number2",
              (function (param) {
                  return {
                          TAG: "Eq",
                          _0: string_or_number(3.02),
                          _1: true
                        };
                })
            ],
            tl: {
              hd: [
                "string_on_number3",
                (function (param) {
                    return {
                            TAG: "Eq",
                            _0: string_or_number(function (x) {
                                  return x;
                                }),
                            _1: false
                          };
                  })
              ],
              tl: {
                hd: [
                  "string_gadt_test",
                  (function (param) {
                      return {
                              TAG: "Eq",
                              _0: Js_types.test("3", "String"),
                              _1: true
                            };
                    })
                ],
                tl: {
                  hd: [
                    "string_gadt_test_neg",
                    (function (param) {
                        return {
                                TAG: "Eq",
                                _0: Js_types.test(3, "String"),
                                _1: false
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      "function_gadt_test",
                      (function (param) {
                          return {
                                  TAG: "Eq",
                                  _0: Js_types.test((function (x) {
                                          return x;
                                        }), "Function"),
                                  _1: true
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "object_gadt_test",
                        (function (param) {
                            return {
                                    TAG: "Eq",
                                    _0: Js_types.test({
                                          x: 3
                                        }, "Object"),
                                    _1: true
                                  };
                          })
                      ],
                      tl: /* [] */0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Typeof_test", suites);

exports.string_or_number = string_or_number;
exports.suites = suites;
/*  Not a pure module */
