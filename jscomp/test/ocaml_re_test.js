'use strict';

let Mt = require("./mt.js");
let Caml = require("../../lib/js/caml.js");
let Char = require("../../lib/js/char.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let Bytes = require("../../lib/js/bytes.js");
let Curry = require("../../lib/js/curry.js");
let $$String = require("../../lib/js/string.js");
let Hashtbl = require("../../lib/js/hashtbl.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Caml_array = require("../../lib/js/caml_array.js");
let Caml_bytes = require("../../lib/js/caml_bytes.js");
let Pervasives = require("../../lib/js/pervasives.js");
let Caml_option = require("../../lib/js/caml_option.js");
let Caml_string = require("../../lib/js/caml_string.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

function union(_l, _l$p) {
  while(true) {
    let l$p = _l$p;
    let l = _l;
    if (!l$p) {
      return l;
    }
    if (!l) {
      return l$p;
    }
    let r$p = l$p.tl;
    let match = l$p.hd;
    let c2$p = match[1];
    let c1$p = match[0];
    let r = l.tl;
    let match$1 = l.hd;
    let c2 = match$1[1];
    let c1 = match$1[0];
    if ((c2 + 1 | 0) < c1$p) {
      return {
              hd: [
                c1,
                c2
              ],
              tl: union(r, l$p)
            };
    }
    if ((c2$p + 1 | 0) < c1) {
      return {
              hd: [
                c1$p,
                c2$p
              ],
              tl: union(l, r$p)
            };
    }
    if (c2 < c2$p) {
      _l$p = {
        hd: [
          c1 < c1$p ? c1 : c1$p,
          c2$p
        ],
        tl: r$p
      };
      _l = r;
      continue ;
    }
    _l$p = r$p;
    _l = {
      hd: [
        c1 < c1$p ? c1 : c1$p,
        c2
      ],
      tl: r
    };
    continue ;
  };
}

function inter(_l, _l$p) {
  while(true) {
    let l$p = _l$p;
    let l = _l;
    if (!l$p) {
      return /* [] */0;
    }
    if (!l) {
      return /* [] */0;
    }
    let r$p = l$p.tl;
    let match = l$p.hd;
    let c2$p = match[1];
    let c1$p = match[0];
    let r = l.tl;
    let match$1 = l.hd;
    let c2 = match$1[1];
    let c1 = match$1[0];
    if (Caml_obj.lessthan(c2, c1$p)) {
      _l = r;
      continue ;
    }
    if (!Caml_obj.lessthan(c2$p, c1)) {
      if (Caml_obj.lessthan(c2, c2$p)) {
        return {
                hd: [
                  Caml_obj.max(c1, c1$p),
                  c2
                ],
                tl: inter(r, l$p)
              };
      } else {
        return {
                hd: [
                  Caml_obj.max(c1, c1$p),
                  c2$p
                ],
                tl: inter(l, r$p)
              };
      }
    }
    _l$p = r$p;
    continue ;
  };
}

function diff(_l, _l$p) {
  while(true) {
    let l$p = _l$p;
    let l = _l;
    if (!l$p) {
      return l;
    }
    if (!l) {
      return /* [] */0;
    }
    let r$p = l$p.tl;
    let match = l$p.hd;
    let c2$p = match[1];
    let c1$p = match[0];
    let r = l.tl;
    let match$1 = l.hd;
    let c2 = match$1[1];
    let c1 = match$1[0];
    if (c2 < c1$p) {
      return {
              hd: [
                c1,
                c2
              ],
              tl: diff(r, l$p)
            };
    }
    if (c2$p < c1) {
      _l$p = r$p;
      continue ;
    }
    let r$p$p = c2$p < c2 ? ({
          hd: [
            c2$p + 1 | 0,
            c2
          ],
          tl: r
        }) : r;
    if (c1 < c1$p) {
      return {
              hd: [
                c1,
                c1$p - 1 | 0
              ],
              tl: diff(r$p$p, r$p)
            };
    }
    _l$p = r$p;
    _l = r$p$p;
    continue ;
  };
}

function single(c) {
  return {
          hd: [
            c,
            c
          ],
          tl: /* [] */0
        };
}

function seq(c, c$p) {
  if (Caml_obj.lessequal(c, c$p)) {
    return {
            hd: [
              c,
              c$p
            ],
            tl: /* [] */0
          };
  } else {
    return {
            hd: [
              c$p,
              c
            ],
            tl: /* [] */0
          };
  }
}

function offset(o, l) {
  if (!l) {
    return /* [] */0;
  }
  let match = l.hd;
  return {
          hd: [
            match[0] + o | 0,
            match[1] + o | 0
          ],
          tl: offset(o, l.tl)
        };
}

function mem(c, _s) {
  while(true) {
    let s = _s;
    if (!s) {
      return false;
    }
    let match = s.hd;
    if (c <= match[1]) {
      return c >= match[0];
    }
    _s = s.tl;
    continue ;
  };
}

function hash_rec(param) {
  if (!param) {
    return 0;
  }
  let match = param.hd;
  return (match[0] + Math.imul(13, match[1]) | 0) + Math.imul(257, hash_rec(param.tl)) | 0;
}

function one_char(param) {
  if (!param) {
    return ;
  }
  if (param.tl) {
    return ;
  }
  let match = param.hd;
  let i = match[0];
  if (Caml_obj.equal(i, match[1])) {
    return Caml_option.some(i);
  }
  
}

function compare(param, param$1) {
  let c = Caml_obj.compare(param[0], param$1[0]);
  if (c !== 0) {
    return c;
  } else {
    return Caml_obj.compare(param[1], param$1[1]);
  }
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
  let c = compare(x, v);
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

let cany = {
  hd: [
    0,
    255
  ],
  tl: /* [] */0
};

function intersect(x, y) {
  return (x & y) !== 0;
}

function $plus$plus(x, y) {
  return x | y;
}

function from_char(param) {
  if (param >= 170) {
    if (param >= 192) {
      if (param > 255 || param < 216) {
        if (param >= 215) {
          return 4;
        } else {
          return 2;
        }
      } else if (param !== 247) {
        return 2;
      } else {
        return 4;
      }
    } else if (param > 185 || param < 171) {
      if (param >= 187) {
        return 4;
      } else {
        return 2;
      }
    } else if (param !== 181) {
      return 4;
    } else {
      return 2;
    }
  } else if (param >= 65) {
    if (param > 96 || param < 91) {
      if (param >= 123) {
        return 4;
      } else {
        return 2;
      }
    } else if (param !== 95) {
      return 4;
    } else {
      return 2;
    }
  } else if (param >= 48) {
    if (param >= 58) {
      return 4;
    } else {
      return 2;
    }
  } else if (param !== 10) {
    return 4;
  } else {
    return 12;
  }
}

function height$1(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create$1(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  return {
          TAG: "Node",
          l: l,
          v: v,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal$1(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let lv = l.v;
    let ll = l.l;
    if (height$1(ll) >= height$1(lr)) {
      return create$1(ll, lv, create$1(lr, v, r));
    }
    if (typeof lr === "object") {
      return create$1(create$1(ll, lv, lr.l), lr.v, create$1(lr.r, v, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            l: l,
            v: v,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rv = r.v;
  let rl = r.l;
  if (height$1(rr) >= height$1(rl)) {
    return create$1(create$1(l, v, rl), rv, rr);
  }
  if (typeof rl === "object") {
    return create$1(create$1(l, v, rl.l), rl.v, create$1(rl.r, rv, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.bal",
        Error: new Error()
      };
}

function add$1(x, t) {
  if (typeof t !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            r: "Empty",
            h: 1
          };
  }
  let r = t.r;
  let v = t.v;
  let l = t.l;
  let c = Caml.int_compare(x, v);
  if (c === 0) {
    return t;
  }
  if (c < 0) {
    let ll = add$1(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal$1(ll, v, r);
    }
  }
  let rr = add$1(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal$1(l, v, rr);
  }
}

function hash_combine(h, accu) {
  return Math.imul(accu, 65599) + h | 0;
}

let empty = {
  marks: /* [] */0,
  pmarks: "Empty"
};

function hash(m, accu) {
  let _l = m.marks;
  let _accu = hash_combine(Hashtbl.hash(m.pmarks), accu);
  while(true) {
    let accu$1 = _accu;
    let l = _l;
    if (!l) {
      return accu$1;
    }
    let match = l.hd;
    _accu = hash_combine(match[0], hash_combine(match[1], accu$1));
    _l = l.tl;
    continue ;
  };
}

function marks_set_idx(idx, marks) {
  if (!marks) {
    return marks;
  }
  let match = marks.hd;
  if (match[1] !== -1) {
    return marks;
  } else {
    return {
            hd: [
              match[0],
              idx
            ],
            tl: marks_set_idx(idx, marks.tl)
          };
  }
}

function marks_set_idx$1(marks, idx) {
  return {
          marks: marks_set_idx(idx, marks.marks),
          pmarks: marks.pmarks
        };
}

function first(f, _param) {
  while(true) {
    let param = _param;
    if (!param) {
      return ;
    }
    let res = Curry._1(f, param.hd);
    if (res !== undefined) {
      return res;
    }
    _param = param.tl;
    continue ;
  };
}

let eps_expr = {
  id: 0,
  def: "Eps"
};

function mk_expr(ids, def) {
  ids.contents = ids.contents + 1 | 0;
  return {
          id: ids.contents,
          def: def
        };
}

function cst(ids, s) {
  if (s ? false : true) {
    return mk_expr(ids, {
                TAG: "Alt",
                _0: /* [] */0
              });
  } else {
    return mk_expr(ids, {
                TAG: "Cst",
                _0: s
              });
  }
}

function alt(ids, l) {
  if (l) {
    if (l.tl) {
      return mk_expr(ids, {
                  TAG: "Alt",
                  _0: l
                });
    } else {
      return l.hd;
    }
  } else {
    return mk_expr(ids, {
                TAG: "Alt",
                _0: /* [] */0
              });
  }
}

function seq$1(ids, kind, x, y) {
  let match = x.def;
  let match$1 = y.def;
  let exit = 0;
  if (typeof match !== "object") {
    return y;
  }
  if (match.TAG === "Alt") {
    if (!match._0) {
      return x;
    }
    exit = 2;
  } else {
    exit = 2;
  }
  if (exit === 2) {
    if (typeof match$1 !== "object") {
      if (kind === "First") {
        return x;
      }
      
    } else if (match$1.TAG === "Alt" && !match$1._0) {
      return y;
    }
    
  }
  return mk_expr(ids, {
              TAG: "Seq",
              _0: kind,
              _1: x,
              _2: y
            });
}

function is_eps(expr) {
  let match = expr.def;
  if (typeof match !== "object") {
    return true;
  } else {
    return false;
  }
}

function rep(ids, kind, sem, x) {
  return mk_expr(ids, {
              TAG: "Rep",
              _0: kind,
              _1: sem,
              _2: x
            });
}

function erase(ids, m, m$p) {
  return mk_expr(ids, {
              TAG: "Erase",
              _0: m,
              _1: m$p
            });
}

function rename(ids, x) {
  let l = x.def;
  if (typeof l !== "object") {
    return mk_expr(ids, x.def);
  }
  switch (l.TAG) {
    case "Alt" :
        return mk_expr(ids, {
                    TAG: "Alt",
                    _0: List.map((function (param) {
                            return rename(ids, param);
                          }), l._0)
                  });
    case "Seq" :
        return mk_expr(ids, {
                    TAG: "Seq",
                    _0: l._0,
                    _1: rename(ids, l._1),
                    _2: rename(ids, l._2)
                  });
    case "Rep" :
        return mk_expr(ids, {
                    TAG: "Rep",
                    _0: l._0,
                    _1: l._1,
                    _2: rename(ids, l._2)
                  });
    default:
      return mk_expr(ids, x.def);
  }
}

function equal(_l1, _l2) {
  while(true) {
    let l2 = _l2;
    let l1 = _l1;
    if (!l1) {
      if (l2) {
        return false;
      } else {
        return true;
      }
    }
    let marks1 = l1.hd;
    switch (marks1.TAG) {
      case "TSeq" :
          if (!l2) {
            return false;
          }
          let match = l2.hd;
          switch (match.TAG) {
            case "TSeq" :
                if (marks1._1.id !== match._1.id) {
                  return false;
                }
                if (!equal(marks1._0, match._0)) {
                  return false;
                }
                _l2 = l2.tl;
                _l1 = l1.tl;
                continue ;
            case "TExp" :
            case "TMatch" :
                return false;
            
          }
      case "TExp" :
          if (!l2) {
            return false;
          }
          let match$1 = l2.hd;
          switch (match$1.TAG) {
            case "TExp" :
                if (marks1._1.id !== match$1._1.id) {
                  return false;
                }
                if (!Caml_obj.equal(marks1._0, match$1._0)) {
                  return false;
                }
                _l2 = l2.tl;
                _l1 = l1.tl;
                continue ;
            case "TSeq" :
            case "TMatch" :
                return false;
            
          }
      case "TMatch" :
          if (!l2) {
            return false;
          }
          let marks2 = l2.hd;
          switch (marks2.TAG) {
            case "TSeq" :
            case "TExp" :
                return false;
            case "TMatch" :
                if (!Caml_obj.equal(marks1._0, marks2._0)) {
                  return false;
                }
                _l2 = l2.tl;
                _l1 = l1.tl;
                continue ;
            
          }
      
    }
  };
}

function hash$1(_l, _accu) {
  while(true) {
    let accu = _accu;
    let l = _l;
    if (!l) {
      return accu;
    }
    let marks = l.hd;
    switch (marks.TAG) {
      case "TSeq" :
          _accu = hash_combine(388635598, hash_combine(marks._1.id, hash$1(marks._0, accu)));
          _l = l.tl;
          continue ;
      case "TExp" :
          _accu = hash_combine(726404471, hash_combine(marks._1.id, hash(marks._0, accu)));
          _l = l.tl;
          continue ;
      case "TMatch" :
          _accu = hash_combine(471882453, hash(marks._0, accu));
          _l = l.tl;
          continue ;
      
    }
  };
}

function tseq(kind, x, y, rem) {
  if (!x) {
    return rem;
  }
  let match = x.hd;
  switch (match.TAG) {
    case "TExp" :
        let tmp = match._1.def;
        if (typeof tmp !== "object" && !x.tl) {
          return {
                  hd: {
                    TAG: "TExp",
                    _0: match._0,
                    _1: y
                  },
                  tl: rem
                };
        }
        break;
    case "TSeq" :
    case "TMatch" :
        break;
    
  }
  return {
          hd: {
            TAG: "TSeq",
            _0: x,
            _1: y,
            _2: kind
          },
          tl: rem
        };
}

let dummy = {
  idx: -1,
  category: -1,
  desc: /* [] */0,
  status: undefined,
  hash: -1
};

function hash$2(idx, cat, desc) {
  return hash$1(desc, hash_combine(idx, hash_combine(cat, 0))) & 1073741823;
}

function mk(idx, cat, desc) {
  return {
          idx: idx,
          category: cat,
          desc: desc,
          status: undefined,
          hash: hash$2(idx, cat, desc)
        };
}

function create$2(cat, e) {
  return mk(0, cat, {
              hd: {
                TAG: "TExp",
                _0: empty,
                _1: e
              },
              tl: /* [] */0
            });
}

function equal$1(x, y) {
  if (x.hash === y.hash && x.idx === y.idx && x.category === y.category) {
    return equal(x.desc, y.desc);
  } else {
    return false;
  }
}

function hash$3(t) {
  return t.hash;
}

let Table = Hashtbl.Make({
      equal: equal$1,
      hash: hash$3
    });

function reset_table(a) {
  $$Array.fill(a, 0, a.length, false);
}

function mark_used_indices(tbl) {
  return function (param) {
    return List.iter((function (param) {
                  switch (param.TAG) {
                    case "TSeq" :
                        return mark_used_indices(tbl)(param._0);
                    case "TExp" :
                    case "TMatch" :
                        break;
                    
                  }
                  List.iter((function (param) {
                          let i = param[1];
                          if (i >= 0) {
                            return Caml_array.set(tbl, i, true);
                          }
                          
                        }), param._0.marks);
                }), param);
  };
}

function find_free(tbl, _idx, len) {
  while(true) {
    let idx = _idx;
    if (idx === len || !Caml_array.get(tbl, idx)) {
      return idx;
    }
    _idx = idx + 1 | 0;
    continue ;
  };
}

function free_index(tbl_ref, l) {
  let tbl = tbl_ref.contents;
  reset_table(tbl);
  mark_used_indices(tbl)(l);
  let len = tbl.length;
  let idx = find_free(tbl, 0, len);
  if (idx === len) {
    tbl_ref.contents = Caml_array.make((len << 1), false);
  }
  return idx;
}

let remove_matches = List.filter(function (param) {
      switch (param.TAG) {
        case "TSeq" :
        case "TExp" :
            return true;
        case "TMatch" :
            return false;
        
      }
    });

function split_at_match_rec(_l$p, _param) {
  while(true) {
    let param = _param;
    let l$p = _l$p;
    if (param) {
      let x = param.hd;
      switch (x.TAG) {
        case "TSeq" :
        case "TExp" :
            _param = param.tl;
            _l$p = {
              hd: x,
              tl: l$p
            };
            continue ;
        case "TMatch" :
            return [
                    List.rev(l$p),
                    Curry._1(remove_matches, param.tl)
                  ];
        
      }
    } else {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "ocaml_re_test.ml",
              748,
              21
            ],
            Error: new Error()
          };
    }
  };
}

function remove_duplicates(prev, _l, y) {
  while(true) {
    let l = _l;
    if (!l) {
      return [
              /* [] */0,
              prev
            ];
    }
    let x = l.hd;
    switch (x.TAG) {
      case "TSeq" :
          let x$1 = x._1;
          let match = remove_duplicates(prev, x._0, x$1);
          let match$1 = remove_duplicates(match[1], l.tl, y);
          return [
                  tseq(x._2, match[0], x$1, match$1[0]),
                  match$1[1]
                ];
      case "TExp" :
          let x$2 = x._1;
          let tmp = x$2.def;
          if (typeof tmp !== "object") {
            let r = l.tl;
            if (List.memq(y.id, prev)) {
              _l = r;
              continue ;
            }
            let match$2 = remove_duplicates({
                  hd: y.id,
                  tl: prev
                }, r, y);
            return [
                    {
                      hd: x,
                      tl: match$2[0]
                    },
                    match$2[1]
                  ];
          }
          let r$1 = l.tl;
          if (List.memq(x$2.id, prev)) {
            _l = r$1;
            continue ;
          }
          let match$3 = remove_duplicates({
                hd: x$2.id,
                tl: prev
              }, r$1, y);
          return [
                  {
                    hd: x,
                    tl: match$3[0]
                  },
                  match$3[1]
                ];
      case "TMatch" :
          return [
                  {
                    hd: x,
                    tl: /* [] */0
                  },
                  prev
                ];
      
    }
  };
}

function set_idx(idx, param) {
  if (!param) {
    return /* [] */0;
  }
  let marks = param.hd;
  switch (marks.TAG) {
    case "TSeq" :
        return {
                hd: {
                  TAG: "TSeq",
                  _0: set_idx(idx, marks._0),
                  _1: marks._1,
                  _2: marks._2
                },
                tl: set_idx(idx, param.tl)
              };
    case "TExp" :
        return {
                hd: {
                  TAG: "TExp",
                  _0: marks_set_idx$1(marks._0, idx),
                  _1: marks._1
                },
                tl: set_idx(idx, param.tl)
              };
    case "TMatch" :
        return {
                hd: {
                  TAG: "TMatch",
                  _0: marks_set_idx$1(marks._0, idx)
                },
                tl: set_idx(idx, param.tl)
              };
    
  }
}

function filter_marks(b, e, marks) {
  return {
          marks: List.filter(function (param) {
                  let i = param[0];
                  if (i < b) {
                    return true;
                  } else {
                    return i > e;
                  }
                })(marks.marks),
          pmarks: marks.pmarks
        };
}

function delta_1(marks, c, next_cat, prev_cat, x, rem) {
  let s = x.def;
  if (typeof s !== "object") {
    return {
            hd: {
              TAG: "TMatch",
              _0: marks
            },
            tl: rem
          };
  }
  switch (s.TAG) {
    case "Cst" :
        if (mem(c, s._0)) {
          return {
                  hd: {
                    TAG: "TExp",
                    _0: marks,
                    _1: eps_expr
                  },
                  tl: rem
                };
        } else {
          return rem;
        }
    case "Alt" :
        return delta_2(marks, c, next_cat, prev_cat, s._0, rem);
    case "Seq" :
        let y$p = delta_1(marks, c, next_cat, prev_cat, s._1, /* [] */0);
        return delta_seq(c, next_cat, prev_cat, s._0, y$p, s._2, rem);
    case "Rep" :
        let kind = s._1;
        let y$p$1 = delta_1(marks, c, next_cat, prev_cat, s._2, /* [] */0);
        let marks$p = first((function (marks) {
                switch (marks.TAG) {
                  case "TSeq" :
                  case "TExp" :
                      return ;
                  case "TMatch" :
                      return marks._0;
                  
                }
              }), y$p$1);
        let match = marks$p !== undefined ? [
            Curry._1(remove_matches, y$p$1),
            marks$p
          ] : [
            y$p$1,
            marks
          ];
        let y$p$p = match[0];
        if (s._0 === "Non_greedy") {
          return {
                  hd: {
                    TAG: "TMatch",
                    _0: marks
                  },
                  tl: tseq(kind, y$p$p, x, rem)
                };
        } else {
          return tseq(kind, y$p$p, x, {
                      hd: {
                        TAG: "TMatch",
                        _0: match[1]
                      },
                      tl: rem
                    });
        }
    case "Mark" :
        let i = s._0;
        let marks_marks = {
          hd: [
            i,
            -1
          ],
          tl: List.remove_assq(i, marks.marks)
        };
        let marks_pmarks = marks.pmarks;
        let marks$1 = {
          marks: marks_marks,
          pmarks: marks_pmarks
        };
        return {
                hd: {
                  TAG: "TMatch",
                  _0: marks$1
                },
                tl: rem
              };
    case "Erase" :
        return {
                hd: {
                  TAG: "TMatch",
                  _0: filter_marks(s._0, s._1, marks)
                },
                tl: rem
              };
    case "Before" :
        if (intersect(next_cat, s._0)) {
          return {
                  hd: {
                    TAG: "TMatch",
                    _0: marks
                  },
                  tl: rem
                };
        } else {
          return rem;
        }
    case "After" :
        if (intersect(prev_cat, s._0)) {
          return {
                  hd: {
                    TAG: "TMatch",
                    _0: marks
                  },
                  tl: rem
                };
        } else {
          return rem;
        }
    case "Pmark" :
        let marks_marks$1 = marks.marks;
        let marks_pmarks$1 = add$1(s._0, marks.pmarks);
        let marks$2 = {
          marks: marks_marks$1,
          pmarks: marks_pmarks$1
        };
        return {
                hd: {
                  TAG: "TMatch",
                  _0: marks$2
                },
                tl: rem
              };
    
  }
}

function delta_2(marks, c, next_cat, prev_cat, l, rem) {
  if (l) {
    return delta_1(marks, c, next_cat, prev_cat, l.hd, delta_2(marks, c, next_cat, prev_cat, l.tl, rem));
  } else {
    return rem;
  }
}

function delta_seq(c, next_cat, prev_cat, kind, y, z, rem) {
  let marks = first((function (marks) {
          switch (marks.TAG) {
            case "TSeq" :
            case "TExp" :
                return ;
            case "TMatch" :
                return marks._0;
            
          }
        }), y);
  if (marks === undefined) {
    return tseq(kind, y, z, rem);
  }
  if (kind === "Longest") {
    return tseq(kind, Curry._1(remove_matches, y), z, delta_1(marks, c, next_cat, prev_cat, z, rem));
  }
  if (kind !== "First") {
    return delta_1(marks, c, next_cat, prev_cat, z, tseq(kind, Curry._1(remove_matches, y), z, rem));
  }
  let match = split_at_match_rec(/* [] */0, y);
  return tseq(kind, match[0], z, delta_1(marks, c, next_cat, prev_cat, z, tseq(kind, match[1], z, rem)));
}

function delta_4(c, next_cat, prev_cat, l, rem) {
  if (l) {
    let x = l.hd;
    let rem$1 = delta_4(c, next_cat, prev_cat, l.tl, rem);
    switch (x.TAG) {
      case "TSeq" :
          let y$p = delta_4(c, next_cat, prev_cat, x._0, /* [] */0);
          return delta_seq(c, next_cat, prev_cat, x._2, y$p, x._1, rem$1);
      case "TExp" :
          return delta_1(x._0, c, next_cat, prev_cat, x._1, rem$1);
      case "TMatch" :
          return {
                  hd: x,
                  tl: rem$1
                };
      
    }
  } else {
    return rem;
  }
}

function delta(tbl_ref, next_cat, $$char, st) {
  let prev_cat = st.category;
  let match = remove_duplicates(/* [] */0, delta_4($$char, next_cat, prev_cat, st.desc, /* [] */0), eps_expr);
  let expr$p = match[0];
  let idx = free_index(tbl_ref, expr$p);
  let expr$p$p = set_idx(idx, expr$p);
  return mk(idx, next_cat, expr$p$p);
}

function flatten_match(m) {
  let ma = List.fold_left((function (ma, param) {
          return Caml.int_max(ma, param[0]);
        }), -1, m);
  let res = Caml_array.make(ma + 1 | 0, -1);
  List.iter((function (param) {
          Caml_array.set(res, param[0], param[1]);
        }), m);
  return res;
}

function status(s) {
  let st = s.status;
  if (st !== undefined) {
    return st;
  }
  let match = s.desc;
  let st$1;
  if (match) {
    let m = match.hd;
    switch (m.TAG) {
      case "TSeq" :
      case "TExp" :
          st$1 = "Running";
          break;
      case "TMatch" :
          let m$1 = m._0;
          st$1 = {
            TAG: "Match",
            _0: flatten_match(m$1.marks),
            _1: m$1.pmarks
          };
          break;
      
    }
  } else {
    st$1 = "Failed";
  }
  s.status = st$1;
  return st$1;
}

let Re_automata_Category = {
  $plus$plus: $plus$plus,
  from_char: from_char,
  inexistant: 1,
  letter: 2,
  not_letter: 4,
  newline: 8,
  lastnewline: 16,
  search_boundary: 32
};

let Re_automata_State = {
  dummy: dummy,
  create: create$2,
  Table: Table
};

function iter(_n, f, _v) {
  while(true) {
    let v = _v;
    let n = _n;
    if (n === 0) {
      return v;
    }
    _v = Curry._1(f, v);
    _n = n - 1 | 0;
    continue ;
  };
}

function category(re, c) {
  if (c === -1) {
    return Re_automata_Category.inexistant;
  } else if (c === re.lnl) {
    return Curry._2(Re_automata_Category.$plus$plus, Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.lastnewline, Re_automata_Category.newline), Re_automata_Category.not_letter);
  } else {
    return Curry._1(Re_automata_Category.from_char, Caml_bytes.get(re.col_repr, c));
  }
}

let dummy_next = [];

let unknown_state = {
  idx: -2,
  real_idx: 0,
  next: dummy_next,
  final: /* [] */0,
  desc: Re_automata_State.dummy
};

function mk_state(ncol, desc) {
  let match = status(desc);
  let break_state;
  break_state = typeof match !== "object" && match !== "Failed" ? false : true;
  return {
          idx: break_state ? -3 : desc.idx,
          real_idx: desc.idx,
          next: break_state ? dummy_next : Caml_array.make(ncol, unknown_state),
          final: /* [] */0,
          desc: desc
        };
}

function find_state(re, desc) {
  try {
    return Curry._2(Re_automata_State.Table.find, re.states, desc);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      let st = mk_state(re.ncol, desc);
      Curry._3(Re_automata_State.Table.add, re.states, desc, st);
      return st;
    }
    throw exn;
  }
}

function delta$1(info, cat, c, st) {
  let desc = delta(info.re.tbl, cat, c, st.desc);
  let len = info.positions.length;
  if (desc.idx === len && len > 0) {
    let pos = info.positions;
    info.positions = Caml_array.make((len << 1), 0);
    $$Array.blit(pos, 0, info.positions, 0, len);
  }
  return desc;
}

function validate(info, s, pos, st) {
  let c = Caml_bytes.get(info.i_cols, Caml_string.get(s, pos));
  let cat = category(info.re, c);
  let desc$p = delta$1(info, cat, c, st);
  let st$p = find_state(info.re, desc$p);
  Caml_array.set(st.next, c, st$p);
}

function loop(info, s, pos, st) {
  if (pos >= info.last) {
    return st;
  }
  let st$p = Caml_array.get(st.next, Caml_bytes.get(info.i_cols, Caml_string.get(s, pos)));
  let _pos = pos;
  let _st = st;
  let _st$p = st$p;
  while(true) {
    let st$p$1 = _st$p;
    let st$1 = _st;
    let pos$1 = _pos;
    if (st$p$1.idx < 0) {
      if (st$p$1.idx === -3) {
        Caml_array.set(info.positions, st$p$1.real_idx, pos$1 + 1 | 0);
        return st$p$1;
      } else {
        validate(info, s, pos$1, st$1);
        return loop(info, s, pos$1, st$1);
      }
    }
    let pos$2 = pos$1 + 1 | 0;
    if (pos$2 < info.last) {
      let st$p$p = Caml_array.get(st$p$1.next, Caml_bytes.get(info.i_cols, Caml_string.get(s, pos$2)));
      Caml_array.set(info.positions, st$p$1.idx, pos$2);
      _st$p = st$p$p;
      _st = st$p$1;
      _pos = pos$2;
      continue ;
    }
    Caml_array.set(info.positions, st$p$1.idx, pos$2);
    return st$p$1;
  };
}

function $$final(info, st, cat) {
  try {
    return List.assq(cat, st.final);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      let st$p = delta$1(info, cat, -1, st);
      let res_0 = st$p.idx;
      let res_1 = status(st$p);
      let res = [
        res_0,
        res_1
      ];
      st.final = {
        hd: [
          cat,
          res
        ],
        tl: st.final
      };
      return res;
    }
    throw exn;
  }
}

function find_initial_state(re, cat) {
  try {
    return List.assq(cat, re.initial_states);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      let st = find_state(re, Curry._2(Re_automata_State.create, cat, re.initial));
      re.initial_states = {
        hd: [
          cat,
          st
        ],
        tl: re.initial_states
      };
      return st;
    }
    throw exn;
  }
}

function get_color(re, s, pos) {
  if (pos < 0) {
    return -1;
  }
  let slen = s.length;
  if (pos >= slen) {
    return -1;
  } else if (pos === (slen - 1 | 0) && re.lnl !== -1 && Caml_string.get(s, pos) === /* '\n' */10) {
    return re.lnl;
  } else {
    return Caml_bytes.get(re.cols, Caml_string.get(s, pos));
  }
}

function scan_str(info, s, initial_state, groups) {
  let pos = info.pos;
  let last = info.last;
  if (!(last === s.length && info.re.lnl !== -1 && last > pos && Caml_string.get(s, last - 1 | 0) === /* '\n' */10)) {
    if (groups) {
      return loop(info, s, pos, initial_state);
    } else {
      let _pos = pos;
      let _st = initial_state;
      while(true) {
        let st = _st;
        let pos$1 = _pos;
        if (pos$1 >= last) {
          return st;
        }
        let st$p = Caml_array.get(st.next, Caml_bytes.get(info.i_cols, Caml_string.get(s, pos$1)));
        if (st$p.idx >= 0) {
          _st = st$p;
          _pos = pos$1 + 1 | 0;
          continue ;
        }
        if (st$p.idx === -3) {
          return st$p;
        }
        validate(info, s, pos$1, st);
        continue ;
      };
    }
  }
  let info$1 = {
    re: info.re,
    i_cols: info.i_cols,
    positions: info.positions,
    pos: info.pos,
    last: last - 1 | 0
  };
  let st$1 = scan_str(info$1, s, initial_state, groups);
  if (st$1.idx === -3) {
    return st$1;
  } else {
    let pos$2 = last - 1 | 0;
    while(true) {
      let st$p$1 = Caml_array.get(st$1.next, info$1.re.lnl);
      if (st$p$1.idx >= 0) {
        if (groups) {
          Caml_array.set(info$1.positions, st$p$1.idx, pos$2 + 1 | 0);
        }
        return st$p$1;
      }
      if (st$p$1.idx === -3) {
        if (groups) {
          Caml_array.set(info$1.positions, st$p$1.real_idx, pos$2 + 1 | 0);
        }
        return st$p$1;
      }
      let c = info$1.re.lnl;
      let real_c = Caml_bytes.get(info$1.i_cols, /* '\n' */10);
      let cat = category(info$1.re, c);
      let desc$p = delta$1(info$1, cat, real_c, st$1);
      let st$p$2 = find_state(info$1.re, desc$p);
      Caml_array.set(st$1.next, c, st$p$2);
      continue ;
    };
  }
}

function cadd(c, s) {
  return union(single(c), s);
}

function trans_set(cache, cm, s) {
  let i = one_char(s);
  if (i !== undefined) {
    return single(Caml_bytes.get(cm, i));
  }
  let v_0 = hash_rec(s);
  let v = [
    v_0,
    s
  ];
  try {
    let _param = cache.contents;
    while(true) {
      let param = _param;
      if (typeof param !== "object") {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      let c = compare(v, param.v);
      if (c === 0) {
        return param.d;
      }
      _param = c < 0 ? param.l : param.r;
      continue ;
    };
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      let l = List.fold_right((function (param, l) {
              return union(seq(Caml_bytes.get(cm, param[0]), Caml_bytes.get(cm, param[1])), l);
            }), s, /* [] */0);
      cache.contents = add(v, l, cache.contents);
      return l;
    }
    throw exn;
  }
}

function is_charset(_param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    switch (param.TAG) {
      case "Set" :
          return true;
      case "Sem" :
      case "Sem_greedy" :
          _param = param._1;
          continue ;
      case "No_group" :
      case "Case" :
      case "No_case" :
          _param = param._0;
          continue ;
      case "Alternative" :
      case "Intersection" :
      case "Complement" :
          return List.for_all(is_charset, param._0);
      case "Difference" :
          if (!is_charset(param._0)) {
            return false;
          }
          _param = param._1;
          continue ;
      default:
        return false;
    }
  };
}

function split(s, cm) {
  let _t = s;
  let f = function (i, j) {
    Caml_bytes.set(cm, i, /* '\001' */1);
    Caml_bytes.set(cm, j + 1 | 0, /* '\001' */1);
  };
  while(true) {
    let t = _t;
    if (!t) {
      return ;
    }
    let match = t.hd;
    Curry._2(f, match[0], match[1]);
    _t = t.tl;
    continue ;
  };
}

let cupper = union(seq(/* 'A' */65, /* 'Z' */90), union(seq(/* '\192' */192, /* '\214' */214), seq(/* '\216' */216, /* '\222' */222)));

let clower = offset(32, cupper);

let calpha = List.fold_right(cadd, {
      hd: /* '\170' */170,
      tl: {
        hd: /* '\181' */181,
        tl: {
          hd: /* '\186' */186,
          tl: {
            hd: /* '\223' */223,
            tl: {
              hd: /* '\255' */255,
              tl: /* [] */0
            }
          }
        }
      }
    }, union(clower, cupper));

let cdigit = seq(/* '0' */48, /* '9' */57);

let calnum = union(calpha, cdigit);

let cword = union({
      hd: [
        /* '_' */95,
        /* '_' */95
      ],
      tl: /* [] */0
    }, calnum);

function colorize(c, regexp) {
  let lnl = {
    contents: false
  };
  let colorize$1 = function (_regexp) {
    while(true) {
      let regexp = _regexp;
      if (typeof regexp !== "object") {
        switch (regexp) {
          case "Beg_of_line" :
          case "End_of_line" :
              return split({
                          hd: [
                            /* '\n' */10,
                            /* '\n' */10
                          ],
                          tl: /* [] */0
                        }, c);
          case "Beg_of_word" :
          case "End_of_word" :
          case "Not_bound" :
              return split(cword, c);
          case "Last_end_of_line" :
              lnl.contents = true;
              return ;
          case "Beg_of_str" :
          case "End_of_str" :
          case "Start" :
          case "Stop" :
              return ;
          
        }
      } else {
        switch (regexp.TAG) {
          case "Set" :
              return split(regexp._0, c);
          case "Sequence" :
          case "Alternative" :
              return List.iter(colorize$1, regexp._0);
          case "Repeat" :
          case "Group" :
          case "No_group" :
          case "Nest" :
              _regexp = regexp._0;
              continue ;
          case "Sem" :
          case "Sem_greedy" :
          case "Pmark" :
              _regexp = regexp._1;
              continue ;
          default:
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "ocaml_re_test.ml",
                    1973,
                    35
                  ],
                  Error: new Error()
                };
        }
      }
    };
  };
  colorize$1(regexp);
  return lnl.contents;
}

function flatten_cmap(cm) {
  let c = Caml_bytes.create(256);
  let col_repr = Caml_bytes.create(256);
  let v = 0;
  Caml_bytes.set(c, 0, /* '\000' */0);
  Caml_bytes.set(col_repr, 0, /* '\000' */0);
  for(let i = 1; i <= 255; ++i){
    if (Caml_bytes.get(cm, i) !== /* '\000' */0) {
      v = v + 1 | 0;
    }
    Caml_bytes.set(c, i, Char.chr(v));
    Caml_bytes.set(col_repr, v, Char.chr(i));
  }
  return [
          c,
          Bytes.sub(col_repr, 0, v + 1 | 0),
          v + 1 | 0
        ];
}

function equal$2(_x1, _x2) {
  while(true) {
    let x2 = _x2;
    let x1 = _x1;
    if (typeof x1 !== "object") {
      switch (x1) {
        case "Beg_of_line" :
            if (typeof x2 !== "object" && x2 === "Beg_of_line") {
              return true;
            } else {
              return false;
            }
        case "End_of_line" :
            if (typeof x2 !== "object" && x2 === "End_of_line") {
              return true;
            } else {
              return false;
            }
        case "Beg_of_word" :
            if (typeof x2 !== "object" && x2 === "Beg_of_word") {
              return true;
            } else {
              return false;
            }
        case "End_of_word" :
            if (typeof x2 !== "object" && x2 === "End_of_word") {
              return true;
            } else {
              return false;
            }
        case "Not_bound" :
            if (typeof x2 !== "object" && x2 === "Not_bound") {
              return true;
            } else {
              return false;
            }
        case "Beg_of_str" :
            if (typeof x2 !== "object" && x2 === "Beg_of_str") {
              return true;
            } else {
              return false;
            }
        case "End_of_str" :
            if (typeof x2 !== "object" && x2 === "End_of_str") {
              return true;
            } else {
              return false;
            }
        case "Last_end_of_line" :
            if (typeof x2 !== "object" && x2 === "Last_end_of_line") {
              return true;
            } else {
              return false;
            }
        case "Start" :
            if (typeof x2 !== "object" && x2 === "Start") {
              return true;
            } else {
              return false;
            }
        case "Stop" :
            if (typeof x2 !== "object" && x2 === "Stop") {
              return true;
            } else {
              return false;
            }
        
      }
    } else {
      switch (x1.TAG) {
        case "Set" :
            if (typeof x2 !== "object" || x2.TAG !== "Set") {
              return false;
            } else {
              return Caml_obj.equal(x1._0, x2._0);
            }
        case "Sequence" :
            if (typeof x2 !== "object" || x2.TAG !== "Sequence") {
              return false;
            } else {
              return eq_list(x1._0, x2._0);
            }
        case "Alternative" :
            if (typeof x2 !== "object" || x2.TAG !== "Alternative") {
              return false;
            } else {
              return eq_list(x1._0, x2._0);
            }
        case "Repeat" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Repeat") {
              return false;
            }
            if (x1._1 !== x2._1) {
              return false;
            }
            if (!Caml_obj.equal(x1._2, x2._2)) {
              return false;
            }
            _x2 = x2._0;
            _x1 = x1._0;
            continue ;
        case "Sem" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Sem") {
              return false;
            }
            if (x1._0 !== x2._0) {
              return false;
            }
            _x2 = x2._1;
            _x1 = x1._1;
            continue ;
        case "Sem_greedy" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Sem_greedy") {
              return false;
            }
            if (x1._0 !== x2._0) {
              return false;
            }
            _x2 = x2._1;
            _x1 = x1._1;
            continue ;
        case "Group" :
            return false;
        case "No_group" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "No_group") {
              return false;
            }
            _x2 = x2._0;
            _x1 = x1._0;
            continue ;
        case "Nest" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Nest") {
              return false;
            }
            _x2 = x2._0;
            _x1 = x1._0;
            continue ;
        case "Case" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Case") {
              return false;
            }
            _x2 = x2._0;
            _x1 = x1._0;
            continue ;
        case "No_case" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "No_case") {
              return false;
            }
            _x2 = x2._0;
            _x1 = x1._0;
            continue ;
        case "Intersection" :
            if (typeof x2 !== "object" || x2.TAG !== "Intersection") {
              return false;
            } else {
              return eq_list(x1._0, x2._0);
            }
        case "Complement" :
            if (typeof x2 !== "object" || x2.TAG !== "Complement") {
              return false;
            } else {
              return eq_list(x1._0, x2._0);
            }
        case "Difference" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Difference") {
              return false;
            }
            if (!equal$2(x1._0, x2._0)) {
              return false;
            }
            _x2 = x2._1;
            _x1 = x1._1;
            continue ;
        case "Pmark" :
            if (typeof x2 !== "object") {
              return false;
            }
            if (x2.TAG !== "Pmark") {
              return false;
            }
            if (x1._0 !== x2._0) {
              return false;
            }
            _x2 = x2._1;
            _x1 = x1._1;
            continue ;
        
      }
    }
  };
}

