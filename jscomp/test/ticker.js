'use strict';

let Caml = require("../../lib/js/caml.js");
let List = require("../../lib/js/list.js");
let Curry = require("../../lib/js/curry.js");
let $$String = require("../../lib/js/string.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Pervasives = require("../../lib/js/pervasives.js");
let Caml_format = require("../../lib/js/caml_format.js");
let Caml_option = require("../../lib/js/caml_option.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function split(delim, s) {
  let len = s.length;
  if (len !== 0) {
    let _l = /* [] */0;
    let _i = len;
    while(true) {
      let i = _i;
      let l = _l;
      if (i === 0) {
        return l;
      }
      let i$p;
      try {
        i$p = $$String.rindex_from(s, i - 1 | 0, delim);
      }
      catch (raw_exn){
        let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === "Not_found") {
          return {
                  hd: $$String.sub(s, 0, i),
                  tl: l
                };
        }
        throw exn;
      }
      let l_0 = $$String.sub(s, i$p + 1 | 0, (i - i$p | 0) - 1 | 0);
      let l$1 = {
        hd: l_0,
        tl: l
      };
      let l$2 = i$p === 0 ? ({
            hd: "",
            tl: l$1
          }) : l$1;
      _i = i$p;
      _l = l$2;
      continue ;
    };
  } else {
    return /* [] */0;
  }
}

function string_of_float_option(x) {
  if (x !== undefined) {
    return Pervasives.string_of_float(x);
  } else {
    return "nan";
  }
}

let Util = {
  split: split,
  string_of_float_option: string_of_float_option
};

function string_of_rank(i) {
  if (typeof i !== "object") {
    if (i === "Uninitialized") {
      return "Uninitialized";
    } else {
      return "Visited";
    }
  } else {
    return "Ranked(" + i._0 + ")";
  }
}

function find_ticker_by_name(all_tickers, ticker) {
  return List.find((function (param) {
                return param.ticker_name === ticker;
              }), all_tickers);
}

function print_all_composite(all_tickers) {
  List.iter((function (param) {
          let tmp = param.type_;
          if (typeof tmp !== "object") {
            return ;
          }
          console.log(param.ticker_name);
        }), all_tickers);
}

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

function singleton(x, d) {
  return {
          TAG: "Node",
          l: "Empty",
          v: x,
          d: d,
          r: "Empty",
          h: 1
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

function is_empty(param) {
  if (typeof param !== "object") {
    return true;
  } else {
    return false;
  }
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
  let c = Caml_obj.compare(x, v);
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
    let c = Caml_obj.compare(x, param.v);
    if (c === 0) {
      return param.d;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function find_first(f, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let v = param.v;
    if (Curry._1(f, v)) {
      let _v0 = v;
      let _d0 = param.d;
      let _param$1 = param.l;
      while(true) {
        let param$1 = _param$1;
        let d0 = _d0;
        let v0 = _v0;
        if (typeof param$1 !== "object") {
          return [
                  v0,
                  d0
                ];
        }
        let v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.l;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.r;
        continue ;
      };
    }
    _param = param.r;
    continue ;
  };
}

function find_first_opt(f, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    let v = param.v;
    if (Curry._1(f, v)) {
      let _v0 = v;
      let _d0 = param.d;
      let _param$1 = param.l;
      while(true) {
        let param$1 = _param$1;
        let d0 = _d0;
        let v0 = _v0;
        if (typeof param$1 !== "object") {
          return [
                  v0,
                  d0
                ];
        }
        let v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.l;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.r;
        continue ;
      };
    }
    _param = param.r;
    continue ;
  };
}

function find_last(f, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let v = param.v;
    if (Curry._1(f, v)) {
      let _v0 = v;
      let _d0 = param.d;
      let _param$1 = param.r;
      while(true) {
        let param$1 = _param$1;
        let d0 = _d0;
        let v0 = _v0;
        if (typeof param$1 !== "object") {
          return [
                  v0,
                  d0
                ];
        }
        let v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.r;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.l;
        continue ;
      };
    }
    _param = param.l;
    continue ;
  };
}

function find_last_opt(f, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    let v = param.v;
    if (Curry._1(f, v)) {
      let _v0 = v;
      let _d0 = param.d;
      let _param$1 = param.r;
      while(true) {
        let param$1 = _param$1;
        let d0 = _d0;
        let v0 = _v0;
        if (typeof param$1 !== "object") {
          return [
                  v0,
                  d0
                ];
        }
        let v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.r;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.l;
        continue ;
      };
    }
    _param = param.l;
    continue ;
  };
}

