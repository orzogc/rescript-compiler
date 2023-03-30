'use strict';

let Belt_Result = require("../../lib/js/belt_Result.js");

Belt_Result.map({
      TAG: "Ok",
      _0: "Test"
    }, (function (r) {
        return "Value: " + r;
      }));

Belt_Result.getWithDefault(Belt_Result.map({
          TAG: "Error",
          _0: "error"
        }, (function (r) {
            return "Value: " + r;
          })), "success");

/*  Not a pure module */
