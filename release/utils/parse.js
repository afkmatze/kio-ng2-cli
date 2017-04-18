"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.parseFile = function (filename) {
    var source = fs.readFileSync(filename, 'utf8');
    var re_exports = /^export\ (\w+)\ (\w+)[\ \=]{0,1}\ (.*)$/gm;
    var getExports = function () {
        var matches = [];
        var match;
        while (match = re_exports.exec(source)) {
            var src = match[0], typename = match[1], varname = match[2], rest = match.slice(3);
            matches.push({ src: src, typename: typename, varname: varname, rest: rest });
        }
        return matches;
    };
    var getValueOf = function (exportName) {
    };
    return {
        getExports: getExports
    };
};
//# sourceMappingURL=parse.js.map