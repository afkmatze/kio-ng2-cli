"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var log_1 = require("./utils/rx/log");
var obs = rxjs_1.Observable.from(['eins', 'zwei', 'drei']).flatMap(function (item) {
    return rxjs_1.Observable.of(item).delay(Math.random() * 400);
});
log_1.logObserver(obs);
log_1.logObserver(obs);
console.log('obs', obs);
//# sourceMappingURL=obs.js.map