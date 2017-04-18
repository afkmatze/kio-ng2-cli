import { Observable } from 'rxjs';
import { ComponentModel, PublicationComponent } from '../classes';
export * from '../classes';
export interface ComponentSource {
    exists(name?: string): boolean;
    prepare(): Observable<string>;
    fetch(): Observable<ComponentModel>;
    isWritable: boolean;
    scan(pathname: string): Observable<string[]>;
    deleteComponent?(component: PublicationComponent): Observable<boolean>;
    writeComponent?(component: PublicationComponent): Observable<string>;
}
