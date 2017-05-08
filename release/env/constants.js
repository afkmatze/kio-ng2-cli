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
// content of target project`s package.json
exports.KIO_PROJECT_PACKAGE = require(path.join(exports.KIO_PROJECT_ROOT, 'package.json'));
exports.KIO_PROJECT_CACHE = resolve_1.resolveRoot('.kio-ng2-cache');
var projectPackage = resolve_1.resolveProjectPackage();
exports.KIO_PATHS = {
    root: projectPackage.kio.root,
    components: {
        publication: projectPackage.kio.components.publication,
        structure: projectPackage.kio.components.structure,
        navigation: projectPackage.kio.components.navigation
    }
};
exports.KIO_TEMPLATES = path.resolve(__dirname, '../../templates');
exports.TEMPLATES = exports.KIO_TEMPLATES;
//# sourceMappingURL=constants.js.map