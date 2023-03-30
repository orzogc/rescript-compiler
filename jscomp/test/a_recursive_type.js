'use strict';

let Curry = require("../../lib/js/curry.js");

function g(x) {
  return Curry._1(x._0, x);
}

let loop = g({
      TAG: "A",
      _0: g
    });

let x = {
  TAG: "A",
  _0: g
};

let non_terminate = g(x);

let xx = {};

xx.xx = xx;

exports.loop = loop;
exports.non_terminate = non_terminate;
/* loop Not a pure module */
