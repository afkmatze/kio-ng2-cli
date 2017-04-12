import { KioContentType } from 'kio-ng2'

export enum KioComponentType {
  StructureComponent,
  PublicationComponent
}

export const isKioContentType = ( value:any ):boolean => /fragment|src|txt/.test(value)
export const isKioComponentType = ( value:any ):boolean => KioComponentType[value] !== undefined

export interface KioComponent {
  componentType:KioComponentType;
  dir:string;
  name:string;
}

export interface KioStructureComponent extends KioComponent {}

export interface KioPublicationComponent extends KioComponent {
  contentType:KioContentType
  modifiers?:string[]
  childTypes?:KioContentType[]
}