function find_opt(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    let c = Caml_obj.compare(x, param.v);
    if (c === 0) {
      return Caml_option.some(param.d);
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function mem(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let c = Caml_obj.compare(x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function min_binding(_param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let l = param.l;
    if (typeof l !== "object") {
      return [
              param.v,
              param.d
            ];
    }
    _param = l;
    continue ;
  };
}

function min_binding_opt(_param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    let l = param.l;
    if (typeof l !== "object") {
      return [
              param.v,
              param.d
            ];
    }
    _param = l;
    continue ;
  };
}

function max_binding(_param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let r = param.r;
    if (typeof r !== "object") {
      return [
              param.v,
              param.d
            ];
    }
    _param = r;
    continue ;
  };
}

function max_binding_opt(_param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    let r = param.r;
    if (typeof r !== "object") {
      return [
              param.v,
              param.d
            ];
    }
    _param = r;
    continue ;
  };
}

function remove_min_binding(param) {
  if (typeof param !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.remove_min_elt",
          Error: new Error()
        };
  }
  let l = param.l;
  if (typeof l !== "object") {
    return param.r;
  } else {
    return bal(remove_min_binding(l), param.v, param.d, param.r);
  }
}

function merge(t1, t2) {
  if (typeof t1 !== "object") {
    return t2;
  }
  if (typeof t2 !== "object") {
    return t1;
  }
  let match = min_binding(t2);
  return bal(t1, match[0], match[1], remove_min_binding(t2));
}

