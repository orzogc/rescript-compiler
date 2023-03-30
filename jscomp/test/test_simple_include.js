'use strict';

let $$Array = require("../../lib/js/array.js");

let v = {
  contents: 32
};

v.contents = 0;

let N = {
  a: 3,
  v: v
};

let v$1 = {
  contents: 32
};

let NN = {
  a: 3,
  v: v$1
};

let make_float = $$Array.make_float;

let init = $$Array.init;

let make_matrix = $$Array.make_matrix;

let create_matrix = $$Array.create_matrix;

let append = $$Array.append;

let concat = $$Array.concat;

let sub = $$Array.sub;

let copy = $$Array.copy;

let fill = $$Array.fill;

let blit = $$Array.blit;

let to_list = $$Array.to_list;

let of_list = $$Array.of_list;

let iter = $$Array.iter;

let iteri = $$Array.iteri;

let map = $$Array.map;

let mapi = $$Array.mapi;

let fold_left = $$Array.fold_left;

let fold_right = $$Array.fold_right;

let iter2 = $$Array.iter2;

let map2 = $$Array.map2;

let for_all = $$Array.for_all;

let exists = $$Array.exists;

let mem = $$Array.mem;

let memq = $$Array.memq;

let sort = $$Array.sort;

let stable_sort = $$Array.stable_sort;

let fast_sort = $$Array.fast_sort;

let Floatarray = $$Array.Floatarray;

let a = 3;

exports.make_float = make_float;
exports.init = init;
exports.make_matrix = make_matrix;
exports.create_matrix = create_matrix;
exports.append = append;
exports.concat = concat;
exports.sub = sub;
exports.copy = copy;
exports.fill = fill;
exports.blit = blit;
exports.to_list = to_list;
exports.of_list = of_list;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.for_all = for_all;
exports.exists = exists;
exports.mem = mem;
exports.memq = memq;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.fast_sort = fast_sort;
exports.Floatarray = Floatarray;
exports.N = N;
exports.NN = NN;
exports.a = a;
exports.v = v;
/*  Not a pure module */
