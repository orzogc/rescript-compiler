'use strict';


function height(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param._3;
  }
}

function create(l, v, r) {
  let hl = height(l);
  let hr = height(r);
  return {
          TAG: "Node",
          _0: l,
          _1: v,
          _2: r,
          _3: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal(l, v, r) {
  let hl = height(l);
  let hr = height(r);
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      return "Empty";
    }
    let lr = l._2;
    let lv = l._1;
    let ll = l._0;
    if (height(ll) >= height(lr)) {
      return create(ll, lv, create(lr, v, r));
    } else if (typeof lr !== "object") {
      return "Empty";
    } else {
      return create(create(ll, lv, lr._0), lr._1, create(lr._2, v, r));
    }
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            _0: l,
            _1: v,
            _2: r,
            _3: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    return "Empty";
  }
  let rr = r._2;
  let rv = r._1;
  let rl = r._0;
  if (height(rr) >= height(rl)) {
    return create(create(l, v, rl), rv, rr);
  } else if (typeof rl !== "object") {
    return "Empty";
  } else {
    return create(create(l, v, rl._0), rl._1, create(rl._2, rv, rr));
  }
}

function compare_int(x, y) {
  if (x > y) {
    return 1;
  } else if (x === y) {
    return 0;
  } else {
    return -1;
  }
}

function add(x, t) {
  if (typeof t !== "object") {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: "Empty",
            _3: 1
          };
  }
  let r = t._2;
  let v = t._1;
  let l = t._0;
  let c = compare_int(x, v);
  if (c === 0) {
    return t;
  } else if (c < 0) {
    return bal(add(x, l), v, r);
  } else {
    return bal(l, v, add(x, r));
  }
}

function min_elt(_def, _param) {
  while(true) {
    let param = _param;
    let def = _def;
    if (typeof param !== "object") {
      return def;
    }
    let l = param._0;
    if (typeof l !== "object") {
      return param._1;
    }
    _param = l;
    _def = param._1;
    continue ;
  };
}

function remove_min_elt(l, v, r) {
  if (typeof l !== "object") {
    return r;
  } else {
    return bal(remove_min_elt(l._0, l._1, l._2), v, r);
  }
}

function internal_merge(l, r) {
  if (typeof l !== "object") {
    return r;
  }
  if (typeof r !== "object") {
    return l;
  }
  let rv = r._1;
  return bal(l, min_elt(rv, r), remove_min_elt(r._0, rv, r._2));
}

function remove(x, tree) {
  if (typeof tree !== "object") {
    return "Empty";
  }
  let r = tree._2;
  let v = tree._1;
  let l = tree._0;
  let c = compare_int(x, v);
  if (c === 0) {
    return internal_merge(l, r);
  } else if (c < 0) {
    return bal(remove(x, l), v, r);
  } else {
    return bal(l, v, remove(x, r));
  }
}

function mem(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let c = compare_int(x, param._1);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param._0 : param._2;
    continue ;
  };
}

let v = "Empty";

for(let i = 0; i <= 100000; ++i){
  v = add(i, v);
}

for(let i$1 = 0; i$1 <= 100000; ++i$1){
  if (!mem(i$1, v)) {
    console.log("impossible");
  }
  
}

for(let i$2 = 0; i$2 <= 100000; ++i$2){
  v = remove(i$2, v);
}

let match = v;

if (typeof match === "object") {
  console.log("impossible");
}

exports.height = height;
exports.create = create;
exports.bal = bal;
exports.compare_int = compare_int;
exports.add = add;
exports.min_elt = min_elt;
exports.remove_min_elt = remove_min_elt;
exports.internal_merge = internal_merge;
exports.remove = remove;
exports.mem = mem;
/*  Not a pure module */