function eq_list(_l1, _l2) {
  while(true) {
    let l2 = _l2;
    let l1 = _l1;
    if (!l1) {
      if (l2) {
        return false;
      } else {
        return true;
      }
    }
    if (!l2) {
      return false;
    }
    if (!equal$2(l1.hd, l2.hd)) {
      return false;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function sequence(l) {
  if (l && !l.tl) {
    return l.hd;
  } else {
    return {
            TAG: "Sequence",
            _0: l
          };
  }
}

function merge_sequences(_param) {
  while(true) {
    let param = _param;
    if (!param) {
      return /* [] */0;
    }
    let l$p = param.hd;
    if (typeof l$p === "object") {
      switch (l$p.TAG) {
        case "Sequence" :
            let match = l$p._0;
            if (match) {
              let y = match.tl;
              let x = match.hd;
              let r$p = merge_sequences(param.tl);
              let exit = 0;
              if (r$p) {
                let match$1 = r$p.hd;
                if (typeof match$1 !== "object" || match$1.TAG !== "Sequence") {
                  exit = 2;
                } else {
                  let match$2 = match$1._0;
                  if (match$2) {
                    if (equal$2(x, match$2.hd)) {
                      return {
                              hd: {
                                TAG: "Sequence",
                                _0: {
                                  hd: x,
                                  tl: {
                                    hd: {
                                      TAG: "Alternative",
                                      _0: {
                                        hd: sequence(y),
                                        tl: {
                                          hd: sequence(match$2.tl),
                                          tl: /* [] */0
                                        }
                                      }
                                    },
                                    tl: /* [] */0
                                  }
                                }
                              },
                              tl: r$p.tl
                            };
                    }
                    exit = 2;
                  } else {
                    exit = 2;
                  }
                }
              } else {
                exit = 2;
              }
              if (exit === 2) {
                return {
                        hd: {
                          TAG: "Sequence",
                          _0: {
                            hd: x,
                            tl: y
                          }
                        },
                        tl: r$p
                      };
              }
              
            }
            break;
        case "Alternative" :
            _param = Pervasives.$at(l$p._0, param.tl);
            continue ;
        default:
          
      }
    }
    return {
            hd: l$p,
            tl: merge_sequences(param.tl)
          };
  };
}

function enforce_kind(ids, kind, kind$p, cr) {
  if (kind === "First" && kind$p !== "First") {
    return seq$1(ids, kind$p, cr, mk_expr(ids, "Eps"));
  } else {
    return cr;
  }
}

function translate(ids, kind, _ign_group, ign_case, _greedy, pos, cache, c, _s) {
  while(true) {
    let s = _s;
    let greedy = _greedy;
    let ign_group = _ign_group;
    if (typeof s !== "object") {
      switch (s) {
        case "Beg_of_line" :
            let c$1 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.newline);
            return [
                    mk_expr(ids, {
                          TAG: "After",
                          _0: c$1
                        }),
                    kind
                  ];
        case "End_of_line" :
            let c$2 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.newline);
            return [
                    mk_expr(ids, {
                          TAG: "Before",
                          _0: c$2
                        }),
                    kind
                  ];
        case "Beg_of_word" :
            let c$3 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.not_letter);
            let c$4 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.letter);
            return [
                    seq$1(ids, "First", mk_expr(ids, {
                              TAG: "After",
                              _0: c$3
                            }), mk_expr(ids, {
                              TAG: "Before",
                              _0: c$4
                            })),
                    kind
                  ];
        case "End_of_word" :
            let c$5 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.letter);
            let c$6 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.not_letter);
            return [
                    seq$1(ids, "First", mk_expr(ids, {
                              TAG: "After",
                              _0: c$5
                            }), mk_expr(ids, {
                              TAG: "Before",
                              _0: c$6
                            })),
                    kind
                  ];
        case "Not_bound" :
            return [
                    alt(ids, {
                          hd: seq$1(ids, "First", mk_expr(ids, {
                                    TAG: "After",
                                    _0: Re_automata_Category.letter
                                  }), mk_expr(ids, {
                                    TAG: "Before",
                                    _0: Re_automata_Category.letter
                                  })),
                          tl: {
                            hd: seq$1(ids, "First", mk_expr(ids, {
                                      TAG: "After",
                                      _0: Re_automata_Category.letter
                                    }), mk_expr(ids, {
                                      TAG: "Before",
                                      _0: Re_automata_Category.letter
                                    })),
                            tl: /* [] */0
                          }
                        }),
                    kind
                  ];
        case "Beg_of_str" :
            return [
                    mk_expr(ids, {
                          TAG: "After",
                          _0: Re_automata_Category.inexistant
                        }),
                    kind
                  ];
        case "End_of_str" :
            return [
                    mk_expr(ids, {
                          TAG: "Before",
                          _0: Re_automata_Category.inexistant
                        }),
                    kind
                  ];
        case "Last_end_of_line" :
            let c$7 = Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.inexistant, Re_automata_Category.lastnewline);
            return [
                    mk_expr(ids, {
                          TAG: "Before",
                          _0: c$7
                        }),
                    kind
                  ];
        case "Start" :
            return [
                    mk_expr(ids, {
                          TAG: "After",
                          _0: Re_automata_Category.search_boundary
                        }),
                    kind
                  ];
        case "Stop" :
            return [
                    mk_expr(ids, {
                          TAG: "Before",
                          _0: Re_automata_Category.search_boundary
                        }),
                    kind
                  ];
        
      }
    } else {
      switch (s.TAG) {
        case "Set" :
            return [
                    cst(ids, trans_set(cache, c, s._0)),
                    kind
                  ];
        case "Sequence" :
            return [
                    trans_seq(ids, kind, ign_group, ign_case, greedy, pos, cache, c, s._0),
                    kind
                  ];
        case "Alternative" :
            let merged_sequences = merge_sequences(s._0);
            if (merged_sequences && !merged_sequences.tl) {
              let match = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, merged_sequences.hd);
              return [
                      enforce_kind(ids, kind, match[1], match[0]),
                      kind
                    ];
            }
            return [
                    alt(ids, List.map((function(ign_group,greedy){
                            return function (r$p) {
                              let match = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, r$p);
                              return enforce_kind(ids, kind, match[1], match[0]);
                            }
                            }(ign_group,greedy)), merged_sequences)),
                    kind
                  ];
        case "Repeat" :
            let j = s._2;
            let i = s._1;
            let match$1 = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, s._0);
            let kind$p = match$1[1];
            let cr = match$1[0];
            let rem;
            if (j !== undefined) {
              let f = greedy === "Non_greedy" ? (function(cr,kind$p){
                return function (rem) {
                  return alt(ids, {
                              hd: mk_expr(ids, "Eps"),
                              tl: {
                                hd: seq$1(ids, kind$p, rename(ids, cr), rem),
                                tl: /* [] */0
                              }
                            });
                }
                }(cr,kind$p)) : (function(cr,kind$p){
                return function (rem) {
                  return alt(ids, {
                              hd: seq$1(ids, kind$p, rename(ids, cr), rem),
                              tl: {
                                hd: mk_expr(ids, "Eps"),
                                tl: /* [] */0
                              }
                            });
                }
                }(cr,kind$p));
              rem = iter(j - i | 0, f, mk_expr(ids, "Eps"));
            } else {
              rem = rep(ids, greedy, kind$p, cr);
            }
            return [
                    iter(i, (function(cr,kind$p){
                        return function (rem) {
                          return seq$1(ids, kind$p, rename(ids, cr), rem);
                        }
                        }(cr,kind$p)), rem),
                    kind
                  ];
        case "Sem" :
            let kind$p$1 = s._0;
            let match$2 = translate(ids, kind$p$1, ign_group, ign_case, greedy, pos, cache, c, s._1);
            return [
                    enforce_kind(ids, kind$p$1, match$2[1], match$2[0]),
                    kind$p$1
                  ];
        case "Sem_greedy" :
            _s = s._1;
            _greedy = s._0;
            continue ;
        case "Group" :
            let r$p = s._0;
            if (ign_group) {
              _s = r$p;
              continue ;
            }
            let p = pos.contents;
            pos.contents = pos.contents + 2 | 0;
            let match$3 = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, r$p);
            return [
                    seq$1(ids, "First", mk_expr(ids, {
                              TAG: "Mark",
                              _0: p
                            }), seq$1(ids, "First", match$3[0], mk_expr(ids, {
                                  TAG: "Mark",
                                  _0: p + 1 | 0
                                }))),
                    match$3[1]
                  ];
        case "No_group" :
            _s = s._0;
            _ign_group = true;
            continue ;
        case "Nest" :
            let b = pos.contents;
            let match$4 = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, s._0);
            let kind$p$2 = match$4[1];
            let cr$1 = match$4[0];
            let e = pos.contents - 1 | 0;
            if (e < b) {
              return [
                      cr$1,
                      kind$p$2
                    ];
            } else {
              return [
                      seq$1(ids, "First", erase(ids, b, e), cr$1),
                      kind$p$2
                    ];
            }
        case "Pmark" :
            let match$5 = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, s._1);
            return [
                    seq$1(ids, "First", mk_expr(ids, {
                              TAG: "Pmark",
                              _0: s._0
                            }), match$5[0]),
                    match$5[1]
                  ];
        default:
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "ocaml_re_test.ml",
                  2185,
                  4
                ],
                Error: new Error()
              };
      }
    }
  };
}

