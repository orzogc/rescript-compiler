'use strict';


let a = {
  TAG: "Color",
  _0: "#ffff"
};

let c;

c = typeof a !== "object" ? "orange" : "white";

exports.a = a;
exports.c = c;
/* c Not a pure module */
