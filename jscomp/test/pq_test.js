'use strict';

let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

function insert(queue, prio, elt) {
  if (typeof queue !== "object") {
    return {
            TAG: "Node",
            _0: prio,
            _1: elt,
            _2: "Empty",
            _3: "Empty"
          };
  }
  let right = queue._3;
  let left = queue._2;
  let e = queue._1;
  let p = queue._0;
  if (prio <= p) {
    return {
            TAG: "Node",
            _0: prio,
            _1: elt,
            _2: insert(right, p, e),
            _3: left
          };
  } else {
    return {
            TAG: "Node",
            _0: p,
            _1: e,
            _2: insert(right, prio, elt),
            _3: left
          };
  }
}

let Queue_is_empty = /* @__PURE__ */Caml_exceptions.create("Pq_test.PrioQueue.Queue_is_empty");

function remove_top(param) {
  if (typeof param !== "object") {
    throw {
          RE_EXN_ID: Queue_is_empty,
          Error: new Error()
        };
  }
  let left = param._2;
  let tmp = param._3;
  if (typeof tmp !== "object") {
    return left;
  }
  if (typeof left !== "object") {
    return param._3;
  }
  let right = param._3;
  let rprio = right._0;
  let lprio = left._0;
  if (lprio <= rprio) {
    return {
            TAG: "Node",
            _0: lprio,
            _1: left._1,
            _2: remove_top(left),
            _3: right
          };
  } else {
    return {
            TAG: "Node",
            _0: rprio,
            _1: right._1,
            _2: left,
            _3: remove_top(right)
          };
  }
}

function extract(queue) {
  if (typeof queue === "object") {
    return [
            queue._0,
            queue._1,
            remove_top(queue)
          ];
  }
  throw {
        RE_EXN_ID: Queue_is_empty,
        Error: new Error()
      };
}

let PrioQueue = {
  empty: "Empty",
  insert: insert,
  Queue_is_empty: Queue_is_empty,
  remove_top: remove_top,
  extract: extract
};

exports.PrioQueue = PrioQueue;
/* No side effect */