function trans_seq(ids, kind, ign_group, ign_case, greedy, pos, cache, c, param) {
  if (!param) {
    return mk_expr(ids, "Eps");
  }
  let rem = param.tl;
  let r = param.hd;
  if (rem) {
    let match = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, r);
    let cr$p = match[0];
    let cr$p$p = trans_seq(ids, kind, ign_group, ign_case, greedy, pos, cache, c, rem);
    if (is_eps(cr$p$p)) {
      return cr$p;
    } else if (is_eps(cr$p)) {
      return cr$p$p;
    } else {
      return seq$1(ids, match[1], cr$p, cr$p$p);
    }
  }
  let match$1 = translate(ids, kind, ign_group, ign_case, greedy, pos, cache, c, r);
  return enforce_kind(ids, kind, match$1[1], match$1[0]);
}

function case_insens(s) {
  return union(s, union(offset(32, inter(s, cupper)), offset(-32, inter(s, clower))));
}

function as_set(s) {
  if (typeof s !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "ocaml_re_test.ml",
            2218,
            13
          ],
          Error: new Error()
        };
  }
  if (s.TAG === "Set") {
    return s._0;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "ocaml_re_test.ml",
          2218,
          13
        ],
        Error: new Error()
      };
}

function handle_case(_ign_case, _s) {
  while(true) {
    let s = _s;
    let ign_case = _ign_case;
    if (typeof s !== "object") {
      return s;
    }
    switch (s.TAG) {
      case "Set" :
          let s$1 = s._0;
          return {
                  TAG: "Set",
                  _0: ign_case ? case_insens(s$1) : s$1
                };
      case "Sequence" :
          return {
                  TAG: "Sequence",
                  _0: List.map((function(ign_case){
                      return function (param) {
                        return handle_case(ign_case, param);
                      }
                      }(ign_case)), s._0)
                };
      case "Alternative" :
          let l$p = List.map((function(ign_case){
              return function (param) {
                return handle_case(ign_case, param);
              }
              }(ign_case)), s._0);
          if (is_charset({
                  TAG: "Alternative",
                  _0: l$p
                })) {
            return {
                    TAG: "Set",
                    _0: List.fold_left((function (s, r) {
                            return union(s, as_set(r));
                          }), /* [] */0, l$p)
                  };
          } else {
            return {
                    TAG: "Alternative",
                    _0: l$p
                  };
          }
      case "Repeat" :
          return {
                  TAG: "Repeat",
                  _0: handle_case(ign_case, s._0),
                  _1: s._1,
                  _2: s._2
                };
      case "Sem" :
          let r$p = handle_case(ign_case, s._1);
          if (is_charset(r$p)) {
            return r$p;
          } else {
            return {
                    TAG: "Sem",
                    _0: s._0,
                    _1: r$p
                  };
          }
      case "Sem_greedy" :
          let r$p$1 = handle_case(ign_case, s._1);
          if (is_charset(r$p$1)) {
            return r$p$1;
          } else {
            return {
                    TAG: "Sem_greedy",
                    _0: s._0,
                    _1: r$p$1
                  };
          }
      case "Group" :
          return {
                  TAG: "Group",
                  _0: handle_case(ign_case, s._0)
                };
      case "No_group" :
          let r$p$2 = handle_case(ign_case, s._0);
          if (is_charset(r$p$2)) {
            return r$p$2;
          } else {
            return {
                    TAG: "No_group",
                    _0: r$p$2
                  };
          }
      case "Nest" :
          let r$p$3 = handle_case(ign_case, s._0);
          if (is_charset(r$p$3)) {
            return r$p$3;
          } else {
            return {
                    TAG: "Nest",
                    _0: r$p$3
                  };
          }
      case "Case" :
          _s = s._0;
          _ign_case = false;
          continue ;
      case "No_case" :
          _s = s._0;
          _ign_case = true;
          continue ;
      case "Intersection" :
          let l$p$1 = List.map((function(ign_case){
              return function (r) {
                return handle_case(ign_case, r);
              }
              }(ign_case)), s._0);
          return {
                  TAG: "Set",
                  _0: List.fold_left((function (s, r) {
                          return inter(s, as_set(r));
                        }), cany, l$p$1)
                };
      case "Complement" :
          let l$p$2 = List.map((function(ign_case){
              return function (r) {
                return handle_case(ign_case, r);
              }
              }(ign_case)), s._0);
          return {
                  TAG: "Set",
                  _0: diff(cany, List.fold_left((function (s, r) {
                              return union(s, as_set(r));
                            }), /* [] */0, l$p$2))
                };
      case "Difference" :
          return {
                  TAG: "Set",
                  _0: inter(as_set(handle_case(ign_case, s._0)), diff(cany, as_set(handle_case(ign_case, s._1))))
                };
      case "Pmark" :
          return {
                  TAG: "Pmark",
                  _0: s._0,
                  _1: handle_case(ign_case, s._1)
                };
      
    }
  };
}

