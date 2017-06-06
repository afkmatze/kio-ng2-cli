import { Observable } from 'rxjs';
import { CLICommandArgsCreateComponent } from './interfaces';
import { PublicationComponentTemplateData } from './templates/publicationComponent';
export declare const createComponentWithCLIArgs: (projectPath: string) => (args: CLICommandArgsCreateComponent) => Observable<{}>;
export declare const createComponent: (projectPath: string) => (data: PublicationComponentTemplateData) => Observable<{}>;
