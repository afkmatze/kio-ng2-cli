"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestContext = (function () {
    function TestContext(type, label, callback, parent) {
        this.type = type;
        this.label = label;
        this.callback = callback;
        this.parent = parent;
        this.children = [];
    }
    TestContext.prototype.addHook = function (type, hook) {
        var childContext = new TestContext(type, hook.label, hook.callback, this);
        this.children.push(childContext);
    };
    TestContext.prototype.describe = function (label, callback) {
        this.addHook('describe', { label: label, callback: callback });
    };
    TestContext.prototype.it = function (label, callback) {
        this.addHook('it', { label: label, callback: callback });
    };
    return TestContext;
}());
exports.TestContext = TestContext;
exports.describe = function (label, callback) {
    console.log(label);
    callback();
};
exports.it = function (label, callback) {
    console.log(label);
    var error;
    try {
        callback();
    }
    catch (e) {
        error = e;
    }
    if (error) {
        console.error(error);
    }
};
//# sourceMappingURL=reporting.js.map