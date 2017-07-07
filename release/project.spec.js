"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var env = require("./env/constants");
var path = require("path");
var assert_1 = require("./assert");
var fs_1 = require("./assert/fs");
var project_1 = require("./project");
var project_2 = require("./project");
describe('project api', function () {
    describe('env', function () {
        describe("KIO_PROJECT_ROOT \"" + env.KIO_PROJECT_ROOT + "\"", function () {
            it('is valid path', function () {
                fs_1.default(env.KIO_PROJECT_ROOT).toBeADirectory();
            });
            it('has a package.json', function () {
                fs_1.default(path.join(env.KIO_PROJECT_ROOT, 'package.json')).toBeAFile();
                fs_1.default(path.join(env.resolveRoot('package.json'))).toBeAFile();
            });
            it('can read package.json', function () {
                assert_1.default(env.resolveProjectPackage()).toExist();
            });
            it('package.json has kio key', function () {
                assert_1.default(env.resolveProjectPackage()).toContainKey("kio");
            });
        });
    });
    describe('init', function () {
        this.timeout(10000);
        var testProject = project_1.default(env.KIO_PROJECT_ROOT);
        it('exists', function () { assert_1.default(testProject).toExist(); });
        it('has env', function () { assert_1.default(env).toExist(); });
        it('has files', function () { assert_1.default(testProject).toContainKey('files'); });
        xit('emits files', function (done) {
            testProject.files.publicationComponentFiles().subscribe(function (file) {
                //console.log('file',file)
            }, done, done);
        });
        /*
            it('emits publication components',(done)=>{
              testProject.files.publicationComponents().take(4).toArray().subscribe ( files => {
                expect(files).toExist('No publication component files found.')
                expect(files.length).toBeGreaterThan(0)
                files.forEach ( (file:string) => {
                  expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
                } )
                //console.log('publication components',files)
              }, done, done )
            })*/
        /* it('emits structure components',(done)=>{
           project.files.structureComponents().toArray().subscribe ( files => {
             expect(files).toExist()
             expect(files.length).toBeGreaterThan(0)
             files.forEach ( (file:string) => {
               expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
             } )
           }, done, done )
         })
     
         it('emits navigation components',(done)=>{
           project.files.navigationComponents().toArray().subscribe ( files => {
             expect(files).toExist()
             expect(files.length).toBeGreaterThan(0)
             files.forEach ( (file:string) => {
               expect(file).toNotMatch(/\.DS_Store/,'.DS_Store files should be ignored')
             } )
           }, done, done )
         })*/
        xit('emits publication component files', function (done) {
            testProject.files.publicationComponentFiles().subscribe(function (fileGroup) {
                assert_1.default(fileGroup).toExist('No publication component files found.');
                assert_1.default(fileGroup.length).toBeGreaterThan(0);
                fileGroup.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
            }, done, done);
        });
        xit('emits publication component fixtures', function (done) {
            testProject.files.filesForIndexType(project_2.IndexTypes.fixture).toArray().subscribe(function (files) {
                assert_1.default(files).toExist('No publication component files found.');
                assert_1.default(files.length).toBeGreaterThan(0);
                //console.log('%s files', files.length, files.map ( f => path.basename(f) ))
                files.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
            }, done, done);
        });
    });
});
//# sourceMappingURL=project.spec.js.map