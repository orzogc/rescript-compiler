'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let Genlex = require("../../lib/js/genlex.js");
let Stream = require("../../lib/js/stream.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let lexer = Genlex.make_lexer({
      hd: "+",
      tl: {
        hd: "-",
        tl: {
          hd: "*",
          tl: {
            hd: "/",
            tl: {
              hd: "let",
              tl: {
                hd: "=",
                tl: {
                  hd: "(",
                  tl: {
                    hd: ")",
                    tl: /* [] */0
                  }
                }
              }
            }
          }
        }
      }
    });

function to_list(s) {
  let _acc = /* [] */0;
  while(true) {
    let acc = _acc;
    let v;
    try {
      v = Stream.next(s);
    }
    catch (raw_exn){
      let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stream.Failure) {
        return List.rev(acc);
      }
      throw exn;
    }
    _acc = {
      hd: v,
      tl: acc
    };
    continue ;
  };
}

let suites_0 = [
  "lexer_stream_genlex",
  (function (param) {
      return {
              TAG: "Eq",
              _0: {
                hd: {
                  TAG: "Int",
                  _0: 3
                },
                tl: {
                  hd: {
                    TAG: "Kwd",
                    _0: "("
                  },
                  tl: {
                    hd: {
                      TAG: "Int",
                      _0: 3
                    },
                    tl: {
                      hd: {
                        TAG: "Kwd",
                        _0: "+"
                      },
                      tl: {
                        hd: {
                          TAG: "Int",
                          _0: 2
                        },
                        tl: {
                          hd: {
                            TAG: "Int",
                            _0: -1
                          },
                          tl: {
                            hd: {
                              TAG: "Kwd",
                              _0: ")"
                            },
                            tl: /* [] */0
                          }
                        }
                      }
                    }
                  }
                }
              },
              _1: to_list(lexer(Stream.of_string("3(3 + 2 -1)")))
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Genlex_test", suites);

exports.lexer = lexer;
exports.to_list = to_list;
exports.suites = suites;
/* lexer Not a pure module */
