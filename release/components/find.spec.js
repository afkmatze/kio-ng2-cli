"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_1 = require("./find");
var classes_1 = require("./classes");
require("mocha");
var chai_1 = require("chai");
describe('test component find', function () {
    it('finds structure', function () {
        var components = find_1.findComponents('structure');
        chai_1.expect(components).to.be.instanceOf(Array);
    });
    it('finds publication', function () {
        var components = find_1.findComponents('publication');
        components.forEach(function (component) {
            chai_1.expect(component).to.be.instanceOf(classes_1.PublicationComponent);
            chai_1.expect(component.dir).to.be.ok;
            chai_1.expect(component.getFiles()).to.have.lengthOf(7);
            console.log('modifiers', component.modifiers);
            console.log('childTypes', component.childTypes);
        });
    });
    it('finds navigation', function () {
        var components = find_1.findComponents('navigation');
        components.forEach(function (component) {
            chai_1.expect(component).to.be.instanceOf(classes_1.Component);
            chai_1.expect(component.dir).to.be.ok;
            //console.log('component.getFiles()',component.getFiles())
        });
    });
});
//# sourceMappingURL=find.spec.js.map