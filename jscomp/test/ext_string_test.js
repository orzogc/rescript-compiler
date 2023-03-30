'use strict';

let List = require("../../lib/js/list.js");
let Bytes = require("../../lib/js/bytes.js");
let Curry = require("../../lib/js/curry.js");
let $$String = require("../../lib/js/string.js");
let Caml_bytes = require("../../lib/js/caml_bytes.js");
let Caml_string = require("../../lib/js/caml_string.js");
let Ext_bytes_test = require("./ext_bytes_test.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function split_by(keep_emptyOpt, is_delim, str) {
  let keep_empty = keep_emptyOpt !== undefined ? keep_emptyOpt : false;
  let len = str.length;
  let _acc = /* [] */0;
  let _last_pos = len;
  let _pos = len - 1 | 0;
  while(true) {
    let pos = _pos;
    let last_pos = _last_pos;
    let acc = _acc;
    if (pos === -1) {
      if (last_pos === 0 && !keep_empty) {
        return acc;
      } else {
        return {
                hd: $$String.sub(str, 0, last_pos),
                tl: acc
              };
      }
    }
    if (Curry._1(is_delim, Caml_string.get(str, pos))) {
      let new_len = (last_pos - pos | 0) - 1 | 0;
      if (new_len !== 0 || keep_empty) {
        let v = $$String.sub(str, pos + 1 | 0, new_len);
        _pos = pos - 1 | 0;
        _last_pos = pos;
        _acc = {
          hd: v,
          tl: acc
        };
        continue ;
      }
      _pos = pos - 1 | 0;
      _last_pos = pos;
      continue ;
    }
    _pos = pos - 1 | 0;
    continue ;
  };
}

function trim(s) {
  let i = 0;
  let j = s.length;
  while((function () {
          let tmp = false;
          if (i < j) {
            let u = s.codePointAt(i);
            tmp = u === /* '\t' */9 || u === /* '\n' */10 || u === /* ' ' */32;
          }
          return tmp;
        })()) {
    i = i + 1 | 0;
  };
  let k = j - 1 | 0;
  while((function () {
          let tmp = false;
          if (k >= i) {
            let u = s.codePointAt(k);
            tmp = u === /* '\t' */9 || u === /* '\n' */10 || u === /* ' ' */32;
          }
          return tmp;
        })()) {
    k = k - 1 | 0;
  };
  return $$String.sub(s, i, (k - i | 0) + 1 | 0);
}

function split(keep_empty, str, on) {
  if (str === "") {
    return /* [] */0;
  } else {
    return split_by(keep_empty, (function (x) {
                  return x === on;
                }), str);
  }
}

function quick_split_by_ws(str) {
  return split_by(false, (function (x) {
                if (x === /* '\t' */9 || x === /* '\n' */10) {
                  return true;
                } else {
                  return x === /* ' ' */32;
                }
              }), str);
}

function starts_with(s, beg) {
  let beg_len = beg.length;
  let s_len = s.length;
  if (beg_len > s_len) {
    return false;
  }
  let i = 0;
  while(i < beg_len && s.codePointAt(i) === beg.codePointAt(i)) {
    i = i + 1 | 0;
  };
  return i === beg_len;
}

function ends_with_index(s, end_) {
  let s_finish = s.length - 1 | 0;
  let s_beg = end_.length - 1 | 0;
  if (s_beg > s_finish) {
    return -1;
  }
  let _j = s_finish;
  let _k = s_beg;
  while(true) {
    let k = _k;
    let j = _j;
    if (k < 0) {
      return j + 1 | 0;
    }
    if (s.codePointAt(j) !== end_.codePointAt(k)) {
      return -1;
    }
    _k = k - 1 | 0;
    _j = j - 1 | 0;
    continue ;
  };
}

function ends_with(s, end_) {
  return ends_with_index(s, end_) >= 0;
}

function ends_with_then_chop(s, beg) {
  let i = ends_with_index(s, beg);
  if (i >= 0) {
    return $$String.sub(s, 0, i);
  }
  
}

function check_any_suffix_case(s, suffixes) {
  return List.exists((function (x) {
                return ends_with(s, x);
              }), suffixes);
}

function check_any_suffix_case_then_chop(s, suffixes) {
  let _suffixes = suffixes;
  while(true) {
    let suffixes$1 = _suffixes;
    if (!suffixes$1) {
      return ;
    }
    let id = ends_with_index(s, suffixes$1.hd);
    if (id >= 0) {
      return $$String.sub(s, 0, id);
    }
    _suffixes = suffixes$1.tl;
    continue ;
  };
}

