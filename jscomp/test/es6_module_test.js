'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");

function length(param) {
  return 3;
}

Mt.from_pair_suites("Es6_module_test", {
      hd: [
        "list_length",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: List.length({
                          hd: 1,
                          tl: {
                            hd: 2,
                            tl: /* [] */0
                          }
                        }),
                    _1: 2
                  };
          })
      ],
      tl: {
        hd: [
          "length",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: 3,
                      _1: 3
                    };
            })
        ],
        tl: /* [] */0
      }
    });

exports.length = length;
/*  Not a pure module */
