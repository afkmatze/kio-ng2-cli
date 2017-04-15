"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ejs = require("ejs");
var env = require("../env");
var files_1 = require("./files");
__export(require("./read"));
exports.createTemplate = function (templateName, targetDir) {
    var templateFiles = {
        templateName: templateName,
        targetDir: targetDir,
        files: files_1.getTemplateFiles(templateName)
    };
    return exports.readTemplate(templateFiles);
};
exports.readTemplate = function (templateFiles) {
    templateFiles.files.forEach(function (file) {
        files_1.readTemplateFile(templateFiles, file);
    });
    return templateFiles;
};
exports.renderTemplate = function (templateFiles, data) {
    templateFiles.files.forEach(function (file) {
        file.rendered = ejs.render(file.source, data);
    });
    return templateFiles;
};
exports.writeTemplate = function (templateFiles) {
    templateFiles.files.forEach(function (file) {
        var target = path.join(env.resolve(templateFiles.targetDir), file.filename);
        console.log('write template to "%s"', target);
    });
    return templateFiles;
};
exports.renderIndex = function (index) {
    return null;
    /*const result:TemplateFile[] = read.getFiles('index')
    result.files.forEach( file => {
      read.readTemplateFile(result,file)
      file.rendered = ejs.render(file.source,index)
    })
  
    return result.files.map ( file => file.rendered )*/
};
exports.renderPublicationComponent = function (data) {
    return null;
    /*const result:TemplateFiles = read.getFiles(data.contentType)
    result.files.forEach ( file => {
      read.readTemplateFile(result,file)
      file.rendered = ejs.render(file.source,data)
    } )
    return result.files.map ( file => file.rendered )*/
};
//# sourceMappingURL=index.js.map