'use strict';

let Caml = require("../../lib/js/caml.js");
let List = require("../../lib/js/list.js");
let $$Array = require("../../lib/js/array.js");
let $$String = require("../../lib/js/string.js");
let Set_gen = require("./set_gen.js");

function split(x, tree) {
  if (typeof tree !== "object") {
    return [
            "Empty",
            false,
            "Empty"
          ];
  }
  let r = tree._2;
  let v = tree._1;
  let l = tree._0;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    return [
            l,
            true,
            r
          ];
  }
  if (c < 0) {
    let match = split(x, l);
    return [
            match[0],
            match[1],
            Set_gen.internal_join(match[2], v, r)
          ];
  }
  let match$1 = split(x, r);
  return [
          Set_gen.internal_join(l, v, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function add(x, tree) {
  if (typeof tree !== "object") {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: "Empty",
            _3: 1
          };
  }
  let r = tree._2;
  let v = tree._1;
  let l = tree._0;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    return tree;
  } else if (c < 0) {
    return Set_gen.internal_bal(add(x, l), v, r);
  } else {
    return Set_gen.internal_bal(l, v, add(x, r));
  }
}

function union(s1, s2) {
  if (typeof s1 !== "object") {
    return s2;
  }
  let h1 = s1._3;
  let v1 = s1._1;
  if (typeof s2 !== "object") {
    return s1;
  }
  let h2 = s2._3;
  let v2 = s2._1;
  if (h1 >= h2) {
    if (h2 === 1) {
      return add(v2, s1);
    }
    let match = split(v1, s2);
    return Set_gen.internal_join(union(s1._0, match[0]), v1, union(s1._2, match[2]));
  }
  if (h1 === 1) {
    return add(v1, s2);
  }
  let match$1 = split(v2, s1);
  return Set_gen.internal_join(union(match$1[0], s2._0), v2, union(match$1[2], s2._2));
}

function inter(s1, s2) {
  if (typeof s1 !== "object") {
    return "Empty";
  }
  if (typeof s2 !== "object") {
    return "Empty";
  }
  let r1 = s1._2;
  let v1 = s1._1;
  let l1 = s1._0;
  let match = split(v1, s2);
  let l2 = match[0];
  if (match[1]) {
    return Set_gen.internal_join(inter(l1, l2), v1, inter(r1, match[2]));
  } else {
    return Set_gen.internal_concat(inter(l1, l2), inter(r1, match[2]));
  }
}

function diff(s1, s2) {
  if (typeof s1 !== "object") {
    return "Empty";
  }
  if (typeof s2 !== "object") {
    return s1;
  }
  let r1 = s1._2;
  let v1 = s1._1;
  let l1 = s1._0;
  let match = split(v1, s2);
  let l2 = match[0];
  if (match[1]) {
    return Set_gen.internal_concat(diff(l1, l2), diff(r1, match[2]));
  } else {
    return Set_gen.internal_join(diff(l1, l2), v1, diff(r1, match[2]));
  }
}

function mem(x, _tree) {
  while(true) {
    let tree = _tree;
    if (typeof tree !== "object") {
      return false;
    }
    let c = Caml.string_compare(x, tree._1);
    if (c === 0) {
      return true;
    }
    _tree = c < 0 ? tree._0 : tree._2;
    continue ;
  };
}

function remove(x, tree) {
  if (typeof tree !== "object") {
    return "Empty";
  }
  let r = tree._2;
  let v = tree._1;
  let l = tree._0;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    return Set_gen.internal_merge(l, r);
  } else if (c < 0) {
    return Set_gen.internal_bal(remove(x, l), v, r);
  } else {
    return Set_gen.internal_bal(l, v, remove(x, r));
  }
}

function compare(s1, s2) {
  return Set_gen.compare($$String.compare, s1, s2);
}

function equal(s1, s2) {
  return Set_gen.compare($$String.compare, s1, s2) === 0;
}