function anchored(_l) {
  while(true) {
    let l = _l;
    if (typeof l !== "object") {
      switch (l) {
        case "Beg_of_str" :
        case "Start" :
            return true;
        default:
          return false;
      }
    } else {
      switch (l.TAG) {
        case "Sequence" :
            return List.exists(anchored, l._0);
        case "Alternative" :
            return List.for_all(anchored, l._0);
        case "Repeat" :
            if (l._1 <= 0) {
              return false;
            }
            _l = l._0;
            continue ;
        case "Group" :
        case "No_group" :
        case "Nest" :
        case "Case" :
        case "No_case" :
            _l = l._0;
            continue ;
        case "Sem" :
        case "Sem_greedy" :
        case "Pmark" :
            _l = l._1;
            continue ;
        default:
          return false;
      }
    }
  };
}

function alt$1(l) {
  if (l && !l.tl) {
    return l.hd;
  } else {
    return {
            TAG: "Alternative",
            _0: l
          };
  }
}

function seq$2(l) {
  if (l && !l.tl) {
    return l.hd;
  } else {
    return {
            TAG: "Sequence",
            _0: l
          };
  }
}

let epsilon = {
  TAG: "Sequence",
  _0: /* [] */0
};

function repn(r, i, j) {
  if (i < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Re.repn",
          Error: new Error()
        };
  }
  if (j !== undefined && j < i) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Re.repn",
          Error: new Error()
        };
  }
  return {
          TAG: "Repeat",
          _0: r,
          _1: i,
          _2: j
        };
}

