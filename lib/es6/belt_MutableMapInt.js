

import * as Caml_option from "./caml_option.js";
import * as Belt_internalMapInt from "./belt_internalMapInt.js";
import * as Belt_internalAVLtree from "./belt_internalAVLtree.js";

function make() {
  return {
    data: undefined
  };
}

function isEmpty(m) {
  let x = m.data;
  return x === undefined;
}

function clear(m) {
  m.data = undefined;
}

function minKeyUndefined(m) {
  return Belt_internalAVLtree.minKeyUndefined(m.data);
}

function minKey(m) {
  return Belt_internalAVLtree.minKey(m.data);
}

function maxKeyUndefined(m) {
  return Belt_internalAVLtree.maxKeyUndefined(m.data);
}

function maxKey(m) {
  return Belt_internalAVLtree.maxKey(m.data);
}

function minimum(m) {
  return Belt_internalAVLtree.minimum(m.data);
}

function minUndefined(m) {
  return Belt_internalAVLtree.minUndefined(m.data);
}

function maximum(m) {
  return Belt_internalAVLtree.maximum(m.data);
}

function maxUndefined(m) {
  return Belt_internalAVLtree.maxUndefined(m.data);
}

function set(m, k, v) {
  let old_data = m.data;
  let v$1 = Belt_internalMapInt.addMutate(old_data, k, v);
  if (v$1 !== old_data) {
    m.data = v$1;
    return;
  }
  
}

function forEachU(d, f) {
  Belt_internalAVLtree.forEachU(d.data, f);
}

function forEach(d, f) {
  Belt_internalAVLtree.forEachU(d.data, (function (a, b) {
    f(a, b);
  }));
}

function mapU(d, f) {
  return {
    data: Belt_internalAVLtree.mapU(d.data, f)
  };
}

function map(d, f) {
  return mapU(d, (function (a) {
    return f(a);
  }));
}

function mapWithKeyU(d, f) {
  return {
    data: Belt_internalAVLtree.mapWithKeyU(d.data, f)
  };
}

function mapWithKey(d, f) {
  return mapWithKeyU(d, (function (a, b) {
    return f(a, b);
  }));
}

function reduceU(d, acc, f) {
  return Belt_internalAVLtree.reduceU(d.data, acc, f);
}

function reduce(d, acc, f) {
  return reduceU(d, acc, (function (a, b, c) {
    return f(a, b, c);
  }));
}

function everyU(d, f) {
  return Belt_internalAVLtree.everyU(d.data, f);
}

function every(d, f) {
  return Belt_internalAVLtree.everyU(d.data, (function (a, b) {
    return f(a, b);
  }));
}

function someU(d, f) {
  return Belt_internalAVLtree.someU(d.data, f);
}

function some(d, f) {
  return Belt_internalAVLtree.someU(d.data, (function (a, b) {
    return f(a, b);
  }));
}

function size(d) {
  return Belt_internalAVLtree.size(d.data);
}

function toList(d) {
  return Belt_internalAVLtree.toList(d.data);
}

function toArray(d) {
  return Belt_internalAVLtree.toArray(d.data);
}

function keysToArray(d) {
  return Belt_internalAVLtree.keysToArray(d.data);
}

function valuesToArray(d) {
  return Belt_internalAVLtree.valuesToArray(d.data);
}

function checkInvariantInternal(d) {
  Belt_internalAVLtree.checkInvariantInternal(d.data);
}

function has(d, v) {
  return Belt_internalMapInt.has(d.data, v);
}

function removeMutateAux(nt, x) {
  let k = nt.k;
  if (x === k) {
    let l = nt.l;
    let r = nt.r;
    if (l !== undefined) {
      if (r !== undefined) {
        nt.r = Belt_internalAVLtree.removeMinAuxWithRootMutate(nt, r);
        return Belt_internalAVLtree.balMutate(nt);
      } else {
        return l;
      }
    } else {
      return r;
    }
  }
  if (x < k) {
    let l$1 = nt.l;
    if (l$1 !== undefined) {
      nt.l = removeMutateAux(l$1, x);
      return Belt_internalAVLtree.balMutate(nt);
    } else {
      return nt;
    }
  }
  let r$1 = nt.r;
  if (r$1 !== undefined) {
    nt.r = removeMutateAux(r$1, x);
    return Belt_internalAVLtree.balMutate(nt);
  } else {
    return nt;
  }
}

