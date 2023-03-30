'use strict';

let Curry = require("../../lib/js/curry.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let Out_of_memory = /* @__PURE__ */Caml_exceptions.create("Test_trywith.Out_of_memory");

let Sys_error = /* @__PURE__ */Caml_exceptions.create("Test_trywith.Sys_error");

let Stack_overflow = /* @__PURE__ */Caml_exceptions.create("Test_trywith.Stack_overflow");

let Sys_blocked_io = /* @__PURE__ */Caml_exceptions.create("Test_trywith.Sys_blocked_io");

function ff(g, x) {
  try {
    Curry._1(g, x);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID !== "Not_found") {
      throw exn;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$1){
    let exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
    if (exn$1.RE_EXN_ID !== Out_of_memory) {
      throw exn$1;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$2){
    let exn$2 = Caml_js_exceptions.internalToOCamlException(raw_exn$2);
    if (exn$2.RE_EXN_ID !== Sys_error) {
      throw exn$2;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$3){
    let exn$3 = Caml_js_exceptions.internalToOCamlException(raw_exn$3);
    if (exn$3.RE_EXN_ID !== "Invalid_argument") {
      throw exn$3;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$4){
    let exn$4 = Caml_js_exceptions.internalToOCamlException(raw_exn$4);
    if (exn$4.RE_EXN_ID !== "End_of_file") {
      throw exn$4;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$5){
    let exn$5 = Caml_js_exceptions.internalToOCamlException(raw_exn$5);
    if (exn$5.RE_EXN_ID !== "Match_failure") {
      throw exn$5;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$6){
    let exn$6 = Caml_js_exceptions.internalToOCamlException(raw_exn$6);
    if (exn$6.RE_EXN_ID !== Stack_overflow) {
      throw exn$6;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$7){
    let exn$7 = Caml_js_exceptions.internalToOCamlException(raw_exn$7);
    if (exn$7.RE_EXN_ID !== Sys_blocked_io) {
      throw exn$7;
    }
    
  }
  try {
    Curry._1(g, x);
  }
  catch (raw_exn$8){
    let exn$8 = Caml_js_exceptions.internalToOCamlException(raw_exn$8);
    if (exn$8.RE_EXN_ID !== "Assert_failure") {
      throw exn$8;
    }
    
  }
  try {
    return Curry._1(g, x);
  }
  catch (raw_exn$9){
    let exn$9 = Caml_js_exceptions.internalToOCamlException(raw_exn$9);
    if (exn$9.RE_EXN_ID === "Undefined_recursive_module") {
      return ;
    }
    throw exn$9;
  }
}

function u(param) {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function f(x) {
  if (typeof x !== "object") {
    return 2;
  }
  if (x.TAG === "D") {
    return 1;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "test_trywith.ml",
          55,
          9
        ],
        Error: new Error()
      };
}

let u1 = "bad character decimal encoding \\";

let v = "bad character decimal encoding \\%c%c%c";

exports.Out_of_memory = Out_of_memory;
exports.Sys_error = Sys_error;
exports.Stack_overflow = Stack_overflow;
exports.Sys_blocked_io = Sys_blocked_io;
exports.ff = ff;
exports.u = u;
exports.u1 = u1;
exports.v = v;
exports.f = f;
/* No side effect */
