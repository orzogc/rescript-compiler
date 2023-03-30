'use strict';

let ReasonReact = require("./reasonReact.js");

let wrapReactForReasonReact = ReasonReact.wrapJsForReason;

let wrapReasonReactForReact = ReasonReact.wrapReasonForJs;

exports.wrapReactForReasonReact = wrapReactForReasonReact;
exports.wrapReasonReactForReact = wrapReasonReactForReact;
/* ReasonReact Not a pure module */
