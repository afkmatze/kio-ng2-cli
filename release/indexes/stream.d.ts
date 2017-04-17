import { IndexName } from './interfaces';
import { Observable } from 'rxjs';
export declare const IndexNames: Observable<string>;
export interface StreamFilter {
    (item: any): boolean;
}
export declare const filterStream: (indexName: IndexName) => StreamFilter;
