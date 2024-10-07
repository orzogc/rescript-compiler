// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Mt = require("./mt.js");
let Belt_List = require("rescript/lib/js/belt_List.js");
let Belt_MapInt = require("rescript/lib/js/belt_MapInt.js");
let Belt_MapString = require("rescript/lib/js/belt_MapString.js");

let m = Belt_List.reduceReverse({
  hd: [
    10,
    /* 'a' */97
  ],
  tl: {
    hd: [
      3,
      /* 'b' */98
    ],
    tl: {
      hd: [
        7,
        /* 'c' */99
      ],
      tl: {
        hd: [
          20,
          /* 'd' */100
        ],
        tl: /* [] */0
      }
    }
  }
}, undefined, (acc, param) => Belt_MapInt.set(acc, param[0], param[1]));

let s = Belt_List.reduceReverse({
  hd: [
    "10",
    /* 'a' */97
  ],
  tl: {
    hd: [
      "3",
      /* 'b' */98
    ],
    tl: {
      hd: [
        "7",
        /* 'c' */99
      ],
      tl: {
        hd: [
          "20",
          /* 'd' */100
        ],
        tl: /* [] */0
      }
    }
  }
}, undefined, (acc, param) => Belt_MapString.set(acc, param[0], param[1]));

Mt.from_pair_suites("Map_find_test", {
  hd: [
    "int",
    () => ({
      TAG: "Eq",
      _0: Belt_MapInt.get(m, 10),
      _1: /* 'a' */97
    })
  ],
  tl: {
    hd: [
      "string",
      () => ({
        TAG: "Eq",
        _0: Belt_MapString.get(s, "10"),
        _1: /* 'a' */97
      })
    ],
    tl: /* [] */0
  }
});

/* m Not a pure module */