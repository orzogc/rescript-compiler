'use strict';

let Mt = require("./mt.js");

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
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

function hey_string (option){
  switch(option){
  case "on_closed" : 
  case "on_open" : 
  case "in" : return option
  default : throw Error ("impossible")
 }
}
function hey_int (option){
  switch (option){
   case 0 : 
   case 3 : 
   case 4 : 
   case 5:
   case 6 : return option
   default : throw Error("impossible")
  }
 }
;

let uu = [
  hey_string("on_open"),
  hey_string("on_closed"),
  hey_string("in")
];

let vv = [
  hey_int(3),
  hey_int(0),
  hey_int(4)
];

eq("File \"poly_variant_test.res\", line 64, characters 5-12", vv, [
      3,
      0,
      4
    ]);

eq("File \"poly_variant_test.res\", line 65, characters 5-12", [
      hey_int(5),
      hey_int(6)
    ], [
      5,
      6
    ]);

eq("File \"poly_variant_test.res\", line 66, characters 5-12", uu, [
      "on_open",
      "on_closed",
      "in"
    ]);

hey_string("on_closed");

hey_string("in");

function p_is_int_test(x) {
  if (typeof x === "object") {
    return 3;
  } else {
    return 2;
  }
}

eq("File \"poly_variant_test.res\", line 156, characters 5-12", 2, 2);

eq("File \"poly_variant_test.res\", line 157, characters 5-12", 3, p_is_int_test({
          NAME: "b",
          VAL: 2
        }));

Mt.from_pair_suites("Poly_variant_test", suites.contents);

/*  Not a pure module */
