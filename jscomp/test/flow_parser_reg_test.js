'use strict';

let Mt = require("./mt.js");
let Fs = require("fs");
let Sys = require("../../lib/js/sys.js");
let Caml = require("../../lib/js/caml.js");
let Char = require("../../lib/js/char.js");
let List = require("../../lib/js/list.js");
let Path = require("path");
let $$Array = require("../../lib/js/array.js");
let Curry = require("../../lib/js/curry.js");
let Queue = require("../../lib/js/queue.js");
let $$Buffer = require("../../lib/js/buffer.js");
let Lexing = require("../../lib/js/lexing.js");
let $$String = require("../../lib/js/string.js");
let Hashtbl = require("../../lib/js/hashtbl.js");
let Caml_obj = require("../../lib/js/caml_obj.js");
let Filename = require("../../lib/js/filename.js");
let Belt_List = require("../../lib/js/belt_List.js");
let Caml_array = require("../../lib/js/caml_array.js");
let Caml_bytes = require("../../lib/js/caml_bytes.js");
let Pervasives = require("../../lib/js/pervasives.js");
let Caml_format = require("../../lib/js/caml_format.js");
let Caml_module = require("../../lib/js/caml_module.js");
let Caml_option = require("../../lib/js/caml_option.js");
let Caml_exceptions = require("../../lib/js/caml_exceptions.js");
let Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

let none = {
  source: undefined,
  start: {
    line: 0,
    column: 0,
    offset: 0
  },
  _end: {
    line: 0,
    column: 0,
    offset: 0
  }
};

function from_lb_p(source, start, _end) {
  return {
          source: source,
          start: {
            line: start.pos_lnum,
            column: start.pos_cnum - start.pos_bol | 0,
            offset: start.pos_cnum
          },
          _end: {
            line: _end.pos_lnum,
            column: Caml.int_max(0, _end.pos_cnum - _end.pos_bol | 0),
            offset: _end.pos_cnum
          }
        };
}

function from_lb(source, lb) {
  let start = lb.lex_start_p;
  let _end = lb.lex_curr_p;
  return from_lb_p(source, start, _end);
}

function from_curr_lb(source, lb) {
  let curr = lb.lex_curr_p;
  return from_lb_p(source, curr, curr);
}

function btwn(loc1, loc2) {
  return {
          source: loc1.source,
          start: loc1.start,
          _end: loc2._end
        };
}

function btwn_exclusive(loc1, loc2) {
  return {
          source: loc1.source,
          start: loc1._end,
          _end: loc2.start
        };
}

function string_of_filename(param) {
  if (typeof param !== "object") {
    return "(global)";
  } else {
    return param._0;
  }
}

function order_of_filename(param) {
  if (typeof param !== "object") {
    return 1;
  }
  switch (param.TAG) {
    case "LibFile" :
        return 2;
    case "SourceFile" :
    case "JsonFile" :
        return 3;
    
  }
}

function source_cmp(a, b) {
  if (a === undefined) {
    if (b !== undefined) {
      return 1;
    } else {
      return 0;
    }
  }
  if (b === undefined) {
    return -1;
  }
  let k = order_of_filename(a) - order_of_filename(b) | 0;
  if (k !== 0) {
    return k;
  } else {
    return Caml.string_compare(string_of_filename(a), string_of_filename(b));
  }
}

function pos_cmp(a, b) {
  return Caml_obj.compare([
              a.line,
              a.column
            ], [
              b.line,
              b.column
            ]);
}

function compare(loc1, loc2) {
  let k = source_cmp(loc1.source, loc2.source);
  if (k !== 0) {
    return k;
  }
  let k$1 = pos_cmp(loc1.start, loc2.start);
  if (k$1 === 0) {
    return pos_cmp(loc1._end, loc2._end);
  } else {
    return k$1;
  }
}

let $$Error = /* @__PURE__ */Caml_exceptions.create("Flow_parser_reg_test.Parse_error.Error");

let Literal = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      44,
      6
    ], {
      TAG: "Module",
      _0: [[
          {
            TAG: "Module",
            _0: []
          },
          "RegExp"
        ]]
    });

let Type = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      191,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Param"
              ]]
          },
          "Function"
        ],
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Indexer"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "CallProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Identifier"
              ]]
          },
          "Generic"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "StringLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "NumberLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "BooleanLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: [[
                      {
                        TAG: "Module",
                        _0: []
                      },
                      "Variance"
                    ]]
                },
                "TypeParam"
              ]]
          },
          "ParameterDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ParameterInstantiation"
        ]
      ]
    });

let Statement = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      493,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Block"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "If"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Labeled"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Break"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Continue"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "With"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TypeAlias"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Case"
              ]]
          },
          "Switch"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Return"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Throw"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "CatchClause"
              ]]
          },
          "Try"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Declarator"
              ]]
          },
          "VariableDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "While"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DoWhile"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "For"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ForIn"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ForOf"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Let"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Interface"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareVariable"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareFunction"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareModule"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Specifier"
              ]]
          },
          "ExportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareExportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "NamedSpecifier"
              ]]
          },
          "ImportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Expression"
        ]
      ]
    });

let Expression = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      758,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "SpreadElement"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Array"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Element"
              ]]
          },
          "TemplateLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TaggedTemplate"
        ],
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Sequence"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Unary"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Binary"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Assignment"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Update"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Logical"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Conditional"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "New"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Call"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Member"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Yield"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Block"
              ]]
          },
          "Comprehension"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Generator"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Let"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TypeCast"
        ]
      ]
    });

let JSX = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      861,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Identifier"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "NamespacedName"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ExpressionContainer"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Text"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Attribute"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "SpreadAttribute"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "MemberExpression"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Opening"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Closing"
        ]
      ]
    });

let Pattern = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      919,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadElement"
              ]]
          },
          "Array"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Assignment"
        ]
      ]
    });

let Class = Caml_module.init_mod([
      "spider_monkey_ast.ml",
      978,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Method"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Property"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Implements"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Body"
        ]
      ]
    });

Caml_module.update_mod({
      TAG: "Module",
      _0: [[
          {
            TAG: "Module",
            _0: []
          },
          "RegExp"
        ]]
    }, Literal, Literal);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Param"
              ]]
          },
          "Function"
        ],
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Indexer"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "CallProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Identifier"
              ]]
          },
          "Generic"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "StringLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "NumberLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "BooleanLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: [[
                      {
                        TAG: "Module",
                        _0: []
                      },
                      "Variance"
                    ]]
                },
                "TypeParam"
              ]]
          },
          "ParameterDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ParameterInstantiation"
        ]
      ]
    }, Type, Type);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Block"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "If"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Labeled"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Break"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Continue"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "With"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TypeAlias"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Case"
              ]]
          },
          "Switch"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Return"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Throw"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "CatchClause"
              ]]
          },
          "Try"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Declarator"
              ]]
          },
          "VariableDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "While"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DoWhile"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "For"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ForIn"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ForOf"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Let"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Interface"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareVariable"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareFunction"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareModule"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Specifier"
              ]]
          },
          "ExportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "DeclareExportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "NamedSpecifier"
              ]]
          },
          "ImportDeclaration"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Expression"
        ]
      ]
    }, Statement, Statement);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "SpreadElement"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Array"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Element"
              ]]
          },
          "TemplateLiteral"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TaggedTemplate"
        ],
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Sequence"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Unary"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Binary"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Assignment"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Update"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Logical"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Conditional"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "New"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Call"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Member"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Yield"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "Block"
              ]]
          },
          "Comprehension"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Generator"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Let"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "TypeCast"
        ]
      ]
    }, Expression, Expression);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Identifier"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "NamespacedName"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "ExpressionContainer"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Text"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Attribute"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "SpreadAttribute"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "MemberExpression"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Opening"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Closing"
        ]
      ]
    }, JSX, JSX);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: [
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "Property"
              ],
              [
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadProperty"
              ]
            ]
          },
          "Object"
        ],
        [
          {
            TAG: "Module",
            _0: [[
                {
                  TAG: "Module",
                  _0: []
                },
                "SpreadElement"
              ]]
          },
          "Array"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Assignment"
        ]
      ]
    }, Pattern, Pattern);

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          {
            TAG: "Module",
            _0: []
          },
          "Method"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Property"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Implements"
        ],
        [
          {
            TAG: "Module",
            _0: []
          },
          "Body"
        ]
      ]
    }, Class, Class);

function token_to_string(param) {
  if (typeof param !== "object") {
    switch (param) {
      case "T_IDENTIFIER" :
          return "T_IDENTIFIER";
      case "T_LCURLY" :
          return "T_LCURLY";
      case "T_RCURLY" :
          return "T_RCURLY";
      case "T_LPAREN" :
          return "T_LPAREN";
      case "T_RPAREN" :
          return "T_RPAREN";
      case "T_LBRACKET" :
          return "T_LBRACKET";
      case "T_RBRACKET" :
          return "T_RBRACKET";
      case "T_SEMICOLON" :
          return "T_SEMICOLON";
      case "T_COMMA" :
          return "T_COMMA";
      case "T_PERIOD" :
          return "T_PERIOD";
      case "T_ARROW" :
          return "T_ARROW";
      case "T_ELLIPSIS" :
          return "T_ELLIPSIS";
      case "T_AT" :
          return "T_AT";
      case "T_FUNCTION" :
          return "T_FUNCTION";
      case "T_IF" :
          return "T_IF";
      case "T_IN" :
          return "T_IN";
      case "T_INSTANCEOF" :
          return "T_INSTANCEOF";
      case "T_RETURN" :
          return "T_RETURN";
      case "T_SWITCH" :
          return "T_SWITCH";
      case "T_THIS" :
          return "T_THIS";
      case "T_THROW" :
          return "T_THROW";
      case "T_TRY" :
          return "T_TRY";
      case "T_VAR" :
          return "T_VAR";
      case "T_WHILE" :
          return "T_WHILE";
      case "T_WITH" :
          return "T_WITH";
      case "T_CONST" :
          return "T_CONST";
      case "T_LET" :
          return "T_LET";
      case "T_NULL" :
          return "T_NULL";
      case "T_FALSE" :
          return "T_FALSE";
      case "T_TRUE" :
          return "T_TRUE";
      case "T_BREAK" :
          return "T_BREAK";
      case "T_CASE" :
          return "T_CASE";
      case "T_CATCH" :
          return "T_CATCH";
      case "T_CONTINUE" :
          return "T_CONTINUE";
      case "T_DEFAULT" :
          return "T_DEFAULT";
      case "T_DO" :
          return "T_DO";
      case "T_FINALLY" :
          return "T_FINALLY";
      case "T_FOR" :
          return "T_FOR";
      case "T_CLASS" :
          return "T_CLASS";
      case "T_EXTENDS" :
          return "T_EXTENDS";
      case "T_STATIC" :
          return "T_STATIC";
      case "T_ELSE" :
          return "T_ELSE";
      case "T_NEW" :
          return "T_NEW";
      case "T_DELETE" :
          return "T_DELETE";
      case "T_TYPEOF" :
          return "T_TYPEOF";
      case "T_VOID" :
          return "T_VOID";
      case "T_ENUM" :
          return "T_ENUM";
      case "T_EXPORT" :
          return "T_EXPORT";
      case "T_IMPORT" :
          return "T_IMPORT";
      case "T_SUPER" :
          return "T_SUPER";
      case "T_IMPLEMENTS" :
          return "T_IMPLEMENTS";
      case "T_INTERFACE" :
          return "T_INTERFACE";
      case "T_PACKAGE" :
          return "T_PACKAGE";
      case "T_PRIVATE" :
          return "T_PRIVATE";
      case "T_PROTECTED" :
          return "T_PROTECTED";
      case "T_PUBLIC" :
          return "T_PUBLIC";
      case "T_YIELD" :
          return "T_YIELD";
      case "T_DEBUGGER" :
          return "T_DEBUGGER";
      case "T_DECLARE" :
          return "T_DECLARE";
      case "T_TYPE" :
          return "T_TYPE";
      case "T_OF" :
          return "T_OF";
      case "T_ASYNC" :
          return "T_ASYNC";
      case "T_AWAIT" :
          return "T_AWAIT";
      case "T_RSHIFT3_ASSIGN" :
          return "T_RSHIFT3_ASSIGN";
      case "T_RSHIFT_ASSIGN" :
          return "T_RSHIFT_ASSIGN";
      case "T_LSHIFT_ASSIGN" :
          return "T_LSHIFT_ASSIGN";
      case "T_BIT_XOR_ASSIGN" :
          return "T_BIT_XOR_ASSIGN";
      case "T_BIT_OR_ASSIGN" :
          return "T_BIT_OR_ASSIGN";
      case "T_BIT_AND_ASSIGN" :
          return "T_BIT_AND_ASSIGN";
      case "T_MOD_ASSIGN" :
          return "T_MOD_ASSIGN";
      case "T_DIV_ASSIGN" :
          return "T_DIV_ASSIGN";
      case "T_MULT_ASSIGN" :
          return "T_MULT_ASSIGN";
      case "T_EXP_ASSIGN" :
          return "T_EXP_ASSIGN";
      case "T_MINUS_ASSIGN" :
          return "T_MINUS_ASSIGN";
      case "T_PLUS_ASSIGN" :
          return "T_PLUS_ASSIGN";
      case "T_ASSIGN" :
          return "T_ASSIGN";
      case "T_PLING" :
          return "T_PLING";
      case "T_COLON" :
          return "T_COLON";
      case "T_OR" :
          return "T_OR";
      case "T_AND" :
          return "T_AND";
      case "T_BIT_OR" :
          return "T_BIT_OR";
      case "T_BIT_XOR" :
          return "T_BIT_XOR";
      case "T_BIT_AND" :
          return "T_BIT_AND";
      case "T_EQUAL" :
          return "T_EQUAL";
      case "T_NOT_EQUAL" :
          return "T_NOT_EQUAL";
      case "T_STRICT_EQUAL" :
          return "T_STRICT_EQUAL";
      case "T_STRICT_NOT_EQUAL" :
          return "T_STRICT_NOT_EQUAL";
      case "T_LESS_THAN_EQUAL" :
          return "T_LESS_THAN_EQUAL";
      case "T_GREATER_THAN_EQUAL" :
          return "T_GREATER_THAN_EQUAL";
      case "T_LESS_THAN" :
          return "T_LESS_THAN";
      case "T_GREATER_THAN" :
          return "T_GREATER_THAN";
      case "T_LSHIFT" :
          return "T_LSHIFT";
      case "T_RSHIFT" :
          return "T_RSHIFT";
      case "T_RSHIFT3" :
          return "T_RSHIFT3";
      case "T_PLUS" :
          return "T_PLUS";
      case "T_MINUS" :
          return "T_MINUS";
      case "T_DIV" :
          return "T_DIV";
      case "T_MULT" :
          return "T_MULT";
      case "T_EXP" :
          return "T_EXP";
      case "T_MOD" :
          return "T_MOD";
      case "T_NOT" :
          return "T_NOT";
      case "T_BIT_NOT" :
          return "T_BIT_NOT";
      case "T_INCR" :
          return "T_INCR";
      case "T_DECR" :
          return "T_DECR";
      case "T_ERROR" :
          return "T_ERROR";
      case "T_EOF" :
          return "T_EOF";
      case "T_JSX_IDENTIFIER" :
          return "T_JSX_IDENTIFIER";
      case "T_ANY_TYPE" :
          return "T_ANY_TYPE";
      case "T_BOOLEAN_TYPE" :
          return "T_BOOLEAN_TYPE";
      case "T_NUMBER_TYPE" :
          return "T_NUMBER_TYPE";
      case "T_STRING_TYPE" :
          return "T_STRING_TYPE";
      case "T_VOID_TYPE" :
          return "T_VOID_TYPE";
      
    }
  } else {
    switch (param.TAG) {
      case "T_NUMBER" :
          return "T_NUMBER";
      case "T_STRING" :
          return "T_STRING";
      case "T_TEMPLATE_PART" :
          return "T_TEMPLATE_PART";
      case "T_REGEXP" :
          return "T_REGEXP";
      case "T_JSX_TEXT" :
          return "T_JSX_TEXT";
      case "T_NUMBER_SINGLETON_TYPE" :
          return "T_NUMBER_SINGLETON_TYPE";
      
    }
  }
}

function yyback(n, lexbuf) {
  lexbuf.lex_curr_pos = lexbuf.lex_curr_pos - n | 0;
  let currp = lexbuf.lex_curr_p;
  lexbuf.lex_curr_p = {
    pos_fname: currp.pos_fname,
    pos_lnum: currp.pos_lnum,
    pos_bol: currp.pos_bol,
    pos_cnum: currp.pos_cnum - n | 0
  };
}

function back(lb) {
  let n = lb.lex_curr_p.pos_cnum - lb.lex_start_p.pos_cnum | 0;
  yyback(n, lb);
}

let empty_lex_state = {
  lex_errors_acc: /* [] */0,
  lex_comments_acc: /* [] */0
};

function new_lex_env(lex_source, lex_lb, enable_types_in_comments) {
  return {
          lex_source: lex_source,
          lex_lb: lex_lb,
          lex_in_comment_syntax: false,
          lex_enable_comment_syntax: enable_types_in_comments,
          lex_state: empty_lex_state
        };
}

function get_and_clear_state(env) {
  let state = env.lex_state;
  let env$1 = state !== empty_lex_state ? ({
        lex_source: env.lex_source,
        lex_lb: env.lex_lb,
        lex_in_comment_syntax: env.lex_in_comment_syntax,
        lex_enable_comment_syntax: env.lex_enable_comment_syntax,
        lex_state: empty_lex_state
      }) : env;
  return [
          env$1,
          state
        ];
}

function with_lexbuf(lexbuf, env) {
  return {
          lex_source: env.lex_source,
          lex_lb: lexbuf,
          lex_in_comment_syntax: env.lex_in_comment_syntax,
          lex_enable_comment_syntax: env.lex_enable_comment_syntax,
          lex_state: env.lex_state
        };
}

function in_comment_syntax(is_in, env) {
  if (is_in !== env.lex_in_comment_syntax) {
    return {
            lex_source: env.lex_source,
            lex_lb: env.lex_lb,
            lex_in_comment_syntax: is_in,
            lex_enable_comment_syntax: env.lex_enable_comment_syntax,
            lex_state: env.lex_state
          };
  } else {
    return env;
  }
}

function get_result_and_clear_state(param) {
  let lex_token = param[1];
  let match = get_and_clear_state(param[0]);
  let state = match[1];
  let env = match[0];
  let match$1;
  let exit = 0;
  if (typeof lex_token !== "object") {
    exit = 2;
  } else {
    switch (lex_token.TAG) {
      case "T_TEMPLATE_PART" :
          let match$2 = lex_token._0;
          match$1 = [
            match$2[0],
            match$2[1].literal
          ];
          break;
      case "T_REGEXP" :
          let match$3 = lex_token._0;
          match$1 = [
            match$3[0],
            "/" + (match$3[1] + ("/" + match$3[2]))
          ];
          break;
      case "T_STRING" :
      case "T_JSX_TEXT" :
          exit = 1;
          break;
      default:
        exit = 2;
    }
  }
  switch (exit) {
    case 1 :
        let match$4 = lex_token._0;
        match$1 = [
          match$4[0],
          match$4[2]
        ];
        break;
    case 2 :
        match$1 = [
          from_lb(env.lex_source, env.lex_lb),
          Lexing.lexeme(env.lex_lb)
        ];
        break;
    
  }
  return [
          env,
          {
            lex_token: lex_token,
            lex_loc: match$1[0],
            lex_value: match$1[1],
            lex_errors: List.rev(state.lex_errors_acc),
            lex_comments: List.rev(state.lex_comments_acc)
          }
        ];
}

function lex_error(env, loc, err) {
  let lex_errors_acc_0 = [
    loc,
    err
  ];
  let lex_errors_acc_1 = env.lex_state.lex_errors_acc;
  let lex_errors_acc = {
    hd: lex_errors_acc_0,
    tl: lex_errors_acc_1
  };
  let init = env.lex_state;
  return {
          lex_source: env.lex_source,
          lex_lb: env.lex_lb,
          lex_in_comment_syntax: env.lex_in_comment_syntax,
          lex_enable_comment_syntax: env.lex_enable_comment_syntax,
          lex_state: {
            lex_errors_acc: lex_errors_acc,
            lex_comments_acc: init.lex_comments_acc
          }
        };
}

function unexpected_error(env, loc, value) {
  return lex_error(env, loc, {
              TAG: "UnexpectedToken",
              _0: value
            });
}

function unexpected_error_w_suggest(env, loc, value, suggest) {
  return lex_error(env, loc, {
              TAG: "UnexpectedTokenWithSuggestion",
              _0: value,
              _1: suggest
            });
}

function illegal_number(env, lexbuf, word, token) {
  let loc = from_lb(env.lex_source, lexbuf);
  yyback(word.length, lexbuf);
  let env$1 = lex_error(env, loc, {
        TAG: "UnexpectedToken",
        _0: "ILLEGAL"
      });
  return [
          env$1,
          token
        ];
}

let No_good = /* @__PURE__ */Caml_exceptions.create("Flow_parser_reg_test.Lexer_flow.FloatOfString.No_good");

function eat(f) {
  let match = f.todo;
  if (match) {
    return {
            negative: f.negative,
            mantissa: f.mantissa,
            exponent: f.exponent,
            decimal_exponent: f.decimal_exponent,
            todo: match.tl
          };
  }
  throw {
        RE_EXN_ID: No_good,
        Error: new Error()
      };
}

function start(str) {
  let todo = {
    contents: /* [] */0
  };
  $$String.iter((function (c) {
          todo.contents = {
            hd: c,
            tl: todo.contents
          };
        }), str);
  return {
          negative: false,
          mantissa: 0,
          exponent: 0,
          decimal_exponent: undefined,
          todo: List.rev(todo.contents)
        };
}

function parse_sign(f) {
  let match = f.todo;
  if (!match) {
    return f;
  }
  switch (match.hd) {
    case 43 :
        return eat(f);
    case 44 :
        return f;
    case 45 :
        let init = eat(f);
        return {
                negative: true,
                mantissa: init.mantissa,
                exponent: init.exponent,
                decimal_exponent: init.decimal_exponent,
                todo: init.todo
              };
    default:
      return f;
  }
}

function parse_hex_symbol(f) {
  let match = f.todo;
  if (match) {
    if (match.hd !== 48) {
      throw {
            RE_EXN_ID: No_good,
            Error: new Error()
          };
    }
    let match$1 = match.tl;
    if (match$1) {
      let match$2 = match$1.hd;
      if (match$2 === 88) {
        return eat(eat(f));
      }
      if (match$2 !== 120) {
        throw {
              RE_EXN_ID: No_good,
              Error: new Error()
            };
      }
      return eat(eat(f));
    }
    throw {
          RE_EXN_ID: No_good,
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: No_good,
        Error: new Error()
      };
}

function parse_exponent(f) {
  let xs = List.map(Char.escaped, f.todo);
  let todo_str = Belt_List.toArray(xs).join("");
  let exponent;
  try {
    exponent = Caml_format.int_of_string(todo_str);
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Failure") {
      throw {
            RE_EXN_ID: No_good,
            Error: new Error()
          };
    }
    throw exn;
  }
  return {
          negative: f.negative,
          mantissa: f.mantissa,
          exponent: exponent,
          decimal_exponent: f.decimal_exponent,
          todo: /* [] */0
        };
}

function parse_body(_f) {
  while(true) {
    let f = _f;
    let match = f.todo;
    if (!match) {
      return f;
    }
    let c = match.hd;
    if (c >= 81) {
      if (c !== 95) {
        if (c === 112) {
          return parse_exponent(eat(f));
        }
        
      } else {
        _f = eat(f);
        continue ;
      }
    } else if (c !== 46) {
      if (c >= 80) {
        return parse_exponent(eat(f));
      }
      
    } else {
      if (f.decimal_exponent === undefined) {
        let init = eat(f);
        _f = {
          negative: init.negative,
          mantissa: init.mantissa,
          exponent: init.exponent,
          decimal_exponent: 0,
          todo: init.todo
        };
        continue ;
      }
      throw {
            RE_EXN_ID: No_good,
            Error: new Error()
          };
    }
    let ref_char_code;
    if (c >= /* '0' */48 && c <= /* '9' */57) {
      ref_char_code = /* '0' */48;
    } else if (c >= /* 'A' */65 && c <= /* 'F' */70) {
      ref_char_code = 55;
    } else if (c >= /* 'a' */97 && c <= /* 'f' */102) {
      ref_char_code = 87;
    } else {
      throw {
            RE_EXN_ID: No_good,
            Error: new Error()
          };
    }
    let value = c - ref_char_code | 0;
    let e = f.decimal_exponent;
    let decimal_exponent = e !== undefined ? e - 4 | 0 : undefined;
    let mantissa = (f.mantissa << 4) + value | 0;
    let init$1 = eat(f);
    _f = {
      negative: init$1.negative,
      mantissa: mantissa,
      exponent: init$1.exponent,
      decimal_exponent: decimal_exponent,
      todo: init$1.todo
    };
    continue ;
  };
}

function float_of_string(str) {
  try {
    return Caml_format.float_of_string(str);
  }
  catch (e){
    if (Sys.win32) {
      try {
        let f = parse_body(parse_hex_symbol(parse_sign(start(str))));
        if (f.todo !== /* [] */0) {
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "lexer_flow.mll",
                  546,
                  4
                ],
                Error: new Error()
              };
        }
        let ret = f.mantissa;
        let decimal_exponent = f.decimal_exponent;
        let exponent = decimal_exponent !== undefined ? f.exponent + decimal_exponent | 0 : f.exponent;
        let ret$1 = exponent === 0 ? ret : Math.pow(ret, exponent);
        if (f.negative) {
          return - ret$1;
        } else {
          return ret$1;
        }
      }
      catch (raw_exn){
        let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === No_good) {
          throw e;
        }
        throw exn;
      }
    } else {
      throw e;
    }
  }
}

function save_comment(env, start, _end, buf, multiline) {
  let loc = btwn(start, _end);
  let s = $$Buffer.contents(buf);
  let c = multiline ? ({
        TAG: "Block",
        _0: s
      }) : ({
        TAG: "Line",
        _0: s
      });
  let lex_comments_acc_0 = [
    loc,
    c
  ];
  let lex_comments_acc_1 = env.lex_state.lex_comments_acc;
  let lex_comments_acc = {
    hd: lex_comments_acc_0,
    tl: lex_comments_acc_1
  };
  let init = env.lex_state;
  return {
          lex_source: env.lex_source,
          lex_lb: env.lex_lb,
          lex_in_comment_syntax: env.lex_in_comment_syntax,
          lex_enable_comment_syntax: env.lex_enable_comment_syntax,
          lex_state: {
            lex_errors_acc: init.lex_errors_acc,
            lex_comments_acc: lex_comments_acc
          }
        };
}

function unicode_fix_cols(lb) {
  let count = function (_start, stop, _acc) {
    while(true) {
      let acc = _acc;
      let start = _start;
      if (start === stop) {
        return acc;
      }
      let c = Caml_bytes.get(lb.lex_buffer, start);
      let acc$1 = (c & 192) === 128 ? acc + 1 | 0 : acc;
      _acc = acc$1;
      _start = start + 1 | 0;
      continue ;
    };
  };
  let bytes = count(lb.lex_start_pos, lb.lex_curr_pos, 0);
  let new_bol = lb.lex_curr_p.pos_bol + bytes | 0;
  let init = lb.lex_curr_p;
  lb.lex_curr_p = {
    pos_fname: init.pos_fname,
    pos_lnum: init.pos_lnum,
    pos_bol: new_bol,
    pos_cnum: init.pos_cnum
  };
}

function oct_to_int(x) {
  if (x > 55 || x < 48) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "lexer_flow.mll",
            604,
            11
          ],
          Error: new Error()
        };
  }
  return x - /* '0' */48 | 0;
}

function hexa_to_int(x) {
  if (x >= 65) {
    if (x >= 97) {
      if (x < 103) {
        return (x - /* 'a' */97 | 0) + 10 | 0;
      }
      
    } else if (x < 71) {
      return (x - /* 'A' */65 | 0) + 10 | 0;
    }
    
  } else if (!(x > 57 || x < 48)) {
    return x - /* '0' */48 | 0;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "lexer_flow.mll",
          610,
          11
        ],
        Error: new Error()
      };
}

function utf16to8(code) {
  if (code >= 65536) {
    return {
            hd: Char.chr(240 | (code >>> 18)),
            tl: {
              hd: Char.chr(128 | (code >>> 12) & 63),
              tl: {
                hd: Char.chr(128 | (code >>> 6) & 63),
                tl: {
                  hd: Char.chr(128 | code & 63),
                  tl: /* [] */0
                }
              }
            }
          };
  } else if (code >= 2048) {
    return {
            hd: Char.chr(224 | (code >>> 12)),
            tl: {
              hd: Char.chr(128 | (code >>> 6) & 63),
              tl: {
                hd: Char.chr(128 | code & 63),
                tl: /* [] */0
              }
            }
          };
  } else if (code >= 128) {
    return {
            hd: Char.chr(192 | (code >>> 6)),
            tl: {
              hd: Char.chr(128 | code & 63),
              tl: /* [] */0
            }
          };
  } else {
    return {
            hd: Char.chr(code),
            tl: /* [] */0
          };
  }
}

function mk_num_singleton(number_type, num, neg) {
  let value;
  switch (number_type) {
    case "LEGACY_OCTAL" :
        value = Caml_format.int_of_string("0o" + num);
        break;
    case "BINARY" :
    case "OCTAL" :
        value = Caml_format.int_of_string(num);
        break;
    case "NORMAL" :
        value = float_of_string(num);
        break;
    
  }
  let value$1 = neg === "" ? value : - value;
  return {
          TAG: "T_NUMBER_SINGLETON_TYPE",
          _0: number_type,
          _1: value$1
        };
}

let keywords = Hashtbl.create(undefined, 53);

let type_keywords = Hashtbl.create(undefined, 53);

List.iter((function (param) {
        Hashtbl.add(keywords, param[0], param[1]);
      }), {
      hd: [
        "function",
        "T_FUNCTION"
      ],
      tl: {
        hd: [
          "if",
          "T_IF"
        ],
        tl: {
          hd: [
            "in",
            "T_IN"
          ],
          tl: {
            hd: [
              "instanceof",
              "T_INSTANCEOF"
            ],
            tl: {
              hd: [
                "return",
                "T_RETURN"
              ],
              tl: {
                hd: [
                  "switch",
                  "T_SWITCH"
                ],
                tl: {
                  hd: [
                    "this",
                    "T_THIS"
                  ],
                  tl: {
                    hd: [
                      "throw",
                      "T_THROW"
                    ],
                    tl: {
                      hd: [
                        "try",
                        "T_TRY"
                      ],
                      tl: {
                        hd: [
                          "var",
                          "T_VAR"
                        ],
                        tl: {
                          hd: [
                            "while",
                            "T_WHILE"
                          ],
                          tl: {
                            hd: [
                              "with",
                              "T_WITH"
                            ],
                            tl: {
                              hd: [
                                "const",
                                "T_CONST"
                              ],
                              tl: {
                                hd: [
                                  "let",
                                  "T_LET"
                                ],
                                tl: {
                                  hd: [
                                    "null",
                                    "T_NULL"
                                  ],
                                  tl: {
                                    hd: [
                                      "false",
                                      "T_FALSE"
                                    ],
                                    tl: {
                                      hd: [
                                        "true",
                                        "T_TRUE"
                                      ],
                                      tl: {
                                        hd: [
                                          "break",
                                          "T_BREAK"
                                        ],
                                        tl: {
                                          hd: [
                                            "case",
                                            "T_CASE"
                                          ],
                                          tl: {
                                            hd: [
                                              "catch",
                                              "T_CATCH"
                                            ],
                                            tl: {
                                              hd: [
                                                "continue",
                                                "T_CONTINUE"
                                              ],
                                              tl: {
                                                hd: [
                                                  "default",
                                                  "T_DEFAULT"
                                                ],
                                                tl: {
                                                  hd: [
                                                    "do",
                                                    "T_DO"
                                                  ],
                                                  tl: {
                                                    hd: [
                                                      "finally",
                                                      "T_FINALLY"
                                                    ],
                                                    tl: {
                                                      hd: [
                                                        "for",
                                                        "T_FOR"
                                                      ],
                                                      tl: {
                                                        hd: [
                                                          "class",
                                                          "T_CLASS"
                                                        ],
                                                        tl: {
                                                          hd: [
                                                            "extends",
                                                            "T_EXTENDS"
                                                          ],
                                                          tl: {
                                                            hd: [
                                                              "static",
                                                              "T_STATIC"
                                                            ],
                                                            tl: {
                                                              hd: [
                                                                "else",
                                                                "T_ELSE"
                                                              ],
                                                              tl: {
                                                                hd: [
                                                                  "new",
                                                                  "T_NEW"
                                                                ],
                                                                tl: {
                                                                  hd: [
                                                                    "delete",
                                                                    "T_DELETE"
                                                                  ],
                                                                  tl: {
                                                                    hd: [
                                                                      "typeof",
                                                                      "T_TYPEOF"
                                                                    ],
                                                                    tl: {
                                                                      hd: [
                                                                        "void",
                                                                        "T_VOID"
                                                                      ],
                                                                      tl: {
                                                                        hd: [
                                                                          "enum",
                                                                          "T_ENUM"
                                                                        ],
                                                                        tl: {
                                                                          hd: [
                                                                            "export",
                                                                            "T_EXPORT"
                                                                          ],
                                                                          tl: {
                                                                            hd: [
                                                                              "import",
                                                                              "T_IMPORT"
                                                                            ],
                                                                            tl: {
                                                                              hd: [
                                                                                "super",
                                                                                "T_SUPER"
                                                                              ],
                                                                              tl: {
                                                                                hd: [
                                                                                  "implements",
                                                                                  "T_IMPLEMENTS"
                                                                                ],
                                                                                tl: {
                                                                                  hd: [
                                                                                    "interface",
                                                                                    "T_INTERFACE"
                                                                                  ],
                                                                                  tl: {
                                                                                    hd: [
                                                                                      "package",
                                                                                      "T_PACKAGE"
                                                                                    ],
                                                                                    tl: {
                                                                                      hd: [
                                                                                        "private",
                                                                                        "T_PRIVATE"
                                                                                      ],
                                                                                      tl: {
                                                                                        hd: [
                                                                                          "protected",
                                                                                          "T_PROTECTED"
                                                                                        ],
                                                                                        tl: {
                                                                                          hd: [
                                                                                            "public",
                                                                                            "T_PUBLIC"
                                                                                          ],
                                                                                          tl: {
                                                                                            hd: [
                                                                                              "yield",
                                                                                              "T_YIELD"
                                                                                            ],
                                                                                            tl: {
                                                                                              hd: [
                                                                                                "debugger",
                                                                                                "T_DEBUGGER"
                                                                                              ],
                                                                                              tl: {
                                                                                                hd: [
                                                                                                  "declare",
                                                                                                  "T_DECLARE"
                                                                                                ],
                                                                                                tl: {
                                                                                                  hd: [
                                                                                                    "type",
                                                                                                    "T_TYPE"
                                                                                                  ],
                                                                                                  tl: {
                                                                                                    hd: [
                                                                                                      "of",
                                                                                                      "T_OF"
                                                                                                    ],
                                                                                                    tl: {
                                                                                                      hd: [
                                                                                                        "async",
                                                                                                        "T_ASYNC"
                                                                                                      ],
                                                                                                      tl: {
                                                                                                        hd: [
                                                                                                          "await",
                                                                                                          "T_AWAIT"
                                                                                                        ],
                                                                                                        tl: /* [] */0
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

List.iter((function (param) {
        Hashtbl.add(type_keywords, param[0], param[1]);
      }), {
      hd: [
        "static",
        "T_STATIC"
      ],
      tl: {
        hd: [
          "typeof",
          "T_TYPEOF"
        ],
        tl: {
          hd: [
            "any",
            "T_ANY_TYPE"
          ],
          tl: {
            hd: [
              "bool",
              "T_BOOLEAN_TYPE"
            ],
            tl: {
              hd: [
                "boolean",
                "T_BOOLEAN_TYPE"
              ],
              tl: {
                hd: [
                  "true",
                  "T_TRUE"
                ],
                tl: {
                  hd: [
                    "false",
                    "T_FALSE"
                  ],
                  tl: {
                    hd: [
                      "number",
                      "T_NUMBER_TYPE"
                    ],
                    tl: {
                      hd: [
                        "string",
                        "T_STRING_TYPE"
                      ],
                      tl: {
                        hd: [
                          "void",
                          "T_VOID_TYPE"
                        ],
                        tl: {
                          hd: [
                            "null",
                            "T_NULL"
                          ],
                          tl: /* [] */0
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

let __ocaml_lex_tables = {
  lex_base: "\0\0\xb2\xff\xb3\xff\xb9\xffB\0C\0T\0W\0F\0I\0J\0K\0M\0e\0\xdd\xff\xde\xff\xdf\xff\xe0\xff\xe3\xff\xe4\xff\xe5\xff\xe6\xff\xe7\xff\xe8\xff\xc0\0L\0e\0\x17\x01n\x01\xf6\xff\xf7\xffl\0u\0v\0\0\0\x0e\0\x0f\0\x07\x003\x01\xfe\xff\xff\xff\x01\0\x12\0(\0\f\0\x15\0*\0\f\0=\0-\0\t\0\xb6\xff\xf9\xff\xe0\x01B\0u\0\x0f\x000\x004\0\x17\0\xe5\x01(\x008\0\x1a\0K\0:\0\x17\0\xfb\xffh\0a\0\xac\0q\0m\0y\0q\0i\0{\0{\0\xa8\0\xca\xff\xfa\xff\xc9\xff\xf8\xff\x0b\x02\xa5\x02\xfc\x02S\x03\xaa\x03\x01\x04X\x04\xaf\x04\x06\x05]\x05\xb4\x05\x0b\x06b\x06\xb9\x06\xc3\x01\x10\x07g\x07\xbe\x07\x15\bl\b\xc3\b\x1a\tq\t\xc8\t\xb8\0\xe2\xffE\x02\xc7\xff\xdc\xff\xc6\xff\xdb\xff\xb7\xff\xaa\0\xda\xff\xab\0\xd9\xff\xac\0\xd8\xff\xd2\xff\xad\0\xd7\xff\xb0\0\xd0\xff\xcf\xff\xcc\xff\xd4\xff\xcb\xff\xd3\xff\xc8\xff\xc5\xff:\n\xcf\xff\xd0\xff\xd2\xff\xd6\xff\xd7\xff\xb0\0\xdc\xff\xdd\xff\xe0\xff\xe1\xff\xe2\xff\xe3\xff\xe6\xff\xe7\xff\xe8\xff\xe9\xff\xea\xff\xeb\xff\x94\n\xfa\n\xd6\x01Q\x0b\xa8\x0b\x1a\f\xf9\xff\xcc\0\xf1\0A\0}\0~\0\xa3\0\xc4\x0b\xff\xffa\0\x9d\0\xc1\0\xa4\0\x90\0\xc6\0\xb2\0\xcb\t\xd2\0\x95\0\xfa\xff\x1f\f\xe9\0\x1c\x01\x9c\0\xf2\0\xf3\0\xf9\0$\f\xe7\0\xf7\0\xf5\0\xdf\x0b\x15\x01\xd7\0\xfc\xff(\x01!\x01m\x012\x01/\x01E\x01=\x015\x01G\x01G\x01\xfb\xff\xf3\x01\xf2\0.\x01I\x01P\x01K\f=\x01L\x01/\x01\xec\x0bk\x010\x01x\f\xff\fV\r\xad\r\0\x02\x04\x0e[\x0e\xb2\x0e\t\x0f`\x0f\xb7\x0f\x0e\x10e\x10\xbc\x10\x13\x11j\x11\xc1\x11\x18\x12o\x12\xc6\x12\x1d\x13t\x13\xcb\x13\"\x14\xcf\x01\xe5\xffy\x14\xd0\x14'\x15~\x15\xd4\xff\x1b\f\xfc\xff\xfd\xff\xfe\xff\xff\xff\xcf\x15\xee\xff\x01\0\xef\xff\x18\x16\xf4\xff\xf5\xff\xf6\xff\xf7\xff\xf8\xff\xf9\xff\xf1\x02H\x03>\x16\xfe\xff\xff\xffU\x16\xfd\xff\x9f\x03\xfc\xff{\x16\x92\x16\xb8\x16\xcf\x16\xf2\xff\xf5\x16\xf1\xff\xd7\x02\xfb\xff\xd2\x01\xfe\xff\xff\xff\xcf\x01\xfd\xff\xfc\xff;\x02\xfd\xff\xfe\xff\xff\xff\0\x17\xf9\xff\xe8\x01G\x01\x83\x01\x90\x01y\x01)\fC\x15\xfe\xff\xff\xff]\x01\x9b\x01\x9c\x01*\x02\x90\x01\xa0\x01\x82\x01\x87\x15\xad\x01o\x01\xfb\xff\xfc\xff\x0b\x16\xf8\xff\x04\0\xf9\xff\xfa\xff8\x17,\x03\xff\xff\xfd\xff\x05\0\xfe\xff\xc0\x17\x96\t\xfb\xff\xfc\xff\xeb\x01\xff\xff\xfd\xff\xfe\xff2\x18\xf1\xff\xf2\xff\x8a\x18\xf4\xff\xf5\xff\xf6\xff\xf7\xff\xf8\xff\xfa\xff<\x02\x7f\x01\xc9\x01\xe7\x01+\x02\x88\x167\x18\xfe\xff\xff\xff\x8f\x01 \x02!\x023\x02\x15\x02%\x02!\x02\xbd\x16L\x02\x0f\x02\xfb\xff\xfc\xff|\f\xfb\xff\xfc\xff\xfd\xff\xfe\xff\x06\0\xff\xff\xfc\x18\xf9\xff\xf8\x18\x07\0\xfd\xff\xfe\xff\xff\xffO\x19\xdf\n_\f\x84\x17\x9c\x19\xfc\xff\xfb\xff\xd3\x19\xfa\xff*\x1a\x81\x1a\xd8\x1a/\x1b\x86\x1b\x96\x02\xf8\x1b\xfa\xff\xfb\xff\xb5\x02%\x02b\x02\x82\x02\xf3\x02\x04\x19K\x1b\xff\xff(\x02e\x02\xa9\x02J\x03r\x02\x85\x02\x8c\x02\xc9\x16\xb7\x02y\x02\xfc\xff\xfd\xff\xc3\x16\xf9\xff\xfa\xff\b\0\xfc\xff\xbf\x02\xfe\xff\xff\xff\xfd\xff\xfb\xff",
  lex_backtrk: "\xff\xff\xff\xff\xff\xff\xff\xffD\0A\0>\0=\0<\0;\0E\0G\0B\0C\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x16\0K\0\x1e\0\x15\0\x15\0\xff\xff\xff\xffM\0?\0J\0M\0M\0M\0M\0\x02\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x03\0\xff\xff\x04\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff@\0\xff\xff\xff\xff\xff\xff\xff\xff\x14\0\x14\0\x15\0\x14\0\x0f\0\x14\0\x14\0\x0b\0\n\0\r\0\f\0\x0e\0\x0e\0\x0e\0\xff\xff\x0e\0\x0e\0\x13\0\x12\0\x11\0\x10\0\x15\0\x13\0\x12\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff)\0\xff\xff*\0\xff\xff.\0\xff\xff\xff\xff2\0\xff\xff1\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff$\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x13\0\x13\0\x1b\0\x12\0\x12\0.\0\xff\xff&\x000\x000\x000\x000\x000\0\x01\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x02\0\xff\xff\x03\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x12\0\x11\0\x11\0\x10\0\xff\xff\x10\0\x0f\0\x0f\0\x12\0\x11\0\f\0\x11\0\x11\0\b\0\x07\0\n\0\t\0\x0b\0\x0b\0\x0b\0\x0b\0\x0b\0\x0e\0\r\0\xff\xff\xff\xff\x13\0\x13\0\x13\0\x13\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x10\0\xff\xff\x0f\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\f\0\x05\0\x0f\0\xff\xff\xff\xff\xff\xff\xff\xff\x04\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x04\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x05\0\x06\0\x06\0\x06\0\x06\0\x02\0\x01\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x06\0\xff\xff\xff\xff\x04\0\x07\0\xff\xff\xff\xff\x01\0\xff\xff\x03\0\xff\xff\xff\xff\xff\xff\x04\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\f\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x06\0\x0e\0\x0e\0\x0e\0\x0e\0\x02\0\x01\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\x06\0\x02\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x05\0\x05\0\x05\0\x05\0\x05\0\x01\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x05\0\xff\xff\x06\0\xff\xff\xff\xff\xff\xff\xff\xff",
  lex_default: "\x01\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\0\0\0\0\0\0\0\0\0\0\xff\xff\0\0\xff\xff\0\0\xff\xff\0\0\0\0\xff\xff\0\0\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x86\0\0\0\0\0\0\0\0\0\0\0\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xf8\0\0\0\0\0\0\0\0\0\xfd\0\0\0\xff\xff\0\0\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\0\0\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\0\0\x18\x01\0\0\xff\xff\0\0\0\0\xff\xff\0\0\0\0 \x01\0\0\0\0\0\0$\x01\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0;\x01\0\0\xff\xff\0\0\0\0\xff\xffB\x01\0\0\0\0\xff\xff\0\0\xff\xffG\x01\0\0\0\0\xff\xff\0\0\0\0\0\0N\x01\0\0\0\0\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0m\x01\0\0\0\0\0\0\0\0\xff\xff\0\0t\x01\0\0\xff\xff\xff\xff\0\0\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x8a\x01\0\0\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xa1\x01\0\0\0\0\xff\xff\0\0\xff\xff\0\0\0\0\0\0\0\0",
  lex_trans: "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0&\0(\0\xff\0&\0&\0=\x01D\x01r\x01w\x01\xa9\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0&\0\n\0\x1e\0\x1f\0\x18\0\x05\0\r\0\x1e\0\x15\0\x14\0 \0\x07\0\x10\0\x06\0\x1a\0!\0\x1c\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x0f\0\x11\0\t\0\x0b\0\b\0\x0e\0\x19\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x13\0'\0\x12\0\x04\0\x18\0\x1d\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x17\0\f\0\x16\0\x03\0\x84\0\x83\0\x82\0\x80\0{\0z\0w\0x\0u\0s\0r\0p\0o\0m\0R\x001\x000\0/\0\x81\x001\0k\0\x7f\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0N\x005\0.\0n\0&\0P\x004\0.\0-\x000\0/\0&\0&\0-\0&\0D\0C\0A\0>\0O\x003\0@\0?\0<\0=\0<\0<\0<\x002\x002\0&\0&\0&\0&\0&\0&\0&\0&\0&\0&\0&\0&\0q\0B\0<\0<\0<\0<\0<\0<\0<\0<\0<\0<\0<\0<\0E\0F\0G\0H\0I\0J\0K\0L\0M\0C\0%\0$\0#\0\x18\0Q\0l\0t\0v\0y\0}\0|\0&\0~\0\xf6\0\"\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0<\0\xcb\0\xb0\0\xaf\0\xae\0\xad\0\x02\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\xb2\0\xb0\0\xaf\0\xa5\0\x18\0\xb1\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0S\0&\0\xac\0\xac\0&\0&\0\xae\0\xad\0\xab\0\xab\0U\0\xa5\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\xa5\0\xa5\0&\0\xa5\0\xc1\0\xc0\0\xbf\0S\0S\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\xbe\0\xbd\0\xbc\0\xb9\0S\0\xb9\0S\0S\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\xbb\0\xb9\0\xb9\0\xb9\0\xc2\0\xc3\0\xba\0\xc4\0\xc5\0U\0\xc6\0W\0W\0W\0W\0W\0W\0W\0W\0\x1b\0\x1b\0\xc7\0\xc8\0\xc9\0\xca\0\xc0\0\xd7\0\xd6\0S\0Y\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0X\0S\0S\0S\0S\0S\0S\0S\0S\0V\0S\0S\0\xd5\0\xd4\0\xd1\0\xd1\0S\0\xd1\0S\0Y\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0X\0S\0S\0S\0S\0S\0S\0S\0S\0V\0S\0S\0<\0\xd3\0\xd1\0<\0<\0<\0\xd1\0\xd2\0<\0<\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0\xf1\0\x1e\x01\x1c\x01<\0\x1d\x017\x016\x01\xf0\0<\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\x005\x014\x018\x013\x01,\0+\0*\x009\x017\x012\x017\x006\x015\x014\x01*\x017\0*\x01*\x01)\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0*\x01*\x01S\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0i\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0!\x016\0L\x01K\x01h\x01i\x016\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0j\x01g\x01f\x01\x18\0S\0k\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0h\x01g\x01f\x01\\\x01\x18\0\\\x01\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\\\x01;\0:\x009\x003\x01e\x01;\0:\x009\0S\x002\x01d\x01\\\x01e\x01\\\x018\0a\0\x82\x01a\0d\x018\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0\x9e\x01\x9d\x01\x1a\x01\x9c\x01\x9d\x01\x9f\x01\x9c\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\x91\x01\x19\x01\x9b\x01\x9a\x01S\0\x91\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x9b\x01\x9a\x01\x91\x01h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0D\x01\x91\x01\x91\x01C\x01\xa8\x01\"\x01\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0S\0\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\0\0\0\0\0\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0\x99\x01\0\0\0\0\0\0\0\0\0\0\x98\x01f\0f\0f\0f\0f\0f\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0S\0\0\0f\0f\0f\0f\0f\0f\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0_\0\x0f\x01\x0f\x01\x0f\x01\x0f\x01\x0f\x01\x0f\x01\x0f\x01\x0f\x01\x1b\x01U\0\0\0W\0W\0W\0W\0W\0W\0W\0W\0^\0^\0\x99\x01\0\0\0\0\0\0\0\0\0\0\x98\x01_\0_\0_\0_\0`\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0_\0\0\0_\0_\0_\0_\0`\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0S\0\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff\0\0\0\0\0\0\0\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0S\0S\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0S\0\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0Z\0Z\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0S\0\0\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0Z\0Z\0[\0[\0[\0[\0[\0[\0[\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\0\0\0\0\0\0\0\0[\0\0\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\0\0\0\0\0\0\0\0[\0\0\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0]\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0]\0]\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\0\0\0\0\0\0\0\0]\0\0\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\0\0\0\0\0\0\0\0]\0\0\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0_\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0U\0\0\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0_\0_\0_\0`\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0_\0\0\0_\0_\0_\0_\0`\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0_\0\0\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0\0\0\0\0a\0\0\0a\0\0\0\0\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\0\0\0\0\0\0\0\0_\0\0\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\0\0\0\0\0\0\0\0c\0\0\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\0\0\0\0\0\0\0\0c\0\0\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0e\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0e\0\0\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0e\0\0\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0f\0f\0f\0f\0f\0f\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\0\0\0\0\0\0\0\0g\0\0\0f\0f\0f\0f\0f\0f\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\0\0\0\0\0\0\0\0g\0\0\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0S\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0S\0S\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\0\0\0\0\0\0\0\0S\0\0\0S\0S\0S\0S\0T\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0j\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\0\0\0\0\0\0\0\0j\0\0\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\0\0\0\0\0\0\0\0\0\0I\x01H\x01\0\0\0\0\0\0\0\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\0\0\0\0\0\0\0\0j\0\0\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\xa5\0\xa6\0\0\0\xa5\0\xa5\0\0\0\0\0\0\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\xa5\0\0\0\0\0\0\0\0\0\xa5\0\0\0\x9e\0\0\0\x98\0\0\0\x89\0\x9e\0\x93\0\x92\0\x9f\0\x88\0\x90\0\x9d\0\x9a\0\xa0\0\x9c\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x8f\0\x91\0\x8d\0\x8b\0\x8c\0\x8e\0\xa5\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x97\0J\x01\x96\0\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x99\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x95\0\x8a\0\x94\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01\0\0\0\0\xa4\0\xa3\0\xa2\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xa1\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\x87\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0}\x01\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xf2\0\x98\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe0\0\0\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xa5\0\0\0\0\0\xa5\0\xa5\0\0\0\0\0\0\0\0\0\xe0\0\0\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\x9b\0\x9b\0\0\0\0\0\xa5\0\0\0\0\0\0\0\0\0\xd9\0\xe4\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xe3\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xe1\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xe4\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xe3\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xe1\0\xd9\0\xd9\0\xd1\0\0\0\xf9\0\xd1\0\xd1\0\xb9\0\0\0\0\0\xb9\0\xb9\0\xb9\0\0\0\0\0\xb9\0\xb9\0*\x01\0\0\0\0*\x01*\x01\0\0\0\0\0\0\xd1\0\0\0\0\0\xfb\0\0\0\xb9\0\0\0\0\0\xfb\0\0\0\xb9\0\0\0\0\0\0\0\xcc\0*\x01\x9c\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\xd1\0\0\0\0\0\xd1\0\xd1\0\xb4\0\0\0\0\0\0\0\0\0\xb4\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\xb9\0\0\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xfa\0\0\0\xcc\0\0\0\x9c\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\xb3\0r\x01\0\0\0\0q\x01\xb3\0\0\0\0\0\0\0\xb9\0|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01\0\0\x80\x01\xd1\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xaa\0\xa9\0\xa8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\0\0\xa7\0\0\0\0\0\0\0\0\0o\x01\xd9\0\xd9\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xda\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0n\x01\0\0\0\0\0\0\xd0\0\xcf\0\xce\0\0\0\0\0\xb8\0\xb7\0\xb6\0\0\0\0\0\xb8\0\xb7\0\xb6\0\0\0\xcd\x001\x010\x01/\x01\0\0\xb5\0\0\0\0\0\0\0\0\0\xb5\0\0\0\0\0\0\0\0\0.\x01\0\0\0\0\xf9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd0\0\xcf\0\xce\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\xcd\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0p\x01\0\0\0\0\0\0\0\0\xdc\0\0\0\xdc\0\0\0\0\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\0\0\0\0\0\0\0\0\xdf\0\0\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xde\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\0\0\0\0\0\0\0\0\xde\0\0\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\0\0\0\0\0\0\0\0\xde\0\0\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\0\0\0\0\0\0\0\0\xdf\0\0\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xea\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe0\0\0\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe9\0\xe9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xea\0\xea\0\xea\0\xea\0\xeb\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\xea\0\0\0\xea\0\xea\0\xea\0\xea\0\xeb\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe5\0\xe5\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\0\0\0\0\0\0\0\0\xd9\0\0\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xe6\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe5\0\xe5\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\0\0\0\0\0\0\0\0\xe6\0\0\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\0\0\0\0\0\0\0\0\xe6\0\0\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe8\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe8\0\xe8\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\0\0\0\0\0\0\0\0\xe8\0\0\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\0\0\0\0\0\0\0\0\xe8\0\0\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xea\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xe0\0\0\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xea\0\xea\0\xea\0\xea\0\xeb\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\xea\0\0\0\xea\0\xea\0\xea\0\xea\0\xeb\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\xea\0\0\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\0\0\0\0\xdc\0\0\0\xdc\0\0\0\0\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\0\0\0\0\0\0\0\0\xea\0\0\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xed\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\0\0\0\0\0\0\0\0\xed\0\0\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\0\0\0\0\0\0\0\0\xed\0\0\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xef\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\0\0\0\0\0\0\0\0\xef\0\0\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\0\0\0\0\0\0\0\0\xef\0\0\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xf3\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\xf4\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0*\x01,\x01\0\0*\x01*\x01\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0*\x01\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xf5\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xff\0\0\0\0\0\xfe\0\x98\0\0\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\0\0\0\0\0\0\0\0\0\0\0\0\b\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01*\x01*\x01*\x01*\x01*\x01*\x01*\x01*\x01*\x01*\x01*\x01\0\0\0\0\0\0=\x01\0\0\0\0<\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x001\x010\x01/\x01\0\0\0\0\0\0\0\0\n\x01\0\0\0\0\0\0\0\0\0\0\x06\x01.\x01\0\0\0\0\x05\x01*\x01\0\0\0\0\0\0?\x01\0\0\0\0\x04\x01\0\0\0\0\0\0\x03\x01\0\0\x02\x01\0\x01\x01\x01\0\0\t\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0>\x01@\x01\0\0\0\0\0\0\0\0\0\0\0\0\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\0\0\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\0\0\0\0\\\x01\0\0\x10\x01\\\x01\\\x01\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\0\0\0\0\0\0\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\0\0\0\0\0\0\\\x01\0\0\0\0\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\0\0\r\x01\r\x01\r\x01\r\x01\r\x01\r\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\0\0\xa2\x01\0\0\x0b\x01\xa3\x01\0\0\0\0\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\0\0\0\0\0\0\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\0\0\0\0\0\0\0\0\0\0\xa5\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\0\0\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01*\x01,\x01A\x01*\x01+\x01\0\0\0\0\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\0\0\0\0\0\0\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\xa4\x01*\x01\0\0\0\0\xa6\x01\0\0\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01%\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x14\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\0\0\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\\\x01\0\0\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\x91\x01\0\0\0\0\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01E\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0c\x01b\x01a\x01\\\x01\0\0\0\0\0\0\0\0\0\0\x16\x01\0\0\0\0\0\0\0\0`\x01\x91\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01\0\0\0\0\0\0\0\0E\x01\0\0E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01\0\0~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01\0\0\0\0\0\0\0\0\0\0\xa7\x01\0\0~\x01~\x01~\x01~\x01~\x01~\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0)\x01(\x01'\x01E\x01~\x01~\x01~\x01~\x01~\x01~\x01\0\0\0\0\0\0\0\0&\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0-\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01\0\0\0\0\0\0\0\0E\x01\0\0E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01\\\x01^\x01\0\0\\\x01]\x01\\\x01^\x01\0\0\\\x01\\\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\\\x01\0\0O\x01\0\0P\x01\\\x01\0\0O\x01\0\0\0\0\0\0\0\0\0\0\0\0R\x01W\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0S\x01\0\0V\x01Q\x01U\x01\0\0\0\0P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\0\0\0\0\0\0\0\0P\x01\0\0P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01T\x01P\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0P\x01\0\0\0\0P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\0\0\0\0\0\0\0\0P\x01\0\0P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\0\0w\x01\0\0\0\0v\x01\0\0\0\0\0\0\x91\x01\0\0\0\0\x91\x01\x91\x01\0\0[\x01Z\x01Y\x01\0\0\0\0c\x01b\x01a\x01{\x01z\x01\0\0y\x01\0\0\0\0X\x01u\x01y\x01\x91\x01\0\0`\x01\0\0z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01_\x01\0\0\0\0\0\0\0\0\0\0y\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01\0\0\0\0\0\0\0\0z\x01\0\0z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01\x81\x01\0\0\0\0\0\0y\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\0\0\0\0\0\0\0\0\x81\x01\0\0\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\0\0\0\0~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01\0\0\x7f\x01\0\0\0\0\0\0\0\0\0\0~\x01~\x01~\x01~\x01~\x01~\x01\0\0\0\0\x97\x01\x96\x01\x95\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x94\x01\0\0\0\0\0\0\x83\x01\0\0\0\0\0\0\0\0x\x01~\x01~\x01~\x01~\x01~\x01~\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\0\0\x82\x01\0\0\0\0\0\0\0\0\0\0\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\0\0\0\0\0\0\0\0\x83\x01\0\0\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x84\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\0\0\x82\x01\0\0\0\0\0\0\0\0\0\0\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\0\0\0\0\0\0\0\0\x84\x01\0\0\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x85\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\0\0\x82\x01\0\0\0\0\0\0\0\0\0\0\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\0\0\0\0\0\0\0\0\x85\x01\0\0\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x86\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\0\0\x82\x01\0\0\0\0\0\0\0\0\0\0\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\0\0\0\0\0\0\0\0\x86\x01\0\0\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x87\x01\x91\x01\x93\x01\0\0\x91\x01\x91\x01\0\0\0\0\0\0\0\0\0\0\0\0\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\0\0\x82\x01\x91\x01\0\0\0\0\0\0\0\0\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\0\0\0\0\0\0\0\0\x87\x01\0\0\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x88\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\0\0\x82\x01\0\0\0\0\0\0\0\0\0\0\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\0\0\0\0\0\0\0\0\x88\x01\0\0\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x88\x01\x91\x01\x93\x01\0\0\x91\x01\x92\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x91\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x8c\x01\0\0\0\0\0\0\0\0\x97\x01\x96\x01\x95\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x94\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x8b\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x90\x01\x8f\x01\x8e\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x8d\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xff\xff",
  lex_check: "\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\xfe\0\0\0\0\0<\x01C\x01q\x01v\x01\xa3\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x04\0\x05\0\x06\0\x07\0\b\0\b\0\t\0\t\0\n\0\x0b\0\x0b\0\f\0\r\0\x19\0\x1f\0#\0$\0$\0\x06\0*\0\x1a\0\x07\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0 \0!\0%\0\r\0-\0 \0!\0,\0%\0+\0+\0.\0/\0,\x001\x006\x007\x009\0;\0 \0!\0:\0:\0=\0;\0>\0?\0A\0\"\0)\x000\x000\x000\x000\x000\x000\x000\x000\x000\x000\x000\x002\0\f\x008\0@\0@\0@\0@\0@\0@\0@\0@\0@\0@\0@\0B\0D\0E\0F\0G\0H\0I\0J\0K\0L\0M\0\0\0\0\0\0\0\x18\0N\0k\0s\0u\0w\0z\0z\x000\0|\0\x8b\0\0\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0@\0\x9f\0\xa1\0\xa2\0\xa3\0\xa3\0\0\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\xa0\0\xa7\0\xa8\0\xab\0\x18\0\xa0\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x1b\0&\0\xa4\0\xaa\0&\0&\0\xa9\0\xa9\0\xa4\0\xaa\0\x1b\0\xac\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\xad\0\xaf\0&\0\xb0\0\xb3\0\xb4\0\xb5\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\xb6\0\xb7\0\xb7\0\xba\0\x1b\0\xbb\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1c\0\xb8\0\xbc\0\xbe\0\xbf\0\xc1\0\xc2\0\xb8\0\xc3\0\xc4\0\x1c\0\xc5\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\xc6\0\xc7\0\xc8\0\xc9\0\xca\0\xcd\0\xce\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\xcf\0\xcf\0\xd2\0\xd3\0\x1c\0\xd4\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\x005\0\xd0\0\xd6\x005\x005\0<\0\xd7\0\xd0\0<\0<\0a\0a\0a\0a\0a\0a\0a\0a\0a\0a\0\xf0\0\x1c\x01\x19\x015\0\x19\x01&\x01'\x01\x9a\0<\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0(\x01(\x01%\x01)\x01&\0&\0&\0%\x01.\x01)\x015\0/\x010\x010\x012\x01<\x003\x014\x01&\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\x006\x017\x01S\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0X\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0\x1f\x015\0I\x01I\x01Y\x01`\x01<\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0W\x01Z\x01Z\x01m\0S\0W\x01S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0S\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0a\x01b\x01b\x01d\x01m\0e\x01m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0m\0f\x015\x005\x005\x001\x01[\x01<\0<\0<\0T\x001\x01[\x01h\x01c\x01i\x015\0T\0\x88\x01T\0c\x01<\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0\x8c\x01\x8d\x01\x17\x01\x8e\x01\x94\x01\x8c\x01\x95\x01T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0\x98\x01\x17\x01\x8f\x01\x8f\x01T\0\x99\x01T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0U\0\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x07\x01\x96\x01\x96\x01\x9a\x01U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0@\x01\x9c\x01\x9d\x01@\x01\xa5\x01\x1f\x01\xff\xffU\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0\xff\xff\xff\xff\xff\xff\xff\xffU\0\xff\xffU\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0V\0\b\x01\b\x01\b\x01\b\x01\b\x01\b\x01\b\x01\b\x01\xff\xff\xff\xff\xff\xffV\0V\0V\0V\0V\0V\0V\0V\0V\0V\0\x90\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x90\x01V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0\xff\xff\xff\xff\xff\xff\xff\xffV\0\xff\xffV\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0W\0\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x0e\x01\x17\x01W\0\xff\xffW\0W\0W\0W\0W\0W\0W\0W\0W\0W\0\x97\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x97\x01W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0\xff\xff\xff\xff\xff\xff\xff\xffW\0\xff\xffW\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0W\0X\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff@\x01\xff\xff\xff\xff\xff\xff\xff\xffX\0X\0X\0X\0X\0X\0X\0X\0X\0X\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffX\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0\xff\xff\xff\xff\xff\xff\xff\xffX\0\xff\xffX\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0X\0Y\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffY\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffY\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0\xff\xff\xff\xff\xff\xff\xff\xffY\0\xff\xffY\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Y\0Z\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffZ\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffZ\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0\xff\xff\xff\xff\xff\xff\xff\xffZ\0\xff\xffZ\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0Z\0[\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\xff\xff\xff\xff\xff\xff\xff\xff[\0\xff\xff[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0[\0\\\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\xff\xff\xff\xff\xff\xff\xff\xff\\\0\xff\xff\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0]\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0\xff\xff\xff\xff\xff\xff\xff\xff]\0\xff\xff]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0]\0^\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff^\0\xff\xff^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0\xff\xff\xff\xff\xff\xff\xff\xff^\0\xff\xff^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0_\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0\xff\xff\xff\xff\xff\xff\xff\xff_\0\xff\xff_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0_\0`\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff`\0\xff\xff`\0\xff\xff\xff\xff`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0\xff\xff\xff\xff\xff\xff\xff\xff`\0\xff\xff`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0b\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffb\0b\0b\0b\0b\0b\0b\0b\0b\0b\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffb\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0\xff\xff\xff\xff\xff\xff\xff\xffb\0\xff\xffb\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0c\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffc\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffc\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0\xff\xff\xff\xff\xff\xff\xff\xffc\0\xff\xffc\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0c\0d\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffd\0d\0d\0d\0d\0d\0d\0d\0d\0d\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffd\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0\xff\xff\xff\xff\xff\xff\xff\xffd\0\xff\xffd\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0e\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffe\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffe\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\xff\xff\xff\xff\xff\xff\xff\xffe\0\xff\xffe\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0f\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfff\0f\0f\0f\0f\0f\0f\0f\0f\0f\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfff\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0\xff\xff\xff\xff\xff\xff\xff\xfff\0\xff\xfff\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0g\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffg\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffg\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0\xff\xff\xff\xff\xff\xff\xff\xffg\0\xff\xffg\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0g\0h\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffh\0h\0h\0h\0h\0h\0h\0h\0h\0h\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffh\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0\xff\xff\xff\xff\xff\xff\xff\xffh\0\xff\xffh\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0i\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffi\0i\0i\0i\0i\0i\0i\0i\0i\0i\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffi\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0\xff\xff\xff\xff\xff\xff\xff\xffi\0\xff\xffi\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0j\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffF\x01F\x01\xff\xff\xff\xff\xff\xff\xff\xffj\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffj\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\xff\xff\xff\xff\xff\xff\xff\xffj\0\xff\xffj\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0j\0\x85\0\x85\0\xff\xff\x85\0\x85\0\xff\xff\xff\xff\xff\xff\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xae\0\xff\xff\xff\xff\xff\xff\xff\xff\x85\0\xff\xff\x85\0\xff\xff\x85\0\xff\xff\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\xae\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0F\x01\x85\0\xff\xff\x85\0\xff\xff\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x98\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\xff\xff\xff\xff\xff\xff\xff\xff\x98\0\xff\xff\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0\x98\0{\x01{\x01{\x01{\x01{\x01{\x01{\x01{\x01{\x01{\x01\xff\xff\xff\xff\x85\0\x85\0\x85\0\x99\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x85\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x85\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\xff\xff\xff\xff{\x01\xff\xff\x99\0\xff\xff\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x99\0\x9b\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x9b\0\xff\xff\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\xff\xff\xff\xff\xff\xff\xff\xff\x9b\0\xff\xff\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9c\0\xa5\0\xff\xff\xff\xff\xa5\0\xa5\0\xff\xff\xff\xff\xff\xff\xff\xff\x9c\0\xff\xff\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\xff\xff\xff\xff\xa5\0\xff\xff\xff\xff\xff\xff\xff\xff\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\xff\xff\xff\xff\xff\xff\xff\xff\x9c\0\xff\xff\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9d\0\xff\xff\xf7\0\x9d\0\x9d\0\xb2\0\xff\xff\xff\xff\xb2\0\xb2\0\xb9\0\xff\xff\xff\xff\xb9\0\xb9\0*\x01\xff\xff\xff\xff*\x01*\x01\xff\xff\xff\xff\xff\xff\x9d\0\xff\xff\xff\xff\xf7\0\xff\xff\xb2\0\xff\xff\xff\xff\xf7\0\xff\xff\xb9\0\xff\xff\xff\xff\xff\xff\x9d\0*\x01\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\xd1\0\xff\xff\xff\xff\xd1\0\xd1\0\xb2\0\xff\xff\xff\xff\xff\xff\xff\xff\xb9\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xff\xff\xd1\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xf7\0\xff\xff\xd1\0\xff\xff\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xb2\0l\x01\xff\xff\xff\xffl\x01\xb9\0\xff\xff\xff\xff\xff\xff\xbd\0|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01|\x01\xff\xff|\x01\xd5\0\xd8\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xa5\0\xa5\0\xa5\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xff\xff\xa5\0\xff\xff\xff\xff\xff\xff\xff\xffl\x01\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xff\xff\xff\xff\xff\xff\xff\xff\xd8\0\xff\xff\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xff\xff\xff\xff\xff\xff\xff\xffl\x01\xff\xff\xff\xff\xff\xff\x9d\0\x9d\0\x9d\0\xff\xff\xff\xff\xb2\0\xb2\0\xb2\0\xff\xff\xff\xff\xb9\0\xb9\0\xb9\0\xff\xff\x9d\0*\x01*\x01*\x01\xff\xff\xb2\0\xff\xff\xff\xff\xff\xff\xff\xff\xb9\0\xff\xff\xff\xff\xff\xff\xff\xff*\x01\xff\xff\xff\xff\xf7\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xd9\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xd1\0\xd1\0\xd1\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xff\xff\xd1\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xff\xff\xff\xff\xff\xff\xff\xff\xd9\0\xff\xff\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xd9\0\xda\0\xff\xffl\x01\xff\xff\xff\xff\xff\xff\xff\xff\xda\0\xff\xff\xda\0\xff\xff\xff\xff\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xff\xff\xff\xff\xff\xff\xff\xff\xda\0\xff\xff\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xdb\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xff\xff\xff\xff\xff\xff\xff\xff\xdb\0\xff\xff\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdd\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xff\xff\xff\xff\xff\xff\xff\xff\xdd\0\xff\xff\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xde\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xff\xff\xff\xff\xff\xff\xff\xff\xde\0\xff\xff\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xde\0\xdf\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xff\xff\xff\xff\xff\xff\xff\xff\xdf\0\xff\xff\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xdf\0\xe0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xff\xff\xff\xff\xff\xff\xff\xff\xe0\0\xff\xff\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe1\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xff\xff\xff\xff\xff\xff\xff\xff\xe1\0\xff\xff\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe2\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe2\0\xff\xff\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xff\xff\xff\xff\xff\xff\xff\xff\xe2\0\xff\xff\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe3\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xff\xff\xff\xff\xff\xff\xff\xff\xe3\0\xff\xff\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe4\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xff\xff\xff\xff\xff\xff\xff\xff\xe4\0\xff\xff\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe4\0\xe5\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xff\xff\xff\xff\xff\xff\xff\xff\xe5\0\xff\xff\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe5\0\xe6\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xff\xff\xff\xff\xff\xff\xff\xff\xe6\0\xff\xff\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe6\0\xe7\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xff\xff\xff\xff\xff\xff\xff\xff\xe7\0\xff\xff\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe8\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xff\xff\xff\xff\xff\xff\xff\xff\xe8\0\xff\xff\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe8\0\xe9\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe9\0\xff\xff\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xff\xff\xff\xff\xff\xff\xff\xff\xe9\0\xff\xff\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xea\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xff\xff\xff\xff\xff\xff\xff\xff\xea\0\xff\xff\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xea\0\xeb\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xeb\0\xff\xff\xeb\0\xff\xff\xff\xff\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xff\xff\xff\xff\xff\xff\xff\xff\xeb\0\xff\xff\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xec\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xff\xff\xff\xff\xff\xff\xff\xff\xec\0\xff\xff\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xed\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xff\xff\xff\xff\xff\xff\xff\xff\xed\0\xff\xff\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xed\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xee\0\xff\xff\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xef\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xff\xff\xff\xff\xff\xff\xff\xff\xef\0\xff\xff\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xef\0\xf2\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xff\xff\xff\xff\xff\xff\xff\xff\xf2\0\xff\xff\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf2\0\xf3\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xff\xff\xff\xff\xff\xff\xff\xff\xf3\0\xff\xff\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf3\0\xf4\0+\x01+\x01\xff\xff+\x01+\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xff\xff\xff\xff+\x01\xff\xff\xff\xff\xff\xff\xff\xff\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xff\xff\xff\xff\xff\xff\xff\xff\xf4\0\xff\xff\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf4\0\xf5\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xfc\0\xff\xff\xff\xff\xfc\0\xf5\0\xff\xff\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xf5\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfc\0\xfc\0\xfc\0\xfc\0\xfc\0\xfc\0\xfc\0\xfc\x005\x015\x015\x015\x015\x015\x015\x015\x015\x015\x015\x01\xff\xff\xff\xff\xff\xff:\x01\xff\xff\xff\xff:\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff+\x01+\x01+\x01\xff\xff\xff\xff\xff\xff\xff\xff\xfc\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfc\0+\x01\xff\xff\xff\xff\xfc\x005\x01\xff\xff\xff\xff\xff\xff:\x01\xff\xff\xff\xff\xfc\0\xff\xff\xff\xff\xff\xff\xfc\0\xff\xff\xfc\0\xfc\0\xfc\0\xff\xff\xfc\0\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff:\x01:\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\xff\xff\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\xff\xff\xff\xff\\\x01\xff\xff\0\x01\\\x01\\\x01\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\xff\xff\xff\xff\xff\xff\t\x01\t\x01\t\x01\t\x01\t\x01\t\x01\xff\xff\xff\xff\xff\xff\\\x01\xff\xff\xff\xff\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\xff\xff\f\x01\f\x01\f\x01\f\x01\f\x01\f\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\xff\xff\xa0\x01\xff\xff\xfc\0\xa0\x01\xff\xff\xff\xff\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\xff\xff\xff\xff\xff\xff\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\x10\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xa0\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\xff\xff\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x11\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01#\x01#\x01:\x01#\x01#\x01\xff\xff\xff\xff\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\xff\xff\xff\xff\xff\xff\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\x12\x01\xa0\x01#\x01\xff\xff\xff\xff\xa0\x01\xff\xff\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01#\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x13\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\xff\xffg\x01g\x01g\x01g\x01g\x01g\x01g\x01g\x01g\x01g\x01g\x01\xff\xff\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\x9b\x01\xff\xff\xff\xff\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01\x15\x01?\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\\\x01\\\x01\\\x01g\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x15\x01\xff\xff\xff\xff\xff\xff\xff\xff\\\x01\x9b\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01\xff\xff\xff\xff\xff\xff\xff\xff?\x01\xff\xff?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01?\x01\xff\xff}\x01}\x01}\x01}\x01}\x01}\x01}\x01}\x01}\x01}\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xa0\x01\xff\xff}\x01}\x01}\x01}\x01}\x01}\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff#\x01#\x01#\x01E\x01}\x01}\x01}\x01}\x01}\x01}\x01\xff\xff\xff\xff\xff\xff\xff\xff#\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff#\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01\xff\xff\xff\xff\xff\xff\xff\xffE\x01\xff\xffE\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01E\x01M\x01M\x01\xff\xffM\x01M\x01]\x01]\x01\xff\xff]\x01]\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffM\x01\xff\xffM\x01\xff\xffM\x01]\x01\xff\xffM\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffM\x01M\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffM\x01\xff\xffM\x01M\x01M\x01\xff\xff\xff\xffM\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01\xff\xff\xff\xff\xff\xff\xff\xffM\x01\xff\xffM\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01M\x01P\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffP\x01\xff\xff\xff\xffP\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffP\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\xff\xff\xff\xff\xff\xff\xff\xffP\x01\xff\xffP\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01P\x01\xff\xffs\x01\xff\xff\xff\xffs\x01\xff\xff\xff\xff\xff\xff\x91\x01\xff\xff\xff\xff\x91\x01\x91\x01\xff\xffM\x01M\x01M\x01\xff\xff\xff\xff]\x01]\x01]\x01u\x01u\x01\xff\xffs\x01\xff\xff\xff\xffM\x01s\x01s\x01\x91\x01\xff\xff]\x01\xff\xffu\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01M\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffs\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01\xff\xff\xff\xff\xff\xff\xff\xffu\x01\xff\xffu\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01u\x01z\x01\xff\xff\xff\xff\xff\xffs\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffz\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xffz\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01\xff\xff\xff\xff\xff\xff\xff\xffz\x01\xff\xffz\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01z\x01\xff\xff\xff\xff~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01~\x01\xff\xff~\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff~\x01~\x01~\x01~\x01~\x01~\x01\xff\xff\xff\xff\x91\x01\x91\x01\x91\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x91\x01\xff\xff\xff\xff\xff\xff\x81\x01\xff\xff\xff\xff\xff\xff\xff\xffs\x01~\x01~\x01~\x01~\x01~\x01~\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\xff\xff\x81\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\xff\xff\xff\xff\xff\xff\xff\xff\x81\x01\xff\xff\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x81\x01\x83\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\xff\xff\x83\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\xff\xff\xff\xff\xff\xff\xff\xff\x83\x01\xff\xff\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x83\x01\x84\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\xff\xff\x84\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\xff\xff\xff\xff\xff\xff\xff\xff\x84\x01\xff\xff\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x84\x01\x85\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\xff\xff\x85\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\xff\xff\xff\xff\xff\xff\xff\xff\x85\x01\xff\xff\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x85\x01\x86\x01\x92\x01\x92\x01\xff\xff\x92\x01\x92\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\xff\xff\x86\x01\x92\x01\xff\xff\xff\xff\xff\xff\xff\xff\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\xff\xff\xff\xff\xff\xff\xff\xff\x86\x01\xff\xff\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x86\x01\x87\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\xff\xff\x87\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\xff\xff\xff\xff\xff\xff\xff\xff\x87\x01\xff\xff\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x87\x01\x89\x01\x89\x01\xff\xff\x89\x01\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\x92\x01\x92\x01\x92\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x92\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01\x89\x01\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x89\x01",
  lex_base_code: "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n\0\x16\0\"\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x02\0\0\0\0\0\0\0\x01\0\f\0\0\0\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0,\x006\0_\0B\0v\0L\0N\0\0\0\x81\0\0\0\x98\0\0\0\xa2\0\xac\0\xb6\0\0\0\xc0\0\0\0\xca\0\0\0\xe1\0\xeb\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x04\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x0e\x01\x1a\x01&\x01W\x01\0\0\0\0\x01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\t\0\x0b\0\r\0\x0f\0\xe5\0\x1a\0\b\0h\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0H\x01\0\0\0\0\0\0\0\0y\x01\r\0\x1c\0\x10\0\x1a\x01\x1d\0E\0\x83\x01\0\0\x8d\x01\x9a\x01\xa4\x01\xae\x01\0\0\0\0\xb8\x01\xc2\x01\xdb\x01\xe5\x01\x89\0\x8b\0\0\0\xf9\x01\0\0\x03\x02\0\0\r\x02\x17\x02\0\0!\x02\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
  lex_backtrk_code: "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x0f\0\x0f\0\0\0\x0f\0\0\0\x0f\0\x0f\0\0\0#\0\0\0&\0)\0)\0)\0\0\0)\0)\0\0\0,\0\0\0/\0\0\0\0\0,\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0W\0W\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0h\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0W\0k\0k\0s\0\0\0s\0v\0v\0W\0k\0~\0k\0k\0&\0\x8f\0/\0\x94\0\x99\0\x99\0\x99\0\x99\0\x99\0\x9e\0\xa1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
  lex_default_code: "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
  lex_trans_code: "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\t\0\0\0\t\0\t\0\t\0\t\0\t\0e\0\0\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\t\0\0\0\t\0\0\0\0\0\0\0\0\0e\0\0\0e\0\t\0e\0\0\0\0\0\0\0\0\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\0\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\0\0\x04\0\x04\0\x04\0\x04\0\x04\0\x04\0\x04\0\x04\0\x01\0\x01\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\0\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x18\0\x01\0\x01\0 \0 \0 \0 \0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0\t\0e\0\t\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0e\0e\x002\x002\x002\0\0\0\t\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0e\x002\0\t\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x1d\0\x8c\0\x8c\0\x8c\0\x8c\0\0\0\0\0\t\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x01\0e\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\x002\0\0\0\0\0\0\0\0\0\0\0\0\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x01\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\x12\0\0\0\0\0\0\0\0\0\0\0\0\0\x15\0\x15\0\x15\0\x15\0\x15\0\x15\x002\0\0\0\0\0M\0M\0M\0M\0M\0M\0M\0M\0M\0M\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0\0\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0M\0\0\0`\0`\0`\0`\0`\0`\0`\0`\0R\0R\x002\0\0\0\0\x002\x002\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0e\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x002\0M\0M\0M\0M\0M\0M\0M\0M\0M\0M\x002\0\0\0\0\x002\x002\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0\0\0\0\0\0\0e\0\0\0\0\0\0\0\0\x002\x002\x002\x002\x002\x002\x002\x002\x002\x002\x002\x002\0\0\0\0\0\0\0\0\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0\0\0\0\x002\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0R\0R\0R\0R\0R\0R\0R\0R\0R\0R\0{\0{\0{\0{\0{\0{\0{\0{\0{\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0{\0{\0{\0{\0{\0R\0\0\0\x81\0\x81\0\x81\0\x81\0\x81\0\x81\0\x81\0\x81\0\x86\0\x86\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0\0\0\0\0\0\0\0\0\0\0\0\0{\0{\0{\0{\0{\0{\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0\x89\0R\0\0\0\x86\0\x86\0\x86\0\x86\0\x86\0\x86\0\x86\0\x86\0\x86\0\x86\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0p\0{\0{\0{\0{\0{\0{\0{\0{\0{\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0{\0{\0{\0{\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0{\0{\0{\0{\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
  lex_check_code: "\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff5\0\xff\xff<\x005\x005\0<\0<\0\xb2\0\xff\xff\xb9\0\xb2\0\xb2\0\xb9\0\xb9\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff5\0\xff\xff<\0\xff\xff\xff\xff\xff\xff\xff\xff\xb2\0\xff\xff\xb9\0!\0\xa0\0\xff\xff\xff\xff\xff\xff\xff\xff\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1a\0\x1b\0\xff\xff\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1b\0\x1c\0\xff\xff\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0\x1c\0T\0T\0T\0T\0T\0T\0T\0T\0T\0T\0U\0U\0U\0U\0U\0U\0U\0U\0U\0U\0W\0\xff\xffW\0W\0W\0W\0W\0W\0W\0W\0W\0W\0Y\0Y\0Z\0Z\0>\0@\0@\0@\0@\0@\0@\0@\0@\0@\0@\0@\0A\0\xbb\0=\0V\0V\0V\0V\0V\0V\0V\0V\0V\0V\0\xba\0\xbe\0\xd2\0\xd3\0\xd6\0\xff\xff?\0V\0V\0V\0V\0V\0V\0X\0X\0X\0X\0X\0X\0X\0X\0\xbc\0\xd4\0@\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\\\0\xe4\0\xe4\0\xe5\0\xe5\0\xff\xff\xff\xffB\0V\0V\0V\0V\0V\0V\0^\0\xbf\0^\0^\0^\0^\0^\0^\0^\0^\0^\0^\0`\0`\0`\0`\0`\0`\0`\0`\0`\0`\0a\0a\0a\0a\0a\0a\0a\0a\0a\0a\0b\0b\0b\0b\0b\0b\0b\0b\0b\0b\0d\0d\0d\0d\0d\0d\0d\0d\0d\0d\0f\0f\0f\0f\0f\0f\0f\0f\0f\0f\0\xd7\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfff\0f\0f\0f\0f\0f\0h\0h\0h\0h\0h\0h\0h\0h\0h\0h\0i\0i\0i\0i\0i\0i\0i\0i\0i\0i\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfff\0f\0f\0f\0f\0f\0\x85\0\xff\xff\xff\xff\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x85\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9a\0\x9b\0\xff\xff\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9b\0\x9c\0\xff\xff\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9c\0\x9d\0\xff\xff\xff\xff\x9d\0\x9d\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xbd\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\x9d\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xcc\0\xd1\0\xff\xff\xff\xff\xd1\0\xd1\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\x9d\0\xff\xff\xff\xff\xff\xff\xbd\0\xff\xff\xff\xff\xff\xff\xff\xff\xd1\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xd5\0\xff\xff\xff\xff\xff\xff\xff\xff\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd1\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xd8\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xda\0\xff\xff\xff\xff\xd5\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdb\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdc\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xdd\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe0\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe2\0\xff\xff\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe2\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xe3\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe1\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe7\0\xe9\0\xff\xff\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xe9\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xeb\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xec\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xee\0\xee\0\xee\0\xee\0\xee\0\xee\0\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff",
  lex_code: "\xff\x01\xff\xff\x03\xff\x01\xff\xff\x02\xff\xff\0\x02\xff\0\x01\xff\x06\xff\xff\x07\xff\xff\x01\xff\x03\xff\xff\x05\xff\xff\x04\xff\xff\0\x04\xff\0\x05\xff\0\x03\xff\0\x06\xff\0\x07\xff\x11\xff\x10\xff\x0e\xff\r\xff\f\xff\x0b\xff\n\xff\t\xff\b\xff\x07\xff\x06\xff\x05\xff\x04\xff\xff\x13\xff\x12\xff\xff\x12\xff\x13\xff\xff\x03\x11\x02\x12\x01\x0f\0\x10\xff\x16\xff\x13\xff\xff\x14\xff\xff\0\x14\xff\x01\x13\0\x0e\xff\x15\xff\xff\0\r\xff\x01\x15\0\f\xff\x19\xff\xff\0\t\xff\x13\xff\x16\xff\xff\x13\xff\xff\x18\xff\xff\x17\xff\xff\x01\x17\0\x04\xff\x01\x18\0\x06\xff\x01\x16\0\b\xff\0\x0b\xff\x01\x19\0\n\xff"
};

function token(env, lexbuf) {
  lexbuf.lex_mem = Caml_array.make(8, -1);
  let ___ocaml_lex_state = 0;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.new_engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          Lexing.new_line(lexbuf);
          return token(env, lexbuf);
      case 1 :
          let env$1 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return token(env$1, lexbuf);
      case 2 :
          unicode_fix_cols(lexbuf);
          return token(env, lexbuf);
      case 3 :
          let start = from_lb(env.lex_source, lexbuf);
          let buf = $$Buffer.create(127);
          let match = comment(env, buf, lexbuf);
          let env$2 = save_comment(match[0], start, match[1], buf, true);
          return token(env$2, lexbuf);
      case 4 :
          let sp = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 2 | 0, Caml_array.get(lexbuf.lex_mem, 0));
          let escape_type = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          let pattern = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          if (env.lex_enable_comment_syntax) {
            let env$3;
            if (env.lex_in_comment_syntax) {
              let loc = from_lb(env.lex_source, lexbuf);
              env$3 = unexpected_error(env, loc, pattern);
            } else {
              env$3 = env;
            }
            let env$4 = in_comment_syntax(true, env$3);
            if (escape_type === ":") {
              return [
                      env$4,
                      "T_COLON"
                    ];
            } else {
              return token(env$4, lexbuf);
            }
          }
          let start$1 = from_lb(env.lex_source, lexbuf);
          let buf$1 = $$Buffer.create(127);
          $$Buffer.add_string(buf$1, sp);
          $$Buffer.add_string(buf$1, escape_type);
          let match$1 = comment(env, buf$1, lexbuf);
          let env$5 = save_comment(match$1[0], start$1, match$1[1], buf$1, true);
          return token(env$5, lexbuf);
      case 5 :
          if (env.lex_in_comment_syntax) {
            let env$6 = in_comment_syntax(false, env);
            return token(env$6, lexbuf);
          }
          yyback(1, lexbuf);
          return [
                  env,
                  "T_MULT"
                ];
      case 6 :
          let start$2 = from_lb(env.lex_source, lexbuf);
          let buf$2 = $$Buffer.create(127);
          let match$2 = line_comment(env, buf$2, lexbuf);
          let env$7 = save_comment(match$2[0], start$2, match$2[1], buf$2, false);
          return token(env$7, lexbuf);
      case 7 :
          if (lexbuf.lex_start_pos !== 0) {
            return [
                    env,
                    "T_ERROR"
                  ];
          }
          let match$3 = line_comment(env, $$Buffer.create(127), lexbuf);
          return token(match$3[0], lexbuf);
      case 8 :
          let quote = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let start$3 = from_lb(env.lex_source, lexbuf);
          let buf$3 = $$Buffer.create(127);
          let raw = $$Buffer.create(127);
          $$Buffer.add_char(raw, quote);
          let match$4 = string_quote(env, quote, buf$3, raw, false, lexbuf);
          return [
                  match$4[0],
                  {
                    TAG: "T_STRING",
                    _0: [
                      btwn(start$3, match$4[1]),
                      $$Buffer.contents(buf$3),
                      $$Buffer.contents(raw),
                      match$4[2]
                    ]
                  }
                ];
      case 9 :
          let cooked = $$Buffer.create(127);
          let raw$1 = $$Buffer.create(127);
          let literal = $$Buffer.create(127);
          $$Buffer.add_string(literal, Lexing.lexeme(lexbuf));
          let start$4 = from_lb(env.lex_source, lexbuf);
          let match$5 = template_part(env, start$4, cooked, raw$1, literal, lexbuf);
          return [
                  match$5[0],
                  {
                    TAG: "T_TEMPLATE_PART",
                    _0: [
                      match$5[1],
                      {
                        cooked: $$Buffer.contents(cooked),
                        raw: $$Buffer.contents(raw$1),
                        literal: $$Buffer.contents(literal)
                      },
                      match$5[2]
                    ]
                  }
                ];
      case 10 :
          let w = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w, {
                      TAG: "T_NUMBER",
                      _0: "BINARY"
                    });
      case 11 :
          return [
                  env,
                  {
                    TAG: "T_NUMBER",
                    _0: "BINARY"
                  }
                ];
      case 12 :
          let w$1 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$1, {
                      TAG: "T_NUMBER",
                      _0: "OCTAL"
                    });
      case 13 :
          return [
                  env,
                  {
                    TAG: "T_NUMBER",
                    _0: "OCTAL"
                  }
                ];
      case 14 :
          let w$2 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$2, {
                      TAG: "T_NUMBER",
                      _0: "LEGACY_OCTAL"
                    });
      case 15 :
          return [
                  env,
                  {
                    TAG: "T_NUMBER",
                    _0: "LEGACY_OCTAL"
                  }
                ];
      case 16 :
      case 18 :
      case 20 :
          break;
      case 17 :
      case 19 :
      case 21 :
          return [
                  env,
                  {
                    TAG: "T_NUMBER",
                    _0: "NORMAL"
                  }
                ];
      case 22 :
          let word = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          unicode_fix_cols(lexbuf);
          try {
            return [
                    env,
                    Hashtbl.find(keywords, word)
                  ];
          }
          catch (raw_exn){
            let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
            if (exn.RE_EXN_ID === "Not_found") {
              return [
                      env,
                      "T_IDENTIFIER"
                    ];
            }
            throw exn;
          }
      case 23 :
          return [
                  env,
                  "T_LCURLY"
                ];
      case 24 :
          return [
                  env,
                  "T_RCURLY"
                ];
      case 25 :
          return [
                  env,
                  "T_LPAREN"
                ];
      case 26 :
          return [
                  env,
                  "T_RPAREN"
                ];
      case 27 :
          return [
                  env,
                  "T_LBRACKET"
                ];
      case 28 :
          return [
                  env,
                  "T_RBRACKET"
                ];
      case 29 :
          return [
                  env,
                  "T_ELLIPSIS"
                ];
      case 30 :
          return [
                  env,
                  "T_PERIOD"
                ];
      case 31 :
          return [
                  env,
                  "T_SEMICOLON"
                ];
      case 32 :
          return [
                  env,
                  "T_COMMA"
                ];
      case 33 :
          return [
                  env,
                  "T_COLON"
                ];
      case 34 :
          return [
                  env,
                  "T_PLING"
                ];
      case 35 :
          return [
                  env,
                  "T_AND"
                ];
      case 36 :
          return [
                  env,
                  "T_OR"
                ];
      case 37 :
          return [
                  env,
                  "T_STRICT_EQUAL"
                ];
      case 38 :
          return [
                  env,
                  "T_STRICT_NOT_EQUAL"
                ];
      case 39 :
          return [
                  env,
                  "T_LESS_THAN_EQUAL"
                ];
      case 40 :
          return [
                  env,
                  "T_GREATER_THAN_EQUAL"
                ];
      case 41 :
          return [
                  env,
                  "T_EQUAL"
                ];
      case 42 :
          return [
                  env,
                  "T_NOT_EQUAL"
                ];
      case 43 :
          return [
                  env,
                  "T_INCR"
                ];
      case 44 :
          return [
                  env,
                  "T_DECR"
                ];
      case 45 :
          return [
                  env,
                  "T_LSHIFT_ASSIGN"
                ];
      case 46 :
          return [
                  env,
                  "T_LSHIFT"
                ];
      case 47 :
          return [
                  env,
                  "T_RSHIFT_ASSIGN"
                ];
      case 48 :
          return [
                  env,
                  "T_RSHIFT3_ASSIGN"
                ];
      case 49 :
          return [
                  env,
                  "T_RSHIFT3"
                ];
      case 50 :
          return [
                  env,
                  "T_RSHIFT"
                ];
      case 51 :
          return [
                  env,
                  "T_PLUS_ASSIGN"
                ];
      case 52 :
          return [
                  env,
                  "T_MINUS_ASSIGN"
                ];
      case 53 :
          return [
                  env,
                  "T_MULT_ASSIGN"
                ];
      case 54 :
          return [
                  env,
                  "T_EXP_ASSIGN"
                ];
      case 55 :
          return [
                  env,
                  "T_MOD_ASSIGN"
                ];
      case 56 :
          return [
                  env,
                  "T_BIT_AND_ASSIGN"
                ];
      case 57 :
          return [
                  env,
                  "T_BIT_OR_ASSIGN"
                ];
      case 58 :
          return [
                  env,
                  "T_BIT_XOR_ASSIGN"
                ];
      case 59 :
          return [
                  env,
                  "T_LESS_THAN"
                ];
      case 60 :
          return [
                  env,
                  "T_GREATER_THAN"
                ];
      case 61 :
          return [
                  env,
                  "T_PLUS"
                ];
      case 62 :
          return [
                  env,
                  "T_MINUS"
                ];
      case 63 :
          return [
                  env,
                  "T_MULT"
                ];
      case 64 :
          return [
                  env,
                  "T_EXP"
                ];
      case 65 :
          return [
                  env,
                  "T_MOD"
                ];
      case 66 :
          return [
                  env,
                  "T_BIT_OR"
                ];
      case 67 :
          return [
                  env,
                  "T_BIT_AND"
                ];
      case 68 :
          return [
                  env,
                  "T_BIT_XOR"
                ];
      case 69 :
          return [
                  env,
                  "T_NOT"
                ];
      case 70 :
          return [
                  env,
                  "T_BIT_NOT"
                ];
      case 71 :
          return [
                  env,
                  "T_ASSIGN"
                ];
      case 72 :
          return [
                  env,
                  "T_ARROW"
                ];
      case 73 :
          return [
                  env,
                  "T_DIV_ASSIGN"
                ];
      case 74 :
          return [
                  env,
                  "T_DIV"
                ];
      case 75 :
          return [
                  env,
                  "T_AT"
                ];
      case 76 :
          let env$8;
          if (env.lex_in_comment_syntax) {
            let loc$1 = from_lb(env.lex_source, lexbuf);
            env$8 = lex_error(env, loc$1, "UnexpectedEOS");
          } else {
            env$8 = env;
          }
          return [
                  env$8,
                  "T_EOF"
                ];
      case 77 :
          let env$9 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$9,
                  "T_ERROR"
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
    let w$3 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
    return illegal_number(env, lexbuf, w$3, {
                TAG: "T_NUMBER",
                _0: "NORMAL"
              });
  };
}

function regexp_class(env, buf, lexbuf) {
  let ___ocaml_lex_state = 326;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          return env;
      case 1 :
      case 2 :
          break;
      case 3 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c);
          return env;
      case 4 :
          let c$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c$1);
          return regexp_class(env, buf, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
    let s = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_start_pos + 2 | 0);
    $$Buffer.add_string(buf, s);
    return regexp_class(env, buf, lexbuf);
  };
}

function line_comment(env, buf, lexbuf) {
  let ___ocaml_lex_state = 287;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          return [
                  env,
                  from_lb(env.lex_source, lexbuf)
                ];
      case 1 :
          let match = from_lb(env.lex_source, lexbuf);
          let match$1 = match._end;
          Lexing.new_line(lexbuf);
          let _end_line = match$1.line;
          let _end_column = match$1.column - 1 | 0;
          let _end_offset = match$1.offset - 1 | 0;
          let _end = {
            line: _end_line,
            column: _end_column,
            offset: _end_offset
          };
          return [
                  env,
                  {
                    source: match.source,
                    start: match.start,
                    _end: _end
                  }
                ];
      case 2 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c);
          return line_comment(env, buf, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function template_part(env, start, cooked, raw, literal, lexbuf) {
  let ___ocaml_lex_state = 416;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let env$1 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$1,
                  btwn(start, from_lb(env$1.lex_source, lexbuf)),
                  true
                ];
      case 1 :
          $$Buffer.add_char(literal, /* '`' */96);
          return [
                  env,
                  btwn(start, from_lb(env.lex_source, lexbuf)),
                  true
                ];
      case 2 :
          $$Buffer.add_string(literal, "${");
          return [
                  env,
                  btwn(start, from_lb(env.lex_source, lexbuf)),
                  false
                ];
      case 3 :
          $$Buffer.add_char(raw, /* '\\' */92);
          $$Buffer.add_char(literal, /* '\\' */92);
          let match = string_escape(env, cooked, lexbuf);
          let str = Lexing.lexeme(lexbuf);
          $$Buffer.add_string(raw, str);
          $$Buffer.add_string(literal, str);
          return template_part(match[0], start, cooked, raw, literal, lexbuf);
      case 4 :
          let lf = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_start_pos + 2 | 0);
          $$Buffer.add_string(raw, lf);
          $$Buffer.add_string(literal, lf);
          $$Buffer.add_string(cooked, "\n");
          Lexing.new_line(lexbuf);
          return template_part(env, start, cooked, raw, literal, lexbuf);
      case 5 :
          let lf$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, lf$1);
          $$Buffer.add_char(literal, lf$1);
          $$Buffer.add_char(cooked, /* '\n' */10);
          Lexing.new_line(lexbuf);
          return template_part(env, start, cooked, raw, literal, lexbuf);
      case 6 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, c);
          $$Buffer.add_char(literal, c);
          $$Buffer.add_char(cooked, c);
          return template_part(env, start, cooked, raw, literal, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function string_quote(env, q, buf, raw, octal, lexbuf) {
  let ___ocaml_lex_state = 247;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let q$p = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, q$p);
          if (q === q$p) {
            return [
                    env,
                    from_lb(env.lex_source, lexbuf),
                    octal
                  ];
          } else {
            $$Buffer.add_char(buf, q$p);
            return string_quote(env, q, buf, raw, octal, lexbuf);
          }
      case 1 :
          let e = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, e);
          let match = string_escape(env, buf, lexbuf);
          let octal$1 = match[1] || octal;
          $$Buffer.add_string(raw, Lexing.lexeme(lexbuf));
          return string_quote(match[0], q, buf, raw, octal$1, lexbuf);
      case 2 :
          let x = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, x);
          let env$1 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          $$Buffer.add_string(buf, x);
          return [
                  env$1,
                  from_lb(env$1.lex_source, lexbuf),
                  octal
                ];
      case 3 :
          let x$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, x$1);
          $$Buffer.add_char(buf, x$1);
          return string_quote(env, q, buf, raw, octal, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function comment(env, buf, lexbuf) {
  let ___ocaml_lex_state = 279;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let env$1 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$1,
                  from_lb(env$1.lex_source, lexbuf)
                ];
      case 1 :
          Lexing.new_line(lexbuf);
          $$Buffer.add_char(buf, /* '\n' */10);
          return comment(env, buf, lexbuf);
      case 2 :
          let loc = from_lb(env.lex_source, lexbuf);
          let env$2 = env.lex_in_comment_syntax ? unexpected_error_w_suggest(env, loc, "*/", "*-/") : env;
          return [
                  env$2,
                  loc
                ];
      case 3 :
          if (env.lex_in_comment_syntax) {
            return [
                    env,
                    from_lb(env.lex_source, lexbuf)
                  ];
          } else {
            $$Buffer.add_string(buf, "*-/");
            return comment(env, buf, lexbuf);
          }
      case 4 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c);
          return comment(env, buf, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function type_token(env, lexbuf) {
  lexbuf.lex_mem = Caml_array.make(26, -1);
  Caml_array.set(lexbuf.lex_mem, 17, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 16, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 15, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 14, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 13, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 12, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 11, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 10, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 9, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 8, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 7, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 6, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 5, lexbuf.lex_curr_pos);
  Caml_array.set(lexbuf.lex_mem, 4, lexbuf.lex_curr_pos);
  let ___ocaml_lex_state = 133;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.new_engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          Lexing.new_line(lexbuf);
          return type_token(env, lexbuf);
      case 1 :
          unicode_fix_cols(lexbuf);
          return type_token(env, lexbuf);
      case 2 :
          let start = from_lb(env.lex_source, lexbuf);
          let buf = $$Buffer.create(127);
          let match = comment(env, buf, lexbuf);
          let env$1 = save_comment(match[0], start, match[1], buf, true);
          return type_token(env$1, lexbuf);
      case 3 :
          let sp = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 2 | 0, Caml_array.get(lexbuf.lex_mem, 0));
          let escape_type = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          let pattern = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          if (env.lex_enable_comment_syntax) {
            let env$2;
            if (env.lex_in_comment_syntax) {
              let loc = from_lb(env.lex_source, lexbuf);
              env$2 = unexpected_error(env, loc, pattern);
            } else {
              env$2 = env;
            }
            let env$3 = in_comment_syntax(true, env$2);
            if (escape_type === ":") {
              return [
                      env$3,
                      "T_COLON"
                    ];
            } else {
              return type_token(env$3, lexbuf);
            }
          }
          let start$1 = from_lb(env.lex_source, lexbuf);
          let buf$1 = $$Buffer.create(127);
          $$Buffer.add_string(buf$1, sp);
          $$Buffer.add_string(buf$1, escape_type);
          let match$1 = comment(env, buf$1, lexbuf);
          let env$4 = save_comment(match$1[0], start$1, match$1[1], buf$1, true);
          return type_token(env$4, lexbuf);
      case 4 :
          if (env.lex_in_comment_syntax) {
            let env$5 = in_comment_syntax(false, env);
            return type_token(env$5, lexbuf);
          }
          yyback(1, lexbuf);
          return [
                  env,
                  "T_MULT"
                ];
      case 5 :
          let start$2 = from_lb(env.lex_source, lexbuf);
          let buf$2 = $$Buffer.create(127);
          let match$2 = line_comment(env, buf$2, lexbuf);
          let env$6 = save_comment(match$2[0], start$2, match$2[1], buf$2, true);
          return type_token(env$6, lexbuf);
      case 6 :
          let quote = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let start$3 = from_lb(env.lex_source, lexbuf);
          let buf$3 = $$Buffer.create(127);
          let raw = $$Buffer.create(127);
          $$Buffer.add_char(raw, quote);
          let match$3 = string_quote(env, quote, buf$3, raw, false, lexbuf);
          return [
                  match$3[0],
                  {
                    TAG: "T_STRING",
                    _0: [
                      btwn(start$3, match$3[1]),
                      $$Buffer.contents(buf$3),
                      $$Buffer.contents(raw),
                      match$3[2]
                    ]
                  }
                ];
      case 7 :
          let neg = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w, mk_num_singleton("BINARY", num, neg));
      case 8 :
          let neg$1 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$1 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return [
                  env,
                  mk_num_singleton("BINARY", num$1, neg$1)
                ];
      case 9 :
          let neg$2 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$2 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w$1 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$1, mk_num_singleton("OCTAL", num$2, neg$2));
      case 10 :
          let neg$3 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$3 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return [
                  env,
                  mk_num_singleton("OCTAL", num$3, neg$3)
                ];
      case 11 :
          let neg$4 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$4 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w$2 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$2, mk_num_singleton("LEGACY_OCTAL", num$4, neg$4));
      case 12 :
          let neg$5 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$5 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return [
                  env,
                  mk_num_singleton("LEGACY_OCTAL", num$5, neg$5)
                ];
      case 13 :
          let neg$6 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$6 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w$3 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          let match$4;
          try {
            match$4 = [
              env,
              mk_num_singleton("NORMAL", num$6, neg$6)
            ];
          }
          catch (exn){
            if (Sys.win32) {
              let loc$1 = from_lb(env.lex_source, lexbuf);
              let env$7 = lex_error(env, loc$1, "WindowsFloatOfString");
              match$4 = [
                env$7,
                {
                  TAG: "T_NUMBER_SINGLETON_TYPE",
                  _0: "NORMAL",
                  _1: 789.0
                }
              ];
            } else {
              throw exn;
            }
          }
          return illegal_number(match$4[0], lexbuf, w$3, match$4[1]);
      case 14 :
          let neg$7 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$7 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          try {
            return [
                    env,
                    mk_num_singleton("NORMAL", num$7, neg$7)
                  ];
          }
          catch (exn$1){
            if (Sys.win32) {
              let loc$2 = from_lb(env.lex_source, lexbuf);
              let env$8 = lex_error(env, loc$2, "WindowsFloatOfString");
              return [
                      env$8,
                      {
                        TAG: "T_NUMBER_SINGLETON_TYPE",
                        _0: "NORMAL",
                        _1: 789.0
                      }
                    ];
            }
            throw exn$1;
          }
      case 15 :
          let neg$8 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$8 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w$4 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$4, mk_num_singleton("NORMAL", num$8, neg$8));
      case 16 :
          let neg$9 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$9 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), lexbuf.lex_curr_pos);
          return [
                  env,
                  mk_num_singleton("NORMAL", num$9, neg$9)
                ];
      case 17 :
          let neg$10 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, Caml_array.get(lexbuf.lex_mem, 0));
          let num$10 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 0), Caml_array.get(lexbuf.lex_mem, 1));
          let w$5 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), lexbuf.lex_curr_pos);
          return illegal_number(env, lexbuf, w$5, mk_num_singleton("NORMAL", num$10, neg$10));
      case 18 :
          let neg$11 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 1), Caml_array.get(lexbuf.lex_mem, 0));
          let num$11 = Lexing.sub_lexeme(lexbuf, Caml_array.get(lexbuf.lex_mem, 3), Caml_array.get(lexbuf.lex_mem, 2));
          return [
                  env,
                  mk_num_singleton("NORMAL", num$11, neg$11)
                ];
      case 19 :
          let word = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          unicode_fix_cols(lexbuf);
          try {
            return [
                    env,
                    Hashtbl.find(type_keywords, word)
                  ];
          }
          catch (raw_exn){
            let exn$2 = Caml_js_exceptions.internalToOCamlException(raw_exn);
            if (exn$2.RE_EXN_ID === "Not_found") {
              return [
                      env,
                      "T_IDENTIFIER"
                    ];
            }
            throw exn$2;
          }
      case 22 :
          return [
                  env,
                  "T_LCURLY"
                ];
      case 23 :
          return [
                  env,
                  "T_RCURLY"
                ];
      case 24 :
          return [
                  env,
                  "T_LPAREN"
                ];
      case 25 :
          return [
                  env,
                  "T_RPAREN"
                ];
      case 26 :
          return [
                  env,
                  "T_ELLIPSIS"
                ];
      case 27 :
          return [
                  env,
                  "T_PERIOD"
                ];
      case 28 :
          return [
                  env,
                  "T_SEMICOLON"
                ];
      case 29 :
          return [
                  env,
                  "T_COMMA"
                ];
      case 20 :
      case 32 :
          return [
                  env,
                  "T_LBRACKET"
                ];
      case 21 :
      case 33 :
          return [
                  env,
                  "T_RBRACKET"
                ];
      case 34 :
          return [
                  env,
                  "T_LESS_THAN"
                ];
      case 35 :
          return [
                  env,
                  "T_GREATER_THAN"
                ];
      case 31 :
      case 37 :
          return [
                  env,
                  "T_PLING"
                ];
      case 38 :
          return [
                  env,
                  "T_MULT"
                ];
      case 30 :
      case 39 :
          return [
                  env,
                  "T_COLON"
                ];
      case 40 :
          return [
                  env,
                  "T_BIT_OR"
                ];
      case 41 :
          return [
                  env,
                  "T_BIT_AND"
                ];
      case 42 :
          return [
                  env,
                  "T_TYPEOF"
                ];
      case 43 :
          return [
                  env,
                  "T_ARROW"
                ];
      case 36 :
      case 44 :
          return [
                  env,
                  "T_ASSIGN"
                ];
      case 45 :
          return [
                  env,
                  "T_PLUS"
                ];
      case 46 :
          return [
                  env,
                  "T_MINUS"
                ];
      case 47 :
          let env$9;
          if (env.lex_in_comment_syntax) {
            let loc$3 = from_lb(env.lex_source, lexbuf);
            env$9 = lex_error(env, loc$3, "UnexpectedEOS");
          } else {
            env$9 = env;
          }
          return [
                  env$9,
                  "T_EOF"
                ];
      case 48 :
          return [
                  env,
                  "T_ERROR"
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function __ocaml_lex_template_tail_rec(_env, lexbuf, ___ocaml_lex_state) {
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let env = _env;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          Lexing.new_line(lexbuf);
          ___ocaml_lex_state = 393;
          continue ;
      case 1 :
          unicode_fix_cols(lexbuf);
          ___ocaml_lex_state = 393;
          continue ;
      case 2 :
          let start = from_lb(env.lex_source, lexbuf);
          let buf = $$Buffer.create(127);
          let match = line_comment(env, buf, lexbuf);
          let env$1 = save_comment(match[0], start, match[1], buf, true);
          ___ocaml_lex_state = 393;
          _env = env$1;
          continue ;
      case 3 :
          let start$1 = from_lb(env.lex_source, lexbuf);
          let buf$1 = $$Buffer.create(127);
          let match$1 = comment(env, buf$1, lexbuf);
          let env$2 = save_comment(match$1[0], start$1, match$1[1], buf$1, true);
          ___ocaml_lex_state = 393;
          _env = env$2;
          continue ;
      case 4 :
          let start$2 = from_lb(env.lex_source, lexbuf);
          let cooked = $$Buffer.create(127);
          let raw = $$Buffer.create(127);
          let literal = $$Buffer.create(127);
          $$Buffer.add_string(literal, "}");
          let match$2 = template_part(env, start$2, cooked, raw, literal, lexbuf);
          return [
                  match$2[0],
                  {
                    TAG: "T_TEMPLATE_PART",
                    _0: [
                      match$2[1],
                      {
                        cooked: $$Buffer.contents(cooked),
                        raw: $$Buffer.contents(raw),
                        literal: $$Buffer.contents(literal)
                      },
                      match$2[2]
                    ]
                  }
                ];
      case 5 :
          let env$3 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$3,
                  {
                    TAG: "T_TEMPLATE_PART",
                    _0: [
                      from_lb(env$3.lex_source, lexbuf),
                      {
                        cooked: "",
                        raw: "",
                        literal: ""
                      },
                      true
                    ]
                  }
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function jsx_text(env, mode, buf, raw, lexbuf) {
  let ___ocaml_lex_state = 371;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          switch (mode) {
            case "JSX_SINGLE_QUOTED_TEXT" :
                if (c === 39) {
                  return [
                          env,
                          from_lb(env.lex_source, lexbuf)
                        ];
                }
                break;
            case "JSX_DOUBLE_QUOTED_TEXT" :
                if (c === 34) {
                  return [
                          env,
                          from_lb(env.lex_source, lexbuf)
                        ];
                }
                break;
            case "JSX_CHILD_TEXT" :
                let exit = 0;
                if (!(c !== 60 && c !== 123)) {
                  exit = 2;
                }
                if (exit === 2) {
                  back(lexbuf);
                  return [
                          env,
                          from_lb(env.lex_source, lexbuf)
                        ];
                }
                break;
            
          }
          $$Buffer.add_char(raw, c);
          $$Buffer.add_char(buf, c);
          return jsx_text(env, mode, buf, raw, lexbuf);
      case 1 :
          let env$1 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$1,
                  from_lb(env$1.lex_source, lexbuf)
                ];
      case 2 :
          let lt = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, lt);
          $$Buffer.add_string(buf, lt);
          Lexing.new_line(lexbuf);
          return jsx_text(env, mode, buf, raw, lexbuf);
      case 3 :
          let n = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 3 | 0, lexbuf.lex_curr_pos - 1 | 0);
          let s = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, s);
          let code = Caml_format.int_of_string("0x" + n);
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code));
          return jsx_text(env, mode, buf, raw, lexbuf);
      case 4 :
          let n$1 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 2 | 0, lexbuf.lex_curr_pos - 1 | 0);
          let s$1 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, s$1);
          let code$1 = Caml_format.int_of_string(n$1);
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code$1));
          return jsx_text(env, mode, buf, raw, lexbuf);
      case 5 :
          let entity = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 1 | 0, lexbuf.lex_curr_pos - 1 | 0);
          let s$2 = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, s$2);
          let code$2;
          switch (entity) {
            case "'int'" :
                code$2 = 8747;
                break;
            case "AElig" :
                code$2 = 198;
                break;
            case "Aacute" :
                code$2 = 193;
                break;
            case "Acirc" :
                code$2 = 194;
                break;
            case "Agrave" :
                code$2 = 192;
                break;
            case "Alpha" :
                code$2 = 913;
                break;
            case "Aring" :
                code$2 = 197;
                break;
            case "Atilde" :
                code$2 = 195;
                break;
            case "Auml" :
                code$2 = 196;
                break;
            case "Beta" :
                code$2 = 914;
                break;
            case "Ccedil" :
                code$2 = 199;
                break;
            case "Chi" :
                code$2 = 935;
                break;
            case "Dagger" :
                code$2 = 8225;
                break;
            case "Delta" :
                code$2 = 916;
                break;
            case "ETH" :
                code$2 = 208;
                break;
            case "Eacute" :
                code$2 = 201;
                break;
            case "Ecirc" :
                code$2 = 202;
                break;
            case "Egrave" :
                code$2 = 200;
                break;
            case "Epsilon" :
                code$2 = 917;
                break;
            case "Eta" :
                code$2 = 919;
                break;
            case "Euml" :
                code$2 = 203;
                break;
            case "Gamma" :
                code$2 = 915;
                break;
            case "Iacute" :
                code$2 = 205;
                break;
            case "Icirc" :
                code$2 = 206;
                break;
            case "Igrave" :
                code$2 = 204;
                break;
            case "Iota" :
                code$2 = 921;
                break;
            case "Iuml" :
                code$2 = 207;
                break;
            case "Kappa" :
                code$2 = 922;
                break;
            case "Lambda" :
                code$2 = 923;
                break;
            case "Mu" :
                code$2 = 924;
                break;
            case "Ntilde" :
                code$2 = 209;
                break;
            case "Nu" :
                code$2 = 925;
                break;
            case "OElig" :
                code$2 = 338;
                break;
            case "Oacute" :
                code$2 = 211;
                break;
            case "Ocirc" :
                code$2 = 212;
                break;
            case "Ograve" :
                code$2 = 210;
                break;
            case "Omega" :
                code$2 = 937;
                break;
            case "Omicron" :
                code$2 = 927;
                break;
            case "Oslash" :
                code$2 = 216;
                break;
            case "Otilde" :
                code$2 = 213;
                break;
            case "Ouml" :
                code$2 = 214;
                break;
            case "Phi" :
                code$2 = 934;
                break;
            case "Pi" :
                code$2 = 928;
                break;
            case "Prime" :
                code$2 = 8243;
                break;
            case "Psi" :
                code$2 = 936;
                break;
            case "Rho" :
                code$2 = 929;
                break;
            case "Scaron" :
                code$2 = 352;
                break;
            case "Sigma" :
                code$2 = 931;
                break;
            case "THORN" :
                code$2 = 222;
                break;
            case "Tau" :
                code$2 = 932;
                break;
            case "Theta" :
                code$2 = 920;
                break;
            case "Uacute" :
                code$2 = 218;
                break;
            case "Ucirc" :
                code$2 = 219;
                break;
            case "Ugrave" :
                code$2 = 217;
                break;
            case "Upsilon" :
                code$2 = 933;
                break;
            case "Uuml" :
                code$2 = 220;
                break;
            case "Xi" :
                code$2 = 926;
                break;
            case "Yacute" :
                code$2 = 221;
                break;
            case "Yuml" :
                code$2 = 376;
                break;
            case "Zeta" :
                code$2 = 918;
                break;
            case "aacute" :
                code$2 = 225;
                break;
            case "acirc" :
                code$2 = 226;
                break;
            case "acute" :
                code$2 = 180;
                break;
            case "aelig" :
                code$2 = 230;
                break;
            case "agrave" :
                code$2 = 224;
                break;
            case "alefsym" :
                code$2 = 8501;
                break;
            case "alpha" :
                code$2 = 945;
                break;
            case "amp" :
                code$2 = 38;
                break;
            case "and" :
                code$2 = 8743;
                break;
            case "ang" :
                code$2 = 8736;
                break;
            case "apos" :
                code$2 = 39;
                break;
            case "aring" :
                code$2 = 229;
                break;
            case "asymp" :
                code$2 = 8776;
                break;
            case "atilde" :
                code$2 = 227;
                break;
            case "auml" :
                code$2 = 228;
                break;
            case "bdquo" :
                code$2 = 8222;
                break;
            case "beta" :
                code$2 = 946;
                break;
            case "brvbar" :
                code$2 = 166;
                break;
            case "bull" :
                code$2 = 8226;
                break;
            case "cap" :
                code$2 = 8745;
                break;
            case "ccedil" :
                code$2 = 231;
                break;
            case "cedil" :
                code$2 = 184;
                break;
            case "cent" :
                code$2 = 162;
                break;
            case "chi" :
                code$2 = 967;
                break;
            case "circ" :
                code$2 = 710;
                break;
            case "clubs" :
                code$2 = 9827;
                break;
            case "cong" :
                code$2 = 8773;
                break;
            case "copy" :
                code$2 = 169;
                break;
            case "crarr" :
                code$2 = 8629;
                break;
            case "cup" :
                code$2 = 8746;
                break;
            case "curren" :
                code$2 = 164;
                break;
            case "dArr" :
                code$2 = 8659;
                break;
            case "dagger" :
                code$2 = 8224;
                break;
            case "darr" :
                code$2 = 8595;
                break;
            case "deg" :
                code$2 = 176;
                break;
            case "delta" :
                code$2 = 948;
                break;
            case "diams" :
                code$2 = 9830;
                break;
            case "divide" :
                code$2 = 247;
                break;
            case "eacute" :
                code$2 = 233;
                break;
            case "ecirc" :
                code$2 = 234;
                break;
            case "egrave" :
                code$2 = 232;
                break;
            case "empty" :
                code$2 = 8709;
                break;
            case "emsp" :
                code$2 = 8195;
                break;
            case "ensp" :
                code$2 = 8194;
                break;
            case "epsilon" :
                code$2 = 949;
                break;
            case "equiv" :
                code$2 = 8801;
                break;
            case "eta" :
                code$2 = 951;
                break;
            case "eth" :
                code$2 = 240;
                break;
            case "euml" :
                code$2 = 235;
                break;
            case "euro" :
                code$2 = 8364;
                break;
            case "exist" :
                code$2 = 8707;
                break;
            case "fnof" :
                code$2 = 402;
                break;
            case "forall" :
                code$2 = 8704;
                break;
            case "frac12" :
                code$2 = 189;
                break;
            case "frac14" :
                code$2 = 188;
                break;
            case "frac34" :
                code$2 = 190;
                break;
            case "frasl" :
                code$2 = 8260;
                break;
            case "gamma" :
                code$2 = 947;
                break;
            case "ge" :
                code$2 = 8805;
                break;
            case "gt" :
                code$2 = 62;
                break;
            case "hArr" :
                code$2 = 8660;
                break;
            case "harr" :
                code$2 = 8596;
                break;
            case "hearts" :
                code$2 = 9829;
                break;
            case "hellip" :
                code$2 = 8230;
                break;
            case "iacute" :
                code$2 = 237;
                break;
            case "icirc" :
                code$2 = 238;
                break;
            case "iexcl" :
                code$2 = 161;
                break;
            case "igrave" :
                code$2 = 236;
                break;
            case "image" :
                code$2 = 8465;
                break;
            case "infin" :
                code$2 = 8734;
                break;
            case "iota" :
                code$2 = 953;
                break;
            case "iquest" :
                code$2 = 191;
                break;
            case "isin" :
                code$2 = 8712;
                break;
            case "iuml" :
                code$2 = 239;
                break;
            case "kappa" :
                code$2 = 954;
                break;
            case "lArr" :
                code$2 = 8656;
                break;
            case "lambda" :
                code$2 = 955;
                break;
            case "lang" :
                code$2 = 10216;
                break;
            case "laquo" :
                code$2 = 171;
                break;
            case "larr" :
                code$2 = 8592;
                break;
            case "lceil" :
                code$2 = 8968;
                break;
            case "ldquo" :
                code$2 = 8220;
                break;
            case "le" :
                code$2 = 8804;
                break;
            case "lfloor" :
                code$2 = 8970;
                break;
            case "lowast" :
                code$2 = 8727;
                break;
            case "loz" :
                code$2 = 9674;
                break;
            case "lrm" :
                code$2 = 8206;
                break;
            case "lsaquo" :
                code$2 = 8249;
                break;
            case "lsquo" :
                code$2 = 8216;
                break;
            case "lt" :
                code$2 = 60;
                break;
            case "macr" :
                code$2 = 175;
                break;
            case "mdash" :
                code$2 = 8212;
                break;
            case "micro" :
                code$2 = 181;
                break;
            case "middot" :
                code$2 = 183;
                break;
            case "minus" :
                code$2 = 8722;
                break;
            case "mu" :
                code$2 = 956;
                break;
            case "nabla" :
                code$2 = 8711;
                break;
            case "nbsp" :
                code$2 = 160;
                break;
            case "ndash" :
                code$2 = 8211;
                break;
            case "ne" :
                code$2 = 8800;
                break;
            case "ni" :
                code$2 = 8715;
                break;
            case "not" :
                code$2 = 172;
                break;
            case "notin" :
                code$2 = 8713;
                break;
            case "nsub" :
                code$2 = 8836;
                break;
            case "ntilde" :
                code$2 = 241;
                break;
            case "nu" :
                code$2 = 957;
                break;
            case "oacute" :
                code$2 = 243;
                break;
            case "ocirc" :
                code$2 = 244;
                break;
            case "oelig" :
                code$2 = 339;
                break;
            case "ograve" :
                code$2 = 242;
                break;
            case "oline" :
                code$2 = 8254;
                break;
            case "omega" :
                code$2 = 969;
                break;
            case "omicron" :
                code$2 = 959;
                break;
            case "oplus" :
                code$2 = 8853;
                break;
            case "or" :
                code$2 = 8744;
                break;
            case "ordf" :
                code$2 = 170;
                break;
            case "ordm" :
                code$2 = 186;
                break;
            case "oslash" :
                code$2 = 248;
                break;
            case "otilde" :
                code$2 = 245;
                break;
            case "otimes" :
                code$2 = 8855;
                break;
            case "ouml" :
                code$2 = 246;
                break;
            case "para" :
                code$2 = 182;
                break;
            case "part" :
                code$2 = 8706;
                break;
            case "permil" :
                code$2 = 8240;
                break;
            case "perp" :
                code$2 = 8869;
                break;
            case "phi" :
                code$2 = 966;
                break;
            case "pi" :
                code$2 = 960;
                break;
            case "piv" :
                code$2 = 982;
                break;
            case "plusmn" :
                code$2 = 177;
                break;
            case "pound" :
                code$2 = 163;
                break;
            case "prime" :
                code$2 = 8242;
                break;
            case "prod" :
                code$2 = 8719;
                break;
            case "prop" :
                code$2 = 8733;
                break;
            case "psi" :
                code$2 = 968;
                break;
            case "quot" :
                code$2 = 34;
                break;
            case "rArr" :
                code$2 = 8658;
                break;
            case "radic" :
                code$2 = 8730;
                break;
            case "rang" :
                code$2 = 10217;
                break;
            case "raquo" :
                code$2 = 187;
                break;
            case "rarr" :
                code$2 = 8594;
                break;
            case "rceil" :
                code$2 = 8969;
                break;
            case "rdquo" :
                code$2 = 8221;
                break;
            case "real" :
                code$2 = 8476;
                break;
            case "reg" :
                code$2 = 174;
                break;
            case "rfloor" :
                code$2 = 8971;
                break;
            case "rho" :
                code$2 = 961;
                break;
            case "rlm" :
                code$2 = 8207;
                break;
            case "rsaquo" :
                code$2 = 8250;
                break;
            case "rsquo" :
                code$2 = 8217;
                break;
            case "sbquo" :
                code$2 = 8218;
                break;
            case "scaron" :
                code$2 = 353;
                break;
            case "sdot" :
                code$2 = 8901;
                break;
            case "sect" :
                code$2 = 167;
                break;
            case "shy" :
                code$2 = 173;
                break;
            case "sigma" :
                code$2 = 963;
                break;
            case "sigmaf" :
                code$2 = 962;
                break;
            case "sim" :
                code$2 = 8764;
                break;
            case "spades" :
                code$2 = 9824;
                break;
            case "sub" :
                code$2 = 8834;
                break;
            case "sube" :
                code$2 = 8838;
                break;
            case "sum" :
                code$2 = 8721;
                break;
            case "sup" :
                code$2 = 8835;
                break;
            case "sup1" :
                code$2 = 185;
                break;
            case "sup2" :
                code$2 = 178;
                break;
            case "sup3" :
                code$2 = 179;
                break;
            case "supe" :
                code$2 = 8839;
                break;
            case "szlig" :
                code$2 = 223;
                break;
            case "tau" :
                code$2 = 964;
                break;
            case "there4" :
                code$2 = 8756;
                break;
            case "theta" :
                code$2 = 952;
                break;
            case "thetasym" :
                code$2 = 977;
                break;
            case "thinsp" :
                code$2 = 8201;
                break;
            case "thorn" :
                code$2 = 254;
                break;
            case "tilde" :
                code$2 = 732;
                break;
            case "times" :
                code$2 = 215;
                break;
            case "trade" :
                code$2 = 8482;
                break;
            case "uArr" :
                code$2 = 8657;
                break;
            case "uacute" :
                code$2 = 250;
                break;
            case "uarr" :
                code$2 = 8593;
                break;
            case "ucirc" :
                code$2 = 251;
                break;
            case "ugrave" :
                code$2 = 249;
                break;
            case "uml" :
                code$2 = 168;
                break;
            case "upsih" :
                code$2 = 978;
                break;
            case "upsilon" :
                code$2 = 965;
                break;
            case "uuml" :
                code$2 = 252;
                break;
            case "weierp" :
                code$2 = 8472;
                break;
            case "xi" :
                code$2 = 958;
                break;
            case "yacute" :
                code$2 = 253;
                break;
            case "yen" :
                code$2 = 165;
                break;
            case "yuml" :
                code$2 = 255;
                break;
            case "zeta" :
                code$2 = 950;
                break;
            case "zwj" :
                code$2 = 8205;
                break;
            case "zwnj" :
                code$2 = 8204;
                break;
            default:
              code$2 = undefined;
          }
          if (code$2 !== undefined) {
            List.iter((function (param) {
                    return $$Buffer.add_char(buf, param);
                  }), utf16to8(code$2));
          } else {
            $$Buffer.add_string(buf, "&" + (entity + ";"));
          }
          return jsx_text(env, mode, buf, raw, lexbuf);
      case 6 :
          let c$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, c$1);
          $$Buffer.add_char(buf, c$1);
          return jsx_text(env, mode, buf, raw, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function string_escape(env, buf, lexbuf) {
  let ___ocaml_lex_state = 252;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          return [
                  env,
                  false
                ];
      case 1 :
          $$Buffer.add_string(buf, "\\");
          return [
                  env,
                  false
                ];
      case 2 :
          let a = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 1 | 0);
          let b = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 2 | 0);
          let code = (hexa_to_int(a) << 4) + hexa_to_int(b) | 0;
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code));
          return [
                  env,
                  false
                ];
      case 3 :
          let a$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let b$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 1 | 0);
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 2 | 0);
          let code$1 = ((oct_to_int(a$1) << 6) + (oct_to_int(b$1) << 3) | 0) + oct_to_int(c) | 0;
          if (code$1 < 256) {
            List.iter((function (param) {
                    return $$Buffer.add_char(buf, param);
                  }), utf16to8(code$1));
          } else {
            let code$2 = (oct_to_int(a$1) << 3) + oct_to_int(b$1) | 0;
            List.iter((function (param) {
                    return $$Buffer.add_char(buf, param);
                  }), utf16to8(code$2));
            $$Buffer.add_char(buf, c);
          }
          return [
                  env,
                  true
                ];
      case 4 :
          let a$2 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let b$2 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 1 | 0);
          let code$3 = (oct_to_int(a$2) << 3) + oct_to_int(b$2) | 0;
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code$3));
          return [
                  env,
                  true
                ];
      case 5 :
          $$Buffer.add_char(buf, Char.chr(0));
          return [
                  env,
                  false
                ];
      case 6 :
          $$Buffer.add_char(buf, Char.chr(8));
          return [
                  env,
                  false
                ];
      case 7 :
          $$Buffer.add_char(buf, Char.chr(12));
          return [
                  env,
                  false
                ];
      case 8 :
          $$Buffer.add_char(buf, Char.chr(10));
          return [
                  env,
                  false
                ];
      case 9 :
          $$Buffer.add_char(buf, Char.chr(13));
          return [
                  env,
                  false
                ];
      case 10 :
          $$Buffer.add_char(buf, Char.chr(9));
          return [
                  env,
                  false
                ];
      case 11 :
          $$Buffer.add_char(buf, Char.chr(11));
          return [
                  env,
                  false
                ];
      case 12 :
          let a$3 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let code$4 = oct_to_int(a$3);
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code$4));
          return [
                  env,
                  true
                ];
      case 13 :
          let a$4 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 1 | 0);
          let b$3 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 2 | 0);
          let c$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 3 | 0);
          let d = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos + 4 | 0);
          let code$5 = (((hexa_to_int(a$4) << 12) + (hexa_to_int(b$3) << 8) | 0) + (hexa_to_int(c$1) << 4) | 0) + hexa_to_int(d) | 0;
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code$5));
          return [
                  env,
                  false
                ];
      case 14 :
          let hex_code = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 2 | 0, lexbuf.lex_curr_pos - 1 | 0);
          let code$6 = Caml_format.int_of_string("0x" + hex_code);
          let env$1 = code$6 > 1114111 ? lex_error(env, from_lb(env.lex_source, lexbuf), {
                  TAG: "UnexpectedToken",
                  _0: "ILLEGAL"
                }) : env;
          List.iter((function (param) {
                  return $$Buffer.add_char(buf, param);
                }), utf16to8(code$6));
          return [
                  env$1,
                  false
                ];
      case 15 :
          let c$2 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let env$2 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          $$Buffer.add_char(buf, c$2);
          return [
                  env$2,
                  false
                ];
      case 16 :
          Lexing.new_line(lexbuf);
          return [
                  env,
                  false
                ];
      case 17 :
          let c$3 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c$3);
          return [
                  env,
                  false
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function __ocaml_lex_jsx_tag_rec(_env, lexbuf, ___ocaml_lex_state) {
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let env = _env;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          return [
                  env,
                  "T_EOF"
                ];
      case 1 :
          Lexing.new_line(lexbuf);
          ___ocaml_lex_state = 333;
          continue ;
      case 2 :
          unicode_fix_cols(lexbuf);
          ___ocaml_lex_state = 333;
          continue ;
      case 3 :
          let start = from_lb(env.lex_source, lexbuf);
          let buf = $$Buffer.create(127);
          let match = line_comment(env, buf, lexbuf);
          let env$1 = save_comment(match[0], start, match[1], buf, true);
          ___ocaml_lex_state = 333;
          _env = env$1;
          continue ;
      case 4 :
          let start$1 = from_lb(env.lex_source, lexbuf);
          let buf$1 = $$Buffer.create(127);
          let match$1 = comment(env, buf$1, lexbuf);
          let env$2 = save_comment(match$1[0], start$1, match$1[1], buf$1, true);
          ___ocaml_lex_state = 333;
          _env = env$2;
          continue ;
      case 5 :
          return [
                  env,
                  "T_LESS_THAN"
                ];
      case 6 :
          return [
                  env,
                  "T_DIV"
                ];
      case 7 :
          return [
                  env,
                  "T_GREATER_THAN"
                ];
      case 8 :
          return [
                  env,
                  "T_LCURLY"
                ];
      case 9 :
          return [
                  env,
                  "T_COLON"
                ];
      case 10 :
          return [
                  env,
                  "T_PERIOD"
                ];
      case 11 :
          return [
                  env,
                  "T_ASSIGN"
                ];
      case 12 :
          unicode_fix_cols(lexbuf);
          return [
                  env,
                  "T_JSX_IDENTIFIER"
                ];
      case 13 :
          let quote = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          let start$2 = from_lb(env.lex_source, lexbuf);
          let buf$2 = $$Buffer.create(127);
          let raw = $$Buffer.create(127);
          $$Buffer.add_char(raw, quote);
          let mode = quote === /* '\'' */39 ? "JSX_SINGLE_QUOTED_TEXT" : "JSX_DOUBLE_QUOTED_TEXT";
          let match$2 = jsx_text(env, mode, buf$2, raw, lexbuf);
          $$Buffer.add_char(raw, quote);
          let value = $$Buffer.contents(buf$2);
          let raw$1 = $$Buffer.contents(raw);
          return [
                  match$2[0],
                  {
                    TAG: "T_JSX_TEXT",
                    _0: [
                      btwn(start$2, match$2[1]),
                      value,
                      raw$1
                    ]
                  }
                ];
      case 14 :
          return [
                  env,
                  "T_ERROR"
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function __ocaml_lex_regexp_rec(_env, lexbuf, ___ocaml_lex_state) {
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let env = _env;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          return [
                  env,
                  "T_EOF"
                ];
      case 1 :
          Lexing.new_line(lexbuf);
          ___ocaml_lex_state = 291;
          continue ;
      case 2 :
          unicode_fix_cols(lexbuf);
          ___ocaml_lex_state = 291;
          continue ;
      case 3 :
          let start = from_lb(env.lex_source, lexbuf);
          let buf = $$Buffer.create(127);
          let match = line_comment(env, buf, lexbuf);
          let env$1 = save_comment(match[0], start, match[1], buf, true);
          ___ocaml_lex_state = 291;
          _env = env$1;
          continue ;
      case 4 :
          let start$1 = from_lb(env.lex_source, lexbuf);
          let buf$1 = $$Buffer.create(127);
          let match$1 = comment(env, buf$1, lexbuf);
          let env$2 = save_comment(match$1[0], start$1, match$1[1], buf$1, true);
          ___ocaml_lex_state = 291;
          _env = env$2;
          continue ;
      case 5 :
          let start$2 = from_lb(env.lex_source, lexbuf);
          let buf$2 = $$Buffer.create(127);
          let match$2 = regexp_body(env, buf$2, lexbuf);
          let env$3 = match$2[0];
          let end_ = from_lb(env$3.lex_source, lexbuf);
          let loc = btwn(start$2, end_);
          return [
                  env$3,
                  {
                    TAG: "T_REGEXP",
                    _0: [
                      loc,
                      $$Buffer.contents(buf$2),
                      match$2[1]
                    ]
                  }
                ];
      case 6 :
          let env$4 = lex_error(env, from_lb(env.lex_source, lexbuf), {
                TAG: "UnexpectedToken",
                _0: "ILLEGAL"
              });
          return [
                  env$4,
                  "T_ERROR"
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function regexp_body(env, buf, lexbuf) {
  let ___ocaml_lex_state = 314;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let loc = from_lb(env.lex_source, lexbuf);
          let env$1 = lex_error(env, loc, "UnterminatedRegExp");
          return [
                  env$1,
                  ""
                ];
      case 1 :
          let loc$1 = from_lb(env.lex_source, lexbuf);
          let env$2 = lex_error(env, loc$1, "UnterminatedRegExp");
          return [
                  env$2,
                  ""
                ];
      case 2 :
          let s = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_start_pos + 2 | 0);
          $$Buffer.add_string(buf, s);
          return regexp_body(env, buf, lexbuf);
      case 3 :
          let flags = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos + 1 | 0, lexbuf.lex_curr_pos);
          return [
                  env,
                  flags
                ];
      case 4 :
          return [
                  env,
                  ""
                ];
      case 5 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c);
          let env$3 = regexp_class(env, buf, lexbuf);
          return regexp_body(env$3, buf, lexbuf);
      case 6 :
          let loc$2 = from_lb(env.lex_source, lexbuf);
          let env$4 = lex_error(env, loc$2, "UnterminatedRegExp");
          return [
                  env$4,
                  ""
                ];
      case 7 :
          let c$1 = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(buf, c$1);
          return regexp_body(env, buf, lexbuf);
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function jsx_child(env, start, buf, raw, lexbuf) {
  let ___ocaml_lex_state = 364;
  while(true) {
    let __ocaml_lex_state = ___ocaml_lex_state;
    let __ocaml_lex_state$1 = Lexing.engine(__ocaml_lex_tables, __ocaml_lex_state, lexbuf);
    switch (__ocaml_lex_state$1) {
      case 0 :
          let lt = Lexing.sub_lexeme(lexbuf, lexbuf.lex_start_pos, lexbuf.lex_curr_pos);
          $$Buffer.add_string(raw, lt);
          $$Buffer.add_string(buf, lt);
          Lexing.new_line(lexbuf);
          let match = jsx_text(env, "JSX_CHILD_TEXT", buf, raw, lexbuf);
          let value = $$Buffer.contents(buf);
          let raw$1 = $$Buffer.contents(raw);
          return [
                  match[0],
                  {
                    TAG: "T_JSX_TEXT",
                    _0: [
                      btwn(start, match[1]),
                      value,
                      raw$1
                    ]
                  }
                ];
      case 1 :
          return [
                  env,
                  "T_EOF"
                ];
      case 2 :
          return [
                  env,
                  "T_LESS_THAN"
                ];
      case 3 :
          return [
                  env,
                  "T_LCURLY"
                ];
      case 4 :
          let c = Caml_bytes.get(lexbuf.lex_buffer, lexbuf.lex_start_pos);
          $$Buffer.add_char(raw, c);
          $$Buffer.add_char(buf, c);
          let match$1 = jsx_text(env, "JSX_CHILD_TEXT", buf, raw, lexbuf);
          let value$1 = $$Buffer.contents(buf);
          let raw$2 = $$Buffer.contents(raw);
          return [
                  match$1[0],
                  {
                    TAG: "T_JSX_TEXT",
                    _0: [
                      btwn(start, match$1[1]),
                      value$1,
                      raw$2
                    ]
                  }
                ];
      default:
        Curry._1(lexbuf.refill_buff, lexbuf);
        ___ocaml_lex_state = __ocaml_lex_state$1;
        continue ;
    }
  };
}

function regexp(env) {
  return get_result_and_clear_state(__ocaml_lex_regexp_rec(env, env.lex_lb, 291));
}

function jsx_child$1(env) {
  let start = from_curr_lb(env.lex_source, env.lex_lb);
  let buf = $$Buffer.create(127);
  let raw = $$Buffer.create(127);
  let match = jsx_child(env, start, buf, raw, env.lex_lb);
  return get_result_and_clear_state([
              match[0],
              match[1]
            ]);
}

function jsx_tag(env) {
  return get_result_and_clear_state(__ocaml_lex_jsx_tag_rec(env, env.lex_lb, 333));
}

function template_tail(env) {
  return get_result_and_clear_state(__ocaml_lex_template_tail_rec(env, env.lex_lb, 393));
}

function type_token$1(env) {
  return get_result_and_clear_state(type_token(env, env.lex_lb));
}

function token$1(env) {
  return get_result_and_clear_state(token(env, env.lex_lb));
}

function height(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  return {
          TAG: "Node",
          l: l,
          v: v,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let lv = l.v;
    let ll = l.l;
    if (height(ll) >= height(lr)) {
      return create(ll, lv, create(lr, v, r));
    }
    if (typeof lr === "object") {
      return create(create(ll, lv, lr.l), lr.v, create(lr.r, v, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            l: l,
            v: v,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rv = r.v;
  let rl = r.l;
  if (height(rr) >= height(rl)) {
    return create(create(l, v, rl), rv, rr);
  }
  if (typeof rl === "object") {
    return create(create(l, v, rl.l), rl.v, create(rl.r, rv, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.bal",
        Error: new Error()
      };
}

function add(x, t) {
  if (typeof t !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            r: "Empty",
            h: 1
          };
  }
  let r = t.r;
  let v = t.v;
  let l = t.l;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    return t;
  }
  if (c < 0) {
    let ll = add(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal(ll, v, r);
    }
  }
  let rr = add(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal(l, v, rr);
  }
}

function mem(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let c = Caml.string_compare(x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function create$1(lex_env, mode) {
  let lexbuf = lex_env.lex_lb;
  let lexbuf$1 = {
    refill_buff: lexbuf.refill_buff,
    lex_buffer: lexbuf.lex_buffer,
    lex_buffer_len: lexbuf.lex_buffer_len,
    lex_abs_pos: lexbuf.lex_abs_pos,
    lex_start_pos: lexbuf.lex_start_pos,
    lex_curr_pos: lexbuf.lex_curr_pos,
    lex_last_pos: lexbuf.lex_last_pos,
    lex_last_action: lexbuf.lex_last_action,
    lex_eof_reached: lexbuf.lex_eof_reached,
    lex_mem: lexbuf.lex_mem,
    lex_start_p: lexbuf.lex_start_p,
    lex_curr_p: lexbuf.lex_curr_p
  };
  let lex_env$1 = with_lexbuf(lexbuf$1, lex_env);
  return {
          la_results: [],
          la_num_lexed: 0,
          la_lex_mode: mode,
          la_lex_env: lex_env$1
        };
}

function next_power_of_two(n) {
  let _i = 1;
  while(true) {
    let i = _i;
    if (i >= n) {
      return i;
    }
    _i = (i << 1);
    continue ;
  };
}

function grow(t, n) {
  if (t.la_results.length >= n) {
    return ;
  }
  let new_size = next_power_of_two(n);
  let filler = function (i) {
    if (i < t.la_results.length) {
      return Caml_array.get(t.la_results, i);
    }
    
  };
  let new_arr = $$Array.init(new_size, filler);
  t.la_results = new_arr;
}

function lex(t) {
  let lex_env = t.la_lex_env;
  let match = t.la_lex_mode;
  let match$1;
  switch (match) {
    case "TYPE" :
        match$1 = type_token$1(lex_env);
        break;
    case "JSX_TAG" :
        match$1 = jsx_tag(lex_env);
        break;
    case "JSX_CHILD" :
        match$1 = jsx_child$1(lex_env);
        break;
    case "TEMPLATE" :
        match$1 = template_tail(lex_env);
        break;
    case "REGEXP" :
        match$1 = regexp(lex_env);
        break;
    case "NORMAL" :
    case "PREDICATE" :
        match$1 = token$1(lex_env);
        break;
    
  }
  let lex_env$1 = match$1[0];
  let lexbuf = lex_env$1.lex_lb;
  let lexbuf$1 = {
    refill_buff: lexbuf.refill_buff,
    lex_buffer: lexbuf.lex_buffer,
    lex_buffer_len: lexbuf.lex_buffer_len,
    lex_abs_pos: lexbuf.lex_abs_pos,
    lex_start_pos: lexbuf.lex_start_pos,
    lex_curr_pos: lexbuf.lex_curr_pos,
    lex_last_pos: lexbuf.lex_last_pos,
    lex_last_action: lexbuf.lex_last_action,
    lex_eof_reached: lexbuf.lex_eof_reached,
    lex_mem: lexbuf.lex_mem,
    lex_start_p: lexbuf.lex_start_p,
    lex_curr_p: lexbuf.lex_curr_p
  };
  let cloned_env = with_lexbuf(lexbuf$1, lex_env$1);
  t.la_lex_env = lex_env$1;
  Caml_array.set(t.la_results, t.la_num_lexed, [
        cloned_env,
        match$1[1]
      ]);
  t.la_num_lexed = t.la_num_lexed + 1 | 0;
}

function lex_until(t, i) {
  grow(t, i + 1 | 0);
  while(t.la_num_lexed <= i) {
    lex(t);
  };
}

let default_parse_options = {
  esproposal_class_instance_fields: false,
  esproposal_class_static_fields: false,
  esproposal_decorators: false,
  esproposal_export_star_as: false,
  types: true,
  use_strict: false
};

function init_env(token_sinkOpt, parse_optionsOpt, source, content) {
  let token_sink = token_sinkOpt !== undefined ? Caml_option.valFromOption(token_sinkOpt) : undefined;
  let parse_options = parse_optionsOpt !== undefined ? Caml_option.valFromOption(parse_optionsOpt) : undefined;
  let lb = Lexing.from_string(content);
  if (source !== undefined && typeof source === "object") {
    let init = lb.lex_curr_p;
    lb.lex_curr_p = {
      pos_fname: source._0,
      pos_lnum: init.pos_lnum,
      pos_bol: init.pos_bol,
      pos_cnum: init.pos_cnum
    };
  }
  let parse_options$1 = parse_options !== undefined ? parse_options : default_parse_options;
  let enable_types_in_comments = parse_options$1.types;
  let lex_env = new_lex_env(source, lb, enable_types_in_comments);
  return {
          errors: {
            contents: /* [] */0
          },
          comments: {
            contents: /* [] */0
          },
          labels: "Empty",
          exports: {
            contents: "Empty"
          },
          last_loc: {
            contents: undefined
          },
          in_strict_mode: parse_options$1.use_strict,
          in_export: false,
          in_loop: false,
          in_switch: false,
          in_function: false,
          no_in: false,
          no_call: false,
          no_let: false,
          allow_yield: true,
          allow_await: false,
          error_callback: undefined,
          lex_mode_stack: {
            contents: {
              hd: "NORMAL",
              tl: /* [] */0
            }
          },
          lex_env: {
            contents: lex_env
          },
          lookahead: {
            contents: create$1(lex_env, "NORMAL")
          },
          token_sink: {
            contents: token_sink
          },
          parse_options: parse_options$1,
          source: source
        };
}

function error_at(env, param) {
  let e = param[1];
  env.errors.contents = {
    hd: [
      param[0],
      e
    ],
    tl: env.errors.contents
  };
  let callback = env.error_callback;
  if (callback !== undefined) {
    return Curry._2(callback, env, e);
  }
  
}

function comment_list(env) {
  return function (param) {
    return List.iter((function (c) {
                  env.comments.contents = {
                    hd: c,
                    tl: env.comments.contents
                  };
                }), param);
  };
}

function record_export(env, param) {
  let export_name = param[1];
  let $$exports = env.exports.contents;
  if (mem(export_name, $$exports)) {
    return error_at(env, [
                param[0],
                {
                  TAG: "DuplicateExport",
                  _0: export_name
                }
              ]);
  } else {
    env.exports.contents = add(export_name, env.exports.contents);
    return ;
  }
}

function lookahead(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  if (i >= 2) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "parser_env.ml",
            288,
            2
          ],
          Error: new Error()
        };
  }
  let t = env.lookahead.contents;
  lex_until(t, i);
  let match = Caml_array.get(t.la_results, i);
  if (match !== undefined) {
    return match[1];
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "Lookahead.peek failed",
        Error: new Error()
      };
}

function with_strict(in_strict_mode, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.in_strict_mode = in_strict_mode;
  return newrecord;
}

function with_in_function(in_function, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.in_function = in_function;
  return newrecord;
}

function with_allow_yield(allow_yield, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.allow_yield = allow_yield;
  return newrecord;
}

function with_no_let(no_let, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.no_let = no_let;
  return newrecord;
}

function with_in_loop(in_loop, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.in_loop = in_loop;
  return newrecord;
}

function with_no_in(no_in, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.no_in = no_in;
  return newrecord;
}

function with_in_switch(in_switch, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.in_switch = in_switch;
  return newrecord;
}

function with_in_export(in_export, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.in_export = in_export;
  return newrecord;
}

function with_no_call(no_call, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.no_call = no_call;
  return newrecord;
}

function with_error_callback(error_callback, env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.error_callback = error_callback;
  return newrecord;
}

function error_list(env) {
  return function (param) {
    return List.iter((function (param) {
                  return error_at(env, param);
                }), param);
  };
}

function without_error_callback(env) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.error_callback = undefined;
  return newrecord;
}

function add_label(env, label) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.labels = add(label, env.labels);
  return newrecord;
}

function enter_function(env, async, generator) {
  let newrecord = Caml_obj.obj_dup(env);
  newrecord.allow_await = async;
  newrecord.allow_yield = generator;
  newrecord.in_function = true;
  newrecord.in_switch = false;
  newrecord.in_loop = false;
  newrecord.labels = "Empty";
  return newrecord;
}

function is_future_reserved(param) {
  if (param === "enum") {
    return true;
  } else {
    return false;
  }
}

function is_strict_reserved(param) {
  switch (param) {
    case "implements" :
    case "interface" :
    case "package" :
    case "private" :
    case "protected" :
    case "public" :
    case "static" :
    case "yield" :
        return true;
    default:
      return false;
  }
}

function is_restricted(param) {
  switch (param) {
    case "arguments" :
    case "eval" :
        return true;
    default:
      return false;
  }
}

function token$2(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  return lookahead(i, env).lex_token;
}

function value(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  return lookahead(i, env).lex_value;
}

function loc(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  return lookahead(i, env).lex_loc;
}

function errors(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  return lookahead(i, env).lex_errors;
}

function comments(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  return lookahead(i, env).lex_comments;
}

function lex_env(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  let t = env.lookahead.contents;
  lex_until(t, i);
  let match = Caml_array.get(t.la_results, i);
  if (match !== undefined) {
    return match[0];
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "Lookahead.peek failed",
        Error: new Error()
      };
}

function is_line_terminator(env) {
  let loc$p = env.last_loc.contents;
  if (loc$p !== undefined) {
    return loc(undefined, env).start.line > loc$p.start.line;
  } else {
    return false;
  }
}

function is_implicit_semicolon(env) {
  let match = token$2(undefined, env);
  if (typeof match === "object") {
    return is_line_terminator(env);
  }
  switch (match) {
    case "T_SEMICOLON" :
        return false;
    case "T_RCURLY" :
    case "T_EOF" :
        return true;
    default:
      return is_line_terminator(env);
  }
}

function semicolon_loc(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  if (token$2(i, env) === "T_SEMICOLON") {
    return loc(i, env);
  }
  
}

function is_identifier(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  let name = value(i, env);
  let match = token$2(i, env);
  if (is_strict_reserved(name) || is_restricted(name) || is_future_reserved(name)) {
    return true;
  }
  if (typeof match === "object") {
    return false;
  }
  switch (match) {
    case "T_IDENTIFIER" :
    case "T_LET" :
    case "T_DECLARE" :
    case "T_TYPE" :
    case "T_OF" :
    case "T_ASYNC" :
    case "T_AWAIT" :
        return true;
    default:
      return false;
  }
}

function is_function(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  if (token$2(i, env) === "T_FUNCTION") {
    return true;
  } else if (token$2(i, env) === "T_ASYNC") {
    return token$2(i + 1 | 0, env) === "T_FUNCTION";
  } else {
    return false;
  }
}

function is_class(iOpt, env) {
  let i = iOpt !== undefined ? iOpt : 0;
  let match = token$2(i, env);
  if (typeof match === "object") {
    return false;
  }
  switch (match) {
    case "T_AT" :
    case "T_CLASS" :
        return true;
    default:
      return false;
  }
}

function error(env, e) {
  let loc$1 = loc(undefined, env);
  error_at(env, [
        loc$1,
        e
      ]);
}

function get_unexpected_error(param) {
  let tmp = param[0];
  if (typeof tmp !== "object") {
    switch (tmp) {
      case "T_IDENTIFIER" :
          return "UnexpectedIdentifier";
      case "T_EOF" :
          return "UnexpectedEOS";
      default:
        
    }
  } else {
    switch (tmp.TAG) {
      case "T_NUMBER" :
          return "UnexpectedNumber";
      case "T_STRING" :
      case "T_JSX_TEXT" :
          return "UnexpectedString";
      default:
        
    }
  }
  let word = param[1];
  if (is_future_reserved(word)) {
    return "UnexpectedReserved";
  } else if (is_strict_reserved(word)) {
    return "StrictReservedWord";
  } else {
    return {
            TAG: "UnexpectedToken",
            _0: word
          };
  }
}

function error_unexpected(env) {
  error_list(env)(errors(undefined, env));
  error(env, get_unexpected_error([
            token$2(undefined, env),
            value(undefined, env)
          ]));
}

function error_on_decorators(env) {
  return function (param) {
    return List.iter((function (decorator) {
                  error_at(env, [
                        decorator[0],
                        "UnsupportedDecorator"
                      ]);
                }), param);
  };
}

function strict_error(env, e) {
  if (env.in_strict_mode) {
    return error(env, e);
  }
  
}

function strict_error_at(env, param) {
  if (env.in_strict_mode) {
    return error_at(env, [
                param[0],
                param[1]
              ]);
  }
  
}

function token$3(env) {
  let token_sink = env.token_sink.contents;
  if (token_sink !== undefined) {
    let token_loc = loc(undefined, env);
    let token$4 = token$2(undefined, env);
    let token_value = value(undefined, env);
    Curry._1(token_sink, {
          token_loc: token_loc,
          token: token$4,
          token_context: List.hd(env.lex_mode_stack.contents),
          token_value: token_value
        });
  }
  env.lex_env.contents = lex_env(undefined, env);
  error_list(env)(errors(undefined, env));
  comment_list(env)(comments(undefined, env));
  env.last_loc.contents = loc(undefined, env);
  let t = env.lookahead.contents;
  lex_until(t, 0);
  if (t.la_num_lexed > 1) {
    $$Array.blit(t.la_results, 1, t.la_results, 0, t.la_num_lexed - 1 | 0);
  }
  Caml_array.set(t.la_results, t.la_num_lexed - 1 | 0, undefined);
  t.la_num_lexed = t.la_num_lexed - 1 | 0;
}

function push_lex_mode(env, mode) {
  env.lex_mode_stack.contents = {
    hd: mode,
    tl: env.lex_mode_stack.contents
  };
  env.lookahead.contents = create$1(env.lex_env.contents, List.hd(env.lex_mode_stack.contents));
}

function pop_lex_mode(env) {
  let match = env.lex_mode_stack.contents;
  let new_stack;
  if (match) {
    new_stack = match.tl;
  } else {
    throw {
          RE_EXN_ID: "Failure",
          _1: "Popping lex mode from empty stack",
          Error: new Error()
        };
  }
  env.lex_mode_stack.contents = new_stack;
  env.lookahead.contents = create$1(env.lex_env.contents, List.hd(env.lex_mode_stack.contents));
}

function double_pop_lex_mode(env) {
  let match = env.lex_mode_stack.contents;
  let new_stack;
  if (match) {
    let match$1 = match.tl;
    if (match$1) {
      new_stack = match$1.tl;
    } else {
      throw {
            RE_EXN_ID: "Failure",
            _1: "Popping lex mode from empty stack",
            Error: new Error()
          };
    }
  } else {
    throw {
          RE_EXN_ID: "Failure",
          _1: "Popping lex mode from empty stack",
          Error: new Error()
        };
  }
  env.lex_mode_stack.contents = new_stack;
  env.lookahead.contents = create$1(env.lex_env.contents, List.hd(env.lex_mode_stack.contents));
}

function semicolon(env) {
  if (!is_implicit_semicolon(env)) {
    if (token$2(undefined, env) === "T_SEMICOLON") {
      return token$3(env);
    } else {
      return error_unexpected(env);
    }
  }
  
}

function token$4(env, t) {
  if (Caml_obj.notequal(token$2(undefined, env), t)) {
    error_unexpected(env);
  }
  token$3(env);
}

function maybe(env, t) {
  if (Caml_obj.equal(token$2(undefined, env), t)) {
    token$3(env);
    return true;
  } else {
    return false;
  }
}

function contextual(env, str) {
  if (value(undefined, env) !== str) {
    error_unexpected(env);
  }
  token$3(env);
}

let Rollback = /* @__PURE__ */Caml_exceptions.create("Flow_parser_reg_test.Parser_env.Try.Rollback");

function save_state(env) {
  let orig_token_sink = env.token_sink.contents;
  let token_buffer;
  if (orig_token_sink !== undefined) {
    let buffer = {
      length: 0,
      first: "Nil",
      last: "Nil"
    };
    env.token_sink.contents = (function (token_data) {
        Queue.add(token_data, buffer);
      });
    token_buffer = [
      orig_token_sink,
      buffer
    ];
  } else {
    token_buffer = undefined;
  }
  return {
          saved_errors: env.errors.contents,
          saved_comments: env.comments.contents,
          saved_last_loc: env.last_loc.contents,
          saved_lex_mode_stack: env.lex_mode_stack.contents,
          saved_lex_env: env.lex_env.contents,
          token_buffer: token_buffer
        };
}

function reset_token_sink(flush, env, token_buffer_info) {
  if (token_buffer_info === undefined) {
    return ;
  }
  let orig_token_sink = token_buffer_info[0];
  env.token_sink.contents = orig_token_sink;
  if (flush) {
    return Queue.iter(orig_token_sink, token_buffer_info[1]);
  }
  
}

function to_parse(env, parse) {
  let saved_state = save_state(env);
  try {
    let result = Curry._1(parse, env);
    reset_token_sink(true, env, saved_state.token_buffer);
    return {
            TAG: "ParsedSuccessfully",
            _0: result
          };
  }
  catch (raw_exn){
    let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Rollback) {
      reset_token_sink(false, env, saved_state.token_buffer);
      env.errors.contents = saved_state.saved_errors;
      env.comments.contents = saved_state.saved_comments;
      env.last_loc.contents = saved_state.saved_last_loc;
      env.lex_mode_stack.contents = saved_state.saved_lex_mode_stack;
      env.lex_env.contents = saved_state.saved_lex_env;
      env.lookahead.contents = create$1(env.lex_env.contents, List.hd(env.lex_mode_stack.contents));
      return "FailedToParse";
    }
    throw exn;
  }
}

let Parser_env_Peek = {
  token: token$2,
  value: value,
  loc: loc,
  errors: errors,
  comments: comments,
  is_line_terminator: is_line_terminator,
  is_implicit_semicolon: is_implicit_semicolon,
  semicolon_loc: semicolon_loc,
  is_identifier: is_identifier,
  is_function: is_function,
  is_class: is_class
};

let Parser_env_Try = {
  Rollback: Rollback,
  to_parse: to_parse
};

function height$1(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create$2(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  return {
          TAG: "Node",
          l: l,
          v: v,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal$1(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let lv = l.v;
    let ll = l.l;
    if (height$1(ll) >= height$1(lr)) {
      return create$2(ll, lv, create$2(lr, v, r));
    }
    if (typeof lr === "object") {
      return create$2(create$2(ll, lv, lr.l), lr.v, create$2(lr.r, v, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            l: l,
            v: v,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rv = r.v;
  let rl = r.l;
  if (height$1(rr) >= height$1(rl)) {
    return create$2(create$2(l, v, rl), rv, rr);
  }
  if (typeof rl === "object") {
    return create$2(create$2(l, v, rl.l), rl.v, create$2(rl.r, rv, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.bal",
        Error: new Error()
      };
}

function add$1(x, t) {
  if (typeof t !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            r: "Empty",
            h: 1
          };
  }
  let r = t.r;
  let v = t.v;
  let l = t.l;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    return t;
  }
  if (c < 0) {
    let ll = add$1(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal$1(ll, v, r);
    }
  }
  let rr = add$1(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal$1(l, v, rr);
  }
}

function mem$1(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let c = Caml.string_compare(x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function height$2(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create$3(l, x, d, r) {
  let hl = height$2(l);
  let hr = height$2(r);
  return {
          TAG: "Node",
          l: l,
          v: x,
          d: d,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal$2(l, x, d, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let ld = l.d;
    let lv = l.v;
    let ll = l.l;
    if (height$2(ll) >= height$2(lr)) {
      return create$3(ll, lv, ld, create$3(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create$3(create$3(ll, lv, ld, lr.l), lr.v, lr.d, create$3(lr.r, x, d, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            l: l,
            v: x,
            d: d,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rd = r.d;
  let rv = r.v;
  let rl = r.l;
  if (height$2(rr) >= height$2(rl)) {
    return create$3(create$3(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create$3(create$3(l, x, d, rl.l), rl.v, rl.d, create$3(rl.r, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function add$2(x, data, m) {
  if (typeof m !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            d: data,
            r: "Empty",
            h: 1
          };
  }
  let r = m.r;
  let d = m.d;
  let v = m.v;
  let l = m.l;
  let c = Caml.string_compare(x, v);
  if (c === 0) {
    if (d === data) {
      return m;
    } else {
      return {
              TAG: "Node",
              l: l,
              v: x,
              d: data,
              r: r,
              h: m.h
            };
    }
  }
  if (c < 0) {
    let ll = add$2(x, data, l);
    if (l === ll) {
      return m;
    } else {
      return bal$2(ll, v, d, r);
    }
  }
  let rr = add$2(x, data, r);
  if (r === rr) {
    return m;
  } else {
    return bal$2(l, v, d, rr);
  }
}

function find(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    let c = Caml.string_compare(x, param.v);
    if (c === 0) {
      return param.d;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function compare$1(param, param$1) {
  let loc = compare(param[0], param$1[0]);
  if (loc === 0) {
    return Caml_obj.compare(param[1], param$1[1]);
  } else {
    return loc;
  }
}

function height$3(param) {
  if (typeof param !== "object") {
    return 0;
  } else {
    return param.h;
  }
}

function create$4(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  return {
          TAG: "Node",
          l: l,
          v: v,
          r: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function bal$3(l, v, r) {
  let hl;
  hl = typeof l !== "object" ? 0 : l.h;
  let hr;
  hr = typeof r !== "object" ? 0 : r.h;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    let lr = l.r;
    let lv = l.v;
    let ll = l.l;
    if (height$3(ll) >= height$3(lr)) {
      return create$4(ll, lv, create$4(lr, v, r));
    }
    if (typeof lr === "object") {
      return create$4(create$4(ll, lv, lr.l), lr.v, create$4(lr.r, v, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            l: l,
            v: v,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  }
  let rr = r.r;
  let rv = r.v;
  let rl = r.l;
  if (height$3(rr) >= height$3(rl)) {
    return create$4(create$4(l, v, rl), rv, rr);
  }
  if (typeof rl === "object") {
    return create$4(create$4(l, v, rl.l), rl.v, create$4(rl.r, rv, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Set.bal",
        Error: new Error()
      };
}

function add$3(x, t) {
  if (typeof t !== "object") {
    return {
            TAG: "Node",
            l: "Empty",
            v: x,
            r: "Empty",
            h: 1
          };
  }
  let r = t.r;
  let v = t.v;
  let l = t.l;
  let c = compare$1(x, v);
  if (c === 0) {
    return t;
  }
  if (c < 0) {
    let ll = add$3(x, l);
    if (l === ll) {
      return t;
    } else {
      return bal$3(ll, v, r);
    }
  }
  let rr = add$3(x, r);
  if (r === rr) {
    return t;
  } else {
    return bal$3(l, v, rr);
  }
}

function mem$2(x, _param) {
  while(true) {
    let param = _param;
    if (typeof param !== "object") {
      return false;
    }
    let c = compare$1(x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function filter_duplicate_errors(errs) {
  let errs$1 = List.rev(errs);
  let match = List.fold_left((function (param, err) {
          let deduped = param[1];
          let set = param[0];
          if (mem$2(err, set)) {
            return [
                    set,
                    deduped
                  ];
          } else {
            return [
                    add$3(err, set),
                    {
                      hd: err,
                      tl: deduped
                    }
                  ];
          }
        }), [
        "Empty",
        /* [] */0
      ], errs$1);
  return List.rev(match[1]);
}

function with_loc(fn, env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let result = Curry._1(fn, env);
  let loc = env.last_loc.contents;
  let end_loc = loc !== undefined ? loc : (error(env, {
            TAG: "Assertion",
            _0: "did not consume any tokens"
          }), Curry._2(Parser_env_Peek.loc, undefined, env));
  return [
          btwn(start_loc, end_loc),
          result
        ];
}

let Parse = Caml_module.init_mod([
      "parser_flow.ml",
      95,
      6
    ], {
      TAG: "Module",
      _0: [
        [
          "Function",
          "program"
        ],
        [
          "Function",
          "statement"
        ],
        [
          "Function",
          "statement_list_item"
        ],
        [
          "Function",
          "statement_list"
        ],
        [
          "Function",
          "statement_list_with_directives"
        ],
        [
          "Function",
          "module_body"
        ],
        [
          "Function",
          "expression"
        ],
        [
          "Function",
          "assignment"
        ],
        [
          "Function",
          "object_initializer"
        ],
        [
          "Function",
          "array_initializer"
        ],
        [
          "Function",
          "identifier"
        ],
        [
          "Function",
          "identifier_or_reserved_keyword"
        ],
        [
          "Function",
          "identifier_with_type"
        ],
        [
          "Function",
          "block_body"
        ],
        [
          "Function",
          "function_block_body"
        ],
        [
          "Function",
          "jsx_element"
        ],
        [
          "Function",
          "pattern"
        ],
        [
          "Function",
          "pattern_from_expr"
        ],
        [
          "Function",
          "object_key"
        ],
        [
          "Function",
          "class_declaration"
        ],
        [
          "Function",
          "class_expression"
        ],
        [
          "Function",
          "is_assignable_lhs"
        ],
        [
          "Function",
          "predicate"
        ]
      ]
    });

function prefix(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return postfix(env);
  }
  if (match !== "T_PLING") {
    return postfix(env);
  }
  let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_PLING");
  let t = prefix(env);
  return [
          btwn(loc, t[0]),
          {
            TAG: "Nullable",
            _0: t
          }
        ];
}

function rev_nonempty_acc(acc) {
  let end_loc;
  if (acc) {
    end_loc = acc.hd[0];
  } else {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "parser_flow.ml",
            127,
            13
          ],
          Error: new Error()
        };
  }
  let acc$1 = List.rev(acc);
  let start_loc;
  if (acc$1) {
    start_loc = acc$1.hd[0];
  } else {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "parser_flow.ml",
            131,
            13
          ],
          Error: new Error()
        };
  }
  return [
          btwn(start_loc, end_loc),
          acc$1
        ];
}

function intersection(env) {
  maybe(env, "T_BIT_AND");
  let left = prefix(env);
  return Curry._2(intersection_with, env, left);
}

function function_param_list(env) {
  token$4(env, "T_LPAREN");
  let ret = Curry._2(function_param_list_without_parens, env, /* [] */0);
  token$4(env, "T_RPAREN");
  return ret;
}

function union(env) {
  maybe(env, "T_BIT_OR");
  let left = intersection(env);
  return Curry._2(union_with, env, left);
}

function generic(env) {
  return Curry._2(raw_generic_with_identifier, env, Curry._2(Parse.identifier, undefined, env));
}

function primary(env) {
  let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let token$5 = Curry._2(Parser_env_Peek.token, undefined, env);
  let exit = 0;
  if (typeof token$5 !== "object") {
    switch (token$5) {
      case "T_IDENTIFIER" :
          let match = generic(env);
          return [
                  match[0],
                  {
                    TAG: "Generic",
                    _0: match[1]
                  }
                ];
      case "T_LCURLY" :
          let match$1 = Curry._2(_object, undefined, env);
          return [
                  match$1[0],
                  {
                    TAG: "Object",
                    _0: match$1[1]
                  }
                ];
      case "T_LPAREN" :
          let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
          let _type = param_list_or_type(env);
          if (_type.TAG !== "ParamList") {
            return _type._0;
          }
          let match$2 = _type._0;
          token$4(env, "T_ARROW");
          let returnType = union(env);
          let end_loc = returnType[0];
          return [
                  btwn(start_loc, end_loc),
                  {
                    TAG: "Function",
                    _0: {
                      params: match$2[1],
                      returnType: returnType,
                      rest: match$2[0],
                      typeParameters: undefined
                    }
                  }
                ];
      case "T_LBRACKET" :
          let start_loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env);
          token$4(env, "T_LBRACKET");
          let tl = types(env, /* [] */0);
          let end_loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env);
          token$4(env, "T_RBRACKET");
          return [
                  btwn(start_loc$1, end_loc$1),
                  {
                    TAG: "Tuple",
                    _0: tl
                  }
                ];
      case "T_FALSE" :
      case "T_TRUE" :
          exit = 2;
          break;
      case "T_TYPEOF" :
          let start_loc$2 = Curry._2(Parser_env_Peek.loc, undefined, env);
          token$4(env, "T_TYPEOF");
          let t = primary(env);
          return [
                  btwn(start_loc$2, t[0]),
                  {
                    TAG: "Typeof",
                    _0: t
                  }
                ];
      case "T_LESS_THAN" :
          let start_loc$3 = Curry._2(Parser_env_Peek.loc, undefined, env);
          let typeParameters = Curry._2(type_parameter_declaration, false, env);
          let match$3 = function_param_list(env);
          token$4(env, "T_ARROW");
          let returnType$1 = union(env);
          let end_loc$2 = returnType$1[0];
          return [
                  btwn(start_loc$3, end_loc$2),
                  {
                    TAG: "Function",
                    _0: {
                      params: match$3[1],
                      returnType: returnType$1,
                      rest: match$3[0],
                      typeParameters: typeParameters
                    }
                  }
                ];
      case "T_MULT" :
          token$4(env, "T_MULT");
          return [
                  loc,
                  "Exists"
                ];
      default:
        exit = 1;
    }
  } else {
    switch (token$5.TAG) {
      case "T_STRING" :
          let match$4 = token$5._0;
          let octal = match$4[3];
          let raw = match$4[2];
          let value = match$4[1];
          let loc$1 = match$4[0];
          if (octal) {
            strict_error(env, "StrictOctalLiteral");
          }
          token$4(env, {
                TAG: "T_STRING",
                _0: [
                  loc$1,
                  value,
                  raw,
                  octal
                ]
              });
          return [
                  loc$1,
                  {
                    TAG: "StringLiteral",
                    _0: {
                      value: value,
                      raw: raw
                    }
                  }
                ];
      case "T_NUMBER_SINGLETON_TYPE" :
          let value$1 = token$5._1;
          let number_type = token$5._0;
          let raw$1 = Curry._2(Parser_env_Peek.value, undefined, env);
          token$4(env, {
                TAG: "T_NUMBER_SINGLETON_TYPE",
                _0: number_type,
                _1: value$1
              });
          if (number_type === "LEGACY_OCTAL") {
            strict_error(env, "StrictOctalLiteral");
          }
          return [
                  loc,
                  {
                    TAG: "NumberLiteral",
                    _0: {
                      value: value$1,
                      raw: raw$1
                    }
                  }
                ];
      default:
        exit = 1;
    }
  }
  switch (exit) {
    case 1 :
        let t$1 = primitive(token$5);
        if (t$1 !== undefined) {
          token$4(env, token$5);
          return [
                  loc,
                  t$1
                ];
        } else {
          error_unexpected(env);
          return [
                  loc,
                  "Any"
                ];
        }
    case 2 :
        let raw$2 = Curry._2(Parser_env_Peek.value, undefined, env);
        token$4(env, token$5);
        let value$2 = token$5 === "T_TRUE";
        return [
                loc,
                {
                  TAG: "BooleanLiteral",
                  _0: {
                    value: value$2,
                    raw: raw$2
                  }
                }
              ];
    
  }
}

function primitive(param) {
  if (typeof param === "object") {
    return ;
  }
  switch (param) {
    case "T_NULL" :
        return "Null";
    case "T_ANY_TYPE" :
        return "Any";
    case "T_BOOLEAN_TYPE" :
        return "Boolean";
    case "T_NUMBER_TYPE" :
        return "Number";
    case "T_STRING_TYPE" :
        return "String";
    case "T_VOID_TYPE" :
        return "Void";
    default:
      return ;
  }
}

function function_param_with_id(env, name) {
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeAnnotation");
  }
  let optional = maybe(env, "T_PLING");
  token$4(env, "T_COLON");
  let typeAnnotation = union(env);
  return [
          btwn(name[0], typeAnnotation[0]),
          {
            name: name,
            typeAnnotation: typeAnnotation,
            optional: optional
          }
        ];
}

function postfix_with(env, _t) {
  while(true) {
    let t = _t;
    if (!(!Curry._1(Parser_env_Peek.is_line_terminator, env) && maybe(env, "T_LBRACKET"))) {
      return t;
    }
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_RBRACKET");
    let loc = btwn(t[0], end_loc);
    let t_1 = {
      TAG: "Array",
      _0: t
    };
    let t$1 = [
      loc,
      t_1
    ];
    _t = t$1;
    continue ;
  };
}

function generic_type_with_identifier(env, id) {
  let match = Curry._2(raw_generic_with_identifier, env, id);
  return [
          match[0],
          {
            TAG: "Generic",
            _0: match[1]
          }
        ];
}

function function_param_or_generic_type(env) {
  let id = Curry._2(Parse.identifier, undefined, env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_PLING" :
      case "T_COLON" :
          exit = 2;
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 :
        return {
                TAG: "Type",
                _0: Curry._2(union_with, env, Curry._2(intersection_with, env, postfix_with(env, generic_type_with_identifier(env, id))))
              };
    case 2 :
        let param = function_param_with_id(env, id);
        maybe(env, "T_COMMA");
        return {
                TAG: "ParamList",
                _0: Curry._2(function_param_list_without_parens, env, {
                      hd: param,
                      tl: /* [] */0
                    })
              };
    
  }
}

function param_list_or_type(env) {
  token$4(env, "T_LPAREN");
  let token$5 = Curry._2(Parser_env_Peek.token, undefined, env);
  let ret;
  let exit = 0;
  if (typeof token$5 !== "object") {
    switch (token$5) {
      case "T_IDENTIFIER" :
          ret = function_param_or_generic_type(env);
          break;
      case "T_RPAREN" :
          ret = {
            TAG: "ParamList",
            _0: [
              undefined,
              /* [] */0
            ]
          };
          break;
      case "T_ELLIPSIS" :
      case "T_EOF" :
          ret = {
            TAG: "ParamList",
            _0: Curry._2(function_param_list_without_parens, env, /* [] */0)
          };
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    let match = primitive(token$5);
    if (match !== undefined) {
      let match$1 = Curry._2(Parser_env_Peek.token, 1, env);
      let exit$1 = 0;
      if (typeof match$1 !== "object") {
        switch (match$1) {
          case "T_PLING" :
          case "T_COLON" :
              exit$1 = 2;
              break;
          default:
            ret = {
              TAG: "Type",
              _0: union(env)
            };
        }
      } else {
        ret = {
          TAG: "Type",
          _0: union(env)
        };
      }
      if (exit$1 === 2) {
        let match$2 = Curry._1(Parse.identifier_or_reserved_keyword, env);
        let name = match$2[0];
        if (!env.parse_options.types) {
          error(env, "UnexpectedTypeAnnotation");
        }
        let optional = maybe(env, "T_PLING");
        token$4(env, "T_COLON");
        let typeAnnotation = union(env);
        if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RPAREN") {
          token$4(env, "T_COMMA");
        }
        let param_0 = btwn(name[0], typeAnnotation[0]);
        let param_1 = {
          name: name,
          typeAnnotation: typeAnnotation,
          optional: optional
        };
        let param = [
          param_0,
          param_1
        ];
        ret = {
          TAG: "ParamList",
          _0: Curry._2(function_param_list_without_parens, env, {
                hd: param,
                tl: /* [] */0
              })
        };
      }
      
    } else {
      ret = {
        TAG: "Type",
        _0: union(env)
      };
    }
  }
  token$4(env, "T_RPAREN");
  return ret;
}

function postfix(env) {
  let t = primary(env);
  return postfix_with(env, t);
}

function intersection_with(env, left) {
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_BIT_AND") {
    let _acc = {
      hd: left,
      tl: /* [] */0
    };
    while(true) {
      let acc = _acc;
      let match = Curry._2(Parser_env_Peek.token, undefined, env);
      if (typeof match !== "object" && match === "T_BIT_AND") {
        token$4(env, "T_BIT_AND");
        _acc = {
          hd: prefix(env),
          tl: acc
        };
        continue ;
      }
      let match$1 = rev_nonempty_acc(acc);
      return [
              match$1[0],
              {
                TAG: "Intersection",
                _0: match$1[1]
              }
            ];
    };
  } else {
    return left;
  }
}

function param(env) {
  let match = Curry._1(Parse.identifier_or_reserved_keyword, env);
  return function_param_with_id(env, match[0]);
}

function function_param_list_without_parens(env) {
  return function (param$1) {
    let _acc = param$1;
    while(true) {
      let acc = _acc;
      let t = Curry._2(Parser_env_Peek.token, undefined, env);
      let exit = 0;
      if (typeof t !== "object") {
        switch (t) {
          case "T_RPAREN" :
          case "T_ELLIPSIS" :
          case "T_EOF" :
              exit = 2;
              break;
          default:
            exit = 1;
        }
      } else {
        exit = 1;
      }
      switch (exit) {
        case 1 :
            let acc_0 = param(env);
            let acc$1 = {
              hd: acc_0,
              tl: acc
            };
            if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RPAREN") {
              token$4(env, "T_COMMA");
            }
            _acc = acc$1;
            continue ;
        case 2 :
            let rest = t === "T_ELLIPSIS" ? (token$4(env, "T_ELLIPSIS"), param(env)) : undefined;
            return [
                    rest,
                    List.rev(acc)
                  ];
        
      }
    };
  };
}

function params(env, allow_default, _require_default, _acc) {
  while(true) {
    let acc = _acc;
    let require_default = _require_default;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    let variance;
    if (typeof match !== "object") {
      switch (match) {
        case "T_PLUS" :
            token$3(env);
            variance = "Plus";
            break;
        case "T_MINUS" :
            token$3(env);
            variance = "Minus";
            break;
        default:
          variance = undefined;
      }
    } else {
      variance = undefined;
    }
    let match$1 = Curry._2(Parse.identifier_with_type, env, "StrictParamName");
    let id = match$1[1];
    let loc = match$1[0];
    let match$2 = Curry._2(Parser_env_Peek.token, undefined, env);
    let match$3;
    if (allow_default) {
      let exit = 0;
      if (typeof match$2 !== "object" && match$2 === "T_ASSIGN") {
        token$3(env);
        match$3 = [
          union(env),
          true
        ];
      } else {
        exit = 1;
      }
      if (exit === 1) {
        if (require_default) {
          error_at(env, [
                loc,
                "MissingTypeParamDefault"
              ]);
        }
        match$3 = [
          undefined,
          require_default
        ];
      }
      
    } else {
      match$3 = [
        undefined,
        false
      ];
    }
    let param_1 = {
      name: id.name,
      bound: id.typeAnnotation,
      variance: variance,
      default: match$3[0]
    };
    let param = [
      loc,
      param_1
    ];
    let acc$1 = {
      hd: param,
      tl: acc
    };
    let match$4 = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match$4 !== "object") {
      switch (match$4) {
        case "T_GREATER_THAN" :
        case "T_EOF" :
            return List.rev(acc$1);
        default:
          
      }
    }
    token$4(env, "T_COMMA");
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_GREATER_THAN") {
      return List.rev(acc$1);
    }
    _acc = acc$1;
    _require_default = match$3[1];
    continue ;
  };
}

function type_parameter_declaration(allow_default, env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_LESS_THAN") {
    return ;
  }
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeAnnotation");
  }
  token$4(env, "T_LESS_THAN");
  let params$1 = params(env, allow_default, false, /* [] */0);
  let loc = btwn(start_loc, Curry._2(Parser_env_Peek.loc, undefined, env));
  token$4(env, "T_GREATER_THAN");
  return [
          loc,
          {
            params: params$1
          }
        ];
}

function methodish(env, start_loc) {
  let typeParameters = Curry._2(type_parameter_declaration, false, env);
  let match = function_param_list(env);
  token$4(env, "T_COLON");
  let returnType = union(env);
  let loc = btwn(start_loc, returnType[0]);
  return [
          loc,
          {
            params: match[1],
            returnType: returnType,
            rest: match[0],
            typeParameters: typeParameters
          }
        ];
}

function method_property(env, start_loc, $$static, key) {
  let value = methodish(env, start_loc);
  let value_0 = value[0];
  let value_1 = {
    TAG: "Function",
    _0: value[1]
  };
  let value$1 = [
    value_0,
    value_1
  ];
  return [
          value_0,
          {
            key: key,
            value: value$1,
            optional: false,
            static: $$static,
            _method: true
          }
        ];
}

function call_property(env, start_loc, $$static) {
  let value = methodish(env, Curry._2(Parser_env_Peek.loc, undefined, env));
  return [
          btwn(start_loc, value[0]),
          {
            value: value,
            static: $$static
          }
        ];
}

function property(env, start_loc, $$static, key) {
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeAnnotation");
  }
  let optional = maybe(env, "T_PLING");
  token$4(env, "T_COLON");
  let value = union(env);
  return [
          btwn(start_loc, value[0]),
          {
            key: key,
            value: value,
            optional: optional,
            static: $$static,
            _method: false
          }
        ];
}

function indexer_property(env, start_loc, $$static) {
  token$4(env, "T_LBRACKET");
  let match = Curry._1(Parse.identifier_or_reserved_keyword, env);
  token$4(env, "T_COLON");
  let key = union(env);
  token$4(env, "T_RBRACKET");
  token$4(env, "T_COLON");
  let value = union(env);
  return [
          btwn(start_loc, value[0]),
          {
            id: match[0],
            key: key,
            value: value,
            static: $$static
          }
        ];
}

function semicolon$1(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return error_unexpected(env);
  }
  switch (match) {
    case "T_RCURLY" :
        return ;
    case "T_SEMICOLON" :
    case "T_COMMA" :
        return token$3(env);
    default:
      return error_unexpected(env);
  }
}

function properties(allow_static, env, _param) {
  while(true) {
    let param = _param;
    let callProperties = param[2];
    let indexers = param[1];
    let acc = param[0];
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    let $$static = allow_static && maybe(env, "T_STATIC");
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    let exit = 0;
    if (typeof match !== "object") {
      switch (match) {
        case "T_LBRACKET" :
            let indexer = indexer_property(env, start_loc, $$static);
            semicolon$1(env);
            _param = [
              acc,
              {
                hd: indexer,
                tl: indexers
              },
              callProperties
            ];
            continue ;
        case "T_LPAREN" :
        case "T_LESS_THAN" :
            exit = 3;
            break;
        case "T_RCURLY" :
        case "T_EOF" :
            exit = 2;
            break;
        default:
          exit = 1;
      }
    } else {
      exit = 1;
    }
    switch (exit) {
      case 1 :
          let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
          let match$2;
          let exit$1 = 0;
          if ($$static && typeof match$1 !== "object" && match$1 === "T_COLON") {
            strict_error_at(env, [
                  start_loc,
                  "StrictReservedWord"
                ]);
            let static_key_1 = {
              TAG: "Identifier",
              _0: [
                start_loc,
                {
                  name: "static",
                  typeAnnotation: undefined,
                  optional: false
                }
              ]
            };
            let static_key = [
              start_loc,
              static_key_1
            ];
            match$2 = [
              false,
              static_key
            ];
          } else {
            exit$1 = 4;
          }
          if (exit$1 === 4) {
            push_lex_mode(env, "NORMAL");
            let key = Curry._1(Parse.object_key, env);
            pop_lex_mode(env);
            match$2 = [
              $$static,
              key
            ];
          }
          let key$1 = match$2[1][1];
          let $$static$1 = match$2[0];
          let match$3 = Curry._2(Parser_env_Peek.token, undefined, env);
          let property$1;
          if (typeof match$3 !== "object") {
            switch (match$3) {
              case "T_LPAREN" :
              case "T_LESS_THAN" :
                  property$1 = method_property(env, start_loc, $$static$1, key$1);
                  break;
              default:
                property$1 = property(env, start_loc, $$static$1, key$1);
            }
          } else {
            property$1 = property(env, start_loc, $$static$1, key$1);
          }
          semicolon$1(env);
          _param = [
            {
              hd: property$1,
              tl: acc
            },
            indexers,
            callProperties
          ];
          continue ;
      case 2 :
          return [
                  List.rev(acc),
                  List.rev(indexers),
                  List.rev(callProperties)
                ];
      case 3 :
          let call_prop = call_property(env, start_loc, $$static);
          semicolon$1(env);
          _param = [
            acc,
            indexers,
            {
              hd: call_prop,
              tl: callProperties
            }
          ];
          continue ;
      
    }
  };
}

function _object(allow_staticOpt, env) {
  let allow_static = allow_staticOpt !== undefined ? allow_staticOpt : false;
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let match = properties(allow_static, env, [
        /* [] */0,
        /* [] */0,
        /* [] */0
      ]);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  return [
          btwn(start_loc, end_loc),
          {
            properties: match[0],
            indexers: match[1],
            callProperties: match[2]
          }
        ];
}

function types(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RBRACKET" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let acc_0 = union(env);
    let acc$1 = {
      hd: acc_0,
      tl: acc
    };
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RBRACKET") {
      token$4(env, "T_COMMA");
    }
    _acc = acc$1;
    continue ;
  };
}

function params$1(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_GREATER_THAN" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let acc_0 = union(env);
    let acc$1 = {
      hd: acc_0,
      tl: acc
    };
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_GREATER_THAN") {
      token$4(env, "T_COMMA");
    }
    _acc = acc$1;
    continue ;
  };
}

function type_parameter_instantiation(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_LESS_THAN") {
    return ;
  }
  token$4(env, "T_LESS_THAN");
  let params$2 = params$1(env, /* [] */0);
  let loc = btwn(start_loc, Curry._2(Parser_env_Peek.loc, undefined, env));
  token$4(env, "T_GREATER_THAN");
  return [
          loc,
          {
            params: params$2
          }
        ];
}

function identifier(env, _param) {
  while(true) {
    let param = _param;
    let qualification = param[1];
    let q_loc = param[0];
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_PERIOD") {
      return [
              q_loc,
              qualification
            ];
    }
    token$4(env, "T_PERIOD");
    let id = Curry._2(Parse.identifier, undefined, env);
    let loc = btwn(q_loc, id[0]);
    let qualification$1 = {
      TAG: "Qualified",
      _0: [
        loc,
        {
          qualification: qualification,
          id: id
        }
      ]
    };
    _param = [
      loc,
      qualification$1
    ];
    continue ;
  };
}

function raw_generic_with_identifier(env, id) {
  let id_0 = id[0];
  let id_1 = {
    TAG: "Unqualified",
    _0: id
  };
  let id$1 = [
    id_0,
    id_1
  ];
  let match = identifier(env, id$1);
  let id_loc = match[0];
  let typeParameters = Curry._1(type_parameter_instantiation, env);
  let loc = typeParameters !== undefined ? btwn(id_loc, typeParameters[0]) : id_loc;
  return [
          loc,
          {
            id: match[1],
            typeParameters: typeParameters
          }
        ];
}

function union_with(env, left) {
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_BIT_OR") {
    let _acc = {
      hd: left,
      tl: /* [] */0
    };
    while(true) {
      let acc = _acc;
      let match = Curry._2(Parser_env_Peek.token, undefined, env);
      if (typeof match !== "object" && match === "T_BIT_OR") {
        token$4(env, "T_BIT_OR");
        _acc = {
          hd: intersection(env),
          tl: acc
        };
        continue ;
      }
      let match$1 = rev_nonempty_acc(acc);
      return [
              match$1[0],
              {
                TAG: "Union",
                _0: match$1[1]
              }
            ];
    };
  } else {
    return left;
  }
}

let _type = union;

function annotation(env) {
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeAnnotation");
  }
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_COLON");
  let typeAnnotation = union(env);
  let loc = env.last_loc.contents;
  let end_loc;
  if (loc !== undefined) {
    end_loc = loc;
  } else {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "parser_flow.ml",
            121,
            16
          ],
          Error: new Error()
        };
  }
  return [
          btwn(start_loc, end_loc),
          typeAnnotation
        ];
}

function annotation_opt(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match !== "object" && match === "T_COLON") {
    return annotation(env);
  }
  
}

function wrap(f, env) {
  let env$1 = with_strict(true, env);
  push_lex_mode(env$1, "TYPE");
  let ret = Curry._1(f, env$1);
  pop_lex_mode(env$1);
  return ret;
}

let partial_arg = Curry._1(type_parameter_declaration, true);

function type_parameter_declaration_with_defaults(param) {
  return wrap(partial_arg, param);
}

let partial_arg$1 = Curry._1(type_parameter_declaration, false);

function type_parameter_declaration$1(param) {
  return wrap(partial_arg$1, param);
}

function _object$1(allow_staticOpt, env) {
  let allow_static = allow_staticOpt !== undefined ? allow_staticOpt : false;
  return wrap(Curry._1(_object, allow_static), env);
}

function pattern(check_env, _param) {
  while(true) {
    let param = _param;
    let p = param[1];
    switch (p.TAG) {
      case "Object" :
          let o = p._0;
          return List.fold_left(object_property, check_env, o.properties);
      case "Array" :
          let arr = p._0;
          return List.fold_left(array_element, check_env, arr.elements);
      case "Assignment" :
          _param = p._0.left;
          continue ;
      case "Identifier" :
          let id = p._0;
          let name = id[1].name;
          let param_names = check_env[1];
          let env = check_env[0];
          if (mem$1(name, param_names)) {
            error_at(env, [
                  id[0],
                  "StrictParamDupe"
                ]);
          }
          let match = identifier_no_dupe_check([
                env,
                param_names
              ], id);
          return [
                  match[0],
                  add$1(name, match[1])
                ];
      case "Expression" :
          error_at(check_env[0], [
                param[0],
                "ExpectedPatternFoundExpression"
              ]);
          return check_env;
      
    }
  };
}

function object_property(check_env, param) {
  if (param.TAG !== "Property") {
    return pattern(check_env, param._0[1].argument);
  }
  let property = param._0[1];
  let id = property.key;
  let check_env$1;
  switch (id.TAG) {
    case "Identifier" :
        check_env$1 = identifier_no_dupe_check(check_env, id._0);
        break;
    case "Literal" :
    case "Computed" :
        check_env$1 = check_env;
        break;
    
  }
  return pattern(check_env$1, property.pattern);
}

function array_element(check_env, param) {
  if (param !== undefined) {
    if (param.TAG === "Element") {
      return pattern(check_env, param._0);
    } else {
      return pattern(check_env, param._0[1].argument);
    }
  } else {
    return check_env;
  }
}

function identifier_no_dupe_check(param, param$1) {
  let name = param$1[1].name;
  let loc = param$1[0];
  let env = param[0];
  if (is_restricted(name)) {
    strict_error_at(env, [
          loc,
          "StrictParamName"
        ]);
  }
  if (is_future_reserved(name) || is_strict_reserved(name)) {
    strict_error_at(env, [
          loc,
          "StrictReservedWord"
        ]);
  }
  return [
          env,
          param[1]
        ];
}

function strict_post_check(env, strict, simple, id, params) {
  if (!(strict || !simple)) {
    return ;
  }
  let env$1 = strict ? with_strict(!env.in_strict_mode, env) : env;
  if (id !== undefined) {
    let name = id[1].name;
    let loc = id[0];
    if (is_restricted(name)) {
      strict_error_at(env$1, [
            loc,
            "StrictFunctionName"
          ]);
    }
    if (is_future_reserved(name) || is_strict_reserved(name)) {
      strict_error_at(env$1, [
            loc,
            "StrictReservedWord"
          ]);
    }
    
  }
  List.fold_left(pattern, [
        env$1,
        "Empty"
      ], params);
}

function param$1(env) {
  let id = Curry._2(Parse.pattern, env, "StrictParamName");
  if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_ASSIGN") {
    return [
            id,
            undefined
          ];
  }
  token$4(env, "T_ASSIGN");
  let $$default = Curry._1(Parse.assignment, env);
  return [
          id,
          $$default
        ];
}

function param_list(env, _param) {
  while(true) {
    let param$2 = _param;
    let has_default = param$2[2];
    let defaults = param$2[1];
    let params = param$2[0];
    let t = Curry._2(Parser_env_Peek.token, undefined, env);
    let exit = 0;
    if (typeof t !== "object") {
      switch (t) {
        case "T_RPAREN" :
        case "T_ELLIPSIS" :
        case "T_EOF" :
            exit = 2;
            break;
        default:
          exit = 1;
      }
    } else {
      exit = 1;
    }
    switch (exit) {
      case 1 :
          let match = param$1(env);
          let $$default = match[1];
          let has_default$1 = has_default || $$default !== undefined;
          if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RPAREN") {
            token$4(env, "T_COMMA");
          }
          _param = [
            {
              hd: match[0],
              tl: params
            },
            {
              hd: $$default,
              tl: defaults
            },
            has_default$1
          ];
          continue ;
      case 2 :
          let rest = t === "T_ELLIPSIS" ? (token$4(env, "T_ELLIPSIS"), Curry._2(Parse.identifier_with_type, env, "StrictParamName")) : undefined;
          if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RPAREN") {
            error(env, "ParameterAfterRestParameter");
          }
          return [
                  List.rev(params),
                  has_default ? List.rev(defaults) : /* [] */0,
                  rest
                ];
      
    }
  };
}

function function_params(env) {
  token$4(env, "T_LPAREN");
  let match = param_list(env, [
        /* [] */0,
        /* [] */0,
        false
      ]);
  token$4(env, "T_RPAREN");
  return [
          match[0],
          match[1],
          match[2]
        ];
}

function function_body(env, async, generator) {
  let env$1 = enter_function(env, async, generator);
  let match = Curry._1(Parse.function_block_body, env$1);
  let loc = match[0];
  return [
          loc,
          {
            TAG: "BodyBlock",
            _0: [
              loc,
              match[1]
            ]
          },
          match[2]
        ];
}

function generator(env, is_async) {
  let match = maybe(env, "T_MULT");
  if (is_async && match) {
    error(env, "AsyncGenerator");
    return true;
  } else {
    return match;
  }
}

function is_simple_param(param) {
  if (param[1].TAG === "Identifier") {
    return true;
  } else {
    return false;
  }
}

function is_simple_function_params(params, defaults, rest) {
  if (defaults === /* [] */0 && rest === undefined) {
    return List.for_all(is_simple_param, params);
  } else {
    return false;
  }
}

function _function(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let async = maybe(env, "T_ASYNC");
  token$4(env, "T_FUNCTION");
  let generator$1 = generator(env, async);
  let match = env.in_export;
  let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
  let match$2;
  let exit = 0;
  if (match && typeof match$1 !== "object") {
    switch (match$1) {
      case "T_LPAREN" :
          match$2 = [
            undefined,
            undefined
          ];
          break;
      case "T_LESS_THAN" :
          let typeParams = Curry._1(type_parameter_declaration$1, env);
          let id = Curry._2(Parser_env_Peek.token, undefined, env) === "T_LPAREN" ? undefined : Curry._2(Parse.identifier, "StrictFunctionName", env);
          match$2 = [
            typeParams,
            id
          ];
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    let id$1 = Curry._2(Parse.identifier, "StrictFunctionName", env);
    match$2 = [
      Curry._1(type_parameter_declaration$1, env),
      id$1
    ];
  }
  let id$2 = match$2[1];
  let match$3 = function_params(env);
  let rest = match$3[2];
  let defaults = match$3[1];
  let params = match$3[0];
  let returnType = wrap(annotation_opt, env);
  let predicate = Curry._1(Parse.predicate, env);
  let match$4 = function_body(env, async, generator$1);
  let body = match$4[1];
  let simple = is_simple_function_params(params, defaults, rest);
  strict_post_check(env, match$4[2], simple, id$2, params);
  let match$5;
  match$5 = body.TAG === "BodyBlock" ? [
      body._0[0],
      false
    ] : [
      body._0[0],
      true
    ];
  return [
          btwn(start_loc, match$5[0]),
          {
            TAG: "FunctionDeclaration",
            _0: {
              id: id$2,
              params: params,
              defaults: defaults,
              rest: rest,
              body: body,
              async: async,
              generator: generator$1,
              predicate: predicate,
              expression: match$5[1],
              returnType: returnType,
              typeParameters: match$2[0]
            }
          }
        ];
}

function variable_declaration(env) {
  let id = Curry._2(Parse.pattern, env, "StrictVarName");
  let match;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_ASSIGN") {
    token$4(env, "T_ASSIGN");
    match = [
      Curry._1(Parse.assignment, env),
      /* [] */0
    ];
  } else {
    match = id[1].TAG === "Identifier" ? [
        undefined,
        /* [] */0
      ] : [
        undefined,
        {
          hd: [
            id[0],
            "NoUninitializedDestructuring"
          ],
          tl: /* [] */0
        }
      ];
  }
  let init = match[0];
  let end_loc = init !== undefined ? init[0] : id[0];
  return [
          [
            btwn(id[0], end_loc),
            {
              id: id,
              init: init
            }
          ],
          match[1]
        ];
}

function helper(env, _decls, _errs) {
  while(true) {
    let errs = _errs;
    let decls = _decls;
    let match = variable_declaration(env);
    let decl = match[0];
    let decls$1 = {
      hd: decl,
      tl: decls
    };
    let errs$1 = Pervasives.$at(match[1], errs);
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COMMA") {
      token$4(env, "T_COMMA");
      _errs = errs$1;
      _decls = decls$1;
      continue ;
    }
    let end_loc = decl[0];
    let declarations = List.rev(decls$1);
    let start_loc = decl[0];
    return [
            btwn(start_loc, end_loc),
            declarations,
            List.rev(errs$1)
          ];
  };
}

function declarations(token$5, kind, env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, token$5);
  let match = helper(env, /* [] */0, /* [] */0);
  return [
          [
            btwn(start_loc, match[0]),
            {
              declarations: match[1],
              kind: kind
            }
          ],
          match[2]
        ];
}

function $$const(env) {
  let env$1 = with_no_let(true, env);
  let match = declarations("T_CONST", "Const", env$1);
  let match$1 = match[0];
  let variable = match$1[1];
  let errs = List.fold_left((function (errs, decl) {
          if (decl[1].init !== undefined) {
            return errs;
          } else {
            return {
                    hd: [
                      decl[0],
                      "NoUninitializedConst"
                    ],
                    tl: errs
                  };
          }
        }), match[1], variable.declarations);
  return [
          [
            match$1[0],
            variable
          ],
          List.rev(errs)
        ];
}

function _let(env) {
  let env$1 = with_no_let(true, env);
  return declarations("T_LET", "Let", env$1);
}

function variable(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let match$1;
  if (typeof match !== "object") {
    switch (match) {
      case "T_VAR" :
          match$1 = declarations("T_VAR", "Var", env);
          break;
      case "T_CONST" :
          match$1 = $$const(env);
          break;
      case "T_LET" :
          match$1 = _let(env);
          break;
      default:
        error_unexpected(env);
        match$1 = declarations("T_VAR", "Var", env);
    }
  } else {
    error_unexpected(env);
    match$1 = declarations("T_VAR", "Var", env);
  }
  let match$2 = match$1[0];
  return [
          [
            btwn(start_loc, match$2[0]),
            {
              TAG: "VariableDeclaration",
              _0: match$2[1]
            }
          ],
          match$1[1]
        ];
}

function is_tighter(a, b) {
  let a_prec;
  a_prec = a.TAG === "Left_assoc" ? a._0 : a._0 - 1 | 0;
  return a_prec >= b._0;
}

function is_lhs(param) {
  let tmp = param[1];
  if (typeof tmp !== "object") {
    return false;
  }
  switch (tmp.TAG) {
    case "Member" :
    case "Identifier" :
        return true;
    default:
      return false;
  }
}

function is_assignable_lhs(param) {
  let tmp = param[1];
  if (typeof tmp !== "object") {
    return false;
  }
  switch (tmp.TAG) {
    case "Array" :
    case "Object" :
    case "Member" :
    case "Identifier" :
        return true;
    default:
      return false;
  }
}

function assignment_op(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let op;
  if (typeof match !== "object") {
    switch (match) {
      case "T_RSHIFT3_ASSIGN" :
          op = "RShift3Assign";
          break;
      case "T_RSHIFT_ASSIGN" :
          op = "RShiftAssign";
          break;
      case "T_LSHIFT_ASSIGN" :
          op = "LShiftAssign";
          break;
      case "T_BIT_XOR_ASSIGN" :
          op = "BitXorAssign";
          break;
      case "T_BIT_OR_ASSIGN" :
          op = "BitOrAssign";
          break;
      case "T_BIT_AND_ASSIGN" :
          op = "BitAndAssign";
          break;
      case "T_MOD_ASSIGN" :
          op = "ModAssign";
          break;
      case "T_DIV_ASSIGN" :
          op = "DivAssign";
          break;
      case "T_MULT_ASSIGN" :
          op = "MultAssign";
          break;
      case "T_EXP_ASSIGN" :
          op = "ExpAssign";
          break;
      case "T_MINUS_ASSIGN" :
          op = "MinusAssign";
          break;
      case "T_PLUS_ASSIGN" :
          op = "PlusAssign";
          break;
      case "T_ASSIGN" :
          op = "Assign";
          break;
      default:
        op = undefined;
    }
  } else {
    op = undefined;
  }
  if (op !== undefined) {
    token$3(env);
  }
  return op;
}

function conditional(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let expr = Curry._1(logical, env);
  if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_PLING") {
    return expr;
  }
  token$4(env, "T_PLING");
  let env$p = with_no_in(false, env);
  let consequent = Curry._1(assignment, env$p);
  token$4(env, "T_COLON");
  let match = with_loc(assignment, env);
  let loc = btwn(start_loc, match[0]);
  return [
          loc,
          {
            TAG: "Conditional",
            _0: {
              test: expr,
              consequent: consequent,
              alternate: match[1]
            }
          }
        ];
}

function peek_unary_op(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return ;
  }
  switch (match) {
    case "T_DELETE" :
        return "Delete";
    case "T_TYPEOF" :
        return "Typeof";
    case "T_VOID" :
        return "Void";
    case "T_AWAIT" :
        if (env.allow_await) {
          return "Await";
        } else {
          return ;
        }
    case "T_PLUS" :
        return "Plus";
    case "T_MINUS" :
        return "Minus";
    case "T_NOT" :
        return "Not";
    case "T_BIT_NOT" :
        return "BitNot";
    default:
      return ;
  }
}

function unary(env) {
  let begin_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let op = peek_unary_op(env);
  if (op !== undefined) {
    token$3(env);
    let argument = unary(env);
    let loc = btwn(begin_loc, argument[0]);
    if (op === "Delete") {
      let tmp = argument[1];
      if (typeof tmp === "object" && tmp.TAG === "Identifier") {
        strict_error_at(env, [
              loc,
              "StrictDelete"
            ]);
      }
      
    }
    return [
            loc,
            {
              TAG: "Unary",
              _0: {
                operator: op,
                prefix: true,
                argument: argument
              }
            }
          ];
  }
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let op$1;
  if (typeof match !== "object") {
    switch (match) {
      case "T_INCR" :
          op$1 = "Increment";
          break;
      case "T_DECR" :
          op$1 = "Decrement";
          break;
      default:
        op$1 = undefined;
    }
  } else {
    op$1 = undefined;
  }
  if (op$1 === undefined) {
    let argument$1 = left_hand_side(env);
    if (Curry._1(Parser_env_Peek.is_line_terminator, env)) {
      return argument$1;
    }
    let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let op$2;
    if (typeof match$1 !== "object") {
      switch (match$1) {
        case "T_INCR" :
            op$2 = "Increment";
            break;
        case "T_DECR" :
            op$2 = "Decrement";
            break;
        default:
          op$2 = undefined;
      }
    } else {
      op$2 = undefined;
    }
    if (op$2 === undefined) {
      return argument$1;
    }
    if (!is_lhs(argument$1)) {
      error_at(env, [
            argument$1[0],
            "InvalidLHSInAssignment"
          ]);
    }
    let match$2 = argument$1[1];
    if (typeof match$2 === "object" && match$2.TAG === "Identifier") {
      if (is_restricted(match$2._0[1].name)) {
        strict_error(env, "StrictLHSPostfix");
      }
      
    }
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$3(env);
    return [
            btwn(argument$1[0], end_loc),
            {
              TAG: "Update",
              _0: {
                operator: op$2,
                argument: argument$1,
                prefix: false
              }
            }
          ];
  }
  token$3(env);
  let argument$2 = unary(env);
  if (!is_lhs(argument$2)) {
    error_at(env, [
          argument$2[0],
          "InvalidLHSInAssignment"
        ]);
  }
  let match$3 = argument$2[1];
  if (typeof match$3 === "object" && match$3.TAG === "Identifier") {
    if (is_restricted(match$3._0[1].name)) {
      strict_error(env, "StrictLHSPrefix");
    }
    
  }
  return [
          btwn(begin_loc, argument$2[0]),
          {
            TAG: "Update",
            _0: {
              operator: op$1,
              argument: argument$2,
              prefix: true
            }
          }
        ];
}

function left_hand_side(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let expr;
  let exit = 0;
  if (typeof match !== "object" && match === "T_NEW") {
    expr = _new(env, (function (new_expr, _args) {
            return new_expr;
          }));
  } else {
    exit = 1;
  }
  if (exit === 1) {
    expr = Curry._2(Parser_env_Peek.is_function, undefined, env) ? _function$1(env) : primary$1(env);
  }
  let expr$1 = member(env, expr);
  let part = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof part !== "object") {
    if (part === "T_LPAREN") {
      return call(env, expr$1);
    } else {
      return expr$1;
    }
  } else if (part.TAG === "T_TEMPLATE_PART") {
    return member(env, tagged_template(env, expr$1, part._0));
  } else {
    return expr$1;
  }
}

function call(env, _left) {
  while(true) {
    let left = _left;
    let part = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof part === "object") {
      if (part.TAG === "T_TEMPLATE_PART") {
        return tagged_template(env, left, part._0);
      } else {
        return left;
      }
    }
    switch (part) {
      case "T_LPAREN" :
          if (env.no_call) {
            return left;
          }
          let match = Curry._1($$arguments, env);
          _left = [
            btwn(left[0], match[0]),
            {
              TAG: "Call",
              _0: {
                callee: left,
                arguments: match[1]
              }
            }
          ];
          continue ;
      case "T_LBRACKET" :
          token$4(env, "T_LBRACKET");
          let expr = Curry._1(Parse.expression, env);
          let last_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
          let loc = btwn(left[0], last_loc);
          token$4(env, "T_RBRACKET");
          _left = [
            loc,
            {
              TAG: "Member",
              _0: {
                _object: left,
                property: {
                  TAG: "PropertyExpression",
                  _0: expr
                },
                computed: true
              }
            }
          ];
          continue ;
      case "T_PERIOD" :
          token$4(env, "T_PERIOD");
          let match$1 = identifier_or_reserved_keyword(env);
          let id = match$1[0];
          _left = [
            btwn(left[0], id[0]),
            {
              TAG: "Member",
              _0: {
                _object: left,
                property: {
                  TAG: "PropertyIdentifier",
                  _0: id
                },
                computed: false
              }
            }
          ];
          continue ;
      default:
        return left;
    }
  };
}

function _new(env, _finish_fn) {
  while(true) {
    let finish_fn = _finish_fn;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object" && match === "T_NEW") {
      let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
      token$4(env, "T_NEW");
      let finish_fn$p = (function(finish_fn,start_loc){
      return function finish_fn$p(callee, args) {
        let match = args !== undefined ? [
            args[0],
            args[1]
          ] : [
            callee[0],
            /* [] */0
          ];
        let callee$p_0 = btwn(start_loc, match[0]);
        let callee$p_1 = {
          TAG: "New",
          _0: {
            callee: callee,
            arguments: match[1]
          }
        };
        let callee$p = [
          callee$p_0,
          callee$p_1
        ];
        return Curry._2(finish_fn, callee$p, undefined);
      }
      }(finish_fn,start_loc));
      _finish_fn = finish_fn$p;
      continue ;
    }
    Curry._2(Parser_env_Peek.token, undefined, env);
    let expr = Curry._2(Parser_env_Peek.is_function, undefined, env) ? _function$1(env) : primary$1(env);
    let callee = member(with_no_call(true, env), expr);
    let part = Curry._2(Parser_env_Peek.token, undefined, env);
    let callee$1;
    callee$1 = typeof part !== "object" || part.TAG !== "T_TEMPLATE_PART" ? callee : tagged_template(env, callee, part._0);
    let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let args;
    args = typeof match$1 !== "object" && match$1 === "T_LPAREN" ? Curry._1($$arguments, env) : undefined;
    return Curry._2(finish_fn, callee$1, args);
  };
}

function member(env, left) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return left;
  }
  switch (match) {
    case "T_LBRACKET" :
        token$4(env, "T_LBRACKET");
        let expr = Curry._1(Parse.expression, with_no_call(false, env));
        let last_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
        token$4(env, "T_RBRACKET");
        return call(env, [
                    btwn(left[0], last_loc),
                    {
                      TAG: "Member",
                      _0: {
                        _object: left,
                        property: {
                          TAG: "PropertyExpression",
                          _0: expr
                        },
                        computed: true
                      }
                    }
                  ]);
    case "T_PERIOD" :
        token$4(env, "T_PERIOD");
        let match$1 = identifier_or_reserved_keyword(env);
        let id = match$1[0];
        return call(env, [
                    btwn(left[0], id[0]),
                    {
                      TAG: "Member",
                      _0: {
                        _object: left,
                        property: {
                          TAG: "PropertyIdentifier",
                          _0: id
                        },
                        computed: false
                      }
                    }
                  ]);
    default:
      return left;
  }
}

function _function$1(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let async = maybe(env, "T_ASYNC");
  token$4(env, "T_FUNCTION");
  let generator$1 = generator(env, async);
  let match;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_LPAREN") {
    match = [
      undefined,
      undefined
    ];
  } else {
    let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let id;
    id = typeof match$1 !== "object" && match$1 === "T_LESS_THAN" ? undefined : Curry._2(Parse.identifier, "StrictFunctionName", env);
    match = [
      id,
      Curry._1(type_parameter_declaration$1, env)
    ];
  }
  let id$1 = match[0];
  let match$2 = function_params(env);
  let rest = match$2[2];
  let defaults = match$2[1];
  let params = match$2[0];
  let returnType = wrap(annotation_opt, env);
  let predicate = Curry._1(Parse.predicate, env);
  let match$3 = function_body(env, async, generator$1);
  let body = match$3[1];
  let simple = is_simple_function_params(params, defaults, rest);
  strict_post_check(env, match$3[2], simple, id$1, params);
  let expression;
  expression = body.TAG === "BodyBlock" ? false : true;
  return [
          btwn(start_loc, match$3[0]),
          {
            TAG: "Function",
            _0: {
              id: id$1,
              params: params,
              defaults: defaults,
              rest: rest,
              body: body,
              async: async,
              generator: generator$1,
              predicate: predicate,
              expression: expression,
              returnType: returnType,
              typeParameters: match[1]
            }
          }
        ];
}

function number(env, number_type) {
  let value = Curry._2(Parser_env_Peek.value, undefined, env);
  let value$1;
  switch (number_type) {
    case "LEGACY_OCTAL" :
        strict_error(env, "StrictOctalLiteral");
        value$1 = Caml_format.int_of_string("0o" + value);
        break;
    case "BINARY" :
    case "OCTAL" :
        value$1 = Caml_format.int_of_string(value);
        break;
    case "NORMAL" :
        try {
          value$1 = float_of_string(value);
        }
        catch (exn){
          if (Sys.win32) {
            error(env, "WindowsFloatOfString");
            value$1 = 789.0;
          } else {
            throw exn;
          }
        }
        break;
    
  }
  token$4(env, {
        TAG: "T_NUMBER",
        _0: number_type
      });
  return value$1;
}

function primary$1(env) {
  let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let number_type = Curry._2(Parser_env_Peek.token, undefined, env);
  let exit = 0;
  if (typeof number_type !== "object") {
    switch (number_type) {
      case "T_LCURLY" :
          let match = Curry._1(Parse.object_initializer, env);
          return [
                  match[0],
                  {
                    TAG: "Object",
                    _0: match[1]
                  }
                ];
      case "T_LPAREN" :
          token$4(env, "T_LPAREN");
          let expression = Curry._1(assignment, env);
          let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
          let ret;
          if (typeof match$1 !== "object") {
            switch (match$1) {
              case "T_COMMA" :
                  ret = sequence(env, {
                        hd: expression,
                        tl: /* [] */0
                      });
                  break;
              case "T_COLON" :
                  let typeAnnotation = wrap(annotation, env);
                  ret = [
                    btwn(expression[0], typeAnnotation[0]),
                    {
                      TAG: "TypeCast",
                      _0: {
                        expression: expression,
                        typeAnnotation: typeAnnotation
                      }
                    }
                  ];
                  break;
              default:
                ret = expression;
            }
          } else {
            ret = expression;
          }
          token$4(env, "T_RPAREN");
          return ret;
      case "T_LBRACKET" :
          let match$2 = Curry._1(array_initializer, env);
          return [
                  match$2[0],
                  {
                    TAG: "Array",
                    _0: match$2[1]
                  }
                ];
      case "T_THIS" :
          token$4(env, "T_THIS");
          return [
                  loc,
                  "This"
                ];
      case "T_NULL" :
          let raw = Curry._2(Parser_env_Peek.value, undefined, env);
          token$4(env, "T_NULL");
          return [
                  loc,
                  {
                    TAG: "Literal",
                    _0: {
                      value: "Null",
                      raw: raw
                    }
                  }
                ];
      case "T_FALSE" :
      case "T_TRUE" :
          exit = 2;
          break;
      case "T_CLASS" :
          return Curry._1(Parse.class_expression, env);
      case "T_SUPER" :
          let loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env);
          token$4(env, "T_SUPER");
          let id_1 = {
            name: "super",
            typeAnnotation: undefined,
            optional: false
          };
          let id = [
            loc$1,
            id_1
          ];
          return [
                  loc$1,
                  {
                    TAG: "Identifier",
                    _0: id
                  }
                ];
      case "T_LESS_THAN" :
          let match$3 = Curry._1(Parse.jsx_element, env);
          return [
                  match$3[0],
                  {
                    TAG: "JSXElement",
                    _0: match$3[1]
                  }
                ];
      case "T_DIV_ASSIGN" :
      case "T_DIV" :
          push_lex_mode(env, "REGEXP");
          let loc$2 = Curry._2(Parser_env_Peek.loc, undefined, env);
          let match$4 = Curry._2(Parser_env_Peek.token, undefined, env);
          let match$5;
          if (typeof match$4 !== "object") {
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "parser_flow.ml",
                    1699,
                    15
                  ],
                  Error: new Error()
                };
          }
          if (match$4.TAG === "T_REGEXP") {
            let match$6 = match$4._0;
            let raw$1 = Curry._2(Parser_env_Peek.value, undefined, env);
            token$3(env);
            match$5 = [
              raw$1,
              match$6[1],
              match$6[2]
            ];
          } else {
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "parser_flow.ml",
                    1699,
                    15
                  ],
                  Error: new Error()
                };
          }
          let raw_flags = match$5[2];
          pop_lex_mode(env);
          let filtered_flags = $$Buffer.create(raw_flags.length);
          $$String.iter((function (c) {
                  if (c >= 110) {
                    if (c !== 121) {
                      return ;
                    } else {
                      return $$Buffer.add_char(filtered_flags, c);
                    }
                  }
                  if (c < 103) {
                    return ;
                  }
                  switch (c) {
                    case 104 :
                    case 106 :
                    case 107 :
                    case 108 :
                        return ;
                    case 103 :
                    case 105 :
                    case 109 :
                        return $$Buffer.add_char(filtered_flags, c);
                    
                  }
                }), raw_flags);
          let flags = $$Buffer.contents(filtered_flags);
          if (flags !== raw_flags) {
            error(env, {
                  TAG: "InvalidRegExpFlags",
                  _0: raw_flags
                });
          }
          let value = {
            TAG: "RegExp",
            _0: {
              pattern: match$5[1],
              flags: flags
            }
          };
          return [
                  loc$2,
                  {
                    TAG: "Literal",
                    _0: {
                      value: value,
                      raw: match$5[0]
                    }
                  }
                ];
      default:
        exit = 1;
    }
  } else {
    switch (number_type.TAG) {
      case "T_NUMBER" :
          let raw$2 = Curry._2(Parser_env_Peek.value, undefined, env);
          let value$1 = {
            TAG: "Number",
            _0: number(env, number_type._0)
          };
          return [
                  loc,
                  {
                    TAG: "Literal",
                    _0: {
                      value: value$1,
                      raw: raw$2
                    }
                  }
                ];
      case "T_STRING" :
          let match$7 = number_type._0;
          let octal = match$7[3];
          let raw$3 = match$7[2];
          let value$2 = match$7[1];
          let loc$3 = match$7[0];
          if (octal) {
            strict_error(env, "StrictOctalLiteral");
          }
          token$4(env, {
                TAG: "T_STRING",
                _0: [
                  loc$3,
                  value$2,
                  raw$3,
                  octal
                ]
              });
          let value$3 = {
            TAG: "String",
            _0: value$2
          };
          return [
                  loc$3,
                  {
                    TAG: "Literal",
                    _0: {
                      value: value$3,
                      raw: raw$3
                    }
                  }
                ];
      case "T_TEMPLATE_PART" :
          let match$8 = Curry._2(template_literal, env, number_type._0);
          return [
                  match$8[0],
                  {
                    TAG: "TemplateLiteral",
                    _0: match$8[1]
                  }
                ];
      default:
        exit = 1;
    }
  }
  switch (exit) {
    case 1 :
        if (Curry._2(Parser_env_Peek.is_identifier, undefined, env)) {
          let id$1 = Curry._2(Parse.identifier, undefined, env);
          return [
                  id$1[0],
                  {
                    TAG: "Identifier",
                    _0: id$1
                  }
                ];
        }
        error_unexpected(env);
        if (number_type === "T_ERROR") {
          token$3(env);
        }
        return [
                loc,
                {
                  TAG: "Literal",
                  _0: {
                    value: "Null",
                    raw: "null"
                  }
                }
              ];
    case 2 :
        let raw$4 = Curry._2(Parser_env_Peek.value, undefined, env);
        token$4(env, number_type);
        let value$4 = {
          TAG: "Boolean",
          _0: number_type === "T_TRUE"
        };
        return [
                loc,
                {
                  TAG: "Literal",
                  _0: {
                    value: value$4,
                    raw: raw$4
                  }
                }
              ];
    
  }
}

function tagged_template(env, tag, part) {
  let quasi = Curry._2(template_literal, env, part);
  return [
          btwn(tag[0], quasi[0]),
          {
            TAG: "TaggedTemplate",
            _0: {
              tag: tag,
              quasi: quasi
            }
          }
        ];
}

function sequence(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object" && match === "T_COMMA") {
      token$4(env, "T_COMMA");
      let expr = Curry._1(assignment, env);
      _acc = {
        hd: expr,
        tl: acc
      };
      continue ;
    }
    let last_loc = acc ? acc.hd[0] : none;
    let expressions = List.rev(acc);
    let first_loc = expressions ? expressions.hd[0] : none;
    return [
            btwn(first_loc, last_loc),
            {
              TAG: "Sequence",
              _0: {
                expressions: expressions
              }
            }
          ];
  };
}

function identifier_or_reserved_keyword(env) {
  let lex_token = Curry._2(Parser_env_Peek.token, undefined, env);
  let lex_value = Curry._2(Parser_env_Peek.value, undefined, env);
  let lex_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let exit = 0;
  if (typeof lex_token !== "object") {
    switch (lex_token) {
      case "T_IDENTIFIER" :
      case "T_DECLARE" :
      case "T_TYPE" :
      case "T_OF" :
      case "T_ASYNC" :
          exit = 2;
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 :
        let err;
        let exit$1 = 0;
        if (typeof lex_token !== "object") {
          switch (lex_token) {
            case "T_FUNCTION" :
            case "T_IF" :
            case "T_IN" :
            case "T_INSTANCEOF" :
            case "T_RETURN" :
            case "T_SWITCH" :
            case "T_THIS" :
            case "T_THROW" :
            case "T_TRY" :
            case "T_VAR" :
            case "T_WHILE" :
            case "T_WITH" :
            case "T_CONST" :
            case "T_LET" :
            case "T_NULL" :
            case "T_FALSE" :
            case "T_TRUE" :
            case "T_BREAK" :
            case "T_CASE" :
            case "T_CATCH" :
            case "T_CONTINUE" :
            case "T_DEFAULT" :
            case "T_DO" :
            case "T_FINALLY" :
            case "T_FOR" :
            case "T_CLASS" :
            case "T_EXTENDS" :
            case "T_STATIC" :
            case "T_ELSE" :
            case "T_NEW" :
            case "T_DELETE" :
            case "T_TYPEOF" :
            case "T_VOID" :
            case "T_ENUM" :
            case "T_EXPORT" :
            case "T_IMPORT" :
            case "T_SUPER" :
            case "T_IMPLEMENTS" :
            case "T_INTERFACE" :
            case "T_PACKAGE" :
            case "T_PRIVATE" :
            case "T_PROTECTED" :
            case "T_PUBLIC" :
            case "T_YIELD" :
            case "T_DEBUGGER" :
            case "T_AWAIT" :
            case "T_ANY_TYPE" :
            case "T_BOOLEAN_TYPE" :
            case "T_NUMBER_TYPE" :
            case "T_STRING_TYPE" :
            case "T_VOID_TYPE" :
                exit$1 = 3;
                break;
            default:
              error_unexpected(env);
              err = undefined;
          }
        } else {
          error_unexpected(env);
          err = undefined;
        }
        if (exit$1 === 3) {
          err = [
            lex_loc,
            get_unexpected_error([
                  lex_token,
                  lex_value
                ])
          ];
        }
        token$3(env);
        return [
                [
                  lex_loc,
                  {
                    name: lex_value,
                    typeAnnotation: undefined,
                    optional: false
                  }
                ],
                err
              ];
    case 2 :
        return [
                Curry._2(Parse.identifier, undefined, env),
                undefined
              ];
    
  }
}

function assignment_but_not_arrow_function(env) {
  let expr = conditional(env);
  let operator = assignment_op(env);
  if (operator === undefined) {
    return expr;
  }
  if (!is_assignable_lhs(expr)) {
    error_at(env, [
          expr[0],
          "InvalidLHSInAssignment"
        ]);
  }
  let match = expr[1];
  if (typeof match === "object" && match.TAG === "Identifier") {
    if (is_restricted(match._0[1].name)) {
      strict_error_at(env, [
            expr[0],
            "StrictLHSAssignment"
          ]);
    }
    
  }
  let left = Curry._2(Parse.pattern_from_expr, env, expr);
  let right = Curry._1(assignment, env);
  let loc = btwn(left[0], right[0]);
  return [
          loc,
          {
            TAG: "Assignment",
            _0: {
              operator: operator,
              left: left,
              right: right
            }
          }
        ];
}

function error_callback(param, param$1) {
  throw {
        RE_EXN_ID: Parser_env_Try.Rollback,
        Error: new Error()
      };
}

function try_assignment_but_not_arrow_function(env) {
  let env$1 = with_error_callback(error_callback, env);
  let ret = assignment_but_not_arrow_function(env$1);
  let match = Curry._2(Parser_env_Peek.token, undefined, env$1);
  if (typeof match !== "object") {
    switch (match) {
      case "T_ARROW" :
      case "T_COLON" :
          throw {
                RE_EXN_ID: Parser_env_Try.Rollback,
                Error: new Error()
              };
      default:
        
    }
  }
  if (!Curry._2(Parser_env_Peek.is_identifier, undefined, env$1)) {
    return ret;
  }
  if (Curry._2(Parser_env_Peek.value, undefined, env$1) === "checks") {
    throw {
          RE_EXN_ID: Parser_env_Try.Rollback,
          Error: new Error()
        };
  }
  let match$1 = ret[1];
  if (typeof match$1 !== "object") {
    return ret;
  }
  if (match$1.TAG !== "Identifier") {
    return ret;
  }
  if (match$1._0[1].name !== "async") {
    return ret;
  }
  if (!Curry._1(Parser_env_Peek.is_line_terminator, env$1)) {
    throw {
          RE_EXN_ID: Parser_env_Try.Rollback,
          Error: new Error()
        };
  }
  return ret;
}

function assignment(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let match$1 = Curry._2(Parser_env_Peek.is_identifier, undefined, env);
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_YIELD" :
          if (env.allow_yield) {
            let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_YIELD");
            if (!env.allow_yield) {
              error(env, "IllegalYield");
            }
            let delegate = maybe(env, "T_MULT");
            let has_argument = !(Curry._2(Parser_env_Peek.token, undefined, env) === "T_SEMICOLON" || Curry._1(Parser_env_Peek.is_implicit_semicolon, env));
            let argument = delegate || has_argument ? Curry._1(assignment, env) : undefined;
            let end_loc;
            if (argument !== undefined) {
              end_loc = argument[0];
            } else {
              let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
              let end_loc$1 = loc !== undefined ? loc : start_loc;
              semicolon(env);
              end_loc = end_loc$1;
            }
            return [
                    btwn(start_loc, end_loc),
                    {
                      TAG: "Yield",
                      _0: {
                        argument: argument,
                        delegate: delegate
                      }
                    }
                  ];
          }
          exit = 2;
          break;
      case "T_LPAREN" :
      case "T_LESS_THAN" :
          break;
      default:
        exit = 2;
    }
  } else {
    exit = 2;
  }
  if (exit === 2 && !match$1) {
    return assignment_but_not_arrow_function(env);
  }
  let expr = Curry._2(Parser_env_Try.to_parse, env, try_assignment_but_not_arrow_function);
  if (typeof expr === "object") {
    return expr._0;
  }
  let expr$1 = Curry._2(Parser_env_Try.to_parse, env, try_arrow_function);
  if (typeof expr$1 !== "object") {
    return assignment_but_not_arrow_function(env);
  } else {
    return expr$1._0;
  }
}

function make_logical(left, right, operator, loc) {
  return [
          loc,
          {
            TAG: "Logical",
            _0: {
              operator: operator,
              left: left,
              right: right
            }
          }
        ];
}

function logical_and(env, _left, _lloc) {
  while(true) {
    let lloc = _lloc;
    let left = _left;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return [
              lloc,
              left
            ];
    }
    if (match !== "T_AND") {
      return [
              lloc,
              left
            ];
    }
    token$4(env, "T_AND");
    let match$1 = with_loc(binary, env);
    let loc = btwn(lloc, match$1[0]);
    _lloc = loc;
    _left = make_logical(left, match$1[1], "And", loc);
    continue ;
  };
}

function logical_or(env, _left, _lloc) {
  while(true) {
    let lloc = _lloc;
    let left = _left;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return [
              lloc,
              left
            ];
    }
    if (match !== "T_OR") {
      return [
              lloc,
              left
            ];
    }
    token$4(env, "T_OR");
    let match$1 = with_loc(binary, env);
    let match$2 = logical_and(env, match$1[1], match$1[0]);
    let loc = btwn(lloc, match$2[0]);
    _lloc = loc;
    _left = make_logical(left, match$2[1], "Or", loc);
    continue ;
  };
}

function logical(env) {
  let match = with_loc(binary, env);
  let match$1 = logical_and(env, match[1], match[0]);
  return logical_or(env, match$1[1], match$1[0])[1];
}

function binary_op(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let ret;
  if (typeof match !== "object") {
    switch (match) {
      case "T_IN" :
          ret = env.no_in ? undefined : [
              "In",
              {
                TAG: "Left_assoc",
                _0: 6
              }
            ];
          break;
      case "T_INSTANCEOF" :
          ret = [
            "Instanceof",
            {
              TAG: "Left_assoc",
              _0: 6
            }
          ];
          break;
      case "T_BIT_OR" :
          ret = [
            "BitOr",
            {
              TAG: "Left_assoc",
              _0: 2
            }
          ];
          break;
      case "T_BIT_XOR" :
          ret = [
            "Xor",
            {
              TAG: "Left_assoc",
              _0: 3
            }
          ];
          break;
      case "T_BIT_AND" :
          ret = [
            "BitAnd",
            {
              TAG: "Left_assoc",
              _0: 4
            }
          ];
          break;
      case "T_EQUAL" :
          ret = [
            "Equal",
            {
              TAG: "Left_assoc",
              _0: 5
            }
          ];
          break;
      case "T_NOT_EQUAL" :
          ret = [
            "NotEqual",
            {
              TAG: "Left_assoc",
              _0: 5
            }
          ];
          break;
      case "T_STRICT_EQUAL" :
          ret = [
            "StrictEqual",
            {
              TAG: "Left_assoc",
              _0: 5
            }
          ];
          break;
      case "T_STRICT_NOT_EQUAL" :
          ret = [
            "StrictNotEqual",
            {
              TAG: "Left_assoc",
              _0: 5
            }
          ];
          break;
      case "T_LESS_THAN_EQUAL" :
          ret = [
            "LessThanEqual",
            {
              TAG: "Left_assoc",
              _0: 6
            }
          ];
          break;
      case "T_GREATER_THAN_EQUAL" :
          ret = [
            "GreaterThanEqual",
            {
              TAG: "Left_assoc",
              _0: 6
            }
          ];
          break;
      case "T_LESS_THAN" :
          ret = [
            "LessThan",
            {
              TAG: "Left_assoc",
              _0: 6
            }
          ];
          break;
      case "T_GREATER_THAN" :
          ret = [
            "GreaterThan",
            {
              TAG: "Left_assoc",
              _0: 6
            }
          ];
          break;
      case "T_LSHIFT" :
          ret = [
            "LShift",
            {
              TAG: "Left_assoc",
              _0: 7
            }
          ];
          break;
      case "T_RSHIFT" :
          ret = [
            "RShift",
            {
              TAG: "Left_assoc",
              _0: 7
            }
          ];
          break;
      case "T_RSHIFT3" :
          ret = [
            "RShift3",
            {
              TAG: "Left_assoc",
              _0: 7
            }
          ];
          break;
      case "T_PLUS" :
          ret = [
            "Plus",
            {
              TAG: "Left_assoc",
              _0: 8
            }
          ];
          break;
      case "T_MINUS" :
          ret = [
            "Minus",
            {
              TAG: "Left_assoc",
              _0: 8
            }
          ];
          break;
      case "T_DIV" :
          ret = [
            "Div",
            {
              TAG: "Left_assoc",
              _0: 9
            }
          ];
          break;
      case "T_MULT" :
          ret = [
            "Mult",
            {
              TAG: "Left_assoc",
              _0: 9
            }
          ];
          break;
      case "T_EXP" :
          ret = [
            "Exp",
            {
              TAG: "Right_assoc",
              _0: 10
            }
          ];
          break;
      case "T_MOD" :
          ret = [
            "Mod",
            {
              TAG: "Left_assoc",
              _0: 9
            }
          ];
          break;
      default:
        ret = undefined;
    }
  } else {
    ret = undefined;
  }
  if (ret !== undefined) {
    token$3(env);
  }
  return ret;
}

function make_binary(left, right, operator, loc) {
  return [
          loc,
          {
            TAG: "Binary",
            _0: {
              operator: operator,
              left: left,
              right: right
            }
          }
        ];
}

function add_to_stack(_right, _param, _rloc, _stack) {
  while(true) {
    let param = _param;
    let stack = _stack;
    let rloc = _rloc;
    let right = _right;
    let rpri = param[1];
    let rop = param[0];
    if (stack) {
      let match = stack.hd;
      let match$1 = match[1];
      if (is_tighter(match$1[1], rpri)) {
        let loc = btwn(match[2], rloc);
        let right$1 = make_binary(match[0], right, match$1[0], loc);
        _stack = stack.tl;
        _rloc = loc;
        _param = [
          rop,
          rpri
        ];
        _right = right$1;
        continue ;
      }
      
    }
    return {
            hd: [
              right,
              [
                rop,
                rpri
              ],
              rloc
            ],
            tl: stack
          };
  };
}

function binary(env) {
  let _stack = /* [] */0;
  while(true) {
    let stack = _stack;
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    let is_unary = peek_unary_op(env) !== undefined;
    let right = unary(with_no_in(false, env));
    let loc = env.last_loc.contents;
    let end_loc = loc !== undefined ? loc : right[0];
    let right_loc = btwn(start_loc, end_loc);
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_LESS_THAN") {
      let tmp = right[1];
      if (typeof tmp === "object" && tmp.TAG === "JSXElement") {
        error(env, "AdjacentJSXElements");
      }
      
    }
    let match = binary_op(env);
    if (match === undefined) {
      let _right = right;
      let _rloc = right_loc;
      let _param = stack;
      while(true) {
        let param = _param;
        let rloc = _rloc;
        let right$1 = _right;
        if (!param) {
          return right$1;
        }
        let match$1 = param.hd;
        let loc$1 = btwn(match$1[2], rloc);
        _param = param.tl;
        _rloc = loc$1;
        _right = make_binary(match$1[0], right$1, match$1[1][0], loc$1);
        continue ;
      };
    }
    let rop = match[0];
    if (is_unary && rop === "Exp") {
      error_at(env, [
            right_loc,
            "InvalidLHSInExponentiation"
          ]);
    }
    _stack = add_to_stack(right, [
          rop,
          match[1]
        ], right_loc, stack);
    continue ;
  };
}

function argument(env) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return {
            TAG: "Expression",
            _0: Curry._1(assignment, env)
          };
  }
  if (match !== "T_ELLIPSIS") {
    return {
            TAG: "Expression",
            _0: Curry._1(assignment, env)
          };
  }
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_ELLIPSIS");
  let argument$1 = Curry._1(assignment, env);
  let loc = btwn(start_loc, argument$1[0]);
  return {
          TAG: "Spread",
          _0: [
            loc,
            {
              argument: argument$1
            }
          ]
        };
}

function arguments$p(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RPAREN" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let acc_0 = argument(env);
    let acc$1 = {
      hd: acc_0,
      tl: acc
    };
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RPAREN") {
      token$4(env, "T_COMMA");
    }
    _acc = acc$1;
    continue ;
  };
}

function $$arguments(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LPAREN");
  let args = arguments$p(env, /* [] */0);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RPAREN");
  return [
          btwn(start_loc, end_loc),
          args
        ];
}

function template_parts(env, _quasis, _expressions) {
  while(true) {
    let expressions = _expressions;
    let quasis = _quasis;
    let expr = Curry._1(Parse.expression, env);
    let expressions$1 = {
      hd: expr,
      tl: expressions
    };
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object" && match === "T_RCURLY") {
      push_lex_mode(env, "TEMPLATE");
      let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
      let match$2;
      if (typeof match$1 !== "object") {
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "parser_flow.ml",
                1602,
                19
              ],
              Error: new Error()
            };
      }
      if (match$1.TAG === "T_TEMPLATE_PART") {
        let match$3 = match$1._0;
        let tail = match$3[2];
        let match$4 = match$3[1];
        token$3(env);
        match$2 = [
          match$3[0],
          {
            value: {
              raw: match$4.raw,
              cooked: match$4.cooked
            },
            tail: tail
          },
          tail
        ];
      } else {
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "parser_flow.ml",
                1602,
                19
              ],
              Error: new Error()
            };
      }
      let loc = match$2[0];
      pop_lex_mode(env);
      let quasis_0 = [
        loc,
        match$2[1]
      ];
      let quasis$1 = {
        hd: quasis_0,
        tl: quasis
      };
      if (match$2[2]) {
        return [
                loc,
                List.rev(quasis$1),
                List.rev(expressions$1)
              ];
      }
      _expressions = expressions$1;
      _quasis = quasis$1;
      continue ;
    }
    error_unexpected(env);
    let imaginary_quasi_0 = expr[0];
    let imaginary_quasi_1 = {
      value: {
        raw: "",
        cooked: ""
      },
      tail: true
    };
    let imaginary_quasi = [
      imaginary_quasi_0,
      imaginary_quasi_1
    ];
    return [
            expr[0],
            List.rev({
                  hd: imaginary_quasi,
                  tl: quasis
                }),
            List.rev(expressions$1)
          ];
  };
}

function template_literal(env, part) {
  let is_tail = part[2];
  let match = part[1];
  let start_loc = part[0];
  token$4(env, {
        TAG: "T_TEMPLATE_PART",
        _0: part
      });
  let head_1 = {
    value: {
      raw: match.raw,
      cooked: match.cooked
    },
    tail: is_tail
  };
  let head = [
    start_loc,
    head_1
  ];
  let match$1 = is_tail ? [
      start_loc,
      {
        hd: head,
        tl: /* [] */0
      },
      /* [] */0
    ] : template_parts(env, {
          hd: head,
          tl: /* [] */0
        }, /* [] */0);
  let loc = btwn(start_loc, match$1[0]);
  return [
          loc,
          {
            quasis: match$1[1],
            expressions: match$1[2]
          }
        ];
}

function elements(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_COMMA" :
            token$4(env, "T_COMMA");
            _acc = {
              hd: undefined,
              tl: acc
            };
            continue ;
        case "T_ELLIPSIS" :
            let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_ELLIPSIS");
            let argument = Curry._1(assignment, env);
            let loc = btwn(start_loc, argument[0]);
            let elem = {
              TAG: "Spread",
              _0: [
                loc,
                {
                  argument: argument
                }
              ]
            };
            _acc = {
              hd: elem,
              tl: acc
            };
            continue ;
        case "T_RBRACKET" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let elem$1 = {
      TAG: "Expression",
      _0: Curry._1(assignment, env)
    };
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RBRACKET") {
      token$4(env, "T_COMMA");
    }
    _acc = {
      hd: elem$1,
      tl: acc
    };
    continue ;
  };
}

function array_initializer(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LBRACKET");
  let elements$1 = elements(env, /* [] */0);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RBRACKET");
  return [
          btwn(start_loc, end_loc),
          {
            elements: elements$1
          }
        ];
}

function error_callback$1(param, param$1) {
  if (typeof param$1 !== "object") {
    switch (param$1) {
      case "StrictParamName" :
      case "NewlineBeforeArrow" :
      case "ParameterAfterRestParameter" :
          return ;
      default:
        throw {
              RE_EXN_ID: Parser_env_Try.Rollback,
              Error: new Error()
            };
    }
  } else {
    throw {
          RE_EXN_ID: Parser_env_Try.Rollback,
          Error: new Error()
        };
  }
}

function try_arrow_function(env) {
  let env$1 = with_error_callback(error_callback$1, env);
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env$1);
  let async = Curry._2(Parser_env_Peek.token, 1, env$1) !== "T_ARROW" && maybe(env$1, "T_ASYNC");
  let typeParameters = Curry._1(type_parameter_declaration$1, env$1);
  let match;
  if (Curry._2(Parser_env_Peek.is_identifier, undefined, env$1) && typeParameters === undefined) {
    let id = Curry._2(Parse.identifier, "StrictParamName", env$1);
    let param_0 = id[0];
    let param_1 = {
      TAG: "Identifier",
      _0: id
    };
    let param = [
      param_0,
      param_1
    ];
    match = [
      {
        hd: param,
        tl: /* [] */0
      },
      /* [] */0,
      undefined,
      undefined
    ];
  } else {
    let match$1 = function_params(env$1);
    match = [
      match$1[0],
      match$1[1],
      match$1[2],
      wrap(annotation_opt, env$1)
    ];
  }
  let rest = match[2];
  let defaults = match[1];
  let params = match[0];
  let predicate = Curry._1(Parse.predicate, env$1);
  let env$2 = params === /* [] */0 || rest !== undefined ? without_error_callback(env$1) : env$1;
  if (Curry._1(Parser_env_Peek.is_line_terminator, env$2) && Curry._2(Parser_env_Peek.token, undefined, env$2) === "T_ARROW") {
    error(env$2, "NewlineBeforeArrow");
  }
  token$4(env$2, "T_ARROW");
  let env$3 = without_error_callback(env$2);
  let match$2 = with_loc((function (param) {
          let generator = false;
          let env = with_in_function(true, param);
          let match = Curry._2(Parser_env_Peek.token, undefined, env);
          if (typeof match !== "object" && match === "T_LCURLY") {
            let match$1 = function_body(env, async, generator);
            return [
                    match$1[1],
                    match$1[2]
                  ];
          }
          let env$1 = enter_function(env, async, generator);
          let expr = Curry._1(Parse.assignment, env$1);
          return [
                  {
                    TAG: "BodyExpression",
                    _0: expr
                  },
                  env$1.in_strict_mode
                ];
        }), env$3);
  let match$3 = match$2[1];
  let body = match$3[0];
  let simple = is_simple_function_params(params, defaults, rest);
  strict_post_check(env$3, match$3[1], simple, undefined, params);
  let expression;
  expression = body.TAG === "BodyBlock" ? false : true;
  let loc = btwn(start_loc, match$2[0]);
  return [
          loc,
          {
            TAG: "ArrowFunction",
            _0: {
              id: undefined,
              params: params,
              defaults: defaults,
              rest: rest,
              body: body,
              async: async,
              generator: false,
              predicate: predicate,
              expression: expression,
              returnType: match[3],
              typeParameters: typeParameters
            }
          }
        ];
}

function decorator_list_helper(env, _decorators) {
  while(true) {
    let decorators = _decorators;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return decorators;
    }
    if (match !== "T_AT") {
      return decorators;
    }
    token$3(env);
    _decorators = {
      hd: left_hand_side(env),
      tl: decorators
    };
    continue ;
  };
}

function decorator_list(env) {
  if (env.parse_options.esproposal_decorators) {
    return List.rev(decorator_list_helper(env, /* [] */0));
  } else {
    return /* [] */0;
  }
}

function key(env) {
  let number_type = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof number_type !== "object") {
    if (number_type === "T_LBRACKET") {
      let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
      token$4(env, "T_LBRACKET");
      let expr = Curry._1(Parse.assignment, with_no_in(false, env));
      let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
      token$4(env, "T_RBRACKET");
      return [
              btwn(start_loc, end_loc),
              {
                TAG: "Computed",
                _0: expr
              }
            ];
    }
    
  } else {
    switch (number_type.TAG) {
      case "T_NUMBER" :
          let raw = Curry._2(Parser_env_Peek.value, undefined, env);
          let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
          let value = number(env, number_type._0);
          let value$1 = {
            TAG: "Number",
            _0: value
          };
          return [
                  loc,
                  {
                    TAG: "Literal",
                    _0: [
                      loc,
                      {
                        value: value$1,
                        raw: raw
                      }
                    ]
                  }
                ];
      case "T_STRING" :
          let match = number_type._0;
          let octal = match[3];
          let raw$1 = match[2];
          let value$2 = match[1];
          let loc$1 = match[0];
          if (octal) {
            strict_error(env, "StrictOctalLiteral");
          }
          token$4(env, {
                TAG: "T_STRING",
                _0: [
                  loc$1,
                  value$2,
                  raw$1,
                  octal
                ]
              });
          let value$3 = {
            TAG: "String",
            _0: value$2
          };
          return [
                  loc$1,
                  {
                    TAG: "Literal",
                    _0: [
                      loc$1,
                      {
                        value: value$3,
                        raw: raw$1
                      }
                    ]
                  }
                ];
      default:
        
    }
  }
  let match$1 = identifier_or_reserved_keyword(env);
  let id = match$1[0];
  return [
          id[0],
          {
            TAG: "Identifier",
            _0: id
          }
        ];
}

function _method(env, kind) {
  let generator$1 = generator(env, false);
  let match = key(env);
  let typeParameters;
  switch (kind) {
    case "Init" :
        typeParameters = Curry._1(type_parameter_declaration$1, env);
        break;
    case "Get" :
    case "Set" :
        typeParameters = undefined;
        break;
    
  }
  token$4(env, "T_LPAREN");
  let params;
  switch (kind) {
    case "Init" :
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "parser_flow.ml",
                1954,
                16
              ],
              Error: new Error()
            };
    case "Get" :
        params = /* [] */0;
        break;
    case "Set" :
        let param = Curry._2(Parse.identifier_with_type, env, "StrictParamName");
        params = {
          hd: [
            param[0],
            {
              TAG: "Identifier",
              _0: param
            }
          ],
          tl: /* [] */0
        };
        break;
    
  }
  token$4(env, "T_RPAREN");
  let returnType = wrap(annotation_opt, env);
  let match$1 = function_body(env, false, generator$1);
  let body = match$1[1];
  let simple = is_simple_function_params(params, /* [] */0, undefined);
  strict_post_check(env, match$1[2], simple, undefined, params);
  let match$2;
  match$2 = body.TAG === "BodyBlock" ? [
      body._0[0],
      false
    ] : [
      body._0[0],
      true
    ];
  let value_0 = match$2[0];
  let value_1 = {
    id: undefined,
    params: params,
    defaults: /* [] */0,
    rest: undefined,
    body: body,
    async: false,
    generator: generator$1,
    predicate: undefined,
    expression: match$2[1],
    returnType: returnType,
    typeParameters: typeParameters
  };
  let value = [
    value_0,
    value_1
  ];
  return [
          match[1],
          value
        ];
}

function property$1(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_ELLIPSIS") {
    token$4(env, "T_ELLIPSIS");
    let argument = Curry._1(Parse.assignment, env);
    return {
            TAG: "SpreadProperty",
            _0: [
              btwn(start_loc, argument[0]),
              {
                argument: argument
              }
            ]
          };
  }
  let async = Curry._2(Parser_env_Peek.is_identifier, 1, env) && maybe(env, "T_ASYNC");
  let match = generator(env, async);
  let match$1 = key(env);
  let tmp;
  let exit = 0;
  if (async || match) {
    exit = 1;
  } else {
    let key$1 = match$1[1];
    switch (key$1.TAG) {
      case "Identifier" :
          switch (key$1._0[1].name) {
            case "get" :
                let match$2 = Curry._2(Parser_env_Peek.token, undefined, env);
                let exit$1 = 0;
                if (typeof match$2 !== "object") {
                  switch (match$2) {
                    case "T_LPAREN" :
                    case "T_COLON" :
                    case "T_LESS_THAN" :
                        exit$1 = 2;
                        break;
                    default:
                      tmp = get(env, start_loc);
                  }
                } else {
                  tmp = get(env, start_loc);
                }
                if (exit$1 === 2) {
                  tmp = init(env, start_loc, key$1, false, false);
                }
                break;
            case "set" :
                let match$3 = Curry._2(Parser_env_Peek.token, undefined, env);
                let exit$2 = 0;
                if (typeof match$3 !== "object") {
                  switch (match$3) {
                    case "T_LPAREN" :
                    case "T_COLON" :
                    case "T_LESS_THAN" :
                        exit$2 = 2;
                        break;
                    default:
                      tmp = set(env, start_loc);
                  }
                } else {
                  tmp = set(env, start_loc);
                }
                if (exit$2 === 2) {
                  tmp = init(env, start_loc, key$1, false, false);
                }
                break;
            default:
              exit = 1;
          }
          break;
      case "Literal" :
      case "Computed" :
          exit = 1;
          break;
      
    }
  }
  if (exit === 1) {
    tmp = init(env, start_loc, match$1[1], async, match);
  }
  return {
          TAG: "Property",
          _0: tmp
        };
}

function get(env, start_loc) {
  let match = _method(env, "Get");
  let match$1 = match[1];
  let end_loc = match$1[0];
  let value_1 = {
    TAG: "Function",
    _0: match$1[1]
  };
  let value = [
    end_loc,
    value_1
  ];
  return [
          btwn(start_loc, end_loc),
          {
            key: match[0],
            value: value,
            kind: "Get",
            _method: false,
            shorthand: false
          }
        ];
}

function set(env, start_loc) {
  let match = _method(env, "Set");
  let match$1 = match[1];
  let end_loc = match$1[0];
  let value_1 = {
    TAG: "Function",
    _0: match$1[1]
  };
  let value = [
    end_loc,
    value_1
  ];
  return [
          btwn(start_loc, end_loc),
          {
            key: match[0],
            value: value,
            kind: "Set",
            _method: false,
            shorthand: false
          }
        ];
}

function init(env, start_loc, key, async, generator) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let match$1;
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_RCURLY" :
      case "T_COMMA" :
          exit = 2;
          break;
      case "T_LPAREN" :
      case "T_LESS_THAN" :
          exit = 3;
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 :
        token$4(env, "T_COLON");
        match$1 = [
          Curry._1(Parse.assignment, env),
          false,
          false
        ];
        break;
    case 2 :
        let tmp;
        switch (key.TAG) {
          case "Literal" :
              let lit = key._0;
              tmp = [
                lit[0],
                {
                  TAG: "Literal",
                  _0: lit[1]
                }
              ];
              break;
          case "Identifier" :
              let id = key._0;
              tmp = [
                id[0],
                {
                  TAG: "Identifier",
                  _0: id
                }
              ];
              break;
          case "Computed" :
              tmp = key._0;
              break;
          
        }
        match$1 = [
          tmp,
          true,
          false
        ];
        break;
    case 3 :
        let typeParameters = Curry._1(type_parameter_declaration$1, env);
        let match$2 = function_params(env);
        let rest = match$2[2];
        let defaults = match$2[1];
        let params = match$2[0];
        let returnType = wrap(annotation_opt, env);
        let match$3 = function_body(env, async, generator);
        let body = match$3[1];
        let simple = is_simple_function_params(params, defaults, rest);
        strict_post_check(env, match$3[2], simple, undefined, params);
        let match$4;
        match$4 = body.TAG === "BodyBlock" ? [
            body._0[0],
            false
          ] : [
            body._0[0],
            true
          ];
        let value_0 = match$4[0];
        let value_1 = {
          TAG: "Function",
          _0: {
            id: undefined,
            params: params,
            defaults: defaults,
            rest: rest,
            body: body,
            async: async,
            generator: generator,
            predicate: undefined,
            expression: match$4[1],
            returnType: returnType,
            typeParameters: typeParameters
          }
        };
        let value = [
          value_0,
          value_1
        ];
        match$1 = [
          value,
          false,
          true
        ];
        break;
    
  }
  let value$1 = match$1[0];
  return [
          btwn(start_loc, value$1[0]),
          {
            key: key,
            value: value$1,
            kind: "Init",
            _method: match$1[2],
            shorthand: match$1[1]
          }
        ];
}

function check_property(env, prop_map, prop) {
  if (prop.TAG !== "Property") {
    return prop_map;
  }
  let match = prop._0;
  let prop$1 = match[1];
  let prop_loc = match[0];
  let exit = 0;
  switch (prop$1.key.TAG) {
    case "Literal" :
    case "Identifier" :
        exit = 1;
        break;
    case "Computed" :
        return prop_map;
    
  }
  if (exit === 1) {
    let match$1 = prop$1.key;
    let key;
    switch (match$1.TAG) {
      case "Literal" :
          let s = match$1._0[1].value;
          if (typeof s !== "object") {
            key = "null";
          } else {
            switch (s.TAG) {
              case "String" :
                  key = s._0;
                  break;
              case "Boolean" :
                  let b = s._0;
                  key = b ? "true" : "false";
                  break;
              case "Number" :
                  key = Pervasives.string_of_float(s._0);
                  break;
              case "RegExp" :
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "RegExp cannot be property key",
                        Error: new Error()
                      };
              
            }
          }
          break;
      case "Identifier" :
          key = match$1._0[1].name;
          break;
      case "Computed" :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "parser_flow.ml",
                  2103,
                  30
                ],
                Error: new Error()
              };
      
    }
    let prev_kinds;
    try {
      prev_kinds = find(key, prop_map);
    }
    catch (raw_exn){
      let exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        prev_kinds = "Empty";
      } else {
        throw exn;
      }
    }
    let match$2 = prop$1.kind;
    let kind_string;
    switch (match$2) {
      case "Init" :
          kind_string = "Init";
          break;
      case "Get" :
          kind_string = "Get";
          break;
      case "Set" :
          kind_string = "Set";
          break;
      
    }
    let exit$1 = 0;
    switch (kind_string) {
      case "Init" :
          if (mem$1("Init", prev_kinds)) {
            strict_error_at(env, [
                  prop_loc,
                  "StrictDuplicateProperty"
                ]);
          } else if (mem$1("Set", prev_kinds) || mem$1("Get", prev_kinds)) {
            error_at(env, [
                  prop_loc,
                  "AccessorDataProperty"
                ]);
          }
          break;
      case "Get" :
      case "Set" :
          exit$1 = 2;
          break;
      default:
        
    }
    if (exit$1 === 2) {
      if (mem$1("Init", prev_kinds)) {
        error_at(env, [
              prop_loc,
              "AccessorDataProperty"
            ]);
      } else if (mem$1(kind_string, prev_kinds)) {
        error_at(env, [
              prop_loc,
              "AccessorGetSet"
            ]);
      }
      
    }
    let kinds = add$1(kind_string, prev_kinds);
    return add$2(key, kinds, prop_map);
  }
  
}

function properties$1(env, _param) {
  while(true) {
    let param = _param;
    let acc = param[1];
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RCURLY" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let prop = property$1(env);
    let prop_map = check_property(env, param[0], prop);
    if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RCURLY") {
      token$4(env, "T_COMMA");
    }
    _param = [
      prop_map,
      {
        hd: prop,
        tl: acc
      }
    ];
    continue ;
  };
}

function _initializer(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let props = properties$1(env, [
        "Empty",
        /* [] */0
      ]);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  return [
          btwn(start_loc, end_loc),
          {
            properties: props
          }
        ];
}

function class_implements(env, _acc) {
  while(true) {
    let acc = _acc;
    let id = Curry._2(Parse.identifier, undefined, env);
    let typeParameters = wrap(type_parameter_instantiation, env);
    let loc = typeParameters !== undefined ? btwn(id[0], typeParameters[0]) : id[0];
    let implement_1 = {
      id: id,
      typeParameters: typeParameters
    };
    let implement = [
      loc,
      implement_1
    ];
    let acc$1 = {
      hd: implement,
      tl: acc
    };
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return List.rev(acc$1);
    }
    if (match !== "T_COMMA") {
      return List.rev(acc$1);
    }
    token$4(env, "T_COMMA");
    _acc = acc$1;
    continue ;
  };
}

function get$1(env, start_loc, decorators, $$static) {
  let match = _method(env, "Get");
  let value = match[1];
  return {
          TAG: "Method",
          _0: [
            btwn(start_loc, value[0]),
            {
              kind: "Get",
              key: match[0],
              value: value,
              static: $$static,
              decorators: decorators
            }
          ]
        };
}

function set$1(env, start_loc, decorators, $$static) {
  let match = _method(env, "Set");
  let value = match[1];
  return {
          TAG: "Method",
          _0: [
            btwn(start_loc, value[0]),
            {
              kind: "Set",
              key: match[0],
              value: value,
              static: $$static,
              decorators: decorators
            }
          ]
        };
}

function init$1(env, start_loc, decorators, key, async, generator, $$static) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_SEMICOLON" :
      case "T_ASSIGN" :
      case "T_COLON" :
          exit = 2;
          break;
      default:
        
    }
  }
  if (exit === 2 && !async && !generator) {
    let typeAnnotation = wrap(annotation_opt, env);
    let options = env.parse_options;
    let value = Curry._2(Parser_env_Peek.token, undefined, env) === "T_ASSIGN" && ($$static && options.esproposal_class_static_fields || !$$static && options.esproposal_class_instance_fields) ? (token$4(env, "T_ASSIGN"), Curry._1(Parse.expression, env)) : undefined;
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    if (maybe(env, "T_SEMICOLON") || !(Curry._2(Parser_env_Peek.token, undefined, env) === "T_LBRACKET" || Curry._2(Parser_env_Peek.token, undefined, env) === "T_LPAREN")) {
      
    } else {
      error_unexpected(env);
    }
    let loc = btwn(start_loc, end_loc);
    return {
            TAG: "Property",
            _0: [
              loc,
              {
                key: key,
                value: value,
                typeAnnotation: typeAnnotation,
                static: $$static
              }
            ]
          };
  }
  let typeParameters = Curry._1(type_parameter_declaration$1, env);
  let match$1 = function_params(env);
  let rest = match$1[2];
  let defaults = match$1[1];
  let params = match$1[0];
  let returnType = wrap(annotation_opt, env);
  let match$2 = function_body(env, async, generator);
  let body = match$2[1];
  let simple = is_simple_function_params(params, defaults, rest);
  strict_post_check(env, match$2[2], simple, undefined, params);
  let match$3;
  match$3 = body.TAG === "BodyBlock" ? [
      body._0[0],
      false
    ] : [
      body._0[0],
      true
    ];
  let end_loc$1 = match$3[0];
  let value_1 = {
    id: undefined,
    params: params,
    defaults: defaults,
    rest: rest,
    body: body,
    async: async,
    generator: generator,
    predicate: undefined,
    expression: match$3[1],
    returnType: returnType,
    typeParameters: typeParameters
  };
  let value$1 = [
    end_loc$1,
    value_1
  ];
  let kind;
  switch (key.TAG) {
    case "Literal" :
        let match$4 = key._0[1].value;
        kind = typeof match$4 !== "object" || !(match$4.TAG === "String" && match$4._0 === "constructor") ? "Method" : "Constructor";
        break;
    case "Identifier" :
        kind = key._0[1].name === "constructor" ? "Constructor" : "Method";
        break;
    case "Computed" :
        kind = "Method";
        break;
    
  }
  return {
          TAG: "Method",
          _0: [
            btwn(start_loc, end_loc$1),
            {
              kind: kind,
              key: key,
              value: value$1,
              static: $$static,
              decorators: decorators
            }
          ]
        };
}

function class_element(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let decorators = decorator_list(env);
  let $$static = maybe(env, "T_STATIC");
  let async = Curry._2(Parser_env_Peek.token, 1, env) !== "T_LPAREN" && Curry._2(Parser_env_Peek.token, 1, env) !== "T_COLON" && maybe(env, "T_ASYNC");
  let generator$1 = generator(env, async);
  let match = key(env);
  if (!async && !generator$1) {
    let key$1 = match[1];
    switch (key$1.TAG) {
      case "Identifier" :
          switch (key$1._0[1].name) {
            case "get" :
                let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
                let exit = 0;
                if (typeof match$1 === "object") {
                  return get$1(env, start_loc, decorators, $$static);
                }
                switch (match$1) {
                  case "T_LPAREN" :
                  case "T_SEMICOLON" :
                  case "T_ASSIGN" :
                  case "T_COLON" :
                  case "T_LESS_THAN" :
                      exit = 2;
                      break;
                  default:
                    return get$1(env, start_loc, decorators, $$static);
                }
                if (exit === 2) {
                  return init$1(env, start_loc, decorators, key$1, async, generator$1, $$static);
                }
                break;
            case "set" :
                let match$2 = Curry._2(Parser_env_Peek.token, undefined, env);
                let exit$1 = 0;
                if (typeof match$2 === "object") {
                  return set$1(env, start_loc, decorators, $$static);
                }
                switch (match$2) {
                  case "T_LPAREN" :
                  case "T_SEMICOLON" :
                  case "T_ASSIGN" :
                  case "T_COLON" :
                  case "T_LESS_THAN" :
                      exit$1 = 2;
                      break;
                  default:
                    return set$1(env, start_loc, decorators, $$static);
                }
                if (exit$1 === 2) {
                  return init$1(env, start_loc, decorators, key$1, async, generator$1, $$static);
                }
                break;
            default:
              
          }
          break;
      case "Literal" :
      case "Computed" :
          break;
      
    }
  }
  return init$1(env, start_loc, decorators, match[1], async, generator$1, $$static);
}

function elements$1(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_SEMICOLON" :
            token$4(env, "T_SEMICOLON");
            continue ;
        case "T_RCURLY" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          _acc = {
            hd: Curry._1(class_element, env),
            tl: acc
          };
          continue ;
      }
    } else {
      _acc = {
        hd: Curry._1(class_element, env),
        tl: acc
      };
      continue ;
    }
  };
}

function class_body(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let body = elements$1(env, /* [] */0);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  return [
          btwn(start_loc, end_loc),
          {
            body: body
          }
        ];
}

function _class(env) {
  let match;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_EXTENDS") {
    token$4(env, "T_EXTENDS");
    let superClass = left_hand_side(with_allow_yield(false, env));
    let superTypeParameters = wrap(type_parameter_instantiation, env);
    match = [
      superClass,
      superTypeParameters
    ];
  } else {
    match = [
      undefined,
      undefined
    ];
  }
  let $$implements = Curry._2(Parser_env_Peek.token, undefined, env) === "T_IMPLEMENTS" ? (!env.parse_options.types ? error(env, "UnexpectedTypeInterface") : undefined, token$4(env, "T_IMPLEMENTS"), class_implements(env, /* [] */0)) : /* [] */0;
  let body = Curry._1(class_body, env);
  return [
          body,
          match[0],
          match[1],
          $$implements
        ];
}

function class_declaration(env, decorators) {
  let env$1 = with_strict(true, env);
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env$1);
  let decorators$1 = Pervasives.$at(decorators, decorator_list(env$1));
  token$4(env$1, "T_CLASS");
  let tmp_env = with_no_let(true, env$1);
  let match = env$1.in_export;
  let match$1 = Curry._2(Parser_env_Peek.is_identifier, undefined, tmp_env);
  let id = match && !match$1 ? undefined : Curry._2(Parse.identifier, undefined, tmp_env);
  let typeParameters = Curry._1(type_parameter_declaration_with_defaults, env$1);
  let match$2 = _class(env$1);
  let body = match$2[0];
  let loc = btwn(start_loc, body[0]);
  return [
          loc,
          {
            TAG: "ClassDeclaration",
            _0: {
              id: id,
              body: body,
              superClass: match$2[1],
              typeParameters: typeParameters,
              superTypeParameters: match$2[2],
              implements: match$2[3],
              classDecorators: decorators$1
            }
          }
        ];
}

function class_expression(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let decorators = decorator_list(env);
  token$4(env, "T_CLASS");
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  let match$1;
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_LCURLY" :
      case "T_EXTENDS" :
      case "T_LESS_THAN" :
          match$1 = [
            undefined,
            undefined
          ];
          break;
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    let id = Curry._2(Parse.identifier, undefined, env);
    let typeParameters = Curry._1(type_parameter_declaration_with_defaults, env);
    match$1 = [
      id,
      typeParameters
    ];
  }
  let match$2 = _class(env);
  let body = match$2[0];
  let loc = btwn(start_loc, body[0]);
  return [
          loc,
          {
            TAG: "Class",
            _0: {
              id: match$1[0],
              body: body,
              superClass: match$2[1],
              typeParameters: match$1[1],
              superTypeParameters: match$2[2],
              implements: match$2[3],
              classDecorators: decorators
            }
          }
        ];
}

function declare(in_moduleOpt, env) {
  let in_module = in_moduleOpt !== undefined ? in_moduleOpt : false;
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeDeclaration");
  }
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let match = Curry._2(Parser_env_Peek.token, 1, env);
  if (typeof match !== "object") {
    switch (match) {
      case "T_IDENTIFIER" :
          if (Curry._2(Parser_env_Peek.value, 1, env) === "module") {
            token$4(env, "T_DECLARE");
            contextual(env, "module");
            if (in_module || Curry._2(Parser_env_Peek.token, undefined, env) === "T_PERIOD") {
              token$4(env, "T_PERIOD");
              contextual(env, "exports");
              let type_annot = wrap(annotation, env);
              let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
              let end_loc = loc !== undefined ? loc : type_annot[0];
              semicolon(env);
              let loc$1 = btwn(start_loc, end_loc);
              return [
                      loc$1,
                      {
                        TAG: "DeclareModuleExports",
                        _0: type_annot
                      }
                    ];
            } else {
              let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
              let id;
              if (typeof match$1 !== "object" || match$1.TAG !== "T_STRING") {
                id = {
                  TAG: "Identifier",
                  _0: Curry._2(Parse.identifier, undefined, env)
                };
              } else {
                let match$2 = match$1._0;
                let octal = match$2[3];
                let raw = match$2[2];
                let value = match$2[1];
                let loc$2 = match$2[0];
                if (octal) {
                  strict_error(env, "StrictOctalLiteral");
                }
                token$4(env, {
                      TAG: "T_STRING",
                      _0: [
                        loc$2,
                        value,
                        raw,
                        octal
                      ]
                    });
                let value$1 = {
                  TAG: "String",
                  _0: value
                };
                id = {
                  TAG: "Literal",
                  _0: [
                    loc$2,
                    {
                      value: value$1,
                      raw: raw
                    }
                  ]
                };
              }
              let body_start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
              token$4(env, "T_LCURLY");
              let match$3 = module_items(env, undefined, /* [] */0);
              let module_kind = match$3[0];
              token$4(env, "T_RCURLY");
              let body_end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
              let body_loc = btwn(body_start_loc, body_end_loc);
              let body_1 = {
                body: match$3[1]
              };
              let body = [
                body_loc,
                body_1
              ];
              let loc$3 = btwn(start_loc, body_loc);
              let kind = module_kind !== undefined ? module_kind : ({
                    TAG: "CommonJS",
                    _0: loc$3
                  });
              return [
                      loc$3,
                      {
                        TAG: "DeclareModule",
                        _0: {
                          id: id,
                          body: body,
                          kind: kind
                        }
                      }
                    ];
            }
          }
          break;
      case "T_FUNCTION" :
          token$4(env, "T_DECLARE");
          return declare_function_statement(env, start_loc);
      case "T_VAR" :
          token$4(env, "T_DECLARE");
          return declare_var_statement(env, start_loc);
      case "T_CLASS" :
          token$4(env, "T_DECLARE");
          let match$4 = Curry._2(declare_class, env, start_loc);
          return [
                  match$4[0],
                  {
                    TAG: "DeclareClass",
                    _0: match$4[1]
                  }
                ];
      case "T_EXPORT" :
          if (in_module) {
            return declare_export_declaration(in_module, env);
          }
          break;
      case "T_INTERFACE" :
          token$4(env, "T_DECLARE");
          return $$interface(env);
      case "T_TYPE" :
          token$4(env, "T_DECLARE");
          return type_alias(env);
      case "T_ASYNC" :
          token$4(env, "T_DECLARE");
          error(env, "DeclareAsync");
          token$4(env, "T_ASYNC");
          return declare_function_statement(env, start_loc);
      default:
        
    }
  }
  if (in_module) {
    token$4(env, "T_DECLARE");
    return declare_var_statement(env, start_loc);
  } else {
    return Curry._1(Parse.statement, env);
  }
}

function type_alias_helper(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeAlias");
  }
  token$4(env, "T_TYPE");
  push_lex_mode(env, "TYPE");
  let id = Curry._2(Parse.identifier, undefined, env);
  let typeParameters = Curry._1(type_parameter_declaration_with_defaults, env);
  token$4(env, "T_ASSIGN");
  let right = wrap(_type, env);
  let end_loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
  let end_loc$1 = end_loc !== undefined ? end_loc : right[0];
  semicolon(env);
  pop_lex_mode(env);
  return [
          btwn(start_loc, end_loc$1),
          {
            id: id,
            typeParameters: typeParameters,
            right: right
          }
        ];
}

function export_source(env) {
  contextual(env, "from");
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object" && match.TAG === "T_STRING") {
    let match$1 = match._0;
    let octal = match$1[3];
    let raw = match$1[2];
    let value = match$1[1];
    let loc = match$1[0];
    if (octal) {
      strict_error(env, "StrictOctalLiteral");
    }
    token$4(env, {
          TAG: "T_STRING",
          _0: [
            loc,
            value,
            raw,
            octal
          ]
        });
    let value$1 = {
      TAG: "String",
      _0: value
    };
    return [
            loc,
            {
              value: value$1,
              raw: raw
            }
          ];
  }
  let raw$1 = Curry._2(Parser_env_Peek.value, undefined, env);
  let value$2 = {
    TAG: "String",
    _0: raw$1
  };
  let ret_0 = Curry._2(Parser_env_Peek.loc, undefined, env);
  let ret_1 = {
    value: value$2,
    raw: raw$1
  };
  let ret = [
    ret_0,
    ret_1
  ];
  error_unexpected(env);
  return ret;
}

function declare_var(env, start_loc) {
  token$4(env, "T_VAR");
  let id = Curry._2(Parse.identifier_with_type, env, "StrictVarName");
  let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
  let end_loc = loc !== undefined ? loc : id[0];
  let loc$1 = btwn(start_loc, end_loc);
  semicolon(env);
  return [
          loc$1,
          {
            id: id
          }
        ];
}

function export_specifiers_and_errs(env, _specifiers, _errs) {
  while(true) {
    let errs = _errs;
    let specifiers = _specifiers;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RCURLY" :
        case "T_EOF" :
            return [
                    List.rev(specifiers),
                    List.rev(errs)
                  ];
        default:
          
      }
    }
    let match$1 = Curry._1(Parse.identifier_or_reserved_keyword, env);
    let id = match$1[0];
    let match$2;
    if (Curry._2(Parser_env_Peek.value, undefined, env) === "as") {
      contextual(env, "as");
      let match$3 = Curry._1(Parse.identifier_or_reserved_keyword, env);
      let name = match$3[0];
      record_export(env, [
            name[0],
            extract_ident_name(name)
          ]);
      match$2 = [
        name,
        undefined,
        name[0]
      ];
    } else {
      let loc = id[0];
      record_export(env, [
            loc,
            extract_ident_name(id)
          ]);
      match$2 = [
        undefined,
        match$1[1],
        loc
      ];
    }
    let err = match$2[1];
    let loc$1 = btwn(id[0], match$2[2]);
    let specifier_1 = {
      id: id,
      name: match$2[0]
    };
    let specifier = [
      loc$1,
      specifier_1
    ];
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COMMA") {
      token$4(env, "T_COMMA");
    }
    let errs$1 = err !== undefined ? ({
          hd: err,
          tl: errs
        }) : errs;
    _errs = errs$1;
    _specifiers = {
      hd: specifier,
      tl: specifiers
    };
    continue ;
  };
}

function declare_function(env, start_loc) {
  token$4(env, "T_FUNCTION");
  let id = Curry._2(Parse.identifier, undefined, env);
  let start_sig_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let typeParameters = Curry._1(type_parameter_declaration$1, env);
  let match = wrap(function_param_list, env);
  token$4(env, "T_COLON");
  let returnType = wrap(_type, env);
  let end_loc = returnType[0];
  let loc = btwn(start_sig_loc, end_loc);
  let value_1 = {
    TAG: "Function",
    _0: {
      params: match[1],
      returnType: returnType,
      rest: match[0],
      typeParameters: typeParameters
    }
  };
  let value = [
    loc,
    value_1
  ];
  let typeAnnotation = [
    loc,
    value
  ];
  let init = id[1];
  let id_0 = btwn(id[0], end_loc);
  let id_1 = {
    name: init.name,
    typeAnnotation: typeAnnotation,
    optional: init.optional
  };
  let id$1 = [
    id_0,
    id_1
  ];
  let end_loc$1 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
  let end_loc$2 = end_loc$1 !== undefined ? end_loc$1 : end_loc;
  let predicate = Curry._1(Parse.predicate, env);
  semicolon(env);
  let loc$1 = btwn(start_loc, end_loc$2);
  return [
          loc$1,
          {
            id: id$1,
            predicate: predicate
          }
        ];
}

function extract_ident_name(param) {
  return param[1].name;
}

function type_alias(env) {
  if (!Curry._2(Parser_env_Peek.is_identifier, 1, env)) {
    return Curry._1(Parse.statement, env);
  }
  let match = type_alias_helper(env);
  return [
          match[0],
          {
            TAG: "TypeAlias",
            _0: match[1]
          }
        ];
}

function $$interface(env) {
  if (!Curry._2(Parser_env_Peek.is_identifier, 1, env)) {
    return expression(env);
  }
  let match = Curry._1(interface_helper, env);
  return [
          match[0],
          {
            TAG: "InterfaceDeclaration",
            _0: match[1]
          }
        ];
}

function declare_var_statement(env, start_loc) {
  let match = declare_var(env, start_loc);
  return [
          match[0],
          {
            TAG: "DeclareVariable",
            _0: match[1]
          }
        ];
}

function declare_export_declaration(allow_export_typeOpt, env) {
  let allow_export_type = allow_export_typeOpt !== undefined ? allow_export_typeOpt : false;
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeDeclaration");
  }
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_DECLARE");
  let env$1 = with_in_export(true, with_strict(true, env));
  token$4(env$1, "T_EXPORT");
  let match = Curry._2(Parser_env_Peek.token, undefined, env$1);
  let exit = 0;
  if (typeof match !== "object") {
    switch (match) {
      case "T_DEFAULT" :
          token$4(env$1, "T_DEFAULT");
          let match$1 = Curry._2(Parser_env_Peek.token, undefined, env$1);
          let match$2;
          let exit$1 = 0;
          if (typeof match$1 !== "object") {
            switch (match$1) {
              case "T_FUNCTION" :
                  let fn = declare_function(env$1, start_loc);
                  match$2 = [
                    fn[0],
                    {
                      TAG: "Function",
                      _0: fn
                    }
                  ];
                  break;
              case "T_CLASS" :
                  let _class = Curry._2(declare_class, env$1, start_loc);
                  match$2 = [
                    _class[0],
                    {
                      TAG: "Class",
                      _0: _class
                    }
                  ];
                  break;
              default:
                exit$1 = 3;
            }
          } else {
            exit$1 = 3;
          }
          if (exit$1 === 3) {
            let _type$1 = wrap(_type, env$1);
            let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
            let end_loc = loc !== undefined ? loc : _type$1[0];
            semicolon(env$1);
            match$2 = [
              end_loc,
              {
                TAG: "DefaultType",
                _0: _type$1
              }
            ];
          }
          return [
                  btwn(start_loc, match$2[0]),
                  {
                    TAG: "DeclareExportDeclaration",
                    _0: {
                      default: true,
                      declaration: match$2[1],
                      specifiers: undefined,
                      source: undefined
                    }
                  }
                ];
      case "T_FUNCTION" :
      case "T_VAR" :
      case "T_CONST" :
      case "T_LET" :
      case "T_CLASS" :
          exit = 2;
          break;
      case "T_INTERFACE" :
          if (allow_export_type) {
            let match$3 = Curry._1(interface_helper, env$1);
            let iface_loc = match$3[0];
            let loc$1 = btwn(start_loc, iface_loc);
            return [
                    loc$1,
                    {
                      TAG: "DeclareExportDeclaration",
                      _0: {
                        default: false,
                        declaration: {
                          TAG: "Interface",
                          _0: [
                            iface_loc,
                            match$3[1]
                          ]
                        },
                        specifiers: undefined,
                        source: undefined
                      }
                    }
                  ];
          }
          exit = 1;
          break;
      case "T_TYPE" :
          if (allow_export_type) {
            let match$4 = type_alias_helper(env$1);
            let alias_loc = match$4[0];
            let loc$2 = btwn(start_loc, alias_loc);
            return [
                    loc$2,
                    {
                      TAG: "DeclareExportDeclaration",
                      _0: {
                        default: false,
                        declaration: {
                          TAG: "NamedType",
                          _0: [
                            alias_loc,
                            match$4[1]
                          ]
                        },
                        specifiers: undefined,
                        source: undefined
                      }
                    }
                  ];
          }
          exit = 1;
          break;
      case "T_MULT" :
          let loc$3 = Curry._2(Parser_env_Peek.loc, undefined, env$1);
          token$4(env$1, "T_MULT");
          let parse_export_star_as = env$1.parse_options.esproposal_export_star_as;
          let local_name = Curry._2(Parser_env_Peek.value, undefined, env$1) === "as" ? (contextual(env$1, "as"), parse_export_star_as ? Curry._2(Parse.identifier, undefined, env$1) : (error(env$1, "UnexpectedTypeDeclaration"), undefined)) : undefined;
          let specifiers = {
            TAG: "ExportBatchSpecifier",
            _0: loc$3,
            _1: local_name
          };
          let source = export_source(env$1);
          let loc$4 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
          let end_loc$1 = loc$4 !== undefined ? loc$4 : source[0];
          let source$1 = source;
          semicolon(env$1);
          return [
                  btwn(start_loc, end_loc$1),
                  {
                    TAG: "DeclareExportDeclaration",
                    _0: {
                      default: false,
                      declaration: undefined,
                      specifiers: specifiers,
                      source: source$1
                    }
                  }
                ];
      default:
        exit = 1;
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 :
        let match$5 = Curry._2(Parser_env_Peek.token, undefined, env$1);
        if (typeof match$5 !== "object") {
          switch (match$5) {
            case "T_INTERFACE" :
                error(env$1, "DeclareExportInterface");
                break;
            case "T_TYPE" :
                error(env$1, "DeclareExportType");
                break;
            default:
              
          }
        }
        token$4(env$1, "T_LCURLY");
        let match$6 = export_specifiers_and_errs(env$1, /* [] */0, /* [] */0);
        let specifiers$1 = {
          TAG: "ExportSpecifiers",
          _0: match$6[0]
        };
        let end_loc$2 = Curry._2(Parser_env_Peek.loc, undefined, env$1);
        token$4(env$1, "T_RCURLY");
        let source$2 = Curry._2(Parser_env_Peek.value, undefined, env$1) === "from" ? export_source(env$1) : (List.iter((function (param) {
                    return error_at(env$1, param);
                  }), match$6[1]), undefined);
        let loc$5 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
        let end_loc$3 = loc$5 !== undefined ? loc$5 : (
            source$2 !== undefined ? source$2[0] : end_loc$2
          );
        semicolon(env$1);
        return [
                btwn(start_loc, end_loc$3),
                {
                  TAG: "DeclareExportDeclaration",
                  _0: {
                    default: false,
                    declaration: undefined,
                    specifiers: specifiers$1,
                    source: source$2
                  }
                }
              ];
    case 2 :
        let token$5 = Curry._2(Parser_env_Peek.token, undefined, env$1);
        let match$7;
        let exit$2 = 0;
        if (typeof token$5 !== "object") {
          switch (token$5) {
            case "T_FUNCTION" :
                let fn$1 = declare_function(env$1, start_loc);
                match$7 = [
                  fn$1[0],
                  {
                    TAG: "Function",
                    _0: fn$1
                  }
                ];
                break;
            case "T_VAR" :
            case "T_CONST" :
            case "T_LET" :
                exit$2 = 3;
                break;
            case "T_CLASS" :
                let _class$1 = Curry._2(declare_class, env$1, start_loc);
                match$7 = [
                  _class$1[0],
                  {
                    TAG: "Class",
                    _0: _class$1
                  }
                ];
                break;
            default:
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "parser_flow.ml",
                      3480,
                      17
                    ],
                    Error: new Error()
                  };
          }
        } else {
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "parser_flow.ml",
                  3480,
                  17
                ],
                Error: new Error()
              };
        }
        if (exit$2 === 3) {
          if (typeof token$5 !== "object") {
            switch (token$5) {
              case "T_CONST" :
                  error(env$1, "DeclareExportConst");
                  break;
              case "T_LET" :
                  error(env$1, "DeclareExportLet");
                  break;
              default:
                
            }
          }
          let $$var = declare_var(env$1, start_loc);
          match$7 = [
            $$var[0],
            {
              TAG: "Variable",
              _0: $$var
            }
          ];
        }
        return [
                btwn(start_loc, match$7[0]),
                {
                  TAG: "DeclareExportDeclaration",
                  _0: {
                    default: false,
                    declaration: match$7[1],
                    specifiers: undefined,
                    source: undefined
                  }
                }
              ];
    
  }
}

function declare_function_statement(env, start_loc) {
  let match = declare_function(env, start_loc);
  return [
          match[0],
          {
            TAG: "DeclareFunction",
            _0: match[1]
          }
        ];
}

function expression(env) {
  let expression$1 = Curry._1(Parse.expression, env);
  let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
  let end_loc = loc !== undefined ? loc : expression$1[0];
  semicolon(env);
  return [
          btwn(expression$1[0], end_loc),
          {
            TAG: "Expression",
            _0: {
              expression: expression$1
            }
          }
        ];
}

function supers(env, _acc) {
  while(true) {
    let acc = _acc;
    let $$super = wrap(generic, env);
    let acc$1 = {
      hd: $$super,
      tl: acc
    };
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return List.rev(acc$1);
    }
    if (match !== "T_COMMA") {
      return List.rev(acc$1);
    }
    token$4(env, "T_COMMA");
    _acc = acc$1;
    continue ;
  };
}

function declare_class(env, start_loc) {
  let env$1 = with_strict(true, env);
  token$4(env$1, "T_CLASS");
  let id = Curry._2(Parse.identifier, undefined, env$1);
  let typeParameters = Curry._1(type_parameter_declaration_with_defaults, env$1);
  let $$extends = Curry._2(Parser_env_Peek.token, undefined, env$1) === "T_EXTENDS" ? (token$4(env$1, "T_EXTENDS"), supers(env$1, /* [] */0)) : /* [] */0;
  let mixins = Curry._2(Parser_env_Peek.value, undefined, env$1) === "mixins" ? (contextual(env$1, "mixins"), supers(env$1, /* [] */0)) : /* [] */0;
  let body = _object$1(true, env$1);
  let loc = btwn(start_loc, body[0]);
  return [
          loc,
          {
            id: id,
            typeParameters: typeParameters,
            body: body,
            extends: $$extends,
            mixins: mixins
          }
        ];
}

function supers$1(env, _acc) {
  while(true) {
    let acc = _acc;
    let $$super = wrap(generic, env);
    let acc$1 = {
      hd: $$super,
      tl: acc
    };
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return List.rev(acc$1);
    }
    if (match !== "T_COMMA") {
      return List.rev(acc$1);
    }
    token$4(env, "T_COMMA");
    _acc = acc$1;
    continue ;
  };
}

function interface_helper(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (!env.parse_options.types) {
    error(env, "UnexpectedTypeInterface");
  }
  token$4(env, "T_INTERFACE");
  let id = Curry._2(Parse.identifier, undefined, env);
  let typeParameters = Curry._1(type_parameter_declaration_with_defaults, env);
  let $$extends = Curry._2(Parser_env_Peek.token, undefined, env) === "T_EXTENDS" ? (token$4(env, "T_EXTENDS"), supers$1(env, /* [] */0)) : /* [] */0;
  let body = _object$1(true, env);
  let loc = btwn(start_loc, body[0]);
  return [
          loc,
          {
            id: id,
            typeParameters: typeParameters,
            body: body,
            extends: $$extends,
            mixins: /* [] */0
          }
        ];
}

function module_items(env, _module_kind, _acc) {
  while(true) {
    let acc = _acc;
    let module_kind = _module_kind;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RCURLY" :
        case "T_EOF" :
            return [
                    module_kind,
                    List.rev(acc)
                  ];
        default:
          
      }
    }
    let stmt = declare(true, env);
    let stmt$1 = stmt[1];
    let loc = stmt[0];
    let module_kind$1;
    if (module_kind !== undefined) {
      if (module_kind.TAG === "CommonJS") {
        if (typeof stmt$1 !== "object") {
          module_kind$1 = module_kind;
        } else {
          switch (stmt$1.TAG) {
            case "DeclareModuleExports" :
                error(env, "DuplicateDeclareModuleExports");
                module_kind$1 = module_kind;
                break;
            case "DeclareExportDeclaration" :
                let declaration = stmt$1._0.declaration;
                if (declaration !== undefined) {
                  switch (declaration.TAG) {
                    case "NamedType" :
                    case "Interface" :
                        break;
                    default:
                      error(env, "AmbiguousDeclareModuleKind");
                  }
                } else {
                  error(env, "AmbiguousDeclareModuleKind");
                }
                module_kind$1 = module_kind;
                break;
            default:
              module_kind$1 = module_kind;
          }
        }
      } else if (typeof stmt$1 !== "object" || stmt$1.TAG !== "DeclareModuleExports") {
        module_kind$1 = module_kind;
      } else {
        error(env, "AmbiguousDeclareModuleKind");
        module_kind$1 = module_kind;
      }
    } else if (typeof stmt$1 !== "object") {
      module_kind$1 = module_kind;
    } else {
      switch (stmt$1.TAG) {
        case "DeclareModuleExports" :
            module_kind$1 = {
              TAG: "CommonJS",
              _0: loc
            };
            break;
        case "DeclareExportDeclaration" :
            let declaration$1 = stmt$1._0.declaration;
            if (declaration$1 !== undefined) {
              switch (declaration$1.TAG) {
                case "NamedType" :
                case "Interface" :
                    module_kind$1 = module_kind;
                    break;
                default:
                  module_kind$1 = {
                    TAG: "ES",
                    _0: loc
                  };
              }
            } else {
              module_kind$1 = {
                TAG: "ES",
                _0: loc
              };
            }
            break;
        default:
          module_kind$1 = module_kind;
      }
    }
    _acc = {
      hd: stmt,
      tl: acc
    };
    _module_kind = module_kind$1;
    continue ;
  };
}

function fold(acc, _param) {
  while(true) {
    let param = _param;
    let match = param[1];
    switch (match.TAG) {
      case "Object" :
          return List.fold_left((function (acc, prop) {
                        if (prop.TAG === "Property") {
                          return fold(acc, prop._0[1].pattern);
                        } else {
                          return fold(acc, prop._0[1].argument);
                        }
                      }), acc, match._0.properties);
      case "Array" :
          return List.fold_left((function (acc, elem) {
                        if (elem !== undefined) {
                          if (elem.TAG === "Element") {
                            return fold(acc, elem._0);
                          } else {
                            return fold(acc, elem._0[1].argument);
                          }
                        } else {
                          return acc;
                        }
                      }), acc, match._0.elements);
      case "Assignment" :
          _param = match._0.left;
          continue ;
      case "Identifier" :
          let match$1 = match._0;
          return {
                  hd: [
                    match$1[0],
                    match$1[1].name
                  ],
                  tl: acc
                };
      case "Expression" :
          throw {
                RE_EXN_ID: "Failure",
                _1: "Parser error: No such thing as an expression pattern!",
                Error: new Error()
              };
      
    }
  };
}

function assert_can_be_forin_or_forof(env, err, param) {
  if (param === undefined) {
    return error(env, err);
  }
  if (param.TAG === "InitDeclaration") {
    let match = param._0;
    let declarations = match[1].declarations;
    if (declarations && declarations.hd[1].init === undefined && !declarations.tl) {
      return ;
    }
    return error_at(env, [
                match[0],
                err
              ]);
  }
  let match$1 = param._0;
  let loc = match$1[0];
  if (!Curry._1(Parse.is_assignable_lhs, [
          loc,
          match$1[1]
        ])) {
    return error_at(env, [
                loc,
                err
              ]);
  }
  
}

function _if(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_IF");
  token$4(env, "T_LPAREN");
  let test = Curry._1(Parse.expression, env);
  token$4(env, "T_RPAREN");
  Curry._2(Parser_env_Peek.token, undefined, env);
  let consequent = Curry._2(Parser_env_Peek.is_function, undefined, env) ? (strict_error(env, "StrictFunctionStatement"), _function(env)) : Curry._1(Parse.statement, env);
  let alternate = Curry._2(Parser_env_Peek.token, undefined, env) === "T_ELSE" ? (token$4(env, "T_ELSE"), Curry._1(Parse.statement, env)) : undefined;
  let end_loc = alternate !== undefined ? alternate[0] : consequent[0];
  return [
          btwn(start_loc, end_loc),
          {
            TAG: "If",
            _0: {
              test: test,
              consequent: consequent,
              alternate: alternate
            }
          }
        ];
}

function case_list(env, _param) {
  while(true) {
    let param = _param;
    let acc = param[1];
    let seen_default = param[0];
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RCURLY" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let test;
    if (typeof match$1 !== "object" && match$1 === "T_DEFAULT") {
      if (seen_default) {
        error(env, "MultipleDefaultsInSwitch");
      }
      token$4(env, "T_DEFAULT");
      test = undefined;
    } else {
      token$4(env, "T_CASE");
      test = Curry._1(Parse.expression, env);
    }
    let seen_default$1 = seen_default || test === undefined;
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_COLON");
    let term_fn = function (param) {
      if (typeof param === "object") {
        return false;
      }
      switch (param) {
        case "T_RCURLY" :
        case "T_CASE" :
        case "T_DEFAULT" :
            return true;
        default:
          return false;
      }
    };
    let consequent = Curry._2(Parse.statement_list, term_fn, with_in_switch(true, env));
    let match$2 = List.rev(consequent);
    let end_loc$1 = match$2 ? match$2.hd[0] : end_loc;
    let acc_0 = [
      btwn(start_loc, end_loc$1),
      {
        test: test,
        consequent: consequent
      }
    ];
    let acc$1 = {
      hd: acc_0,
      tl: acc
    };
    _param = [
      seen_default$1,
      acc$1
    ];
    continue ;
  };
}

function var_or_const(env) {
  let match = variable(env);
  let match$1 = match[0];
  let start_loc = match$1[0];
  let end_loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
  let end_loc$1 = end_loc !== undefined ? end_loc : start_loc;
  semicolon(env);
  List.iter((function (param) {
          return error_at(env, param);
        }), match[1]);
  return [
          btwn(start_loc, end_loc$1),
          match$1[1]
        ];
}

function source(env) {
  contextual(env, "from");
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object" && match.TAG === "T_STRING") {
    let match$1 = match._0;
    let octal = match$1[3];
    let raw = match$1[2];
    let value = match$1[1];
    let loc = match$1[0];
    if (octal) {
      strict_error(env, "StrictOctalLiteral");
    }
    token$4(env, {
          TAG: "T_STRING",
          _0: [
            loc,
            value,
            raw,
            octal
          ]
        });
    let value$1 = {
      TAG: "String",
      _0: value
    };
    return [
            loc,
            {
              value: value$1,
              raw: raw
            }
          ];
  }
  let raw$1 = Curry._2(Parser_env_Peek.value, undefined, env);
  let value$2 = {
    TAG: "String",
    _0: raw$1
  };
  let ret_0 = Curry._2(Parser_env_Peek.loc, undefined, env);
  let ret_1 = {
    value: value$2,
    raw: raw$1
  };
  let ret = [
    ret_0,
    ret_1
  ];
  error_unexpected(env);
  return ret;
}

function specifier_list(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_RCURLY" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let match$1 = Curry._1(Parse.identifier_or_reserved_keyword, env);
    let err = match$1[1];
    let remote = match$1[0];
    let specifier;
    if (Curry._2(Parser_env_Peek.value, undefined, env) === "as") {
      contextual(env, "as");
      let local = Curry._2(Parse.identifier, undefined, env);
      specifier = {
        TAG: "ImportNamedSpecifier",
        _0: {
          local: local,
          remote: remote
        }
      };
    } else {
      if (err !== undefined) {
        error_at(env, err);
      }
      specifier = {
        TAG: "ImportNamedSpecifier",
        _0: {
          local: undefined,
          remote: remote
        }
      };
    }
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COMMA") {
      token$4(env, "T_COMMA");
    }
    _acc = {
      hd: specifier,
      tl: acc
    };
    continue ;
  };
}

function named_or_namespace_specifier(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match !== "object" && match === "T_MULT") {
    token$4(env, "T_MULT");
    contextual(env, "as");
    let id = Curry._2(Parse.identifier, undefined, env);
    return {
            hd: {
              TAG: "ImportNamespaceSpecifier",
              _0: [
                btwn(start_loc, id[0]),
                id
              ]
            },
            tl: /* [] */0
          };
  }
  token$4(env, "T_LCURLY");
  let specifiers = specifier_list(env, /* [] */0);
  token$4(env, "T_RCURLY");
  return specifiers;
}

function from_expr(env, param) {
  let expr = param[1];
  let loc = param[0];
  if (typeof expr === "object") {
    switch (expr.TAG) {
      case "Array" :
          let param$1 = [
            loc,
            expr._0
          ];
          let elements = List.map((function (param) {
                  if (param === undefined) {
                    return ;
                  }
                  if (param.TAG === "Expression") {
                    let match = param._0;
                    return {
                            TAG: "Element",
                            _0: Curry._2(Parse.pattern_from_expr, env, [
                                  match[0],
                                  match[1]
                                ])
                          };
                  }
                  let match$1 = param._0;
                  let argument = Curry._2(Parse.pattern_from_expr, env, match$1[1].argument);
                  return {
                          TAG: "Spread",
                          _0: [
                            match$1[0],
                            {
                              argument: argument
                            }
                          ]
                        };
                }), param$1[1].elements);
          return [
                  param$1[0],
                  {
                    TAG: "Array",
                    _0: {
                      elements: elements,
                      typeAnnotation: undefined
                    }
                  }
                ];
      case "Object" :
          let param$2 = [
            loc,
            expr._0
          ];
          let properties = List.map((function (param) {
                  if (param.TAG === "Property") {
                    let match = param._0;
                    let match$1 = match[1];
                    let key = match$1.key;
                    let key$1;
                    switch (key.TAG) {
                      case "Literal" :
                          key$1 = {
                            TAG: "Literal",
                            _0: key._0
                          };
                          break;
                      case "Identifier" :
                          key$1 = {
                            TAG: "Identifier",
                            _0: key._0
                          };
                          break;
                      case "Computed" :
                          key$1 = {
                            TAG: "Computed",
                            _0: key._0
                          };
                          break;
                      
                    }
                    let pattern = Curry._2(Parse.pattern_from_expr, env, match$1.value);
                    return {
                            TAG: "Property",
                            _0: [
                              match[0],
                              {
                                key: key$1,
                                pattern: pattern,
                                shorthand: match$1.shorthand
                              }
                            ]
                          };
                  }
                  let match$2 = param._0;
                  let argument = Curry._2(Parse.pattern_from_expr, env, match$2[1].argument);
                  return {
                          TAG: "SpreadProperty",
                          _0: [
                            match$2[0],
                            {
                              argument: argument
                            }
                          ]
                        };
                }), param$2[1].properties);
          return [
                  param$2[0],
                  {
                    TAG: "Object",
                    _0: {
                      properties: properties,
                      typeAnnotation: undefined
                    }
                  }
                ];
      case "Assignment" :
          let match = expr._0;
          if (match.operator === "Assign") {
            return [
                    loc,
                    {
                      TAG: "Assignment",
                      _0: {
                        left: match.left,
                        right: match.right
                      }
                    }
                  ];
          }
          break;
      case "Identifier" :
          return [
                  loc,
                  {
                    TAG: "Identifier",
                    _0: expr._0
                  }
                ];
      default:
        
    }
  }
  return [
          loc,
          {
            TAG: "Expression",
            _0: [
              loc,
              expr
            ]
          }
        ];
}

function _object$2(restricted_error) {
  let property = function (env) {
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    if (maybe(env, "T_ELLIPSIS")) {
      let argument = pattern$1(env, restricted_error);
      let loc = btwn(start_loc, argument[0]);
      return {
              TAG: "SpreadProperty",
              _0: [
                loc,
                {
                  argument: argument
                }
              ]
            };
    }
    let match = Curry._1(Parse.object_key, env);
    let lit = match[1];
    let key;
    switch (lit.TAG) {
      case "Literal" :
          key = {
            TAG: "Literal",
            _0: lit._0
          };
          break;
      case "Identifier" :
          key = {
            TAG: "Identifier",
            _0: lit._0
          };
          break;
      case "Computed" :
          key = {
            TAG: "Computed",
            _0: lit._0
          };
          break;
      
    }
    let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let prop;
    let exit = 0;
    if (typeof match$1 !== "object" && match$1 === "T_COLON") {
      token$4(env, "T_COLON");
      prop = [
        pattern$1(env, restricted_error),
        false
      ];
    } else {
      exit = 1;
    }
    if (exit === 1) {
      switch (key.TAG) {
        case "Identifier" :
            let id = key._0;
            let pattern_0 = id[0];
            let pattern_1 = {
              TAG: "Identifier",
              _0: id
            };
            let pattern$2 = [
              pattern_0,
              pattern_1
            ];
            prop = [
              pattern$2,
              true
            ];
            break;
        case "Literal" :
        case "Computed" :
            error_unexpected(env);
            prop = undefined;
            break;
        
      }
    }
    if (prop === undefined) {
      return ;
    }
    let pattern$3 = prop[0];
    let match$2 = Curry._2(Parser_env_Peek.token, undefined, env);
    let pattern$4;
    if (typeof match$2 !== "object" && match$2 === "T_ASSIGN") {
      token$4(env, "T_ASSIGN");
      let $$default = Curry._1(Parse.assignment, env);
      let loc$1 = btwn(pattern$3[0], $$default[0]);
      pattern$4 = [
        loc$1,
        {
          TAG: "Assignment",
          _0: {
            left: pattern$3,
            right: $$default
          }
        }
      ];
    } else {
      pattern$4 = pattern$3;
    }
    let loc$2 = btwn(start_loc, pattern$4[0]);
    return {
            TAG: "Property",
            _0: [
              loc$2,
              {
                key: key,
                pattern: pattern$4,
                shorthand: prop[1]
              }
            ]
          };
  };
  let properties = function (env, _acc) {
    while(true) {
      let acc = _acc;
      let match = Curry._2(Parser_env_Peek.token, undefined, env);
      if (typeof match !== "object") {
        switch (match) {
          case "T_RCURLY" :
          case "T_EOF" :
              return List.rev(acc);
          default:
            
        }
      }
      let prop = property(env);
      if (prop !== undefined) {
        if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RCURLY") {
          token$4(env, "T_COMMA");
        }
        _acc = {
          hd: prop,
          tl: acc
        };
        continue ;
      }
      continue ;
    };
  };
  return function (env) {
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_LCURLY");
    let properties$1 = properties(env, /* [] */0);
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_RCURLY");
    let match;
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COLON") {
      let typeAnnotation = wrap(annotation, env);
      match = [
        typeAnnotation[0],
        typeAnnotation
      ];
    } else {
      match = [
        end_loc,
        undefined
      ];
    }
    return [
            btwn(start_loc, match[0]),
            {
              TAG: "Object",
              _0: {
                properties: properties$1,
                typeAnnotation: match[1]
              }
            }
          ];
  };
}

function _array(restricted_error) {
  let elements = function (env, _acc) {
    while(true) {
      let acc = _acc;
      let match = Curry._2(Parser_env_Peek.token, undefined, env);
      if (typeof match !== "object") {
        switch (match) {
          case "T_COMMA" :
              token$4(env, "T_COMMA");
              _acc = {
                hd: undefined,
                tl: acc
              };
              continue ;
          case "T_ELLIPSIS" :
              let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
              token$4(env, "T_ELLIPSIS");
              let argument = pattern$1(env, restricted_error);
              let loc = btwn(start_loc, argument[0]);
              let element = {
                TAG: "Spread",
                _0: [
                  loc,
                  {
                    argument: argument
                  }
                ]
              };
              _acc = {
                hd: element,
                tl: acc
              };
              continue ;
          case "T_RBRACKET" :
          case "T_EOF" :
              return List.rev(acc);
          default:
            
        }
      }
      let pattern$2 = pattern$1(env, restricted_error);
      let match$1 = Curry._2(Parser_env_Peek.token, undefined, env);
      let pattern$3;
      if (typeof match$1 !== "object" && match$1 === "T_ASSIGN") {
        token$4(env, "T_ASSIGN");
        let $$default = Curry._1(Parse.expression, env);
        let loc$1 = btwn(pattern$2[0], $$default[0]);
        pattern$3 = [
          loc$1,
          {
            TAG: "Assignment",
            _0: {
              left: pattern$2,
              right: $$default
            }
          }
        ];
      } else {
        pattern$3 = pattern$2;
      }
      let element$1 = {
        TAG: "Element",
        _0: pattern$3
      };
      if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_RBRACKET") {
        token$4(env, "T_COMMA");
      }
      _acc = {
        hd: element$1,
        tl: acc
      };
      continue ;
    };
  };
  return function (env) {
    let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_LBRACKET");
    let elements$1 = elements(env, /* [] */0);
    let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
    token$4(env, "T_RBRACKET");
    let match;
    if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COLON") {
      let typeAnnotation = wrap(annotation, env);
      match = [
        typeAnnotation[0],
        typeAnnotation
      ];
    } else {
      match = [
        end_loc,
        undefined
      ];
    }
    return [
            btwn(start_loc, match[0]),
            {
              TAG: "Array",
              _0: {
                elements: elements$1,
                typeAnnotation: match[1]
              }
            }
          ];
  };
}

function pattern$1(env, restricted_error) {
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match !== "object") {
    switch (match) {
      case "T_LCURLY" :
          return _object$2(restricted_error)(env);
      case "T_LBRACKET" :
          return _array(restricted_error)(env);
      default:
        
    }
  }
  let id = Curry._2(Parse.identifier_with_type, env, restricted_error);
  return [
          id[0],
          {
            TAG: "Identifier",
            _0: id
          }
        ];
}

function spread_attribute(env) {
  push_lex_mode(env, "NORMAL");
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  token$4(env, "T_ELLIPSIS");
  let argument = Curry._1(assignment, env);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  pop_lex_mode(env);
  return [
          btwn(start_loc, end_loc),
          {
            argument: argument
          }
        ];
}

function expression_container(env) {
  push_lex_mode(env, "NORMAL");
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let expression;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_RCURLY") {
    let empty_loc = btwn_exclusive(start_loc, Curry._2(Parser_env_Peek.loc, undefined, env));
    expression = {
      TAG: "EmptyExpression",
      _0: empty_loc
    };
  } else {
    expression = {
      TAG: "Expression",
      _0: Curry._1(Parse.expression, env)
    };
  }
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  pop_lex_mode(env);
  return [
          btwn(start_loc, end_loc),
          {
            expression: expression
          }
        ];
}

function identifier$1(env) {
  let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let name = Curry._2(Parser_env_Peek.value, undefined, env);
  token$4(env, "T_JSX_IDENTIFIER");
  return [
          loc,
          {
            name: name
          }
        ];
}

function member_expression(env, _member) {
  while(true) {
    let member = _member;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match === "object") {
      return member;
    }
    if (match !== "T_PERIOD") {
      return member;
    }
    let _object = {
      TAG: "MemberExpression",
      _0: member
    };
    token$4(env, "T_PERIOD");
    let property = identifier$1(env);
    let loc = btwn(member[0], property[0]);
    let member_1 = {
      _object: _object,
      property: property
    };
    let member$1 = [
      loc,
      member_1
    ];
    _member = member$1;
    continue ;
  };
}

function name(env) {
  let name$1 = identifier$1(env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return {
            TAG: "Identifier",
            _0: name$1
          };
  }
  switch (match) {
    case "T_PERIOD" :
        let _object = {
          TAG: "Identifier",
          _0: name$1
        };
        token$4(env, "T_PERIOD");
        let property = identifier$1(env);
        let loc = btwn(name$1[0], property[0]);
        let member_1 = {
          _object: _object,
          property: property
        };
        let member = [
          loc,
          member_1
        ];
        return {
                TAG: "MemberExpression",
                _0: member_expression(env, member)
              };
    case "T_COLON" :
        token$4(env, "T_COLON");
        let name$2 = identifier$1(env);
        let loc$1 = btwn(name$1[0], name$2[0]);
        return {
                TAG: "NamespacedName",
                _0: [
                  loc$1,
                  {
                    namespace: name$1,
                    name: name$2
                  }
                ]
              };
    default:
      return {
              TAG: "Identifier",
              _0: name$1
            };
  }
}

function attribute(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let name = identifier$1(env);
  let match;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_COLON") {
    token$4(env, "T_COLON");
    let name$1 = identifier$1(env);
    let loc = btwn(name[0], name$1[0]);
    match = [
      loc,
      {
        TAG: "NamespacedName",
        _0: [
          loc,
          {
            namespace: name,
            name: name$1
          }
        ]
      }
    ];
  } else {
    match = [
      name[0],
      {
        TAG: "Identifier",
        _0: name
      }
    ];
  }
  let match$1;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_ASSIGN") {
    token$4(env, "T_ASSIGN");
    let token$5 = Curry._2(Parser_env_Peek.token, undefined, env);
    let exit = 0;
    if (typeof token$5 !== "object") {
      if (token$5 === "T_LCURLY") {
        let match$2 = expression_container(env);
        let expression_container$1 = match$2[1];
        let loc$1 = match$2[0];
        let match$3 = expression_container$1.expression;
        if (match$3.TAG !== "Expression") {
          error(env, "JSXAttributeValueEmptyExpression");
        }
        match$1 = [
          loc$1,
          {
            TAG: "ExpressionContainer",
            _0: loc$1,
            _1: expression_container$1
          }
        ];
      } else {
        exit = 1;
      }
    } else if (token$5.TAG === "T_JSX_TEXT") {
      let match$4 = token$5._0;
      let loc$2 = match$4[0];
      token$4(env, token$5);
      let value = {
        TAG: "String",
        _0: match$4[1]
      };
      match$1 = [
        loc$2,
        {
          TAG: "Literal",
          _0: loc$2,
          _1: {
            value: value,
            raw: match$4[2]
          }
        }
      ];
    } else {
      exit = 1;
    }
    if (exit === 1) {
      error(env, "InvalidJSXAttributeValue");
      let loc$3 = Curry._2(Parser_env_Peek.loc, undefined, env);
      match$1 = [
        loc$3,
        {
          TAG: "Literal",
          _0: loc$3,
          _1: {
            value: {
              TAG: "String",
              _0: ""
            },
            raw: ""
          }
        }
      ];
    }
    
  } else {
    match$1 = [
      match[0],
      undefined
    ];
  }
  return [
          btwn(start_loc, match$1[0]),
          {
            name: match[1],
            value: match$1[1]
          }
        ];
}

function attributes(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_LCURLY" :
            let attribute$1 = {
              TAG: "SpreadAttribute",
              _0: spread_attribute(env)
            };
            _acc = {
              hd: attribute$1,
              tl: acc
            };
            continue ;
        case "T_GREATER_THAN" :
        case "T_DIV" :
        case "T_EOF" :
            return List.rev(acc);
        default:
          
      }
    }
    let attribute$2 = {
      TAG: "Attribute",
      _0: attribute(env)
    };
    _acc = {
      hd: attribute$2,
      tl: acc
    };
    continue ;
  };
}

function opening_element_without_lt(env, start_loc) {
  let name$1 = name(env);
  let attributes$1 = attributes(env, /* [] */0);
  let selfClosing = Curry._2(Parser_env_Peek.token, undefined, env) === "T_DIV";
  if (selfClosing) {
    token$4(env, "T_DIV");
  }
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_GREATER_THAN");
  pop_lex_mode(env);
  return [
          btwn(start_loc, end_loc),
          {
            name: name$1,
            selfClosing: selfClosing,
            attributes: attributes$1
          }
        ];
}

function closing_element_without_lt(env, start_loc) {
  token$4(env, "T_DIV");
  let name$1 = name(env);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_GREATER_THAN");
  double_pop_lex_mode(env);
  return [
          btwn(start_loc, end_loc),
          {
            name: name$1
          }
        ];
}

function child(env) {
  let token$5 = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof token$5 !== "object") {
    if (token$5 === "T_LCURLY") {
      let expression_container$1 = expression_container(env);
      return [
              expression_container$1[0],
              {
                TAG: "ExpressionContainer",
                _0: expression_container$1[1]
              }
            ];
    }
    
  } else if (token$5.TAG === "T_JSX_TEXT") {
    let match = token$5._0;
    token$4(env, token$5);
    return [
            match[0],
            {
              TAG: "Text",
              _0: {
                value: match[1],
                raw: match[2]
              }
            }
          ];
  }
  let element$1 = element(env);
  return [
          element$1[0],
          {
            TAG: "Element",
            _0: element$1[1]
          }
        ];
}

function element(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  push_lex_mode(env, "JSX_TAG");
  token$4(env, "T_LESS_THAN");
  return Curry._2(element_without_lt, env, start_loc);
}

function element_or_closing(env) {
  push_lex_mode(env, "JSX_TAG");
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LESS_THAN");
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return {
            TAG: "ChildElement",
            _0: Curry._2(element_without_lt, env, start_loc)
          };
  }
  switch (match) {
    case "T_DIV" :
    case "T_EOF" :
        return {
                TAG: "Closing",
                _0: closing_element_without_lt(env, start_loc)
              };
    default:
      return {
              TAG: "ChildElement",
              _0: Curry._2(element_without_lt, env, start_loc)
            };
  }
}

function children_and_closing(env, _acc) {
  while(true) {
    let acc = _acc;
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof match !== "object") {
      switch (match) {
        case "T_LESS_THAN" :
            let closingElement = element_or_closing(env);
            if (closingElement.TAG === "Closing") {
              return [
                      List.rev(acc),
                      closingElement._0
                    ];
            }
            let element = closingElement._0;
            let element_0 = element[0];
            let element_1 = {
              TAG: "Element",
              _0: element[1]
            };
            let element$1 = [
              element_0,
              element_1
            ];
            _acc = {
              hd: element$1,
              tl: acc
            };
            continue ;
        case "T_EOF" :
            error_unexpected(env);
            return [
                    List.rev(acc),
                    undefined
                  ];
        default:
          _acc = {
            hd: child(env),
            tl: acc
          };
          continue ;
      }
    } else {
      _acc = {
        hd: child(env),
        tl: acc
      };
      continue ;
    }
  };
}

function normalize(name) {
  switch (name.TAG) {
    case "Identifier" :
        return name._0[1].name;
    case "NamespacedName" :
        let match = name._0[1];
        return match.namespace[1].name + (":" + match.name[1].name);
    case "MemberExpression" :
        let match$1 = name._0[1];
        let _object = match$1._object;
        let _object$1;
        _object$1 = _object.TAG === "Identifier" ? _object._0[1].name : normalize({
                TAG: "MemberExpression",
                _0: _object._0
              });
        return _object$1 + ("." + match$1.property[1].name);
    
  }
}

function element_without_lt(env, start_loc) {
  let openingElement = opening_element_without_lt(env, start_loc);
  let match = openingElement[1].selfClosing ? [
      /* [] */0,
      undefined
    ] : (push_lex_mode(env, "JSX_CHILD"), children_and_closing(env, /* [] */0));
  let closingElement = match[1];
  let end_loc;
  if (closingElement !== undefined) {
    let opening_name = normalize(openingElement[1].name);
    if (normalize(closingElement[1].name) !== opening_name) {
      error(env, {
            TAG: "ExpectedJSXClosingTag",
            _0: opening_name
          });
    }
    end_loc = closingElement[0];
  } else {
    end_loc = openingElement[0];
  }
  return [
          btwn(openingElement[0], end_loc),
          {
            openingElement: openingElement,
            closingElement: closingElement,
            children: match[0]
          }
        ];
}

function statement_list_item(decoratorsOpt, env) {
  let decorators = decoratorsOpt !== undefined ? decoratorsOpt : /* [] */0;
  if (!Curry._2(Parser_env_Peek.is_class, undefined, env)) {
    error_on_decorators(env)(decorators);
  }
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match !== "object") {
    switch (match) {
      case "T_CONST" :
          return var_or_const(env);
      case "T_LET" :
          let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
          token$4(env, "T_LET");
          if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_LPAREN") {
            token$4(env, "T_LPAREN");
            let match$1 = helper(with_no_let(true, env), /* [] */0, /* [] */0);
            let head = List.map((function (param) {
                    let match = param[1];
                    return {
                            id: match.id,
                            init: match.init
                          };
                  }), match$1[1]);
            token$4(env, "T_RPAREN");
            let body = Curry._1(Parse.statement, env);
            let end_loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$1 = end_loc !== undefined ? end_loc : match$1[0];
            semicolon(env);
            List.iter((function (param) {
                    return error_at(env, param);
                  }), match$1[2]);
            return [
                    btwn(start_loc, end_loc$1),
                    {
                      TAG: "Let",
                      _0: {
                        head: head,
                        body: body
                      }
                    }
                  ];
          }
          let match$2 = helper(with_no_let(true, env), /* [] */0, /* [] */0);
          let declaration = {
            TAG: "VariableDeclaration",
            _0: {
              declarations: match$2[1],
              kind: "Let"
            }
          };
          let end_loc$2 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
          let end_loc$3 = end_loc$2 !== undefined ? end_loc$2 : match$2[0];
          semicolon(env);
          List.iter((function (param) {
                  return error_at(env, param);
                }), match$2[2]);
          return [
                  btwn(start_loc, end_loc$3),
                  declaration
                ];
      default:
        
    }
  }
  if (Curry._2(Parser_env_Peek.is_function, undefined, env)) {
    return _function(env);
  }
  if (Curry._2(Parser_env_Peek.is_class, undefined, env)) {
    return class_declaration$1(env, decorators);
  }
  if (typeof match === "object") {
    return statement(env);
  }
  switch (match) {
    case "T_INTERFACE" :
        return $$interface(env);
    case "T_DECLARE" :
        return declare(undefined, env);
    case "T_TYPE" :
        return type_alias(env);
    default:
      return statement(env);
  }
}

function statement(env) {
  while(true) {
    let match = Curry._2(Parser_env_Peek.token, undefined, env);
    let exit = 0;
    if (typeof match !== "object") {
      switch (match) {
        case "T_LCURLY" :
            let match$1 = Curry._1(Parse.block_body, env);
            return [
                    match$1[0],
                    {
                      TAG: "Block",
                      _0: match$1[1]
                    }
                  ];
        case "T_SEMICOLON" :
            let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_SEMICOLON");
            return [
                    loc,
                    "Empty"
                  ];
        case "T_IF" :
            return _if(env);
        case "T_RETURN" :
            if (!env.in_function) {
              error(env, "IllegalReturn");
            }
            let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_RETURN");
            let argument = Curry._2(Parser_env_Peek.token, undefined, env) === "T_SEMICOLON" || Curry._1(Parser_env_Peek.is_implicit_semicolon, env) ? undefined : Curry._1(Parse.expression, env);
            let loc$1 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc = loc$1 !== undefined ? loc$1 : (
                argument !== undefined ? argument[0] : start_loc
              );
            semicolon(env);
            return [
                    btwn(start_loc, end_loc),
                    {
                      TAG: "Return",
                      _0: {
                        argument: argument
                      }
                    }
                  ];
        case "T_SWITCH" :
            let start_loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_SWITCH");
            token$4(env, "T_LPAREN");
            let discriminant = Curry._1(Parse.expression, env);
            token$4(env, "T_RPAREN");
            token$4(env, "T_LCURLY");
            let cases = case_list(env, [
                  false,
                  /* [] */0
                ]);
            let end_loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_RCURLY");
            return [
                    btwn(start_loc$1, end_loc$1),
                    {
                      TAG: "Switch",
                      _0: {
                        discriminant: discriminant,
                        cases: cases,
                        lexical: false
                      }
                    }
                  ];
        case "T_THROW" :
            let start_loc$2 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_THROW");
            if (Curry._1(Parser_env_Peek.is_line_terminator, env)) {
              error_at(env, [
                    start_loc$2,
                    "NewlineAfterThrow"
                  ]);
            }
            let argument$1 = Curry._1(Parse.expression, env);
            let loc$2 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$2 = loc$2 !== undefined ? loc$2 : argument$1[0];
            semicolon(env);
            return [
                    btwn(start_loc$2, end_loc$2),
                    {
                      TAG: "Throw",
                      _0: {
                        argument: argument$1
                      }
                    }
                  ];
        case "T_TRY" :
            let start_loc$3 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_TRY");
            let block = Curry._1(Parse.block_body, env);
            let match$2 = Curry._2(Parser_env_Peek.token, undefined, env);
            let handler;
            if (typeof match$2 !== "object" && match$2 === "T_CATCH") {
              let start_loc$4 = Curry._2(Parser_env_Peek.loc, undefined, env);
              token$4(env, "T_CATCH");
              token$4(env, "T_LPAREN");
              let id = Curry._2(Parse.identifier, "StrictCatchVariable", env);
              let param_0 = id[0];
              let param_1 = {
                TAG: "Identifier",
                _0: id
              };
              let param = [
                param_0,
                param_1
              ];
              token$4(env, "T_RPAREN");
              let body = Curry._1(Parse.block_body, env);
              let loc$3 = btwn(start_loc$4, body[0]);
              handler = [
                loc$3,
                {
                  param: param,
                  guard: undefined,
                  body: body
                }
              ];
            } else {
              handler = undefined;
            }
            let match$3 = Curry._2(Parser_env_Peek.token, undefined, env);
            let finalizer;
            if (typeof match$3 !== "object" && match$3 === "T_FINALLY") {
              token$4(env, "T_FINALLY");
              finalizer = Curry._1(Parse.block_body, env);
            } else {
              finalizer = undefined;
            }
            let end_loc$3 = finalizer !== undefined ? finalizer[0] : (
                handler !== undefined ? handler[0] : (error_at(env, [
                          block[0],
                          "NoCatchOrFinally"
                        ]), block[0])
              );
            return [
                    btwn(start_loc$3, end_loc$3),
                    {
                      TAG: "Try",
                      _0: {
                        block: block,
                        handler: handler,
                        guardedHandlers: /* [] */0,
                        finalizer: finalizer
                      }
                    }
                  ];
        case "T_VAR" :
            return var_or_const(env);
        case "T_WHILE" :
            let start_loc$5 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_WHILE");
            token$4(env, "T_LPAREN");
            let test = Curry._1(Parse.expression, env);
            token$4(env, "T_RPAREN");
            let body$1 = Curry._1(Parse.statement, with_in_loop(true, env));
            return [
                    btwn(start_loc$5, body$1[0]),
                    {
                      TAG: "While",
                      _0: {
                        test: test,
                        body: body$1
                      }
                    }
                  ];
        case "T_WITH" :
            let start_loc$6 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_WITH");
            token$4(env, "T_LPAREN");
            let _object = Curry._1(Parse.expression, env);
            token$4(env, "T_RPAREN");
            let body$2 = Curry._1(Parse.statement, env);
            let loc$4 = btwn(start_loc$6, body$2[0]);
            strict_error_at(env, [
                  loc$4,
                  "StrictModeWith"
                ]);
            return [
                    loc$4,
                    {
                      TAG: "With",
                      _0: {
                        _object: _object,
                        body: body$2
                      }
                    }
                  ];
        case "T_BREAK" :
            let start_loc$7 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_BREAK");
            let label;
            if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_SEMICOLON" || Curry._1(Parser_env_Peek.is_implicit_semicolon, env)) {
              label = undefined;
            } else {
              let label$1 = Curry._2(Parse.identifier, undefined, env);
              let name = label$1[1].name;
              if (!mem$1(name, env.labels)) {
                error(env, {
                      TAG: "UnknownLabel",
                      _0: name
                    });
              }
              label = label$1;
            }
            let loc$5 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$4 = loc$5 !== undefined ? loc$5 : (
                label !== undefined ? label[0] : start_loc$7
              );
            let loc$6 = btwn(start_loc$7, end_loc$4);
            if (label === undefined && !(env.in_loop || env.in_switch)) {
              error_at(env, [
                    loc$6,
                    "IllegalBreak"
                  ]);
            }
            semicolon(env);
            return [
                    loc$6,
                    {
                      TAG: "Break",
                      _0: {
                        label: label
                      }
                    }
                  ];
        case "T_CONTINUE" :
            let start_loc$8 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_CONTINUE");
            let label$2;
            if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_SEMICOLON" || Curry._1(Parser_env_Peek.is_implicit_semicolon, env)) {
              label$2 = undefined;
            } else {
              let label$3 = Curry._2(Parse.identifier, undefined, env);
              let name$1 = label$3[1].name;
              if (!mem$1(name$1, env.labels)) {
                error(env, {
                      TAG: "UnknownLabel",
                      _0: name$1
                    });
              }
              label$2 = label$3;
            }
            let loc$7 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$5 = loc$7 !== undefined ? loc$7 : (
                label$2 !== undefined ? label$2[0] : start_loc$8
              );
            let loc$8 = btwn(start_loc$8, end_loc$5);
            if (!env.in_loop) {
              error_at(env, [
                    loc$8,
                    "IllegalContinue"
                  ]);
            }
            semicolon(env);
            return [
                    loc$8,
                    {
                      TAG: "Continue",
                      _0: {
                        label: label$2
                      }
                    }
                  ];
        case "T_DO" :
            let start_loc$9 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_DO");
            let body$3 = Curry._1(Parse.statement, with_in_loop(true, env));
            token$4(env, "T_WHILE");
            token$4(env, "T_LPAREN");
            let test$1 = Curry._1(Parse.expression, env);
            let end_loc$6 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_RPAREN");
            let loc$9 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$7 = loc$9 !== undefined ? loc$9 : end_loc$6;
            if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_SEMICOLON") {
              semicolon(env);
            }
            return [
                    btwn(start_loc$9, end_loc$7),
                    {
                      TAG: "DoWhile",
                      _0: {
                        body: body$3,
                        test: test$1
                      }
                    }
                  ];
        case "T_FOR" :
            let start_loc$10 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_FOR");
            token$4(env, "T_LPAREN");
            let match$4 = Curry._2(Parser_env_Peek.token, undefined, env);
            let match$5;
            let exit$1 = 0;
            if (typeof match$4 !== "object") {
              switch (match$4) {
                case "T_SEMICOLON" :
                    match$5 = [
                      undefined,
                      /* [] */0
                    ];
                    break;
                case "T_VAR" :
                    let match$6 = declarations("T_VAR", "Var", with_no_in(true, env));
                    match$5 = [
                      {
                        TAG: "InitDeclaration",
                        _0: match$6[0]
                      },
                      match$6[1]
                    ];
                    break;
                case "T_CONST" :
                    let match$7 = $$const(with_no_in(true, env));
                    match$5 = [
                      {
                        TAG: "InitDeclaration",
                        _0: match$7[0]
                      },
                      match$7[1]
                    ];
                    break;
                case "T_LET" :
                    let match$8 = _let(with_no_in(true, env));
                    match$5 = [
                      {
                        TAG: "InitDeclaration",
                        _0: match$8[0]
                      },
                      match$8[1]
                    ];
                    break;
                default:
                  exit$1 = 1;
              }
            } else {
              exit$1 = 1;
            }
            if (exit$1 === 1) {
              let expr = Curry._1(Parse.expression, with_no_let(true, with_no_in(true, env)));
              match$5 = [
                {
                  TAG: "InitExpression",
                  _0: expr
                },
                /* [] */0
              ];
            }
            let init = match$5[0];
            let match$9 = Curry._2(Parser_env_Peek.token, undefined, env);
            if (typeof match$9 !== "object") {
              switch (match$9) {
                case "T_IN" :
                    assert_can_be_forin_or_forof(env, "InvalidLHSInForIn", init);
                    let left;
                    if (init !== undefined) {
                      left = init.TAG === "InitDeclaration" ? ({
                            TAG: "LeftDeclaration",
                            _0: init._0
                          }) : ({
                            TAG: "LeftExpression",
                            _0: init._0
                          });
                    } else {
                      throw {
                            RE_EXN_ID: "Assert_failure",
                            _1: [
                              "parser_flow.ml",
                              2556,
                              22
                            ],
                            Error: new Error()
                          };
                    }
                    token$4(env, "T_IN");
                    let right = Curry._1(Parse.expression, env);
                    token$4(env, "T_RPAREN");
                    let body$4 = Curry._1(Parse.statement, with_in_loop(true, env));
                    return [
                            btwn(start_loc$10, body$4[0]),
                            {
                              TAG: "ForIn",
                              _0: {
                                left: left,
                                right: right,
                                body: body$4,
                                each: false
                              }
                            }
                          ];
                case "T_OF" :
                    assert_can_be_forin_or_forof(env, "InvalidLHSInForOf", init);
                    let left$1;
                    if (init !== undefined) {
                      left$1 = init.TAG === "InitDeclaration" ? ({
                            TAG: "LeftDeclaration",
                            _0: init._0
                          }) : ({
                            TAG: "LeftExpression",
                            _0: init._0
                          });
                    } else {
                      throw {
                            RE_EXN_ID: "Assert_failure",
                            _1: [
                              "parser_flow.ml",
                              2573,
                              22
                            ],
                            Error: new Error()
                          };
                    }
                    token$4(env, "T_OF");
                    let right$1 = Curry._1(Parse.assignment, env);
                    token$4(env, "T_RPAREN");
                    let body$5 = Curry._1(Parse.statement, with_in_loop(true, env));
                    return [
                            btwn(start_loc$10, body$5[0]),
                            {
                              TAG: "ForOf",
                              _0: {
                                left: left$1,
                                right: right$1,
                                body: body$5
                              }
                            }
                          ];
                default:
                  
              }
            }
            List.iter((function (param) {
                    return error_at(env, param);
                  }), match$5[1]);
            token$4(env, "T_SEMICOLON");
            let match$10 = Curry._2(Parser_env_Peek.token, undefined, env);
            let test$2;
            test$2 = typeof match$10 !== "object" && match$10 === "T_SEMICOLON" ? undefined : Curry._1(Parse.expression, env);
            token$4(env, "T_SEMICOLON");
            let match$11 = Curry._2(Parser_env_Peek.token, undefined, env);
            let update;
            update = typeof match$11 !== "object" && match$11 === "T_RPAREN" ? undefined : Curry._1(Parse.expression, env);
            token$4(env, "T_RPAREN");
            let body$6 = Curry._1(Parse.statement, with_in_loop(true, env));
            return [
                    btwn(start_loc$10, body$6[0]),
                    {
                      TAG: "For",
                      _0: {
                        init: init,
                        test: test$2,
                        update: update,
                        body: body$6
                      }
                    }
                  ];
        case "T_DEBUGGER" :
            let start_loc$11 = Curry._2(Parser_env_Peek.loc, undefined, env);
            token$4(env, "T_DEBUGGER");
            let loc$10 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
            let end_loc$8 = loc$10 !== undefined ? loc$10 : start_loc$11;
            semicolon(env);
            return [
                    btwn(start_loc$11, end_loc$8),
                    "Debugger"
                  ];
        case "T_EOF" :
            error_unexpected(env);
            return [
                    Curry._2(Parser_env_Peek.loc, undefined, env),
                    "Empty"
                  ];
        default:
          exit = 2;
      }
    } else {
      exit = 2;
    }
    if (exit === 2) {
      if (Curry._2(Parser_env_Peek.is_identifier, undefined, env)) {
        let expr$1 = Curry._1(Parse.expression, env);
        let match$12 = Curry._2(Parser_env_Peek.token, undefined, env);
        let label$4 = expr$1[1];
        let loc$11 = expr$1[0];
        if (typeof label$4 === "object" && label$4.TAG === "Identifier" && typeof match$12 !== "object" && match$12 === "T_COLON") {
          let label$5 = label$4._0;
          let match$13 = label$5[1];
          let name$2 = match$13.name;
          token$4(env, "T_COLON");
          if (mem$1(name$2, env.labels)) {
            error_at(env, [
                  loc$11,
                  {
                    TAG: "Redeclaration",
                    _0: "Label",
                    _1: name$2
                  }
                ]);
          }
          let env$1 = add_label(env, name$2);
          let labeled_stmt = Curry._1(Parse.statement, env$1);
          return [
                  btwn(loc$11, labeled_stmt[0]),
                  {
                    TAG: "Labeled",
                    _0: {
                      label: label$5,
                      body: labeled_stmt
                    }
                  }
                ];
        }
        let loc$12 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env);
        let end_loc$9 = loc$12 !== undefined ? loc$12 : expr$1[0];
        semicolon(env);
        return [
                btwn(expr$1[0], end_loc$9),
                {
                  TAG: "Expression",
                  _0: {
                    expression: expr$1
                  }
                }
              ];
      }
      if (typeof match === "object") {
        return expression(env);
      }
      switch (match) {
        case "T_ELSE" :
            return _if(env);
        case "T_RCURLY" :
        case "T_RPAREN" :
        case "T_RBRACKET" :
        case "T_COMMA" :
        case "T_PERIOD" :
        case "T_ARROW" :
        case "T_ELLIPSIS" :
        case "T_IN" :
        case "T_INSTANCEOF" :
        case "T_CASE" :
        case "T_CATCH" :
        case "T_DEFAULT" :
        case "T_FINALLY" :
        case "T_EXTENDS" :
        case "T_STATIC" :
        case "T_EXPORT" :
        case "T_IMPORT" :
        case "T_COLON" :
            break;
        default:
          return expression(env);
      }
    }
    error_unexpected(env);
    token$3(env);
    continue ;
  };
}

function module_item(env) {
  let decorators = decorator_list(env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match === "object") {
    return statement_list_item(decorators, env);
  }
  switch (match) {
    case "T_EXPORT" :
        let env$1 = with_in_export(true, with_strict(true, env));
        let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env$1);
        token$4(env$1, "T_EXPORT");
        let match$1 = Curry._2(Parser_env_Peek.token, undefined, env$1);
        let exit = 0;
        if (typeof match$1 !== "object") {
          switch (match$1) {
            case "T_DEFAULT" :
                token$4(env$1, "T_DEFAULT");
                record_export(env$1, [
                      btwn(start_loc, Curry._2(Parser_env_Peek.loc, undefined, env$1)),
                      "default"
                    ]);
                let match$2 = Curry._2(Parser_env_Peek.token, undefined, env$1);
                let match$3;
                let exit$1 = 0;
                if (typeof match$2 !== "object" && match$2 === "T_FUNCTION") {
                  let fn = _function(env$1);
                  match$3 = [
                    fn[0],
                    {
                      TAG: "Declaration",
                      _0: fn
                    }
                  ];
                } else {
                  exit$1 = 3;
                }
                if (exit$1 === 3) {
                  if (Curry._2(Parser_env_Peek.is_class, undefined, env$1)) {
                    let _class = class_declaration(env$1, decorators);
                    match$3 = [
                      _class[0],
                      {
                        TAG: "Declaration",
                        _0: _class
                      }
                    ];
                  } else {
                    let expr = Curry._1(Parse.assignment, env$1);
                    let loc = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
                    let end_loc = loc !== undefined ? loc : expr[0];
                    semicolon(env$1);
                    match$3 = [
                      end_loc,
                      {
                        TAG: "Expression",
                        _0: expr
                      }
                    ];
                  }
                }
                return [
                        btwn(start_loc, match$3[0]),
                        {
                          TAG: "ExportDeclaration",
                          _0: {
                            default: true,
                            declaration: match$3[1],
                            specifiers: undefined,
                            source: undefined,
                            exportKind: "ExportValue"
                          }
                        }
                      ];
            case "T_INTERFACE" :
                if (!env$1.parse_options.types) {
                  error(env$1, "UnexpectedTypeExport");
                }
                let $$interface$1 = $$interface(env$1);
                let match$4 = $$interface$1[1];
                if (typeof match$4 !== "object") {
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "Internal Flow Error! Parsed `export interface` into something other than an interface declaration!",
                        Error: new Error()
                      };
                }
                if (match$4.TAG === "InterfaceDeclaration") {
                  record_export(env$1, [
                        $$interface$1[0],
                        extract_ident_name(match$4._0.id)
                      ]);
                } else {
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "Internal Flow Error! Parsed `export interface` into something other than an interface declaration!",
                        Error: new Error()
                      };
                }
                let end_loc$1 = $$interface$1[0];
                return [
                        btwn(start_loc, end_loc$1),
                        {
                          TAG: "ExportDeclaration",
                          _0: {
                            default: false,
                            declaration: {
                              TAG: "Declaration",
                              _0: $$interface$1
                            },
                            specifiers: undefined,
                            source: undefined,
                            exportKind: "ExportType"
                          }
                        }
                      ];
            case "T_TYPE" :
                if (Curry._2(Parser_env_Peek.token, 1, env$1) !== "T_LCURLY") {
                  if (!env$1.parse_options.types) {
                    error(env$1, "UnexpectedTypeExport");
                  }
                  let type_alias$1 = type_alias(env$1);
                  let match$5 = type_alias$1[1];
                  if (typeof match$5 !== "object") {
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Internal Flow Error! Parsed `export type` into something other than a type alias!",
                          Error: new Error()
                        };
                  }
                  if (match$5.TAG === "TypeAlias") {
                    record_export(env$1, [
                          type_alias$1[0],
                          extract_ident_name(match$5._0.id)
                        ]);
                  } else {
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Internal Flow Error! Parsed `export type` into something other than a type alias!",
                          Error: new Error()
                        };
                  }
                  let end_loc$2 = type_alias$1[0];
                  return [
                          btwn(start_loc, end_loc$2),
                          {
                            TAG: "ExportDeclaration",
                            _0: {
                              default: false,
                              declaration: {
                                TAG: "Declaration",
                                _0: type_alias$1
                              },
                              specifiers: undefined,
                              source: undefined,
                              exportKind: "ExportType"
                            }
                          }
                        ];
                }
                exit = 1;
                break;
            case "T_AT" :
            case "T_FUNCTION" :
            case "T_VAR" :
            case "T_CONST" :
            case "T_LET" :
            case "T_CLASS" :
            case "T_ASYNC" :
                exit = 2;
                break;
            case "T_MULT" :
                let loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env$1);
                token$4(env$1, "T_MULT");
                let parse_export_star_as = env$1.parse_options.esproposal_export_star_as;
                let local_name = Curry._2(Parser_env_Peek.value, undefined, env$1) === "as" ? (contextual(env$1, "as"), parse_export_star_as ? Curry._2(Parse.identifier, undefined, env$1) : (error(env$1, "UnexpectedTypeDeclaration"), undefined)) : undefined;
                let specifiers = {
                  TAG: "ExportBatchSpecifier",
                  _0: loc$1,
                  _1: local_name
                };
                let source$1 = export_source(env$1);
                let loc$2 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
                let end_loc$3 = loc$2 !== undefined ? loc$2 : source$1[0];
                let source$2 = source$1;
                semicolon(env$1);
                return [
                        btwn(start_loc, end_loc$3),
                        {
                          TAG: "ExportDeclaration",
                          _0: {
                            default: false,
                            declaration: undefined,
                            specifiers: specifiers,
                            source: source$2,
                            exportKind: "ExportValue"
                          }
                        }
                      ];
            default:
              exit = 1;
          }
        } else {
          exit = 1;
        }
        switch (exit) {
          case 1 :
              let match$6 = Curry._2(Parser_env_Peek.token, undefined, env$1);
              let exportKind;
              if (typeof match$6 !== "object" && match$6 === "T_TYPE") {
                token$3(env$1);
                exportKind = "ExportType";
              } else {
                exportKind = "ExportValue";
              }
              token$4(env$1, "T_LCURLY");
              let match$7 = export_specifiers_and_errs(env$1, /* [] */0, /* [] */0);
              let specifiers$1 = {
                TAG: "ExportSpecifiers",
                _0: match$7[0]
              };
              let end_loc$4 = Curry._2(Parser_env_Peek.loc, undefined, env$1);
              token$4(env$1, "T_RCURLY");
              let source$3 = Curry._2(Parser_env_Peek.value, undefined, env$1) === "from" ? export_source(env$1) : (List.iter((function (param) {
                          return error_at(env$1, param);
                        }), match$7[1]), undefined);
              let loc$3 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$1);
              let end_loc$5 = loc$3 !== undefined ? loc$3 : (
                  source$3 !== undefined ? source$3[0] : end_loc$4
                );
              semicolon(env$1);
              return [
                      btwn(start_loc, end_loc$5),
                      {
                        TAG: "ExportDeclaration",
                        _0: {
                          default: false,
                          declaration: undefined,
                          specifiers: specifiers$1,
                          source: source$3,
                          exportKind: exportKind
                        }
                      }
                    ];
          case 2 :
              let stmt = Curry._2(Parse.statement_list_item, decorators, env$1);
              let match$8 = stmt[1];
              let loc$4 = stmt[0];
              let names;
              if (typeof match$8 !== "object") {
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Internal Flow Error! Unexpected export statement declaration!",
                      Error: new Error()
                    };
              }
              switch (match$8.TAG) {
                case "FunctionDeclaration" :
                    let id = match$8._0.id;
                    if (id !== undefined) {
                      names = {
                        hd: [
                          loc$4,
                          extract_ident_name(id)
                        ],
                        tl: /* [] */0
                      };
                    } else {
                      error_at(env$1, [
                            loc$4,
                            "ExportNamelessFunction"
                          ]);
                      names = /* [] */0;
                    }
                    break;
                case "VariableDeclaration" :
                    names = List.fold_left((function (names, param) {
                            let id = param[1].id;
                            let param$1 = {
                              hd: id,
                              tl: /* [] */0
                            };
                            return List.fold_left(fold, names, param$1);
                          }), /* [] */0, match$8._0.declarations);
                    break;
                case "ClassDeclaration" :
                    let id$1 = match$8._0.id;
                    if (id$1 !== undefined) {
                      names = {
                        hd: [
                          loc$4,
                          extract_ident_name(id$1)
                        ],
                        tl: /* [] */0
                      };
                    } else {
                      error_at(env$1, [
                            loc$4,
                            "ExportNamelessClass"
                          ]);
                      names = /* [] */0;
                    }
                    break;
                default:
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "Internal Flow Error! Unexpected export statement declaration!",
                        Error: new Error()
                      };
              }
              List.iter((function (param) {
                      return record_export(env$1, param);
                    }), names);
              let declaration = {
                TAG: "Declaration",
                _0: stmt
              };
              return [
                      btwn(start_loc, stmt[0]),
                      {
                        TAG: "ExportDeclaration",
                        _0: {
                          default: false,
                          declaration: declaration,
                          specifiers: undefined,
                          source: undefined,
                          exportKind: "ExportValue"
                        }
                      }
                    ];
          
        }
    case "T_IMPORT" :
        error_on_decorators(env)(decorators);
        let env$2 = with_strict(true, env);
        let start_loc$1 = Curry._2(Parser_env_Peek.loc, undefined, env$2);
        token$4(env$2, "T_IMPORT");
        let match$9 = Curry._2(Parser_env_Peek.token, undefined, env$2);
        let match$10;
        if (typeof match$9 !== "object") {
          switch (match$9) {
            case "T_TYPEOF" :
                if (!env$2.parse_options.types) {
                  error(env$2, "UnexpectedTypeImport");
                }
                token$4(env$2, "T_TYPEOF");
                match$10 = [
                  "ImportTypeof",
                  undefined
                ];
                break;
            case "T_TYPE" :
                if (!env$2.parse_options.types) {
                  error(env$2, "UnexpectedTypeImport");
                }
                match$10 = [
                  "ImportType",
                  Curry._2(Parse.identifier, undefined, env$2)
                ];
                break;
            default:
              match$10 = [
                "ImportValue",
                undefined
              ];
          }
        } else {
          match$10 = [
            "ImportValue",
            undefined
          ];
        }
        let type_ident = match$10[1];
        let importKind = match$10[0];
        let match$11 = Curry._2(Parser_env_Peek.token, undefined, env$2);
        let match$12 = Curry._2(Parser_env_Peek.is_identifier, undefined, env$2);
        let exit$2 = 0;
        let exit$3 = 0;
        if (typeof match$11 !== "object") {
          if (match$11 === "T_COMMA") {
            exit$2 = 1;
          } else {
            exit$3 = 2;
          }
        } else if (match$11.TAG === "T_STRING") {
          if (importKind === "ImportValue") {
            let match$13 = match$11._0;
            let octal = match$13[3];
            let raw = match$13[2];
            let value = match$13[1];
            let str_loc = match$13[0];
            if (octal) {
              strict_error(env$2, "StrictOctalLiteral");
            }
            token$4(env$2, {
                  TAG: "T_STRING",
                  _0: [
                    str_loc,
                    value,
                    raw,
                    octal
                  ]
                });
            let value$1 = {
              TAG: "String",
              _0: value
            };
            let source_1 = {
              value: value$1,
              raw: raw
            };
            let source$4 = [
              str_loc,
              source_1
            ];
            let loc$5 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$2);
            let end_loc$6 = loc$5 !== undefined ? loc$5 : str_loc;
            semicolon(env$2);
            return [
                    btwn(start_loc$1, end_loc$6),
                    {
                      TAG: "ImportDeclaration",
                      _0: {
                        importKind: importKind,
                        source: source$4,
                        specifiers: /* [] */0
                      }
                    }
                  ];
          }
          exit$3 = 2;
        } else {
          exit$3 = 2;
        }
        if (exit$3 === 2) {
          if (match$12) {
            exit$2 = 1;
          } else {
            let specifiers$2 = named_or_namespace_specifier(env$2);
            let source$5 = source(env$2);
            let loc$6 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$2);
            let end_loc$7 = loc$6 !== undefined ? loc$6 : source$5[0];
            semicolon(env$2);
            return [
                    btwn(start_loc$1, end_loc$7),
                    {
                      TAG: "ImportDeclaration",
                      _0: {
                        importKind: importKind,
                        source: source$5,
                        specifiers: specifiers$2
                      }
                    }
                  ];
          }
        }
        if (exit$2 === 1) {
          let match$14 = Curry._2(Parser_env_Peek.token, undefined, env$2);
          let match$15 = Curry._2(Parser_env_Peek.value, undefined, env$2);
          let match$16;
          let exit$4 = 0;
          if (type_ident !== undefined && typeof match$14 !== "object") {
            switch (match$14) {
              case "T_IDENTIFIER" :
                  if (match$15 === "from") {
                    match$16 = [
                      "ImportValue",
                      {
                        TAG: "ImportDefaultSpecifier",
                        _0: type_ident
                      }
                    ];
                  } else {
                    exit$4 = 2;
                  }
                  break;
              case "T_COMMA" :
                  match$16 = [
                    "ImportValue",
                    {
                      TAG: "ImportDefaultSpecifier",
                      _0: type_ident
                    }
                  ];
                  break;
              default:
                exit$4 = 2;
            }
          } else {
            exit$4 = 2;
          }
          if (exit$4 === 2) {
            match$16 = [
              importKind,
              {
                TAG: "ImportDefaultSpecifier",
                _0: Curry._2(Parse.identifier, undefined, env$2)
              }
            ];
          }
          let match$17 = Curry._2(Parser_env_Peek.token, undefined, env$2);
          let additional_specifiers;
          if (typeof match$17 !== "object" && match$17 === "T_COMMA") {
            token$4(env$2, "T_COMMA");
            additional_specifiers = named_or_namespace_specifier(env$2);
          } else {
            additional_specifiers = /* [] */0;
          }
          let source$6 = source(env$2);
          let loc$7 = Curry._2(Parser_env_Peek.semicolon_loc, undefined, env$2);
          let end_loc$8 = loc$7 !== undefined ? loc$7 : source$6[0];
          semicolon(env$2);
          return [
                  btwn(start_loc$1, end_loc$8),
                  {
                    TAG: "ImportDeclaration",
                    _0: {
                      importKind: match$16[0],
                      source: source$6,
                      specifiers: {
                        hd: match$16[1],
                        tl: additional_specifiers
                      }
                    }
                  }
                ];
        }
        case "T_DECLARE" :
        if (Curry._2(Parser_env_Peek.token, 1, env) === "T_EXPORT") {
          error_on_decorators(env)(decorators);
          return declare_export_declaration(undefined, env);
        } else {
          return statement_list_item(decorators, env);
        }
    default:
      return statement_list_item(decorators, env);
  }
}

function statement_list(term_fn, env) {
  let _acc = /* [] */0;
  while(true) {
    let acc = _acc;
    let t = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof t !== "object" && t === "T_EOF") {
      return List.rev(acc);
    }
    if (Curry._1(term_fn, t)) {
      return List.rev(acc);
    }
    _acc = {
      hd: statement_list_item(undefined, env),
      tl: acc
    };
    continue ;
  };
}

function statement_list$1(_env, term_fn, item_fn, _param) {
  while(true) {
    let param = _param;
    let env = _env;
    let stmts = param[1];
    let string_tokens = param[0];
    let t = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof t !== "object" && t === "T_EOF") {
      return [
              env,
              string_tokens,
              stmts
            ];
    }
    if (Curry._1(term_fn, t)) {
      return [
              env,
              string_tokens,
              stmts
            ];
    }
    let string_token_0 = Curry._2(Parser_env_Peek.loc, undefined, env);
    let string_token_1 = Curry._2(Parser_env_Peek.token, undefined, env);
    let string_token = [
      string_token_0,
      string_token_1
    ];
    let possible_directive = Curry._1(item_fn, env);
    let stmts$1 = {
      hd: possible_directive,
      tl: stmts
    };
    let match = possible_directive[1];
    if (typeof match !== "object") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    if (match.TAG !== "Expression") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    let match$1 = match._0.expression;
    let match$2 = match$1[1];
    if (typeof match$2 !== "object") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    if (match$2.TAG !== "Literal") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    let str = match$2._0.value;
    if (typeof str !== "object") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    if (str.TAG !== "String") {
      return [
              env,
              string_tokens,
              stmts$1
            ];
    }
    let loc = match$1[0];
    let len = loc._end.column - loc.start.column | 0;
    let strict = env.in_strict_mode || str._0 === "use strict" && len === 12;
    let string_tokens$1 = {
      hd: string_token,
      tl: string_tokens
    };
    _param = [
      string_tokens$1,
      stmts$1
    ];
    _env = with_strict(strict, env);
    continue ;
  };
}

function directives(env, term_fn, item_fn) {
  let match = statement_list$1(env, term_fn, item_fn, [
        /* [] */0,
        /* [] */0
      ]);
  let env$1 = match[0];
  List.iter((function (param) {
          let token = param[1];
          if (typeof token === "object" && token.TAG === "T_STRING") {
            if (token._0[3]) {
              return strict_error_at(env$1, [
                          param[0],
                          "StrictOctalLiteral"
                        ]);
            } else {
              return ;
            }
          }
          let s = "Nooo: " + (token_to_string(token) + "\n");
          throw {
                RE_EXN_ID: "Failure",
                _1: s,
                Error: new Error()
              };
        }), List.rev(match[1]));
  return [
          env$1,
          match[2]
        ];
}

let class_declaration$1 = class_declaration;

function module_body(term_fn, env) {
  let _acc = /* [] */0;
  while(true) {
    let acc = _acc;
    let t = Curry._2(Parser_env_Peek.token, undefined, env);
    if (typeof t !== "object" && t === "T_EOF") {
      return List.rev(acc);
    }
    if (Curry._1(term_fn, t)) {
      return List.rev(acc);
    }
    _acc = {
      hd: module_item(env),
      tl: acc
    };
    continue ;
  };
}

function identifier$2(restricted_error, env) {
  let loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  let name = Curry._2(Parser_env_Peek.value, undefined, env);
  let t = Curry._2(Parser_env_Peek.token, undefined, env);
  let exit = 0;
  if (typeof t !== "object" && t === "T_LET") {
    if (env.in_strict_mode) {
      strict_error(env, "StrictReservedWord");
    } else if (env.no_let) {
      error(env, {
            TAG: "UnexpectedToken",
            _0: name
          });
    }
    token$3(env);
  } else {
    exit = 1;
  }
  if (exit === 1) {
    if (is_strict_reserved(name)) {
      strict_error(env, "StrictReservedWord");
      token$3(env);
    } else if (typeof t !== "object") {
      switch (t) {
        case "T_DECLARE" :
        case "T_TYPE" :
        case "T_OF" :
        case "T_ASYNC" :
        case "T_AWAIT" :
            token$4(env, t);
            break;
        default:
          token$4(env, "T_IDENTIFIER");
      }
    } else {
      token$4(env, "T_IDENTIFIER");
    }
  }
  if (restricted_error !== undefined && is_restricted(name)) {
    strict_error_at(env, [
          loc,
          restricted_error
        ]);
  }
  return [
          loc,
          {
            name: name,
            typeAnnotation: undefined,
            optional: false
          }
        ];
}

function module_body_with_directives(env, term_fn) {
  let match = Curry._3(directives, env, term_fn, module_item);
  let stmts = Curry._2(module_body, term_fn, match[0]);
  return List.fold_left((function (acc, stmt) {
                return {
                        hd: stmt,
                        tl: acc
                      };
              }), stmts, match[1]);
}

function statement_list_with_directives(term_fn, env) {
  let match = Curry._3(directives, env, term_fn, (function (eta) {
          return statement_list_item(undefined, eta);
        }));
  let env$1 = match[0];
  let stmts = Curry._2(statement_list, term_fn, env$1);
  let stmts$1 = List.fold_left((function (acc, stmt) {
          return {
                  hd: stmt,
                  tl: acc
                };
        }), stmts, match[1]);
  return [
          stmts$1,
          env$1.in_strict_mode
        ];
}

function program(env) {
  let stmts = module_body_with_directives(env, (function (param) {
          return false;
        }));
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_EOF");
  let loc = stmts ? btwn(List.hd(stmts)[0], List.hd(List.rev(stmts))[0]) : end_loc;
  let comments = List.rev(env.comments.contents);
  return [
          loc,
          stmts,
          comments
        ];
}

function expression$1(env) {
  let expr = Curry._1(assignment, env);
  let match = Curry._2(Parser_env_Peek.token, undefined, env);
  if (typeof match !== "object" && match === "T_COMMA") {
    return sequence(env, {
                hd: expr,
                tl: /* [] */0
              });
  } else {
    return expr;
  }
}

function identifier_with_type(env, restricted_error) {
  let match = identifier$2(restricted_error, env);
  let id = match[1];
  let loc = match[0];
  let match$1;
  if (Curry._2(Parser_env_Peek.token, undefined, env) === "T_PLING") {
    if (!env.parse_options.types) {
      error(env, "UnexpectedTypeAnnotation");
    }
    let loc$1 = btwn(loc, Curry._2(Parser_env_Peek.loc, undefined, env));
    token$4(env, "T_PLING");
    match$1 = [
      loc$1,
      {
        name: id.name,
        typeAnnotation: id.typeAnnotation,
        optional: true
      }
    ];
  } else {
    match$1 = [
      loc,
      id
    ];
  }
  let id$1 = match$1[1];
  let loc$2 = match$1[0];
  if (Curry._2(Parser_env_Peek.token, undefined, env) !== "T_COLON") {
    return [
            loc$2,
            id$1
          ];
  }
  let typeAnnotation = wrap(annotation, env);
  let loc$3 = btwn(loc$2, typeAnnotation[0]);
  let typeAnnotation$1 = typeAnnotation;
  return [
          loc$3,
          {
            name: id$1.name,
            typeAnnotation: typeAnnotation$1,
            optional: id$1.optional
          }
        ];
}

function block_body(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let term_fn = function (t) {
    return t === "T_RCURLY";
  };
  let body = Curry._2(statement_list, term_fn, env);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  return [
          btwn(start_loc, end_loc),
          {
            body: body
          }
        ];
}

function function_block_body(env) {
  let start_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_LCURLY");
  let term_fn = function (t) {
    return t === "T_RCURLY";
  };
  let match = statement_list_with_directives(term_fn, env);
  let end_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RCURLY");
  return [
          btwn(start_loc, end_loc),
          {
            body: match[0]
          },
          match[1]
        ];
}

function predicate(env) {
  let checks_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  if (!(Curry._2(Parser_env_Peek.token, undefined, env) === "T_IDENTIFIER" && Curry._2(Parser_env_Peek.value, undefined, env) === "checks")) {
    return ;
  }
  token$4(env, "T_IDENTIFIER");
  if (!maybe(env, "T_LPAREN")) {
    return [
            checks_loc,
            "Inferred"
          ];
  }
  let exp = Curry._1(Parse.expression, env);
  let rparen_loc = Curry._2(Parser_env_Peek.loc, undefined, env);
  token$4(env, "T_RPAREN");
  let loc = btwn(checks_loc, rparen_loc);
  return [
          loc,
          {
            TAG: "Declared",
            _0: exp
          }
        ];
}

Caml_module.update_mod({
      TAG: "Module",
      _0: [
        [
          "Function",
          "program"
        ],
        [
          "Function",
          "statement"
        ],
        [
          "Function",
          "statement_list_item"
        ],
        [
          "Function",
          "statement_list"
        ],
        [
          "Function",
          "statement_list_with_directives"
        ],
        [
          "Function",
          "module_body"
        ],
        [
          "Function",
          "expression"
        ],
        [
          "Function",
          "assignment"
        ],
        [
          "Function",
          "object_initializer"
        ],
        [
          "Function",
          "array_initializer"
        ],
        [
          "Function",
          "identifier"
        ],
        [
          "Function",
          "identifier_or_reserved_keyword"
        ],
        [
          "Function",
          "identifier_with_type"
        ],
        [
          "Function",
          "block_body"
        ],
        [
          "Function",
          "function_block_body"
        ],
        [
          "Function",
          "jsx_element"
        ],
        [
          "Function",
          "pattern"
        ],
        [
          "Function",
          "pattern_from_expr"
        ],
        [
          "Function",
          "object_key"
        ],
        [
          "Function",
          "class_declaration"
        ],
        [
          "Function",
          "class_expression"
        ],
        [
          "Function",
          "is_assignable_lhs"
        ],
        [
          "Function",
          "predicate"
        ]
      ]
    }, Parse, {
      program: program,
      statement: statement,
      statement_list_item: statement_list_item,
      statement_list: statement_list,
      statement_list_with_directives: statement_list_with_directives,
      module_body: module_body,
      expression: expression$1,
      assignment: assignment,
      object_initializer: _initializer,
      array_initializer: array_initializer,
      identifier: identifier$2,
      identifier_or_reserved_keyword: identifier_or_reserved_keyword,
      identifier_with_type: identifier_with_type,
      block_body: block_body,
      function_block_body: function_block_body,
      jsx_element: element,
      pattern: pattern$1,
      pattern_from_expr: from_expr,
      object_key: key,
      class_declaration: class_declaration$1,
      class_expression: class_expression,
      is_assignable_lhs: is_assignable_lhs,
      predicate: predicate
    });

function program$1(failOpt, token_sinkOpt, parse_optionsOpt, content) {
  let fail = failOpt !== undefined ? failOpt : true;
  let token_sink = token_sinkOpt !== undefined ? Caml_option.valFromOption(token_sinkOpt) : undefined;
  let parse_options = parse_optionsOpt !== undefined ? Caml_option.valFromOption(parse_optionsOpt) : undefined;
  let token_sinkOpt$1 = Caml_option.some(token_sink);
  let parse_optionsOpt$1 = Caml_option.some(parse_options);
  let filename;
  let token_sink$1 = token_sinkOpt$1 !== undefined ? Caml_option.valFromOption(token_sinkOpt$1) : undefined;
  let parse_options$1 = parse_optionsOpt$1 !== undefined ? Caml_option.valFromOption(parse_optionsOpt$1) : undefined;
  let env = init_env(Caml_option.some(token_sink$1), Caml_option.some(parse_options$1), filename, content);
  let parser = Parse.program;
  let ast = Curry._1(parser, env);
  let error_list = filter_duplicate_errors(env.errors.contents);
  if (fail && error_list !== /* [] */0) {
    throw {
          RE_EXN_ID: $$Error,
          _1: error_list,
          Error: new Error()
        };
  }
  return [
          ast,
          error_list
        ];
}

let translation_errors = {
  contents: /* [] */0
};

let string = (function (x) {return x;});

let bool = (function (x) {x ? 1 : 0;});

let obj = (function(arr) {var ret = {}; arr.forEach(function(a) {ret[a[0]]=a[1];}); return ret});

let array = (function (x) {return x;});

let number$1 = (function (x) {return x;});

let $$null = null;

function regexp$1(loc, pattern, flags) {
  try {
    return new RegExp(pattern, flags);
  }
  catch (exn){
    translation_errors.contents = {
      hd: [
        loc,
        "InvalidRegExp"
      ],
      tl: translation_errors.contents
    };
    return new RegExp("", flags);
  }
}

function parse(content, options) {
  try {
    let match = program$1(false, undefined, Caml_option.some(undefined), content);
    translation_errors.contents = /* [] */0;
    let array_of_list = function (fn, list) {
      return array($$Array.of_list(List.map(fn, list)));
    };
    let option = function (f, v) {
      if (v !== undefined) {
        return Curry._1(f, Caml_option.valFromOption(v));
      } else {
        return $$null;
      }
    };
    let position = function (p) {
      return obj([
                  [
                    "line",
                    number$1(p.line)
                  ],
                  [
                    "column",
                    number$1(p.column)
                  ]
                ]);
    };
    let loc = function ($$location) {
      let match = $$location.source;
      let source = match !== undefined ? (
          typeof match !== "object" ? string("(global)") : string(match._0)
        ) : $$null;
      return obj([
                  [
                    "source",
                    source
                  ],
                  [
                    "start",
                    position($$location.start)
                  ],
                  [
                    "end",
                    position($$location._end)
                  ]
                ]);
    };
    let range = function ($$location) {
      return array([
                  number$1($$location.start.offset),
                  number$1($$location._end.offset)
                ]);
    };
    let node = function (_type, $$location, props) {
      return obj($$Array.append([
                      [
                        "type",
                        string(_type)
                      ],
                      [
                        "loc",
                        loc($$location)
                      ],
                      [
                        "range",
                        range($$location)
                      ]
                    ], props));
    };
    let errors = function (l) {
      let error = function (param) {
        return obj([
                    [
                      "loc",
                      loc(param[0])
                    ],
                    [
                      "message",
                      string(String(param[1]))
                    ]
                  ]);
      };
      return array_of_list(error, l);
    };
    let _type = function (param) {
      let t = param[1];
      let loc = param[0];
      if (typeof t !== "object") {
        switch (t) {
          case "Any" :
              return node("AnyTypeAnnotation", loc, []);
          case "Void" :
              return node("VoidTypeAnnotation", loc, []);
          case "Null" :
              return node("NullTypeAnnotation", loc, []);
          case "Number" :
              return node("NumberTypeAnnotation", loc, []);
          case "String" :
              return node("StringTypeAnnotation", loc, []);
          case "Boolean" :
              return node("BooleanTypeAnnotation", loc, []);
          case "Exists" :
              return node("ExistsTypeAnnotation", loc, []);
          
        }
      } else {
        switch (t.TAG) {
          case "Nullable" :
              let t$1 = t._0;
              return node("NullableTypeAnnotation", loc, [[
                            "typeAnnotation",
                            _type(t$1)
                          ]]);
          case "Function" :
              return function_type([
                          loc,
                          t._0
                        ]);
          case "Object" :
              return object_type([
                          loc,
                          t._0
                        ]);
          case "Array" :
              let t$2 = t._0;
              return node("ArrayTypeAnnotation", loc, [[
                            "elementType",
                            _type(t$2)
                          ]]);
          case "Generic" :
              let param$1 = [
                loc,
                t._0
              ];
              let g = param$1[1];
              let id = g.id;
              let id$1;
              id$1 = id.TAG === "Unqualified" ? identifier(id._0) : generic_type_qualified_identifier(id._0);
              return node("GenericTypeAnnotation", param$1[0], [
                          [
                            "id",
                            id$1
                          ],
                          [
                            "typeParameters",
                            option(type_parameter_instantiation, g.typeParameters)
                          ]
                        ]);
          case "Union" :
              let param$2 = [
                loc,
                t._0
              ];
              return node("UnionTypeAnnotation", param$2[0], [[
                            "types",
                            array_of_list(_type, param$2[1])
                          ]]);
          case "Intersection" :
              let param$3 = [
                loc,
                t._0
              ];
              return node("IntersectionTypeAnnotation", param$3[0], [[
                            "types",
                            array_of_list(_type, param$3[1])
                          ]]);
          case "Typeof" :
              let param$4 = [
                loc,
                t._0
              ];
              return node("TypeofTypeAnnotation", param$4[0], [[
                            "argument",
                            _type(param$4[1])
                          ]]);
          case "Tuple" :
              let param$5 = [
                loc,
                t._0
              ];
              return node("TupleTypeAnnotation", param$5[0], [[
                            "types",
                            array_of_list(_type, param$5[1])
                          ]]);
          case "StringLiteral" :
              let param$6 = [
                loc,
                t._0
              ];
              let s = param$6[1];
              return node("StringLiteralTypeAnnotation", param$6[0], [
                          [
                            "value",
                            string(s.value)
                          ],
                          [
                            "raw",
                            string(s.raw)
                          ]
                        ]);
          case "NumberLiteral" :
              let param$7 = [
                loc,
                t._0
              ];
              let s$1 = param$7[1];
              return node("NumberLiteralTypeAnnotation", param$7[0], [
                          [
                            "value",
                            number$1(s$1.value)
                          ],
                          [
                            "raw",
                            string(s$1.raw)
                          ]
                        ]);
          case "BooleanLiteral" :
              let param$8 = [
                loc,
                t._0
              ];
              let s$2 = param$8[1];
              return node("BooleanLiteralTypeAnnotation", param$8[0], [
                          [
                            "value",
                            bool(s$2.value)
                          ],
                          [
                            "raw",
                            string(s$2.raw)
                          ]
                        ]);
          
        }
      }
    };
    let expression = function (param) {
      let arr = param[1];
      let loc = param[0];
      if (typeof arr !== "object") {
        return node("ThisExpression", loc, []);
      }
      switch (arr.TAG) {
        case "Array" :
            return node("ArrayExpression", loc, [[
                          "elements",
                          array_of_list((function (param) {
                                  return option(expression_or_spread, param);
                                }), arr._0.elements)
                        ]]);
        case "Object" :
            return node("ObjectExpression", loc, [[
                          "properties",
                          array_of_list(object_property, arr._0.properties)
                        ]]);
        case "Function" :
            return function_expression([
                        loc,
                        arr._0
                      ]);
        case "ArrowFunction" :
            let arrow = arr._0;
            let b = arrow.body;
            let body;
            body = b.TAG === "BodyBlock" ? block(b._0) : expression(b._0);
            return node("ArrowFunctionExpression", loc, [
                        [
                          "id",
                          option(identifier, arrow.id)
                        ],
                        [
                          "params",
                          array_of_list(pattern, arrow.params)
                        ],
                        [
                          "defaults",
                          array_of_list((function (param) {
                                  return option(expression, param);
                                }), arrow.defaults)
                        ],
                        [
                          "rest",
                          option(identifier, arrow.rest)
                        ],
                        [
                          "body",
                          body
                        ],
                        [
                          "async",
                          bool(arrow.async)
                        ],
                        [
                          "generator",
                          bool(arrow.generator)
                        ],
                        [
                          "expression",
                          bool(arrow.expression)
                        ],
                        [
                          "returnType",
                          option(type_annotation, arrow.returnType)
                        ],
                        [
                          "typeParameters",
                          option(type_parameter_declaration, arrow.typeParameters)
                        ]
                      ]);
        case "Sequence" :
            return node("SequenceExpression", loc, [[
                          "expressions",
                          array_of_list(expression, arr._0.expressions)
                        ]]);
        case "Unary" :
            let unary = arr._0;
            let match = unary.operator;
            if (match === "Await") {
              return node("AwaitExpression", loc, [[
                            "argument",
                            expression(unary.argument)
                          ]]);
            }
            let match$1 = unary.operator;
            let operator;
            switch (match$1) {
              case "Minus" :
                  operator = "-";
                  break;
              case "Plus" :
                  operator = "+";
                  break;
              case "Not" :
                  operator = "!";
                  break;
              case "BitNot" :
                  operator = "~";
                  break;
              case "Typeof" :
                  operator = "typeof";
                  break;
              case "Void" :
                  operator = "void";
                  break;
              case "Delete" :
                  operator = "delete";
                  break;
              case "Await" :
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "matched above",
                        Error: new Error()
                      };
              
            }
            return node("UnaryExpression", loc, [
                        [
                          "operator",
                          string(operator)
                        ],
                        [
                          "prefix",
                          bool(unary.prefix)
                        ],
                        [
                          "argument",
                          expression(unary.argument)
                        ]
                      ]);
        case "Binary" :
            let binary = arr._0;
            let match$2 = binary.operator;
            let operator$1;
            switch (match$2) {
              case "Equal" :
                  operator$1 = "==";
                  break;
              case "NotEqual" :
                  operator$1 = "!=";
                  break;
              case "StrictEqual" :
                  operator$1 = "===";
                  break;
              case "StrictNotEqual" :
                  operator$1 = "!==";
                  break;
              case "LessThan" :
                  operator$1 = "<";
                  break;
              case "LessThanEqual" :
                  operator$1 = "<=";
                  break;
              case "GreaterThan" :
                  operator$1 = ">";
                  break;
              case "GreaterThanEqual" :
                  operator$1 = ">=";
                  break;
              case "LShift" :
                  operator$1 = "<<";
                  break;
              case "RShift" :
                  operator$1 = ">>";
                  break;
              case "RShift3" :
                  operator$1 = ">>>";
                  break;
              case "Plus" :
                  operator$1 = "+";
                  break;
              case "Minus" :
                  operator$1 = "-";
                  break;
              case "Mult" :
                  operator$1 = "*";
                  break;
              case "Exp" :
                  operator$1 = "**";
                  break;
              case "Div" :
                  operator$1 = "/";
                  break;
              case "Mod" :
                  operator$1 = "%";
                  break;
              case "BitOr" :
                  operator$1 = "|";
                  break;
              case "Xor" :
                  operator$1 = "^";
                  break;
              case "BitAnd" :
                  operator$1 = "&";
                  break;
              case "In" :
                  operator$1 = "in";
                  break;
              case "Instanceof" :
                  operator$1 = "instanceof";
                  break;
              
            }
            return node("BinaryExpression", loc, [
                        [
                          "operator",
                          string(operator$1)
                        ],
                        [
                          "left",
                          expression(binary.left)
                        ],
                        [
                          "right",
                          expression(binary.right)
                        ]
                      ]);
        case "Assignment" :
            let assignment = arr._0;
            let match$3 = assignment.operator;
            let operator$2;
            switch (match$3) {
              case "Assign" :
                  operator$2 = "=";
                  break;
              case "PlusAssign" :
                  operator$2 = "+=";
                  break;
              case "MinusAssign" :
                  operator$2 = "-=";
                  break;
              case "MultAssign" :
                  operator$2 = "*=";
                  break;
              case "ExpAssign" :
                  operator$2 = "**=";
                  break;
              case "DivAssign" :
                  operator$2 = "/=";
                  break;
              case "ModAssign" :
                  operator$2 = "%=";
                  break;
              case "LShiftAssign" :
                  operator$2 = "<<=";
                  break;
              case "RShiftAssign" :
                  operator$2 = ">>=";
                  break;
              case "RShift3Assign" :
                  operator$2 = ">>>=";
                  break;
              case "BitOrAssign" :
                  operator$2 = "|=";
                  break;
              case "BitXorAssign" :
                  operator$2 = "^=";
                  break;
              case "BitAndAssign" :
                  operator$2 = "&=";
                  break;
              
            }
            return node("AssignmentExpression", loc, [
                        [
                          "operator",
                          string(operator$2)
                        ],
                        [
                          "left",
                          pattern(assignment.left)
                        ],
                        [
                          "right",
                          expression(assignment.right)
                        ]
                      ]);
        case "Update" :
            let update = arr._0;
            let match$4 = update.operator;
            let operator$3;
            operator$3 = match$4 === "Increment" ? "++" : "--";
            return node("UpdateExpression", loc, [
                        [
                          "operator",
                          string(operator$3)
                        ],
                        [
                          "argument",
                          expression(update.argument)
                        ],
                        [
                          "prefix",
                          bool(update.prefix)
                        ]
                      ]);
        case "Logical" :
            let logical = arr._0;
            let match$5 = logical.operator;
            let operator$4;
            operator$4 = match$5 === "Or" ? "||" : "&&";
            return node("LogicalExpression", loc, [
                        [
                          "operator",
                          string(operator$4)
                        ],
                        [
                          "left",
                          expression(logical.left)
                        ],
                        [
                          "right",
                          expression(logical.right)
                        ]
                      ]);
        case "Conditional" :
            let conditional = arr._0;
            return node("ConditionalExpression", loc, [
                        [
                          "test",
                          expression(conditional.test)
                        ],
                        [
                          "consequent",
                          expression(conditional.consequent)
                        ],
                        [
                          "alternate",
                          expression(conditional.alternate)
                        ]
                      ]);
        case "New" :
            let _new = arr._0;
            return node("NewExpression", loc, [
                        [
                          "callee",
                          expression(_new.callee)
                        ],
                        [
                          "arguments",
                          array_of_list(expression_or_spread, _new.arguments)
                        ]
                      ]);
        case "Call" :
            let call = arr._0;
            return node("CallExpression", loc, [
                        [
                          "callee",
                          expression(call.callee)
                        ],
                        [
                          "arguments",
                          array_of_list(expression_or_spread, call.arguments)
                        ]
                      ]);
        case "Member" :
            let member = arr._0;
            let id = member.property;
            let property;
            property = id.TAG === "PropertyIdentifier" ? identifier(id._0) : expression(id._0);
            return node("MemberExpression", loc, [
                        [
                          "object",
                          expression(member._object)
                        ],
                        [
                          "property",
                          property
                        ],
                        [
                          "computed",
                          bool(member.computed)
                        ]
                      ]);
        case "Yield" :
            let $$yield = arr._0;
            return node("YieldExpression", loc, [
                        [
                          "argument",
                          option(expression, $$yield.argument)
                        ],
                        [
                          "delegate",
                          bool($$yield.delegate)
                        ]
                      ]);
        case "Comprehension" :
            let comp = arr._0;
            return node("ComprehensionExpression", loc, [
                        [
                          "blocks",
                          array_of_list(comprehension_block, comp.blocks)
                        ],
                        [
                          "filter",
                          option(expression, comp.filter)
                        ]
                      ]);
        case "Generator" :
            let gen = arr._0;
            return node("GeneratorExpression", loc, [
                        [
                          "blocks",
                          array_of_list(comprehension_block, gen.blocks)
                        ],
                        [
                          "filter",
                          option(expression, gen.filter)
                        ]
                      ]);
        case "Let" :
            let _let = arr._0;
            return node("LetExpression", loc, [
                        [
                          "head",
                          array_of_list(let_assignment, _let.head)
                        ],
                        [
                          "body",
                          expression(_let.body)
                        ]
                      ]);
        case "Identifier" :
            return identifier(arr._0);
        case "Literal" :
            return literal([
                        loc,
                        arr._0
                      ]);
        case "TemplateLiteral" :
            return template_literal([
                        loc,
                        arr._0
                      ]);
        case "TaggedTemplate" :
            let param$1 = [
              loc,
              arr._0
            ];
            let tagged = param$1[1];
            return node("TaggedTemplateExpression", param$1[0], [
                        [
                          "tag",
                          expression(tagged.tag)
                        ],
                        [
                          "quasi",
                          template_literal(tagged.quasi)
                        ]
                      ]);
        case "JSXElement" :
            return jsx_element([
                        loc,
                        arr._0
                      ]);
        case "Class" :
            let param$2 = [
              loc,
              arr._0
            ];
            let c = param$2[1];
            return node("ClassExpression", param$2[0], [
                        [
                          "id",
                          option(identifier, c.id)
                        ],
                        [
                          "body",
                          class_body(c.body)
                        ],
                        [
                          "superClass",
                          option(expression, c.superClass)
                        ],
                        [
                          "typeParameters",
                          option(type_parameter_declaration, c.typeParameters)
                        ],
                        [
                          "superTypeParameters",
                          option(type_parameter_instantiation, c.superTypeParameters)
                        ],
                        [
                          "implements",
                          array_of_list(class_implements, c.implements)
                        ],
                        [
                          "decorators",
                          array_of_list(expression, c.classDecorators)
                        ]
                      ]);
        case "TypeCast" :
            let typecast = arr._0;
            return node("TypeCastExpression", loc, [
                        [
                          "expression",
                          expression(typecast.expression)
                        ],
                        [
                          "typeAnnotation",
                          type_annotation(typecast.typeAnnotation)
                        ]
                      ]);
        
      }
    };
    let identifier = function (param) {
      let id = param[1];
      return node("Identifier", param[0], [
                  [
                    "name",
                    string(id.name)
                  ],
                  [
                    "typeAnnotation",
                    option(type_annotation, id.typeAnnotation)
                  ],
                  [
                    "optional",
                    bool(id.optional)
                  ]
                ]);
    };
    let type_annotation = function (param) {
      return node("TypeAnnotation", param[0], [[
                    "typeAnnotation",
                    _type(param[1])
                  ]]);
    };
    let literal = function (param) {
      let lit = param[1];
      let raw = lit.raw;
      let value = lit.value;
      let loc = param[0];
      let value_;
      if (typeof value !== "object") {
        value_ = $$null;
      } else {
        switch (value.TAG) {
          case "String" :
              value_ = string(value._0);
              break;
          case "Boolean" :
              value_ = bool(value._0);
              break;
          case "Number" :
              value_ = number$1(value._0);
              break;
          case "RegExp" :
              let match = value._0;
              value_ = regexp$1(loc, match.pattern, match.flags);
              break;
          
        }
      }
      let props;
      let exit = 0;
      if (typeof value !== "object" || value.TAG !== "RegExp") {
        exit = 1;
      } else {
        let match$1 = value._0;
        let regex = obj([
              [
                "pattern",
                string(match$1.pattern)
              ],
              [
                "flags",
                string(match$1.flags)
              ]
            ]);
        props = [
          [
            "value",
            value_
          ],
          [
            "raw",
            string(raw)
          ],
          [
            "regex",
            regex
          ]
        ];
      }
      if (exit === 1) {
        props = [
          [
            "value",
            value_
          ],
          [
            "raw",
            string(raw)
          ]
        ];
      }
      return node("Literal", loc, props);
    };
    let pattern = function (param) {
      let obj = param[1];
      let loc = param[0];
      switch (obj.TAG) {
        case "Object" :
            let obj$1 = obj._0;
            return node("ObjectPattern", loc, [
                        [
                          "properties",
                          array_of_list(object_pattern_property, obj$1.properties)
                        ],
                        [
                          "typeAnnotation",
                          option(type_annotation, obj$1.typeAnnotation)
                        ]
                      ]);
        case "Array" :
            let arr = obj._0;
            return node("ArrayPattern", loc, [
                        [
                          "elements",
                          array_of_list((function (param) {
                                  return option(array_pattern_element, param);
                                }), arr.elements)
                        ],
                        [
                          "typeAnnotation",
                          option(type_annotation, arr.typeAnnotation)
                        ]
                      ]);
        case "Assignment" :
            let match = obj._0;
            return node("AssignmentPattern", loc, [
                        [
                          "left",
                          pattern(match.left)
                        ],
                        [
                          "right",
                          expression(match.right)
                        ]
                      ]);
        case "Identifier" :
            return identifier(obj._0);
        case "Expression" :
            return expression(obj._0);
        
      }
    };
    let object_pattern_property = function (param) {
      if (param.TAG === "Property") {
        let match = param._0;
        let prop = match[1];
        let lit = prop.key;
        let match$1;
        switch (lit.TAG) {
          case "Literal" :
              match$1 = [
                literal(lit._0),
                false
              ];
              break;
          case "Identifier" :
              match$1 = [
                identifier(lit._0),
                false
              ];
              break;
          case "Computed" :
              match$1 = [
                expression(lit._0),
                true
              ];
              break;
          
        }
        return node("PropertyPattern", match[0], [
                    [
                      "key",
                      match$1[0]
                    ],
                    [
                      "pattern",
                      pattern(prop.pattern)
                    ],
                    [
                      "computed",
                      bool(match$1[1])
                    ],
                    [
                      "shorthand",
                      bool(prop.shorthand)
                    ]
                  ]);
      }
      let match$2 = param._0;
      return node("SpreadPropertyPattern", match$2[0], [[
                    "argument",
                    pattern(match$2[1].argument)
                  ]]);
    };
    let array_pattern_element = function (p) {
      if (p.TAG === "Element") {
        return pattern(p._0);
      }
      let match = p._0;
      return node("SpreadElementPattern", match[0], [[
                    "argument",
                    pattern(match[1].argument)
                  ]]);
    };
    let object_property = function (param) {
      if (param.TAG === "Property") {
        let match = param._0;
        let prop = match[1];
        let lit = prop.key;
        let match$1;
        switch (lit.TAG) {
          case "Literal" :
              match$1 = [
                literal(lit._0),
                false
              ];
              break;
          case "Identifier" :
              match$1 = [
                identifier(lit._0),
                false
              ];
              break;
          case "Computed" :
              match$1 = [
                expression(lit._0),
                true
              ];
              break;
          
        }
        let match$2 = prop.kind;
        let kind;
        switch (match$2) {
          case "Init" :
              kind = "init";
              break;
          case "Get" :
              kind = "get";
              break;
          case "Set" :
              kind = "set";
              break;
          
        }
        return node("Property", match[0], [
                    [
                      "key",
                      match$1[0]
                    ],
                    [
                      "value",
                      expression(prop.value)
                    ],
                    [
                      "kind",
                      string(kind)
                    ],
                    [
                      "method",
                      bool(prop._method)
                    ],
                    [
                      "shorthand",
                      bool(prop.shorthand)
                    ],
                    [
                      "computed",
                      bool(match$1[1])
                    ]
                  ]);
      }
      let match$3 = param._0;
      return node("SpreadProperty", match$3[0], [[
                    "argument",
                    expression(match$3[1].argument)
                  ]]);
    };
    let let_assignment = function (assignment) {
      return obj([
                  [
                    "id",
                    pattern(assignment.id)
                  ],
                  [
                    "init",
                    option(expression, assignment.init)
                  ]
                ]);
    };
    let expression_or_spread = function (expr) {
      if (expr.TAG === "Expression") {
        return expression(expr._0);
      }
      let match = expr._0;
      return node("SpreadElement", match[0], [[
                    "argument",
                    expression(match[1].argument)
                  ]]);
    };
    let template_literal = function (param) {
      let value = param[1];
      return node("TemplateLiteral", param[0], [
                  [
                    "quasis",
                    array_of_list(template_element, value.quasis)
                  ],
                  [
                    "expressions",
                    array_of_list(expression, value.expressions)
                  ]
                ]);
    };
    let block = function (param) {
      return node("BlockStatement", param[0], [[
                    "body",
                    array_of_list(statement, param[1].body)
                  ]]);
    };
    let function_expression = function (param) {
      let _function = param[1];
      let b = _function.body;
      let body;
      body = b.TAG === "BodyBlock" ? block(b._0) : expression(b._0);
      return node("FunctionExpression", param[0], [
                  [
                    "id",
                    option(identifier, _function.id)
                  ],
                  [
                    "params",
                    array_of_list(pattern, _function.params)
                  ],
                  [
                    "defaults",
                    array_of_list((function (param) {
                            return option(expression, param);
                          }), _function.defaults)
                  ],
                  [
                    "rest",
                    option(identifier, _function.rest)
                  ],
                  [
                    "body",
                    body
                  ],
                  [
                    "async",
                    bool(_function.async)
                  ],
                  [
                    "generator",
                    bool(_function.generator)
                  ],
                  [
                    "expression",
                    bool(_function.expression)
                  ],
                  [
                    "returnType",
                    option(type_annotation, _function.returnType)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_declaration, _function.typeParameters)
                  ]
                ]);
    };
    let jsx_element = function (param) {
      let element = param[1];
      return node("JSXElement", param[0], [
                  [
                    "openingElement",
                    jsx_opening(element.openingElement)
                  ],
                  [
                    "closingElement",
                    option(jsx_closing, element.closingElement)
                  ],
                  [
                    "children",
                    array_of_list(jsx_child, element.children)
                  ]
                ]);
    };
    let comprehension_block = function (param) {
      let b = param[1];
      return node("ComprehensionBlock", param[0], [
                  [
                    "left",
                    pattern(b.left)
                  ],
                  [
                    "right",
                    expression(b.right)
                  ],
                  [
                    "each",
                    bool(b.each)
                  ]
                ]);
    };
    let type_parameter_declaration = function (param) {
      return node("TypeParameterDeclaration", param[0], [[
                    "params",
                    array_of_list(type_param, param[1].params)
                  ]]);
    };
    let variable_declarator = function (param) {
      let declarator = param[1];
      return node("VariableDeclarator", param[0], [
                  [
                    "id",
                    pattern(declarator.id)
                  ],
                  [
                    "init",
                    option(expression, declarator.init)
                  ]
                ]);
    };
    let export_specifier = function (param) {
      let specifier = param[1];
      return node("ExportSpecifier", param[0], [
                  [
                    "id",
                    identifier(specifier.id)
                  ],
                  [
                    "name",
                    option(identifier, specifier.name)
                  ]
                ]);
    };
    let generic_type_qualified_identifier = function (param) {
      let q = param[1];
      let id = q.qualification;
      let qualification;
      qualification = id.TAG === "Unqualified" ? identifier(id._0) : generic_type_qualified_identifier(id._0);
      return node("QualifiedTypeIdentifier", param[0], [
                  [
                    "qualification",
                    qualification
                  ],
                  [
                    "id",
                    identifier(q.id)
                  ]
                ]);
    };
    let type_parameter_instantiation = function (param) {
      return node("TypeParameterInstantiation", param[0], [[
                    "params",
                    array_of_list(_type, param[1].params)
                  ]]);
    };
    let statement = function (param) {
      let b = param[1];
      let loc = param[0];
      if (typeof b !== "object") {
        if (b === "Empty") {
          return node("EmptyStatement", loc, []);
        } else {
          return node("DebuggerStatement", loc, []);
        }
      }
      switch (b.TAG) {
        case "Block" :
            return block([
                        loc,
                        b._0
                      ]);
        case "Expression" :
            return node("ExpressionStatement", loc, [[
                          "expression",
                          expression(b._0.expression)
                        ]]);
        case "If" :
            let _if = b._0;
            return node("IfStatement", loc, [
                        [
                          "test",
                          expression(_if.test)
                        ],
                        [
                          "consequent",
                          statement(_if.consequent)
                        ],
                        [
                          "alternate",
                          option(statement, _if.alternate)
                        ]
                      ]);
        case "Labeled" :
            let labeled = b._0;
            return node("LabeledStatement", loc, [
                        [
                          "label",
                          identifier(labeled.label)
                        ],
                        [
                          "body",
                          statement(labeled.body)
                        ]
                      ]);
        case "Break" :
            return node("BreakStatement", loc, [[
                          "label",
                          option(identifier, b._0.label)
                        ]]);
        case "Continue" :
            return node("ContinueStatement", loc, [[
                          "label",
                          option(identifier, b._0.label)
                        ]]);
        case "With" :
            let _with = b._0;
            return node("WithStatement", loc, [
                        [
                          "object",
                          expression(_with._object)
                        ],
                        [
                          "body",
                          statement(_with.body)
                        ]
                      ]);
        case "TypeAlias" :
            return type_alias([
                        loc,
                        b._0
                      ]);
        case "Switch" :
            let $$switch = b._0;
            return node("SwitchStatement", loc, [
                        [
                          "discriminant",
                          expression($$switch.discriminant)
                        ],
                        [
                          "cases",
                          array_of_list($$case, $$switch.cases)
                        ],
                        [
                          "lexical",
                          bool($$switch.lexical)
                        ]
                      ]);
        case "Return" :
            return node("ReturnStatement", loc, [[
                          "argument",
                          option(expression, b._0.argument)
                        ]]);
        case "Throw" :
            return node("ThrowStatement", loc, [[
                          "argument",
                          expression(b._0.argument)
                        ]]);
        case "Try" :
            let _try = b._0;
            return node("TryStatement", loc, [
                        [
                          "block",
                          block(_try.block)
                        ],
                        [
                          "handler",
                          option($$catch, _try.handler)
                        ],
                        [
                          "guardedHandlers",
                          array_of_list($$catch, _try.guardedHandlers)
                        ],
                        [
                          "finalizer",
                          option(block, _try.finalizer)
                        ]
                      ]);
        case "While" :
            let _while = b._0;
            return node("WhileStatement", loc, [
                        [
                          "test",
                          expression(_while.test)
                        ],
                        [
                          "body",
                          statement(_while.body)
                        ]
                      ]);
        case "DoWhile" :
            let dowhile = b._0;
            return node("DoWhileStatement", loc, [
                        [
                          "body",
                          statement(dowhile.body)
                        ],
                        [
                          "test",
                          expression(dowhile.test)
                        ]
                      ]);
        case "For" :
            let _for = b._0;
            let init = function (init$1) {
              if (init$1.TAG === "InitDeclaration") {
                return variable_declaration(init$1._0);
              } else {
                return expression(init$1._0);
              }
            };
            return node("ForStatement", loc, [
                        [
                          "init",
                          option(init, _for.init)
                        ],
                        [
                          "test",
                          option(expression, _for.test)
                        ],
                        [
                          "update",
                          option(expression, _for.update)
                        ],
                        [
                          "body",
                          statement(_for.body)
                        ]
                      ]);
        case "ForIn" :
            let forin = b._0;
            let left = forin.left;
            let left$1;
            left$1 = left.TAG === "LeftDeclaration" ? variable_declaration(left._0) : expression(left._0);
            return node("ForInStatement", loc, [
                        [
                          "left",
                          left$1
                        ],
                        [
                          "right",
                          expression(forin.right)
                        ],
                        [
                          "body",
                          statement(forin.body)
                        ],
                        [
                          "each",
                          bool(forin.each)
                        ]
                      ]);
        case "ForOf" :
            let forof = b._0;
            let left$2 = forof.left;
            let left$3;
            left$3 = left$2.TAG === "LeftDeclaration" ? variable_declaration(left$2._0) : expression(left$2._0);
            return node("ForOfStatement", loc, [
                        [
                          "left",
                          left$3
                        ],
                        [
                          "right",
                          expression(forof.right)
                        ],
                        [
                          "body",
                          statement(forof.body)
                        ]
                      ]);
        case "Let" :
            let _let = b._0;
            return node("LetStatement", loc, [
                        [
                          "head",
                          array_of_list(let_assignment, _let.head)
                        ],
                        [
                          "body",
                          statement(_let.body)
                        ]
                      ]);
        case "FunctionDeclaration" :
            let fn = b._0;
            let id = fn.id;
            let match = id !== undefined ? [
                "FunctionDeclaration",
                identifier(id)
              ] : [
                "FunctionExpression",
                $$null
              ];
            let b$1 = fn.body;
            let body;
            body = b$1.TAG === "BodyBlock" ? block(b$1._0) : expression(b$1._0);
            return node(match[0], loc, [
                        [
                          "id",
                          match[1]
                        ],
                        [
                          "params",
                          array_of_list(pattern, fn.params)
                        ],
                        [
                          "defaults",
                          array_of_list((function (param) {
                                  return option(expression, param);
                                }), fn.defaults)
                        ],
                        [
                          "rest",
                          option(identifier, fn.rest)
                        ],
                        [
                          "body",
                          body
                        ],
                        [
                          "async",
                          bool(fn.async)
                        ],
                        [
                          "generator",
                          bool(fn.generator)
                        ],
                        [
                          "expression",
                          bool(fn.expression)
                        ],
                        [
                          "returnType",
                          option(type_annotation, fn.returnType)
                        ],
                        [
                          "typeParameters",
                          option(type_parameter_declaration, fn.typeParameters)
                        ]
                      ]);
        case "VariableDeclaration" :
            return variable_declaration([
                        loc,
                        b._0
                      ]);
        case "ClassDeclaration" :
            let param$1 = [
              loc,
              b._0
            ];
            let c = param$1[1];
            let id$1 = c.id;
            let match$1 = id$1 !== undefined ? [
                "ClassDeclaration",
                identifier(id$1)
              ] : [
                "ClassExpression",
                $$null
              ];
            return node(match$1[0], param$1[0], [
                        [
                          "id",
                          match$1[1]
                        ],
                        [
                          "body",
                          class_body(c.body)
                        ],
                        [
                          "superClass",
                          option(expression, c.superClass)
                        ],
                        [
                          "typeParameters",
                          option(type_parameter_declaration, c.typeParameters)
                        ],
                        [
                          "superTypeParameters",
                          option(type_parameter_instantiation, c.superTypeParameters)
                        ],
                        [
                          "implements",
                          array_of_list(class_implements, c.implements)
                        ],
                        [
                          "decorators",
                          array_of_list(expression, c.classDecorators)
                        ]
                      ]);
        case "InterfaceDeclaration" :
            return interface_declaration([
                        loc,
                        b._0
                      ]);
        case "DeclareVariable" :
            return declare_variable([
                        loc,
                        b._0
                      ]);
        case "DeclareFunction" :
            return declare_function([
                        loc,
                        b._0
                      ]);
        case "DeclareClass" :
            return declare_class([
                        loc,
                        b._0
                      ]);
        case "DeclareModule" :
            let m = b._0;
            let lit = m.id;
            let id$2;
            id$2 = lit.TAG === "Identifier" ? identifier(lit._0) : literal(lit._0);
            let match$2 = m.kind;
            let tmp;
            tmp = match$2.TAG === "CommonJS" ? string("CommonJS") : string("ES");
            return node("DeclareModule", loc, [
                        [
                          "id",
                          id$2
                        ],
                        [
                          "body",
                          block(m.body)
                        ],
                        [
                          "kind",
                          tmp
                        ]
                      ]);
        case "DeclareModuleExports" :
            return node("DeclareModuleExports", loc, [[
                          "typeAnnotation",
                          type_annotation(b._0)
                        ]]);
        case "DeclareExportDeclaration" :
            let $$export = b._0;
            let match$3 = $$export.declaration;
            let declaration;
            if (match$3 !== undefined) {
              switch (match$3.TAG) {
                case "Variable" :
                    declaration = declare_variable(match$3._0);
                    break;
                case "Function" :
                    declaration = declare_function(match$3._0);
                    break;
                case "Class" :
                    declaration = declare_class(match$3._0);
                    break;
                case "DefaultType" :
                    declaration = _type(match$3._0);
                    break;
                case "NamedType" :
                    declaration = type_alias(match$3._0);
                    break;
                case "Interface" :
                    declaration = interface_declaration(match$3._0);
                    break;
                
              }
            } else {
              declaration = $$null;
            }
            return node("DeclareExportDeclaration", loc, [
                        [
                          "default",
                          bool($$export.default)
                        ],
                        [
                          "declaration",
                          declaration
                        ],
                        [
                          "specifiers",
                          export_specifiers($$export.specifiers)
                        ],
                        [
                          "source",
                          option(literal, $$export.source)
                        ]
                      ]);
        case "ExportDeclaration" :
            let $$export$1 = b._0;
            let match$4 = $$export$1.declaration;
            let declaration$1 = match$4 !== undefined ? (
                match$4.TAG === "Declaration" ? statement(match$4._0) : expression(match$4._0)
              ) : $$null;
            return node("ExportDeclaration", loc, [
                        [
                          "default",
                          bool($$export$1.default)
                        ],
                        [
                          "declaration",
                          declaration$1
                        ],
                        [
                          "specifiers",
                          export_specifiers($$export$1.specifiers)
                        ],
                        [
                          "source",
                          option(literal, $$export$1.source)
                        ],
                        [
                          "exportKind",
                          string(export_kind($$export$1.exportKind))
                        ]
                      ]);
        case "ImportDeclaration" :
            let $$import = b._0;
            let specifiers = List.map((function (id) {
                    switch (id.TAG) {
                      case "ImportNamedSpecifier" :
                          let match = id._0;
                          let local_id = match.local;
                          let remote_id = match.remote;
                          let span_loc = local_id !== undefined ? btwn(remote_id[0], local_id[0]) : remote_id[0];
                          return node("ImportSpecifier", span_loc, [
                                      [
                                        "id",
                                        identifier(remote_id)
                                      ],
                                      [
                                        "name",
                                        option(identifier, local_id)
                                      ]
                                    ]);
                      case "ImportDefaultSpecifier" :
                          let id$1 = id._0;
                          return node("ImportDefaultSpecifier", id$1[0], [[
                                        "id",
                                        identifier(id$1)
                                      ]]);
                      case "ImportNamespaceSpecifier" :
                          let param = id._0;
                          return node("ImportNamespaceSpecifier", param[0], [[
                                        "id",
                                        identifier(param[1])
                                      ]]);
                      
                    }
                  }), $$import.specifiers);
            let match$5 = $$import.importKind;
            let import_kind;
            switch (match$5) {
              case "ImportType" :
                  import_kind = "type";
                  break;
              case "ImportTypeof" :
                  import_kind = "typeof";
                  break;
              case "ImportValue" :
                  import_kind = "value";
                  break;
              
            }
            return node("ImportDeclaration", loc, [
                        [
                          "specifiers",
                          array($$Array.of_list(specifiers))
                        ],
                        [
                          "source",
                          literal($$import.source)
                        ],
                        [
                          "importKind",
                          string(import_kind)
                        ]
                      ]);
        
      }
    };
    let jsx_expression_container = function (param) {
      let expr = param[1].expression;
      let expression$1;
      expression$1 = expr.TAG === "Expression" ? expression(expr._0) : node("JSXEmptyExpression", expr._0, []);
      return node("JSXExpressionContainer", param[0], [[
                    "expression",
                    expression$1
                  ]]);
    };
    let class_implements = function (param) {
      let $$implements = param[1];
      return node("ClassImplements", param[0], [
                  [
                    "id",
                    identifier($$implements.id)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_instantiation, $$implements.typeParameters)
                  ]
                ]);
    };
    let class_body = function (param) {
      return node("ClassBody", param[0], [[
                    "body",
                    array_of_list(class_element, param[1].body)
                  ]]);
    };
    let function_type = function (param) {
      let fn = param[1];
      return node("FunctionTypeAnnotation", param[0], [
                  [
                    "params",
                    array_of_list(function_type_param, fn.params)
                  ],
                  [
                    "returnType",
                    _type(fn.returnType)
                  ],
                  [
                    "rest",
                    option(function_type_param, fn.rest)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_declaration, fn.typeParameters)
                  ]
                ]);
    };
    let object_type = function (param) {
      let o = param[1];
      return node("ObjectTypeAnnotation", param[0], [
                  [
                    "properties",
                    array_of_list(object_type_property, o.properties)
                  ],
                  [
                    "indexers",
                    array_of_list(object_type_indexer, o.indexers)
                  ],
                  [
                    "callProperties",
                    array_of_list(object_type_call_property, o.callProperties)
                  ]
                ]);
    };
    let jsx_identifier = function (param) {
      return node("JSXIdentifier", param[0], [[
                    "name",
                    string(param[1].name)
                  ]]);
    };
    let object_type_call_property = function (param) {
      let callProperty = param[1];
      return node("ObjectTypeCallProperty", param[0], [
                  [
                    "value",
                    function_type(callProperty.value)
                  ],
                  [
                    "static",
                    bool(callProperty.static)
                  ]
                ]);
    };
    let object_type_property = function (param) {
      let prop = param[1];
      let lit = prop.key;
      let key;
      switch (lit.TAG) {
        case "Literal" :
            key = literal(lit._0);
            break;
        case "Identifier" :
            key = identifier(lit._0);
            break;
        case "Computed" :
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "There should not be computed object type property keys",
                  Error: new Error()
                };
        
      }
      return node("ObjectTypeProperty", param[0], [
                  [
                    "key",
                    key
                  ],
                  [
                    "value",
                    _type(prop.value)
                  ],
                  [
                    "optional",
                    bool(prop.optional)
                  ],
                  [
                    "static",
                    bool(prop.static)
                  ]
                ]);
    };
    let object_type_indexer = function (param) {
      let indexer = param[1];
      return node("ObjectTypeIndexer", param[0], [
                  [
                    "id",
                    identifier(indexer.id)
                  ],
                  [
                    "key",
                    _type(indexer.key)
                  ],
                  [
                    "value",
                    _type(indexer.value)
                  ],
                  [
                    "static",
                    bool(indexer.static)
                  ]
                ]);
    };
    let jsx_opening = function (param) {
      let opening = param[1];
      return node("JSXOpeningElement", param[0], [
                  [
                    "name",
                    jsx_name(opening.name)
                  ],
                  [
                    "attributes",
                    array_of_list(jsx_opening_attribute, opening.attributes)
                  ],
                  [
                    "selfClosing",
                    bool(opening.selfClosing)
                  ]
                ]);
    };
    let jsx_child = function (param) {
      let element = param[1];
      let loc = param[0];
      switch (element.TAG) {
        case "Element" :
            return jsx_element([
                        loc,
                        element._0
                      ]);
        case "ExpressionContainer" :
            return jsx_expression_container([
                        loc,
                        element._0
                      ]);
        case "Text" :
            let param$1 = [
              loc,
              element._0
            ];
            let text = param$1[1];
            return node("JSXText", param$1[0], [
                        [
                          "value",
                          string(text.value)
                        ],
                        [
                          "raw",
                          string(text.raw)
                        ]
                      ]);
        
      }
    };
    let jsx_closing = function (param) {
      return node("JSXClosingElement", param[0], [[
                    "name",
                    jsx_name(param[1].name)
                  ]]);
    };
    let comment = function (param) {
      let c = param[1];
      let match;
      match = c.TAG === "Block" ? [
          "Block",
          c._0
        ] : [
          "Line",
          c._0
        ];
      return node(match[0], param[0], [[
                    "value",
                    string(match[1])
                  ]]);
    };
    let jsx_namespaced_name = function (param) {
      let namespaced_name = param[1];
      return node("JSXNamespacedName", param[0], [
                  [
                    "namespace",
                    jsx_identifier(namespaced_name.namespace)
                  ],
                  [
                    "name",
                    jsx_identifier(namespaced_name.name)
                  ]
                ]);
    };
    let jsx_attribute_value = function (param) {
      if (param.TAG === "Literal") {
        return literal([
                    param._0,
                    param._1
                  ]);
      } else {
        return jsx_expression_container([
                    param._0,
                    param._1
                  ]);
      }
    };
    let type_param = function (param) {
      let tp = param[1];
      let variance = function (param) {
        if (param === "Plus") {
          return string("plus");
        } else {
          return string("minus");
        }
      };
      return node("TypeParameter", param[0], [
                  [
                    "name",
                    string(tp.name)
                  ],
                  [
                    "bound",
                    option(type_annotation, tp.bound)
                  ],
                  [
                    "variance",
                    option(variance, tp.variance)
                  ],
                  [
                    "default",
                    option(_type, tp.default)
                  ]
                ]);
    };
    let function_type_param = function (param) {
      let param$1 = param[1];
      return node("FunctionTypeParam", param[0], [
                  [
                    "name",
                    identifier(param$1.name)
                  ],
                  [
                    "typeAnnotation",
                    _type(param$1.typeAnnotation)
                  ],
                  [
                    "optional",
                    bool(param$1.optional)
                  ]
                ]);
    };
    let class_element = function (m) {
      if (m.TAG === "Method") {
        let param = m._0;
        let method_ = param[1];
        let key = method_.key;
        let match;
        switch (key.TAG) {
          case "Literal" :
              match = [
                literal(key._0),
                false
              ];
              break;
          case "Identifier" :
              match = [
                identifier(key._0),
                false
              ];
              break;
          case "Computed" :
              match = [
                expression(key._0),
                true
              ];
              break;
          
        }
        let kind;
        switch (method_.kind) {
          case "Constructor" :
              kind = "constructor";
              break;
          case "Method" :
              kind = "method";
              break;
          case "Get" :
              kind = "get";
              break;
          case "Set" :
              kind = "set";
              break;
          
        }
        return node("MethodDefinition", param[0], [
                    [
                      "key",
                      match[0]
                    ],
                    [
                      "value",
                      function_expression(method_.value)
                    ],
                    [
                      "kind",
                      string(kind)
                    ],
                    [
                      "static",
                      bool(method_.static)
                    ],
                    [
                      "computed",
                      bool(match[1])
                    ],
                    [
                      "decorators",
                      array_of_list(expression, method_.decorators)
                    ]
                  ]);
      } else {
        let param$1 = m._0;
        let prop = param$1[1];
        let lit = prop.key;
        let match$1;
        switch (lit.TAG) {
          case "Literal" :
              match$1 = [
                literal(lit._0),
                false
              ];
              break;
          case "Identifier" :
              match$1 = [
                identifier(lit._0),
                false
              ];
              break;
          case "Computed" :
              match$1 = [
                expression(lit._0),
                true
              ];
              break;
          
        }
        return node("ClassProperty", param$1[0], [
                    [
                      "key",
                      match$1[0]
                    ],
                    [
                      "value",
                      option(expression, prop.value)
                    ],
                    [
                      "typeAnnotation",
                      option(type_annotation, prop.typeAnnotation)
                    ],
                    [
                      "computed",
                      bool(match$1[1])
                    ],
                    [
                      "static",
                      bool(prop.static)
                    ]
                  ]);
      }
    };
    let template_element = function (param) {
      let element = param[1];
      let value = obj([
            [
              "raw",
              string(element.value.raw)
            ],
            [
              "cooked",
              string(element.value.cooked)
            ]
          ]);
      return node("TemplateElement", param[0], [
                  [
                    "value",
                    value
                  ],
                  [
                    "tail",
                    bool(element.tail)
                  ]
                ]);
    };
    let jsx_name = function (id) {
      switch (id.TAG) {
        case "Identifier" :
            return jsx_identifier(id._0);
        case "NamespacedName" :
            return jsx_namespaced_name(id._0);
        case "MemberExpression" :
            return jsx_member_expression(id._0);
        
      }
    };
    let jsx_opening_attribute = function (attribute) {
      if (attribute.TAG === "Attribute") {
        let param = attribute._0;
        let attribute$1 = param[1];
        let id = attribute$1.name;
        let name;
        name = id.TAG === "Identifier" ? jsx_identifier(id._0) : jsx_namespaced_name(id._0);
        return node("JSXAttribute", param[0], [
                    [
                      "name",
                      name
                    ],
                    [
                      "value",
                      option(jsx_attribute_value, attribute$1.value)
                    ]
                  ]);
      } else {
        let param$1 = attribute._0;
        return node("JSXSpreadAttribute", param$1[0], [[
                      "argument",
                      expression(param$1[1].argument)
                    ]]);
      }
    };
    let jsx_member_expression = function (param) {
      let member_expression = param[1];
      let id = member_expression._object;
      let _object;
      _object = id.TAG === "Identifier" ? jsx_identifier(id._0) : jsx_member_expression(id._0);
      return node("JSXMemberExpression", param[0], [
                  [
                    "object",
                    _object
                  ],
                  [
                    "property",
                    jsx_identifier(member_expression.property)
                  ]
                ]);
    };
    let $$case = function (param) {
      let c = param[1];
      return node("SwitchCase", param[0], [
                  [
                    "test",
                    option(expression, c.test)
                  ],
                  [
                    "consequent",
                    array_of_list(statement, c.consequent)
                  ]
                ]);
    };
    let $$catch = function (param) {
      let c = param[1];
      return node("CatchClause", param[0], [
                  [
                    "param",
                    pattern(c.param)
                  ],
                  [
                    "guard",
                    option(expression, c.guard)
                  ],
                  [
                    "body",
                    block(c.body)
                  ]
                ]);
    };
    let export_kind = function (param) {
      if (param === "ExportType") {
        return "type";
      } else {
        return "value";
      }
    };
    let declare_function = function (param) {
      return node("DeclareFunction", param[0], [[
                    "id",
                    identifier(param[1].id)
                  ]]);
    };
    let interface_declaration = function (param) {
      let i = param[1];
      return node("InterfaceDeclaration", param[0], [
                  [
                    "id",
                    identifier(i.id)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_declaration, i.typeParameters)
                  ],
                  [
                    "body",
                    object_type(i.body)
                  ],
                  [
                    "extends",
                    array_of_list(interface_extends, i.extends)
                  ]
                ]);
    };
    let type_alias = function (param) {
      let alias = param[1];
      return node("TypeAlias", param[0], [
                  [
                    "id",
                    identifier(alias.id)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_declaration, alias.typeParameters)
                  ],
                  [
                    "right",
                    _type(alias.right)
                  ]
                ]);
    };
    let declare_class = function (param) {
      let d = param[1];
      return node("DeclareClass", param[0], [
                  [
                    "id",
                    identifier(d.id)
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_declaration, d.typeParameters)
                  ],
                  [
                    "body",
                    object_type(d.body)
                  ],
                  [
                    "extends",
                    array_of_list(interface_extends, d.extends)
                  ]
                ]);
    };
    let export_specifiers = function (param) {
      if (param !== undefined) {
        if (param.TAG === "ExportSpecifiers") {
          return array_of_list(export_specifier, param._0);
        } else {
          return array([node("ExportBatchSpecifier", param._0, [[
                              "name",
                              option(identifier, param._1)
                            ]])]);
        }
      } else {
        return array([]);
      }
    };
    let variable_declaration = function (param) {
      let $$var = param[1];
      let match = $$var.kind;
      let kind;
      switch (match) {
        case "Var" :
            kind = "var";
            break;
        case "Let" :
            kind = "let";
            break;
        case "Const" :
            kind = "const";
            break;
        
      }
      return node("VariableDeclaration", param[0], [
                  [
                    "declarations",
                    array_of_list(variable_declarator, $$var.declarations)
                  ],
                  [
                    "kind",
                    string(kind)
                  ]
                ]);
    };
    let declare_variable = function (param) {
      return node("DeclareVariable", param[0], [[
                    "id",
                    identifier(param[1].id)
                  ]]);
    };
    let interface_extends = function (param) {
      let g = param[1];
      let id = g.id;
      let id$1;
      id$1 = id.TAG === "Unqualified" ? identifier(id._0) : generic_type_qualified_identifier(id._0);
      return node("InterfaceExtends", param[0], [
                  [
                    "id",
                    id$1
                  ],
                  [
                    "typeParameters",
                    option(type_parameter_instantiation, g.typeParameters)
                  ]
                ]);
    };
    let program$2 = function (param) {
      return node("Program", param[0], [
                  [
                    "body",
                    array_of_list(statement, param[1])
                  ],
                  [
                    "comments",
                    array_of_list(comment, param[2])
                  ]
                ]);
    };
    let ret = program$2(match[0]);
    let translation_errors$1 = translation_errors.contents;
    ret["errors"] = errors(Pervasives.$at(match[1], translation_errors$1));
    return ret;
  }
  catch (raw_l){
    let l = Caml_js_exceptions.internalToOCamlException(raw_l);
    if (l.RE_EXN_ID === $$Error) {
      let e = new Error(String(List.length(l._1)) + " errors");
      e["name"] = "Parse Error";
      throw(e);
      return {};
    }
    throw l;
  }
}

let suites = {
  contents: /* [] */0
};

let test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

let f = typeof __dirname === "undefined" ? undefined : __dirname;

if (f !== undefined) {
  let f$1 = Path.join(f, "flow_parser_sample.js");
  let v = parse(Fs.readFileSync(f$1, "utf8"), undefined);
  eq("File \"runParser.ml\", line 14, characters 7-14", [
        0,
        2842
      ], v.range);
} else {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "runParser.ml",
          15,
          12
        ],
        Error: new Error()
      };
}

Mt.from_pair_suites("Flow_parser_reg_test", suites.contents);

/* Literal Not a pure module */
