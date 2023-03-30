'use strict';

let Export_keyword = require("./export_keyword.js");

function test2(v) {
  return {
          open: v.open,
          window: v.window
        };
}

function test(p) {
  return [
          p.catch,
          p.then
        ];
}

let $$case = Export_keyword.$$case;

let $$window = Export_keyword.$$window;

let $$switch = Export_keyword.$$switch;

exports.test2 = test2;
exports.test = test;
exports.$$case = $$case;
exports.$$window = $$window;
exports.$$switch = $$switch;
/* No side effect */
