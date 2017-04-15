"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var assert_1 = require("../assert");
var constants = require("./constants");
describe('env constants', function () {
    it('KIO_PROJECT_ROOT exists at ' + constants.KIO_PROJECT_ROOT, function () {
        assert_1.assertExists(constants.KIO_PROJECT_ROOT);
    });
    it('KIO_PROJECT_PACKAGE is valid', function () {
        assert_1.default(constants.KIO_PROJECT_PACKAGE).toExist();
    });
    it('resolves project path', function () {
        assert_1.default(constants.resolve.bind(constants, 'package.json')).toNotThrow();
    });
    it('KIO_PROJECT_CACHE is set', function () {
        assert_1.default(constants).toContainKey('KIO_PROJECT_CACHE');
    });
    it('TEMPLATES is set', function () {
        assert_1.default(constants).toContainKey('TEMPLATES');
    });
    describe('KIO_PATHS', function () {
        it('KIO_PATHS is set', function () {
            assert_1.default(constants).toContainKey('KIO_PATHS');
        });
        it('KIO_PATHS.root exists', function () {
            assert_1.assertExists(constants.KIO_PATHS.root);
        });
        it('KIO_PATHS.components.publication exists', function () {
            assert_1.assertExists(constants.KIO_PATHS.components.publication);
        });
        it('KIO_PATHS.components.navigation exists', function () {
            assert_1.assertExists(constants.KIO_PATHS.components.navigation);
        });
        it('KIO_PATHS.components.structure exists', function () {
            assert_1.assertExists(constants.KIO_PATHS.components.structure);
        });
    });
});
//# sourceMappingURL=constants.spec.js.map