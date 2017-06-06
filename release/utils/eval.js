"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs = require("shelljs");
var path = require("../env/path");
var env = require("../env/constants");
var childprocess = require("child_process");
exports.shellCheck = function (testFlag, value) {
    return shelljs.exec("[[ " + testFlag + " \"" + value + "\" ]]").code === 0;
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
    var tmp_outpath = path.resolve(env.resolveProjectCache(), 'tsc-out');
    if (recompile || !exports.shellCheck('-d ', tmp_outpath)) {
        var cp = shelljs.exec("tsc --outDir \"" + tmp_outpath + "\"", {
            cwd: env.KIO_PROJECT_ROOT,
            async: false
        });
        if (cp.stderr) {
            throw Error(cp.stderr.toString());
        }
    }
    return tmp_outpath;
};
exports.evalFile = function (filename, pwd) {
    /*const relFilepath:string = env.relative(filename).replace(/\.ts$/,'')
    const tname = 'eval '+path.basename(filename)
    console.time(tname)
    const cmd = `ts-node -p "JSON.stringify(require('./${relFilepath}'),null,'  ')"`
    const tsEval = shelljs.exec(cmd,{
      cwd: env.KIO_PROJECT_ROOT
    }).stdout
    const data = JSON.parse(<string>tsEval)
    console.timeEnd(tname)
    return data*/
    filename = env.relative(filename);
    var outpath = exports.evalProject();
    /*childprocess.execSync(`tsc "${env.resolve(filename)}" --outDir "${outpath}"`,{
      cwd: env.KIO_PROJECT_ROOT
    })*/
    var compiledFile = path.resolve(outpath, filename).replace(/\.ts$/, '.js');
    var moduleData = require(compiledFile);
    //shelljs.rm('-rf',outpath)
    return moduleData;
};
//# sourceMappingURL=eval.js.map