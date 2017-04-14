import { Component } from './classes/Component.class';
import { KioComponentFilter } from './interfaces';
export interface FilterFunction {
    (filepath: string): boolean;
}
export declare const findComponents: (filter?: KioComponentFilter) => Component[];
