"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var kio_ng2_env_1 = require("kio-ng2-env");
var env_1 = require("../env");
var stringUtil = require("../utils/string");
var testing_1 = require("./testing");
/**
 * @brief      resolve component's folder name
 *
 * @param      component  The component
 *
 * @return     dasherized folder name for component
 */
exports.componentFolderName = function (component) {
    return stringUtil.dasherize(component.name);
};
exports.resolveComponentPath = function (component) {
    return path.join(env_1.resolveKioPath('publication'), component.type, exports.componentFolderName(component));
};
exports.resolveComponentFile = function (component, componentFileType) {
    if (componentFileType === void 0) { componentFileType = 'component'; }
    var baseName = path.join(exports.resolveComponentPath(component), exports.componentFolderName(component));
    if (componentFileType === 'component') {
        return [baseName, componentFileType, 'ts'].join('.');
    }
    return [baseName, 'component', componentFileType, 'ts'].join('.');
};
exports.componentFixture = function (component) {
    var fixtureFile = exports.resolveComponentFile(component, 'fixture');
    var fixtureModule = require(env_1.resolveRoot(fixtureFile));
    return fixtureModule.Fixture;
};
exports.listComponents = function () {
    return kio_ng2_env_1.env().map(function (store) { return store.get('components'); });
};
exports.getComponentFixture = function (component) { return exports.resolveComponentFile(component, 'fixture'); };
exports.testComponents = function (projectPath) { return function (args) {
    var targetFilepath = path.join(path.resolve(projectPath, './src/app'), 'ComponentTests.spec.ts');
    console.log('writing spec file at "%s"', targetFilepath);
    return testing_1.renderTests(targetFilepath)
        .map(function (row, idx) {
        console.log('item %s\n----\n', idx, row, '\n----\n');
        return row;
    }).flatMap(function (row) { return testing_1.execTestAt(targetFilepath); });
    /*return Observable.zip(
        files.filesForIndexType(IndexTypes.fixture),
        files.filesForIndexType(IndexTypes.criteria)
      ).toArray()
    */
}; };
//# sourceMappingURL=testComponents.js.map