function set(str) {
  let s = /* [] */0;
  for(let i = 0 ,i_finish = str.length; i < i_finish; ++i){
    s = union(single(Caml_string.get(str, i)), s);
  }
  return {
          TAG: "Set",
          _0: s
        };
}

function compl(l) {
  let r = {
    TAG: "Complement",
    _0: l
  };
  if (is_charset(r)) {
    return r;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Re.compl",
        Error: new Error()
      };
}

let any = {
  TAG: "Set",
  _0: cany
};

let notnl = {
  TAG: "Set",
  _0: diff(cany, {
        hd: [
          /* '\n' */10,
          /* '\n' */10
        ],
        tl: /* [] */0
      })
};

let lower = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* 'a' */97, /* 'z' */122)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: {
            hd: [
              /* '\181' */181,
              /* '\181' */181
            ],
            tl: /* [] */0
          }
        },
        tl: {
          hd: {
            TAG: "Set",
            _0: seq(/* '\223' */223, /* '\246' */246)
          },
          tl: {
            hd: {
              TAG: "Set",
              _0: seq(/* '\248' */248, /* '\255' */255)
            },
            tl: /* [] */0
          }
        }
      }
    });

let upper = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* 'A' */65, /* 'Z' */90)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* '\192' */192, /* '\214' */214)
        },
        tl: {
          hd: {
            TAG: "Set",
            _0: seq(/* '\216' */216, /* '\222' */222)
          },
          tl: /* [] */0
        }
      }
    });

