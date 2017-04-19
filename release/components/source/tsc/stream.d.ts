import { Observable } from 'rxjs';
import { ComponentModel } from '../interfaces';
import { AbstractComponentSource } from '../abstract';
export declare const fetch: () => Observable<any>;
export declare class TSCStream extends AbstractComponentSource {
    isWritable: boolean;
    sourcePathForName(pathname: string): any;
    exists(): boolean;
    normalizeName(componentName: string): string;
    protected getLastCompilation(): Observable<number>;
    protected lastCompiled: Observable<number>;
    protected shouldRefresh(): Observable<boolean>;
    protected isCompiling: boolean;
    private compiles;
    protected compile(): Observable<boolean>;
    protected evalComponentFile(component: ComponentModel, filename: string): Observable<any>;
    scan(pathname: string): Observable<string>;
    protected findComponentDirs(): Observable<string>;
    readComponentAtPath(filepath: string): Observable<ComponentModel>;
    protected readComponent(componentPath: string): Observable<ComponentModel>;
    prepare(): Observable<boolean>;
    fetch(): Observable<ComponentModel>;
}
declare var _default: TSCStream;
export default _default;
