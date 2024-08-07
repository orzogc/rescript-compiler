// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Mt_global = require("./mt_global.js");

let test_id = {
  contents: 0
};

let suites = {
  contents: /* [] */0
};

function eq(loc, x, y) {
  Mt_global.collect_eq(test_id, suites, loc, x, y);
}

function approx(loc, x, y) {
  Mt_global.collect_approx(test_id, suites, loc, x, y);
}

let bigint_compare = Caml.bigint_compare;

let generic_compare = Caml_obj.compare;

function bigint_equal(x, y) {
  return x === y;
}

let generic_equal = Caml_obj.equal;

function bigint_notequal(x, y) {
  return x !== y;
}

let generic_notequal = Caml_obj.notequal;

function bigint_lessthan(x, y) {
  return x < y;
}

let generic_lessthan = Caml_obj.lessthan;

function bigint_greaterthan(x, y) {
  return x > y;
}

let generic_greaterthan = Caml_obj.greaterthan;

function bigint_lessequal(x, y) {
  return x <= y;
}

let generic_lessequal = Caml_obj.lessequal;

function bigint_greaterequal(x, y) {
  return x >= y;
}

let generic_greaterequal = Caml_obj.greaterequal;

function bigint_land(prim0, prim1) {
  return prim0 & prim1;
}

function bigint_lor(prim0, prim1) {
  return prim0 | prim1;
}

function bigint_lxor(prim0, prim1) {
  return prim0 ^ prim1;
}

function bigint_lsl(prim0, prim1) {
  return (prim0 << prim1);
}

function bigint_asr(prim0, prim1) {
  return (prim0 >> prim1);
}

eq("File \"bigint_test.res\", line 26, characters 5-12", Caml.bigint_compare(1n, 1n), 0);

eq("File \"bigint_test.res\", line 27, characters 5-12", Caml_obj.compare(1n, 1n), 0);

eq("File \"bigint_test.res\", line 28, characters 5-12", Caml.bigint_compare(-0n, -1n), 1);

eq("File \"bigint_test.res\", line 29, characters 5-12", Caml_obj.compare(-0n, -1n), 1);

eq("File \"bigint_test.res\", line 30, characters 5-12", Caml.bigint_compare(0n, -1n), 1);

eq("File \"bigint_test.res\", line 31, characters 5-12", Caml_obj.compare(0n, -1n), 1);

eq("File \"bigint_test.res\", line 32, characters 5-12", Caml.bigint_compare(1n, 2n), -1);

eq("File \"bigint_test.res\", line 33, characters 5-12", Caml_obj.compare(1n, 2n), -1);

eq("File \"bigint_test.res\", line 34, characters 5-12", Caml.bigint_compare(1n, 2n), -1);

eq("File \"bigint_test.res\", line 35, characters 5-12", Caml_obj.compare(1n, 2n), -1);

eq("File \"bigint_test.res\", line 36, characters 5-12", Caml.bigint_compare(1n, 1n), 0);

eq("File \"bigint_test.res\", line 37, characters 5-12", Caml_obj.compare(1n, 1n), 0);

eq("File \"bigint_test.res\", line 38, characters 5-12", 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n === 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, true);

eq("File \"bigint_test.res\", line 39, characters 5-12", Caml_obj.equal(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n), true);

eq("File \"bigint_test.res\", line 40, characters 5-12", 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n === 1000000000000000000000000000000000000000000000000000000000000000000000000000000000001n, false);

eq("File \"bigint_test.res\", line 41, characters 5-12", Caml_obj.equal(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, 1000000000000000000000000000000000000000000000000000000000000000000000000000000000001n), false);

eq("File \"bigint_test.res\", line 42, characters 5-12", 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n === -1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, false);

eq("File \"bigint_test.res\", line 43, characters 5-12", Caml_obj.equal(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, -1000000000000000000000000000000000000000000000000000000000000000000000000000000000000n), false);

eq("File \"bigint_test.res\", line 44, characters 5-12", (
  1n !== 1n ? (
      1n !== 2n ? 0n : 4n
    ) : 3n
) === 3n, true);

eq("File \"bigint_test.res\", line 49, characters 5-12", Caml_obj.equal(1n !== 1n ? (
    1n !== 2n ? 0n : 4n
  ) : 3n, 3n), true);

eq("File \"bigint_test.res\", line 54, characters 5-12", (
  -1n !== -2n ? (
      -1n !== -1n ? 0n : 3n
    ) : 4n
) === 3n, true);

eq("File \"bigint_test.res\", line 59, characters 5-12", Caml_obj.equal(-1n !== -1n ? (
    -1n !== 2n ? 0n : 4n
  ) : 3n, 3n), true);

eq("File \"bigint_test.res\", line 64, characters 5-12", (
  -1000n !== -1000n ? (
      -1000n !== -2n ? 0n : 4n
    ) : 3n
) === 3n, true);

eq("File \"bigint_test.res\", line 69, characters 5-12", Caml_obj.equal(-1000n !== -1000n ? (
    -1000n !== -2n ? 0n : 4n
  ) : 3n, 3n), true);

eq("File \"bigint_test.res\", line 74, characters 5-12", 9n & 1n, 1n);

eq("File \"bigint_test.res\", line 75, characters 5-12", 9n | 1n, 9n);

eq("File \"bigint_test.res\", line 76, characters 5-12", 9n ^ 1n, 8n);

eq("File \"bigint_test.res\", line 77, characters 5-12", (9n << 1n), 18n);

eq("File \"bigint_test.res\", line 78, characters 5-12", (9n << -1n), 4n);

eq("File \"bigint_test.res\", line 79, characters 5-12", (9n >> 1n), 4n);

eq("File \"bigint_test.res\", line 80, characters 5-12", (9n >> -1n), 18n);

eq("File \"bigint_test.res\", line 81, characters 5-12", (-9n >> 1n), -5n);

eq("File \"bigint_test.res\", line 82, characters 5-12", (-9n >> -1n), -18n);

Mt.from_pair_suites("Bigint_test", suites.contents);

exports.test_id = test_id;
exports.suites = suites;
exports.eq = eq;
exports.approx = approx;
exports.bigint_compare = bigint_compare;
exports.generic_compare = generic_compare;
exports.bigint_equal = bigint_equal;
exports.generic_equal = generic_equal;
exports.bigint_notequal = bigint_notequal;
exports.generic_notequal = generic_notequal;
exports.bigint_lessthan = bigint_lessthan;
exports.generic_lessthan = generic_lessthan;
exports.bigint_greaterthan = bigint_greaterthan;
exports.generic_greaterthan = generic_greaterthan;
exports.bigint_lessequal = bigint_lessequal;
exports.generic_lessequal = generic_lessequal;
exports.bigint_greaterequal = bigint_greaterequal;
exports.generic_greaterequal = generic_greaterequal;
exports.bigint_land = bigint_land;
exports.bigint_lor = bigint_lor;
exports.bigint_lxor = bigint_lxor;
exports.bigint_lsl = bigint_lsl;
exports.bigint_asr = bigint_asr;
/*  Not a pure module */
