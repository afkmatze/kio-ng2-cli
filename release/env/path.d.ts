export * from 'path';
import { KioPath } from './interfaces';
export declare const create: (...args: string[]) => KioPath;
export declare const resolveFull: (filepath: string, parts?: string[]) => string;
