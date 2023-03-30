'use strict';

let Curry = require("../../lib/js/curry.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");

let Empty = /* @__PURE__ */Caml_exceptions.create("Queue_402.Empty");

function create(param) {
  return {
          length: 0,
          tail: undefined
        };
}

function clear(q) {
  q.length = 0;
  q.tail = undefined;
}

function add(x, q) {
  if (q.length === 0) {
    let cell = {};
    cell.content = x;
    cell.next = cell;
    q.length = 1;
    q.tail = cell;
    return ;
  }
  let tail = q.tail;
  let head = tail.next;
  let cell$1 = {
    content: x,
    next: head
  };
  q.length = q.length + 1 | 0;
  tail.next = cell$1;
  q.tail = cell$1;
}

function peek(q) {
  if (q.length === 0) {
    throw {
          RE_EXN_ID: Empty,
          Error: new Error()
        };
  }
  return q.tail.next.content;
}

function take(q) {
  if (q.length === 0) {
    throw {
          RE_EXN_ID: Empty,
          Error: new Error()
        };
  }
  q.length = q.length - 1 | 0;
  let tail = q.tail;
  let head = tail.next;
  if (head === tail) {
    q.tail = undefined;
  } else {
    tail.next = head.next;
  }
  return head.content;
}

function copy(q) {
  if (q.length === 0) {
    return {
            length: 0,
            tail: undefined
          };
  }
  let tail = q.tail;
  let tail$p = {};
  Caml_obj.update_dummy(tail$p, {
        content: tail.content,
        next: tail$p
      });
  let copy$1 = function (_prev, _cell) {
    while(true) {
      let cell = _cell;
      let prev = _prev;
      if (cell === tail) {
        return ;
      }
      let res = {
        content: cell.content,
        next: tail$p
      };
      prev.next = res;
      _cell = cell.next;
      _prev = res;
      continue ;
    };
  };
  copy$1(tail$p, tail.next);
  return {
          length: q.length,
          tail: tail$p
        };
}

function is_empty(q) {
  return q.length === 0;
}

function length(q) {
  return q.length;
}

function iter(f, q) {
  if (q.length <= 0) {
    return ;
  }
  let tail = q.tail;
  let _cell = tail.next;
  while(true) {
    let cell = _cell;
    Curry._1(f, cell.content);
    if (cell === tail) {
      return ;
    }
    _cell = cell.next;
    continue ;
  };
}

function fold(f, accu, q) {
  if (q.length === 0) {
    return accu;
  }
  let tail = q.tail;
  let _accu = accu;
  let _cell = tail.next;
  while(true) {
    let cell = _cell;
    let accu$1 = _accu;
    let accu$2 = Curry._2(f, accu$1, cell.content);
    if (cell === tail) {
      return accu$2;
    }
    _cell = cell.next;
    _accu = accu$2;
    continue ;
  };
}

function transfer(q1, q2) {
  let length1 = q1.length;
  if (length1 <= 0) {
    return ;
  }
  let tail1 = q1.tail;
  clear(q1);
  if (q2.length > 0) {
    let tail2 = q2.tail;
    let head1 = tail1.next;
    let head2 = tail2.next;
    tail1.next = head2;
    tail2.next = head1;
  }
  q2.length = q2.length + length1 | 0;
  q2.tail = tail1;
}

let push = add;

let top = peek;

let pop = take;

exports.Empty = Empty;
exports.create = create;
exports.clear = clear;
exports.add = add;
exports.push = push;
exports.peek = peek;
exports.top = top;
exports.take = take;
exports.pop = pop;
exports.copy = copy;
exports.is_empty = is_empty;
exports.length = length;
exports.iter = iter;
exports.fold = fold;
exports.transfer = transfer;
/* No side effect */
