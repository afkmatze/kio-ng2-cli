import { IndexTypes, IndexType } from '../../interfaces';
export { IndexTypes, IndexType };
export interface IndexTemplateDataItem {
    importName: string;
    importAlias?: string;
    importPath: string;
}
export interface IndexTemplateData {
    exportName: string;
    indexItems: IndexTemplateDataItem[];
}
