"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstanceOfFormatVariableParseOptions = function (other) {
    return ('flags' in other
        &&
            Array.isArray(other.flags)
        &&
            other.flags.every(function (flag) { return 'string' === typeof flag; }));
};
exports.isInstanceOfFormatVariable = function (other) {
    return ('source' in other
        &&
            'string' === typeof other.source
        &&
            'offset' in other
        &&
            'number' === typeof other.offset);
};
exports.isInstanceOfFormatVariableData = function (other) {
    return ('flag' in other
        &&
            exports.isInstanceOfFormatVariable(other));
};
exports.isInstanceOfFormatVariableParam = function (other) {
    return ('param' in other
        &&
            'string' === typeof other.param
        &&
            exports.isInstanceOfFormatVariableData(other));
};
exports.isInstanceOf = {
    FormatVariableParseOptions: exports.isInstanceOfFormatVariableParseOptions,
    FormatVariable: exports.isInstanceOfFormatVariable,
    FormatVariableData: exports.isInstanceOfFormatVariableData,
    FormatVariableParam: exports.isInstanceOfFormatVariableParam
};
/*
import { FormatValueType } from '../types'

export interface VariableType<T extends VariableTypes> {
  type:T
}

export interface FormatVariableType<T extends VariableTypes,U extends VariableType<T>> extends FormatVariable, VariableType<U> {
  formatValueType:FormatValueType<T>
}

export interface FormatVariableValue<T extends VariableTypes> extends FormatVariable, VariableType<T> {
  value:T
}*/ 
//# sourceMappingURL=interfaces.js.map