export * from './interfaces';
export * from './find';
export * from './create';
export * from './classes';
import { PublicationComponent, Component } from './classes';
import { KioComponentFilter } from './interfaces';
export declare type ComponentModel = PublicationComponent | Component;
export declare const getComponents: (filter: KioComponentFilter, fromCache?: boolean) => (Component | PublicationComponent)[];
