import { KioContentType } from 'kio-ng2';
import { KioComponentType } from './interfaces';
import { Component } from './Component.class';
export declare type ComponentFilter = string | KioContentType | KioComponentType;
export interface FilterFunction {
    (filepath: string): boolean;
}
export declare const findComponents: (filter?: ComponentFilter) => Component[];
