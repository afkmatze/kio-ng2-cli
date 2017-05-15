import { KioContentType } from 'kio-ng2'
import { KioProjectPaths } from '../env/interfaces'

export enum IndexTypes {
  publication,
  criteria,
  fixture/*,
  structure,
  navigation*/
}

export type IndexType = IndexTypes.publication|IndexTypes.criteria|IndexTypes.fixture

export interface ProjectEnv {
  MACHINE_ROOT: string;
  KIO_PROJECT_ROOT: string;
  KIO_PROJECT_CACHE: string;
  KIO_PATHS: KioProjectPaths;
  KIO_TEMPLATES: string;

  resolve(projectPath:string):string

  [key: string]: any;
}

export interface Project {
  env: ProjectEnv;
  [key: string]: any;

  resolve(projectPath:string):string
}

export interface CLICommandArgs {
  [key:string]: any;
}

export interface CLICommandArgsTestComponents extends CLICommandArgs {}

export interface CLICommandArgsBuildIndexes extends CLICommandArgs {
  filter?:string|string[]  
}

export interface CLICommandArgsCreateComponent extends CLICommandArgs {
  name:string
  contentType:string
  childTypes:string[]
  modifiers:string[]
}


export enum ComponentType {
  /*structure,
  navigation,*/
  publication
}

export interface Component<ComponentType> {
  name:string;
  dir:string;
}


export interface PublicationComponent extends Component<ComponentType.publication> {
  
}
/*
export interface NavigationComponent extends Component<ComponentType.navigation> {
  
}

export interface StructureComponent extends Component<ComponentType.structure> {
  
}*/