import { Project, RootModuleInfo, BuildInfo } from 'kio-ng2-env';
import { NamedComponent } from 'kio-ng2-data';
export declare class EnvFile implements Project {
    static FromFile(filepath: string): EnvFile;
    static FromProjectPath(projectPath: string): EnvFile;
    /**
     * project package name
     */
    name: string;
    /**
     * main project module
     */
    rootModule: RootModuleInfo;
    lastBuild: BuildInfo;
    components: NamedComponent[];
}
