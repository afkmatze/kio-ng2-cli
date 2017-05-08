"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var Parser_class_1 = require("./Parser.class");
var Formatter = (function () {
    function Formatter() {
        this.types = new Set();
        /*
          formatValue(value){
            if ( 'string' === typeof value )
              return this.formatStringValue(value)
            if ( 'number' === typeof value )
                return this.formatNumberValue(value)
            if ( 'boolean' === typeof value )
                return this.formatStringValue(value?'true':'false')
            if ( value instanceof Date )
                return this.formatDateValue(value)
            if ( value instanceof Buffer )
                return value.toString()
            return value
          }*/
    }
    Formatter.prototype.addType = function (formatValueType) {
        this.types.add(formatValueType);
    };
    Formatter.prototype.getTypeByName = function (typeName) {
        return Array.from(this.types).find(function (type) {
            return type.typeName === typeName;
        });
    };
    Formatter.prototype.getTypeByValue = function (value) {
        return Array.from(this.types).find(function (type) {
            return type.checkType(value);
        });
    };
    Formatter.prototype.parse = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var parser = new Parser_class_1.FormatParser(format, args, Array.from(this.types.values()));
        var result = parser.parse();
        return result;
    };
    Formatter.prototype.printf = function (format) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var chunks = this.parse.apply(this, [format].concat(args)).chunks;
        //console.log('prinf::chunks', chunks)
        return chunks
            .map(function (chunk, idx) { return _this.renderChunk(chunk, idx); })
            .join('');
    };
    Formatter.prototype.renderChunk = function (chunk, idx) {
        if (interfaces_1.isInstanceOf.FormatParam(chunk)) {
            var type = this.getTypeByName(chunk.typeName);
            var rendered = type.render(chunk);
            //console.log('render chunk #%s with type', idx, type.typeName, chunk, '\n[RENDERED]\n', rendered, '\n-----' )
            return rendered;
        }
        if (interfaces_1.isInstanceOf.FormatSource(chunk)) {
            return chunk.source;
        }
        if (interfaces_1.isInstanceOf.Param(chunk)) {
            var type = this.getTypeByValue(chunk.value);
            return type.render(chunk);
        }
    };
    Formatter.prototype.formatStringValue = function (value) {
        return value;
    };
    Formatter.prototype.formatNumberValue = function (value) {
        return "" + value;
    };
    Formatter.prototype.formatDateValue = function (value) {
        return "" + value;
    };
    return Formatter;
}());
exports.Formatter = Formatter;
//# sourceMappingURL=Formatter.class.js.map