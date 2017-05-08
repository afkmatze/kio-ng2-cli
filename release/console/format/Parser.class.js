"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var variables = require("./variables");
exports.variableToParam = function (value, typeName, variable) {
    if (variables.isInstanceOfFormatVariableParam(variable)) {
        return {
            flag: variable.flag,
            paramArgs: variable.param,
            offset: variable.offset,
            source: variable.source,
            typeName: typeName,
            value: value
        };
    }
    return {
        flag: variable.flag,
        offset: variable.offset,
        source: variable.source,
        typeName: typeName,
        value: value
    };
};
var FormatParser = (function () {
    function FormatParser(format, args, types) {
        if (types === void 0) { types = types_1.default; }
        var _this = this;
        this.format = format;
        this.args = args;
        this.types = types;
        this.typeMap = new Map();
        this.flags = [];
        types.forEach(function (formatType) {
            var flags = formatType.flag.toString().match(/([a-z]){1}/g);
            flags.forEach(function (flag) {
                _this.typeMap.set(flag, formatType);
                _this.flags.push(flag);
            });
        });
    }
    FormatParser.prototype.parse = function () {
        var _this = this;
        var result = {
            chunks: []
        };
        var addFormatSource = function (arg) {
            result.chunks.push(arg);
        };
        var addParam = function (arg) {
            result.chunks.push(arg);
        };
        var addFormatParam = function (arg) {
            result.chunks.push(arg);
        };
        var args = this.args.slice();
        var lastOffset = 0;
        variables
            .parse(this.format, {
            flags: this.flags
        })
            .forEach(function (variable, idx) {
            var type = _this.typeMap.get(variable.flag);
            //console.log('type for flag %s: ', variable.flag, '\n----\n', type, '\n----\n', variable)
            addFormatSource({
                source: _this.format.substr(lastOffset, variable.offset - lastOffset)
            });
            var param = exports.variableToParam(args.shift(), type.typeName, variable);
            addFormatParam(param);
            lastOffset = variable.offset + variable.source.length;
        });
        addFormatSource({
            source: this.format.substr(lastOffset)
        });
        args.forEach(function (value) {
            addParam({
                value: value
            });
        });
        return result;
    };
    return FormatParser;
}());
exports.FormatParser = FormatParser;
//# sourceMappingURL=Parser.class.js.map