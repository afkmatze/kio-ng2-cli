import { Observable } from 'rxjs';
import { ComponentModel, PublicationComponent } from '../classes';
export * from '../classes';
export interface SourceFolder {
    name: string;
    items: string[];
}
export interface ComponentSource {
    exists(name?: string): boolean;
    prepare(): Observable<boolean>;
    fetch(): Observable<ComponentModel>;
    isWritable: boolean;
    normalizeName(componentName: string): string;
    scan(pathname: string): Observable<string>;
    deleteComponent?(component: PublicationComponent): Observable<boolean>;
    writeComponent?(component: PublicationComponent): Observable<string>;
}
