'use strict';


let fake_y = {
  hd: 2,
  tl: {
    hd: 3,
    tl: /* [] */0
  }
};

let fake_z = {
  hd: 1,
  tl: fake_y
};

exports.fake_y = fake_y;
exports.fake_z = fake_z;
/* No side effect */
