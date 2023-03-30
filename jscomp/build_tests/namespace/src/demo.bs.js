'use strict';

let Demo$Liba = require("liba/src/demo.bs.js");
let Demo$Libb = require("libb/src/demo.bs.js");

let v = Demo$Liba.v + Demo$Libb.v | 0;

exports.v = v;
/* No side effect */
