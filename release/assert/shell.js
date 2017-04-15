"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
exports.shellFlag = function (testFlag, value) {
    return shelljs.exec("[[ " + testFlag + " \"" + value + "\" ]]").code === 0;
};
//# sourceMappingURL=shell.js.map