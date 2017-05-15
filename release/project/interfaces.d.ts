import { KioProjectPaths } from '../env/interfaces';
export declare enum IndexTypes {
    publication = 0,
    criteria = 1,
    fixture = 2,
}
export declare type IndexType = IndexTypes.publication | IndexTypes.criteria | IndexTypes.fixture;
export interface ProjectEnv {
    MACHINE_ROOT: string;
    KIO_PROJECT_ROOT: string;
    KIO_PROJECT_CACHE: string;
    KIO_PATHS: KioProjectPaths;
    KIO_TEMPLATES: string;
    resolve(projectPath: string): string;
    [key: string]: any;
}
export interface Project {
    env: ProjectEnv;
    [key: string]: any;
    resolve(projectPath: string): string;
}
export interface CLICommandArgs {
    [key: string]: any;
}
export interface CLICommandArgsTestComponents extends CLICommandArgs {
}
export interface CLICommandArgsBuildIndexes extends CLICommandArgs {
    filter?: string | string[];
}
export interface CLICommandArgsCreateComponent extends CLICommandArgs {
    name: string;
    contentType: string;
    childTypes: string[];
    modifiers: string[];
}
export declare enum ComponentType {
    publication = 0,
}
export interface Component<ComponentType> {
    name: string;
    dir: string;
}
export interface PublicationComponent extends Component<ComponentType.publication> {
}
