/// <reference types="node" />
import { ExecOptions } from 'child_process';
export declare const diff: (opts?: ExecOptions, ...targets: string[]) => any;
export declare const parseDiff: (source: string) => any[];
