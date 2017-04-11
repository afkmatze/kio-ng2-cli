export interface KioComponentsPaths {
    /**
     * path to structure components
     * @type {string}
     */
    structure: string;
    /**
     * path to publication components
     * @type {string}
     */
    publication: string;
}
export interface KioProjectPaths {
    root: string;
    components: KioComponentsPaths;
}
export declare const KIO_PROJECT_ROOT: string;
export declare const KIO_PROJECT_PACKAGE: any;
export declare const KIO_PATHS: KioProjectPaths;
