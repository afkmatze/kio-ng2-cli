"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var assert_1 = require("../../assert");
var fs_1 = require("../../assert/fs");
var reporting_1 = require("../../assert/reporting");
var kio_ng2_component_routing_1 = require("kio-ng2-component-routing");
var path = require("path");
var resolve_1 = require("./resolve");
var env_1 = require("../../env");
var stringUtil = require("../../utils/string");
var resolve_2 = require("./resolve");
var logger = require("../../console");
var PUBLICATION_COMPONENT_PATH = env_1.resolveRoot(env_1.resolveKioPath('publication'));
var TestRunner = (function () {
    function TestRunner(components) {
        this.components = components;
    }
    Object.defineProperty(TestRunner.prototype, "fixtures", {
        get: function () {
            var _this = this;
            if (this._fixtures) {
                return rxjs_1.Observable.from(this._fixtures);
            }
            return resolve_1.getComponentFixtures(this.components).map(function (fixtures) {
                _this._fixtures = fixtures.map(function (fixture, idx) { return ({
                    componentName: _this.components[idx].name,
                    fixture: fixture
                }); });
                return _this._fixtures;
            })
                .concatMap(function (fixtures) { return rxjs_1.Observable.from(fixtures); });
        },
        enumerable: true,
        configurable: true
    });
    TestRunner.prototype.getComponentForFixture = function (fixture) {
        return this.components.find(function (c) { return c.name === fixture.componentName; });
    };
    TestRunner.prototype.mapFixtureToTest = function (testFixture) {
        return {
            component: this.getComponentForFixture(testFixture),
            fixture: testFixture.fixture
        };
    };
    Object.defineProperty(TestRunner.prototype, "componentTests", {
        get: function () {
            var _this = this;
            return this.fixtures.map(function (testFixture) { return _this.mapFixtureToTest(testFixture); });
        },
        enumerable: true,
        configurable: true
    });
    TestRunner.prototype.testComponent = function (component) {
        logger.log('Testing component "%s"', component.name);
    };
    TestRunner.prototype.run = function () {
        return this.fixtures.toArray()
            .map(function (testFixtures) {
            return testFixtures.length + " test fixtures";
        });
    };
    TestRunner.prototype.assertComponent = function (component) {
        var otherComponents = this.components;
        logger.log('Asserting component "%s"', component.name);
        var componentFixtureTest = this._fixtures.find(function (fixture) { return fixture.componentName === component.name; });
        var componentFixture = componentFixtureTest.fixture;
        console.log('fixture', componentFixture);
        reporting_1.describe(component.name, function () {
            var componentName = component.name;
            var componentNameDasherized = stringUtil.dasherize(componentName);
            reporting_1.it('has type', function () { assert_1.default(component).toIncludeKey('type'); });
            reporting_1.it('has modifiers', function () { assert_1.default(component).toIncludeKey('modifiers'); });
            component.type === 'fragment' && reporting_1.it('has childTypes', function () { assert_1.default(component).toIncludeKey('childTypes'); });
            var componentTypePath = path.join(PUBLICATION_COMPONENT_PATH, component.type);
            var componentFilePath = path.join(componentTypePath, stringUtil.dasherize(component.name));
            var componentCriteriaFile = resolve_2.resolveComponentFile(component, 'criteria');
            var componentFixtureFile = resolve_2.resolveComponentFile(component, 'fixture');
            reporting_1.describe('query test', function () {
                reporting_1.it('is queryable', function () {
                    assert_1.default(kio_ng2_component_routing_1.isQueryableAnnotation(component) || kio_ng2_component_routing_1.isQueryableFragmentAnnotation(component)).toEqual(true);
                });
                reporting_1.it("criteria exists \"" + componentCriteriaFile + "\"", function () {
                    fs_1.default(env_1.resolveRoot(componentCriteriaFile)).toExist();
                });
                reporting_1.it("fixture exists \"" + componentFixtureFile + "\"", function () {
                    fs_1.default(env_1.resolveRoot(componentFixtureFile)).toExist();
                });
                reporting_1.it("can resolve fixture at \"" + componentFixtureFile + "\"", function () {
                    assert_1.default(componentFixture).toExist();
                });
                reporting_1.it('fixture matches criteria', function () {
                    console.log('componentFixture', componentFixture);
                    console.log('component', component);
                    var queryResult = kio_ng2_component_routing_1.Query.assertComponent(component)(componentFixture);
                    assert_1.default(queryResult).toNotExist(queryResult ? queryResult.join('\n') : undefined);
                });
            });
            /*
                  otherComponents && describe('interference tests',()=>{
            
                    otherComponents.forEach ( otherComponent => {
                      if ( otherComponent !== component )
                      {
                        it(`does not interfere with "${otherComponent.name}"`, () => {
                          
                          const queryResult = Query.assertComponent(otherComponent)(componentFixture)
                          expect(Array.isArray(queryResult)).toBeTrue('queryResult should be an array.')
                        })
                      }
                    } )
            
                  })
            */
        });
    };
    return TestRunner;
}());
exports.TestRunner = TestRunner;
//# sourceMappingURL=Runner.class.js.map