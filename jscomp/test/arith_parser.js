'use strict';

let Parsing = require("../../lib/js/parsing.js");

let yytransl_const = [
  259,
  260,
  261,
  262,
  263,
  264,
  265,
  0,
  0
];

let yytransl_block = [
  257,
  258,
  0
];

let yylhs = "\xff\xff\x01\0\x02\0\x02\0\x02\0\x02\0\x02\0\x02\0\x02\0\x02\0\0\0";

let yylen = "\x02\0\x02\0\x01\0\x01\0\x03\0\x03\0\x03\0\x03\0\x02\0\x03\0\x02\0";

let yydefred = "\0\0\0\0\0\0\x02\0\x03\0\0\0\0\0\n\0\0\0\b\0\0\0\0\0\0\0\0\0\0\0\x01\0\t\0\0\0\0\0\x06\0\x07\0";

let yydgoto = "\x02\0\x07\0\b\0";

let yysindex = "\xff\xff\x10\xff\0\0\0\0\0\0\x10\xff\x10\xff\0\0\n\0\0\0\x16\xff\x10\xff\x10\xff\x10\xff\x10\xff\0\0\0\0\xff\xfe\xff\xfe\0\0\0\0";

let yyrindex = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x01\0\x03\0\0\0\0\0";

let yygindex = "\0\0\0\0\x02\0";

let yytable = "\x01\0\x04\0\0\0\x05\0\r\0\x0e\0\0\0\t\0\n\0\0\0\x0f\0\0\0\0\0\x11\0\x12\0\x13\0\x14\0\x03\0\x04\0\0\0\x05\0\0\0\0\0\0\0\x06\0\x0b\0\f\0\r\0\x0e\0\0\0\0\0\x10\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x04\0\x04\0\x05\0\x05\0\0\0\0\0\x04\0\0\0\x05\0\x0b\0\f\0\r\0\x0e\0";

let yycheck = "\x01\0\0\0\xff\xff\0\0\x05\x01\x06\x01\xff\xff\x05\0\x06\0\xff\xff\0\0\xff\xff\xff\xff\x0b\0\f\0\r\0\x0e\0\x01\x01\x02\x01\xff\xff\x04\x01\xff\xff\xff\xff\xff\xff\b\x01\x03\x01\x04\x01\x05\x01\x06\x01\xff\xff\xff\xff\t\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x03\x01\x04\x01\x03\x01\x04\x01\xff\xff\xff\xff\t\x01\xff\xff\t\x01\x03\x01\x04\x01\x05\x01\x06\x01";

let yynames_const = "PLUS\0MINUS\0TIMES\0DIVIDE\0UMINUS\0LPAREN\0RPAREN\0EOF\0";

let yynames_block = "NUMERAL\0IDENT\0";

let yyact = [
  (function (param) {
      throw {
            RE_EXN_ID: "Failure",
            _1: "parser",
            Error: new Error()
          };
    }),
  (function (__caml_parser_env) {
      return Parsing.peek_val(__caml_parser_env, 1);
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Numeral",
              _0: _1
            };
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Variable",
              _0: _1
            };
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 2);
      let _3 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Plus",
              _0: _1,
              _1: _3
            };
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 2);
      let _3 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Minus",
              _0: _1,
              _1: _3
            };
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 2);
      let _3 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Times",
              _0: _1,
              _1: _3
            };
    }),
  (function (__caml_parser_env) {
      let _1 = Parsing.peek_val(__caml_parser_env, 2);
      let _3 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Divide",
              _0: _1,
              _1: _3
            };
    }),
  (function (__caml_parser_env) {
      let _2 = Parsing.peek_val(__caml_parser_env, 0);
      return {
              TAG: "Negate",
              _0: _2
            };
    }),
  (function (__caml_parser_env) {
      return Parsing.peek_val(__caml_parser_env, 1);
    }),
  (function (__caml_parser_env) {
      throw {
            RE_EXN_ID: Parsing.YYexit,
            _1: Parsing.peek_val(__caml_parser_env, 0),
            Error: new Error()
          };
    })
];

let yytables = {
  actions: yyact,
  transl_const: yytransl_const,
  transl_block: yytransl_block,
  lhs: yylhs,
  len: yylen,
  defred: yydefred,
  dgoto: yydgoto,
  sindex: yysindex,
  rindex: yyrindex,
  gindex: yygindex,
  tablesize: 272,
  table: yytable,
  check: yycheck,
  error_function: Parsing.parse_error,
  names_const: yynames_const,
  names_block: yynames_block
};

function toplevel(lexfun, lexbuf) {
  return Parsing.yyparse(yytables, 1, lexfun, lexbuf);
}

let yytablesize = 272;

exports.yytransl_const = yytransl_const;
exports.yytransl_block = yytransl_block;
exports.yylhs = yylhs;
exports.yylen = yylen;
exports.yydefred = yydefred;
exports.yydgoto = yydgoto;
exports.yysindex = yysindex;
exports.yyrindex = yyrindex;
exports.yygindex = yygindex;
exports.yytablesize = yytablesize;
exports.yytable = yytable;
exports.yycheck = yycheck;
exports.yynames_const = yynames_const;
exports.yynames_block = yynames_block;
exports.yyact = yyact;
exports.yytables = yytables;
exports.toplevel = toplevel;
/* No side effect */
