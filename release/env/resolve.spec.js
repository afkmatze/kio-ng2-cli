"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var fs_1 = require("../assert/fs");
var resolveModule = require("./resolve");
describe('resolve env', function () {
    it('isInstalled returns false', function () {
        ceylon_1.default(resolveModule.isInstalled()).toBeFalse();
    });
    it('moduleRoot', function () {
        var root = resolveModule.moduleRoot();
        fs_1.default(root).toBeADirectory();
    });
    it('package info path', function () {
        var packagePath = resolveModule.resolveProjectPackagePath();
        fs_1.default(packagePath).toBeAFile();
    });
    it('resolveProjectPackage', function () {
        var packageInfo = resolveModule.resolveProjectPackage();
        ceylon_1.default(packageInfo).toContainKeys(['name', 'version', 'kio']);
    });
});
//# sourceMappingURL=resolve.spec.js.map