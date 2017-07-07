import { Observable } from 'rxjs';
/**
 * @brief      resolve component's folder name
 *
 * @param      component  The component
 *
 * @return     dasherized folder name for component
 */
export declare const componentFolderName: (component: any) => string;
export declare const resolveComponentPath: (component: any) => string;
export declare const resolveComponentFile: (component: any, componentFileType?: "fixture" | "criteria" | "component" | "spec") => string;
export declare const getComponentFixture: (component: any) => any;
export declare const getComponentFixtures: (components: any[]) => Observable<any[]>;
export declare const listComponents: () => Observable<any[]>;
export declare const getComponentFixtureFile: (component: any) => string;
