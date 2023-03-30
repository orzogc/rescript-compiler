'use strict';


function f_list(x) {
  if (!x) {
    return 0;
  }
  let match = x.tl;
  if (!match) {
    return 0;
  }
  let match$1 = match.tl;
  if (!match$1) {
    return 0;
  }
  let match$2 = match$1.tl;
  if (!match$2) {
    return 0;
  }
  let match$3 = match$2.tl;
  if (!match$3) {
    return 0;
  }
  let match$4 = match$3.tl;
  if (match$4) {
    return ((((x.hd + match.hd | 0) + match$1.hd | 0) + match$2.hd | 0) + match$3.hd | 0) + match$4.hd | 0;
  } else {
    return 0;
  }
}

function f_arr(x) {
  if (x.length !== 6) {
    return 0;
  }
  let a0 = x[0];
  let a1 = x[1];
  let a2 = x[2];
  let a3 = x[3];
  let a4 = x[4];
  let a5 = x[5];
  return ((((a0 + a1 | 0) + a2 | 0) + a3 | 0) + a4 | 0) + a5 | 0;
}

function f_opion(x) {
  let match = x.hi;
  if (match !== 2) {
    if (match !== 3) {
      return 0;
    }
    let match$1 = x.lo;
    if (!match$1) {
      return 0;
    }
    if (match$1.hd !== undefined) {
      return 0;
    }
    let match$2 = match$1.tl;
    if (!match$2) {
      return 0;
    }
    if (match$2.hd !== undefined) {
      return 0;
    }
    let match$3 = match$2.tl;
    if (!match$3) {
      return 0;
    }
    let match$4 = match$3.hd;
    if (match$4 === undefined) {
      return 0;
    }
    if (match$4 !== 2) {
      return 0;
    }
    let match$5 = match$3.tl;
    if (!match$5) {
      return 0;
    }
    let match$6 = match$5.hd;
    if (match$6 === undefined) {
      return 0;
    }
    if (match$6 !== 1) {
      return 0;
    }
    let match$7 = match$5.tl;
    if (match$7 && match$7.hd !== undefined) {
      return 2;
    } else {
      return 0;
    }
  }
  let match$8 = x.lo;
  if (!match$8) {
    return 0;
  }
  if (match$8.hd !== undefined) {
    return 0;
  }
  let match$9 = match$8.tl;
  if (!match$9) {
    return 0;
  }
  if (match$9.hd !== undefined) {
    return 0;
  }
  let match$10 = match$9.tl;
  if (!match$10) {
    return 0;
  }
  let match$11 = match$10.hd;
  if (match$11 === undefined) {
    return 0;
  }
  if (match$11 !== 2) {
    return 0;
  }
  let match$12 = match$10.tl;
  if (!match$12) {
    return 0;
  }
  let match$13 = match$12.hd;
  if (match$13 === undefined) {
    return 0;
  }
  if (match$13 !== 1) {
    return 0;
  }
  let match$14 = match$12.tl;
  if (match$14 && match$14.hd !== undefined) {
    return 3;
  } else {
    return 0;
  }
}

exports.f_list = f_list;
exports.f_arr = f_arr;
exports.f_opion = f_opion;
/* No side effect */
