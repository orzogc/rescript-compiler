// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Primitive_int from "rescript/lib/es6/Primitive_int.js";

function f(param, v) {
  return ((((param.x0 + param.x1 | 0) + param.x2 | 0) + param.x3 | 0) + param.x4 | 0) + v | 0;
}

function f2(param, param$1) {
  return (((((param.x0 + param.x1 | 0) + param.x2 | 0) + param.x3 | 0) + param.x4 | 0) + param$1.a | 0) + param$1.b | 0;
}

function f3(param, param$1) {
  let lhs = param.rank;
  let rhs = param$1.rank;
  if (typeof lhs !== "object") {
    lhs === "Uninitialized";
  } else {
    if (typeof rhs === "object") {
      return Primitive_int.compare(lhs._0, rhs._0);
    }
    rhs === "Uninitialized";
  }
  throw {
    RE_EXN_ID: "Assert_failure",
    _1: [
      "fun_pattern_match.res",
      33,
      9
    ],
    Error: new Error()
  };
}

function f4(param, param$1) {
  let lhs = param.rank;
  let rhs = param$1.rank;
  if (typeof lhs !== "object") {
    lhs === "Uninitialized";
  } else {
    if (typeof rhs === "object") {
      return Primitive_int.compare(lhs._0, rhs._0);
    }
    rhs === "Uninitialized";
  }
  throw {
    RE_EXN_ID: "Assert_failure",
    _1: [
      "fun_pattern_match.res",
      39,
      9
    ],
    Error: new Error()
  };
}

let x = {
  NAME: "A",
  VAL: r
};

function r() {
  return x;
}

let match = r();

let v = match.VAL();

console.log(v);

function handle_tuple(x, y) {
  if (x !== 0) {
    if (x === 1 && y === 2) {
      return 3;
    }
    
  } else if (y === 1) {
    return 2;
  }
  console.log([
    x,
    y
  ]);
  return x + y | 0;
}

export {
  f,
  f2,
  f3,
  f4,
  r,
  v,
  handle_tuple,
}
/* match Not a pure module */
