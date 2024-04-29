// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var CamlinternalLazy = require("../../lib/js/camlinternalLazy.js");

function fix(param) {
  return {
    TAG: "Fix",
    _0: CamlinternalLazy.from_fun(function () {
      return fix();
    })
  };
}

function unfixLeak(_f) {
  while(true) {
    var f = _f;
    _f = CamlinternalLazy.force(f._0);
    continue ;
  };
}

function unfix(p) {
  while(true) {
    var h = p.contents;
    p.contents = CamlinternalLazy.force(h._0);
  };
}

exports.fix = fix;
exports.unfixLeak = unfixLeak;
exports.unfix = unfix;
/* No side effect */
