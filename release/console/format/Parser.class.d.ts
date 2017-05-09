import { FormatValueType } from './types';
import { FormatVariableArg } from './variables';
import { FormatSource, Param, FormatParam } from './interfaces';
export declare type Chunk<T> = FormatSource | Param<T> | FormatParam<T>;
export interface ParseResult {
    chunks: Chunk<any>[];
}
export declare const variableToParam: <T>(value: T, typeName: string, variable: FormatVariableArg) => {
    flag: string;
    paramArgs: string;
    offset: number;
    source: string;
    typeName: string;
    value: T;
} | {
    flag: string;
    offset: number;
    source: string;
    typeName: string;
    value: T;
};
export declare class FormatParser {
    readonly format: string;
    readonly args: any[];
    readonly types: FormatValueType<any>[];
    constructor(format: string, args: any[], types?: FormatValueType<any>[]);
    readonly typeMap: Map<string, FormatValueType<any>>;
    readonly flags: string[];
    parse(): ParseResult;
}
