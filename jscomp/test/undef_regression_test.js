'use strict';


function f(obj) {
  if (typeof obj === "function") {
    return ;
  }
  let size = obj.length;
  if (size !== undefined) {
    console.log(size);
    return ;
  }
  
}

exports.f = f;
/* No side effect */
