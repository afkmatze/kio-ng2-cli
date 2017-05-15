import { Observable } from 'rxjs';
import { CLICommandArgsCreateComponent } from './interfaces';
import { PublicationComponentTemplateData } from './templates/publicationComponent';
export declare const createComponentWithCLIArgs: (args: CLICommandArgsCreateComponent) => Observable<{}>;
export declare function createComponent(data: PublicationComponentTemplateData): Observable<{}>;
