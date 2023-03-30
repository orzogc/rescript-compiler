'use strict';

let Mt = require("./mt.js");
let List = require("../../lib/js/list.js");
let Caml_array = require("../../lib/js/caml_array.js");
let Js_promise = require("../../lib/js/js_promise.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

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

function assert_bool(b) {
  if (b) {
    return ;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Assertion Failure.",
        Error: new Error()
      };
}

function fail(param) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "js_promise_basic_test.ml",
          17,
          2
        ],
        Error: new Error()
      };
}

function thenTest(param) {
  let p = Promise.resolve(4);
  let arg1 = function (x) {
    return Promise.resolve(assert_bool(x === 4));
  };
  return p.then(arg1);
}

function andThenTest(param) {
  let p = Promise.resolve(6);
  let arg1 = function (param) {
    return Promise.resolve(12);
  };
  let obj = p.then(arg1);
  let arg1$1 = function (y) {
    return Promise.resolve(assert_bool(y === 12));
  };
  return obj.then(arg1$1);
}

let h = Promise.resolve(undefined);

function assertIsNotFound(x) {
  let match = Caml_exceptions.is_extension(x) && x.RE_EXN_ID === "Not_found" ? 0 : undefined;
  if (match !== undefined) {
    return h;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "js_promise_basic_test.ml",
          34,
          9
        ],
        Error: new Error()
      };
}

function catchTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let obj = p.then(fail);
  let arg1 = assertIsNotFound;
  return obj.catch(arg1);
}

function orResolvedTest(param) {
  let p = Promise.resolve(42);
  let arg1 = function (param) {
    return Promise.resolve(22);
  };
  let obj = p.catch(arg1);
  let arg1$1 = function (value) {
    return Promise.resolve(assert_bool(value === 42));
  };
  let obj$1 = obj.then(arg1$1);
  return obj$1.catch(fail);
}

function orRejectedTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let arg1 = function (param) {
    return Promise.resolve(22);
  };
  let obj = p.catch(arg1);
  let arg1$1 = function (value) {
    return Promise.resolve(assert_bool(value === 22));
  };
  let obj$1 = obj.then(arg1$1);
  return obj$1.catch(fail);
}

function orElseResolvedTest(param) {
  let p = Promise.resolve(42);
  let arg1 = function (param) {
    return Promise.resolve(22);
  };
  let obj = p.catch(arg1);
  let arg1$1 = function (value) {
    return Promise.resolve(assert_bool(value === 42));
  };
  let obj$1 = obj.then(arg1$1);
  return obj$1.catch(fail);
}

function orElseRejectedResolveTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let arg1 = function (param) {
    return Promise.resolve(22);
  };
  let obj = p.catch(arg1);
  let arg1$1 = function (value) {
    return Promise.resolve(assert_bool(value === 22));
  };
  let obj$1 = obj.then(arg1$1);
  return obj$1.catch(fail);
}

let Stack_overflow = /* @__PURE__ */Caml_exceptions.create("Js_promise_basic_test.Stack_overflow");

function orElseRejectedRejectTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let arg1 = function (param) {
    return Promise.reject({
                RE_EXN_ID: Stack_overflow
              });
  };
  let obj = p.catch(arg1);
  let obj$1 = obj.then(fail);
  let arg1$1 = function (error) {
    let match = Caml_exceptions.is_extension(error) && error.RE_EXN_ID === Stack_overflow ? 0 : undefined;
    if (match !== undefined) {
      return h;
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "js_promise_basic_test.ml",
            79,
            19
          ],
          Error: new Error()
        };
  };
  return obj$1.catch(arg1$1);
}

function resolveTest(param) {
  let p1 = Promise.resolve(10);
  let arg1 = function (x) {
    return Promise.resolve(assert_bool(x === 10));
  };
  return p1.then(arg1);
}

function rejectTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let arg1 = assertIsNotFound;
  return p.catch(arg1);
}

function thenCatchChainResolvedTest(param) {
  let p = Promise.resolve(20);
  let arg1 = function (value) {
    return Promise.resolve(assert_bool(value === 20));
  };
  let obj = p.then(arg1);
  return obj.catch(fail);
}

function thenCatchChainRejectedTest(param) {
  let p = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let obj = p.then(fail);
  let arg1 = assertIsNotFound;
  return obj.catch(arg1);
}

function allResolvedTest(param) {
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(2);
  let p3 = Promise.resolve(3);
  let promises = [
    p1,
    p2,
    p3
  ];
  let obj = Promise.all(promises);
  let arg1 = function (resolved) {
    assert_bool(Caml_array.get(resolved, 0) === 1);
    assert_bool(Caml_array.get(resolved, 1) === 2);
    assert_bool(Caml_array.get(resolved, 2) === 3);
    return h;
  };
  return obj.then(arg1);
}

