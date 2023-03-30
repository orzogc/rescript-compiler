'use strict';

let Bytes = require("../../lib/js/bytes.js");
let Caml_bytes = require("../../lib/js/caml_bytes.js");

function gray_encode(b) {
  return b ^ (b >>> 1);
}

function gray_decode(n) {
  let _p = n;
  let _n = (n >>> 1);
  while(true) {
    let n$1 = _n;
    let p = _p;
    if (n$1 === 0) {
      return p;
    }
    _n = (n$1 >>> 1);
    _p = p ^ n$1;
    continue ;
  };
}

function bool_string(len, n) {
  let s = Bytes.make(len, /* '0' */48);
  let _i = len - 1 | 0;
  let _n = n;
  while(true) {
    let n$1 = _n;
    let i = _i;
    if ((n$1 & 1) === 1) {
      Caml_bytes.set(s, i, /* '1' */49);
    }
    if (i <= 0) {
      return s;
    }
    _n = (n$1 >>> 1);
    _i = i - 1 | 0;
    continue ;
  };
}

function next_power(v) {
  let v$1 = v - 1 | 0;
  let v$2 = (v$1 >>> 1) | v$1;
  let v$3 = (v$2 >>> 2) | v$2;
  let v$4 = (v$3 >>> 4) | v$3;
  let v$5 = (v$4 >>> 8) | v$4;
  let v$6 = (v$5 >>> 16) | v$5;
  return v$6 + 1 | 0;
}

exports.gray_encode = gray_encode;
exports.gray_decode = gray_decode;
exports.bool_string = bool_string;
exports.next_power = next_power;
/* No side effect */
