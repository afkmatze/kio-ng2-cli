"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var env_1 = require("../../env");
exports.resolveTemplateSource = function (templateName) {
    return env_1.path.join(env_1.TEMPLATES, templateName);
};
var TemplateSource = (function (_super) {
    __extends(TemplateSource, _super);
    function TemplateSource(options) {
        var _this = _super.call(this, {
            objectMode: true
        }) || this;
        _this.sizeCount = 0;
        _this.setTemplateName(options.templateName);
        return _this;
    }
    TemplateSource.prototype.setTemplateName = function (templateName) {
        this.templateName = templateName;
        this.templateFilepath = env_1.path.resolve(env_1.TEMPLATES, templateName);
    };
    TemplateSource.prototype._read = function (size) {
        console.log('should read "%s"', size);
        var message = "Hello World #" + ++this.sizeCount + ", at " + new Date();
        this.push(message);
        if (this.sizeCount >= 10) {
            this.push(null);
        }
    };
    return TemplateSource;
}(stream_1.Readable));
exports.TemplateSource = TemplateSource;
//# sourceMappingURL=Source.class.js.map