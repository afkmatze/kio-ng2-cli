"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("./path");
var resolve_1 = require("./resolve");
var logger = require("../console");
var debug = logger.createDebugger();
__export(require("./interfaces"));
__export(require("./resolve"));
exports.MACHINE_ROOT = path.resolve('/');
// target project root directory
exports.KIO_PROJECT_ROOT = resolve_1.moduleRoot();
exports.KIO_TEMPLATES = path.resolve(__dirname, '../../templates');
exports.TEMPLATES = exports.KIO_TEMPLATES;
//# sourceMappingURL=constants.js.map