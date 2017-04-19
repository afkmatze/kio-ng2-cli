"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var AbstractComponentSource = (function () {
    function AbstractComponentSource() {
        this.isWritable = false;
    }
    AbstractComponentSource.prototype.compareTo = function (otherSource) {
        var _this = this;
        return rxjs_1.Observable.from(AbstractComponentSource.SourcePaths).flatMap(function (sourcePath) {
            return rxjs_1.Observable.forkJoin(_this.readPath(sourcePath), otherSource.readPath(sourcePath)).map(function (_a, idx) {
                var ownFolder = _a[0], otherFolder = _a[1];
                //console.log({ownFolder,otherFolder})
                return {
                    name: sourcePath,
                    items: otherFolder.items.filter(function (item) { return ownFolder.items.indexOf(item) === -1; })
                };
            });
        }).concat(); /*.map ( result => {
          logger.log('%s items missing in %s', result.items.length, result.name )
          return result
        } )*/
    };
    AbstractComponentSource.prototype.readPath = function (pathname) {
        return this.scan(pathname).toArray().map(function (items) { return ({
            name: pathname,
            items: items
        }); });
    };
    return AbstractComponentSource;
}());
AbstractComponentSource.SourcePaths = ['publication', 'structure', 'navigation'];
exports.AbstractComponentSource = AbstractComponentSource;
//# sourceMappingURL=abstract.js.map