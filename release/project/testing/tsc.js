"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
exports.req = function (filepath) {
    var cp = shelljs.exec("tsc \"" + filepath + "\"");
    var transpiledFilepath = filepath.replace(/ts$/, 'js');
    var data = require(transpiledFilepath);
    shelljs.rm(transpiledFilepath);
    return data;
};
//# sourceMappingURL=tsc.js.map