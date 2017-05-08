"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../interfaces");
function instanceOfFormatValueMapper(other) {
    return ('typeName' in other
        && ('checkType' in other && 'function' === typeof other.checkType)
        && ('render' in other && 'function' === typeof other.render));
}
exports.instanceOfFormatValueMapper = instanceOfFormatValueMapper;
function instanceOfFormatParam(other) {
    return ('formatMapper' in other
        &&
            instanceOfFormatValueMapper(other.formatMapper)
        &&
            interfaces_1.instanceOfFormatChunk(other));
}
exports.instanceOfFormatParam = instanceOfFormatParam;
function instanceOfFormatMappingArg(other) {
    return (instanceOfFormatParam(other)
        &&
            interfaces_1.instanceOfFormatArg(other));
}
exports.instanceOfFormatMappingArg = instanceOfFormatMappingArg;
//# sourceMappingURL=interfaces.js.map