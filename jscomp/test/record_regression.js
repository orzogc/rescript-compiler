'use strict';

let Caml_obj = require("../../lib/js/caml_obj.js");
let Caml_option = require("../../lib/js/caml_option.js");

let f1 = {
  x: 3,
  z: 2
};

let newrecord = Caml_obj.obj_dup(f1);

newrecord.y = 3;

let newrecord$1 = Caml_obj.obj_dup(newrecord);

newrecord$1.yy = Caml_option.some(undefined);

let theseTwoShouldBeIdentical = [
  newrecord$1.yy,
  Caml_option.some(undefined)
];

let v = {
  x: 2,
  z: 3
};

let newrecord$2 = Caml_obj.obj_dup(v);

newrecord$2.y1 = 22;

let v1 = {
  x: 2,
  z: 3
};

let newrecord$3 = Caml_obj.obj_dup(v1);

newrecord$3.y1 = 22;

function h11(v1) {
  let newrecord = Caml_obj.obj_dup(v1);
  newrecord.y1 = 22;
  return newrecord;
}

let po = {
  aa: 3,
  bb: 4
};

let newrecord$4 = Caml_obj.obj_dup(po);

newrecord$4.aa = undefined;

function setAA(ao) {
  return {
          aa: ao
        };
}

let ir0 = {
  TAG: "V0",
  x0: "v0",
  x3: 3
};

let ir1 = {
  TAG: "V0",
  x0: "v0",
  x1: "v1",
  x3: 3
};

let ir2 = {
  TAG: "V0",
  x0: "v0",
  x1: "v1",
  x2: 2,
  x3: 3
};

let ir3 = {
  TAG: "V1",
  y0: "v0",
  y1: 1
};

let pm0;

pm0 = ir0.TAG === "V0" ? [
    "v0",
    3
  ] : [
    "v0",
    undefined
  ];

let pm1;

if (ir1.TAG === "V0") {
  let x1 = "v1";
  let x0 = "v0";
  pm1 = x1 !== undefined ? [
      x0,
      x1,
      3
    ] : [
      x0,
      "n/a",
      3
    ];
} else {
  pm1 = [
    "v0",
    "n/a",
    "v1"
  ];
}

let pm2;

if (ir2.TAG === "V0") {
  let x1$1 = "v1";
  let x0$1 = "v0";
  if (x1$1 !== undefined) {
    let x2 = 2;
    pm2 = x2 !== undefined ? [
        x0$1,
        x1$1,
        x2,
        3
      ] : [
        x0$1,
        x1$1,
        0,
        3
      ];
  } else {
    let x2$1 = 2;
    pm2 = x2$1 !== undefined ? [
        x0$1,
        "n/a",
        x2$1,
        3
      ] : [
        x0$1,
        "n/a",
        0,
        3
      ];
  }
} else {
  pm2 = [
    "v0",
    "n/a",
    0,
    "v1"
  ];
}

function inlinedRecord(ir) {
  if (ir.TAG !== "V0") {
    return [
            ir.y0,
            "n/a",
            0,
            ir.y1
          ];
  }
  let x1 = ir.x1;
  let x0 = ir.x0;
  if (x1 !== undefined) {
    switch (x1) {
      case "x1" :
          let x2 = ir.x2;
          if (x2 !== undefined) {
            return [
                    x0,
                    "x1",
                    x2,
                    ir.x3
                  ];
          }
          break;
      case "xx1" :
          let x2$1 = ir.x2;
          if (x2$1 !== undefined) {
            return [
                    x0,
                    "xx1",
                    x2$1,
                    ir.x3
                  ];
          }
          break;
      default:
        
    }
    let x2$2 = ir.x2;
    if (x2$2 !== undefined) {
      return [
              x0,
              x1,
              x2$2,
              ir.x3
            ];
    } else {
      return [
              x0,
              x1,
              0,
              ir.x3
            ];
    }
  }
  let x2$3 = ir.x2;
  if (x2$3 !== undefined) {
    return [
            x0,
            "n/a",
            x2$3,
            ir.x3
          ];
  } else {
    return [
            x0,
            "n/a",
            0,
            ir.x3
          ];
  }
}

let pm3 = inlinedRecord(ir2);

let pm4 = inlinedRecord(ir3);

let f2 = {
  x: 3,
  y: 3,
  z: 3
};

let f3 = newrecord;

let f4 = newrecord$1;

let v2 = {
  x: 3,
  y: undefined,
  z: 2
};

let h = newrecord$2;

let h10 = newrecord$3;

let ir4 = {
  TAG: "V0",
  x: 3
};

let ir5 = {
  TAG: "V0"
};

exports.f1 = f1;
exports.f2 = f2;
exports.f3 = f3;
exports.f4 = f4;
exports.theseTwoShouldBeIdentical = theseTwoShouldBeIdentical;
exports.v2 = v2;
exports.v = v;
exports.h = h;
exports.v1 = v1;
exports.h10 = h10;
exports.h11 = h11;
exports.po = po;
exports.setAA = setAA;
exports.ir0 = ir0;
exports.ir1 = ir1;
exports.ir2 = ir2;
exports.ir3 = ir3;
exports.pm0 = pm0;
exports.pm1 = pm1;
exports.pm2 = pm2;
exports.inlinedRecord = inlinedRecord;
exports.pm3 = pm3;
exports.pm4 = pm4;
exports.ir4 = ir4;
exports.ir5 = ir5;
/*  Not a pure module */
