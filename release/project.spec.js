"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var env = require("./env/constants");
var path = require("path");
var assert_1 = require("./assert");
var fs_1 = require("./assert/fs");
var project = require("./project");
describe('project api', function () {
    describe('env', function () {
        describe("KIO_PROJECT_ROOT \"" + env.KIO_PROJECT_ROOT + "\"", function () {
            it('is valid path', function () {
                fs_1.default(env.KIO_PROJECT_ROOT).toBeADirectory();
            });
            it('has a package.json', function () {
                fs_1.default(path.join(env.KIO_PROJECT_ROOT, 'package.json')).toBeAFile();
            });
        });
    });
    describe('init', function () {
        this.timeout(10000);
        it('exists', function () { assert_1.default(project).toExist(); });
        it('has env', function () { assert_1.default(env).toExist(); });
        it('has files', function () { assert_1.default(project).toContainKey('files'); });
        it('emits files', function (done) {
            project.files.list('src').subscribe(function (file) {
                //console.log('file',file)
            }, done, done);
        });
        it('emits publication components', function (done) {
            project.files.publicationComponents().toArray().subscribe(function (files) {
                assert_1.default(files).toExist();
                assert_1.default(files.length).toBeGreaterThan(0);
                files.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
                //console.log('publication components',files)
            }, done, done);
        });
        it('emits structure components', function (done) {
            project.files.structureComponents().toArray().subscribe(function (files) {
                assert_1.default(files).toExist();
                assert_1.default(files.length).toBeGreaterThan(0);
                files.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
            }, done, done);
        });
        it('emits navigation components', function (done) {
            project.files.navigationComponents().toArray().subscribe(function (files) {
                assert_1.default(files).toExist();
                assert_1.default(files.length).toBeGreaterThan(0);
                files.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
            }, done, done);
        });
        it('emits publication component files', function (done) {
            project.files.publicationComponentFiles().subscribe(function (fileGroup) {
                assert_1.default(fileGroup).toExist();
                assert_1.default(fileGroup.length).toBeGreaterThan(0);
                fileGroup.forEach(function (file) {
                    assert_1.default(file).toNotMatch(/\.DS_Store/, '.DS_Store files should be ignored');
                });
            }, done, done);
        });
    });
});
//# sourceMappingURL=project.spec.js.map