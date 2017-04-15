"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ceylon_1 = require("ceylon");
exports.extensions = new Map();
exports.use = function (scope, extension) {
    if (!exports.extensions.has(scope)) {
        var set_1 = new Set();
        exports.extensions.set(scope, set_1);
        ceylon_1.default[scope] = function (actual) {
            var api = ceylon_1.default(actual);
            set_1.forEach(function (ext) {
                var methodName = ext.name;
                var negMethodName = methodName.replace(/^to/, 'toNot');
                api[methodName] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return ext.assertion.apply(ext, [false, actual].concat(args));
                };
                api[negMethodName] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return ext.assertion.apply(ext, [true, actual].concat(args));
                };
            });
            return api;
        };
    }
    var scopeSet = exports.extensions.get(scope);
    if (!scopeSet.has(extension)) {
        scopeSet.add(extension);
    }
    var scopeTest = ceylon_1.default[scope]('');
    /*  console.log('added scope "%s"' , scope)
      console.log('expectCeylon.%s',scope,expectCeylon[scope])
      console.log('added extension "%s"' , extension.name)
      console.log('expectCeylon.%s("").%s',scope,extension.name,scopeTest[extension.name])
    */
};
var ceylon_2 = require("ceylon");
exports.expect = ceylon_2.default;
//# sourceMappingURL=extension.js.map