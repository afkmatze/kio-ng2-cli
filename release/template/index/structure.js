"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../env/constants");
var path = require("path");
var shelljs_1 = require("shelljs");
var TEMPLATE_SOURCE = shelljs_1.cat(path.join(constants_1.TEMPLATES, 'index', 'ComponentIndex.ts'));
exports.writeComponent = function (component) {
    //return ejs.render()
};
exports.write = function (components) {
    var targetDir = constants_1.KIO_PATHS.components.structure;
    return components.map(exports.writeComponent);
};
//# sourceMappingURL=structure.js.map