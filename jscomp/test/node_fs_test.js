'use strict';

let Fs = require("fs");

let f = typeof __filename === "undefined" ? undefined : __filename;

if (f !== undefined) {
  console.log(Fs.readFileSync(f, "utf8"));
}

/* f Not a pure module */
