export interface FormatVariableParseOptions {
    flags: string[1][];
}
export interface FormatVariable {
    offset: number;
    source: string;
}
export interface FormatVariableData extends FormatVariable {
    flag: string[1];
}
export interface FormatVariableParam extends FormatVariableData {
    param: string;
}
export declare const isInstanceOfFormatVariableParseOptions: (other: any) => other is FormatVariableParseOptions;
export declare const isInstanceOfFormatVariable: (other: any) => other is FormatVariable;
export declare const isInstanceOfFormatVariableData: (other: any) => other is FormatVariableData;
export declare const isInstanceOfFormatVariableParam: (other: any) => other is FormatVariableParam;
export declare type FormatVariableArg = FormatVariableData | FormatVariableParam;
export declare const isInstanceOf: {
    FormatVariableParseOptions: (other: any) => other is FormatVariableParseOptions;
    FormatVariable: (other: any) => other is FormatVariable;
    FormatVariableData: (other: any) => other is FormatVariableData;
    FormatVariableParam: (other: any) => other is FormatVariableParam;
};
