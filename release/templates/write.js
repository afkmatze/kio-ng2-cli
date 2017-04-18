"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTemplate = function (template) {
    var writeComponentStream = function (componentStream) {
        var sub = null;
        var handleComponent = function (component) {
        };
        var handleError = function (error) {
        };
        var onDone = function () {
            sub.unsubscribe();
        };
        sub = componentStream.subscribe(handleComponent, handleError, onDone);
    };
};
//# sourceMappingURL=write.js.map