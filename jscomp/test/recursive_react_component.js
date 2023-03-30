'use strict';

let React = require("react");

function make(Props) {
  let foo = Props.foo;
  return React.createElement(make, {
              foo: foo
            });
}

exports.make = make;
/* react Not a pure module */
