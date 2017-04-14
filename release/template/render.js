"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ejs = require("ejs");
var fs = require("fs");
var path = require("path");
var shelljs_1 = require("shelljs");
var writeFile = function (filename, data) { return new Promise(function (resolve, reject) {
    fs.writeFile(filename, data, { encoding: 'utf8' }, function (error) {
        error ? reject(error) : resolve();
    });
}); };
var readFile = function (filename) { return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (error, result) {
        error ? reject(error) : resolve(result);
    });
}); };
exports.mapTemplateFileName = function (filename, replacement) {
    return path.basename(filename).replace('__name__', replacement);
};
exports.renderComponentTemplates = function (data, sourceDirectory, targetDirectory) {
    return Promise.all(shelljs_1.find(sourceDirectory)
        .filter(function (item) { return !!path.extname(item); })
        .map(function (item) {
        return exports.renderComponentTemplate(data, item, path.join(targetDirectory, exports.mapTemplateFileName(item, data.dasherizedModuleName)));
    }));
};
exports.renderComponentTemplate = function (data, templateFile, targetFile) {
    return readFile(templateFile)
        .then(function (source) { return ejs.render(source, data); })
        .then(function (result) { return writeFile(targetFile, result); });
};
exports.renderIndexTemplate = function (data, templateFile, targetFile) {
    return readFile(templateFile)
        .then(function (source) { return ejs.render(source, data); })
        .then(function (result) { return writeFile(targetFile, result); });
};
//# sourceMappingURL=render.js.map