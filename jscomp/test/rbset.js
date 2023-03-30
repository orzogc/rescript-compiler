'use strict';


function blackify(s) {
  if (typeof s !== "object" || s._0 === "Black") {
    return [
            s,
            true
          ];
  } else {
    return [
            {
              TAG: "Node",
              _0: "Black",
              _1: s._1,
              _2: s._2,
              _3: s._3
            },
            false
          ];
  }
}

function is_empty(param) {
  if (typeof param !== "object") {
    return true;
  } else {
    return false;
  }
}

function mem(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let y = param._2;
    if (x === y) {
      return true;
    }
    if (x < y) {
      _param = param._1;
      continue ;
    }
    _param = param._3;
    continue ;
  };
}

function balance_left(l, x, r) {
  let exit = 0;
  let a;
  let x$1;
  let b;
  let y;
  let c;
  let z;
  let d;
  if (typeof l !== "object" || l._0 === "Black") {
    exit = 1;
  } else {
    let a$1 = l._1;
    let exit$1 = 0;
    if (typeof a$1 !== "object" || a$1._0 === "Black") {
      exit$1 = 3;
    } else {
      a = a$1._1;
      x$1 = a$1._2;
      b = a$1._3;
      y = l._2;
      c = l._3;
      z = x;
      d = r;
      exit = 2;
    }
    if (exit$1 === 3) {
      let match = l._3;
      if (typeof match !== "object" || match._0 === "Black") {
        exit = 1;
      } else {
        a = a$1;
        x$1 = l._2;
        b = match._1;
        y = match._2;
        c = match._3;
        z = x;
        d = r;
        exit = 2;
      }
    }
    
  }
  switch (exit) {
    case 1 :
        return {
                TAG: "Node",
                _0: "Black",
                _1: l,
                _2: x,
                _3: r
              };
    case 2 :
        return {
                TAG: "Node",
                _0: "Red",
                _1: {
                  TAG: "Node",
                  _0: "Black",
                  _1: a,
                  _2: x$1,
                  _3: b
                },
                _2: y,
                _3: {
                  TAG: "Node",
                  _0: "Black",
                  _1: c,
                  _2: z,
                  _3: d
                }
              };
    
  }
}

function balance_right(l, x, r) {
  let exit = 0;
  let a;
  let x$1;
  let b;
  let y;
  let c;
  let z;
  let d;
  if (typeof r !== "object" || r._0 === "Black") {
    exit = 1;
  } else {
    let b$1 = r._1;
    let exit$1 = 0;
    if (typeof b$1 !== "object" || b$1._0 === "Black") {
      exit$1 = 3;
    } else {
      a = l;
      x$1 = x;
      b = b$1._1;
      y = b$1._2;
      c = b$1._3;
      z = r._2;
      d = r._3;
      exit = 2;
    }
    if (exit$1 === 3) {
      let match = r._3;
      if (typeof match !== "object" || match._0 === "Black") {
        exit = 1;
      } else {
        a = l;
        x$1 = x;
        b = b$1;
        y = r._2;
        c = match._1;
        z = match._2;
        d = match._3;
        exit = 2;
      }
    }
    
  }
  switch (exit) {
    case 1 :
        return {
                TAG: "Node",
                _0: "Black",
                _1: l,
                _2: x,
                _3: r
              };
    case 2 :
        return {
                TAG: "Node",
                _0: "Red",
                _1: {
                  TAG: "Node",
                  _0: "Black",
                  _1: a,
                  _2: x$1,
                  _3: b
                },
                _2: y,
                _3: {
                  TAG: "Node",
                  _0: "Black",
                  _1: c,
                  _2: z,
                  _3: d
                }
              };
    
  }
}

function singleton(x) {
  return {
          TAG: "Node",
          _0: "Black",
          _1: "Empty",
          _2: x,
          _3: "Empty"
        };
}

function unbalanced_left(param) {
  if (typeof param === "object") {
    if (param._0 === "Black") {
      let match = param._1;
      if (typeof match === "object") {
        if (match._0 === "Black") {
          return [
                  balance_left({
                        TAG: "Node",
                        _0: "Red",
                        _1: match._1,
                        _2: match._2,
                        _3: match._3
                      }, param._2, param._3),
                  true
                ];
        }
        let match$1 = match._3;
        if (typeof match$1 === "object" && match$1._0 === "Black") {
          return [
                  {
                    TAG: "Node",
                    _0: "Black",
                    _1: match._1,
                    _2: match._2,
                    _3: balance_left({
                          TAG: "Node",
                          _0: "Red",
                          _1: match$1._1,
                          _2: match$1._2,
                          _3: match$1._3
                        }, param._2, param._3)
                  },
                  false
                ];
        }
        
      }
      
    } else {
      let match$2 = param._1;
      if (typeof match$2 === "object" && match$2._0 === "Black") {
        return [
                balance_left({
                      TAG: "Node",
                      _0: "Red",
                      _1: match$2._1,
                      _2: match$2._2,
                      _3: match$2._3
                    }, param._2, param._3),
                false
              ];
      }
      
    }
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "rbset.ml",
          57,
          9
        ],
        Error: new Error()
      };
}

