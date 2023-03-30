'use strict';

let Mt = require("./mt.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let Stack_overflow = /* @__PURE__ */Caml_exceptions.create("Exn_error_pattern.Stack_overflow");

let Sys_blocked_io = /* @__PURE__ */Caml_exceptions.create("Exn_error_pattern.Sys_blocked_io");

let Sys_error = /* @__PURE__ */Caml_exceptions.create("Exn_error_pattern.Sys_error");

function f(match) {
  if (Caml_exceptions.is_extension(match)) {
    if (match.RE_EXN_ID === "Not_found") {
      return 0;
    } else if (match.RE_EXN_ID === "Invalid_argument" || match.RE_EXN_ID === Stack_overflow) {
      return 1;
    } else if (match.RE_EXN_ID === Sys_error) {
      return 2;
    } else {
      return ;
    }
  }
  
}

let A = /* @__PURE__ */Caml_exceptions.create("Exn_error_pattern.A");

let B = /* @__PURE__ */Caml_exceptions.create("Exn_error_pattern.B");

function g(match) {
  if (Caml_exceptions.is_extension(match)) {
    if (match.RE_EXN_ID === "Not_found" || match.RE_EXN_ID === "Invalid_argument") {
      return 0;
    } else if (match.RE_EXN_ID === Sys_error) {
      return 2;
    } else if (match.RE_EXN_ID === A || match.RE_EXN_ID === B) {
      return match._1;
    } else {
      return ;
    }
  }
  
}

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

eq("File \"exn_error_pattern.ml\", line 36, characters 5-12", f({
          RE_EXN_ID: "Not_found"
        }), 0);

eq("File \"exn_error_pattern.ml\", line 37, characters 5-12", f({
          RE_EXN_ID: "Invalid_argument",
          _1: ""
        }), 1);

eq("File \"exn_error_pattern.ml\", line 38, characters 5-12", f({
          RE_EXN_ID: Stack_overflow
        }), 1);

eq("File \"exn_error_pattern.ml\", line 39, characters 5-12", f({
          RE_EXN_ID: Sys_error,
          _1: ""
        }), 2);

let tmp;

try {
  throw new Error("x");
}
catch (raw_e){
  tmp = Caml_js_exceptions.internalToOCamlException(raw_e);
}

eq("File \"exn_error_pattern.ml\", line 40, characters 5-12", f(tmp), undefined);

Mt.from_pair_suites("Exn_error_pattern", suites.contents);

exports.Stack_overflow = Stack_overflow;
exports.Sys_blocked_io = Sys_blocked_io;
exports.Sys_error = Sys_error;
exports.f = f;
exports.A = A;
exports.B = B;
exports.g = g;
exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/*  Not a pure module */
