'use strict';

let React = require("react");
let Caml_splice_call = require("./caml_splice_call.js");

function createElementWithKey(key, component, props) {
  return React.createElement(component, key !== undefined ? Object.assign({}, props, {
                    key: key
                  }) : props);
}

function createElementVariadicWithKey(key, component, props, elements) {
  return Caml_splice_call.spliceApply(React.createElement, [
              component,
              key !== undefined ? Object.assign({}, props, {
                      key: key
                    }) : props,
              elements
            ]);
}

let Jsx;

exports.Jsx = Jsx;
exports.createElementWithKey = createElementWithKey;
exports.createElementVariadicWithKey = createElementVariadicWithKey;
/* react Not a pure module */
