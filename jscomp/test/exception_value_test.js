'use strict';

let Curry = require("../../lib/js/curry.js");
let Js_exn = require("../../lib/js/js_exn.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function f(param) {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function assert_f(x) {
  if (x <= 3) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "exception_value_test.ml",
            9,
            12
          ],
          Error: new Error()
        };
  }
  return 3;
}

function hh(param) {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

let A = /* @__PURE__ */Caml_exceptions.create("Exception_value_test.A");

let B = /* @__PURE__ */Caml_exceptions.create("Exception_value_test.B");

let C = /* @__PURE__ */Caml_exceptions.create("Exception_value_test.C");

let u = {
  RE_EXN_ID: A,
  _1: 3
};

function test_not_found(f, param) {
  try {
    return Curry._1(f, undefined);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return 2;
    }
    throw exn;
  }
}

function test_js_error2(param) {
  try {
    return JSON.parse(" {\"x\" : }");
  }
  catch (raw_e){
    let e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e.RE_EXN_ID === Js_exn.$$Error) {
      console.log(e._1.stack);
      throw e;
    }
    throw e;
  }
}

function test_js_error3(param) {
  try {
    JSON.parse(" {\"x\"}");
    return 1;
  }
  catch (e){
    return 0;
  }
}

exports.f = f;
exports.assert_f = assert_f;
exports.hh = hh;
exports.A = A;
exports.B = B;
exports.C = C;
exports.u = u;
exports.test_not_found = test_not_found;
exports.test_js_error2 = test_js_error2;
exports.test_js_error3 = test_js_error3;
/* No side effect */
