import { KioNodeType, KioPrimitiveContentType } from 'kio-ng2';
import { Observable } from 'rxjs';
import { PublicationComponentTemplateData } from '../templates/publicationComponent';
export declare const isNamedFragmentComponentStructure: (other: any) => other is any;
export declare const pathForNamedComponent: (type: string | KioNodeType, name: string) => any;
export declare const dataForNamedFragmentComponent: (pathToStructureComponents: string, namedComponent: any) => PublicationComponentTemplateData;
export declare const dataForNamedComponent: <T extends KioPrimitiveContentType>(pathToStructureComponents: string, namedComponent: any) => PublicationComponentTemplateData;
export declare const namedComponentExists: (namedComponent: any) => boolean;
export declare const writeComponent: (componentData: PublicationComponentTemplateData, targetRoot: string) => Observable<any>;
