"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var templates = require("./templates");
var env = require("../env");
var path = require("path");
var buildIndexes_1 = require("./buildIndexes");
exports.createComponentWithCLIArgs = function (args) {
    var name = args.name, contentType = args.contentType, childTypes = args.childTypes, modifiers = args.modifiers;
    var templateData = templates.publicationComponent.mapCLIArgsToTemplateData(args);
    return createComponent(templateData);
};
function createComponent(data) {
    return templates.publicationComponent.render(data)
        .flatMap(function (template, idx) {
        var targetFile = path.join(env.resolveKioPath('publication'), template.filepath);
        return templates.replaceFile(targetFile, template.content);
    })
        .toArray()
        .flatMap(function (list) {
        return list.indexOf(true) > -1 ? buildIndexes_1.buildIndexes({}).toPromise() : rxjs_1.Observable.empty();
    });
}
exports.createComponent = createComponent;
//# sourceMappingURL=createComponent.js.map