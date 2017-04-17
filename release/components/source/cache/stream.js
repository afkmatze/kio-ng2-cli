"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var interfaces_1 = require("../../interfaces");
var create_1 = require("../../create");
var env_1 = require("../../../env");
var fs_1 = require("../../../utils/rx/fs");
var rxfs = require("../../../utils/rx/fs");
var logMap = function (value, idx) {
    console.log('value %s', idx, value);
    return value;
};
var KioComponentType2Path = (_a = {},
    _a[interfaces_1.KioComponentType.PublicationComponent] = 'publication',
    _a[interfaces_1.KioComponentType[interfaces_1.KioComponentType.PublicationComponent]] = 'publication',
    _a[interfaces_1.KioComponentType.NavigationComponent] = 'navigation',
    _a[interfaces_1.KioComponentType[interfaces_1.KioComponentType.NavigationComponent]] = 'navigation',
    _a[interfaces_1.KioComponentType.StructureComponent] = 'structure',
    _a[interfaces_1.KioComponentType[interfaces_1.KioComponentType.StructureComponent]] = 'structure',
    _a);
var COMPONENTS_CACHE = env_1.path.join(env_1.KIO_PROJECT_CACHE, 'components');
var resolveComponentsCache = function (componentType) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return env_1.path.join.apply(env_1.path, [COMPONENTS_CACHE, KioComponentType2Path[componentType]].concat(args));
};
exports.fetch = function () { return fs_1.readdir(env_1.path.join(env_1.KIO_PROJECT_CACHE, 'components'))
    .filter(function (item) { return env_1.path.extname(item) === '.json'; })
    .flatMap(function (filename) { return fs_1.readfile(filename, true).map(function (value) { return JSON.parse(value); }); }); };
var CacheStream = (function () {
    function CacheStream() {
        this.isWritable = true;
    }
    CacheStream.prototype.exists = function (name) {
        if (name === void 0) { name = "components"; }
        return rxfs.existsSync(env_1.path.join(env_1.KIO_PROJECT_CACHE, name));
    };
    CacheStream.prototype.fetch = function () {
        return exports.fetch()
            .map(create_1.createWithData)
            .flatMap(function (component) { return rxjs_1.Observable.of(component, rxjs_1.Scheduler.async); })
            .concat();
    };
    CacheStream.prototype.prepare = function () {
        return rxjs_1.Observable.of('');
    };
    CacheStream.prototype.write = function (component) {
        var cacheDir = resolveComponentsCache(component.typeName);
        var cachePath = resolveComponentsCache(component.typeName, component.name + '.json');
        var jsonData = component.toJSON();
        var data = JSON.stringify(jsonData, null, '  ');
        var exists = rxfs.existsSync(cacheDir);
        var source = rxjs_1.Observable.of(cachePath);
        if (!exists) {
            source = rxjs_1.Observable.fromPromise(rxfs.async.mkdir(cacheDir, true).then(function () { return cachePath; }));
        }
        return source.flatMap(function (filepath) { return rxfs.writeFile(cachePath, data); });
    };
    return CacheStream;
}());
exports.CacheStream = CacheStream;
exports.default = new CacheStream();
var _a;
//# sourceMappingURL=stream.js.map