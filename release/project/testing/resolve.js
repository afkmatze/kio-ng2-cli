"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("../../env");
var tsc_1 = require("./tsc");
var kio_ng2_env_1 = require("kio-ng2-env");
var path = require("path");
var stringUtil = require("../../utils/string");
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
exports.getComponentFixture = function (component) {
    var fixtureFile = exports.resolveComponentFile(component, 'fixture');
    var fixtureModule = tsc_1.req(env_1.resolveRoot(fixtureFile));
    return fixtureModule.Fixture;
};
exports.getComponentFixtures = function (components) {
    return tsc_1.reqGroup(components.map(function (component) {
        var fixtureFile = exports.resolveComponentFile(component, 'fixture');
        return env_1.resolveRoot(fixtureFile);
    })).map(function (contents) { return contents.map(function (content) { return content.Fixture; }); });
};
exports.listComponents = function () {
    return kio_ng2_env_1.env().map(function (store) { return store.get('components'); });
};
exports.getComponentFixtureFile = function (component) { return exports.resolveComponentFile(component, 'fixture'); };
//# sourceMappingURL=resolve.js.map