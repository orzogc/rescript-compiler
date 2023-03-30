'use strict';

let Mt = require("./mt.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

let A = /* @__PURE__ */Caml_exceptions.create("Exception_def.A");

let A$1 = /* @__PURE__ */Caml_exceptions.create("Exception_def.U.A");

let U = {
  A: A$1
};

let H = {};

let Bx = /* @__PURE__ */Caml_exceptions.create("Exception_def.Bx");

let u = {
  RE_EXN_ID: Bx
};

let Ax = /* @__PURE__ */Caml_exceptions.create("Exception_def.Ax");

let XXX = /* @__PURE__ */Caml_exceptions.create("Exception_def.XXX");

let Aa = "Match_failure";

let v_1 = [
  "",
  0,
  0
];

let v = {
  RE_EXN_ID: Aa,
  _1: v_1
};

let H0 = "Not_found";

let H1 = /* @__PURE__ */Caml_exceptions.create("Exception_def.H1");

let H2 = /* @__PURE__ */Caml_exceptions.create("Exception_def.H2");

let h2 = {
  RE_EXN_ID: H2
};

let h3 = {
  RE_EXN_ID: H2
};

let h4 = {
  RE_EXN_ID: H0
};

let H4 = "Invalid_argument";

let h5 = {
  RE_EXN_ID: H4,
  _1: "xx"
};

function p(e) {
  if (e.RE_EXN_ID === H4) {
    return 0;
  } else if (e.RE_EXN_ID === H2) {
    return 1;
  } else if (e.RE_EXN_ID === H2) {
    return 2;
  } else if (e.RE_EXN_ID === H0) {
    return 4;
  } else if (e.RE_EXN_ID === "Not_found") {
    return 3;
  } else {
    return -1;
  }
}

eq("File \"exception_def.ml\", line 50, characters 6-13", p(h5), 0);

eq("File \"exception_def.ml\", line 51, characters 6-13", p({
          RE_EXN_ID: "Not_found"
        }), 4);

eq("File \"exception_def.ml\", line 52, characters 6-13", p({
          RE_EXN_ID: H0
        }), 4);

eq("File \"exception_def.ml\", line 53, characters 6-13", p({
          RE_EXN_ID: H2
        }), 1);

eq("File \"exception_def.ml\", line 54, characters 6-13", p({
          RE_EXN_ID: H2
        }), 1);

eq("File \"exception_def.ml\", line 55, characters 6-13", p({
          RE_EXN_ID: "Invalid_argument",
          _1: ""
        }), 0);

Mt.from_pair_suites("exception_def.ml", suites.contents);

let a = 3;

let H3 = H2;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.A = A;
exports.U = U;
exports.H = H;
exports.Bx = Bx;
exports.a = a;
exports.u = u;
exports.Ax = Ax;
exports.XXX = XXX;
exports.Aa = Aa;
exports.v = v;
exports.H0 = H0;
exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.H4 = H4;
exports.h5 = h5;
exports.p = p;
/*  Not a pure module */
