// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Nodeos = require("node:os");

let match = Nodeos.platform();

let match$1;

switch (match) {
  case "darwin" :
  case "linux" :
    match$1 = [
      1,
      2
    ];
    break;
  default:
    match$1 = [
      3,
      4
    ];
}

let a = match$1[0];

let b = match$1[1];

exports.a = a;
exports.b = b;
/* match Not a pure module */
