let foo = (x, y) => x + y

let z = foo(3, 4)

let bar = (x, y) => x + y

let b = bar(3, 4)

let w = 3->foo(4)

let a = 3->foo(4)

Js.log(a) // Test automatic uncurried application

let _ = Js.Array2.map([1], x => x + 1)
