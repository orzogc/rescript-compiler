'use strict';

let Caml = require("../../lib/js/caml.js");

function getcompare(x) {
  return x;
}

function Make(M) {
  return M;
}

let Comparable = {
  getcompare: getcompare,
  Make: Make
};

function height(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param._4;
  }
}

function create(l, x, d, r) {
  let hl = height(l);
  let hr = height(r);
  return {
          TAG: "Node",
          _0: l,
          _1: x,
          _2: d,
          _3: r,
          _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal(l, x, d, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l._4;
  let hr;
  hr = typeof r !== "object" ? 0 : r._4;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    let lr = l._3;
    let ld = l._2;
    let lv = l._1;
    let ll = l._0;
    if (height(ll) >= height(lr)) {
      return create(ll, lv, ld, create(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create(create(ll, lv, ld, lr._0), lr._1, lr._2, create(lr._3, x, d, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: d,
            _3: r,
            _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  let rr = r._3;
  let rd = r._2;
  let rv = r._1;
  let rl = r._0;
  if (height(rr) >= height(rl)) {
    return create(create(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create(create(l, x, d, rl._0), rl._1, rl._2, create(rl._3, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function add(x, data, compare, param) {
  if (typeof param !== "object") {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: data,
            _3: "Empty",
            _4: 1
          };
  }
  let r = param._3;
  let d = param._2;
  let v = param._1;
  let l = param._0;
  let c = compare(x, v);
  if (c === 0) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: data,
            _3: r,
            _4: param._4
          };
  } else if (c < 0) {
    return bal(add(x, data, compare, l), v, d, r);
  } else {
    return bal(l, v, d, add(x, data, compare, r));
  }
}

function add$1(x, data, v) {
  let X = v.compare;
  return {
          compare: v.compare,
          data: add(x, data, X.compare, v.data)
        };
}

function empty(v) {
  return {
          compare: v,
          data: "Empty"
        };
}

let compare = Caml.int_compare;

let V0 = {
  compare: compare
};

let compare$1 = Caml.int_compare;

let V1 = {
  compare: compare$1
};

let v0 = {
  compare: V0,
  data: "Empty"
};

let v1 = {
  compare: V1,
  data: "Empty"
};

let v3 = add$1(3, "a", v0);

console.log(v3);

exports.Comparable = Comparable;
exports.height = height;
exports.create = create;
exports.bal = bal;
exports.add = add$1;
exports.empty = empty;
exports.V0 = V0;
exports.V1 = V1;
exports.v0 = v0;
exports.v1 = v1;
exports.v3 = v3;
/* v3 Not a pure module */