let alpha = alt$1({
      hd: lower,
      tl: {
        hd: upper,
        tl: {
          hd: {
            TAG: "Set",
            _0: {
              hd: [
                /* '\170' */170,
                /* '\170' */170
              ],
              tl: /* [] */0
            }
          },
          tl: {
            hd: {
              TAG: "Set",
              _0: {
                hd: [
                  /* '\186' */186,
                  /* '\186' */186
                ],
                tl: /* [] */0
              }
            },
            tl: /* [] */0
          }
        }
      }
    });

let digit = {
  TAG: "Set",
  _0: seq(/* '0' */48, /* '9' */57)
};

let alnum = alt$1({
      hd: alpha,
      tl: {
        hd: digit,
        tl: /* [] */0
      }
    });

let wordc = alt$1({
      hd: alnum,
      tl: {
        hd: {
          TAG: "Set",
          _0: {
            hd: [
              /* '_' */95,
              /* '_' */95
            ],
            tl: /* [] */0
          }
        },
        tl: /* [] */0
      }
    });

let ascii = {
  TAG: "Set",
  _0: seq(/* '\000' */0, /* '\127' */127)
};

let blank = set("\t ");

let cntrl = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* '\000' */0, /* '\031' */31)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* '\127' */127, /* '\159' */159)
        },
        tl: /* [] */0
      }
    });

let graph = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* '!' */33, /* '~' */126)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* '\160' */160, /* '\255' */255)
        },
        tl: /* [] */0
      }
    });

let print = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* ' ' */32, /* '~' */126)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* '\160' */160, /* '\255' */255)
        },
        tl: /* [] */0
      }
    });

