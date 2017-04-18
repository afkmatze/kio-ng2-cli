"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
exports.operator = function (logger) {
    var createOperator = function (label, total) {
        if (label === void 0) { label = "item"; }
        var formatLabel = function (item, idx, list) {
            if (typeof total === 'undefined' && !!list) {
                total = list.length;
            }
            else {
                total = 0;
            }
            if (total > 0) {
                return chalk.green.bold(label) + " " + idx + "/" + total;
            }
            return chalk.green.bold(label) + " " + chalk.dim('#') + idx;
        };
        var writer = function (item, idx, list) {
            logger.log(formatLabel(item, idx, list) + '\n---\n' + chalk.dim(item) + '\n---');
            return item;
        };
        return writer;
    };
    return createOperator;
};
exports.default = exports.operator;
//# sourceMappingURL=map.js.map