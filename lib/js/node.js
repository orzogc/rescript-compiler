'use strict';


function test(x) {
  if (typeof x === "string") {
    return [
            "String",
            x
          ];
  } else {
    return [
            "Buffer",
            x
          ];
  }
}

let Path;

let Fs;

let Process;

let Module;

let $$Buffer;

let Child_process;

exports.Path = Path;
exports.Fs = Fs;
exports.Process = Process;
exports.Module = Module;
exports.$$Buffer = $$Buffer;
exports.Child_process = Child_process;
exports.test = test;
/* No side effect */
