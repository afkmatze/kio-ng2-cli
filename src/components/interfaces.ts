import { KioContentType } from 'kio-ng2'

export enum KioComponentType {
  StructureComponent,
  PublicationComponent,
  NavigationComponent
}

export type KioComponentFileType = "component"|"spec"|"template"|"style"|"criteria"|"fixture"|"querytest"

export const isKioContentType = ( value:any ):boolean => /fragment|src|txt/.test(value)
export const isKioComponentType = ( value:any ):boolean => KioComponentType[value] !== undefined

export interface KioComponent {
  componentType:KioComponentType;
  dir:string;
  name:string;
  [key:string]:any;
}

export interface KioStructureComponent extends KioComponent {}
export interface KioNavigationComponent extends KioComponent {}
export interface KioPublicationComponent extends KioComponent {
  contentType:KioContentType
  modifiers?:string[]
  childTypes?:KioContentType[]
}

export type ComponentType = KioPublicationComponent|KioStructureComponent|KioNavigationComponent


export type KioComponentFilter = "structure"|"publication"|"navigation"

export type KioIndexTarget = KioComponentFilter|"criteria"|"fixture"