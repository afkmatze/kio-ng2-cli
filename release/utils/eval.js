"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
var path = require("path");
var env = require("../env/constants");
var childprocess = require("child_process");
exports.shellCheck = function (testFlag, value) {
    return shelljs.exec("[[ " + testFlag + " " + value + " ]]").code === 0;
};
var compileTarget = function (filename) {
    var tmpFile = 'tmp' + Date.now() + '.' + path.basename(filename);
    childprocess.execSync('tsc ' + filename + ' --outFile ' + tmpFile, {
        cwd: env.KIO_PROJECT_ROOT
    });
    return tmpFile;
};
exports.evalProject = function (recompile) {
    if (recompile === void 0) { recompile = false; }
    var tsconf = require(env.resolve('./tsconfig.json'));
    var compilerOpts = tsconf.compilerOptions;
    var outpath = env.resolve(compilerOpts.outDir);
    if (recompile || !exports.shellCheck('-d ', outpath)) {
        childprocess.execSync('tsc', {
            cwd: env.resolve('./')
        });
    }
    return outpath;
};
exports.evalFile = function (filename, pwd) {
    var outpath = exports.evalProject();
    var compiledFile = path.join(outpath, filename.replace(env.KIO_PROJECT_ROOT, '.')).replace(/\.ts$/, '.js');
    var moduleData = require(compiledFile);
    return moduleData;
};
//# sourceMappingURL=eval.js.map