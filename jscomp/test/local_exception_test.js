'use strict';

let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

let A = /* @__PURE__ */Caml_exceptions.create("Local_exception_test.A");

let v = {
  RE_EXN_ID: A,
  _1: 3,
  _2: true
};

let B = /* @__PURE__ */Caml_exceptions.create("Local_exception_test.B");

let u = {
  RE_EXN_ID: B
};

let D = /* @__PURE__ */Caml_exceptions.create("Local_exception_test.D");

let d = {
  RE_EXN_ID: D,
  _1: 3
};

exports.A = A;
exports.v = v;
exports.B = B;
exports.u = u;
exports.D = D;
exports.d = d;
/* No side effect */
