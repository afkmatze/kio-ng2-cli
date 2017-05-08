import { FormatValueType } from './types';
import { ParseResult, Chunk } from './Parser.class';
export interface TypeFilter<T> {
    (valueType: FormatValueType<T>, idx?: number): boolean;
}
export declare class Formatter {
    private types;
    addType<T>(formatValueType: FormatValueType<T>): void;
    getTypeByName<T>(typeName: string): FormatValueType<T>;
    getTypeByValue<T>(value: T): any;
    parse(format: string, ...args: any[]): ParseResult;
    printf(format: string, ...args: any[]): string;
    protected renderChunk<T>(chunk: Chunk<T>, idx: number): string;
    formatStringValue(value: string): string;
    formatNumberValue(value: number): string;
    formatDateValue(value: Date): string;
}
