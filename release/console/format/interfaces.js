"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./variables/interfaces");
exports.checkValueType = function (value, valueTypeName) {
    return typeof value === valueTypeName;
};
function instanceOfFormatSource(other) {
    return ('source' in other
        &&
            'string' === typeof other.source);
}
exports.instanceOfFormatSource = instanceOfFormatSource;
function instanceOfParam(other) {
    return ('value' in other);
}
exports.instanceOfParam = instanceOfParam;
function instanceOfFormatChunk(other) {
    return ('length' in other
        &&
            'number' === typeof other.length
        &&
            instanceOfFormatSource(other));
}
exports.instanceOfFormatChunk = instanceOfFormatChunk;
function instanceOfFormatParam(other) {
    return ('typeName' in other
        &&
            (!('paramArgs' in other) || 'string' === typeof other.paramArgs)
        &&
            instanceOfParam(other)
        &&
            interfaces_1.isInstanceOfFormatVariable(other));
}
exports.instanceOfFormatParam = instanceOfFormatParam;
/*
export function instanceOfFormatChunk ( other:any ):other is FormatChunk {
  return (
      ('index' in other && 'number' === typeof other.index)
      &&
      ('offset' in other && 'number' === typeof other.offset)
      &&
      ('length' in other && 'number' === typeof other.length)
      &&
      ('source' in other && 'string' === typeof other.source)
    )
}*/
function instanceOfFormatArg(other) {
    return (('value' in other)
        && instanceOfFormatParam(other));
}
exports.instanceOfFormatArg = instanceOfFormatArg;
exports.isInstanceOf = {
    FormatSource: instanceOfFormatSource,
    Param: instanceOfParam,
    FormatChunk: instanceOfFormatChunk,
    FormatParam: instanceOfFormatParam,
    FormatArg: instanceOfFormatArg
};
//# sourceMappingURL=interfaces.js.map