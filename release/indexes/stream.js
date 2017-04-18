"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var rxjs_1 = require("rxjs");
var env = require("../env");
exports.IndexNames = rxjs_1.Observable.from(Object.keys(interfaces_1.IndexType))
    .map(function (value) {
    console.log('value: %s', interfaces_1.IndexType[value]);
    return interfaces_1.IndexType[value];
}).filter(function (value) { return 'string' === typeof value; });
exports.filterStream = function (indexName) {
    switch (indexName) {
        case "structure":
            return function (component) { return env.path.resolve(component.dir, '..') === env.path.resolve(env.KIO_PATHS.components.structure); };
        case "fixture":
        case "criteria":
        case "publication":
            return function (component) { return env.path.resolve(component.dir, '../..') === env.path.resolve(env.KIO_PATHS.components.publication); };
        case "navigation":
            return function (component) { return env.path.resolve(component.dir, '..') === env.path.resolve(env.KIO_PATHS.components.navigation); };
    }
};
//# sourceMappingURL=stream.js.map