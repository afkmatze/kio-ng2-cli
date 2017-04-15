"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./interfaces"));
__export(require("./find"));
__export(require("./create"));
__export(require("./classes"));
var cache = require("../cache");
var find_1 = require("./find");
var interfaces_1 = require("./interfaces");
var componentTypeForFilter = function (filter) {
    if (filter === "structure")
        return interfaces_1.KioComponentType.StructureComponent;
    if (filter === "publication")
        return interfaces_1.KioComponentType.PublicationComponent;
    if (filter === "navigation")
        return interfaces_1.KioComponentType.NavigationComponent;
    return undefined;
};
exports.getComponents = function (filter, fromCache) {
    if (fromCache === void 0) { fromCache = true; }
    var components;
    if (fromCache) {
        var componentType = componentTypeForFilter(filter);
        components = cache.readCache("components", filter); //.filter(component=>component.data.componentType === componentType )
    }
    else {
        components = find_1.findComponents(filter);
    }
    return components;
};
//# sourceMappingURL=index.js.map