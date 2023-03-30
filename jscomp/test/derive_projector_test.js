'use strict';


function u_x(param) {
  return param.u_x;
}

function b_x(param) {
  return param.b_x;
}

function c_x(param) {
  return param.c_x;
}

function d_int(param_0) {
  return {
          TAG: "D_int",
          _0: param_0
        };
}

function d_tuple(param_0, param_1) {
  return {
          TAG: "D_tuple",
          _0: param_0,
          _1: param_1
        };
}

function newContent(param_0) {
  return {
          TAG: "NewContent",
          _0: param_0
        };
}

function d_tweak(param_0) {
  return {
          TAG: "D_tweak",
          _0: param_0
        };
}

function u_X(param) {
  return param.u_X;
}

function d(param) {
  return param.d;
}

let v = {
  TAG: "D_int",
  _0: 3
};

let h_1 = {
  hd: {
    TAG: "D_int",
    _0: 3
  },
  tl: {
    hd: {
      TAG: "D_tuple",
      _0: 3,
      _1: "hgo"
    },
    tl: {
      hd: {
        TAG: "D_tweak",
        _0: [
          3,
          "hgo"
        ]
      },
      tl: {
        hd: {
          TAG: "NewContent",
          _0: "3"
        },
        tl: /* [] */0
      }
    }
  }
};

let h = {
  hd: "D_empty",
  tl: h_1
};

function xx(param_0) {
  return {
          TAG: "Xx",
          _0: param_0
        };
}

function a(param_0) {
  return {
          TAG: "A",
          _0: param_0
        };
}

let d_empty = "D_empty";

let hei = "Hei";

exports.u_x = u_x;
exports.b_x = b_x;
exports.c_x = c_x;
exports.d_empty = d_empty;
exports.d_int = d_int;
exports.d_tuple = d_tuple;
exports.newContent = newContent;
exports.d_tweak = d_tweak;
exports.hei = hei;
exports.u_X = u_X;
exports.d = d;
exports.v = v;
exports.h = h;
exports.xx = xx;
exports.a = a;
/* No side effect */
