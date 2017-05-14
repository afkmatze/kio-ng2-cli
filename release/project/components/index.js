"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kio_ng2_1 = require("kio-ng2");
var string_1 = require("../../utils/string");
var env = require("../../env");
var path = require("path");
var rxfs_1 = require("rxfs");
var templates = require("../templates");
exports.isNamedFragmentComponentStructure = function (other) {
    return ('modifiers' in other
        &&
            'childTypes' in other);
};
exports.writeNamedComponent = function (namedComponent) {
    var typeName = kio_ng2_1.KioNodeType[namedComponent.type];
    var targetParentDir = path.join(env.resolveKioPath('publication'), typeName);
    var targetName = string_1.dasherize(namedComponent.name);
    var targetDir = path.join(targetParentDir, targetName);
    if (rxfs_1.existsSync(targetDir)) {
        throw Error("target \"" + targetDir + "\" already exists.");
    }
    throw "TODO: Typings for rendering";
    var parentComponent = string_1.classify(typeName) + (typeName === 'fragment' ? '' : 'Content') + 'Component';
    templates.publicationComponent.render({
        name: namedComponent.name,
        childTypes: (exports.isNamedFragmentComponentStructure(namedComponent) ? namedComponent.childTypes : []),
        modifiers: namedComponent.modifiers,
        contentType: namedComponent.type,
        selector: 'kio-' + targetName,
        classifiedModuleName: string_1.classify(namedComponent.name),
        dasherizedModuleName: targetName,
        classifiedParentComponentName: string_1.classify(parentComponent),
        dasherizedParentComponentPath: string_1.dasherize(parentComponent)
    });
};
//# sourceMappingURL=index.js.map