function is_not_found(error) {
  return error.RE_EXN_ID === "Not_found";
}

function allRejectTest(param) {
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(3);
  let p3 = Promise.reject({
        RE_EXN_ID: "Not_found"
      });
  let promises = [
    p1,
    p2,
    p3
  ];
  let obj = Promise.all(promises);
  let obj$1 = obj.then(fail);
  let arg1 = function (error) {
    assert_bool(error.RE_EXN_ID === "Not_found");
    return h;
  };
  return obj$1.catch(arg1);
}

function raceTest(param) {
  let p1 = Promise.resolve("first");
  let p2 = Promise.resolve("second");
  let p3 = Promise.resolve("third");
  let promises = [
    p1,
    p2,
    p3
  ];
  let obj = Promise.race(promises);
  let arg1 = function (resolved) {
    return h;
  };
  let obj$1 = obj.then(arg1);
  return obj$1.catch(fail);
}

function createPromiseRejectTest(param) {
  let obj = new Promise((function (resolve, reject) {
          reject({
                RE_EXN_ID: "Not_found"
              });
        }));
  let arg1 = function (error) {
    assert_bool(error.RE_EXN_ID === "Not_found");
    return h;
  };
  return obj.catch(arg1);
}

function createPromiseFulfillTest(param) {
  let obj = new Promise((function (resolve, param) {
          resolve("success");
        }));
  let arg1 = function (resolved) {
    assert_bool(resolved === "success");
    return h;
  };
  let obj$1 = obj.then(arg1);
  return obj$1.catch(fail);
}

thenTest(undefined);

andThenTest(undefined);

catchTest(undefined);

orResolvedTest(undefined);

orRejectedTest(undefined);

orElseResolvedTest(undefined);

orElseRejectedResolveTest(undefined);

orElseRejectedRejectTest(undefined);

thenCatchChainResolvedTest(undefined);

thenCatchChainRejectedTest(undefined);

allResolvedTest(undefined);

allRejectTest(undefined);

raceTest(undefined);

createPromiseRejectTest(undefined);

createPromiseFulfillTest(undefined);

let obj = Promise.all([
      Promise.resolve(2),
      Promise.resolve(3)
    ]);

function arg1(param) {
  eq("File \"js_promise_basic_test.ml\", line 171, characters 12-19", [
        param[0],
        param[1]
      ], [
        2,
        3
      ]);
  return Promise.resolve(undefined);
}

obj.then(arg1);

console.log(List.length(suites.contents));

console.log("hey");

Mt.from_pair_suites("Js_promise_basic_test", suites.contents);

let twop = Promise.resolve(2);

function re(prim) {
  return Promise.resolve(prim);
}

Mt.from_promise_suites("Js_promise_basic_test", {
      hd: [
        "File \"js_promise_basic_test.ml\", line 191, characters 5-12",
        twop.then(function (x) {
              return Promise.resolve({
                          TAG: "Eq",
                          _0: x,
                          _1: 2
                        });
            })
      ],
      tl: {
        hd: [
          "File \"js_promise_basic_test.ml\", line 192, characters 5-12",
          twop.then(function (x) {
                return Promise.resolve({
                            TAG: "Neq",
                            _0: x,
                            _1: 3
                          });
              })
        ],
        tl: /* [] */0
      }
    });

let then_ = Js_promise.then_;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.assert_bool = assert_bool;
exports.fail = fail;
exports.thenTest = thenTest;
exports.andThenTest = andThenTest;
exports.h = h;
exports.assertIsNotFound = assertIsNotFound;
exports.catchTest = catchTest;
exports.orResolvedTest = orResolvedTest;
exports.orRejectedTest = orRejectedTest;
exports.orElseResolvedTest = orElseResolvedTest;
exports.orElseRejectedResolveTest = orElseRejectedResolveTest;
exports.Stack_overflow = Stack_overflow;
exports.orElseRejectedRejectTest = orElseRejectedRejectTest;
exports.resolveTest = resolveTest;
exports.rejectTest = rejectTest;
exports.thenCatchChainResolvedTest = thenCatchChainResolvedTest;
exports.thenCatchChainRejectedTest = thenCatchChainRejectedTest;
exports.allResolvedTest = allResolvedTest;
exports.is_not_found = is_not_found;
exports.allRejectTest = allRejectTest;
exports.raceTest = raceTest;
exports.createPromiseRejectTest = createPromiseRejectTest;
exports.createPromiseFulfillTest = createPromiseFulfillTest;
exports.twop = twop;
exports.then_ = then_;
exports.re = re;
/* h Not a pure module */
