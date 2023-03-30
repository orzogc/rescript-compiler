'use strict';

let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

let Custom_inline = /* @__PURE__ */Caml_exceptions.create("Test_literal.Custom_inline");

let v = {
  RE_EXN_ID: Custom_inline,
  _1: 1,
  _2: 2
};

let vv = [
  1,
  2,
  3
];

let long_v = [
  1,
  2,
  3,
  4,
  5,
  6
];

let long_int_v = [
  1,
  2,
  3,
  4,
  5,
  6
];

let short_int_v = [1];

let empty = [];

exports.Custom_inline = Custom_inline;
exports.v = v;
exports.vv = vv;
exports.long_v = long_v;
exports.long_int_v = long_int_v;
exports.short_int_v = short_int_v;
exports.empty = empty;
/* No side effect */
