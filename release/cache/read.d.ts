import { Observable } from 'rxjs';
import { Component, PublicationComponent } from '../components';
export declare const readCache: (cacheType: "components", ...pathNames: string[]) => (Component | PublicationComponent)[];
export declare const cachedComponents: () => Observable<Component | PublicationComponent>;
