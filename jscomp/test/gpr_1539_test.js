'use strict';

let Caml_module = require("../../lib/js/caml_module.js");

let Point = Caml_module.init_mod([
      "gpr_1539_test.ml",
      10,
      6
    ], {
      TAG: "Module",
      _0: [[
          "Function",
          "add"
        ]]
    });

Caml_module.update_mod({
      TAG: "Module",
      _0: [[
          "Function",
          "add"
        ]]
    }, Point, {
      add: (function (prim0, prim1) {
          return prim0.add(prim1);
        })
    });

let CRS;

let Layer;

exports.CRS = CRS;
exports.Layer = Layer;
exports.Point = Point;
/* Point Not a pure module */
