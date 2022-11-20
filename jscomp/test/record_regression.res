// @@config({flags: ["-bs-diagnose"] })

type t0 = {x: int, @ns.optional y: int, @ns.optional yy: option<int>, z: int}

let f1 = {x: 3, z: 2}

let f2 = {x: 3, z: 3, y: 3}

let f3 = {...f1, y: 3}

let f4 = {...f3, yy: None}

let theseTwoShouldBeIdentical = [f4.yy, (Some(None): option<option<int>>)]

type r = {
  x: int,
  y: option<int>,
  z: int,
}

// let v0 = { x :  3 , z : 2 }

// let v2 = { ... v0 , x : 3 }

let v1: t0 = {
  x: 3,
  z: 3,
}

let v2: r = {x: 3, y: None, z: 2}

type config = {
  x: int,
  @ns.optional y0: int,
  @ns.optional y1: int,
  @ns.optional y2: int,
  @ns.optional y3: int,
  @ns.optional y4: int,
  @ns.optional y5: int,
  @ns.optional y6: int,
  @ns.optional y7: int,
  @ns.optional y8: int,
  @ns.optional y9: int,
  @ns.optional y10: int,
  @ns.optional y11: int,
  @ns.optional y12: int,
  @ns.optional y13: int,
  @ns.optional y14: int,
  @ns.optional y15: int,
  @ns.optional y16: int,
  @ns.optional y17: int,
  @ns.optional y18: int,
  @ns.optional y19: int,
  @ns.optional y20: int,
  @ns.optional y21: int,
  @ns.optional y22: int,
  @ns.optional y23: int,
  z: int,
}

let v: config = {x: 2, z: 3}

let h: config = {...v, y1: 22}

type small_config = {
  x: int,
  @ns.optional y0: int,
  @ns.optional y1: int,
  z: int,
}

let v1: small_config = {x: 2, z: 3}

let h10: small_config = {...v1, y1: 22}

let h11 = (v1): small_config => {
  {...v1, y1: 22}
}

type partiallyOptional = {
  @ns.optional aa: int,
  bb: option<int>,
}

let po = {aa: 3, bb: Some(4)}

let _ = {...po, aa: @ns.optional None}

let setAA = (ao: option<int>) => {aa: @ns.optional ao, bb: None}

// Trigger representation mismatch error.
// module M: {
//   type partiallyOptional = {
//     @ns.optional aa: int,
//     bb: option<int>,
//   }
// } = {
//   type partiallyOptional = {
//     @ns.optional aa: int,
//     @ns.optional bb: int,
//   }
// }

type foo = Foo({name: string, age?: int})

let foo1 = Foo({name: "foo"}) 
let foo2 = Foo({name: "foo", age: 3})

// should be type error
// let foo3 = Foo({name: "foo", age: 3, nickname: "hasNoNickname"})
// let foo4 = Foo({name: "foo", age: "3"})

type inlinedRecord = V0({x0: string, x1?: string, x2?: int, x3: int}) | V1({y0: string, y1: int})

let ir0 = V0({x0: "v0", x3: 3})
let ir1 = V0({x0: "v0", x1: "v1", x3: 3})
let ir2 = V0({x0: "v0", x1: "v1", x2: 2, x3: 3})

let pm0 = switch ir0 {
  | V0({x0, x3}) => (x0, x3)
  | V1({y0, y1}) => (y0, y1)
}
let pm1 = switch ir1 {
  | V0({x0, x1, x3}) => (x0, x1, x3)
  | V1({y0, y1}) => (y0, None, y1)
}
let pm2 = switch ir2 {
  | V0({x0, x1, x2, x3}) => (x0, x1, x2, x3)
  | V1({y0, y1}) => (y0, None, None, y1)
}
let pm3 = switch ir2 {
  | V0({x0, x1, x2, x3}) if x1 == Some("x1") => (x0, "x1!", x2, x3)
  | V0({x0, x1, x2, x3}) => switch x1 {
    | Some(x1) => (x0, x1, x2, x3)
    | None => (x0, "not existed", x2, x3)
  }
  | V1({y0, y1}) => (y0, "not existed", None, y1)
}
