import { Observable } from 'rxjs';
import { ComponentSource, PublicationComponent, ComponentModel } from '../interfaces';
export declare const fetch: () => Observable<any>;
export declare class CacheStream implements ComponentSource {
    isWritable: boolean;
    exists(name?: string): boolean;
    fetch(): Observable<ComponentModel>;
    prepare(): Observable<string>;
    write(component: PublicationComponent): Observable<string>;
}
declare var _default: CacheStream;
export default _default;
