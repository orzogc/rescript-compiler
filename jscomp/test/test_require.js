'use strict';


let u = typeof require === "undefined" ? undefined : require;

if (u !== undefined) {
  let match = typeof module === "undefined" ? undefined : module;
  let match$1 = u.main;
  if (match !== undefined && match$1 !== undefined && match === match$1) {
    console.log("is main");
  } else {
    console.log("not main");
  }
}

/* u Not a pure module */