let punct = alt$1({
      hd: {
        TAG: "Set",
        _0: seq(/* '!' */33, /* '/' */47)
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* ':' */58, /* '@' */64)
        },
        tl: {
          hd: {
            TAG: "Set",
            _0: seq(/* '[' */91, /* '`' */96)
          },
          tl: {
            hd: {
              TAG: "Set",
              _0: seq(/* '{' */123, /* '~' */126)
            },
            tl: {
              hd: {
                TAG: "Set",
                _0: seq(/* '\160' */160, /* '\169' */169)
              },
              tl: {
                hd: {
                  TAG: "Set",
                  _0: seq(/* '\171' */171, /* '\180' */180)
                },
                tl: {
                  hd: {
                    TAG: "Set",
                    _0: seq(/* '\182' */182, /* '\185' */185)
                  },
                  tl: {
                    hd: {
                      TAG: "Set",
                      _0: seq(/* '\187' */187, /* '\191' */191)
                    },
                    tl: {
                      hd: {
                        TAG: "Set",
                        _0: {
                          hd: [
                            /* '\215' */215,
                            /* '\215' */215
                          ],
                          tl: /* [] */0
                        }
                      },
                      tl: {
                        hd: {
                          TAG: "Set",
                          _0: {
                            hd: [
                              /* '\247' */247,
                              /* '\247' */247
                            ],
                            tl: /* [] */0
                          }
                        },
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

let space = alt$1({
      hd: {
        TAG: "Set",
        _0: {
          hd: [
            /* ' ' */32,
            /* ' ' */32
          ],
          tl: /* [] */0
        }
      },
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* '\t' */9, /* '\r' */13)
        },
        tl: /* [] */0
      }
    });

let xdigit = alt$1({
      hd: digit,
      tl: {
        hd: {
          TAG: "Set",
          _0: seq(/* 'a' */97, /* 'f' */102)
        },
        tl: {
          hd: {
            TAG: "Set",
            _0: seq(/* 'A' */65, /* 'F' */70)
          },
          tl: /* [] */0
        }
      }
    });

function compile(r) {
  let regexp = anchored(r) ? ({
        TAG: "Group",
        _0: r
      }) : seq$2({
          hd: {
            TAG: "Sem",
            _0: "Shortest",
            _1: repn(any, 0, undefined)
          },
          tl: {
            hd: {
              TAG: "Group",
              _0: r
            },
            tl: /* [] */0
          }
        });
  let regexp$1 = handle_case(false, regexp);
  let c = Bytes.make(257, /* '\000' */0);
  let need_lnl = colorize(c, regexp$1);
  let match = flatten_cmap(c);
  let ncol = match[2];
  let col = match[0];
  let lnl = need_lnl ? ncol : -1;
  let ncol$1 = need_lnl ? ncol + 1 | 0 : ncol;
  let ids = {
    contents: 0
  };
  let pos = {
    contents: 0
  };
  let match$1 = translate(ids, "First", false, false, "Greedy", pos, {
        contents: "Empty"
      }, col, regexp$1);
  let r$1 = enforce_kind(ids, "First", match$1[1], match$1[0]);
  let col_repr = match[1];
  let group_count = pos.contents / 2 | 0;
  return {
          initial: r$1,
          initial_states: /* [] */0,
          cols: col,
          col_repr: col_repr,
          ncol: ncol$1,
          lnl: lnl,
          tbl: {
            contents: [false]
          },
          states: Curry._1(Re_automata_State.Table.create, 97),
          group_count: group_count
        };
}

function exec_internal(name, posOpt, lenOpt, groups, re, s) {
  let pos = posOpt !== undefined ? posOpt : 0;
  let len = lenOpt !== undefined ? lenOpt : -1;
  if (pos < 0 || len < -1 || (pos + len | 0) > s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: name,
          Error: new Error()
        };
  }
  let partial = false;
  let slen = s.length;
  let last = len === -1 ? slen : pos + len | 0;
  let tmp;
  if (groups) {
    let n = re.tbl.contents.length + 1 | 0;
    tmp = n <= 10 ? [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ] : Caml_array.make(n, 0);
  } else {
    tmp = [];
  }
  let info = {
    re: re,
    i_cols: re.cols,
    positions: tmp,
    pos: pos,
    last: last
  };
  let initial_cat = pos === 0 ? Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.search_boundary, Re_automata_Category.inexistant) : Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.search_boundary, category(re, get_color(re, s, pos - 1 | 0)));
  let initial_state = find_initial_state(re, initial_cat);
  let st = scan_str(info, s, initial_state, groups);
  let res;
  if (st.idx === -3 || partial) {
    res = status(st.desc);
  } else {
    let final_cat = last === slen ? Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.search_boundary, Re_automata_Category.inexistant) : Curry._2(Re_automata_Category.$plus$plus, Re_automata_Category.search_boundary, category(re, get_color(re, s, last)));
    let match = $$final(info, st, final_cat);
    if (groups) {
      Caml_array.set(info.positions, match[0], last + 1 | 0);
    }
    res = match[1];
  }
  if (typeof res !== "object") {
    if (res === "Failed") {
      return "Failed";
    } else {
      return "Running";
    }
  } else {
    return {
            TAG: "Match",
            _0: {
              s: s,
              marks: res._0,
              pmarks: res._1,
              gpos: info.positions,
              gcount: re.group_count
            }
          };
  }
}

function offset$1(t, i) {
  if (((i << 1) + 1 | 0) >= t.marks.length) {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  let m1 = Caml_array.get(t.marks, (i << 1));
  if (m1 === -1) {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  let p1 = Caml_array.get(t.gpos, m1) - 1 | 0;
  let p2 = Caml_array.get(t.gpos, Caml_array.get(t.marks, (i << 1) + 1 | 0)) - 1 | 0;
  return [
          p1,
          p2
        ];
}

function get(t, i) {
  let match = offset$1(t, i);
  let p1 = match[0];
  return $$String.sub(t.s, p1, match[1] - p1 | 0);
}

let Parse_error = /* @__PURE__ */Caml_exceptions.create("Parse_error");

let Not_supported = /* @__PURE__ */Caml_exceptions.create("Not_supported");

function posix_class_of_string(class_) {
  switch (class_) {
    case "alnum" :
        return alnum;
    case "ascii" :
        return ascii;
    case "blank" :
        return blank;
    case "cntrl" :
        return cntrl;
    case "digit" :
        return digit;
    case "graph" :
        return graph;
    case "lower" :
        return lower;
    case "print" :
        return print;
    case "punct" :
        return punct;
    case "space" :
        return space;
    case "upper" :
        return upper;
    case "word" :
        return wordc;
    case "xdigit" :
        return xdigit;
    default:
      let s = "Invalid pcre class: " + class_;
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: s,
            Error: new Error()
          };
  }
}

function parse(multiline, dollar_endonly, dotall, ungreedy, s) {
  let i = {
    contents: 0
  };
  let l = s.length;
  let test = function (c) {
    if (i.contents !== l) {
      return Caml_string.get(s, i.contents) === c;
    } else {
      return false;
    }
  };
  let accept = function (c) {
    let r = test(c);
    if (r) {
      i.contents = i.contents + 1 | 0;
    }
    return r;
  };
  let accept_s = function (s$p) {
    let len = s$p.length;
    try {
      for(let j = 0; j < len; ++j){
        try {
          if (Caml_string.get(s$p, j) !== Caml_string.get(s, i.contents + j | 0)) {
            throw {
                  RE_EXN_ID: Pervasives.Exit,
                  Error: new Error()
                };
          }
          
        }
        catch (exn){
          throw {
                RE_EXN_ID: Pervasives.Exit,
                Error: new Error()
              };
        }
      }
      i.contents = i.contents + len | 0;
      return true;
    }
    catch (raw_exn){
      let exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn$1.RE_EXN_ID === Pervasives.Exit) {
        return false;
      }
      throw exn$1;
    }
  };
  let get = function (param) {
    let r = Caml_string.get(s, i.contents);
    i.contents = i.contents + 1 | 0;
    return r;
  };
  let greedy_mod = function (r) {
    let gr = accept(/* '?' */63);
    let gr$1 = ungreedy ? !gr : gr;
    if (gr$1) {
      return {
              TAG: "Sem_greedy",
              _0: "Non_greedy",
              _1: r
            };
    } else {
      return {
              TAG: "Sem_greedy",
              _0: "Greedy",
              _1: r
            };
    }
  };
  let regexp$p = function (_left) {
    while(true) {
      let left = _left;
      if (!accept(/* '|' */124)) {
        return left;
      }
      _left = alt$1({
            hd: left,
            tl: {
              hd: branch$p(/* [] */0),
              tl: /* [] */0
            }
          });
      continue ;
    };
  };
  let branch$p = function (_left) {
    while(true) {
      let left = _left;
      if (i.contents === l || test(/* '|' */124) || test(/* ')' */41)) {
        return seq$2(List.rev(left));
      }
      _left = {
        hd: piece(undefined),
        tl: left
      };
      continue ;
    };
  };
  let $$char = function (param) {
    if (i.contents === l) {
      throw {
            RE_EXN_ID: Parse_error,
            Error: new Error()
          };
    }
    let c = get(undefined);
    if (c === /* '[' */91) {
      if (accept(/* '=' */61)) {
        throw {
              RE_EXN_ID: Not_supported,
              Error: new Error()
            };
      }
      if (accept(/* ':' */58)) {
        let compl$1 = accept(/* '^' */94);
        let cls;
        try {
          cls = List.find(accept_s, {
                hd: "alnum",
                tl: {
                  hd: "ascii",
                  tl: {
                    hd: "blank",
                    tl: {
                      hd: "cntrl",
                      tl: {
                        hd: "digit",
                        tl: {
                          hd: "lower",
                          tl: {
                            hd: "print",
                            tl: {
                              hd: "space",
                              tl: {
                                hd: "upper",
                                tl: {
                                  hd: "word",
                                  tl: {
                                    hd: "punct",
                                    tl: {
                                      hd: "graph",
                                      tl: {
                                        hd: "xdigit",
                                        tl: /* [] */0
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              });
        }
        catch (raw_exn){
          let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
          if (exn.RE_EXN_ID === "Not_found") {
            throw {
                  RE_EXN_ID: Parse_error,
                  Error: new Error()
                };
          }
          throw exn;
        }
        if (!accept_s(":]")) {
          throw {
                RE_EXN_ID: Parse_error,
                Error: new Error()
              };
        }
        let posix_class = posix_class_of_string(cls);
        let re = compl$1 ? compl({
                hd: posix_class,
                tl: /* [] */0
              }) : posix_class;
        return {
                NAME: "Set",
                VAL: re
              };
      }
      if (!accept(/* '.' */46)) {
        return {
                NAME: "Char",
                VAL: c
              };
      }
      if (i.contents === l) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      let c$1 = get(undefined);
      if (!accept(/* '.' */46)) {
        throw {
              RE_EXN_ID: Not_supported,
              Error: new Error()
            };
      }
      if (!accept(/* ']' */93)) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      return {
              NAME: "Char",
              VAL: c$1
            };
    }
    if (c !== /* '\\' */92) {
      return {
              NAME: "Char",
              VAL: c
            };
    }
    let c$2 = get(undefined);
    if (c$2 >= 58) {
      if (c$2 >= 123) {
        return {
                NAME: "Char",
                VAL: c$2
              };
      }
      switch (c$2) {
        case 68 :
            return {
                    NAME: "Set",
                    VAL: compl({
                          hd: digit,
                          tl: /* [] */0
                        })
                  };
        case 83 :
            return {
                    NAME: "Set",
                    VAL: compl({
                          hd: space,
                          tl: /* [] */0
                        })
                  };
        case 87 :
            return {
                    NAME: "Set",
                    VAL: compl({
                          hd: alnum,
                          tl: {
                            hd: {
                              TAG: "Set",
                              _0: {
                                hd: [
                                  /* '_' */95,
                                  /* '_' */95
                                ],
                                tl: /* [] */0
                              }
                            },
                            tl: /* [] */0
                          }
                        })
                  };
        case 58 :
        case 59 :
        case 60 :
        case 61 :
        case 62 :
        case 63 :
        case 64 :
        case 91 :
        case 92 :
        case 93 :
        case 94 :
        case 95 :
        case 96 :
            return {
                    NAME: "Char",
                    VAL: c$2
                  };
        case 98 :
            return {
                    NAME: "Char",
                    VAL: /* '\b' */8
                  };
        case 100 :
            return {
                    NAME: "Set",
                    VAL: digit
                  };
        case 110 :
            return {
                    NAME: "Char",
                    VAL: /* '\n' */10
                  };
        case 114 :
            return {
                    NAME: "Char",
                    VAL: /* '\r' */13
                  };
        case 115 :
            return {
                    NAME: "Set",
                    VAL: space
                  };
        case 116 :
            return {
                    NAME: "Char",
                    VAL: /* '\t' */9
                  };
        case 119 :
            return {
                    NAME: "Set",
                    VAL: alt$1({
                          hd: alnum,
                          tl: {
                            hd: {
                              TAG: "Set",
                              _0: {
                                hd: [
                                  /* '_' */95,
                                  /* '_' */95
                                ],
                                tl: /* [] */0
                              }
                            },
                            tl: /* [] */0
                          }
                        })
                  };
        case 65 :
        case 66 :
        case 67 :
        case 69 :
        case 70 :
        case 71 :
        case 72 :
        case 73 :
        case 74 :
        case 75 :
        case 76 :
        case 77 :
        case 78 :
        case 79 :
        case 80 :
        case 81 :
        case 82 :
        case 84 :
        case 85 :
        case 86 :
        case 88 :
        case 89 :
        case 90 :
        case 97 :
        case 99 :
        case 101 :
        case 102 :
        case 103 :
        case 104 :
        case 105 :
        case 106 :
        case 107 :
        case 108 :
        case 109 :
        case 111 :
        case 112 :
        case 113 :
        case 117 :
        case 118 :
        case 120 :
        case 121 :
        case 122 :
            throw {
                  RE_EXN_ID: Parse_error,
                  Error: new Error()
                };
        
      }
    } else {
      if (c$2 >= 48) {
        throw {
              RE_EXN_ID: Not_supported,
              Error: new Error()
            };
      }
      return {
              NAME: "Char",
              VAL: c$2
            };
    }
  };
  let bracket = function (_s) {
    while(true) {
      let s = _s;
      if (s !== /* [] */0 && accept(/* ']' */93)) {
        return s;
      }
      let match = $$char(undefined);
      if (match.NAME === "Char") {
        let c = match.VAL;
        if (accept(/* '-' */45)) {
          if (accept(/* ']' */93)) {
            return {
                    hd: {
                      TAG: "Set",
                      _0: single(c)
                    },
                    tl: {
                      hd: {
                        TAG: "Set",
                        _0: {
                          hd: [
                            /* '-' */45,
                            /* '-' */45
                          ],
                          tl: /* [] */0
                        }
                      },
                      tl: s
                    }
                  };
          }
          let match$1 = $$char(undefined);
          if (match$1.NAME !== "Char") {
            return {
                    hd: {
                      TAG: "Set",
                      _0: single(c)
                    },
                    tl: {
                      hd: {
                        TAG: "Set",
                        _0: {
                          hd: [
                            /* '-' */45,
                            /* '-' */45
                          ],
                          tl: /* [] */0
                        }
                      },
                      tl: {
                        hd: match$1.VAL,
                        tl: s
                      }
                    }
                  };
          }
          _s = {
            hd: {
              TAG: "Set",
              _0: seq(c, match$1.VAL)
            },
            tl: s
          };
          continue ;
        }
        _s = {
          hd: {
            TAG: "Set",
            _0: single(c)
          },
          tl: s
        };
        continue ;
      }
      _s = {
        hd: match.VAL,
        tl: s
      };
      continue ;
    };
  };
  let piece = function (param) {
    let r = atom(undefined);
    if (accept(/* '*' */42)) {
      return greedy_mod(repn(r, 0, undefined));
    }
    if (accept(/* '+' */43)) {
      return greedy_mod(repn(r, 1, undefined));
    }
    if (accept(/* '?' */63)) {
      return greedy_mod(repn(r, 0, 1));
    }
    if (!accept(/* '{' */123)) {
      return r;
    }
    let i$1 = integer(undefined);
    if (i$1 !== undefined) {
      let j = accept(/* ',' */44) ? integer(undefined) : i$1;
      if (!accept(/* '}' */125)) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      if (j !== undefined && j < i$1) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      return greedy_mod(repn(r, i$1, j));
    }
    i.contents = i.contents - 1 | 0;
    return r;
  };
  let integer = function (param) {
    if (i.contents === l) {
      return ;
    }
    let d = get(undefined);
    if (d > 57 || d < 48) {
      i.contents = i.contents - 1 | 0;
      return ;
    } else {
      let _i = d - /* '0' */48 | 0;
      while(true) {
        let i$1 = _i;
        if (i.contents === l) {
          return i$1;
        }
        let d$1 = get(undefined);
        if (d$1 > 57 || d$1 < 48) {
          i.contents = i.contents - 1 | 0;
          return i$1;
        }
        let i$p = Math.imul(10, i$1) + (d$1 - /* '0' */48 | 0) | 0;
        if (i$p < i$1) {
          throw {
                RE_EXN_ID: Parse_error,
                Error: new Error()
              };
        }
        _i = i$p;
        continue ;
      };
    }
  };
  let atom = function (param) {
    if (accept(/* '.' */46)) {
      if (dotall) {
        return any;
      } else {
        return notnl;
      }
    }
    if (accept(/* '(' */40)) {
      if (accept(/* '?' */63)) {
        if (accept(/* ':' */58)) {
          let r = regexp$p(branch$p(/* [] */0));
          if (!accept(/* ')' */41)) {
            throw {
                  RE_EXN_ID: Parse_error,
                  Error: new Error()
                };
          }
          return r;
        }
        if (accept(/* '#' */35)) {
          let _param;
          while(true) {
            if (accept(/* ')' */41)) {
              return epsilon;
            }
            i.contents = i.contents + 1 | 0;
            _param = undefined;
            continue ;
          };
        }
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      let r$1 = regexp$p(branch$p(/* [] */0));
      if (!accept(/* ')' */41)) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      return {
              TAG: "Group",
              _0: r$1
            };
    }
    if (accept(/* '^' */94)) {
      if (multiline) {
        return "Beg_of_line";
      } else {
        return "Beg_of_str";
      }
    }
    if (accept(/* '$' */36)) {
      if (multiline) {
        return "End_of_line";
      } else if (dollar_endonly) {
        return "Last_end_of_line";
      } else {
        return "End_of_str";
      }
    }
    if (accept(/* '[' */91)) {
      if (accept(/* '^' */94)) {
        return compl(bracket(/* [] */0));
      } else {
        return alt$1(bracket(/* [] */0));
      }
    }
    if (accept(/* '\\' */92)) {
      if (i.contents === l) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      let c = get(undefined);
      switch (c) {
        case 48 :
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            throw {
                  RE_EXN_ID: Not_supported,
                  Error: new Error()
                };
        case 65 :
            return "Beg_of_str";
        case 66 :
            return "Not_bound";
        case 68 :
            return compl({
                        hd: digit,
                        tl: /* [] */0
                      });
        case 71 :
            return "Start";
        case 83 :
            return compl({
                        hd: space,
                        tl: /* [] */0
                      });
        case 87 :
            return compl({
                        hd: alnum,
                        tl: {
                          hd: {
                            TAG: "Set",
                            _0: {
                              hd: [
                                /* '_' */95,
                                /* '_' */95
                              ],
                              tl: /* [] */0
                            }
                          },
                          tl: /* [] */0
                        }
                      });
        case 90 :
            return "Last_end_of_line";
        case 58 :
        case 59 :
        case 60 :
        case 61 :
        case 62 :
        case 63 :
        case 64 :
        case 91 :
        case 92 :
        case 93 :
        case 94 :
        case 95 :
        case 96 :
            return {
                    TAG: "Set",
                    _0: single(c)
                  };
        case 98 :
            return alt$1({
                        hd: "Beg_of_word",
                        tl: {
                          hd: "End_of_word",
                          tl: /* [] */0
                        }
                      });
        case 100 :
            return digit;
        case 115 :
            return space;
        case 119 :
            return alt$1({
                        hd: alnum,
                        tl: {
                          hd: {
                            TAG: "Set",
                            _0: {
                              hd: [
                                /* '_' */95,
                                /* '_' */95
                              ],
                              tl: /* [] */0
                            }
                          },
                          tl: /* [] */0
                        }
                      });
        case 67 :
        case 69 :
        case 70 :
        case 72 :
        case 73 :
        case 74 :
        case 75 :
        case 76 :
        case 77 :
        case 78 :
        case 79 :
        case 80 :
        case 81 :
        case 82 :
        case 84 :
        case 85 :
        case 86 :
        case 88 :
        case 89 :
        case 97 :
        case 99 :
        case 101 :
        case 102 :
        case 103 :
        case 104 :
        case 105 :
        case 106 :
        case 107 :
        case 108 :
        case 109 :
        case 110 :
        case 111 :
        case 112 :
        case 113 :
        case 114 :
        case 116 :
        case 117 :
        case 118 :
        case 120 :
        case 121 :
            throw {
                  RE_EXN_ID: Parse_error,
                  Error: new Error()
                };
        case 122 :
            return "End_of_str";
        default:
          return {
                  TAG: "Set",
                  _0: single(c)
                };
      }
    } else {
      if (i.contents === l) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      let c$1 = get(undefined);
      if (c$1 >= 64) {
        if (c$1 !== 92) {
          if (c$1 !== 123) {
            return {
                    TAG: "Set",
                    _0: single(c$1)
                  };
          }
          throw {
                RE_EXN_ID: Parse_error,
                Error: new Error()
              };
        }
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      if (c$1 >= 44) {
        if (c$1 >= 63) {
          throw {
                RE_EXN_ID: Parse_error,
                Error: new Error()
              };
        }
        return {
                TAG: "Set",
                _0: single(c$1)
              };
      }
      if (c$1 >= 42) {
        throw {
              RE_EXN_ID: Parse_error,
              Error: new Error()
            };
      }
      return {
              TAG: "Set",
              _0: single(c$1)
            };
    }
  };
  let res = regexp$p(branch$p(/* [] */0));
  if (i.contents !== l) {
    throw {
          RE_EXN_ID: Parse_error,
          Error: new Error()
        };
  }
  return res;
}

function re(flagsOpt, pat) {
  let flags = flagsOpt !== undefined ? flagsOpt : /* [] */0;
  let opts = List.map((function (param) {
          if (param === "CASELESS") {
            return "Caseless";
          } else if (param === "ANCHORED") {
            return "Anchored";
          } else {
            return "Multiline";
          }
        }), flags);
  let optsOpt = opts;
  let opts$1 = optsOpt !== undefined ? optsOpt : /* [] */0;
  let r = parse(List.memq("Multiline", opts$1), List.memq("Dollar_endonly", opts$1), List.memq("Dotall", opts$1), List.memq("Ungreedy", opts$1), pat);
  let r$1 = List.memq("Anchored", opts$1) ? seq$2({
          hd: "Start",
          tl: {
            hd: r,
            tl: /* [] */0
          }
        }) : r;
  if (List.memq("Caseless", opts$1)) {
    return {
            TAG: "No_case",
            _0: r$1
          };
  } else {
    return r$1;
  }
}

function exec(rex, pos, s) {
  let len;
  let substr = exec_internal("Re.exec", pos, len, true, rex, s);
  if (typeof substr === "object") {
    return substr._0;
  }
  if (substr === "Failed") {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

let s = "a".repeat(1048575) + "b";

eq("File \"ocaml_re_test.ml\", line 3292, characters 3-10", get(exec(compile(re(undefined, "aa?b")), undefined, s), 0), "aab");

Mt.from_pair_suites("Ocaml_re_test", suites.contents);

/* Table Not a pure module */
