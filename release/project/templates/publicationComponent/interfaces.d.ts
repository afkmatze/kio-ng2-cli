import { CLICommandArgsCreateComponent } from '../../interfaces';
export interface PublicationComponentTemplateData extends CLICommandArgsCreateComponent {
    selector: string;
    classifiedModuleName: string;
    dasherizedModuleName: string;
    classifiedParentComponentName: string;
    dasherizedParentComponentPath: string;
    pathToStructureComponents: string;
}
