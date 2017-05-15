"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = function (list) {
    if (!Array.isArray(list))
        return exports.flatten([list]);
    var out = [];
    var addItem = function (item) {
        if (Array.isArray(item)) {
            item.forEach(addItem);
        }
        else {
            out.push(item);
        }
    };
    list.forEach(function (item) {
        addItem(item);
    });
    return out;
};
exports.parseList = function (list) {
    if ('string' === typeof list) {
        return exports.parseList(list.split(/[\ |\,|\.]/gm));
    }
    return exports.flatten(list);
};
//# sourceMappingURL=parseArgs.js.map