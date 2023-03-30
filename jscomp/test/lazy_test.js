'use strict';

let Mt = require("./mt.js");
let Lazy = require("../../lib/js/lazy.js");
let CamlinternalLazy = require("../../lib/js/camlinternalLazy.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let u = {
  contents: 3
};

let v = {
  LAZY_DONE: false,
  VAL: (function () {
      u.contents = 32;
    })
};

function lazy_test(param) {
  let h = u.contents;
  CamlinternalLazy.force(v);
  let g = u.contents;
  return [
          h,
          g
        ];
}

function f(param) {
  CamlinternalLazy.force(param[0]);
  let match = param[2].contents;
  if (match === undefined) {
    return 0;
  }
  CamlinternalLazy.force(param[1]);
  let x = param[2].contents;
  if (x !== undefined) {
    return 1;
  }
  throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "lazy_test.ml",
          11,
          8
        ],
        Error: new Error()
      };
}

let s = {
  contents: undefined
};

let set_true = {
  LAZY_DONE: false,
  VAL: (function () {
      s.contents = 1;
    })
};

let set_false = {
  LAZY_DONE: false,
  VAL: (function () {
      s.contents = undefined;
    })
};

let h;

try {
  h = f([
        set_true,
        set_false,
        s
      ]);
}
catch (raw_exn){
  let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
  if (exn.RE_EXN_ID === "Match_failure") {
    h = 2;
  } else {
    throw exn;
  }
}

let u_v = {
  contents: 0
};

let u$1 = {
  LAZY_DONE: false,
  VAL: (function () {
      u_v.contents = 2;
    })
};

CamlinternalLazy.force(u$1);

let exotic = CamlinternalLazy.force;

let l_from_fun = {
  LAZY_DONE: false,
  VAL: (function () {
      return 3;
    })
};

let forward_test = {
  LAZY_DONE: false,
  VAL: (function () {
      let u = 3;
      u = u + 1 | 0;
      return u;
    })
};

let f005 = {
  LAZY_DONE: true,
  VAL: 6
};

let f006 = {
  LAZY_DONE: false,
  VAL: (function () {
      return function (param) {
        return 3;
      };
    })
};

let f007 = {
  LAZY_DONE: false,
  VAL: (function () {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    })
};

let f008 = {
  LAZY_DONE: false,
  VAL: (function () {
      console.log("hi");
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    })
};

function a2(x) {
  return {
          LAZY_DONE: true,
          VAL: x
        };
}

let a3 = {
  LAZY_DONE: true,
  VAL: 3
};

let a4 = {
  LAZY_DONE: true,
  VAL: 3
};

let a5 = {
  LAZY_DONE: true,
  VAL: undefined
};

let a6 = {
  LAZY_DONE: true,
  VAL: undefined
};

let a7 = CamlinternalLazy.force(a5);

let a8 = CamlinternalLazy.force(a6);

Mt.from_pair_suites("Lazy_test", {
      hd: [
        "simple",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: lazy_test(undefined),
                    _1: [
                      3,
                      32
                    ]
                  };
          })
      ],
      tl: {
        hd: [
          "lazy_match",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: h,
                      _1: 2
                    };
            })
        ],
        tl: {
          hd: [
            "lazy_force",
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: u_v.contents,
                        _1: 2
                      };
              })
          ],
          tl: {
            hd: [
              "lazy_from_fun",
              (function (param) {
                  return {
                          TAG: "Eq",
                          _0: CamlinternalLazy.force(l_from_fun),
                          _1: 3
                        };
                })
            ],
            tl: {
              hd: [
                "lazy_from_val",
                (function (param) {
                    return {
                            TAG: "Eq",
                            _0: CamlinternalLazy.force({
                                  LAZY_DONE: true,
                                  VAL: 3
                                }),
                            _1: 3
                          };
                  })
              ],
              tl: {
                hd: [
                  "lazy_from_val2",
                  (function (param) {
                      return {
                              TAG: "Eq",
                              _0: CamlinternalLazy.force(CamlinternalLazy.force({
                                        LAZY_DONE: true,
                                        VAL: {
                                          LAZY_DONE: true,
                                          VAL: 3
                                        }
                                      })),
                              _1: 3
                            };
                    })
                ],
                tl: {
                  hd: [
                    "lazy_from_val3",
                    (function (param) {
                        debugger;
                        return {
                                TAG: "Eq",
                                _0: CamlinternalLazy.force(CamlinternalLazy.force({
                                          LAZY_DONE: true,
                                          VAL: forward_test
                                        })),
                                _1: 4
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      "lazy_test.ml",
                      (function (param) {
                          return {
                                  TAG: "Eq",
                                  _0: a3,
                                  _1: a4
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "lazy_test.ml",
                        (function (param) {
                            return {
                                    TAG: "Eq",
                                    _0: a7,
                                    _1: undefined
                                  };
                          })
                      ],
                      tl: {
                        hd: [
                          "lazy_test.ml",
                          (function (param) {
                              return {
                                      TAG: "Eq",
                                      _0: a8,
                                      _1: undefined
                                    };
                            })
                        ],
                        tl: {
                          hd: [
                            "File \"lazy_test.ml\", line 78, characters 0-7",
                            (function (param) {
                                return {
                                        TAG: "Ok",
                                        _0: Lazy.is_val({
                                              LAZY_DONE: true,
                                              VAL: 3
                                            })
                                      };
                              })
                          ],
                          tl: {
                            hd: [
                              "File \"lazy_test.ml\", line 79, characters 0-7",
                              (function (param) {
                                  return {
                                          TAG: "Ok",
                                          _0: !Lazy.is_val({
                                                LAZY_DONE: false,
                                                VAL: (function () {
                                                    throw {
                                                          RE_EXN_ID: "Not_found",
                                                          Error: new Error()
                                                        };
                                                  })
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
                }
              }
            }
          }
        }
      }
    });

exports.v = v;
exports.lazy_test = lazy_test;
exports.f = f;
exports.s = s;
exports.set_true = set_true;
exports.set_false = set_false;
exports.h = h;
exports.u_v = u_v;
exports.u = u$1;
exports.exotic = exotic;
exports.l_from_fun = l_from_fun;
exports.forward_test = forward_test;
exports.f005 = f005;
exports.f006 = f006;
exports.f007 = f007;
exports.f008 = f008;
exports.a2 = a2;
exports.a3 = a3;
exports.a4 = a4;
exports.a5 = a5;
exports.a6 = a6;
exports.a7 = a7;
exports.a8 = a8;
/* h Not a pure module */
