"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
exports.fromReadable = function (readable) {
    return rxjs_1.Observable.create(function (observer) {
        function nop() { }
        ;
        var buffer = '';
        var emit = function (rows) {
            rxjs_1.Observable.from(rows).subscribe(nextFn, throwFn);
        };
        var onData = function (data) {
            var chunks = data.split('\n');
            var first = buffer + chunks[0];
            buffer = chunks.pop();
            var payload = [first].concat(chunks.slice(1));
            emit(payload);
        };
        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFnCallback = observer.complete ? observer.complete.bind(observer) : nop;
        var returnFn = function () {
            if (buffer) {
                emit([buffer]);
            }
            returnFnCallback();
        };
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        readable.on('data', function (data) {
            if ('string' === typeof data) {
                onData(data);
            }
            else {
                onData(data.toString('utf8'));
            }
            //const rows = data.toString().split('\n')
            /*          console.log('data length %s', data.length)
                      console.log('---')
                      console.log('%s',data)
                      console.log('---')
            */ 
        });
        readable.on('close', returnFn);
        readable.on('end', returnFn);
        readable.on('error', throwFn);
        return new rxjs_1.Subscription(function () {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, rxjs_1.Scheduler.asap);
};
//# sourceMappingURL=from.js.map