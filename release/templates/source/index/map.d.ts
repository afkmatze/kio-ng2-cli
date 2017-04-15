import { TemplateValueMapper, IndexTemplateData } from '../../types/interfaces';
import { ComponentIndex, IndexName } from '../../../indexes';
export declare type DataKey = "indexItems" | "exportName";
export declare const DataKeys: DataKey[];
export declare const IndexMap: Map<IndexName, TemplateValueMapper>;
export declare const mapDataKey: (key: "exportName" | "indexItems", indexData: ComponentIndex) => any;
export declare const mapComponentData: (componentData: ComponentIndex) => IndexTemplateData;
