'use strict';

let Caml = require("../../lib/js/caml.js");
let Curry = require("../../lib/js/curry.js");
let Hashtbl = require("../../lib/js/hashtbl.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function Make(funarg) {
  let $$let = funarg.V;
  let H = Hashtbl.Make({
        equal: $$let.equal,
        hash: $$let.hash
      });
  let find_default = function (htbl, x) {
    try {
      return Curry._2(H.find, htbl, x);
    }
    catch (raw_exn){
      let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return false;
      }
      throw exn;
    }
  };
  let min_cutset = function (gr, first_node) {
    let n_labels = Curry._1(H.create, 97);
    let l_labels = Curry._1(H.create, 97);
    let already_processed = Curry._1(H.create, 97);
    let on_the_stack = Curry._1(H.create, 97);
    let cut_set = {
      contents: /* [] */0
    };
    let counter = {
      contents: 1
    };
    let step2 = function (top, rest_of_stack) {
      if (find_default(already_processed, top)) {
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "gpr_405_test.ml",
                43,
                6
              ],
              Error: new Error()
            };
      }
      if (find_default(on_the_stack, top)) {
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "gpr_405_test.ml",
                44,
                6
              ],
              Error: new Error()
            };
      }
      Curry._3(H.add, on_the_stack, top, true);
      Curry._3(H.add, n_labels, top, counter.contents);
      counter.contents = counter.contents + 1 | 0;
      Curry._3(H.add, l_labels, top, 0);
      Curry._3(H.add, already_processed, top, true);
      let _successors = Curry._2(funarg.succ, gr, top);
      let _top = top;
      let _rest_of_stack = rest_of_stack;
      while(true) {
        let rest_of_stack$1 = _rest_of_stack;
        let top$1 = _top;
        let successors = _successors;
        if (successors) {
          let successor = successors.hd;
          if (!find_default(already_processed, successor)) {
            return step2(successor, {
                        hd: [
                          top$1,
                          successors
                        ],
                        tl: rest_of_stack$1
                      });
          }
          let x = find_default(on_the_stack, successor) ? Curry._2(H.find, n_labels, successor) : Curry._2(H.find, l_labels, successor);
          Curry._3(H.add, l_labels, top$1, Caml.int_max(Curry._2(H.find, l_labels, top$1), x));
          _successors = successors.tl;
          continue ;
        }
        if (Curry._2(H.find, l_labels, top$1) === Curry._2(H.find, n_labels, top$1)) {
          cut_set.contents = {
            hd: top$1,
            tl: cut_set.contents
          };
          Curry._3(H.add, l_labels, top$1, 0);
        }
        if (Curry._2(H.find, l_labels, top$1) > Curry._2(H.find, n_labels, top$1)) {
          throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "Graph.Mincut: graph not reducible",
                Error: new Error()
              };
        }
        if (!rest_of_stack$1) {
          return cut_set.contents;
        }
        let match = rest_of_stack$1.hd;
        let new_top = match[0];
        Curry._3(H.add, on_the_stack, top$1, false);
        Curry._3(H.add, l_labels, new_top, Caml.int_max(Curry._2(H.find, l_labels, top$1), Curry._2(H.find, l_labels, new_top)));
        _rest_of_stack = rest_of_stack$1.tl;
        _top = new_top;
        _successors = match[1];
        continue ;
      };
    };
    return step2(first_node, /* [] */0);
  };
  return {
          min_cutset: min_cutset
        };
}

exports.Make = Make;
/* No side effect */
