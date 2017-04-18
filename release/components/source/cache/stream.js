"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var interfaces_1 = require("../../interfaces");
var create_1 = require("../../create");
var logger = require("../../../console");
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
    .distinct(function (item) { return "" + item; })
    .mergeMap(function (filename) {
    //logger.log('merge map file "%s"', filename )
    return fs_1.readfile(filename, true)
        .map(function (value) { return ({
        filename: filename,
        data: JSON.parse(value)
    }); });
}); };
var CacheStream = (function () {
    function CacheStream() {
        this.isWritable = true;
    }
    CacheStream.prototype.exists = function (name) {
        if (name === void 0) { name = "components"; }
        return rxfs.existsSync(env_1.path.join(env_1.KIO_PROJECT_CACHE, name));
    };
    CacheStream.prototype._fetch = function () {
        if (!this.cachedFetch) {
            this.cachedFetch = exports.fetch();
        }
        return this.cachedFetch;
    };
    CacheStream.prototype.removeDeleted = function () {
        var filtered = this._fetch().filter(function (item, idx) {
            return !rxfs.existsSync(item.data.dir);
        });
        return filtered.mergeMap(function (item, idx) {
            //logger.log('item #%s', idx)
            //return rxfs.unlink(item.filename).map ( () => item )
            return rxjs_1.Observable.of(item);
        });
    };
    CacheStream.prototype.fetchExisting = function () {
        var _this = this;
        return this.removeDeleted().mergeMap(function (items) {
            console.log('removed deleted items', items);
            return _this._fetch().filter(function (item) {
                return !!rxfs.existsSync(item.data.dir);
            }).map(function (item) { return create_1.createWithData(item.data); });
        });
    };
    CacheStream.prototype.processCachedComponent = function (componentData) {
        if (!rxfs.existsSync(componentData.data.dir) && !componentData.deleted) {
            logger.log("Component %s does not exist", componentData.filename);
            return rxfs.unlink(componentData.filename).map(function (value) {
                return __assign({}, componentData, { deleted: true });
            });
        }
        return rxjs_1.Observable.of(create_1.createWithData(componentData.data));
    };
    CacheStream.prototype.fetch = function () {
        var _this = this;
        return exports.fetch().flatMap(function (item) {
            return _this.processCachedComponent(item);
        }, 1);
        /*return fetch().filter( item => {
            return !!rxfs.existsSync(item.data.dir)
          } )
        .map ( item => item.data )
        .map ( createWithData )
        .flatMap ( component => Observable.of(component,Scheduler.async) )
        .concat()*/
    };
    CacheStream.prototype.scan = function (pathname) {
        //const targetPath:string = KIO_PATHS.components[pathname]
        var targetPath = env_1.path.join(env_1.KIO_PROJECT_CACHE, 'components', pathname);
        logger.log('targetPath: %s', targetPath);
        return rxfs.readDir(targetPath)
            .catch(function (error) {
            return rxjs_1.Observable.of([]);
        })
            .distinct();
    };
    CacheStream.prototype.prepare = function () {
        return rxjs_1.Observable.of('');
    };
    CacheStream.prototype.deleteComponent = function (component) {
        var cacheDir = resolveComponentsCache(component.typeName);
        var cachePath = resolveComponentsCache(component.typeName, component.name + '.json');
        var exists = rxfs.existsSync(cachePath);
        var source = rxjs_1.Observable.of(false);
        if (exists) {
            source = rxfs.unlink(cachePath);
        }
        return source;
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