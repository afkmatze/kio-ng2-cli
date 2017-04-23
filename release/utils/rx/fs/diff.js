"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var fs_1 = require("./fs");
var exec_1 = require("./exec");
var tmp_1 = require("./tmp");
exports.diff = function (opts) {
    var targets = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        targets[_i - 1] = arguments[_i];
    }
    if ('string' === typeof opts) {
        return exports.diff.apply(void 0, [{}, opts].concat(targets));
    }
    var parser = diffParser();
    return rxjs_1.Observable.from(targets).flatMap(function (target) {
        if (fs_1.existsSync(target)) {
            //console.log('is file: \n---\n', target, '\n---')
            return rxjs_1.Observable.of(target);
        }
        return tmp_1.file(target);
    })
        .toArray()
        .map(function (filenames) {
        var command = "diff " + filenames.map(function (t) { return "\"" + t + "\""; }).join(' ');
        //console.log('diff command: ', command)
        return command;
    })
        .flatMap(function (command) { return exec_1.exec(command, opts); })
        .map(function (out) {
        if (out.stderr) {
            return rxjs_1.Observable.throw(out.stderr);
        }
        /*if ( !out.stdout )
        {
          console.warn('no data on stdout', out)
        }*/
        return parser.parse(out.stdout ? out.stdout.toString() : '');
    })
        .toArray()
        .map(function (result) {
        //console.log('diff result', result)
        return parser.result();
    });
};
var rx_index = /^(.+)c(.+)$/gm;
var rx_leftRow = /^\>\ (.+)$/gm;
var rx_rightRow = /^\<\ (.+)$/gm;
var diffParser = function () {
    var diffs = [];
    var diffIndex = 0;
    var currentDiff = null;
    return {
        parse: function (row) {
            if (rx_index.test(row)) {
                currentDiff = {
                    index: row.match(rx_index)[0],
                    leftRows: [],
                    rightRows: [],
                };
                diffs.push(currentDiff);
            }
            if (currentDiff) {
                if (rx_leftRow.test(row)) {
                    currentDiff.leftRows.push(row.substr(2));
                }
                else if (rx_rightRow.test(row)) {
                    currentDiff.rightRows.push(row.substr(2));
                }
            }
            return row;
        },
        result: function () {
            return diffs.slice();
        }
    };
};
exports.parseDiff = function (source) {
    var rx_index = /^(.+)c(.+)$/gm;
    var rx_leftRow = /^\>\ (.+)$/gm;
    var matches = [];
    do {
        var match = rx_index.exec(source);
        if (!match)
            break;
        var full = match[0], leftIndex = match[1], rightIndex = match[2];
        var leftRowMatches = source.slice(match.index + match.length).match(rx_leftRow);
        matches.push({ full: full, leftIndex: leftIndex, rightIndex: rightIndex, leftRowMatches: leftRowMatches });
    } while (true);
    return matches;
};
//# sourceMappingURL=diff.js.map