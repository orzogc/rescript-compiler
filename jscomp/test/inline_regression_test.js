'use strict';

let Mt = require("./mt.js");
let Curry = require("../../lib/js/curry.js");
let $$String = require("../../lib/js/string.js");
let Filename = require("../../lib/js/filename.js");
let Caml_string = require("../../lib/js/caml_string.js");

function generic_basename(is_dir_sep, current_dir_name, name) {
  if (name === "") {
    return current_dir_name;
  } else {
    let _n = name.length - 1 | 0;
    while(true) {
      let n = _n;
      if (n < 0) {
        return $$String.sub(name, 0, 1);
      }
      if (!Curry._2(is_dir_sep, name, n)) {
        let _n$1 = n;
        let p = n + 1 | 0;
        while(true) {
          let n$1 = _n$1;
          if (n$1 < 0) {
            return $$String.sub(name, 0, p);
          }
          if (Curry._2(is_dir_sep, name, n$1)) {
            return $$String.sub(name, n$1 + 1 | 0, (p - n$1 | 0) - 1 | 0);
          }
          _n$1 = n$1 - 1 | 0;
          continue ;
        };
      }
      _n = n - 1 | 0;
      continue ;
    };
  }
}

function basename(param) {
  return generic_basename((function (s, i) {
                return Caml_string.get(s, i) === /* '/' */47;
              }), Filename.current_dir_name, param);
}

let suites_0 = [
  "basename",
  (function (param) {
      return {
              TAG: "Eq",
              _0: basename("b/c/a.b"),
              _1: "a.b"
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Inline_regression_test", suites);

exports.generic_basename = generic_basename;
exports.basename = basename;
exports.suites = suites;
/*  Not a pure module */
