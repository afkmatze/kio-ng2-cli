import { Observable } from 'rxjs';
import { ProjectEnv } from '../interfaces';
export { ComponentFixture, QueryableAnnotation } from 'kio-ng2-component-routing';
export { KioContentType } from 'kio-ng2';
import { ComponentCacheFileContent } from './interfaces';
export declare const cache: (projectEnv: ProjectEnv) => {
    list: () => Observable<string>;
    readFile: <T extends ComponentCacheFileContent>(filepath: string) => Observable<T>;
};
