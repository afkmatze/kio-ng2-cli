import { Observable } from 'rxjs';
import { Component } from './interfaces';
import tscStream from './tsc/stream';
import cacheStream from './cache/stream';
export declare const getSource: (sourceType: "cache" | "tsc") => Observable<Component>;
export { tscStream, cacheStream };
