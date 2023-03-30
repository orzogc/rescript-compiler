'use strict';

let Mt = require("./mt.js");
let Fs = require("fs");
let Path = require("path");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, param) {
  let y = param[1];
  let x = param[0];
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

let x = typeof __filename === "undefined" ? undefined : __filename;

let current_file = x !== undefined ? x : "<Not Node JS>";

let x$1 = typeof __dirname === "undefined" ? undefined : __dirname;

let current_dir_name = x$1 !== undefined ? x$1 : "<Not Node Js>";

Fs.readFileSync(current_file, "utf8");

Fs.readdirSync(current_dir_name);

let pathobj = Path.parse(current_dir_name);

let module_ = typeof module === "undefined" ? undefined : module;

if (module_ !== undefined) {
  console.log([
        module_.id,
        module_.paths
      ]);
  eq("File \"fs_test.ml\", line 45, characters 7-14", [
        pathobj.name,
        "test"
      ]);
}

Mt.from_pair_suites("Fs_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/* x Not a pure module */