function escaped(s) {
  let needs_escape = function (_i) {
    while(true) {
      let i = _i;
      if (i >= s.length) {
        return false;
      }
      let match = s.codePointAt(i);
      if (match < 32) {
        return true;
      }
      if (match > 92 || match < 34) {
        if (match >= 127) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }
      if (match > 91 || match < 35) {
        return true;
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  if (needs_escape(0)) {
    return Bytes.unsafe_to_string(Ext_bytes_test.escaped(Bytes.unsafe_of_string(s)));
  } else {
    return s;
  }
}

function unsafe_for_all_range(s, _start, finish, p) {
  while(true) {
    let start = _start;
    if (start > finish) {
      return true;
    }
    if (!Curry._1(p, s.codePointAt(start))) {
      return false;
    }
    _start = start + 1 | 0;
    continue ;
  };
}

function for_all_range(s, start, finish, p) {
  let len = s.length;
  if (start < 0 || finish >= len) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Ext_string_test.for_all_range",
          Error: new Error()
        };
  }
  return unsafe_for_all_range(s, start, finish, p);
}

function for_all(p, s) {
  return unsafe_for_all_range(s, 0, s.length - 1 | 0, p);
}

function is_empty(s) {
  return s.length === 0;
}

function repeat(n, s) {
  let len = s.length;
  let res = Caml_bytes.create(Math.imul(n, len));
  for(let i = 0; i < n; ++i){
    $$String.blit(s, 0, res, Math.imul(i, len), len);
  }
  return Bytes.to_string(res);
}

function unsafe_is_sub(sub, i, s, j, len) {
  if ((j + len | 0) <= s.length) {
    let _k = 0;
    while(true) {
      let k = _k;
      if (k === len) {
        return true;
      }
      if (sub.codePointAt(i + k | 0) !== s.codePointAt(j + k | 0)) {
        return false;
      }
      _k = k + 1 | 0;
      continue ;
    };
  } else {
    return false;
  }
}

let Local_exit = /* @__PURE__ */Caml_exceptions.create("Ext_string_test.Local_exit");

function find(startOpt, sub, s) {
  let start = startOpt !== undefined ? startOpt : 0;
  let n = sub.length;
  let s_len = s.length;
  let i = start;
  try {
    while((i + n | 0) <= s_len) {
      if (unsafe_is_sub(sub, 0, s, i, n)) {
        throw {
              RE_EXN_ID: Local_exit,
              Error: new Error()
            };
      }
      i = i + 1 | 0;
    };
    return -1;
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Local_exit) {
      return i;
    }
    throw exn;
  }
}

function contain_substring(s, sub) {
  return find(undefined, sub, s) >= 0;
}

function non_overlap_count(sub, s) {
  let sub_len = sub.length;
  if (sub.length === 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Ext_string_test.non_overlap_count",
          Error: new Error()
        };
  }
  let _acc = 0;
  let _off = 0;
  while(true) {
    let off = _off;
    let acc = _acc;
    let i = find(off, sub, s);
    if (i < 0) {
      return acc;
    }
    _off = i + sub_len | 0;
    _acc = acc + 1 | 0;
    continue ;
  };
}

function rfind(sub, s) {
  let n = sub.length;
  let i = s.length - n | 0;
  try {
    while(i >= 0) {
      if (unsafe_is_sub(sub, 0, s, i, n)) {
        throw {
              RE_EXN_ID: Local_exit,
              Error: new Error()
            };
      }
      i = i - 1 | 0;
    };
    return -1;
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Local_exit) {
      return i;
    }
    throw exn;
  }
}

function tail_from(s, x) {
  let len = s.length;
  if (x <= len) {
    return $$String.sub(s, x, len - x | 0);
  }
  let s$1 = "Ext_string_test.tail_from " + (s + (" : " + String(x)));
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: s$1,
        Error: new Error()
      };
}

function digits_of_str(s, offset, x) {
  let _i = 0;
  let _acc = 0;
  while(true) {
    let acc = _acc;
    let i = _i;
    if (i >= x) {
      return acc;
    }
    _acc = (Math.imul(10, acc) + Caml_string.get(s, offset + i | 0) | 0) - 48 | 0;
    _i = i + 1 | 0;
    continue ;
  };
}

function starts_with_and_number(s, offset, beg) {
  let beg_len = beg.length;
  let s_len = s.length;
  let finish_delim = offset + beg_len | 0;
  if (finish_delim > s_len) {
    return -1;
  }
  let i = offset;
  while(i < finish_delim && s.codePointAt(i) === beg.codePointAt(i - offset | 0)) {
    i = i + 1 | 0;
  };
  if (i === finish_delim) {
    return digits_of_str(s, finish_delim, 2);
  } else {
    return -1;
  }
}

function equal(x, y) {
  return x === y;
}

