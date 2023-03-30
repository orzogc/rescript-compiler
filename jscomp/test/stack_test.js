'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let Stack = require("../../lib/js/stack.js");

function to_list(v) {
  let acc = /* [] */0;
  while(v.c !== /* [] */0) {
    acc = {
      hd: Stack.pop(v),
      tl: acc
    };
  };
  return List.rev(acc);
}

function v(param) {
  let v$1 = {
    c: /* [] */0,
    len: 0
  };
  Stack.push(3, v$1);
  Stack.push(4, v$1);
  Stack.push(1, v$1);
  return to_list(v$1);
}

let suites_0 = [
  "push_test",
  (function (param) {
      return {
              TAG: "Eq",
              _0: {
                hd: 1,
                tl: {
                  hd: 4,
                  tl: {
                    hd: 3,
                    tl: /* [] */0
                  }
                }
              },
              _1: v(undefined)
            };
    })
];

let suites = {
  hd: suites_0,
  tl: /* [] */0
};

Mt.from_pair_suites("Stack_test", suites);

exports.to_list = to_list;
exports.v = v;
exports.suites = suites;
/*  Not a pure module */
