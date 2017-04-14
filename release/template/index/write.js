"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../env/constants");
exports.write = function (templateFile, data) {
    var outputFile = templateFile.replace(/__\w+__/gm, data.filename).replace(constants_1.TEMPLATES, constants_1.KIO_PATHS.components.publication);
    var templateSource = ;
};
//# sourceMappingURL=write.js.map