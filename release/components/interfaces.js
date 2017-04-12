"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KioComponentType;
(function (KioComponentType) {
    KioComponentType[KioComponentType["StructureComponent"] = 0] = "StructureComponent";
    KioComponentType[KioComponentType["PublicationComponent"] = 1] = "PublicationComponent";
})(KioComponentType = exports.KioComponentType || (exports.KioComponentType = {}));
exports.isKioContentType = function (value) { return /fragment|src|txt/.test(value); };
exports.isKioComponentType = function (value) { return KioComponentType[value] !== undefined; };
//# sourceMappingURL=interfaces.js.map