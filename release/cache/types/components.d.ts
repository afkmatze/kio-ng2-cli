import { Observable } from 'rxjs';
import { Component, PublicationComponent } from '../../components';
export declare const readCache: (targetDir: string) => any[];
export declare const createComponentsCache: (targetDir: string) => Promise<any[]>;
export declare const readComponentsCache: (targetDir: string) => (Component | PublicationComponent)[];
export declare const Components: () => Observable<Component | PublicationComponent>;
export default createComponentsCache;
