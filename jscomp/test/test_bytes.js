'use strict';

let Bytes = require("../../lib/js/bytes.js");

let f = Bytes.unsafe_to_string;

let ff = Bytes.to_string;

exports.f = f;
exports.ff = ff;
/* No side effect */
