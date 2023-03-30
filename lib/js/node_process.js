'use strict';

let Js_dict = require("./js_dict.js");
let Process = require("process");

function putEnvVar(key, $$var) {
  Process.env[key] = $$var;
}

function deleteEnvVar(s) {
  Js_dict.unsafeDeleteKey(Process.env, s);
}

exports.putEnvVar = putEnvVar;
exports.deleteEnvVar = deleteEnvVar;
/* process Not a pure module */
