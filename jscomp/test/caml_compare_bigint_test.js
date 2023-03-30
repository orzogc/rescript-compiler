'use strict';

let Mt = require("./mt.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Pervasives = require("../../lib/js/pervasives.js");

function isLessThan(title, small, big) {
  return {
          hd: [
            "compare: " + title,
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: true,
                        _1: Caml_obj.compare(big, small) > 0
                      };
              })
          ],
          tl: {
            hd: [
              "compare: " + title,
              (function (param) {
                  return {
                          TAG: "Eq",
                          _0: true,
                          _1: Caml_obj.compare(small, big) < 0
                        };
                })
            ],
            tl: {
              hd: [
                "< operator: " + title,
                (function (param) {
                    return {
                            TAG: "Eq",
                            _0: true,
                            _1: Caml_obj.lessthan(small, big)
                          };
                  })
              ],
              tl: {
                hd: [
                  "<= operator: " + title,
                  (function (param) {
                      return {
                              TAG: "Eq",
                              _0: true,
                              _1: Caml_obj.lessequal(small, big)
                            };
                    })
                ],
                tl: {
                  hd: [
                    "> operator: " + title,
                    (function (param) {
                        return {
                                TAG: "Eq",
                                _0: true,
                                _1: Caml_obj.greaterthan(big, small)
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      ">= operator: " + title,
                      (function (param) {
                          return {
                                  TAG: "Eq",
                                  _0: true,
                                  _1: Caml_obj.greaterequal(big, small)
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "min: " + title,
                        (function (param) {
                            return {
                                    TAG: "Eq",
                                    _0: small,
                                    _1: Caml_obj.min(big, small)
                                  };
                          })
                      ],
                      tl: {
                        hd: [
                          "min: " + title,
                          (function (param) {
                              return {
                                      TAG: "Eq",
                                      _0: small,
                                      _1: Caml_obj.min(small, big)
                                    };
                            })
                        ],
                        tl: {
                          hd: [
                            "max: " + title,
                            (function (param) {
                                return {
                                        TAG: "Eq",
                                        _0: big,
                                        _1: Caml_obj.max(big, small)
                                      };
                              })
                          ],
                          tl: {
                            hd: [
                              "max: " + title,
                              (function (param) {
                                  return {
                                          TAG: "Eq",
                                          _0: big,
                                          _1: Caml_obj.max(small, big)
                                        };
                                })
                            ],
                            tl: {
                              hd: [
                                "!== operator: " + title,
                                (function (param) {
                                    return {
                                            TAG: "Eq",
                                            _0: true,
                                            _1: big !== small
                                          };
                                  })
                              ],
                              tl: {
                                hd: [
                                  "!== operator: " + title,
                                  (function (param) {
                                      return {
                                              TAG: "Eq",
                                              _0: true,
                                              _1: small !== big
                                            };
                                    })
                                ],
                                tl: {
                                  hd: [
                                    "!= operator: " + title,
                                    (function (param) {
                                        return {
                                                TAG: "Eq",
                                                _0: true,
                                                _1: Caml_obj.notequal(big, small)
                                              };
                                      })
                                  ],
                                  tl: {
                                    hd: [
                                      "!= operator: " + title,
                                      (function (param) {
                                          return {
                                                  TAG: "Eq",
                                                  _0: true,
                                                  _1: Caml_obj.notequal(small, big)
                                                };
                                        })
                                    ],
                                    tl: {
                                      hd: [
                                        "== operator: " + title,
                                        (function (param) {
                                            return {
                                                    TAG: "Eq",
                                                    _0: false,
                                                    _1: Caml_obj.equal(big, small)
                                                  };
                                          })
                                      ],
                                      tl: {
                                        hd: [
                                          "== operator: " + title,
                                          (function (param) {
                                              return {
                                                      TAG: "Eq",
                                                      _0: false,
                                                      _1: Caml_obj.equal(small, big)
                                                    };
                                            })
                                        ],
                                        tl: {
                                          hd: [
                                            "=== operator: " + title,
                                            (function (param) {
                                                return {
                                                        TAG: "Eq",
                                                        _0: false,
                                                        _1: big === small
                                                      };
                                              })
                                          ],
                                          tl: {
                                            hd: [
                                              "=== operator: " + title,
                                              (function (param) {
                                                  return {
                                                          TAG: "Eq",
                                                          _0: false,
                                                          _1: small === big
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
        };
}

function isEqual(title, num1, num2) {
  return {
          hd: [
            "< operator: " + title,
            (function (param) {
                return {
                        TAG: "Eq",
                        _0: false,
                        _1: Caml_obj.lessthan(num2, num1)
                      };
              })
          ],
          tl: {
            hd: [
              "<= operator: " + title,
              (function (param) {
                  return {
                          TAG: "Eq",
                          _0: true,
                          _1: Caml_obj.lessequal(num2, num1)
                        };
                })
            ],
            tl: {
              hd: [
                "> operator: " + title,
                (function (param) {
                    return {
                            TAG: "Eq",
                            _0: false,
                            _1: Caml_obj.greaterthan(num1, num2)
                          };
                  })
              ],
              tl: {
                hd: [
                  ">= operator: " + title,
                  (function (param) {
                      return {
                              TAG: "Eq",
                              _0: true,
                              _1: Caml_obj.greaterequal(num1, num2)
                            };
                    })
                ],
                tl: {
                  hd: [
                    "min: " + title,
                    (function (param) {
                        return {
                                TAG: "Eq",
                                _0: num1,
                                _1: Caml_obj.min(num1, num2)
                              };
                      })
                  ],
                  tl: {
                    hd: [
                      "max: " + title,
                      (function (param) {
                          return {
                                  TAG: "Eq",
                                  _0: num1,
                                  _1: Caml_obj.max(num1, num2)
                                };
                        })
                    ],
                    tl: {
                      hd: [
                        "compare: " + title,
                        (function (param) {
                            return {
                                    TAG: "Eq",
                                    _0: 0,
                                    _1: Caml_obj.compare(num1, num2)
                                  };
                          })
                      ],
                      tl: {
                        hd: [
                          "compare: " + title,
                          (function (param) {
                              return {
                                      TAG: "Eq",
                                      _0: 0,
                                      _1: Caml_obj.compare(num2, num1)
                                    };
                            })
                        ],
                        tl: {
                          hd: [
                            "!= operator: " + title,
                            (function (param) {
                                return {
                                        TAG: "Eq",
                                        _0: false,
                                        _1: num1 !== num2
                                      };
                              })
                          ],
                          tl: {
                            hd: [
                              "!= operator: " + title,
                              (function (param) {
                                  return {
                                          TAG: "Eq",
                                          _0: false,
                                          _1: num2 !== num1
                                        };
                                })
                            ],
                            tl: {
                              hd: [
                                "!= operator: " + title,
                                (function (param) {
                                    return {
                                            TAG: "Eq",
                                            _0: false,
                                            _1: Caml_obj.notequal(num1, num2)
                                          };
                                  })
                              ],
                              tl: {
                                hd: [
                                  "!= operator: " + title,
                                  (function (param) {
                                      return {
                                              TAG: "Eq",
                                              _0: false,
                                              _1: Caml_obj.notequal(num2, num1)
                                            };
                                    })
                                ],
                                tl: {
                                  hd: [
                                    "== operator: " + title,
                                    (function (param) {
                                        return {
                                                TAG: "Eq",
                                                _0: true,
                                                _1: Caml_obj.equal(num1, num2)
                                              };
                                      })
                                  ],
                                  tl: {
                                    hd: [
                                      "== operator: " + title,
                                      (function (param) {
                                          return {
                                                  TAG: "Eq",
                                                  _0: true,
                                                  _1: Caml_obj.equal(num2, num1)
                                                };
                                        })
                                    ],
                                    tl: {
                                      hd: [
                                        "=== operator: " + title,
                                        (function (param) {
                                            return {
                                                    TAG: "Eq",
                                                    _0: true,
                                                    _1: num1 === num2
                                                  };
                                          })
                                      ],
                                      tl: {
                                        hd: [
                                          "=== operator: " + title,
                                          (function (param) {
                                              return {
                                                      TAG: "Eq",
                                                      _0: true,
                                                      _1: num2 === num1
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
        };
}

let five = BigInt("5");

let suites = Pervasives.$at(isLessThan("123 and 555555", BigInt("123"), BigInt("555555")), Pervasives.$at(isEqual("98765 and 98765", BigInt("98765"), BigInt("98765")), isEqual("same instance", five, five)));

Mt.from_pair_suites("caml_compare_bigint_test.res", suites);

exports.isLessThan = isLessThan;
exports.isEqual = isEqual;
exports.five = five;
exports.suites = suites;
/* five Not a pure module */
