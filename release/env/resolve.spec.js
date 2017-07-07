"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var ceylon_1 = require("ceylon");
var fs_1 = require("../assert/fs");
var resolveModule = require("./resolve");
var kio_ng2_env_1 = require("kio-ng2-env");
describe('resolve env', function () {
    it('isInstalled returns false', function () {
        ceylon_1.default(resolveModule.isInstalled()).toBeFalse();
    });
    it('has env', function () {
        return kio_ng2_env_1.api.modules.resolve.kioModules().toArray().toPromise().then(function (modules) {
            ceylon_1.default(modules).toExist();
        });
    });
    it('has env project', function () {
        return kio_ng2_env_1.env().toPromise().then(function (store) {
            ceylon_1.default(store).toExist();
            ceylon_1.default(store).toBeA(kio_ng2_env_1.EnvStore);
            ceylon_1.default(store.get('components')).toBeA(Array);
        });
    });
    it('moduleRoot', function () {
        var root = resolveModule.moduleRoot();
        console.log('moduleRoot:', root);
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