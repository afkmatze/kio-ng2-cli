"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./create"));
__export(require("./interfaces"));
__export(require("./templates"));
__export(require("./components"));
__export(require("./config"));
var files_1 = require("./files");
var templates = require("./templates");
exports.templates = templates;
var buildIndexes_1 = require("./buildIndexes");
var createComponent_1 = require("./createComponent");
//import { testComponents } from './testComponents'
var kio_ng2_env_1 = require("kio-ng2-env");
exports.default = function (projectPath) {
    if (projectPath === void 0) { projectPath = kio_ng2_env_1.api.modules.resolve.rootPath(); }
    return {
        createComponent: createComponent_1.createComponent(projectPath),
        //testComponents: testComponents(projectPath),
        buildIndexes: buildIndexes_1.buildIndexes(projectPath),
        files: files_1.default(projectPath)
    };
};
//# sourceMappingURL=index.js.map