function unbalanced_right(param) {
  if (typeof param === "object") {
    if (param._0 === "Black") {
      let match = param._3;
      let x = param._2;
      let a = param._1;
      if (typeof match === "object") {
        if (match._0 === "Black") {
          return [
                  balance_right(a, x, {
                        TAG: "Node",
                        _0: "Red",
                        _1: match._1,
                        _2: match._2,
                        _3: match._3
                      }),
                  true
                ];
        }
        let match$1 = match._1;
        if (typeof match$1 === "object" && match$1._0 === "Black") {
          return [
                  {
                    TAG: "Node",
                    _0: "Black",
                    _1: balance_right(a, x, {
                          TAG: "Node",
                          _0: "Red",
                          _1: match$1._1,
                          _2: match$1._2,
                          _3: match$1._3
                        }),
                    _2: match._2,
                    _3: match._3
                  },
                  false
                ];
        }
        
      }
      
    } else {
      let match$2 = param._3;
      if (typeof match$2 === "object" && match$2._0 === "Black") {
        return [
                balance_right(param._1, param._2, {
                      TAG: "Node",
                      _0: "Red",
                      _1: match$2._1,
                      _2: match$2._2,
                      _3: match$2._3
                    }),
                false
              ];
      }
      
    }
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "rbset.ml",
          63,
          9
        ],
        Error: new Error()
      };
}

function lbalance(x1, x2, x3) {
  if (typeof x1 !== "object") {
    return {
            TAG: "Node",
            _0: "Black",
            _1: x1,
            _2: x2,
            _3: x3
          };
  }
  if (x1._0 === "Black") {
    return {
            TAG: "Node",
            _0: "Black",
            _1: x1,
            _2: x2,
            _3: x3
          };
  }
  let r = x1._3;
  let l = x1._1;
  if (typeof l === "object" && l._0 !== "Black") {
    return {
            TAG: "Node",
            _0: "Red",
            _1: {
              TAG: "Node",
              _0: "Black",
              _1: l._1,
              _2: l._2,
              _3: l._3
            },
            _2: x1._2,
            _3: {
              TAG: "Node",
              _0: "Black",
              _1: r,
              _2: x2,
              _3: x3
            }
          };
  }
  if (typeof r !== "object") {
    return {
            TAG: "Node",
            _0: "Black",
            _1: x1,
            _2: x2,
            _3: x3
          };
  }
  if (r._0 === "Black") {
    return {
            TAG: "Node",
            _0: "Black",
            _1: x1,
            _2: x2,
            _3: x3
          };
  }
  let y = r._2;
  return {
          TAG: "Node",
          _0: "Red",
          _1: {
            TAG: "Node",
            _0: "Black",
            _1: l,
            _2: y,
            _3: r._1
          },
          _2: y,
          _3: {
            TAG: "Node",
            _0: "Black",
            _1: r._3,
            _2: x2,
            _3: x3
          }
        };
}

function rbalance(x1, x2, x3) {
  if (typeof x3 === "object" && x3._0 !== "Black") {
    let b = x3._1;
    let exit = 0;
    if (typeof b !== "object") {
      exit = 2;
    } else {
      if (b._0 !== "Black") {
        return {
                TAG: "Node",
                _0: "Red",
                _1: {
                  TAG: "Node",
                  _0: "Black",
                  _1: x1,
                  _2: x2,
                  _3: b._1
                },
                _2: b._2,
                _3: {
                  TAG: "Node",
                  _0: "Black",
                  _1: b._3,
                  _2: x3._2,
                  _3: x3._3
                }
              };
      }
      exit = 2;
    }
    if (exit === 2) {
      let match = x3._3;
      if (typeof match === "object" && match._0 !== "Black") {
        return {
                TAG: "Node",
                _0: "Red",
                _1: {
                  TAG: "Node",
                  _0: "Black",
                  _1: x1,
                  _2: x2,
                  _3: b
                },
                _2: x3._2,
                _3: {
                  TAG: "Node",
                  _0: "Black",
                  _1: match._1,
                  _2: match._2,
                  _3: match._3
                }
              };
      }
      
    }
    
  }
  return {
          TAG: "Node",
          _0: "Black",
          _1: x1,
          _2: x2,
          _3: x3
        };
}

