import { Observable } from 'rxjs';
import { PublicationComponentTemplateData } from './interfaces';
import { CLICommandArgsCreateComponent } from '../../interfaces';
export declare const mapCLIArgsToTemplateData: (args: CLICommandArgsCreateComponent) => PublicationComponentTemplateData;
export declare const render: (data: PublicationComponentTemplateData) => Observable<{
    filepath: string;
    content: string;
}>;
