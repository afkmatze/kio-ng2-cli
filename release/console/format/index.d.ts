export * from './interfaces';
export * from './Formatter.class';
export * from './formatter';
import { FormatValueType } from './types';
export declare const useTypeFormatter: <T>(valueMapper: FormatValueType<T>) => void;
