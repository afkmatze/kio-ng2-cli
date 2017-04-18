import { Observable } from 'rxjs';
import { ComponentSource, PublicationComponent, Component, ComponentModel } from '../interfaces';
export declare const fetch: () => Observable<{
    filename: string;
    data: any;
}>;
export declare class CacheStream implements ComponentSource {
    isWritable: boolean;
    exists(name?: string): boolean;
    private cachedFetch;
    private _fetch();
    protected removeDeleted(): Observable<any>;
    protected fetchExisting(): Observable<ComponentModel>;
    protected processCachedComponent(componentData: any): Observable<any>;
    fetch(): Observable<ComponentModel>;
    scan(pathname: string): Observable<string[]>;
    prepare(): Observable<string>;
    deleteComponent(component: Component): Observable<boolean>;
    write(component: PublicationComponent): Observable<string>;
}
declare var _default: CacheStream;
export default _default;
