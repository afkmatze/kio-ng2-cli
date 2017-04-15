import { PublicationComponentTemplateData } from '../../types/interfaces';
import { PublicationComponent } from '../../../components/classes';
export declare type DataKey = "contentType" | "styles" | "modifiers" | "childTypes" | "dasherizedModuleName" | "classifiedModuleName" | "classifiedParentComponentName" | "pathToStructureComponents" | "dasherizedParentComponentPath" | "selector" | "dasherizedModuleName";
export declare const DataKeys: DataKey[];
export declare const mapDataKey: (key: "contentType" | "modifiers" | "childTypes" | "styles" | "dasherizedModuleName" | "classifiedModuleName" | "classifiedParentComponentName" | "pathToStructureComponents" | "dasherizedParentComponentPath" | "selector", component: PublicationComponent) => any;
export declare const mapComponentData: (componentData: PublicationComponent) => PublicationComponentTemplateData;
