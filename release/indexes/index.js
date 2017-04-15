"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var env = require("../env");
__export(require("./interfaces"));
var interfaces_1 = require("./interfaces");
var components_1 = require("../components");
var template_1 = require("./template");
exports.componentFilterForIndexType = function (indexType) {
    switch (indexType) {
        case interfaces_1.IndexType.publication:
        case interfaces_1.IndexType.fixture:
        case interfaces_1.IndexType.criteria:
            return "publication";
        case interfaces_1.IndexType.navigation:
            return "navigation";
        case interfaces_1.IndexType.structure:
            return "structure";
    }
    return undefined;
};
exports.IndexFileMap = new Map();
exports.IndexFileMap.set("publication", path.join(env.KIO_PATHS.root, "PublicationComponents.generated.ts"));
exports.IndexFileMap.set("navigation", path.join(env.KIO_PATHS.root, "NavigationComponents.generated.ts"));
exports.IndexFileMap.set("structure", path.join(env.KIO_PATHS.root, "StructureComponents.generated.ts"));
exports.IndexFileMap.set("fixture", path.join(env.KIO_PATHS.root, "PublicationFixtures.generated.ts"));
exports.IndexFileMap.set("criteria", path.join(env.KIO_PATHS.root, "PublicationCriterias.generated.ts"));
exports.IndexFilenames = Array.from(exports.IndexFileMap.keys());
exports.getIndexFilePath = function (indexName) { return exports.IndexFileMap.get(indexName); };
exports.getIndex = function (indexName, fromCache) {
    if (fromCache === void 0) { fromCache = true; }
    var indexType = interfaces_1.IndexType[indexName];
    var filter = exports.componentFilterForIndexType(indexType);
    return {
        name: indexName,
        components: components_1.getComponents(filter, fromCache)
    };
};
exports.getIndexData = function (indexName, fromCache) {
    if (fromCache === void 0) { fromCache = true; }
    var index = exports.getIndex(indexName, fromCache);
    return template_1.dataForIndex(index);
};
//# sourceMappingURL=index.js.map