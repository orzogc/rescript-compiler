'use strict';

let List = require("../../lib/js/list.js");

List.find((function (x) {
        return x > 3;
      }), /* [] */0);

/*  Not a pure module */
