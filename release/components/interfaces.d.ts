import { KioContentType } from 'kio-ng2';
export declare enum KioComponentType {
    StructureComponent = 0,
    PublicationComponent = 1,
}
export declare const isKioContentType: (value: any) => boolean;
export declare const isKioComponentType: (value: any) => boolean;
export interface KioComponent {
    componentType: KioComponentType;
    dir: string;
    name: string;
}
export interface KioStructureComponent extends KioComponent {
}
export interface KioPublicationComponent extends KioComponent {
    contentType: KioContentType;
    modifiers?: string[];
    childTypes?: KioContentType[];
}
