'use strict';

let Mt = require("./mt.js");
let Curry = require("../../lib/js/curry.js");
let Caml_format = require("../../lib/js/caml_format.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let Inline_record = /* @__PURE__ */Caml_exceptions.create("Record_extension_test.Inline_record");

function f(x) {
  if (x.RE_EXN_ID === Inline_record) {
    return x.x + Caml_format.int_of_string(x.y) | 0;
  }
  
}

let v0 = {
  RE_EXN_ID: Inline_record,
  x: 3,
  y: "4"
};

eq("File \"record_extension_test.ml\", line 19, characters 6-13", f(v0), 7);

function f2(x) {
  if (typeof x !== "object" || x.TAG !== "C") {
    return 0;
  } else {
    return x.x;
  }
}

function f2_with(x) {
  if (typeof x !== "object" || x.TAG !== "C") {
    return x;
  } else {
    return {
            TAG: "C",
            x: 0,
            y: x.y
          };
  }
}

let A = /* @__PURE__ */Caml_exceptions.create("Record_extension_test.A");

let B = /* @__PURE__ */Caml_exceptions.create("Record_extension_test.B");

let C = /* @__PURE__ */Caml_exceptions.create("Record_extension_test.C");

function u(f) {
  try {
    return Curry._1(f, undefined);
  }
  catch (raw_x){
    let x = Caml_js_exceptions.internalToOCamlException(raw_x);
    if (x.RE_EXN_ID === A) {
      return x.name + x.x | 0;
    } else if (x.RE_EXN_ID === B) {
      return x._1 + x._2 | 0;
    } else if (x.RE_EXN_ID === C) {
      return x.name;
    } else {
      return -1;
    }
  }
}

Mt.from_pair_suites("File \"record_extension_test.ml\", line 56, characters 22-29", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.Inline_record = Inline_record;
exports.f = f;
exports.v0 = v0;
exports.f2 = f2;
exports.f2_with = f2_with;
exports.A = A;
exports.B = B;
exports.C = C;
exports.u = u;
/*  Not a pure module */
