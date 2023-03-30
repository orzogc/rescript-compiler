'use strict';

let Js_exn = require("../../lib/js/js_exn.js");
let Belt_MapInt = require("../../lib/js/belt_MapInt.js");

function should(b) {
  if (!b) {
    return Js_exn.raiseError("IMPOSSIBLE");
  }
  
}

function test(param) {
  let m;
  for(let i = 0; i <= 999999; ++i){
    m = Belt_MapInt.set(m, i, i);
  }
  for(let i$1 = 0; i$1 <= 999999; ++i$1){
    should(Belt_MapInt.get(m, i$1) !== undefined);
  }
  for(let i$2 = 0; i$2 <= 999999; ++i$2){
    m = Belt_MapInt.remove(m, i$2);
  }
  should(Belt_MapInt.isEmpty(m));
}

test(undefined);

let M;

exports.should = should;
exports.M = M;
exports.test = test;
/*  Not a pure module */
