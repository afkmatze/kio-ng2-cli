import { PublicationComponentTemplateData } from './interfaces';
import { PublicationComponent } from '../../components/classes';
export declare type ComponentDataKey = "contentType" | "styles" | "modifiers" | "childTypes" | "dasherizedModuleName" | "classifiedModuleName" | "classifiedParentComponentName" | "pathToStructureComponents" | "dasherizedParentComponentPath" | "selector" | "dasherizedModuleName";
export declare const ComponentDataKeys: ComponentDataKey[];
export declare const mapComponentDataKey: (key: ComponentDataKey, component: PublicationComponent) => any;
export declare const mapComponentData: (componentData: PublicationComponent) => PublicationComponentTemplateData;
