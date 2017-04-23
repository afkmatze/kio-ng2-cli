import { KioContentType } from 'kio-ng2';
import { KioProjectPaths } from '../env/interfaces';
export declare enum IndexTypes {
    publication = 0,
    structure = 1,
    navigation = 2,
    criteria = 3,
    fixture = 4,
}
export declare type IndexType = IndexTypes.publication | IndexTypes.structure | IndexTypes.navigation | IndexTypes.criteria | IndexTypes.fixture;
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
export interface CLICommandArgsBuildIndexes extends CLICommandArgs {
    filter?: string | string[];
}
export interface CLICommandArgsCreateComponent extends CLICommandArgs {
    name: string;
    contentType: KioContentType;
    childTypes: KioContentType[];
    modifiers: string[];
}
export declare enum ComponentType {
    structure = 0,
    navigation = 1,
    publication = 2,
}
export interface Component<ComponentType> {
    name: string;
    dir: string;
}
export interface PublicationComponent extends Component<ComponentType.publication> {
}
export interface NavigationComponent extends Component<ComponentType.navigation> {
}
export interface StructureComponent extends Component<ComponentType.structure> {
}
