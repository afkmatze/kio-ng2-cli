import * as ComponentInterfaces from './interfaces';
import { Component } from './Component.class';
export declare const getComponentTypeForPath: (dir: string) => ComponentInterfaces.KioComponentType;
export declare const getContentTypeForPath: (dir: string) => string;
export declare const createWithPath: (dir: string) => Component;
