import { ComponentFixture, QueryableAnnotation } from 'kio-ng2-component-routing'
import { KioContentType } from 'kio-ng2'

export interface ComponentCacheFileContent {
  name:string;
  dir:string;
}

export interface PublicationComponentMetaCacheFileContent extends QueryableAnnotation {
  type: keyof KioContentType;
}

export interface PublicationComponentCacheFileContent extends ComponentCacheFileContent, PublicationComponentMetaCacheFileContent {

}