"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var testing_1 = require("./testing");
exports.testComponents = function (projectPath) { return function (args) {
    var targetFilepath = path.join(path.resolve(projectPath, './src/app'), 'ComponentTests.spec.ts');
    console.log('writing spec file at "%s"', targetFilepath);
    return testing_1.renderTests(targetFilepath)
        .map(function (row, idx) {
        console.log('item %s\n----\n', idx, row, '\n----\n');
        return row;
    }).flatMap(function (row) { return testing_1.execTestAt(targetFilepath); });
    /*return Observable.zip(
        files.filesForIndexType(IndexTypes.fixture),
        files.filesForIndexType(IndexTypes.criteria)
      ).toArray()
    */
}; };
//# sourceMappingURL=testComponents.js.map