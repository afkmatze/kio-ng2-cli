"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapToData = function (offset, source, flag) {
    return {
        offset: offset,
        source: source,
        flag: flag
    };
};
var mapToParam = function (offset, source, flag, param) {
    return {
        offset: offset,
        source: source,
        param: param,
        flag: flag
    };
};
var matchExpression = function (expr, source) {
    var matches = [];
    var current;
    var lastOffset = -1;
    while ((current = expr.exec(source)) && !!current) {
        if (current.index <= lastOffset)
            break;
        matches.push(current);
        lastOffset = current.index;
    }
    return matches;
};
exports.parse = function (formatString, options) {
    var flags = options.flags;
    var expr = new RegExp("%([0-9|.|,]+)?([" + flags.join('') + "]){1}", 'gm');
    var matches = matchExpression(expr, formatString);
    return matches
        .map(function (match) {
        var index = match.index;
        if (match.length > 2) {
            var _a = match[0], source = _a === void 0 ? undefined : _a, _b = match[1], param = _b === void 0 ? undefined : _b, _c = match[2], flag = _c === void 0 ? undefined : _c;
            return mapToParam(match.index, source, flag, param);
        }
        else {
            var _d = match[0], source = _d === void 0 ? undefined : _d, _e = match[1], flag = _e === void 0 ? undefined : _e;
            return mapToData(match.index, source, flag);
        }
    });
};
//# sourceMappingURL=parse.js.map