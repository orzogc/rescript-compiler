'use strict';


function getExn(x) {
  if (x.TAG === "Ok") {
    return x._0;
  }
  throw new Error("Not_found", {
    cause: {
      RE_EXN_ID: "Not_found"
    }
  });
}

function mapWithDefaultU(opt, $$default, f) {
  if (opt.TAG === "Ok") {
    return f(opt._0);
  } else {
    return $$default;
  }
}

function mapWithDefault(opt, $$default, f) {
  return mapWithDefaultU(opt, $$default, (function (x) {
    return f(x);
  }));
}

function mapU(opt, f) {
  if (opt.TAG === "Ok") {
    return {
      TAG: "Ok",
      _0: f(opt._0)
    };
  } else {
    return {
      TAG: "Error",
      _0: opt._0
    };
  }
}

function map(opt, f) {
  return mapU(opt, (function (x) {
    return f(x);
  }));
}

function flatMapU(opt, f) {
  if (opt.TAG === "Ok") {
    return f(opt._0);
  } else {
    return {
      TAG: "Error",
      _0: opt._0
    };
  }
}

function flatMap(opt, f) {
  return flatMapU(opt, (function (x) {
    return f(x);
  }));
}

function getWithDefault(opt, $$default) {
  if (opt.TAG === "Ok") {
    return opt._0;
  } else {
    return $$default;
  }
}

function isOk(x) {
  if (x.TAG === "Ok") {
    return true;
  } else {
    return false;
  }
}

function isError(x) {
  if (x.TAG === "Ok") {
    return false;
  } else {
    return true;
  }
}

function eqU(a, b, f) {
  if (a.TAG === "Ok") {
    if (b.TAG === "Ok") {
      return f(a._0, b._0);
    } else {
      return false;
    }
  } else if (b.TAG === "Ok") {
    return false;
  } else {
    return true;
  }
}

function eq(a, b, f) {
  return eqU(a, b, (function (x, y) {
    return f(x, y);
  }));
}

function cmpU(a, b, f) {
  if (a.TAG === "Ok") {
    if (b.TAG === "Ok") {
      return f(a._0, b._0);
    } else {
      return 1;
    }
  } else if (b.TAG === "Ok") {
    return -1;
  } else {
    return 0;
  }
}

function cmp(a, b, f) {
  return cmpU(a, b, (function (x, y) {
    return f(x, y);
  }));
}

exports.getExn = getExn;
exports.mapWithDefaultU = mapWithDefaultU;
exports.mapWithDefault = mapWithDefault;
exports.mapU = mapU;
exports.map = map;
exports.flatMapU = flatMapU;
exports.flatMap = flatMap;
exports.getWithDefault = getWithDefault;
exports.isOk = isOk;
exports.isError = isError;
exports.eqU = eqU;
exports.eq = eq;
exports.cmpU = cmpU;
exports.cmp = cmp;
/* No side effect */
