import { KioProjectPaths } from './interfaces';
export * from './interfaces';
export declare const KIO_PROJECT_ROOT: string;
export declare const KIO_PROJECT_PACKAGE: any;
/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
export declare const resolve: (projectPath: string) => string;
export declare const KIO_PROJECT_CACHE: string;
export declare const KIO_PATHS: KioProjectPaths;
export declare const TEMPLATES: string;
