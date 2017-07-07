"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var kio_ng2_1 = require("kio-ng2");
var assert_1 = require("../../assert");
var components = require("./");
describe('components', function () {
    describe('creates', function () {
        var fixture = {
            name: 'TestFragment',
            type: kio_ng2_1.KioNodeType.fragment,
            modifiers: ['foo', 'bar'],
            childTypes: ['txt', 'src']
        };
        it('creates', function () {
            if (components.isNamedFragmentComponentStructure(fixture)) {
                var data = components.dataForNamedFragmentComponent(fixture);
                console.log('data', data);
                assert_1.default(data).toContainKeys([
                    'name',
                    'type',
                    'selector',
                    'modifiers',
                    'childTypes',
                    'classifiedModuleName',
                    'dasherizedModuleName',
                    'classifiedParentComponentName',
                    'dasherizedParentComponentPath'
                ]);
                return components.writeComponent(data, process.env.KIO_NG2_PROJECT).toPromise()
                    .then(function (res) {
                    console.log('wrote', res);
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
        });
    });
});
//# sourceMappingURL=components.spec.js.map