function rindex_rec(s, _i, c) {
  while(true) {
    let i = _i;
    if (i < 0) {
      return i;
    }
    if (s.codePointAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    let i = _i;
    if (i < 0) {
      return ;
    }
    if (s.codePointAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_neg(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function is_valid_module_file(s) {
  let len = s.length;
  if (len <= 0) {
    return false;
  }
  let match = s.codePointAt(0);
  if (match >= 91) {
    if (match > 122 || match < 97) {
      return false;
    }
    
  } else if (match < 65) {
    return false;
  }
  return unsafe_for_all_range(s, 1, len - 1 | 0, (function (x) {
                if (x >= 65) {
                  if (x > 96 || x < 91) {
                    return x < 123;
                  } else {
                    return x === 95;
                  }
                } else if (x >= 48) {
                  return x < 58;
                } else {
                  return x === 39;
                }
              }));
}

function is_valid_npm_package_name(s) {
  let len = s.length;
  if (len > 214) {
    return false;
  }
  if (len <= 0) {
    return false;
  }
  let match = s.codePointAt(0);
  if (match >= 97) {
    if (match >= 123) {
      return false;
    }
    
  } else if (match !== 64) {
    return false;
  }
  return unsafe_for_all_range(s, 1, len - 1 | 0, (function (x) {
                if (x >= 58) {
                  if (x >= 97) {
                    return x < 123;
                  } else {
                    return x === 95;
                  }
                } else if (x !== 45) {
                  return x >= 48;
                } else {
                  return true;
                }
              }));
}

function is_valid_source_name(name) {
  let x = check_any_suffix_case_then_chop(name, {
        hd: ".ml",
        tl: {
          hd: ".res",
          tl: {
            hd: ".mli",
            tl: {
              hd: ".resi",
              tl: /* [] */0
            }
          }
        }
      });
  if (x !== undefined) {
    if (is_valid_module_file(x)) {
      return "Good";
    } else {
      return "Invalid_module_name";
    }
  } else {
    return "Suffix_mismatch";
  }
}

function unsafe_no_char(x, ch, _i, last_idx) {
  while(true) {
    let i = _i;
    if (i > last_idx) {
      return true;
    }
    if (x.codePointAt(i) === ch) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function unsafe_no_char_idx(x, ch, _i, last_idx) {
  while(true) {
    let i = _i;
    if (i > last_idx) {
      return -1;
    }
    if (x.codePointAt(i) === ch) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function no_char(x, ch, i, len) {
  let str_len = x.length;
  if (i < 0 || i >= str_len || len >= str_len) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Ext_string_test.no_char",
          Error: new Error()
        };
  }
  return unsafe_no_char(x, ch, i, len);
}

function no_slash(x) {
  return unsafe_no_char(x, /* '/' */47, 0, x.length - 1 | 0);
}

function no_slash_idx(x) {
  return unsafe_no_char_idx(x, /* '/' */47, 0, x.length - 1 | 0);
}

function replace_slash_backward(x) {
  let len = x.length;
  if (unsafe_no_char(x, /* '/' */47, 0, len - 1 | 0)) {
    return x;
  } else {
    return $$String.map((function (x) {
                  if (x !== 47) {
                    return x;
                  } else {
                    return /* '\\' */92;
                  }
                }), x);
  }
}

function replace_backward_slash(x) {
  let len = x.length;
  if (unsafe_no_char(x, /* '\\' */92, 0, len - 1 | 0)) {
    return x;
  } else {
    return $$String.map((function (x) {
                  if (x !== 92) {
                    return x;
                  } else {
                    return /* '/' */47;
                  }
                }), x);
  }
}

let check_suffix_case = ends_with;

let check_suffix_case_then_chop = ends_with_then_chop;

let empty = "";

let single_space = " ";

let single_colon = ":";

let parent_dir_lit = "..";

let current_dir_lit = ".";

exports.split_by = split_by;
exports.trim = trim;
exports.split = split;
exports.quick_split_by_ws = quick_split_by_ws;
exports.starts_with = starts_with;
exports.ends_with_index = ends_with_index;
exports.ends_with = ends_with;
exports.ends_with_then_chop = ends_with_then_chop;
exports.check_suffix_case = check_suffix_case;
exports.check_suffix_case_then_chop = check_suffix_case_then_chop;
exports.check_any_suffix_case = check_any_suffix_case;
exports.check_any_suffix_case_then_chop = check_any_suffix_case_then_chop;
exports.escaped = escaped;
exports.unsafe_for_all_range = unsafe_for_all_range;
exports.for_all_range = for_all_range;
exports.for_all = for_all;
exports.is_empty = is_empty;
exports.repeat = repeat;
exports.unsafe_is_sub = unsafe_is_sub;
exports.Local_exit = Local_exit;
exports.find = find;
exports.contain_substring = contain_substring;
exports.non_overlap_count = non_overlap_count;
exports.rfind = rfind;
exports.tail_from = tail_from;
exports.digits_of_str = digits_of_str;
exports.starts_with_and_number = starts_with_and_number;
exports.equal = equal;
exports.rindex_rec = rindex_rec;
exports.rindex_rec_opt = rindex_rec_opt;
exports.rindex_neg = rindex_neg;
exports.rindex_opt = rindex_opt;
exports.is_valid_module_file = is_valid_module_file;
exports.is_valid_npm_package_name = is_valid_npm_package_name;
exports.is_valid_source_name = is_valid_source_name;
exports.unsafe_no_char = unsafe_no_char;
exports.unsafe_no_char_idx = unsafe_no_char_idx;
exports.no_char = no_char;
exports.no_slash = no_slash;
exports.no_slash_idx = no_slash_idx;
exports.replace_slash_backward = replace_slash_backward;
exports.replace_backward_slash = replace_backward_slash;
exports.empty = empty;
exports.single_space = single_space;
exports.single_colon = single_colon;
exports.parent_dir_lit = parent_dir_lit;
exports.current_dir_lit = current_dir_lit;
/* Ext_bytes_test Not a pure module */
