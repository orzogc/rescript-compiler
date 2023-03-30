'use strict';

let Mt = require("./mt.js");
let Caml_obj = require("../../lib/js/caml_obj.js");

function date(param) {
  return new Date("1976-03-08T12:34:56.789+01:23");
}

let suites_0 = [
  "valueOf",
  (function (param) {
      return {
              TAG: "Eq",
              _0: 195131516789,
              _1: new Date("1976-03-08T12:34:56.789+01:23").valueOf()
            };
    })
];

let suites_1 = {
  hd: [
    "make",
    (function (param) {
        return {
                TAG: "Ok",
                _0: new Date().getTime() > 1487223505382
              };
      })
  ],
  tl: {
    hd: [
      "parseAsFloat",
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: Date.parse("1976-03-08T12:34:56.789+01:23"),
                  _1: 195131516789
                };
        })
    ],
    tl: {
      hd: [
        "parseAsFloat_invalid",
        (function (param) {
            return {
                    TAG: "Ok",
                    _0: Number.isNaN(Date.parse("gibberish"))
                  };
          })
      ],
      tl: {
        hd: [
          "fromFloat",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: "1976-03-08T11:11:56.789Z",
                      _1: new Date(195131516789).toISOString()
                    };
            })
        ],
        tl: {
          hd: [
            "fromString_valid",
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: 195131516789,
                        _1: new Date("1976-03-08T12:34:56.789+01:23").getTime()
                      };
              })
          ],
          tl: {
            hd: [
              "fromString_invalid",
              (function (param) {
                  return {
                          TAG: "Ok",
                          _0: Number.isNaN(new Date("gibberish").getTime())
                        };
                })
            ],
            tl: {
              hd: [
                "makeWithYM",
                (function (param) {
                    let d = new Date(1984, 4);
                    return {
                            TAG: "Eq",
                            _0: [
                              1984,
                              4
                            ],
                            _1: [
                              d.getFullYear(),
                              d.getMonth()
                            ]
                          };
                  })
              ],
              tl: {
                hd: [
                  "makeWithYMD",
                  (function (param) {
                      let d = new Date(1984, 4, 6);
                      return {
                              TAG: "Eq",
                              _0: [
                                1984,
                                4,
                                6
                              ],
                              _1: [
                                d.getFullYear(),
                                d.getMonth(),
                                d.getDate()
                              ]
                            };
                    })
                ],
                tl: {
                  hd: [
                    "makeWithYMDH",
                    (function (param) {
                        let d = new Date(1984, 4, 6, 3);
                        return {
                                TAG: "Eq",
                                _0: [
                                  1984,
                                  4,
                                  6,
                                  3
                                ],
                                _1: [
                                  d.getFullYear(),
                                  d.getMonth(),
                                  d.getDate(),
                                  d.getHours()
                                ]
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      "makeWithYMDHM",
                      (function (param) {
                          let d = new Date(1984, 4, 6, 3, 59);
                          return {
                                  TAG: "Eq",
                                  _0: [
                                    1984,
                                    4,
                                    6,
                                    3,
                                    59
                                  ],
                                  _1: [
                                    d.getFullYear(),
                                    d.getMonth(),
                                    d.getDate(),
                                    d.getHours(),
                                    d.getMinutes()
                                  ]
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "makeWithYMDHMS",
                        (function (param) {
                            let d = new Date(1984, 4, 6, 3, 59, 27);
                            return {
                                    TAG: "Eq",
                                    _0: [
                                      1984,
                                      4,
                                      6,
                                      3,
                                      59,
                                      27
                                    ],
                                    _1: [
                                      d.getFullYear(),
                                      d.getMonth(),
                                      d.getDate(),
                                      d.getHours(),
                                      d.getMinutes(),
                                      d.getSeconds()
                                    ]
                                  };
                          })
                      ],
                      tl: {
                        hd: [
                          "utcWithYM",
                          (function (param) {
                              let d = Date.UTC(1984, 4);
                              let d$1 = new Date(d);
                              return {
                                      TAG: "Eq",
                                      _0: [
                                        1984,
                                        4
                                      ],
                                      _1: [
                                        d$1.getUTCFullYear(),
                                        d$1.getUTCMonth()
                                      ]
                                    };
                            })
                        ],
                        tl: {
                          hd: [
                            "utcWithYMD",
                            (function (param) {
                                let d = Date.UTC(1984, 4, 6);
                                let d$1 = new Date(d);
                                return {
                                        TAG: "Eq",
                                        _0: [
                                          1984,
                                          4,
                                          6
                                        ],
                                        _1: [
                                          d$1.getUTCFullYear(),
                                          d$1.getUTCMonth(),
                                          d$1.getUTCDate()
                                        ]
                                      };
                              })
                          ],
                          tl: {
                            hd: [
                              "utcWithYMDH",
                              (function (param) {
                                  let d = Date.UTC(1984, 4, 6, 3);
                                  let d$1 = new Date(d);
                                  return {
                                          TAG: "Eq",
                                          _0: [
                                            1984,
                                            4,
                                            6,
                                            3
                                          ],
                                          _1: [
                                            d$1.getUTCFullYear(),
                                            d$1.getUTCMonth(),
                                            d$1.getUTCDate(),
                                            d$1.getUTCHours()
                                          ]
                                        };
                                })
                            ],
                            tl: {
                              hd: [
                                "utcWithYMDHM",
                                (function (param) {
                                    let d = Date.UTC(1984, 4, 6, 3, 59);
                                    let d$1 = new Date(d);
                                    return {
                                            TAG: "Eq",
                                            _0: [
                                              1984,
                                              4,
                                              6,
                                              3,
                                              59
                                            ],
                                            _1: [
                                              d$1.getUTCFullYear(),
                                              d$1.getUTCMonth(),
                                              d$1.getUTCDate(),
                                              d$1.getUTCHours(),
                                              d$1.getUTCMinutes()
                                            ]
                                          };
                                  })
                              ],
                              tl: {
                                hd: [
                                  "utcWithYMDHMS",
                                  (function (param) {
                                      let d = Date.UTC(1984, 4, 6, 3, 59, 27);
                                      let d$1 = new Date(d);
                                      return {
                                              TAG: "Eq",
                                              _0: [
                                                1984,
                                                4,
                                                6,
                                                3,
                                                59,
                                                27
                                              ],
                                              _1: [
                                                d$1.getUTCFullYear(),
                                                d$1.getUTCMonth(),
                                                d$1.getUTCDate(),
                                                d$1.getUTCHours(),
                                                d$1.getUTCMinutes(),
                                                d$1.getUTCSeconds()
                                              ]
                                            };
                                    })
                                ],
                                tl: {
                                  hd: [
                                    "getFullYear",
                                    (function (param) {
                                        return {
                                                TAG: "Eq",
                                                _0: 1976,
                                                _1: new Date("1976-03-08T12:34:56.789+01:23").getFullYear()
                                              };
                                      })
                                  ],
                                  tl: {
                                    hd: [
                                      "getMilliseconds",
                                      (function (param) {
                                          return {
                                                  TAG: "Eq",
                                                  _0: 789,
                                                  _1: new Date("1976-03-08T12:34:56.789+01:23").getMilliseconds()
                                                };
                                        })
                                    ],
                                    tl: {
                                      hd: [
                                        "getSeconds",
                                        (function (param) {
                                            return {
                                                    TAG: "Eq",
                                                    _0: 56,
                                                    _1: new Date("1976-03-08T12:34:56.789+01:23").getSeconds()
                                                  };
                                          })
                                      ],
                                      tl: {
                                        hd: [
                                          "getTime",
                                          (function (param) {
                                              return {
                                                      TAG: "Eq",
                                                      _0: 195131516789,
                                                      _1: new Date("1976-03-08T12:34:56.789+01:23").getTime()
                                                    };
                                            })
                                        ],
                                        tl: {
                                          hd: [
                                            "getUTCDate",
                                            (function (param) {
                                                return {
                                                        TAG: "Eq",
                                                        _0: 8,
                                                        _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCDate()
                                                      };
                                              })
                                          ],
                                          tl: {
                                            hd: [
                                              "getUTCDay",
                                              (function (param) {
                                                  return {
                                                          TAG: "Eq",
                                                          _0: 1,
                                                          _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCDay()
                                                        };
                                                })
                                            ],
                                            tl: {
                                              hd: [
                                                "getUTCFUllYear",
                                                (function (param) {
                                                    return {
                                                            TAG: "Eq",
                                                            _0: 1976,
                                                            _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCFullYear()
                                                          };
                                                  })
                                              ],
                                              tl: {
                                                hd: [
                                                  "getUTCHours",
                                                  (function (param) {
                                                      return {
                                                              TAG: "Eq",
                                                              _0: 11,
                                                              _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCHours()
                                                            };
                                                    })
                                                ],
                                                tl: {
                                                  hd: [
                                                    "getUTCMilliseconds",
                                                    (function (param) {
                                                        return {
                                                                TAG: "Eq",
                                                                _0: 789,
                                                                _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCMilliseconds()
                                                              };
                                                      })
                                                  ],
                                                  tl: {
                                                    hd: [
                                                      "getUTCMinutes",
                                                      (function (param) {
                                                          return {
                                                                  TAG: "Eq",
                                                                  _0: 11,
                                                                  _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCMinutes()
                                                                };
                                                        })
                                                    ],
                                                    tl: {
                                                      hd: [
                                                        "getUTCMonth",
                                                        (function (param) {
                                                            return {
                                                                    TAG: "Eq",
                                                                    _0: 2,
                                                                    _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCMonth()
                                                                  };
                                                          })
                                                      ],
                                                      tl: {
                                                        hd: [
                                                          "getUTCSeconds",
                                                          (function (param) {
                                                              return {
                                                                      TAG: "Eq",
                                                                      _0: 56,
                                                                      _1: new Date("1976-03-08T12:34:56.789+01:23").getUTCSeconds()
                                                                    };
                                                            })
                                                        ],
                                                        tl: {
                                                          hd: [
                                                            "getYear",
                                                            (function (param) {
                                                                return {
                                                                        TAG: "Eq",
                                                                        _0: 1976,
                                                                        _1: new Date("1976-03-08T12:34:56.789+01:23").getFullYear()
                                                                      };
                                                              })
                                                          ],
                                                          tl: {
                                                            hd: [
                                                              "setDate",
                                                              (function (param) {
                                                                  let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                  d.setDate(12);
                                                                  return {
                                                                          TAG: "Eq",
                                                                          _0: 12,
                                                                          _1: d.getDate()
                                                                        };
                                                                })
                                                            ],
                                                            tl: {
                                                              hd: [
                                                                "setFullYear",
                                                                (function (param) {
                                                                    let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                    d.setFullYear(1986);
                                                                    return {
                                                                            TAG: "Eq",
                                                                            _0: 1986,
                                                                            _1: d.getFullYear()
                                                                          };
                                                                  })
                                                              ],
                                                              tl: {
                                                                hd: [
                                                                  "setFullYearM",
                                                                  (function (param) {
                                                                      let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                      d.setFullYear(1986, 7);
                                                                      return {
                                                                              TAG: "Eq",
                                                                              _0: [
                                                                                1986,
                                                                                7
                                                                              ],
                                                                              _1: [
                                                                                d.getFullYear(),
                                                                                d.getMonth()
                                                                              ]
                                                                            };
                                                                    })
                                                                ],
                                                                tl: {
                                                                  hd: [
                                                                    "setFullYearMD",
                                                                    (function (param) {
                                                                        let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                        d.setFullYear(1986, 7, 23);
                                                                        return {
                                                                                TAG: "Eq",
                                                                                _0: [
                                                                                  1986,
                                                                                  7,
                                                                                  23
                                                                                ],
                                                                                _1: [
                                                                                  d.getFullYear(),
                                                                                  d.getMonth(),
                                                                                  d.getDate()
                                                                                ]
                                                                              };
                                                                      })
                                                                  ],
                                                                  tl: {
                                                                    hd: [
                                                                      "setHours",
                                                                      (function (param) {
                                                                          let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                          d.setHours(22);
                                                                          return {
                                                                                  TAG: "Eq",
                                                                                  _0: 22,
                                                                                  _1: d.getHours()
                                                                                };
                                                                        })
                                                                    ],
                                                                    tl: {
                                                                      hd: [
                                                                        "setHoursM",
                                                                        (function (param) {
                                                                            let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                            d.setHours(22, 48);
                                                                            return {
                                                                                    TAG: "Eq",
                                                                                    _0: [
                                                                                      22,
                                                                                      48
                                                                                    ],
                                                                                    _1: [
                                                                                      d.getHours(),
                                                                                      d.getMinutes()
                                                                                    ]
                                                                                  };
                                                                          })
                                                                      ],
                                                                      tl: {
                                                                        hd: [
                                                                          "setHoursMS",
                                                                          (function (param) {
                                                                              let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                              d.setHours(22, 48, 54);
                                                                              return {
                                                                                      TAG: "Eq",
                                                                                      _0: [
                                                                                        22,
                                                                                        48,
                                                                                        54
                                                                                      ],
                                                                                      _1: [
                                                                                        d.getHours(),
                                                                                        d.getMinutes(),
                                                                                        d.getSeconds()
                                                                                      ]
                                                                                    };
                                                                            })
                                                                        ],
                                                                        tl: {
                                                                          hd: [
                                                                            "setMilliseconds",
                                                                            (function (param) {
                                                                                let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                d.setMilliseconds(543);
                                                                                return {
                                                                                        TAG: "Eq",
                                                                                        _0: 543,
                                                                                        _1: d.getMilliseconds()
                                                                                      };
                                                                              })
                                                                          ],
                                                                          tl: {
                                                                            hd: [
                                                                              "setMinutes",
                                                                              (function (param) {
                                                                                  let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                  d.setMinutes(18);
                                                                                  return {
                                                                                          TAG: "Eq",
                                                                                          _0: 18,
                                                                                          _1: d.getMinutes()
                                                                                        };
                                                                                })
                                                                            ],
                                                                            tl: {
                                                                              hd: [
                                                                                "setMinutesS",
                                                                                (function (param) {
                                                                                    let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                    d.setMinutes(18, 42);
                                                                                    return {
                                                                                            TAG: "Eq",
                                                                                            _0: [
                                                                                              18,
                                                                                              42
                                                                                            ],
                                                                                            _1: [
                                                                                              d.getMinutes(),
                                                                                              d.getSeconds()
                                                                                            ]
                                                                                          };
                                                                                  })
                                                                              ],
                                                                              tl: {
                                                                                hd: [
                                                                                  "setMinutesSMs",
                                                                                  (function (param) {
                                                                                      let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                      d.setMinutes(18, 42, 311);
                                                                                      return {
                                                                                              TAG: "Eq",
                                                                                              _0: [
                                                                                                18,
                                                                                                42,
                                                                                                311
                                                                                              ],
                                                                                              _1: [
                                                                                                d.getMinutes(),
                                                                                                d.getSeconds(),
                                                                                                d.getMilliseconds()
                                                                                              ]
                                                                                            };
                                                                                    })
                                                                                ],
                                                                                tl: {
                                                                                  hd: [
                                                                                    "setMonth",
                                                                                    (function (param) {
                                                                                        let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                        d.setMonth(10);
                                                                                        return {
                                                                                                TAG: "Eq",
                                                                                                _0: 10,
                                                                                                _1: d.getMonth()
                                                                                              };
                                                                                      })
                                                                                  ],
                                                                                  tl: {
                                                                                    hd: [
                                                                                      "setMonthD",
                                                                                      (function (param) {
                                                                                          let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                          d.setMonth(10, 14);
                                                                                          return {
                                                                                                  TAG: "Eq",
                                                                                                  _0: [
                                                                                                    10,
                                                                                                    14
                                                                                                  ],
                                                                                                  _1: [
                                                                                                    d.getMonth(),
                                                                                                    d.getDate()
                                                                                                  ]
                                                                                                };
                                                                                        })
                                                                                    ],
                                                                                    tl: {
                                                                                      hd: [
                                                                                        "setSeconds",
                                                                                        (function (param) {
                                                                                            let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                            d.setSeconds(36);
                                                                                            return {
                                                                                                    TAG: "Eq",
                                                                                                    _0: 36,
                                                                                                    _1: d.getSeconds()
                                                                                                  };
                                                                                          })
                                                                                      ],
                                                                                      tl: {
                                                                                        hd: [
                                                                                          "setSecondsMs",
                                                                                          (function (param) {
                                                                                              let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                              d.setSeconds(36, 420);
                                                                                              return {
                                                                                                      TAG: "Eq",
                                                                                                      _0: [
                                                                                                        36,
                                                                                                        420
                                                                                                      ],
                                                                                                      _1: [
                                                                                                        d.getSeconds(),
                                                                                                        d.getMilliseconds()
                                                                                                      ]
                                                                                                    };
                                                                                            })
                                                                                        ],
                                                                                        tl: {
                                                                                          hd: [
                                                                                            "setUTCDate",
                                                                                            (function (param) {
                                                                                                let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                d.setUTCDate(12);
                                                                                                return {
                                                                                                        TAG: "Eq",
                                                                                                        _0: 12,
                                                                                                        _1: d.getUTCDate()
                                                                                                      };
                                                                                              })
                                                                                          ],
                                                                                          tl: {
                                                                                            hd: [
                                                                                              "setUTCFullYear",
                                                                                              (function (param) {
                                                                                                  let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                  d.setUTCFullYear(1986);
                                                                                                  return {
                                                                                                          TAG: "Eq",
                                                                                                          _0: 1986,
                                                                                                          _1: d.getUTCFullYear()
                                                                                                        };
                                                                                                })
                                                                                            ],
                                                                                            tl: {
                                                                                              hd: [
                                                                                                "setUTCFullYearM",
                                                                                                (function (param) {
                                                                                                    let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                    d.setUTCFullYear(1986, 7);
                                                                                                    return {
                                                                                                            TAG: "Eq",
                                                                                                            _0: [
                                                                                                              1986,
                                                                                                              7
                                                                                                            ],
                                                                                                            _1: [
                                                                                                              d.getUTCFullYear(),
                                                                                                              d.getUTCMonth()
                                                                                                            ]
                                                                                                          };
                                                                                                  })
                                                                                              ],
                                                                                              tl: {
                                                                                                hd: [
                                                                                                  "setUTCFullYearMD",
                                                                                                  (function (param) {
                                                                                                      let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                      d.setUTCFullYear(1986, 7, 23);
                                                                                                      return {
                                                                                                              TAG: "Eq",
                                                                                                              _0: [
                                                                                                                1986,
                                                                                                                7,
                                                                                                                23
                                                                                                              ],
                                                                                                              _1: [
                                                                                                                d.getUTCFullYear(),
                                                                                                                d.getUTCMonth(),
                                                                                                                d.getUTCDate()
                                                                                                              ]
                                                                                                            };
                                                                                                    })
                                                                                                ],
                                                                                                tl: {
                                                                                                  hd: [
                                                                                                    "setUTCHours",
                                                                                                    (function (param) {
                                                                                                        let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                        d.setUTCHours(22);
                                                                                                        return {
                                                                                                                TAG: "Eq",
                                                                                                                _0: 22,
                                                                                                                _1: d.getUTCHours()
                                                                                                              };
                                                                                                      })
                                                                                                  ],
                                                                                                  tl: {
                                                                                                    hd: [
                                                                                                      "setUTCHoursM",
                                                                                                      (function (param) {
                                                                                                          let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                          d.setUTCHours(22, 48);
                                                                                                          return {
                                                                                                                  TAG: "Eq",
                                                                                                                  _0: [
                                                                                                                    22,
                                                                                                                    48
                                                                                                                  ],
                                                                                                                  _1: [
                                                                                                                    d.getUTCHours(),
                                                                                                                    d.getUTCMinutes()
                                                                                                                  ]
                                                                                                                };
                                                                                                        })
                                                                                                    ],
                                                                                                    tl: {
                                                                                                      hd: [
                                                                                                        "setUTCHoursMS",
                                                                                                        (function (param) {
                                                                                                            let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                            d.setUTCHours(22, 48, 54);
                                                                                                            return {
                                                                                                                    TAG: "Eq",
                                                                                                                    _0: [
                                                                                                                      22,
                                                                                                                      48,
                                                                                                                      54
                                                                                                                    ],
                                                                                                                    _1: [
                                                                                                                      d.getUTCHours(),
                                                                                                                      d.getUTCMinutes(),
                                                                                                                      d.getUTCSeconds()
                                                                                                                    ]
                                                                                                                  };
                                                                                                          })
                                                                                                      ],
                                                                                                      tl: {
                                                                                                        hd: [
                                                                                                          "setUTCMilliseconds",
                                                                                                          (function (param) {
                                                                                                              let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                              d.setUTCMilliseconds(543);
                                                                                                              return {
                                                                                                                      TAG: "Eq",
                                                                                                                      _0: 543,
                                                                                                                      _1: d.getUTCMilliseconds()
                                                                                                                    };
                                                                                                            })
                                                                                                        ],
                                                                                                        tl: {
                                                                                                          hd: [
                                                                                                            "setUTCMinutes",
                                                                                                            (function (param) {
                                                                                                                let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                d.setUTCMinutes(18);
                                                                                                                return {
                                                                                                                        TAG: "Eq",
                                                                                                                        _0: 18,
                                                                                                                        _1: d.getUTCMinutes()
                                                                                                                      };
                                                                                                              })
                                                                                                          ],
                                                                                                          tl: {
                                                                                                            hd: [
                                                                                                              "setUTCMinutesS",
                                                                                                              (function (param) {
                                                                                                                  let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                  d.setUTCMinutes(18, 42);
                                                                                                                  return {
                                                                                                                          TAG: "Eq",
                                                                                                                          _0: [
                                                                                                                            18,
                                                                                                                            42
                                                                                                                          ],
                                                                                                                          _1: [
                                                                                                                            d.getUTCMinutes(),
                                                                                                                            d.getUTCSeconds()
                                                                                                                          ]
                                                                                                                        };
                                                                                                                })
                                                                                                            ],
                                                                                                            tl: {
                                                                                                              hd: [
                                                                                                                "setUTCMinutesSMs",
                                                                                                                (function (param) {
                                                                                                                    let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                    d.setUTCMinutes(18, 42, 311);
                                                                                                                    return {
                                                                                                                            TAG: "Eq",
                                                                                                                            _0: [
                                                                                                                              18,
                                                                                                                              42,
                                                                                                                              311
                                                                                                                            ],
                                                                                                                            _1: [
                                                                                                                              d.getUTCMinutes(),
                                                                                                                              d.getUTCSeconds(),
                                                                                                                              d.getUTCMilliseconds()
                                                                                                                            ]
                                                                                                                          };
                                                                                                                  })
                                                                                                              ],
                                                                                                              tl: {
                                                                                                                hd: [
                                                                                                                  "setUTCMonth",
                                                                                                                  (function (param) {
                                                                                                                      let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                      d.setUTCMonth(10);
                                                                                                                      return {
                                                                                                                              TAG: "Eq",
                                                                                                                              _0: 10,
                                                                                                                              _1: d.getUTCMonth()
                                                                                                                            };
                                                                                                                    })
                                                                                                                ],
                                                                                                                tl: {
                                                                                                                  hd: [
                                                                                                                    "setUTCMonthD",
                                                                                                                    (function (param) {
                                                                                                                        let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                        d.setUTCMonth(10, 14);
                                                                                                                        return {
                                                                                                                                TAG: "Eq",
                                                                                                                                _0: [
                                                                                                                                  10,
                                                                                                                                  14
                                                                                                                                ],
                                                                                                                                _1: [
                                                                                                                                  d.getUTCMonth(),
                                                                                                                                  d.getUTCDate()
                                                                                                                                ]
                                                                                                                              };
                                                                                                                      })
                                                                                                                  ],
                                                                                                                  tl: {
                                                                                                                    hd: [
                                                                                                                      "setUTCSeconds",
                                                                                                                      (function (param) {
                                                                                                                          let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                          d.setUTCSeconds(36);
                                                                                                                          return {
                                                                                                                                  TAG: "Eq",
                                                                                                                                  _0: 36,
                                                                                                                                  _1: d.getUTCSeconds()
                                                                                                                                };
                                                                                                                        })
                                                                                                                    ],
                                                                                                                    tl: {
                                                                                                                      hd: [
                                                                                                                        "setUTCSecondsMs",
                                                                                                                        (function (param) {
                                                                                                                            let d = new Date("1976-03-08T12:34:56.789+01:23");
                                                                                                                            d.setUTCSeconds(36, 420);
                                                                                                                            return {
                                                                                                                                    TAG: "Eq",
                                                                                                                                    _0: [
                                                                                                                                      36,
                                                                                                                                      420
                                                                                                                                    ],
                                                                                                                                    _1: [
                                                                                                                                      d.getUTCSeconds(),
                                                                                                                                      d.getUTCMilliseconds()
                                                                                                                                    ]
                                                                                                                                  };
                                                                                                                          })
                                                                                                                      ],
                                                                                                                      tl: {
                                                                                                                        hd: [
                                                                                                                          "toDateString",
                                                                                                                          (function (param) {
                                                                                                                              return {
                                                                                                                                      TAG: "Eq",
                                                                                                                                      _0: "Mon Mar 08 1976",
                                                                                                                                      _1: new Date("1976-03-08T12:34:56.789+01:23").toDateString()
                                                                                                                                    };
                                                                                                                            })
                                                                                                                        ],
                                                                                                                        tl: {
                                                                                                                          hd: [
                                                                                                                            "toGMTString",
                                                                                                                            (function (param) {
                                                                                                                                return {
                                                                                                                                        TAG: "Eq",
                                                                                                                                        _0: "Mon, 08 Mar 1976 11:11:56 GMT",
                                                                                                                                        _1: new Date("1976-03-08T12:34:56.789+01:23").toUTCString()
                                                                                                                                      };
                                                                                                                              })
                                                                                                                          ],
                                                                                                                          tl: {
                                                                                                                            hd: [
                                                                                                                              "toISOString",
                                                                                                                              (function (param) {
                                                                                                                                  return {
                                                                                                                                          TAG: "Eq",
                                                                                                                                          _0: "1976-03-08T11:11:56.789Z",
                                                                                                                                          _1: new Date("1976-03-08T12:34:56.789+01:23").toISOString()
                                                                                                                                        };
                                                                                                                                })
                                                                                                                            ],
                                                                                                                            tl: {
                                                                                                                              hd: [
                                                                                                                                "toJSON",
                                                                                                                                (function (param) {
                                                                                                                                    return {
                                                                                                                                            TAG: "Eq",
                                                                                                                                            _0: "1976-03-08T11:11:56.789Z",
                                                                                                                                            _1: new Date("1976-03-08T12:34:56.789+01:23").toJSON()
                                                                                                                                          };
                                                                                                                                  })
                                                                                                                              ],
                                                                                                                              tl: {
                                                                                                                                hd: [
                                                                                                                                  "toJSONUnsafe",
                                                                                                                                  (function (param) {
                                                                                                                                      return {
                                                                                                                                              TAG: "Eq",
                                                                                                                                              _0: "1976-03-08T11:11:56.789Z",
                                                                                                                                              _1: new Date("1976-03-08T12:34:56.789+01:23").toJSON()
                                                                                                                                            };
                                                                                                                                    })
                                                                                                                                ],
                                                                                                                                tl: {
                                                                                                                                  hd: [
                                                                                                                                    "toUTCString",
                                                                                                                                    (function (param) {
                                                                                                                                        return {
                                                                                                                                                TAG: "Eq",
                                                                                                                                                _0: "Mon, 08 Mar 1976 11:11:56 GMT",
                                                                                                                                                _1: new Date("1976-03-08T12:34:56.789+01:23").toUTCString()
                                                                                                                                              };
                                                                                                                                      })
                                                                                                                                  ],
                                                                                                                                  tl: {
                                                                                                                                    hd: [
                                                                                                                                      "eq",
                                                                                                                                      (function (param) {
                                                                                                                                          let a = new Date("2013-03-01T01:10:00");
                                                                                                                                          let b = new Date("2013-03-01T01:10:00");
                                                                                                                                          let c = new Date("2013-03-01T01:10:01");
                                                                                                                                          return {
                                                                                                                                                  TAG: "Ok",
                                                                                                                                                  _0: Caml_obj.equal(a, b) && Caml_obj.notequal(b, c) && Caml_obj.greaterthan(c, b)
                                                                                                                                                };
                                                                                                                                        })
                                                                                                                                    ],
                                                                                                                                    tl: /* [] */0
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

let suites = {
  hd: suites_0,
  tl: suites_1
};

Mt.from_pair_suites("Js_date_test", suites);

let N;

exports.N = N;
exports.date = date;
exports.suites = suites;
/*  Not a pure module */
