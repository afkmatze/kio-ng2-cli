import { Observable } from 'rxjs';
import { IndexTemplateData, IndexTemplateDataItem } from './interfaces';
import { Component } from '../../interfaces';
export declare const mapTemplateData: <ComponentType>(component: Component<ComponentType>, relativeTo: string) => IndexTemplateDataItem;
export declare const mapFilesToTemplateData: (exportName: string, files: Observable<string>, relativeTo: string) => Observable<IndexTemplateData>;
export declare const mapFileToTemplateDataItem: (filepath: string, relativeTo: string) => IndexTemplateDataItem;
export declare const render: (indexName: string, data: IndexTemplateData) => Observable<string>;
