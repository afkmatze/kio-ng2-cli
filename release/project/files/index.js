"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var env = require("../../env");
var env_1 = require("../../env");
var path = require("path");
var interfaces_1 = require("../interfaces");
var filter_1 = require("./filter");
var console_1 = require("../../console");
var debug = console_1.createDebugger({
    debugKey: 'files'
});
exports.resolveRootByIndexType = function (indexType) {
    switch (indexType) {
        case interfaces_1.IndexTypes.publication:
        case interfaces_1.IndexTypes.fixture:
        case interfaces_1.IndexTypes.criteria:
            return "publication";
        case interfaces_1.IndexTypes.structure:
            return "structure";
        case interfaces_1.IndexTypes.navigation:
            return "navigation";
    }
};
/*
interface matcher {
  (str:string):boolean
}

const logComponent = ( m:matcher ) => {

  return ( label:string ) => {
    return ( sourcePath:string, index?:number ) => {
      if ( m (sourcePath) )
      {
        console.log('-----\n%s - %s source path\n%s', label, index||'' , sourcePath)
      }
      return sourcePath
    }
  }
}

const logImage = logComponent(val => /simple\-image/.test(val))*/
var prevFile;
var assertFile = function (file, idx) {
    if (!rxfs.existsSync(file)) {
        console.log('prevFile: ', prevFile);
        throw Error(file + " does not exist");
    }
    //console.log('file #%s', idx, file )
    prevFile = file;
    return file;
};
exports.filepathFilter = function (filter, include) {
    if (include === void 0) { include = false; }
    if (!Array.isArray(filter))
        return exports.filepathFilter([filter]);
    var filterExpression = function (filter) {
        if ('string' === typeof filter)
            return new RegExp(filter);
        return filter;
    };
    //  const doDebug = filter.indexOf ( 'abstract' ) > -1
    var match = function (filepathOrName) {
        var matchingFilter = filter.find(function (filterItem, idx) {
            var expr = filterExpression(filterItem);
            var result = expr.test(filepathOrName);
            //      doDebug && console.log('expr: %s', idx, expr )
            //include && debug('%s.test(%s) = %s', expr, filepathOrName, (result ? 'true' : 'false'))
            return result;
        });
        //    doDebug && console.log('test match for "%s"', filepathOrName )
        //    doDebug && console.log('matching: ', matchingFilter )
        return !matchingFilter === include;
    };
    //debug('filter: %s', filter )
    return function (filepath) {
        //    doDebug && console.log('filepath', filepath)
        if (match(filepath) || match(path.basename(filepath))) {
            //debug('matched: %s', filepath )
            return false;
        }
        //debug('not matched: %s', filepath )
        return true;
    };
};
exports.list = function (sourcePath) {
    var sourceFolder = env.folderSettings(sourcePath);
    if (!path.isAbsolute(sourceFolder.path)) {
        sourceFolder.path = env.resolve(sourceFolder.path);
    }
    //debug('files at "%s"', sourceFolder.path)
    //console.log('exclude', sourceFolder.exclude)
    var source = rxfs.find(['-type', 'file'], sourceFolder.path)
        .map(function (streamData) { return streamData.stdout.toString('utf8'); })
        .filter(exports.filepathFilter(sourceFolder.exclude))
        .map(function (filename, idx) {
        //console.log('file #%s', idx, filename, path.join(sourceFolder.path, filename) )
        return path.join(sourceFolder.path, filename);
    })
        .map(assertFile);
    //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
    if (sourceFolder.include) {
        return source.filter(exports.filepathFilter(sourceFolder.include, true));
    }
    return source;
};
exports.kioFiles = function (kioPathType) {
    debug('kioFiles for "%s"', kioPathType);
    var settings = env.resolveKioPathSettings(kioPathType);
    var pathTypeNames = Object.keys(env_1.KioComponentsPathTypes).filter(isNaN);
    var excludeKeys = pathTypeNames.filter(function (key) { return key !== kioPathType; });
    debug('other path type names "%s"', excludeKeys);
    var excludeFilepaths = excludeKeys
        .map(function (key) {
        var p = env.resolveKioPath(key);
        return p;
    })
        .filter(function (filepath) {
        return filepath.indexOf(settings.path) !== -1;
    })
        .map(function (filepath) { return env.resolve(filepath); });
    debug('excludeFilepaths "%s"', excludeFilepaths.join('\n'));
    settings.exclude = settings.exclude.concat(excludeFilepaths);
    debug('settings - \npath: %s\nexclude: %s', settings.path, settings.exclude);
    //console.log('exclude filepaths', excludeFilepaths )
    //console.log('settings', settings )
    var listSource = exports.list(settings)
        .filter(function (filepath) {
        var fp = excludeFilepaths.find(function (excludeFilepath) { return filepath.indexOf(excludeFilepath) !== -1; });
        return !fp;
    });
    listSource.share()
        .map(function (fp) { return path.relative(process.cwd(), fp); })
        .toArray().subscribe(function (files) {
        debug('%s files for \x1b[1;34m%s\x1b[0m', files.length, kioPathType);
    });
    return listSource;
};
exports.publicationComponents = function () {
    return exports.kioFiles("publication")
        .filter(function (filename) { return /.*\.component\.ts$/.test(filename); });
};
exports.structureComponents = function () {
    return exports.kioFiles("structure")
        .filter(function (filename) { return /.*\.component\.ts$/.test(filename); });
};
exports.navigationComponents = function () {
    return exports.kioFiles("navigation")
        .filter(function (filename) { return /.*\.component\.ts$/.test(filename); });
};
exports.publicationComponentFiles = function () {
    return exports.publicationComponents()
        .map(function (filename) {
        return path.dirname(filename);
    })
        .distinct()
        .flatMap(function (dirpath) { return exports.list(dirpath).toArray(); });
};
exports.publicationComponentFixtures = function () {
    return exports.kioFiles("publication")
        .filter(function (filename) { return /.*\.component\.fixture\.ts$/.test(filename); });
};
exports.publicationComponentCriterias = function () {
    return exports.kioFiles("publication")
        .filter(function (filename) { return /.*\.component\.criteria\.ts$/.test(filename); });
};
exports.filesForIndexType = function (indexType) {
    return exports.kioFiles(exports.resolveRootByIndexType(indexType))
        .filter(filter_1.filterByIndexType(indexType));
    //.map ( logImage('after filter') )
};
//# sourceMappingURL=index.js.map