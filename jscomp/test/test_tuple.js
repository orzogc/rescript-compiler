'use strict';


let r = 0;

for(let k = 1; k <= 10; ++k){
  for(let i = 1; i <= 10; ++i){
    let match = i % 2 === 0 ? [
        1,
        (i << 1)
      ] : [
        2,
        Math.imul(i, 3)
      ];
    r = Math.imul(r, match[0]) + match[1] | 0;
  }
}

/*  Not a pure module */
