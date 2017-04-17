"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var create_1 = require("../../create");
var env_1 = require("../../../env");
var fs_1 = require("../../../utils/rx/fs");
var logger = require("../../../console");
var MAX_AGE = 120 * 1000;
var logMap = function (value, idx) {
    console.log('value %s', idx, value);
    return value;
};
var logMapLabel = function (label) { return function (value, idx) {
    console.log('%s #%s', label, idx);
    console.log('---\n', value, '\n---');
    return value;
}; };
exports.fetch = function () { return fs_1.readdir(env_1.path.join(env_1.KIO_PROJECT_CACHE, 'components'))
    .filter(function (item) { return env_1.path.extname(item) === '.json'; })
    .flatMap(function (filename) { return fs_1.readfile(filename, true).map(function (value) { return JSON.parse(value); }); }); };
var TSC_OUT = env_1.path.join(env_1.KIO_PROJECT_CACHE, 'tsc-out');
var TSCStream = (function () {
    function TSCStream() {
        this.isWritable = false;
        this.isCompiling = false;
    }
    TSCStream.prototype.exists = function () {
        return true;
    };
    // date of last compilation
    TSCStream.prototype.getLastCompilation = function () {
        return rxjs_1.Observable.fromPromise(fs_1.findFiles(TSC_OUT, /\.js$/).take(1).toPromise()
            .then(function (firstFile) { return fs_1.readstats(firstFile).toPromise(); })
            .then(function (stat) { return stat.mtime.getTime(); })
            .catch(function (error) {
            //console.log('error on last compilation', error )
            return 0;
        }));
    };
    TSCStream.prototype.shouldRefresh = function () {
        return this.getLastCompilation().map(function (ts) { return !ts || (Date.now() - ts > MAX_AGE && MAX_AGE > 0); });
    };
    TSCStream.prototype.compile = function () {
        var _this = this;
        if (this.compiles)
            return this.compiles;
        logger.log('recompile');
        var obs = fs_1.exec("tsc --outDir \"" + env_1.path.relative(env_1.KIO_PROJECT_ROOT, TSC_OUT) + "\"", {
            cwd: env_1.KIO_PROJECT_ROOT
        }).map(function (item) { return item.stdout.toString('utf8'); })
            .flatMap(function (error) {
            logger.logError("" + error, false);
            return rxjs_1.Observable.fromPromise(Promise.reject(error));
        });
        obs.toPromise().then(function () {
            logger.log('compiled to "%s"', TSC_OUT);
            _this.lastCompiled = rxjs_1.Observable.of(Date.now());
            _this.compiles = null;
        });
        this.compiles = obs;
        return rxjs_1.Observable.concat(obs, this.findComponentDirs());
    };
    TSCStream.prototype.evalComponentFile = function (component, filename) {
        var relpath = env_1.path.relative(env_1.KIO_PROJECT_ROOT, filename);
        var targetPath = env_1.path.join(TSC_OUT, relpath).replace(/\.ts$/, '.js');
        return fs_1.evalJS(targetPath);
    };
    TSCStream.prototype.findComponentDirs = function () {
        return rxjs_1.Observable.from(Object.keys(env_1.KIO_PATHS.components).map(function (key) { return env_1.KIO_PATHS.components[key]; }))
            .flatMap(function (filepath) {
            return fs_1.findFiles(filepath, /\.component\.*/).map(function (filename) { return env_1.path.dirname(filename); });
        })
            .distinct();
        //.map ( logMapLabel('merged') )
    };
    TSCStream.prototype.readComponent = function (componentPath) {
        var _this = this;
        return rxjs_1.Observable.of(create_1.createWithPath(componentPath))
            .flatMap(function (component) {
            var criteriaFile = component.getFile('criteria');
            if (criteriaFile) {
                var pubComponent_1 = component;
                return _this.evalComponentFile(component, criteriaFile)
                    .map(function (criteriaModule) {
                    pubComponent_1.modifiers = criteriaModule.Criteria.modifiers;
                    pubComponent_1.childTypes = criteriaModule.Criteria.childTypes;
                    return pubComponent_1;
                });
            }
            return rxjs_1.Observable.of(component);
        });
    };
    TSCStream.prototype.prepare = function () {
        var _this = this;
        return this.getLastCompilation()
            .map(function (ts) { return Date.now() - ts; })
            .flatMap(function (d) { return d > MAX_AGE ? _this.compile() : _this.findComponentDirs(); });
    };
    TSCStream.prototype.fetch = function () {
        var _this = this;
        return this.prepare().flatMap(function (filepath) { return _this.readComponent(filepath); });
    };
    return TSCStream;
}());
exports.TSCStream = TSCStream;
exports.default = new TSCStream();
//# sourceMappingURL=stream.js.map