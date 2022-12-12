/***
  Provide bindings to JS regular expressions (RegExp).

  **Note:** This is not an immutable API. A RegExp object with the `global` (\"g\")
  flag set will modify the [`lastIndex`]() property when the RegExp object is used,
  and subsequent uses will continue the search from the previous [`lastIndex`]().
*/

/** The RegExp object. */
type t

/** The result of a executing a RegExp on a string. */
type result

/**
  An `array` of the match and captures, the first is the full match and the
  remaining are the substring captures.
*/
external captures: result => array<Js.nullable<string>> = "%identity"

/**
  Deprecated. Use `captures` instead.
*/ @deprecated("Use Js.Re.captures instead")
external matches: result => array<string> = "%identity"

/** 0-based index of the match in the input string. */ @get
external index: result => int = "index"

/** The original input string. */ @get external input: result => string = "input"

/**
  Constructs a RegExp object (Js.Re.t) from a `string`.
  Regex literals `%re(\"/.../\")` should generally be preferred, but `fromString`
  is useful when you need to dynamically construct a regex using strings,
  exactly like when you do so in JavaScript.

  ```res example
  let firstReScriptFileExtension = (filename, content) => {
    let result = Js.Re.fromString(filename ++ \"\.(res|resi)\")->Js.Re.exec_(content)
    switch result {
    | Some(r) => Js.Nullable.toOption(Js.Re.captures(r)[1])
    | None => None
    }
  }

  // outputs \"res\"
  firstReScriptFileExtension(\"School\", \"School.res School.resi Main.js School.bs.js\")
  ```
*/
@new
external fromString: string => t = "RegExp"

/**
  Constructs a RegExp object (`Js.Re.t`) from a string with the given flags.
  See `Js.Re.fromString`.

  Valid flags:

  - **g** global
  - **i** ignore case
  - **m** multiline
  - **u** unicode (es2015)
  - **y** sticky (es2015)
*/
@new
external fromStringWithFlags: (string, ~flags: string) => t = "RegExp"

/** Returns the enabled flags as a string. */ @get external flags: t => string = "flags"

/** Returns a `bool` indicating whether the global flag is set. */ @get
external global: t => bool = "global"

/** Returns a `bool` indicating whether the ignoreCase flag is set. */ @get
external ignoreCase: t => bool = "ignoreCase"

/**
  Returns the index where the next match will start its search. This property
  will be modified when the RegExp object is used, if the global (\"g\") flag is
  set.

  ```res example
  let re = %re(\"/ab*/g\")
  let str = \"abbcdefabh\"

  let break = ref(false)
  while !break.contents {
    switch Js.Re.exec_(re, str) {
    | Some(result) => Js.Nullable.iter(Js.Re.captures(result)[0], (. match_) => {
        let next = Belt.Int.toString(Js.Re.lastIndex(re))
        Js.log(\"Found \" ++ (match_ ++ (\". Next match starts at \" ++ next)))
      })
    | None => break := true
    }
  }
  ```

  See
  [`RegExp: lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
  on MDN.
*/
@get
external lastIndex: t => int = "lastIndex"

/** Sets the index at which the next match will start its search from. */ @set
external setLastIndex: (t, int) => unit = "lastIndex"

/** Returns a `bool` indicating whether the multiline flag is set. */ @get
external multiline: t => bool = "multiline"

/** Returns the pattern as a `string`. */ @get external source: t => string = "source"

/** Returns a `bool` indicating whether the sticky flag is set. */ @get
external sticky: t => bool = "sticky"

/** Returns a `bool` indicating whether the unicode flag is set. */ @get
external unicode: t => bool = "unicode"

/**
  Executes a search on a given string using the given RegExp object.
  Returns `Some(Js.Re.result)` if a match is found, `None` otherwise.

  ```res example
  /* Match \"quick brown\" followed by \"jumps\", ignoring characters in between
   * Remember \"brown\" and \"jumps\"
   * Ignore case
   */

  let re = %re(\"/quick\s(brown).+?(jumps)/ig\")
  let result = Js.Re.exec_(re, \"The Quick Brown Fox Jumps Over The Lazy Dog\")
  ```

  See
  [`RegExp.prototype.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
  on MDN.
*/
@send
@return(null_to_opt)
external exec_: (t, string) => option<result> = "exec"

/**
  Tests whether the given RegExp object will match a given `string`.
  Returns true if a match is found, false otherwise.

  ```res example
  /* A simple implementation of Js.String.startsWith */

  let str = \"hello world!\"

  let startsWith = (target, substring) =>
    Js.Re.fromString(\"^\" ++ substring)->Js.Re.test_(target)

  Js.log(str->startsWith(\"hello\")) /* prints \"true\" */
  ```

  See
  [`RegExp.prototype.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
  on MDN.
*/
@send
external test_: (t, string) => bool = "test"
