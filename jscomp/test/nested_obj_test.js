'use strict';


let f = {
  x: {
    y: {
      z: 3
    }
  }
};

let f2_0 = {
  hd: {
    x: {
      y: {
        z: 3
      }
    }
  },
  tl: {
    hd: {
      x: {
        y: {
          z: 31
        }
      }
    },
    tl: /* [] */0
  }
};

let f2_1 = [
  {
    x: {
      y: {
        z: 3
      }
    }
  },
  {
    x: {
      y: {
        z: 31
      }
    }
  }
];

let f2 = [
  f2_0,
  f2_1
];

let f3 = {
  x: {
    y: {
      z: 3
    }
  }
};

let f_record = {
  x: {
    y: {
      z: 3
    }
  }
};

exports.f_record = f_record;
exports.f = f;
exports.f2 = f2;
exports.f3 = f3;
/* No side effect */
