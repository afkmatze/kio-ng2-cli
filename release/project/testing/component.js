"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var rxjs_1 = require("rxjs");
var assert_1 = require("../../assert");
var fs_1 = require("../../assert/fs");
var path = require("path");
var kio_ng2_component_routing_1 = require("kio-ng2-component-routing");
var env_1 = require("../../env");
var file_class_1 = require("../../env/file.class");
var stringUtil = require("../../utils/string");
var resolve_1 = require("./resolve");
var PUBLICATION_COMPONENT_PATH = env_1.resolveRoot(env_1.resolveKioPath('publication'));
var ComponentTests = (function () {
    function ComponentTests(projectPath) {
        this.projectPath = projectPath;
        if (!projectPath) {
            throw Error('project path is undefined.');
        }
        this.env = file_class_1.EnvFile.FromProjectPath(projectPath);
        this.components = rxjs_1.Observable.from(this.env.components);
    }
    ComponentTests.prototype.assertComponent = function (component) {
        var otherComponents = this.env.components;
        describe(component.name, function () {
            var componentName = component.name;
            var componentNameDasherized = stringUtil.dasherize(componentName);
            it('has type', function () { assert_1.default(component).toIncludeKey('type'); });
            it('has modifiers', function () { assert_1.default(component).toIncludeKey('modifiers'); });
            component.type === 'fragment' && it('has childTypes', function () { assert_1.default(component).toIncludeKey('childTypes'); });
            describe('query test', function () {
                var componentTypePath = path.join(PUBLICATION_COMPONENT_PATH, component.type);
                var componentFilePath = path.join(componentTypePath, stringUtil.dasherize(component.name));
                var componentCriteriaFile = resolve_1.resolveComponentFile(component, 'criteria');
                var componentFixtureFile = resolve_1.resolveComponentFile(component, 'fixture');
                var componentFixture = resolve_1.getComponentFixture(component);
                it('is queryable', function () {
                    assert_1.default(kio_ng2_component_routing_1.isQueryableAnnotation(component) || kio_ng2_component_routing_1.isQueryableFragmentAnnotation(component)).toEqual(true);
                });
                it("criteria exists \"" + componentCriteriaFile + "\"", function () {
                    fs_1.default(env_1.resolveRoot(componentCriteriaFile)).toExist();
                });
                it("fixture exists \"" + componentFixtureFile + "\"", function () {
                    fs_1.default(env_1.resolveRoot(componentFixtureFile)).toExist();
                });
                it("can resolve fixture at \"" + componentFixtureFile + "\"", function () {
                    assert_1.default(componentFixture).toExist();
                });
                it('fixture matches criteria', function () {
                    var queryResult = kio_ng2_component_routing_1.Query.assertComponent(component)(componentFixture);
                    assert_1.default(queryResult).toNotExist(queryResult ? queryResult.join('\n') : undefined);
                });
            });
            otherComponents && describe('interference tests', function () {
                var componentFixture = resolve_1.getComponentFixture(component);
                otherComponents.forEach(function (otherComponent) {
                    if (otherComponent !== component) {
                        it("does not interfere with \"" + otherComponent.name + "\"", function () {
                            var queryResult = kio_ng2_component_routing_1.Query.assertComponent(otherComponent)(componentFixture);
                            assert_1.default(Array.isArray(queryResult)).toBeTrue('queryResult should be an array.');
                        });
                    }
                });
            });
        });
    };
    return ComponentTests;
}());
exports.ComponentTests = ComponentTests;
//# sourceMappingURL=component.js.map