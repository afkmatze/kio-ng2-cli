import 'mocha';
import { Observable } from 'rxjs';
import { NamedComponent } from 'kio-ng2-component-routing';
import { EnvFile } from '../../env/file.class';
export interface ComponentTestPaths {
    projectRoot: string;
    publicationComponents: string;
}
export declare class ComponentTests {
    readonly projectPath: string;
    constructor(projectPath: string);
    protected env: EnvFile;
    components: Observable<NamedComponent>;
    assertComponent(component: NamedComponent): void;
}
