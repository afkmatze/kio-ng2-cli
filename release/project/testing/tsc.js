"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var rxfs = require("rxfs");
var shelljs = require("shelljs");
exports.evalTsFile = function (filepath) {
    var cp = shelljs.exec("ts-node \"" + filepath + "\"");
    if (cp.stderr) {
        console.error(cp.stderr);
    }
    //console.log('ts result','\n----\n',cp.stdout,'\n----')
    return JSON.parse(cp.stdout);
};
exports.req = function (filepath) {
    var cp = shelljs.exec("tsc \"" + filepath + "\"");
    var transpiledFilepath = filepath.replace(/ts$/, 'js');
    var data = require(transpiledFilepath);
    shelljs.rm(transpiledFilepath);
    return data;
};
var tmpFilename = function (suffix) {
    if (suffix === void 0) { suffix = '.ts'; }
    return [
        'tmp',
        Date.now(),
        Math.floor(Math.random() * 1000)
    ].join('_') + suffix;
};
exports.evalSource = function (source) {
    //const tmpDir = 'tmp_'+Date.now()
    //const tmpDirSrc = path.join(tmpDir,'src')
    //const tmpDirOut = path.join(tmpDir,'out')
    //shelljs.mkdir(tmpDir)
    //shelljs.mkdir(tmpDirSrc)
    //shelljs.mkdir(tmpDirOut)
    //const tmpFile = path.join(tmpDirSrc,tmpFilename())
    var tmpFile = tmpFilename();
    //console.log('write tmp file: "%s"',tmpFile,'\n',source)
    return rxfs.writeFile(tmpFile, rxjs_1.Observable.of(new Buffer(source)), 'utf8')
        .map(function (success) { return exports.evalTsFile(tmpFile); })
        .map(function (data) {
        //shelljs.rm(tmpFile)
        //console.log('removed tmp file: "%s"',tmpFile,'\n---\n',data)
        return data;
    });
    /*return rxfs.writeFile(tmpFile,Observable.of(new Buffer(source)),'utf8')
        .flatMap ( success => {
          return Observable.of(req ( tmpFile ))
        } )
        .map ( data => {
          shelljs.rm(tmpFile)
          console.log('removed tmp file: "%s"',tmpFile)
          return data
        } )*/
};
exports.renderSourceGroup = function (sourceFiles) {
    var sourceImports = sourceFiles.map(function (sourceFile) { return "import * as " + sourceFile.key + " from '" + sourceFile.filepath.replace(/\.ts$/, '') + "';"; }).join('\n');
    var sourceExportsKeys = sourceFiles.map(function (sourceFile) { return sourceFile.key; });
    return sourceImports + "\nconsole.log(JSON.stringify({" + sourceExportsKeys.join(',') + "}))\n";
};
exports.reqGroup = function (filepaths) {
    var sourceFiles = filepaths.map(function (filepath, idx) {
        var key = 'item' + idx;
        return {
            key: key,
            filepath: filepath
        };
    });
    return exports.evalSource(exports.renderSourceGroup(sourceFiles))
        .map(function (sourceData) {
        return sourceFiles.map(function (sourceFile, idx) {
            var sourceKey = 'item' + idx;
            return sourceData[sourceKey];
        });
    });
};
/*
export const reqAsync = <T>( filepath:string ):Observable<T> => {
  return rxshell.exec('tsc ' + filepath).flatMap ( data => {
    if ( data.stdout )
    {
      console.log('stdout::%s',data.stdout)
      return Observable.of(data.stdout.toString('utf8'))
    }
    else {
      console.error('failed to require async: %s',filepath)
      Observable.throw(Error(data.stderr.toString('utf8')))
    }
  }).map ( rows => {
    const transpiledFilepath = filepath.replace(/ts$/,'js')
    const data = require(transpiledFilepath)
    shelljs.rm(transpiledFilepath)
    return data
  } )
}*/ 
//# sourceMappingURL=tsc.js.map