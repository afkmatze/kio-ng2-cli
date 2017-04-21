import { KioProjectPaths } from '../env/interfaces'

export interface ProjectEnv {
  MACHINE_ROOT: string;
  KIO_PROJECT_ROOT: string;
  KIO_PROJECT_CACHE: string;
  KIO_PATHS: KioProjectPaths;
  KIO_TEMPLATES: string;

  [key: string]: any;
}

export interface Project {
  env: ProjectEnv;
  [key: string]: any;

  resolve(projectPath:string):string
}