function remove(d, v) {
  let oldRoot = d.data;
  if (oldRoot === undefined) {
    return;
  }
  let newRoot = removeMutateAux(oldRoot, v);
  if (newRoot !== oldRoot) {
    d.data = newRoot;
    return;
  }
  
}

function updateDone(t, x, f) {
  if (t !== undefined) {
    let k = t.k;
    if (k === x) {
      let data = f(Caml_option.some(t.v));
      if (data !== undefined) {
        t.v = Caml_option.valFromOption(data);
        return t;
      }
      let l = t.l;
      let r = t.r;
      if (l !== undefined) {
        if (r !== undefined) {
          t.r = Belt_internalAVLtree.removeMinAuxWithRootMutate(t, r);
          return Belt_internalAVLtree.balMutate(t);
        } else {
          return l;
        }
      } else {
        return r;
      }
    }
    let l$1 = t.l;
    let r$1 = t.r;
    if (x < k) {
      let ll = updateDone(l$1, x, f);
      t.l = ll;
    } else {
      t.r = updateDone(r$1, x, f);
    }
    return Belt_internalAVLtree.balMutate(t);
  }
  let data$1 = f(undefined);
  if (data$1 !== undefined) {
    return Belt_internalAVLtree.singleton(x, Caml_option.valFromOption(data$1));
  } else {
    return t;
  }
}

function updateU(t, x, f) {
  let oldRoot = t.data;
  let newRoot = updateDone(oldRoot, x, f);
  if (newRoot !== oldRoot) {
    t.data = newRoot;
    return;
  }
  
}

function update(t, x, f) {
  updateU(t, x, (function (a) {
    return f(a);
  }));
}

function removeArrayMutateAux(_t, xs, _i, len) {
  while (true) {
    let i = _i;
    let t = _t;
    if (i >= len) {
      return t;
    }
    let ele = xs[i];
    let u = removeMutateAux(t, ele);
    if (u === undefined) {
      return;
    }
    _i = i + 1 | 0;
    _t = u;
    continue;
  };
}

function removeMany(d, xs) {
  let oldRoot = d.data;
  if (oldRoot === undefined) {
    return;
  }
  let len = xs.length;
  let newRoot = removeArrayMutateAux(oldRoot, xs, 0, len);
  if (newRoot !== oldRoot) {
    d.data = newRoot;
    return;
  }
  
}

function fromArray(xs) {
  return {
    data: Belt_internalMapInt.fromArray(xs)
  };
}

function cmpU(d0, d1, f) {
  return Belt_internalMapInt.cmpU(d0.data, d1.data, f);
}

function cmp(d0, d1, f) {
  return cmpU(d0, d1, (function (a, b) {
    return f(a, b);
  }));
}

function eqU(d0, d1, f) {
  return Belt_internalMapInt.eqU(d0.data, d1.data, f);
}

function eq(d0, d1, f) {
  return eqU(d0, d1, (function (a, b) {
    return f(a, b);
  }));
}

function get(d, x) {
  return Belt_internalMapInt.get(d.data, x);
}

function getUndefined(d, x) {
  return Belt_internalMapInt.getUndefined(d.data, x);
}

function getWithDefault(d, x, def) {
  return Belt_internalMapInt.getWithDefault(d.data, x, def);
}

function getExn(d, x) {
  return Belt_internalMapInt.getExn(d.data, x);
}

export {
  make,
  clear,
  isEmpty,
  has,
  cmpU,
  cmp,
  eqU,
  eq,
  forEachU,
  forEach,
  reduceU,
  reduce,
  everyU,
  every,
  someU,
  some,
  size,
  toList,
  toArray,
  fromArray,
  keysToArray,
  valuesToArray,
  minKey,
  minKeyUndefined,
  maxKey,
  maxKeyUndefined,
  minimum,
  minUndefined,
  maximum,
  maxUndefined,
  get,
  getUndefined,
  getWithDefault,
  getExn,
  checkInvariantInternal,
  remove,
  removeMany,
  set,
  updateU,
  update,
  mapU,
  map,
  mapWithKeyU,
  mapWithKey,
}
/* No side effect */
