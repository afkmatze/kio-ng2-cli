import { KioContentType } from 'kio-ng2';
export declare enum KioComponentType {
    StructureComponent = 0,
    PublicationComponent = 1,
    NavigationComponent = 2,
}
export declare type KioComponentFileType = "component" | "spec" | "template" | "style" | "criteria" | "fixture" | "querytest";
export declare const isKioContentType: (value: any) => boolean;
export declare const isKioComponentType: (value: any) => boolean;
export interface KioComponent {
    componentType: KioComponentType;
    dir: string;
    name: string;
    [key: string]: any;
}
export interface KioStructureComponent extends KioComponent {
}
export interface KioNavigationComponent extends KioComponent {
}
export interface KioPublicationComponent extends KioComponent {
    contentType: KioContentType;
    modifiers?: string[];
    childTypes?: KioContentType[];
}
export declare type ComponentType = KioPublicationComponent | KioStructureComponent | KioNavigationComponent;
export declare type KioComponentFilter = "structure" | "publication" | "navigation";
export declare type KioIndexTarget = KioComponentFilter | "criteria" | "fixture";
