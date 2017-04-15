"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert_1 = require("./assert");
var fs_1 = require("./assert/fs");
var components_1 = require("./components");
var api = require("./api");
var fs = require("fs");
var env = require("./env/constants");
var cache = require("./cache");
var template_1 = require("./indexes/template");
var template = require("./template");
var NUM_PUBLICATION_COMPONENTS; // = fs.readdirSync(cache.resolve('components','publication')).filter(item=>/^\./.test(item)===false).length
var NUM_STRUCTURE_COMPONENTS; // = fs.readdirSync(cache.resolve('components','structure')).filter(item=>/^\./.test(item)===false).length
var NUM_NAVIGATION_COMPONENTS; // = fs.readdirSync(cache.resolve('components','navigation')).filter(item=>/^\./.test(item)===false).length
var readCounts = function () {
    NUM_PUBLICATION_COMPONENTS = fs.readdirSync(cache.resolve('components', 'publication')).filter(function (item) { return /^\./.test(item) === false; }).length;
    NUM_STRUCTURE_COMPONENTS = fs.readdirSync(cache.resolve('components', 'structure')).filter(function (item) { return /^\./.test(item) === false; }).length;
    NUM_NAVIGATION_COMPONENTS = fs.readdirSync(cache.resolve('components', 'navigation')).filter(function (item) { return /^\./.test(item) === false; }).length;
};
var assertComponentType = function (componentType) {
    if (componentType === 'structure' || componentType === 'navigation') {
        return function (component) {
            assert_1.default(component).toBeA(components_1.Component);
            assert_1.default(component instanceof components_1.PublicationComponent).toEqual(false, "expected " + component.toString() + " of type " + componentType + " to be not an instance of " + component.constructor.name);
        };
    }
    return function (component) {
        assert_1.default(component).toBeA(components_1.PublicationComponent);
    };
};
var assertIndex = function (indexName) {
    describe(indexName + ' index', function () {
        var index = api.getIndex(indexName);
        var exportName = indexName.slice(0, 1).toUpperCase() + indexName.slice(1);
        var indexFilename = api.getIndexFilePath(indexName);
        it('renders index "' + exportName + '"', function () {
            var result = api.renderIndex(indexName);
            assert_1.default(result).toContain("export const " + exportName);
            //logger.log('rendered template: \n' , result.join('\n'))           
        });
        it("writes index to \"" + indexFilename + "\"", function () {
            api.writeIndex(indexName);
            fs_1.default(indexFilename).toBeAFile();
        });
    });
};
describe('test api', function () {
    describe('cache', function () {
        it('is reset', function () {
            cache.clear();
            fs_1.default(env.KIO_PROJECT_CACHE).toNotBeDirectory();
        });
        describe('components cache', function () {
            it('is created', function () {
                return cache.create("components")
                    .then(function (items) {
                    fs_1.default(env.KIO_PROJECT_ROOT).toBeADirectory();
                });
            });
        });
    });
    before(function () {
        return cache.create("components")
            .then(function () {
            return readCounts();
        });
    });
    describe('find components', function () {
        it("has structure components", function () {
            var comps = api.getComponents('structure');
            assert_1.default(comps.length).toEqual(NUM_STRUCTURE_COMPONENTS);
            comps.forEach(assertComponentType('structure'));
        });
        it("has navigation components", function () {
            var comps = api.getComponents('navigation');
            assert_1.default(comps.length).toEqual(NUM_NAVIGATION_COMPONENTS);
            comps.forEach(assertComponentType('navigation'));
        });
        it("has publication components", function () {
            var comps = api.getComponents('publication');
            assert_1.default(comps.length).toEqual(NUM_PUBLICATION_COMPONENTS);
            comps.forEach(assertComponentType('publication'));
        });
    });
    describe('compose index', function () {
        describe('publication', function () {
            describe('components', function () {
                var publicationIndex = api.getIndex('publication');
                it('has components', function () {
                    assert_1.default(publicationIndex.components).toBeAn(Array);
                    assert_1.default(publicationIndex.components.length).toEqual(NUM_PUBLICATION_COMPONENTS);
                });
                it('all components are publication components', function () {
                    publicationIndex.components.forEach(assertComponentType('publication'));
                });
                it('template fits', function () {
                    var data = template_1.dataForIndex(publicationIndex);
                    assert_1.default(data.components).toHaveLength(publicationIndex.components.length);
                    var tmpl = template.getFiles('index');
                    assert_1.default(tmpl).toHaveLength(1);
                });
            });
            describe('fixtures', function () {
                var publicationIndex = api.getIndex('fixture');
                it('has components', function () {
                    assert_1.default(publicationIndex.components).toBeAn(Array);
                    assert_1.default(publicationIndex.components.length).toNotBe(0);
                });
                it('all components are publication components', function () {
                    publicationIndex.components.forEach(assertComponentType('publication'));
                });
            });
            describe('criterias', function () {
                var publicationIndex = api.getIndex('criteria');
                it('has components', function () {
                    assert_1.default(publicationIndex.components).toBeAn(Array);
                    assert_1.default(publicationIndex.components.length).toNotBe(0);
                });
                it('all components are publication components', function () {
                    publicationIndex.components.forEach(assertComponentType('publication'));
                });
            });
        });
        describe('structure', function () {
            var structureIndex = api.getIndex('structure');
            it('has components', function () {
                assert_1.default(structureIndex.components).toBeAn(Array);
                assert_1.default(structureIndex.components.length).toNotBe(0);
            });
            it('all components are structure components', function () {
                structureIndex.components.forEach(assertComponentType('structure'));
            });
        });
        describe('navigation', function () {
            var navigationIndex = api.getIndex('navigation');
            it('has components', function () {
                assert_1.default(navigationIndex.components).toBeAn(Array);
                assert_1.default(navigationIndex.components.length).toNotBe(0);
            });
            it('all components are navigation components', function () {
                navigationIndex.components.forEach(assertComponentType('navigation'));
            });
        });
    });
    describe('template rendering', function () {
        describe('index templates', function () {
            /*
                  describe('navigation components',()=>{
            
                    const index = api.getIndex('navigation')
            
                     it('renders index',()=>{
                       const result = api.renderIndex('navigation')
                       expect(result).toMatch(/export const NavigationComponents/)
                       //logger.log('rendered template: \n' , result.join('\n'))
                     })
            
                     it('writes index',()=>{
            
                     })
            
                  })
            
            */
            assertIndex('navigation');
            assertIndex('structure');
            assertIndex('publication');
            assertIndex('fixture');
            assertIndex('criteria');
        });
    });
});
//# sourceMappingURL=api.spec.js.map