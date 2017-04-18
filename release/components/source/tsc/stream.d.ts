import { Observable } from 'rxjs';
import { ComponentSource, ComponentModel } from '../interfaces';
export declare const fetch: () => Observable<any>;
export declare class TSCStream implements ComponentSource {
    isWritable: boolean;
    exists(): boolean;
    protected getLastCompilation(): Observable<number>;
    protected lastCompiled: Observable<number>;
    protected shouldRefresh(): Observable<boolean>;
    protected isCompiling: boolean;
    private compiles;
    protected compile(): Observable<string>;
    protected evalComponentFile(component: ComponentModel, filename: string): Observable<any>;
    scan(pathname: string): Observable<string[]>;
    protected findComponentDirs(): Observable<string>;
    protected readComponent(componentPath: string): Observable<ComponentModel>;
    prepare(): Observable<string>;
    fetch(): Observable<ComponentModel>;
}
declare var _default: TSCStream;
export default _default;
