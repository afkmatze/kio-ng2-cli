import { Observable } from 'rxjs';
import { PublicationComponent, Component, ComponentModel } from '../interfaces';
import { AbstractComponentSource } from '../abstract';
export declare const fetch: () => Observable<{
    filename: string;
    data: any;
}>;
export declare class CacheStream extends AbstractComponentSource {
    isWritable: boolean;
    sourcePathForName(pathname: string): string;
    exists(name?: string): boolean;
    normalizeName(componentName: string): string;
    private cachedFetch;
    private _fetch();
    protected removeDeleted(): Observable<any>;
    protected fetchExisting(): Observable<ComponentModel>;
    protected processCachedComponent(componentData: any): Observable<any>;
    readComponentAtPath(filepath: string): Observable<ComponentModel>;
    fetch(): Observable<ComponentModel>;
    scan(pathname: string): Observable<string>;
    prepare(): Observable<boolean>;
    deleteComponent(component: Component): Observable<boolean>;
    write(component: PublicationComponent | Component): Observable<string>;
}
declare var _default: CacheStream;
export default _default;
