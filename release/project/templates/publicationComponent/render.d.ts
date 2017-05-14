import { Observable } from 'rxjs';
import { PublicationComponentTemplateData } from './interfaces';
import { CLICommandArgsCreateComponent } from '../../interfaces';
import { KioPrimitiveContentType } from 'kio-ng2';
import { NamedComponentStructure, NamedFragmentComponentStructure } from 'kio-ng2-component-routing';
export declare const mapCLIArgsToTemplateData: <T extends KioPrimitiveContentType, P extends NamedFragmentComponentStructure | NamedComponentStructure<T>>(args: CLICommandArgsCreateComponent) => PublicationComponentTemplateData<T, P>;
export declare const render: <T extends KioPrimitiveContentType, P extends NamedFragmentComponentStructure | NamedComponentStructure<T>>(data: PublicationComponentTemplateData<T, P>) => Observable<{
    filepath: string;
    content: string;
}>;