function remove(x, m) {
  if (typeof m !== "object") {
    return "Empty";
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let c = Caml_obj.compare(x, v);
  if (c === 0) {
    return merge(l, r);
  }
  if (c < 0) {
    let ll = remove(x, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  let rr = remove(x, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function update(x, f, m) {
  if (typeof m !== "object") {
    let data = Curry._1(f, undefined);
    if (data !== undefined) {
      return {
              TAG: "Node",
              l: "Empty",
              v: x,
              d: Caml_option.valFromOption(data),
              r: "Empty",
              h: 1
            };
    } else {
      return "Empty";
    }
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let c = Caml_obj.compare(x, v);
  if (c === 0) {
    let data$1 = Curry._1(f, Caml_option.some(d));
    if (data$1 === undefined) {
      return merge(l, r);
    }
    let data$2 = Caml_option.valFromOption(data$1);
    if (d === data$2) {
      return m;
    } else {
      return {
              TAG: "Node",
              l: l,
              v: x,
              d: data$2,
              r: r,
              h: m.h
            };
    }
  }
  if (c < 0) {
    let ll = update(x, f, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  let rr = update(x, f, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function iter(f, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return ;
    }
    iter(f, param.l);
    Curry._2(f, param.v, param.d);
    _param = param.r;
    continue ;
  };
}

function map(f, param) {
  if (typeof param !== "object") {
    return "Empty";
  }
  let l$p = map(f, param.l);
  let d$p = Curry._1(f, param.d);
  let r$p = map(f, param.r);
  return {
          TAG: "Node",
          l: l$p,
          v: param.v,
          d: d$p,
          r: r$p,
          h: param.h
        };
}

function mapi(f, param) {
  if (typeof param !== "object") {
    return "Empty";
  }
  let v = param.v;
  let l$p = mapi(f, param.l);
  let d$p = Curry._2(f, v, param.d);
  let r$p = mapi(f, param.r);
  return {
          TAG: "Node",
          l: l$p,
          v: v,
          d: d$p,
          r: r$p,
          h: param.h
        };
}

function fold(f, _m, _accu) {
  while(true) {
    let accu = _accu;
    let m = _m;
    if (typeof m !== "object") {
      return accu;
    }
    _accu = Curry._3(f, m.v, m.d, fold(f, m.l, accu));
    _m = m.r;
    continue ;
  };
}

function for_all(p, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return true;
    }
    if (!Curry._2(p, param.v, param.d)) {
      return false;
    }
    if (!for_all(p, param.l)) {
      return false;
    }
    _param = param.r;
    continue ;
  };
}

function exists(p, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    if (Curry._2(p, param.v, param.d)) {
      return true;
    }
    if (exists(p, param.l)) {
      return true;
    }
    _param = param.r;
    continue ;
  };
}

function add_min_binding(k, x, param) {
  if (typeof param !== "object") {
    return singleton(k, x);
  } else {
    return bal(add_min_binding(k, x, param.l), param.v, param.d, param.r);
  }
}

function add_max_binding(k, x, param) {
  if (typeof param !== "object") {
    return singleton(k, x);
  } else {
    return bal(param.l, param.v, param.d, add_max_binding(k, x, param.r));
  }
}

function join(l, v, d, r) {
  if (typeof l !== "object") {
    return add_min_binding(v, d, r);
  }
  let lh = l.h;
  if (typeof r !== "object") {
    return add_max_binding(v, d, l);
  }
  let rh = r.h;
  if (lh > (rh + 2 | 0)) {
    return bal(l.l, l.v, l.d, join(l.r, v, d, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(l, v, d, r.l), r.v, r.d, r.r);
  } else {
    return create(l, v, d, r);
  }
}

function concat(t1, t2) {
  if (typeof t1 !== "object") {
    return t2;
  }
  if (typeof t2 !== "object") {
    return t1;
  }
  let match = min_binding(t2);
  return join(t1, match[0], match[1], remove_min_binding(t2));
}

function concat_or_join(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function split$1(x, param) {
  if (typeof param !== "object") {
    return [
            "Empty",
            undefined,
            "Empty"
          ];
  }
  let r = param.r;
  let d = param.d;
  let v = param.v;
  let l = param.l;
  let c = Caml_obj.compare(x, v);
  if (c === 0) {
    return [
            l,
            Caml_option.some(d),
            r
          ];
  }
  if (c < 0) {
    let match = split$1(x, l);
    return [
            match[0],
            match[1],
            join(match[2], v, d, r)
          ];
  }
  let match$1 = split$1(x, r);
  return [
          join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function merge$1(f, s1, s2) {
  if (typeof s1 !== "object") {
    if (typeof s2 !== "object") {
      return "Empty";
    }
    
  } else {
    let v1 = s1.v;
    if (s1.h >= height(s2)) {
      let match = split$1(v1, s2);
      return concat_or_join(merge$1(f, s1.l, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1.d), match[1]), merge$1(f, s1.r, match[2]));
    }
    
  }
  if (typeof s2 !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "map.ml",
            393,
            10
          ],
          Error: new Error()
        };
  }
  let v2 = s2.v;
  let match$1 = split$1(v2, s1);
  return concat_or_join(merge$1(f, match$1[0], s2.l), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2.d)), merge$1(f, match$1[2], s2.r));
}

function union(f, s1, s2) {
  if (typeof s1 !== "object") {
    return s2;
  }
  let d1 = s1.d;
  let v1 = s1.v;
  if (typeof s2 !== "object") {
    return s1;
  }
  let d2 = s2.d;
  let v2 = s2.v;
  if (s1.h >= s2.h) {
    let match = split$1(v1, s2);
    let d2$1 = match[1];
    let l = union(f, s1.l, match[0]);
    let r = union(f, s1.r, match[2]);
    if (d2$1 !== undefined) {
      return concat_or_join(l, v1, Curry._3(f, v1, d1, Caml_option.valFromOption(d2$1)), r);
    } else {
      return join(l, v1, d1, r);
    }
  }
  let match$1 = split$1(v2, s1);
  let d1$1 = match$1[1];
  let l$1 = union(f, match$1[0], s2.l);
  let r$1 = union(f, match$1[2], s2.r);
  if (d1$1 !== undefined) {
    return concat_or_join(l$1, v2, Curry._3(f, v2, Caml_option.valFromOption(d1$1), d2), r$1);
  } else {
    return join(l$1, v2, d2, r$1);
  }
}

function filter(p, m) {
  if (typeof m !== "object") {
    return "Empty";
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let l$p = filter(p, l);
  let pvd = Curry._2(p, v, d);
  let r$p = filter(p, r);
  if (pvd) {
    if (l === l$p && r === r$p) {
      return m;
    } else {
      return join(l$p, v, d, r$p);
    }
  } else {
    return concat(l$p, r$p);
  }
}

function partition(p, param) {
  if (typeof param !== "object") {
    return [
            "Empty",
            "Empty"
          ];
  }
  let d = param.d;
  let v = param.v;
  let match = partition(p, param.l);
  let lf = match[1];
  let lt = match[0];
  let pvd = Curry._2(p, v, d);
  let match$1 = partition(p, param.r);
  let rf = match$1[1];
  let rt = match$1[0];
  if (pvd) {
    return [
            join(lt, v, d, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, v, d, rf)
          ];
  }
}

function cons_enum(_m, _e) {
  while(true) {
    let e = _e;
    let m = _m;
    if (typeof m !== "object") {
      return e;
    }
    _e = {
      TAG: "More",
      _0: m.v,
      _1: m.d,
      _2: m.r,
      _3: e
    };
    _m = m.l;
    continue ;
  };
}

function compare(cmp, m1, m2) {
  let _e1 = cons_enum(m1, "End");
  let _e2 = cons_enum(m2, "End");
  while(true) {
    let e2 = _e2;
    let e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return 0;
      } else {
        return -1;
      }
    }
    if (typeof e2 !== "object") {
      return 1;
    }
    let c = Caml_obj.compare(e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    let c$1 = Curry._2(cmp, e1._1, e2._1);
    if (c$1 !== 0) {
      return c$1;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function equal(cmp, m1, m2) {
  let _e1 = cons_enum(m1, "End");
  let _e2 = cons_enum(m2, "End");
  while(true) {
    let e2 = _e2;
    let e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return true;
      } else {
        return false;
      }
    }
    if (typeof e2 !== "object") {
      return false;
    }
    if (!Caml_obj.equal(e1._0, e2._0)) {
      return false;
    }
    if (!Curry._2(cmp, e1._1, e2._1)) {
      return false;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function cardinal(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return (cardinal(param.l) + 1 | 0) + cardinal(param.r) | 0;
  }
}

function bindings_aux(_accu, _param) {
  while(true) {
    let param = _param;
    let accu = _accu;
    if (typeof param !== "object") {
      return accu;
    }
    _param = param.l;
    _accu = {
      hd: [
        param.v,
        param.d
      ],
      tl: bindings_aux(accu, param.r)
    };
    continue ;
  };
}

function bindings(s) {
  return bindings_aux(/* [] */0, s);
}

let Ticker_map = {
  empty: "Empty",
  is_empty: is_empty,
  mem: mem,
  add: add,
  update: update,
  singleton: singleton,
  remove: remove,
  merge: merge$1,
  union: union,
  compare: compare,
  equal: equal,
  iter: iter,
  fold: fold,
  for_all: for_all,
  exists: exists,
  filter: filter,
  partition: partition,
  cardinal: cardinal,
  bindings: bindings,
  min_binding: min_binding,
  min_binding_opt: min_binding_opt,
  max_binding: max_binding,
  max_binding_opt: max_binding_opt,
  choose: min_binding,
  choose_opt: min_binding_opt,
  split: split$1,
  find: find,
  find_opt: find_opt,
  find_first: find_first,
  find_first_opt: find_first_opt,
  find_last: find_last,
  find_last_opt: find_last_opt,
  map: map,
  mapi: mapi
};

function compute_update_sequences(all_tickers) {
  List.fold_left((function (counter, ticker) {
          let loop = function (counter, ticker) {
            let rank = ticker.rank;
            if (typeof rank === "object") {
              return counter;
            }
            if (rank !== "Uninitialized") {
              return counter;
            }
            ticker.rank = "Visited";
            let match = ticker.type_;
            if (typeof match !== "object") {
              let counter$1 = counter + 1 | 0;
              ticker.rank = {
                TAG: "Ranked",
                _0: counter$1
              };
              return counter$1;
            }
            let match$1 = match._0;
            let counter$2 = loop(counter, match$1.lhs);
            let counter$3 = loop(counter$2, match$1.rhs);
            let counter$4 = counter$3 + 1 | 0;
            ticker.rank = {
              TAG: "Ranked",
              _0: counter$4
            };
            return counter$4;
          };
          return loop(counter, ticker);
        }), 0, all_tickers);
  let map = List.fold_left((function (map, ticker) {
          let tmp = ticker.type_;
          if (typeof tmp !== "object") {
            return add(ticker.ticker_name, {
                        hd: ticker,
                        tl: /* [] */0
                      }, map);
          }
          let loop = function (_up, _map, _ticker) {
            while(true) {
              let ticker = _ticker;
              let map = _map;
              let up = _up;
              let type_ = ticker.type_;
              let ticker_name = ticker.ticker_name;
              if (typeof type_ !== "object") {
                let l = find(ticker_name, map);
                return add(ticker_name, Pervasives.$at(up, l), map);
              }
              let match = type_._0;
              let map$1 = loop({
                    hd: ticker,
                    tl: up
                  }, map, match.lhs);
              _ticker = match.rhs;
              _map = map$1;
              _up = {
                hd: ticker,
                tl: up
              };
              continue ;
            };
          };
          return loop(/* [] */0, map, ticker);
        }), "Empty", List.rev(all_tickers));
  return fold((function (k, l, map) {
                let l$1 = List.sort_uniq((function (lhs, rhs) {
                        let x = lhs.rank;
                        if (typeof x !== "object") {
                          if (x === "Uninitialized") {
                            throw {
                                  RE_EXN_ID: "Failure",
                                  _1: "All nodes should be ranked",
                                  Error: new Error()
                                };
                          }
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "All nodes should be ranked",
                                Error: new Error()
                              };
                        } else {
                          let y = rhs.rank;
                          if (typeof y === "object") {
                            return Caml.int_compare(x._0, y._0);
                          }
                          if (y === "Uninitialized") {
                            throw {
                                  RE_EXN_ID: "Failure",
                                  _1: "All nodes should be ranked",
                                  Error: new Error()
                                };
                          }
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "All nodes should be ranked",
                                Error: new Error()
                              };
                        }
                      }), l);
                return add(k, l$1, map);
              }), map, map);
}

function process_quote(ticker_map, new_ticker, new_value) {
  let update_sequence = find(new_ticker, ticker_map);
  List.iter((function (ticker) {
          let match = ticker.type_;
          if (typeof match !== "object") {
            if (ticker.ticker_name === new_ticker) {
              ticker.value = new_value;
              return ;
            }
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Only single Market ticker should be udpated upon a new quote",
                  Error: new Error()
                };
          }
          let match$1 = match._0;
          let match$2 = match$1.lhs.value;
          let match$3 = match$1.rhs.value;
          let value = match$2 !== undefined && match$3 !== undefined ? (
              match$1.op === "PLUS" ? match$2 + match$3 : match$2 - match$3
            ) : undefined;
          ticker.value = value;
        }), update_sequence);
}

function process_input_line(ticker_map, all_tickers, line) {
  let make_binary_op = function (ticker_name, lhs, rhs, op) {
    let lhs$1 = find_ticker_by_name(all_tickers, lhs);
    let rhs$1 = find_ticker_by_name(all_tickers, rhs);
    return {
            value: undefined,
            rank: "Uninitialized",
            ticker_name: ticker_name,
            type_: {
              TAG: "Binary_op",
              _0: {
                op: op,
                rhs: rhs$1,
                lhs: lhs$1
              }
            }
          };
  };
  let tokens = split(/* '|' */124, line);
  if (tokens) {
    switch (tokens.hd) {
      case "Q" :
          let match = tokens.tl;
          if (match) {
            let match$1 = match.tl;
            if (match$1) {
              if (match$1.tl) {
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Invalid input line",
                      Error: new Error()
                    };
              }
              let ticker_map$1 = ticker_map !== undefined ? Caml_option.valFromOption(ticker_map) : compute_update_sequences(all_tickers);
              let value = Caml_format.float_of_string(match$1.hd);
              process_quote(ticker_map$1, match.hd, value);
              return [
                      all_tickers,
                      Caml_option.some(ticker_map$1)
                    ];
            }
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Invalid input line",
                  Error: new Error()
                };
          }
          throw {
                RE_EXN_ID: "Failure",
                _1: "Invalid input line",
                Error: new Error()
              };
      case "R" :
          let match$2 = tokens.tl;
          if (match$2) {
            let match$3 = match$2.tl;
            if (match$3) {
              let ticker_name = match$2.hd;
              switch (match$3.hd) {
                case "+" :
                    let match$4 = match$3.tl;
                    if (match$4) {
                      let match$5 = match$4.tl;
                      if (match$5) {
                        if (match$5.tl) {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "Invalid input line",
                                Error: new Error()
                              };
                        }
                        return [
                                {
                                  hd: make_binary_op(ticker_name, match$4.hd, match$5.hd, "PLUS"),
                                  tl: all_tickers
                                },
                                ticker_map
                              ];
                      }
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Invalid input line",
                          Error: new Error()
                        };
                case "-" :
                    let match$6 = match$3.tl;
                    if (match$6) {
                      let match$7 = match$6.tl;
                      if (match$7) {
                        if (match$7.tl) {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "Invalid input line",
                                Error: new Error()
                              };
                        }
                        return [
                                {
                                  hd: make_binary_op(ticker_name, match$6.hd, match$7.hd, "MINUS"),
                                  tl: all_tickers
                                },
                                ticker_map
                              ];
                      }
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Invalid input line",
                          Error: new Error()
                        };
                case "S" :
                    if (match$3.tl) {
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    return [
                            {
                              hd: {
                                value: undefined,
                                rank: "Uninitialized",
                                ticker_name: ticker_name,
                                type_: "Market"
                              },
                              tl: all_tickers
                            },
                            ticker_map
                          ];
                default:
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "Invalid input line",
                        Error: new Error()
                      };
              }
            } else {
              throw {
                    RE_EXN_ID: "Failure",
                    _1: "Invalid input line",
                    Error: new Error()
                  };
            }
          } else {
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Invalid input line",
                  Error: new Error()
                };
          }
      default:
        throw {
              RE_EXN_ID: "Failure",
              _1: "Invalid input line",
              Error: new Error()
            };
    }
  } else {
    throw {
          RE_EXN_ID: "Failure",
          _1: "Invalid input line",
          Error: new Error()
        };
  }
}

