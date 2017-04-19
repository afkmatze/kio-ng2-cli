import { ComponentSource, SourceFolder } from './interfaces';
import { ComponentModel } from '../classes';
import { Observable } from 'rxjs';
export declare abstract class AbstractComponentSource implements ComponentSource {
    static SourcePaths: string[];
    abstract exists(name?: string): boolean;
    abstract prepare(): Observable<boolean>;
    abstract fetch(): Observable<ComponentModel>;
    isWritable: boolean;
    abstract normalizeName(componentName: string): string;
    abstract scan(pathname: string): Observable<string>;
    abstract sourcePathForName(pathname: string): string;
    compareTo(otherSource: AbstractComponentSource): Observable<SourceFolder>;
    readPath(pathname: string): Observable<SourceFolder>;
    abstract readComponentAtPath(filepath: string): Observable<ComponentModel>;
}