function subset(_s1, _s2) {
  while(true) {
    let s2 = _s2;
    let s1 = _s1;
    if (typeof s1 !== "object") {
      return true;
    }
    let r1 = s1._2;
    let v1 = s1._1;
    let l1 = s1._0;
    if (typeof s2 !== "object") {
      return false;
    }
    let r2 = s2._2;
    let l2 = s2._0;
    let c = Caml.string_compare(v1, s2._1);
    if (c === 0) {
      if (!subset(l1, l2)) {
        return false;
      }
      _s2 = r2;
      _s1 = r1;
      continue ;
    }
    if (c < 0) {
      if (!subset({
              TAG: "Node",
              _0: l1,
              _1: v1,
              _2: "Empty",
              _3: 0
            }, l2)) {
        return false;
      }
      _s1 = r1;
      continue ;
    }
    if (!subset({
            TAG: "Node",
            _0: "Empty",
            _1: v1,
            _2: r1,
            _3: 0
          }, r2)) {
      return false;
    }
    _s1 = l1;
    continue ;
  };
}

function find(x, _tree) {
  while(true) {
    let tree = _tree;
    if (typeof tree !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let v = tree._1;
    let c = Caml.string_compare(x, v);
    if (c === 0) {
      return v;
    }
    _tree = c < 0 ? tree._0 : tree._2;
    continue ;
  };
}

function of_list(l) {
  if (!l) {
    return "Empty";
  }
  let match = l.tl;
  let x0 = l.hd;
  if (!match) {
    return Set_gen.singleton(x0);
  }
  let match$1 = match.tl;
  let x1 = match.hd;
  if (!match$1) {
    return add(x1, Set_gen.singleton(x0));
  }
  let match$2 = match$1.tl;
  let x2 = match$1.hd;
  if (!match$2) {
    return add(x2, add(x1, Set_gen.singleton(x0)));
  }
  let match$3 = match$2.tl;
  let x3 = match$2.hd;
  if (match$3) {
    if (match$3.tl) {
      return Set_gen.of_sorted_list(List.sort_uniq($$String.compare, l));
    } else {
      return add(match$3.hd, add(x3, add(x2, add(x1, Set_gen.singleton(x0)))));
    }
  } else {
    return add(x3, add(x2, add(x1, Set_gen.singleton(x0))));
  }
}

function of_array(l) {
  return $$Array.fold_left((function (acc, x) {
                return add(x, acc);
              }), "Empty", l);
}

function invariant(t) {
  Set_gen.check(t);
  return Set_gen.is_ordered($$String.compare, t);
}

let compare_elt = $$String.compare;

let empty = "Empty";

let is_empty = Set_gen.is_empty;

let iter = Set_gen.iter;

let fold = Set_gen.fold;

let for_all = Set_gen.for_all;

let exists = Set_gen.exists;

let singleton = Set_gen.singleton;

let cardinal = Set_gen.cardinal;

let elements = Set_gen.elements;

let min_elt = Set_gen.min_elt;

let max_elt = Set_gen.max_elt;

let choose = Set_gen.choose;

let partition = Set_gen.partition;

let filter = Set_gen.filter;

let of_sorted_list = Set_gen.of_sorted_list;

let of_sorted_array = Set_gen.of_sorted_array;

exports.compare_elt = compare_elt;
exports.empty = empty;
exports.is_empty = is_empty;
exports.iter = iter;
exports.fold = fold;
exports.for_all = for_all;
exports.exists = exists;
exports.singleton = singleton;
exports.cardinal = cardinal;
exports.elements = elements;
exports.min_elt = min_elt;
exports.max_elt = max_elt;
exports.choose = choose;
exports.partition = partition;
exports.filter = filter;
exports.of_sorted_list = of_sorted_list;
exports.of_sorted_array = of_sorted_array;
exports.split = split;
exports.add = add;
exports.union = union;
exports.inter = inter;
exports.diff = diff;
exports.mem = mem;
exports.remove = remove;
exports.compare = compare;
exports.equal = equal;
exports.subset = subset;
exports.find = find;
exports.of_list = of_list;
exports.of_array = of_array;
exports.invariant = invariant;
/* No side effect */
