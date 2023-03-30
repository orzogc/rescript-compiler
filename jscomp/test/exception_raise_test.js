'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let Curry = require("../../lib/js/curry.js");
let Js_exn = require("../../lib/js/js_exn.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let Local = /* @__PURE__ */Caml_exceptions.create("Exception_raise_test.Local");

let B = /* @__PURE__ */Caml_exceptions.create("Exception_raise_test.B");

let C = /* @__PURE__ */Caml_exceptions.create("Exception_raise_test.C");

let D = /* @__PURE__ */Caml_exceptions.create("Exception_raise_test.D");

function appf(g, x) {
  let A = /* @__PURE__ */Caml_exceptions.create("A");
  try {
    return Curry._1(g, x);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Local) {
      return 3;
    }
    if (exn.RE_EXN_ID === "Not_found") {
      return 2;
    }
    if (exn.RE_EXN_ID === A) {
      return 3;
    }
    if (exn.RE_EXN_ID !== B) {
      if (exn.RE_EXN_ID === C) {
        return exn._1;
      } else if (exn.RE_EXN_ID === D) {
        return exn._1[0];
      } else {
        return 4;
      }
    }
    let match = exn._1;
    if (!match) {
      return 4;
    }
    let match$1 = match.tl;
    if (!match$1) {
      return 4;
    }
    let match$2 = match$1.tl;
    if (match$2) {
      return match$2.hd;
    } else {
      return 4;
    }
  }
}

let A = /* @__PURE__ */Caml_exceptions.create("Exception_raise_test.A");

let f;

try {
  f = (function () {throw (new Error ("x"))} ());
}
catch (raw_x){
  let x = Caml_js_exceptions.internalToOCamlException(raw_x);
  f = x.RE_EXN_ID === A ? x._1 : 2;
}

let ff;

try {
  ff = (function () {throw 3} ());
}
catch (raw_x$1){
  let x$1 = Caml_js_exceptions.internalToOCamlException(raw_x$1);
  ff = x$1.RE_EXN_ID === A ? x$1._1 : 2;
}

let fff;

try {
  fff = (function () {throw 2} ());
}
catch (raw_x$2){
  let x$2 = Caml_js_exceptions.internalToOCamlException(raw_x$2);
  fff = x$2.RE_EXN_ID === A ? x$2._1 : 2;
}

let a0;

try {
  a0 = (function (){throw 2} ());
}
catch (raw_x$3){
  let x$3 = Caml_js_exceptions.internalToOCamlException(raw_x$3);
  if (x$3.RE_EXN_ID === A || x$3.RE_EXN_ID === Js_exn.$$Error) {
    a0 = x$3._1;
  } else {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "exception_raise_test.ml",
            102,
            9
          ],
          Error: new Error()
        };
  }
}

let a1;

try {
  a1 = (function (){throw 2} ());
}
catch (raw_e){
  a1 = Caml_js_exceptions.internalToOCamlException(raw_e);
}

let a2;

try {
  a2 = (function (){throw (new Error("x"))} ());
}
catch (raw_e$1){
  a2 = Caml_js_exceptions.internalToOCamlException(raw_e$1);
}

let suites = {
  contents: {
    hd: [
      "File \"exception_raise_test.ml\", line 114, characters 4-11",
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: [
                    f,
                    ff,
                    fff,
                    a0
                  ],
                  _1: [
                    2,
                    2,
                    2,
                    2
                  ]
                };
        })
    ],
    tl: {
      hd: [
        "File \"exception_raise_test.ml\", line 116, characters 4-11",
        (function (param) {
            if (a1.RE_EXN_ID === Js_exn.$$Error) {
              return {
                      TAG: "Eq",
                      _0: a1._1,
                      _1: 2
                    };
            }
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "exception_raise_test.ml",
                    119,
                    15
                  ],
                  Error: new Error()
                };
          })
      ],
      tl: /* [] */0
    }
  }
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

try {
  ((()=>{throw 2})());
}
catch (raw_e$2){
  let e = Caml_js_exceptions.internalToOCamlException(raw_e$2);
  eq("File \"exception_raise_test.ml\", line 131, characters 7-14", Caml_js_exceptions.as_js_exn(e) !== undefined, true);
}

try {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}
catch (raw_e$3){
  let e$1 = Caml_js_exceptions.internalToOCamlException(raw_e$3);
  eq("File \"exception_raise_test.ml\", line 138, characters 7-14", Caml_js_exceptions.as_js_exn(e$1) !== undefined, false);
}

function fff0(x, g) {
  let val;
  try {
    val = Curry._1(x, undefined);
  }
  catch (exn){
    return 1;
  }
  return Curry._1(g, undefined);
}

function input_lines(ic, _acc) {
  while(true) {
    let acc = _acc;
    let line;
    try {
      line = input_line(ic);
    }
    catch (exn){
      return List.rev(acc);
    }
    _acc = {
      hd: line,
      tl: acc
    };
    continue ;
  };
}

eq("File \"exception_raise_test.ml\", line 151, characters 5-12", ((a,b,c,_) => a + b + c)(1, 2, 3, 4), 6);

Mt.from_pair_suites("Exception_raise_test", suites.contents);

exports.Local = Local;
exports.B = B;
exports.C = C;
exports.D = D;
exports.appf = appf;
exports.A = A;
exports.f = f;
exports.ff = ff;
exports.fff = fff;
exports.a0 = a0;
exports.a1 = a1;
exports.a2 = a2;
exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.fff0 = fff0;
exports.input_lines = input_lines;
/* f Not a pure module */
