"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selectKeys = function (target, selector) {
    if (selector === void 0) { selector = "*"; }
    if ('string' === typeof selector) {
        if (selector === "*")
            return Object.keys(target);
        return selector.split(/[\|,]/gm);
    }
    return selector.slice();
};
exports.operatorKeys = function (logger) {
    var op = function (target, selector, format) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var keys = selectKeys(target, selector);
        logger.log.apply(logger, [format || 'keys of '].concat((args.length > 0 ? args : [target])));
        keys.forEach(function (key, idx) {
            logger.log('[%s]%s => %s', typeof target[key], key, target[key]);
        });
    };
    return op;
};
//# sourceMappingURL=keys.js.map