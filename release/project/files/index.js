"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxfs = require("../../utils/rx/fs");
var env = require("../../env");
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
exports.list = function (sourcePath) {
    if (sourcePath === void 0) { sourcePath = ''; }
    if (!path.isAbsolute(sourcePath)) {
        sourcePath = env.resolve(sourcePath);
    }
    return rxfs.findFiles(sourcePath)
        .filter(function (filename) { return /\..+$/.test(filename); });
    //.map ( filename => './'+path.relative(env.KIO_PROJECT_ROOT,filename) )
};
exports.publicationComponents = function () {
    return exports.list(env.KIO_PATHS.components.publication)
        .filter(function (filename) { return /.*\.component\.ts$/.test(filename); });
};
exports.structureComponents = function () {
    return exports.list(env.KIO_PATHS.components.structure)
        .filter(function (filename) { return /.*\.component\.ts$/.test(filename); });
};
exports.navigationComponents = function () {
    return exports.list(env.KIO_PATHS.components.navigation)
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
    return exports.list(env.KIO_PATHS.components.publication)
        .filter(function (filename) { return /.*\.component\.fixture\.ts$/.test(filename); });
};
exports.publicationComponentCriterias = function () {
    return exports.list(env.KIO_PATHS.components.publication)
        .filter(function (filename) { return /.*\.component\.criteria\.ts$/.test(filename); });
};
exports.filesForIndexType = function (indexType) {
    return exports.list(exports.resolveRootByIndexType(indexType))
        .filter(filter_1.filterByIndexType(indexType));
    //.map ( logImage('after filter') )
};
//# sourceMappingURL=index.js.map