import { Observable } from 'rxjs';
import { NamedComponent, ComponentFixture } from 'kio-ng2-component-routing';
/**
 * @brief      resolve component's folder name
 *
 * @param      component  The component
 *
 * @return     dasherized folder name for component
 */
export declare const componentFolderName: (component: NamedComponent) => string;
export declare const resolveComponentPath: (component: NamedComponent) => string;
export declare const resolveComponentFile: (component: NamedComponent, componentFileType?: "fixture" | "criteria" | "component" | "spec") => string;
export declare const getComponentFixture: (component: NamedComponent) => ComponentFixture;
export declare const listComponents: () => Observable<NamedComponent[]>;
export declare const getComponentFixtureFile: (component: NamedComponent) => string;
