'use strict';

let React = require("react");

function dd(param) {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

let h = sum(1.0, 2.0);

let M = {
  sum: (function (prim0, prim1) {
      return sum(prim0, prim1);
    })
};

let hh = M.sum(1.0, 2.0);

let mf = 3 % 4;

function tg(arr) {
  return arr[0];
}

let tc = Object.assign({}, "abc");

let te = {
  RE_EXN_ID: "Not_found"
};

let tcr = {};

function tsiC(c) {
  c.increment = (function (amount) {
      let me = this ;
      console.log(me);
    });
}

function tsiU(c) {
  c.increment = (function (amount) {
      let me = this ;
      console.log(me);
    });
}

let match = React.useState(function () {
      return 3;
    });

let StandardNotation_get = match[0];

let StandardNotation_set = match[1];

let StandardNotation = {
  dd: dd,
  h: h,
  M: M,
  hh: hh,
  mf: mf,
  tg: tg,
  tc: tc,
  te: te,
  tcr: tcr,
  tsiC: tsiC,
  tsiU: tsiU,
  get: StandardNotation_get,
  set: StandardNotation_set
};

function methodWithAsync(param) {
  let $$this = this ;
  return (async function (arg) {
              return $$this + arg | 0;
            })(param);
}

function dd$1(param) {
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

let h$1 = sum(1.0, 2.0);

let M$1 = {
  sum: (function (prim0, prim1) {
      return sum(prim0, prim1);
    })
};

let hh$1 = M$1.sum(1.0, 2.0);

let mf$1 = 3 % 4;

function tg$1(arr) {
  return arr[0];
}

let tc$1 = Object.assign({}, "abc");

let te$1 = {
  RE_EXN_ID: "Not_found"
};

let tcr$1 = {};

function tsiC$1(c) {
  c.increment = (function (amount) {
      let me = this ;
      console.log(me);
    });
}

function tsiU$1(c) {
  c.increment = (function (amount) {
      let me = this ;
      console.log(me);
    });
}

let match$1 = React.useState(function (param) {
      return 3;
    });

function methodWithAsyncU() {
  let $$this = this ;
  return async function (arg) {
    return $$this + arg | 0;
  };
}

let get = match$1[0];

let set = match$1[1];

exports.StandardNotation = StandardNotation;
exports.methodWithAsync = methodWithAsync;
exports.dd = dd$1;
exports.h = h$1;
exports.M = M$1;
exports.hh = hh$1;
exports.mf = mf$1;
exports.tg = tg$1;
exports.tc = tc$1;
exports.te = te$1;
exports.tcr = tcr$1;
exports.tsiC = tsiC$1;
exports.tsiU = tsiU$1;
exports.get = get;
exports.set = set;
exports.methodWithAsyncU = methodWithAsyncU;
/* h Not a pure module */
