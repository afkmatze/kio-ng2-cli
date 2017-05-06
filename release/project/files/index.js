"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("rxfs");
var env = require("../../env");
var env_1 = require("../../env");
var path = require("path");
var interfaces_1 = require("../interfaces");
var filter_1 = require("./filter");
exports.resolveRootByIndexType = function (indexType) {
    switch (indexType) {
        case interfaces_1.IndexTypes.publication:
        case interfaces_1.IndexTypes.fixture:
        case interfaces_1.IndexTypes.criteria:
            return env.KIO_PATHS.components.publication;
        case interfaces_1.IndexTypes.structure:
            return env.KIO_PATHS.components.structure;
        case interfaces_1.IndexTypes.navigation:
            return env.KIO_PATHS.components.navigation;
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
exports.filepathFilter = function (filter) {
    if (!Array.isArray(filter))
        return exports.filepathFilter([filter]);
    var filterExpression = function (filter) {
        if ('string' === typeof filter)
            return new RegExp("^" + filter);
        return filter;
    };
    var match = function (filepathOrName) {
        var matchingFilter = filter.find(function (filterItem) {
            return filterExpression(filterItem).test(filepathOrName);
        });
        return !!matchingFilter;
    };
    return function (filepath) {
        if (match(filepath) || match(path.basename(filepath))) {
            return false;
        }
        return true;
    };
};
exports.list = function (sourcePath) {
    var sourceFolder = env.folderSettings(sourcePath);
    if (!path.isAbsolute(sourceFolder.path)) {
        sourceFolder.path = env.resolve(sourceFolder.path);
    }
    //console.log('files at "%s"', sourceFolder.path)
    //console.log('exclude', sourceFolder.exclude)
    return rxfs.find(['-type', 'file'], sourceFolder.path)
        .map(function (streamData) { return streamData.stdout.toString('utf8'); })
        .filter(exports.filepathFilter(sourceFolder.exclude))
        .map(function (filename, idx) {
        //console.log('file #%s', idx, filename, path.join(sourceFolder.path, filename) )
        return path.join(sourceFolder.path, filename);
    })
        .map(assertFile);
    //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
};
exports.kioFiles = function (kioPathType) {
    //console.log('kioFiles for "%s"', kioPathType )
    var settings = env.resolveKioPathSettings(kioPathType);
    var pathTypeNames = Object.keys(env_1.KioComponentsPathTypes).filter(isNaN);
    var excludeFilepaths = pathTypeNames
        .filter(function (key) { return key !== kioPathType; })
        .map(function (key) {
        var p = env.resolveKioPath(key);
        return p;
    })
        .filter(function (filepath) { return settings.path.indexOf(filepath) === -1; });
    //console.log('exclude filepaths', excludeFilepaths )
    //console.log('settings', settings )
    return exports.list(settings).filter(function (filepath) {
        return !excludeFilepaths.find(function (excludeFilepath) {
            return filepath.indexOf(excludeFilepath) > -1;
        });
    });
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
    return exports.list(exports.resolveRootByIndexType(indexType))
        .filter(filter_1.filterByIndexType(indexType));
    //.map ( logImage('after filter') )
};
//# sourceMappingURL=index.js.map