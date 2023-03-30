'use strict';

let Exception_def = require("./exception_def.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

let E = /* @__PURE__ */Caml_exceptions.create("Exception_rebind_test.A.E");

let A = {
  E: E
};

let B = {
  F: E
};

let A0 = /* @__PURE__ */Caml_exceptions.create("Exception_rebind_test.A0");

let H0 = "Invalid_argument";

let u0 = {
  RE_EXN_ID: H0,
  _1: "x"
};

let u1 = {
  RE_EXN_ID: "Invalid_argument",
  _1: "x"
};

let u2 = {
  RE_EXN_ID: "Not_found"
};

let H = Exception_def.A;

let H1 = H0;

exports.A = A;
exports.B = B;
exports.H = H;
exports.A0 = A0;
exports.H0 = H0;
exports.H1 = H1;
exports.u0 = u0;
exports.u1 = u1;
exports.u2 = u2;
/* Exception_def Not a pure module */
