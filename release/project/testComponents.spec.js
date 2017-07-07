"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var path = require("path");
var assert_1 = require("../assert");
var env_1 = require("../env");
var stringUtil = require("../utils/string");
var fs_1 = require("../assert/fs");
var kio_ng2_env_1 = require("kio-ng2-env");
var kio_ng2_component_routing_1 = require("kio-ng2-component-routing");
var testComponents = require("./testing/resolve");
var PUBLICATION_COMPONENT_PATH = env_1.resolveRoot(env_1.resolveKioPath('publication'));
var projectEnv;
var envData = require(path.join(process.env.KIO_NG2_PROJECT, path.basename(process.env.KIO_NG2_PROJECT) + '.json'));
var components = envData.components;
var getStore = function () {
    if (projectEnv) {
        return Promise.resolve(projectEnv);
    }
    return kio_ng2_env_1.env().toPromise();
};
var assertComponent = function (component, otherComponents) {
    describe(component.name, function () {
        var componentName = component.name;
        var componentNameDasherized = stringUtil.dasherize(componentName);
        it('has type', function () { assert_1.default(component).toIncludeKey('type'); });
        it('has modifiers', function () { assert_1.default(component).toIncludeKey('modifiers'); });
        component.type === 'fragment' && it('has childTypes', function () { assert_1.default(component).toIncludeKey('childTypes'); });
        describe('query test', function () {
            var componentTypePath = path.join(PUBLICATION_COMPONENT_PATH, component.type);
            var componentFilePath = path.join(componentTypePath, stringUtil.dasherize(component.name));
            var componentCriteriaFile = testComponents.resolveComponentFile(component, 'criteria');
            var componentFixtureFile = testComponents.resolveComponentFile(component, 'fixture');
            var componentFixture = testComponents.componentFixture(component);
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
            var componentFixture = testComponents.componentFixture(component);
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
describe('test component testing', function () {
    before(function () {
        return getStore().then(function (store) {
            projectEnv = store;
        });
    });
    describe('component reading', function () {
        describe('kioEnv', function () {
            it('has globalStore', function () {
                assert_1.default(projectEnv).toExist();
            });
            it('has components', function () {
                assert_1.default(projectEnv.hasKey('components')).toEqual(true);
            });
            it('components', function () {
                var components = projectEnv.get('components');
                assert_1.default(Array.isArray(components)).toEqual(true);
            });
        });
        describe('resolving', function () {
            var TEST_COMPONENT = {
                name: 'TestList',
                type: 'fragment',
                modifiers: ['list'],
                childTypes: ['src', 'txt']
            };
            it("resolves folder name \"" + stringUtil.dasherize(TEST_COMPONENT.name) + "\"", function () {
                var folderName = testComponents.componentFolderName(TEST_COMPONENT);
                assert_1.default(folderName).toEqual(stringUtil.dasherize(TEST_COMPONENT.name));
            });
        });
    });
    before(function () {
        return getStore().then(function (store) {
            components = store.get('components');
        });
    });
    describe(components.length + ' components', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            components.forEach(function (component) {
                assertComponent(component, components);
            });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=testComponents.spec.js.map