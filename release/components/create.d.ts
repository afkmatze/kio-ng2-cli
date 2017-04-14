import * as ComponentInterfaces from './interfaces';
import { Component } from './classes/Component.class';
export declare const getComponentTypeForPath: (dir: string) => ComponentInterfaces.KioComponentType;
export declare const getContentTypeForPath: (dir: string) => string;
/**
 * @brief      Creates a Component with path.
 *
 * @param      dir   The component`s directory
 *
 * @return     Component
 */
export declare const createWithPath: (dir: string) => Component;
