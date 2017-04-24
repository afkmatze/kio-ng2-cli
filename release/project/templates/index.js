"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var indexes = require("./indexes");
exports.indexes = indexes;
var logger = require("../../console");
var publicationComponent = require("./publicationComponent");
exports.publicationComponent = publicationComponent;
var rxjs_1 = require("rxjs");
var rxfs = require("../../utils/rx/fs");
var logUpdateReason = function (reason, targetFilepath) {
    logger.log('update %s for reason: %s ', path.basename(targetFilepath), reason);
};
exports.shouldUpdateFile = function (targetFilepath, contents) {
    if (!rxfs.existsSync(targetFilepath)) {
        logUpdateReason('does not exist', targetFilepath);
        return rxjs_1.Observable.of(true);
    }
    return rxfs.readfile(targetFilepath, true).flatMap(function (currentContents) {
        if (currentContents.length !== contents.length) {
            logUpdateReason("different size. current size: " + currentContents.length + ", next size: " + contents.length + " ", targetFilepath);
            return rxjs_1.Observable.of(true);
        }
        if (currentContents === contents) {
            return rxjs_1.Observable.empty();
        }
        return rxfs.diff({}, contents, targetFilepath).map(function (diffs) {
            if (diffs.length > 0) {
                logUpdateReason(diffs.length + " differences in content", targetFilepath);
            }
            return diffs.length > 0;
        });
    });
};
exports.replaceFile = function (targetFilepath, contents) {
    var targetDirpath = path.dirname(targetFilepath);
    var targetDirParent = path.dirname(targetDirpath);
    if (!rxfs.existsSync(targetDirParent))
        return rxjs_1.Observable.throw('Invalid target path. ' + targetDirParent + ' is not a directory.');
    return rxfs
        .mkdir(targetDirpath, true)
        .flatMap(function (dir) {
        return exports.shouldUpdateFile(targetFilepath, contents)
            .flatMap(function (result) {
            return result ? rxfs.writeFile(targetFilepath, contents).map(function () { return true; }) : rxjs_1.Observable.of(false);
        });
    });
};
//# sourceMappingURL=index.js.map