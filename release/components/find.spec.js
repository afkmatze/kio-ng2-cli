"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_1 = require("./find");
var classes_1 = require("./classes");
require("mocha");
var ceylon_1 = require("ceylon");
describe('test component find', function () {
    it('finds structure', function () {
        var components = find_1.findComponents('structure');
        ceylon_1.default(components).toBeAn(Array);
    });
    it('finds publication', function () {
        var components = find_1.findComponents('publication');
        components.forEach(function (component) {
            ceylon_1.default(component).toBeA(classes_1.PublicationComponent);
            ceylon_1.default(component.getFiles()).toHaveLength(7);
            console.log('modifiers', component.modifiers);
            console.log('childTypes', component.childTypes);
        });
    });
    it('finds navigation', function () {
        var components = find_1.findComponents('navigation');
        components.forEach(function (component) {
            ceylon_1.default(component).toBeA(classes_1.Component);
            //expect(component.dir).to.be.ok
            //console.log('component.getFiles()',component.getFiles())
        });
    });
});
//# sourceMappingURL=find.spec.js.map