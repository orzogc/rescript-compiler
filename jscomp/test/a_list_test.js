'use strict';

let Mt = require("./mt.js");
let Ext_list_test = require("./ext_list_test.js");

let suites_0 = [
  "drop",
  (function (param) {
      return {
              TAG: "Eq",
              _0: Ext_list_test.drop(3, {
                    hd: 0,
                    tl: {
                      hd: 1,
                      tl: {
                        hd: 2,
                        tl: /* [] */0
                      }
                    }
                  }),
              _1: /* [] */0
            };
    })
];

let suites_1 = {
  hd: [
    "drop1",
    (function (param) {
        return {
                TAG: "Eq",
                _0: Ext_list_test.drop(2, {
                      hd: 0,
                      tl: {
                        hd: 1,
                        tl: {
                          hd: 2,
                          tl: /* [] */0
                        }
                      }
                    }),
                _1: {
                  hd: 2,
                  tl: /* [] */0
                }
              };
      })
  ],
  tl: {
    hd: [
      "flat_map",
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: {
                    hd: 0,
                    tl: {
                      hd: 0,
                      tl: {
                        hd: 1,
                        tl: {
                          hd: 1,
                          tl: {
                            hd: 0,
                            tl: /* [] */0
                          }
                        }
                      }
                    }
                  },
                  _1: Ext_list_test.flat_map((function (x) {
                          if (x % 2 === 0) {
                            return {
                                    hd: 0,
                                    tl: /* [] */0
                                  };
                          } else {
                            return {
                                    hd: 1,
                                    tl: {
                                      hd: 1,
                                      tl: /* [] */0
                                    }
                                  };
                          }
                        }), {
                        hd: 0,
                        tl: {
                          hd: 0,
                          tl: {
                            hd: 3,
                            tl: {
                              hd: 0,
                              tl: /* [] */0
                            }
                          }
                        }
                      })
                };
        })
    ],
    tl: /* [] */0
  }
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("A_list_test", suites);

exports.suites = suites;
/*  Not a pure module */
