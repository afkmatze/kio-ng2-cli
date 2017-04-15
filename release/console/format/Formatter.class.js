"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Formatter = (function () {
    function Formatter() {
        this.types = new Map();
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
    Formatter.prototype.addType = function (typeMatcher, typeFormatter) {
        this.types.set(typeMatcher, typeFormatter);
    };
    Formatter.prototype.getValueFormatter = function (value) {
        var matcherIterator = this.types.keys();
        var matcher;
        do {
            matcher = matcherIterator.next();
            if (matcher.done)
                return null;
            var m = matcher.value;
            if (m(value))
                return this.types.get(m);
        } while (true);
    };
    Formatter.prototype.formatValue = function (value) {
        var formatter = this.getValueFormatter(value);
        if (!formatter) {
            console.warn('no formatter for value', value);
        }
        else {
            value = formatter.formatValue(value);
        }
        return value;
    };
    Formatter.prototype.printf = function (format) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return format.replace(/\%\w/gm, function (src, match, pos) {
            return _this.formatValue(args.shift());
        });
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