function loop(_lines, _param) {
  while(true) {
    let param = _param;
    let lines = _lines;
    let all_tickers = param[0];
    if (!lines) {
      return print_all_composite(all_tickers);
    }
    _param = process_input_line(param[1], all_tickers, lines.hd);
    _lines = lines.tl;
    continue ;
  };
}

let lines = {
  hd: "R|MSFT|S",
  tl: {
    hd: "R|IBM|S",
    tl: {
      hd: "R|FB|S",
      tl: {
        hd: "R|CP1|+|MSFT|IBM",
        tl: {
          hd: "R|CP2|-|FB|IBM",
          tl: {
            hd: "R|CP12|+|CP1|CP2",
            tl: {
              hd: "Q|MSFT|120.",
              tl: {
                hd: "Q|IBM|130.",
                tl: {
                  hd: "Q|FB|80.",
                  tl: /* [] */0
                }
              }
            }
          }
        }
      }
    }
  }
};

exports.Util = Util;
exports.string_of_rank = string_of_rank;
exports.find_ticker_by_name = find_ticker_by_name;
exports.print_all_composite = print_all_composite;
exports.Ticker_map = Ticker_map;
exports.compute_update_sequences = compute_update_sequences;
exports.process_quote = process_quote;
exports.process_input_line = process_input_line;
exports.lines = lines;
exports.loop = loop;
/* No side effect */
