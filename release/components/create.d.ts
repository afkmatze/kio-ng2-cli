import * as ComponentInterfaces from './interfaces';
import { Component, ComponentModel } from './classes';
export declare const getComponentTypeForPath: (dir: string) => ComponentInterfaces.KioComponentType;
export declare const getContentTypeForPath: (dir: string) => string;
export declare const createWithData: (data: ComponentInterfaces.KioComponent | ComponentInterfaces.KioPublicationComponent) => ComponentModel;
/**
 * @brief      Creates a Component with path.
 *
 * @param      dir   The component`s directory
 *
 * @return     Component
 */
export declare const createWithPath: (dir: string) => Component;
