// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Curry = require("rescript/lib/js/curry.js");
let React = require("react");

function makeContainer(text) {
  let container = Curry._1(document.createElement, "div");
  container.className = "container";
  let title = Curry._1(document.createElement, "div");
  title.className = "containerTitle";
  title.innerText = text;
  let content = Curry._1(document.createElement, "div");
  content.className = "containerContent";
  Curry._1(container.appendChild, title);
  Curry._1(container.appendChild, content);
  Curry._1(document.body.appendChild, container);
  return content;
}

function makeProps(value, onChange, param) {
  return {
          value: value,
          onChange: onChange
        };
}

function make(_props) {
  return null;
}

let BuckleScript3987ReproOk = {
  makeProps: makeProps,
  make: make
};

React.createElement(make, makeProps("test", (function (param, param$1) {
            
          }), undefined));

function Gpr_3987_test$BuckleScript3987ReproOk2(Props) {
  return null;
}

let BuckleScript3987ReproOk2 = {
  make: Gpr_3987_test$BuckleScript3987ReproOk2
};

React.createElement(Gpr_3987_test$BuckleScript3987ReproOk2, {
      value: "test",
      onChange: (function (param, param$1) {
          
        })
    });

function Gpr_3987_test$BuckleScript3987ReproError(Props) {
  return null;
}

let BuckleScript3987ReproError = {
  make: Gpr_3987_test$BuckleScript3987ReproError
};

React.createElement(Gpr_3987_test$BuckleScript3987ReproError, {
      value: "test",
      onChange: (function (param, param$1) {
          
        })
    });

exports.makeContainer = makeContainer;
exports.BuckleScript3987ReproOk = BuckleScript3987ReproOk;
exports.BuckleScript3987ReproOk2 = BuckleScript3987ReproOk2;
exports.BuckleScript3987ReproError = BuckleScript3987ReproError;
/*  Not a pure module */