function ins(x, s) {
  if (typeof s !== "object") {
    return {
            TAG: "Node",
            _0: "Red",
            _1: "Empty",
            _2: x,
            _3: "Empty"
          };
  }
  if (s._0 === "Black") {
    let y = s._2;
    if (x === y) {
      return s;
    }
    let b = s._3;
    let a = s._1;
    if (x < y) {
      return lbalance(ins(x, a), y, b);
    } else {
      return rbalance(a, y, ins(x, b));
    }
  }
  let y$1 = s._2;
  if (x === y$1) {
    return s;
  }
  let b$1 = s._3;
  let a$1 = s._1;
  if (x < y$1) {
    return {
            TAG: "Node",
            _0: "Red",
            _1: ins(x, a$1),
            _2: y$1,
            _3: b$1
          };
  } else {
    return {
            TAG: "Node",
            _0: "Red",
            _1: a$1,
            _2: y$1,
            _3: ins(x, b$1)
          };
  }
}

function add(x, s) {
  let s$1 = ins(x, s);
  if (typeof s$1 !== "object" || s$1._0 === "Black") {
    return s$1;
  } else {
    return {
            TAG: "Node",
            _0: "Black",
            _1: s$1._1,
            _2: s$1._2,
            _3: s$1._3
          };
  }
}

function remove_min(param) {
  if (typeof param !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "rbset.ml",
            115,
            4
          ],
          Error: new Error()
        };
  }
  let c = param._0;
  if (c === "Black") {
    let tmp = param._1;
    if (typeof tmp !== "object") {
      let match = param._3;
      let x = param._2;
      if (typeof match !== "object") {
        return [
                "Empty",
                x,
                true
              ];
      }
      if (match._0 !== "Black") {
        return [
                {
                  TAG: "Node",
                  _0: "Black",
                  _1: match._1,
                  _2: match._2,
                  _3: match._3
                },
                x,
                false
              ];
      }
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "rbset.ml",
              115,
              4
            ],
            Error: new Error()
          };
    }
    
  } else {
    let tmp$1 = param._1;
    if (typeof tmp$1 !== "object") {
      return [
              param._3,
              param._2,
              false
            ];
    }
    
  }
  let match$1 = remove_min(param._1);
  let y = match$1[1];
  let s_1 = match$1[0];
  let s_2 = param._2;
  let s_3 = param._3;
  let s = {
    TAG: "Node",
    _0: c,
    _1: s_1,
    _2: s_2,
    _3: s_3
  };
  if (!match$1[2]) {
    return [
            s,
            y,
            false
          ];
  }
  let match$2 = unbalanced_right(s);
  return [
          match$2[0],
          y,
          match$2[1]
        ];
}

function remove_aux(x, n) {
  if (typeof n !== "object") {
    return [
            "Empty",
            false
          ];
  }
  let r = n._3;
  let y = n._2;
  let l = n._1;
  let c = n._0;
  if (x === y) {
    if (typeof r !== "object") {
      if (c === "Red") {
        return [
                l,
                false
              ];
      } else {
        return blackify(l);
      }
    }
    let match = remove_min(r);
    let n_2 = match[1];
    let n_3 = match[0];
    let n$1 = {
      TAG: "Node",
      _0: c,
      _1: l,
      _2: n_2,
      _3: n_3
    };
    if (match[2]) {
      return unbalanced_left(n$1);
    } else {
      return [
              n$1,
              false
            ];
    }
  }
  if (x < y) {
    let match$1 = remove_aux(x, l);
    let n_1 = match$1[0];
    let n$2 = {
      TAG: "Node",
      _0: c,
      _1: n_1,
      _2: y,
      _3: r
    };
    if (match$1[1]) {
      return unbalanced_right(n$2);
    } else {
      return [
              n$2,
              false
            ];
    }
  }
  let match$2 = remove_aux(x, r);
  let n_3$1 = match$2[0];
  let n$3 = {
    TAG: "Node",
    _0: c,
    _1: l,
    _2: y,
    _3: n_3$1
  };
  if (match$2[1]) {
    return unbalanced_left(n$3);
  } else {
    return [
            n$3,
            false
          ];
  }
}

function remove(x, s) {
  return remove_aux(x, s)[0];
}

function cardinal(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return (1 + cardinal(param._1) | 0) + cardinal(param._3) | 0;
  }
}

let empty = "Empty";

exports.blackify = blackify;
exports.empty = empty;
exports.is_empty = is_empty;
exports.mem = mem;
exports.balance_left = balance_left;
exports.balance_right = balance_right;
exports.singleton = singleton;
exports.unbalanced_left = unbalanced_left;
exports.unbalanced_right = unbalanced_right;
exports.lbalance = lbalance;
exports.rbalance = rbalance;
exports.ins = ins;
exports.add = add;
exports.remove_min = remove_min;
exports.remove_aux = remove_aux;
exports.remove = remove;
exports.cardinal = cardinal;
/* No side effect */
