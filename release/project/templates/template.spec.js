"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var fs_1 = require("../../assert/fs");
var rxjs_1 = require("rxjs");
var rxfs = require("rxfs");
var template = require("./");
var randomInt = function (max, min) {
    if (max === void 0) { max = 100; }
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
};
var renderTestContent = function () {
    return "Hello World\n\nThis is a bit " + randomInt(100000, 1000) + " different\n";
};
describe('test template', function () {
    describe('replacing', function () {
        var defaultContent = renderTestContent();
        var sourceFileDefault;
        before(function (done) {
            rxfs.tmp.file(defaultContent)
                .toPromise()
                .then(function (filename) {
                sourceFileDefault = filename;
                done();
            })
                .catch(done);
        });
        it('does not replace equal content', function () {
            return template.shouldUpdateFile(sourceFileDefault, defaultContent)
                .toPromise()
                .then(function (result) {
                ceylon_1.default(result).toNotExist();
            });
        });
        it('does replace unequal content', function () {
            return template.shouldUpdateFile(sourceFileDefault, renderTestContent())
                .toPromise()
                .then(function (result) {
                ceylon_1.default(result).toExist();
            });
        });
        it('does not updates file with equal content', function () {
            this.timeout(10000);
            var ts = new Date();
            return rxjs_1.Observable
                .of(sourceFileDefault).delay(1000)
                .flatMap(function () {
                return template.replaceFile(sourceFileDefault, defaultContent)
                    .toPromise()
                    .then(function (result) {
                    fs_1.default(sourceFileDefault).toNotBeNewerThan(ts);
                });
            });
        });
        it('does replace unequal content and updates file', function () {
            var ts = new Date();
            return template.replaceFile(sourceFileDefault, renderTestContent())
                .toPromise()
                .then(function (result) {
                fs_1.default(sourceFileDefault).toBeNewerThan(ts);
            });
        });
    });
});
//# sourceMappingURL=template.spec.js.map