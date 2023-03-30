


function test(x) {
  if (typeof x === "string") {
    return [
            "String",
            x
          ];
  } else {
    return [
            "Buffer",
            x
          ];
  }
}

let Path;

let Fs;

let Process;

let Module;

let $$Buffer;

let Child_process;

export {
  Path ,
  Fs ,
  Process ,
  Module ,
  $$Buffer ,
  Child_process ,
  test ,
}
/* No side effect */
