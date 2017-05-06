"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var fs_1 = require("./assert/fs");
var env = require("./env");
var rxfs = require("rxfs");
var project = require("./project");
process.env.KIO_NG2_PROJECT = env.path.resolve(__dirname, '../test_target');
/*export const assertRendering = ( componentFilePath:string ) => {

}
*/
exports.assertEnv = function (env) {
    describe('test project env', function () {
        describe('test path names', function () {
            it("has value for MACHINE_ROOT (" + env.MACHINE_ROOT + ")", function () { return ceylon_1.default(env).toContainKey('MACHINE_ROOT'); });
            it("has valid path for MACHINE_ROOT", function () { return fs_1.default(env.MACHINE_ROOT).toBeADirectory(); });
            it("has value for KIO_PROJECT_ROOT (" + env.KIO_PROJECT_ROOT + ")", function () { return ceylon_1.default(env).toContainKey('KIO_PROJECT_ROOT'); });
            it("has valid path for KIO_PROJECT_ROOT", function () { return fs_1.default(env.KIO_PROJECT_ROOT).toBeADirectory(); });
            //it(`has value for KIO_PROJECT_CACHE (${env.KIO_PROJECT_CACHE})`,()=>expect(env).toContainKey('KIO_PROJECT_CACHE'))
            //it(`has valid path for KIO_PROJECT_CACHE`,()=>assertFs(env.KIO_PROJECT_CACHE).toBeADirectory())
            it("has value for KIO_PATHS (" + env.KIO_PATHS + ")", function () { return ceylon_1.default(env).toContainKey('KIO_PATHS'); });
            it("has valid path for KIO_PATHS", function () { return ceylon_1.default(env.KIO_PATHS).toContainKeys(['root', 'components']); });
            it("has value for KIO_TEMPLATES (" + env.KIO_TEMPLATES + ")", function () { return ceylon_1.default(env).toContainKey('KIO_TEMPLATES'); });
            it("has valid path for KIO_TEMPLATES", function () { return fs_1.default(env.KIO_TEMPLATES).toBeADirectory(); });
        });
        describe('test resolving', function () {
            it('resolves root path', function () {
                ceylon_1.default(env.resolve('.')).toEqual(env.KIO_PROJECT_ROOT);
            });
        });
    });
};
exports.assertEnv(env);
describe('test project initialization', function () {
    /*  it('no cache exists at ' + process.env.KIO_NG2_PROJECT+'/.kio-ng2-cache', function(){
        assertFs(env.resolveProjectCache()).toNotBeADirectory()
      })*/
    describe('init', function () {
        this.timeout(10000);
        it('exists', function () { ceylon_1.default(project).toExist(); });
        it('has files', function () { ceylon_1.default(project).toContainKey('files'); });
        it('emits files', function (done) {
            project.files.list('src').subscribe(function (file) {
                //console.log('file',file)
            }, done, done);
        });
        it('emits publication components', function (done) {
            project.files.publicationComponents().toArray().subscribe(function (files) {
                //console.log('publication component',files)
            }, done, done);
        });
        it('emits publication component files', function (done) {
            project.files.publicationComponentFiles().subscribe(function (files) {
                //console.log('publication component files',files)
            }, done, done);
        });
    });
    describe('template rendering', function () {
        describe('indexes', function () {
            it('project templates', function () {
                ceylon_1.default(project).toContainKey('templates');
            });
            it('project templates indexes', function () {
                ceylon_1.default(project.templates).toContainKey('indexes');
            });
            it('project templates indexes.mapFileToTemplateDataItem exists', function () {
                ceylon_1.default(project.templates.indexes).toContainKey('mapFileToTemplateDataItem');
            });
            it('project templates indexes.mapFileToTemplateDataItem is a function', function () {
                ceylon_1.default(project.templates.indexes.mapFileToTemplateDataItem).toBeA('function');
            });
            describe('rendering', function () {
                describe('maps structure component', function () {
                    var structureComponent;
                    before(function () {
                        return project.files.structureComponents().take(1).toPromise()
                            .then(function (item) { return env.resolveRoot(item); })
                            .then(function (componentFile) { return structureComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile, env.KIO_PATHS.root); });
                    });
                    it('has props importName, importPath', function () {
                        ceylon_1.default(structureComponent).toContainKeys(['importName', 'importPath']);
                    });
                    it('importPath is valid', function () {
                        fs_1.default(env.path.resolve(env.KIO_PATHS.root, structureComponent.importPath + '.ts')).toBeAFile();
                        ceylon_1.default(structureComponent.importPath).toNotContain('./..');
                    });
                });
                describe('maps navigation component', function () {
                    var navigationComponent;
                    before(function () {
                        return project.files.navigationComponents().take(1).toPromise()
                            .then(function (item) { return env.resolveRoot(item); })
                            .then(function (componentFile) { return navigationComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile, env.KIO_PATHS.root); });
                    });
                    it('has props importName, importPath', function () {
                        ceylon_1.default(navigationComponent).toContainKeys(['importName', 'importPath']);
                    });
                    it('importPath is valid', function () {
                        fs_1.default(env.path.resolve(env.KIO_PATHS.root, navigationComponent.importPath + '.ts')).toBeAFile();
                        ceylon_1.default(navigationComponent.importPath).toNotContain('./..');
                    });
                });
                describe('maps publication component', function () {
                    var publicationComponent;
                    before(function () {
                        return project.files.publicationComponents().take(1).toPromise()
                            .then(function (item) { return env.resolveRoot(item); })
                            .then(function (componentFile) { return publicationComponent = project.templates.indexes.mapFileToTemplateDataItem(componentFile, env.KIO_PATHS.root); });
                    });
                    it('has props importName, importPath', function () {
                        ceylon_1.default(publicationComponent).toContainKeys(['importName', 'importPath']);
                    });
                    it('importPath is valid', function () {
                        fs_1.default(env.path.resolve(env.KIO_PATHS.root, publicationComponent.importPath + '.ts')).toBeAFile();
                        ceylon_1.default(publicationComponent.importPath).toNotContain('./..');
                    });
                });
                describe('maps publication fixture', function () {
                    var publicationComponentFixture;
                    before(function () {
                        return project.files.publicationComponentFixtures().take(1).toPromise()
                            .then(function (item) { return env.resolveRoot(item); })
                            .then(function (componentFixtureFile) { return publicationComponentFixture = project.templates.indexes.mapFileToTemplateDataItem(componentFixtureFile, env.KIO_PATHS.root); });
                    });
                    it('has props importName, importPath, importAlias', function () {
                        ceylon_1.default(publicationComponentFixture).toContainKeys(['importName', 'importPath', 'importAlias']);
                    });
                    it('importPath is valid', function () {
                        fs_1.default(env.path.resolve(env.KIO_PATHS.root, publicationComponentFixture.importPath + '.ts')).toBeAFile();
                        ceylon_1.default(publicationComponentFixture.importPath).toNotContain('./..');
                    });
                });
                describe('maps publication criteria', function () {
                    var publicationComponentCriteria;
                    before(function () {
                        return project.files.publicationComponentCriterias().take(1).toPromise()
                            .then(function (item) { return env.resolveRoot(item); })
                            .then(function (componentCriteriaFile) { return publicationComponentCriteria = project.templates.indexes.mapFileToTemplateDataItem(componentCriteriaFile, env.KIO_PATHS.root); });
                    });
                    it('has props importName, importPath, importAlias', function () {
                        ceylon_1.default(publicationComponentCriteria).toContainKeys(['importName', 'importPath', 'importAlias']);
                    });
                    it('importPath is valid', function () {
                        fs_1.default(env.path.resolve(env.KIO_PATHS.root, publicationComponentCriteria.importPath + '.ts')).toBeAFile();
                        ceylon_1.default(publicationComponentCriteria.importPath).toNotContain('./..');
                    });
                });
                describe('rendering files', function () {
                    describe('structure', function () {
                        it('renders', function () {
                            return project.templates.indexes.mapFilesToTemplateData('StructureComponents', project.files.structureComponents(), env.KIO_PATHS.root)
                                .flatMap(function (templateData) { return project.templates.indexes.render('StructureComponents', templateData); })
                                .toPromise()
                                .then(function (result) {
                                ceylon_1.default(result).toBeA('string');
                            });
                        });
                    });
                    describe('navigation', function () {
                        it('renders', function () {
                            return project.templates.indexes.mapFilesToTemplateData('NavigationComponents', project.files.navigationComponents(), env.KIO_PATHS.root)
                                .flatMap(function (templateData) { return project.templates.indexes.render('NavigationComponents', templateData); })
                                .toPromise()
                                .then(function (result) {
                                ceylon_1.default(result).toBeA('string');
                            });
                        });
                    });
                    describe('publication', function () {
                        it('renders', function () {
                            return project.templates.indexes.mapFilesToTemplateData('PublicationComponents', project.files.publicationComponents(), env.KIO_PATHS.root)
                                .flatMap(function (templateData) { return project.templates.indexes.render('PublicationComponents', templateData); })
                                .toPromise()
                                .then(function (result) {
                                ceylon_1.default(result).toBeA('string');
                            });
                        });
                    });
                    describe('publication criteria', function () {
                        it('renders', function () {
                            return project.templates.indexes.mapFilesToTemplateData('PublicationCriterias', project.files.publicationComponentCriterias(), env.KIO_PATHS.root)
                                .flatMap(function (templateData) { return project.templates.indexes.render('PublicationCriterias', templateData); })
                                .toPromise()
                                .then(function (result) {
                                ceylon_1.default(result).toBeA('string');
                            });
                        });
                    });
                    describe('publication fixture', function () {
                        it('renders', function () {
                            return project.templates.indexes.mapFilesToTemplateData('PublicationFixtures', project.files.publicationComponentFixtures(), env.KIO_PATHS.root)
                                .flatMap(function (templateData) { return project.templates.indexes.render('PublicationFixtures', templateData); })
                                .toPromise()
                                .then(function (result) {
                                ceylon_1.default(result).toBeA('string');
                            });
                        });
                    });
                });
            });
        });
    });
    describe('commands', function () {
        describe('buildIndexes', function () {
            it('executes', function () {
                return project.buildIndexes()
                    .toPromise();
            });
        });
        before(function () {
            return rxfs.exec("rm -rf \"./publication/fragment/test-container\"", { cwd: env.KIO_PATHS.root }).toPromise();
        });
        describe('createComponent', function () {
            it('executes', function () {
                return project.createComponent({
                    name: 'TestContainer',
                    contentType: 'fragment',
                    childTypes: ['src', 'src', 'txt', 'txt'],
                    modifiers: ['test', 'container']
                })
                    .toPromise();
            });
        });
    });
});
//# sourceMappingURL=project.init.spec.js.map