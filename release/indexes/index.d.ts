export * from './interfaces';
import { IndexName, IndexType, ComponentIndex } from './interfaces';
import { KioComponentFilter } from '../components';
export declare const componentFilterForIndexType: (indexType: IndexType) => KioComponentFilter;
export declare const IndexFileMap: Map<IndexName, string>;
export declare const IndexFilenames: IndexName[];
export declare const getIndexFilePath: (indexName: IndexName) => string;
export declare const getIndex: (indexName: IndexName, fromCache?: boolean) => ComponentIndex;
export declare const getIndexData: (indexName: IndexName, fromCache?: boolean) => any;
