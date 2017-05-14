import { KioFolderSettings } from './interfaces';
export declare const isInstalled: () => boolean;
export declare const cliRoot: () => string;
export declare const moduleRoot: () => any;
export declare const isProjectEnv: () => boolean;
/**
 * @brief      resolves path in target project
 *
 * @param      projectPath  path to resolve in project
 *
 * @return     resolved path
 */
export declare const resolveRoot: (projectPath: string) => string;
export declare const relative: (absProjectPath: string) => string;
export declare const resolveProjectPackagePath: () => string;
export declare const resolveProjectPackage: () => any;
export declare const resolveProjectCache: () => string;
export declare const resolveKioPathSettings: <T extends string>(pathName?: T) => KioFolderSettings;
export declare const resolveKioPath: (pathName?: string) => string;
export declare const resolve: (...pathNames: string[]) => string;
