'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let List = require("../../lib/js/list.js");

function height(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create(l, x, d, r) {
  let hl = height(l);
  let hr = height(r);
  return {
          TAG: "Node",
          l: l,
          v: x,
          d: d,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal(l, x, d, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let ld = l.d;
    let lv = l.v;
    let ll = l.l;
    if (height(ll) >= height(lr)) {
      return create(ll, lv, ld, create(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create(create(ll, lv, ld, lr.l), lr.v, lr.d, create(lr.r, x, d, r));
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
            l: l,
            v: x,
            d: d,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rd = r.d;
  let rv = r.v;
  let rl = r.l;
  if (height(rr) >= height(rl)) {
    return create(create(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create(create(l, x, d, rl.l), rl.v, rl.d, create(rl.r, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function add(x, data, m) {
  if (typeof m !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            d: data,
            r: "Empty",
            h: 1
          };
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let c = Caml.int_compare(x, v);
  if (c === 0) {
    if (d === data) {
      return m;
    } else {
      return {
              TAG: "Node",
              l: l,
              v: x,
              d: data,
              r: r,
              h: m.h
            };
    }
  }
  if (c < 0) {
    let ll = add(x, data, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  let rr = add(x, data, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function find(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let c = Caml.int_compare(x, param.v);
    if (c === 0) {
      return param.d;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

let m = List.fold_left((function (acc, param) {
        return add(param[0], param[1], acc);
      }), "Empty", {
      hd: [
        10,
        /* 'a' */97
      ],
      tl: {
        hd: [
          3,
          /* 'b' */98
        ],
        tl: {
          hd: [
            7,
            /* 'c' */99
          ],
          tl: {
            hd: [
              20,
              /* 'd' */100
            ],
            tl: /* [] */0
          }
        }
      }
    });

function height$1(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create$1(l, x, d, r) {
  let hl = height$1(l);
  let hr = height$1(r);
  return {
          TAG: "Node",
          l: l,
          v: x,
          d: d,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal$1(l, x, d, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let ld = l.d;
    let lv = l.v;
    let ll = l.l;
    if (height$1(ll) >= height$1(lr)) {
      return create$1(ll, lv, ld, create$1(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create$1(create$1(ll, lv, ld, lr.l), lr.v, lr.d, create$1(lr.r, x, d, r));
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
            l: l,
            v: x,
            d: d,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rd = r.d;
  let rv = r.v;
  let rl = r.l;
  if (height$1(rr) >= height$1(rl)) {
    return create$1(create$1(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create$1(create$1(l, x, d, rl.l), rl.v, rl.d, create$1(rl.r, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function add$1(x, data, m) {
  if (typeof m !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            d: data,
            r: "Empty",
            h: 1
          };
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    if (d === data) {
      return m;
    } else {
      return {
              TAG: "Node",
              l: l,
              v: x,
              d: data,
              r: r,
              h: m.h
            };
    }
  }
  if (c < 0) {
    let ll = add$1(x, data, l);
    if (l === ll) {
      return m;
    } else {
      return bal$1(ll, v, d, r);
    }
  }
  let rr = add$1(x, data, r);
  if (r === rr) {
    return m;
  } else {
    return bal$1(l, v, d, rr);
  }
}

function find$1(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let c = Caml.string_compare(x, param.v);
    if (c === 0) {
      return param.d;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

let s = List.fold_left((function (acc, param) {
        return add$1(param[0], param[1], acc);
      }), "Empty", {
      hd: [
        "10",
        /* 'a' */97
      ],
      tl: {
        hd: [
          "3",
          /* 'b' */98
        ],
        tl: {
          hd: [
            "7",
            /* 'c' */99
          ],
          tl: {
            hd: [
              "20",
              /* 'd' */100
            ],
            tl: /* [] */0
          }
        }
      }
    });

Mt.from_pair_suites("Map_find_test", {
      hd: [
        "int",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: find(10, m),
                    _1: /* 'a' */97
                  };
          })
      ],
      tl: {
        hd: [
          "string",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: find$1("10", s),
                      _1: /* 'a' */97
                    };
            })
        ],
        tl: /* [] */0
      }
    });

/* m Not a pure module */
